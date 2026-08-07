import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts"
import { LineCTA } from "@/components/LineCTA"
import { AuthorBio } from "@/components/AuthorBio"
import { RelatedPosts } from "@/components/RelatedPosts"
import { PhaseFlowDiagram } from "@/components/PhaseFlowDiagram"

export async function generateStaticParams() {
  return getAllPostSlugs().map((slug) => ({ slug }))
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const slugs = getAllPostSlugs()
  if (!slugs.includes(slug)) return {}
  const post = await getPostBySlug(slug)
  return {
    title: post.title,
    description: post.description,
  }
}

export default async function BlogPost({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const slugs = getAllPostSlugs()
  if (!slugs.includes(slug)) notFound()

  const post = await getPostBySlug(slug)

  return (
    <main className="flex-1 text-white px-6 py-16">
      <article className="max-w-[720px] mx-auto">
        <Link
          href="/"
          className="text-sm text-neutral-500 hover:text-emerald-400 transition-colors"
        >
          ← ブログ一覧に戻る
        </Link>

        <p className="text-xs text-neutral-500 mt-8 mb-2">{post.date}</p>
        <h1 className="text-3xl font-bold leading-tight mb-10">
          {post.title}
        </h1>

        <PhaseFlowDiagram highlight={post.phase} />

        <div
          className="prose prose-invert prose-neutral max-w-none prose-headings:font-semibold prose-a:text-emerald-400"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <LineCTA />
        <AuthorBio />
        <RelatedPosts currentSlug={post.slug} />
      </article>
    </main>
  )
}
