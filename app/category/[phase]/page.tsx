import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPostsMeta, getPostsByPhase } from "@/lib/posts"

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
    description: `筋肉が作られる5つの段階のうち「${phase}」に関わる記事の一覧です。`,
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

  return (
    <main className="flex-1 text-neutral-900 px-6 py-16">
      <div className="max-w-[720px] mx-auto">
        <Link href="/" className="text-sm text-neutral-400 hover:text-emerald-600 transition-colors">
          ← ブログ一覧に戻る
        </Link>

        <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mt-8 mb-3">
          Category
        </p>
        <h1 className="text-3xl font-bold mb-14">「{decodedPhase}」の記事一覧</h1>

        {posts.length === 0 ? (
          <p className="text-sm text-neutral-400">まだこのカテゴリの記事がありません。</p>
        ) : (
          <div className="space-y-10">
            {posts.map((post) => (
              <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
                <p className="text-xs text-neutral-400 mb-1">{post.date}</p>
                <h2 className="text-xl font-semibold text-neutral-900 group-hover:text-emerald-600 transition-colors">
                  {post.title}
                </h2>
                <p className="text-sm text-neutral-500 mt-2 leading-relaxed">
                  {post.description}
                </p>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
