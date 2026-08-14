import Image from "next/image"
import { getAllPostsMeta } from "@/lib/posts"
import { getUniquePhoto } from "@/lib/pexels"
import { PostList } from "@/components/PostList"

const HERO_IMAGE =
  "https://images.pexels.com/photos/6389886/pexels-photo-6389886.jpeg?auto=compress&cs=tinysrgb&h=1400&w=2200&fit=crop"

export default async function Home() {
  const posts = getAllPostsMeta()

  // レジストリの読み書きが競合しないよう、並行実行せず1件ずつ処理する
  const postsWithPhotos = []
  for (const post of posts) {
    const photo = await getUniquePhoto(post.slug, post.phase)
    postsWithPhotos.push({ ...post, thumbnailUrl: photo?.url })
  }

  return (
    <main className="flex-1">
      {/* Hero */}
      <section className="relative h-[86vh] min-h-[560px] flex items-end overflow-hidden bg-ink">
        <Image
          src={HERO_IMAGE}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover opacity-70"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/50 to-ink/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink/70 via-transparent to-transparent" />

        <div className="relative z-10 w-full px-6 pb-16 md:pb-20">
          <div className="max-w-[1000px] mx-auto">
            <p className="font-mono text-[12px] uppercase tracking-[0.25em] text-flag mb-6">
              Body Flow Report — Vol. {String(posts.length).padStart(2, "0")}
            </p>
            <h1 className="text-[52px] sm:text-[72px] md:text-[104px] font-bold leading-[0.95] tracking-tight text-paper">
              変わらないのは、
              <br />
              努力不足じゃない。
            </h1>
            <p className="text-[16px] md:text-[19px] text-paper/80 leading-[1.8] mt-8 max-w-[440px]">
              筋トレ・栄養・体の仕組みを、気合いや根性ではなく、刺激・摂取・消化吸収・代謝・回復という5つの工程から読み解きます。
            </p>
          </div>
        </div>
      </section>

      <div className="px-6">
        <div className="max-w-[760px] mx-auto pt-16">
          <PostList posts={postsWithPhotos} />
        </div>
      </div>
    </main>
  )
}
