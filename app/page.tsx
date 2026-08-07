import Link from "next/link"
import { getAllPostsMeta } from "@/lib/posts"

export default function Home() {
  const posts = getAllPostsMeta()

  return (
    <main className="flex-1 text-white px-6 py-16">
      <div className="max-w-[720px] mx-auto">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-400 mb-3">
          Science-based
        </p>
        <h1 className="text-3xl font-bold mb-2">ブログ</h1>
        <p className="text-neutral-400 mb-14">
          筋トレ・栄養・体の仕組みを、科学的根拠から解説します。
        </p>

        <div className="space-y-10">
          {posts.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="block group"
            >
              <p className="text-xs text-neutral-500 mb-1">{post.date}</p>
              <h2 className="text-xl font-semibold group-hover:text-emerald-400 transition-colors">
                {post.title}
              </h2>
              <p className="text-sm text-neutral-400 mt-2 leading-relaxed">
                {post.description}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}
