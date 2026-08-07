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
    <div>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="記事を検索（例：タンパク質、40代、回復）"
        className="w-full px-4 py-3 rounded-xl border border-neutral-200 text-sm text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:border-emerald-400 mb-14"
      />

      {filtered.length === 0 ? (
        <p className="text-sm text-neutral-400">該当する記事が見つかりませんでした。</p>
      ) : (
        <div className="space-y-10">
          {filtered.map((post) => (
            <Link key={post.slug} href={`/blog/${post.slug}`} className="block group">
              <div className="flex items-center gap-3 mb-1">
                <p className="text-xs text-neutral-400">{post.date}</p>
                {post.phase && (
                  <span className="text-[10px] font-mono uppercase tracking-wide text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-200">
                    {post.phase}
                  </span>
                )}
                {post.readingTime && (
                  <span className="text-[10px] text-neutral-400">
                    約{post.readingTime}分で読めます
                  </span>
                )}
              </div>
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
  )
}
