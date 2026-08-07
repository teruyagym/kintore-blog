import { getAllPostsMeta } from "@/lib/posts"
import { PostList } from "@/components/PostList"

export default function Home() {
  const posts = getAllPostsMeta()

  return (
    <main className="flex-1 px-6">
      <div className="max-w-[760px] mx-auto">
        {/* Hero */}
        <section className="pt-16 pb-14 md:pt-20 md:pb-16 border-b border-rule">
          <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel mb-5">
            Body Flow Report — Vol. {String(posts.length).padStart(2, "0")}
          </p>
          <h1 className="text-[32px] md:text-[40px] font-semibold leading-[1.35] tracking-tight text-ink max-w-[560px]">
            体は、努力ではなく
            <br />
            仕組みで変わる。
          </h1>
          <p className="text-[16px] text-mute leading-[1.9] mt-6 max-w-[480px]">
            筋トレ・栄養・体の仕組みを、気合いや根性ではなく、刺激・摂取・消化吸収・代謝・回復という5つの工程から読み解きます。
          </p>
        </section>

        <div className="pt-14">
          <PostList posts={posts} />
        </div>
      </div>
    </main>
  )
}
