import { getAllPostsMeta } from "@/lib/posts"
import { PostList } from "@/components/PostList"

export default function Home() {
  const posts = getAllPostsMeta()

  return (
    <main className="flex-1 text-neutral-900 px-6 py-16">
      <div className="max-w-[720px] mx-auto">
        <p className="text-xs font-mono uppercase tracking-[0.2em] text-emerald-600 mb-3">
          Science-based
        </p>
        <h1 className="text-3xl font-bold mb-2">ブログ</h1>
        <p className="text-neutral-500 mb-10">
          筋トレ・栄養・体の仕組みを、科学的根拠から解説します。
        </p>

        <PostList posts={posts} />
      </div>
    </main>
  )
}
