import fs from "fs"
import path from "path"

const PEXELS_API_KEY = process.env.PEXELS_API_KEY

export interface PexelsPhoto {
  id: number
  url: string
  alt: string
  photographer: string
  photographerUrl: string
}

const PHASE_QUERIES: Record<string, string[]> = {
  刺激: [
    "weightlifting gym training",
    "barbell squat gym",
    "gym workout equipment",
    "man lifting weights gym",
    "dumbbell workout gym",
    "bench press gym",
    "strength training man",
    "gym workout intense",
    "weight room training",
    "squat rack gym",
  ],
  摂取: [
    "healthy meal protein",
    "protein shake food",
    "grilled chicken meal prep",
    "healthy plate food",
    "protein bowl meal",
    "salmon meal healthy",
    "meal prep containers",
    "eggs protein breakfast",
    "healthy lunch bowl",
    "steak meal plate",
  ],
  消化吸収: [
    "healthy food nutrition",
    "vegetables fruit nutrition",
    "supplements vitamins",
    "gut health food",
    "fresh vegetables market",
    "fermented food healthy",
    "vitamin supplement pills",
    "colorful vegetables table",
    "healthy salad bowl",
    "digestive health food",
  ],
  代謝: [
    "cardio training gym",
    "running fitness",
    "metabolism fitness body",
    "treadmill running gym",
    "jogging outdoor fitness",
    "cycling fitness cardio",
    "sweat workout fitness",
    "hiit training gym",
    "morning run fitness",
    "fitness tracker workout",
  ],
  回復: [
    "athlete stretching recovery",
    "sleep rest recovery",
    "massage recovery muscle",
    "foam rolling recovery",
    "yoga stretch recovery",
    "bedroom sleep rest",
    "recovery ice bath",
    "relaxation rest wellness",
    "stretching gym recovery",
    "spa recovery wellness",
  ],
}

const DEFAULT_QUERIES = [
  "gym equipment dark",
  "dumbbell rack gym",
  "fitness training gym",
  "gym interior dark",
  "weight plates gym",
  "fitness equipment closeup",
]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

// --- 記事間で同じ画像が被らないようにするための永続レジストリ ---
// slug#offset ごとに割り当て済みのPexels写真IDを記録し、新規割り当て時は
// 他のどの記事にも使われていない写真だけを候補にする。
//
// Next.jsのビルドは複数ワーカー(別プロセス)で静的ページを並行生成するため、
// ディレクトリ作成の原子性を利用したロックでレジストリの読み書きを直列化する。

const REGISTRY_PATH = path.join(process.cwd(), "content", "thumbnail-registry.json")
const LOCK_PATH = `${REGISTRY_PATH}.lock`
const LOCK_STALE_MS = 20_000

type RegistryEntry = PexelsPhoto & { query: string }
type Registry = Record<string, RegistryEntry>

function loadRegistry(): Registry {
  if (!fs.existsSync(REGISTRY_PATH)) return {}
  try {
    return JSON.parse(fs.readFileSync(REGISTRY_PATH, "utf8"))
  } catch {
    // 他プロセスが書き込み中に読んでしまった場合はロック取得後に再読込されるので、
    // ここでは「未登録」として扱えばよい
    return {}
  }
}

function saveRegistry(registry: Registry) {
  fs.mkdirSync(path.dirname(REGISTRY_PATH), { recursive: true })
  const tmpPath = `${REGISTRY_PATH}.${process.pid}.${Date.now()}.tmp`
  fs.writeFileSync(tmpPath, JSON.stringify(registry, null, 2) + "\n", "utf8")
  fs.renameSync(tmpPath, REGISTRY_PATH) // renameはPOSIXで原子的なので読み取り側が壊れたファイルを見ることはない
}

function usedPhotoIds(registry: Registry): Set<number> {
  return new Set(Object.values(registry).map((entry) => entry.id))
}

async function withRegistryLock<T>(fn: () => Promise<T>): Promise<T> {
  const start = Date.now()
  for (;;) {
    try {
      fs.mkdirSync(LOCK_PATH)
      break
    } catch (err) {
      if ((err as NodeJS.ErrnoException).code !== "EEXIST") throw err
      const lockAge = Date.now() - (statLockMtime() ?? Date.now())
      if (Date.now() - start > LOCK_STALE_MS && lockAge > LOCK_STALE_MS) {
        // 異常終了で残ったロックとみなして強制解放する
        fs.rmSync(LOCK_PATH, { recursive: true, force: true })
        continue
      }
      await new Promise((resolve) => setTimeout(resolve, 50 + Math.random() * 100))
    }
  }
  try {
    return await fn()
  } finally {
    fs.rmSync(LOCK_PATH, { recursive: true, force: true })
  }
}

function statLockMtime(): number | undefined {
  try {
    return fs.statSync(LOCK_PATH).mtimeMs
  } catch {
    return undefined
  }
}

async function searchPexels(query: string, perPage = 30): Promise<PexelsPhoto[]> {
  if (!PEXELS_API_KEY) return []
  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=${perPage}&orientation=landscape`,
      {
        headers: { Authorization: PEXELS_API_KEY },
        next: { revalidate: false },
      }
    )
    if (!res.ok) return []
    const data = await res.json()
    return (data.photos ?? []).map(
      (photo: {
        id: number
        src: { large2x: string }
        alt: string | null
        photographer: string
        photographer_url: string
      }) => ({
        id: photo.id,
        url: photo.src.large2x,
        alt: photo.alt || query,
        photographer: photo.photographer,
        photographerUrl: photo.photographer_url,
      })
    )
  } catch {
    return []
  }
}

/**
 * 記事(slug)ごとに、他のどの記事(のどのoffset)とも重複しないPexels写真を1枚選ぶ。
 * 同じslug+offsetに対しては常に同じ写真を返す(レジストリに永続化するため)。
 * 新規割り当てが必要な場合のみプロセス間ロックを取得するため、割り当て済みの
 * 記事を読むだけの呼び出し(ビルド時の再訪問など)はロック不要で高速に返る。
 */
export async function getUniquePhoto(
  slug: string,
  phase: string | undefined,
  offset = 0
): Promise<PexelsPhoto | null> {
  if (!PEXELS_API_KEY) return null

  const key = `${slug}#${offset}`

  const existing = loadRegistry()[key]
  if (existing) return existing

  return withRegistryLock(async () => {
    const registry = loadRegistry()
    const cached = registry[key]
    if (cached) return cached

    const pool = (phase && PHASE_QUERIES[phase]) || DEFAULT_QUERIES
    const startIndex = (hashString(slug) + offset) % pool.length
    const used = usedPhotoIds(registry)

    for (let i = 0; i < pool.length; i++) {
      const query = pool[(startIndex + i) % pool.length]
      const candidates = await searchPexels(query)
      const fresh = candidates.find((c) => !used.has(c.id))
      if (fresh) {
        registry[key] = { ...fresh, query }
        saveRegistry(registry)
        return fresh
      }
    }

    // クエリを全て使い切っても未使用の候補が見つからない場合のフォールバック(重複を許容)
    const fallbackQuery = pool[startIndex]
    const [fallback] = await searchPexels(fallbackQuery, 1)
    if (fallback) {
      registry[key] = { ...fallback, query: fallbackQuery }
      saveRegistry(registry)
      return fallback
    }
    return null
  })
}
