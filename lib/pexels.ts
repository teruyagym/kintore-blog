const PEXELS_API_KEY = process.env.PEXELS_API_KEY

export interface PexelsPhoto {
  url: string
  alt: string
  photographer: string
  photographerUrl: string
}

const PHASE_QUERIES: Record<string, string[]> = {
  刺激: ["weightlifting gym training", "barbell squat gym", "gym workout equipment"],
  摂取: ["healthy meal protein", "protein shake food", "grilled chicken meal prep"],
  消化吸収: ["healthy food nutrition", "vegetables fruit nutrition", "supplements vitamins"],
  代謝: ["cardio training gym", "running fitness", "metabolism fitness body"],
  回復: ["athlete stretching recovery", "sleep rest recovery", "massage recovery muscle"],
}

const DEFAULT_QUERIES = ["gym equipment dark", "dumbbell rack gym", "fitness training gym"]

function hashString(str: string): number {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = (hash << 5) - hash + str.charCodeAt(i)
    hash |= 0
  }
  return Math.abs(hash)
}

export function pickQueryForPost(slug: string, phase?: string): string {
  const pool = (phase && PHASE_QUERIES[phase]) || DEFAULT_QUERIES
  const index = hashString(slug) % pool.length
  return pool[index]
}

export async function fetchPexelsPhoto(query: string): Promise<PexelsPhoto | null> {
  if (!PEXELS_API_KEY) return null

  try {
    const res = await fetch(
      `https://api.pexels.com/v1/search?query=${encodeURIComponent(query)}&per_page=1&orientation=landscape`,
      {
        headers: { Authorization: PEXELS_API_KEY },
        next: { revalidate: false },
      }
    )
    if (!res.ok) return null
    const data = await res.json()
    const photo = data.photos?.[0]
    if (!photo) return null
    return {
      url: photo.src.large2x,
      alt: photo.alt || query,
      photographer: photo.photographer,
      photographerUrl: photo.photographer_url,
    }
  } catch {
    return null
  }
}
