"use client"

import { useState } from "react"
import Link from "next/link"
import type { PostMeta } from "@/lib/posts"

export function PostList({ posts }: { posts: PostMeta[] }) {
  const [query, setQuery] = useState("")

  const filtered = posts.filter((post) => {
    const haystack = `${post.title} ${post.description} ${post.keyword}`.toLowerCase()
    return haystack.includes(query.toLowerCase())
  })

  return (
    <div className="pb-20">
      <div className="relative mb-14">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="記事を検索（例：タンパク質、40代、回復）"
          className="w-full px-0 py-3 bg-transparent border-0 border-b border-rule text-[15px] text-ink placeholder:text-mute/70 focus:outline-none focus:border-steel transition-colors"
        />
      </div>

      {filtered.length === 0 ? (
        <p className="text-[15px] text-mute">該当する記事が見つかりませんでした。</p>
      ) : (
        <div>
          {filtered.map((post) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid grid-cols-1 md:grid-cols-[110px_1fr] gap-2 md:gap-8 py-8 border-b border-rule"
            >
              <div className="font-mono text-[12px] text-mute space-y-1">
                <p>{post.date}</p>
                {post.phase && <p className="text-steel">{post.phase}</p>}
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
  )
}
