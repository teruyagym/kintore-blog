import Link from "next/link"
import { notFound } from "next/navigation"
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts"
import { LineCTA } from "@/components/LineCTA"
import { AuthorBio } from "@/components/AuthorBio"
import { RelatedPosts } from "@/components/RelatedPosts"
import { PhaseFlowDiagram } from "@/components/PhaseFlowDiagram"
import { TableOfContents } from "@/components/TableOfContents"
import { Breadcrumbs } from "@/components/Breadcrumbs"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kintore-blog.vercel.app"

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
  const url = `${SITE_URL}/blog/${post.slug}`
  return {
    title: post.title,
    description: post.description,
    alternates: { canonical: url },
    openGraph: {
      title: post.title,
      description: post.description,
      url,
      type: "article",
      publishedTime: post.date,
    },
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
  const url = `${SITE_URL}/blog/${post.slug}`

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: {
      "@type": "Organization",
      name: "筋トレ科学ラボ",
    },
    publisher: {
      "@type": "Organization",
      name: "筋トレ科学ラボ",
    },
    mainEntityOfPage: url,
  }

  return (
    <main className="flex-1 text-neutral-900 px-6 py-16">
      <article className="max-w-[720px] mx-auto">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />

        <Breadcrumbs current={post.title} />

        <Link
          href="/"
          className="text-sm text-neutral-400 hover:text-emerald-600 transition-colors"
        >
          ← ブログ一覧に戻る
        </Link>

        <div className="flex items-center gap-3 mt-8 mb-2">
          <p className="text-xs text-neutral-400">{post.date}</p>
          <span className="text-xs text-neutral-300">·</span>
          <p className="text-xs text-neutral-400">約{post.readingTime}分で読めます</p>
        </div>
        <h1 className="text-3xl font-bold leading-tight mb-10 text-neutral-900">
          {post.title}
        </h1>

        <PhaseFlowDiagram highlight={post.phase} />

        <TableOfContents items={post.toc} />

        <div
          className="prose prose-neutral max-w-none prose-headings:font-semibold prose-a:text-emerald-600"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <LineCTA />
        <AuthorBio />
        <RelatedPosts currentSlug={post.slug} />
      </article>
    </main>
  )
}
