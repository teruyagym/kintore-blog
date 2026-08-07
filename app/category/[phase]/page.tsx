import Link from "next/link"
import { notFound } from "next/navigation"
import { getPostsByPhase } from "@/lib/posts"

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

        {posts.length === 0 ? (
          <p className="text-[15px] text-mute">まだこのカテゴリの記事がありません。</p>
        ) : (
          <div>
            {posts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="group grid grid-cols-1 md:grid-cols-[110px_1fr] gap-2 md:gap-8 py-8 border-b border-rule"
              >
                <div className="font-mono text-[12px] text-mute space-y-1">
                  <p>{post.date}</p>
                  <p>約{post.readingTime}分</p>
                </div>
                <div>
                  <h2 className="text-[19px] font-semibold text-ink leading-snug group-hover:text-steel transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[15px] text-mute mt-2.5 leading-relaxed max-w-[560px]">
                    {post.description}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
