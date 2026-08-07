import type { MetadataRoute } from "next"
import { getAllPostsMeta } from "@/lib/posts"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kintore-blog.vercel.app"

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPostsMeta()

  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
    },
    ...posts.map((post) => ({
      url: `${SITE_URL}/blog/${post.slug}`,
      lastModified: post.date ? new Date(post.date) : new Date(),
    })),
  ]
}
