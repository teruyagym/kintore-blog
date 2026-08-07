import fs from "fs"
import path from "path"
import matter from "gray-matter"
import { remark } from "remark"
import html from "remark-html"

const postsDirectory = path.join(process.cwd(), "content/posts")

export interface PostMeta {
  slug: string
  title: string
  description: string
  date: string
  keyword: string
  phase?: string
  readingTime: number
}

export interface TocItem {
  id: string
  text: string
}

function estimateReadingTime(content: string): number {
  // 日本語は1分あたり約400〜600文字が目安。500文字/分で計算する
  const charCount = content.replace(/\s/g, "").length
  return Math.max(1, Math.round(charCount / 500))
}

function addHeadingIds(htmlContent: string): { html: string; toc: TocItem[] } {
  const toc: TocItem[] = []
  const withIds = htmlContent.replace(
    /<h2>(.*?)<\/h2>/g,
    (_match, text: string) => {
      const plainText = text.replace(/<[^>]+>/g, "")
      const id = `h-${toc.length + 1}-${plainText
        .replace(/[^\p{L}\p{N}]+/gu, "")
        .slice(0, 20)}`
      toc.push({ id, text: plainText })
      return `<h2 id="${id}">${text}</h2>`
    }
  )
  return { html: withIds, toc }
}

export function getAllPostSlugs(): string[] {
  if (!fs.existsSync(postsDirectory)) return []
  return fs
    .readdirSync(postsDirectory)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""))
}

export function getAllPostsMeta(): PostMeta[] {
  const slugs = getAllPostSlugs()
  const posts = slugs.map((slug) => {
    const fullPath = path.join(postsDirectory, `${slug}.md`)
    const fileContents = fs.readFileSync(fullPath, "utf8")
    const { data, content } = matter(fileContents)
    return {
      slug,
      title: data.title ?? slug,
      description: data.description ?? "",
      date: data.date ?? "",
      keyword: data.keyword ?? "",
      phase: data.phase ?? undefined,
      readingTime: estimateReadingTime(content),
    }
  })
  return posts.sort((a, b) => (a.date < b.date ? 1 : -1))
}

export function getPostsByPhase(phase: string): PostMeta[] {
  return getAllPostsMeta().filter((p) => p.phase === phase)
}

export async function getPostBySlug(slug: string) {
  const fullPath = path.join(postsDirectory, `${slug}.md`)
  const fileContents = fs.readFileSync(fullPath, "utf8")
  const { data, content } = matter(fileContents)

  const processed = await remark().use(html).process(content)
  const { html: contentHtml, toc } = addHeadingIds(processed.toString())

  return {
    slug,
    title: data.title ?? slug,
    description: data.description ?? "",
    date: data.date ?? "",
    keyword: data.keyword ?? "",
    phase: data.phase ?? undefined,
    readingTime: estimateReadingTime(content),
    contentHtml,
    toc,
  }
}
