import Link from "next/link"
import { getAllPostsMeta } from "@/lib/posts"

export function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const posts = getAllPostsMeta().filter((p) => p.slug !== currentSlug).slice(0, 3)

  if (posts.length === 0) return null

  return (
    <div className="mt-16">
      <p className="text-xs font-mono uppercase tracking-[0.15em] text-neutral-500 mb-6">
        関連記事
      </p>
      <div className="space-y-6">
        {posts.map((post) => (
          <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
            <h3 className="text-base font-semibold text-neutral-900 group-hover:text-emerald-600 transition-colors">
              {post.title}
            </h3>
            <p className="text-xs text-neutral-500 mt-1 leading-relaxed">
              {post.description}
            </p>
          </Link>
        ))}
      </div>
    </div>
  )
}
