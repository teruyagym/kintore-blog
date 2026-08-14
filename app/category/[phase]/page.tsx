import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostsByPhase } from "@/lib/posts"
import { getUniquePhoto } from "@/lib/pexels"
import { PostList } from "@/components/PostList"

const ALL_PHASES = ["刺激", "摂取", "消化吸収", "代謝", "回復"]

export async function generateStaticParams() {
  return ALL_PHASES.map((phase) => ({ phase }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>
}) {
  const { phase } = await params
  return {
    title: `「${phase}」に関する記事一覧`,
    description: `筋肉が作られる5つの工程のうち「${phase}」に関わる記事の一覧です。`,
  }
}

export default async function CategoryPage({
  params,
}: {
  params: Promise<{ phase: string }>
}) {
  const { phase } = await params
  const decodedPhase = decodeURIComponent(phase)
  if (!ALL_PHASES.includes(decodedPhase)) notFound()

  const posts = getPostsByPhase(decodedPhase)
  // レジストリの読み書きが競合しないよう、並行実行せず1件ずつ処理する
  const postsWithPhotos = []
  for (const post of posts) {
    const photo = await getUniquePhoto(post.slug, post.phase)
    postsWithPhotos.push({ ...post, thumbnailUrl: photo?.url })
  }

  return (
    <main className="flex-1 px-6 pb-24">
      <div className="max-w-[760px] mx-auto">
        <div className="pt-10 pb-8">
          <Link href="/" className="font-mono text-[12px] text-mute hover:text-steel transition-colors">
            ← 記事一覧
          </Link>
        </div>

        <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel mb-4">
          Category
        </p>
        <h1 className="text-[30px] md:text-[36px] font-semibold tracking-tight text-ink mb-14 pb-10 border-b border-rule">
          「{decodedPhase}」の記事
        </h1>

        {postsWithPhotos.length === 0 ? (
          <p className="text-[15px] text-mute">まだこのカテゴリの記事がありません。</p>
        ) : (
          <PostList posts={postsWithPhotos} />
        )}
      </div>
    </main>
  )
}
