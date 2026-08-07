"use client"

import { useState } from "react"
import Link from "next/link"
import Image from "next/image"
import type { PostMeta } from "@/lib/posts"

type PostWithThumbnail = PostMeta & { thumbnailUrl?: string }

export function PostList({ posts }: { posts: PostWithThumbnail[] }) {
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
              className="group flex gap-5 md:gap-8 py-8 border-b border-rule items-start"
            >
              <div className="relative w-[110px] md:w-[180px] aspect-[4/3] bg-paper-raised overflow-hidden flex-shrink-0">
                {post.thumbnailUrl && (
                  <Image
                    src={post.thumbnailUrl}
                    alt=""
                    fill
                    sizes="180px"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                )}
              </div>

              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-x-3 gap-y-1 font-mono text-[11px] text-mute mb-2">
                  <span>{post.date}</span>
                  {post.phase && <span className="text-steel">{post.phase}</span>}
                  <span className="hidden md:inline">約{post.readingTime}分</span>
                </div>
                <h2 className="text-[17px] md:text-[19px] font-semibold text-ink leading-snug group-hover:text-steel transition-colors">
                  {post.title}
                </h2>
                <p className="text-[14px] md:text-[15px] text-mute mt-2 leading-relaxed max-w-[560px] hidden sm:block">
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
