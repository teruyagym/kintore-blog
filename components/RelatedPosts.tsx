import Link from "next/link"
import { getAllPostsMeta } from "@/lib/posts"

export function RelatedPosts({ currentSlug }: { currentSlug: string }) {
  const posts = getAllPostsMeta().filter((p) => p.slug !== currentSlug).slice(0, 3)

  if (posts.length === 0) return null

  return (
    <div className="mt-14 pt-8 border-t border-rule">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-6">
        Related
      </p>
      <div>
        {posts.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="group flex items-baseline gap-4 py-3.5 border-b border-rule"
          >
            <span className="font-mono text-[11px] text-mute flex-shrink-0 hidden sm:block">
              {post.date}
            </span>
            <h3 className="text-[15px] font-medium text-ink group-hover:text-steel transition-colors">
              {post.title}
            </h3>
          </Link>
        ))}
      </div>
    </div>
  )
}
