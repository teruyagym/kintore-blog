import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllPostSlugs, getPostBySlug } from "@/lib/posts"
import { fetchPexelsPhoto } from "@/lib/pexels"
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
  const heroPhoto = await fetchPexelsPhoto(`gym ${post.phase || "training"} dark`)

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: post.title,
    description: post.description,
    datePublished: post.date,
    dateModified: post.date,
    author: { "@type": "Organization", name: "筋トレ科学ラボ" },
    publisher: { "@type": "Organization", name: "筋トレ科学ラボ" },
    mainEntityOfPage: url,
  }

  return (
    <main className="flex-1 pb-24">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      {/* Hero image */}
      <div className="relative h-[46vh] min-h-[320px] md:min-h-[420px] w-full overflow-hidden bg-ink">
        {heroPhoto && (
          <Image
            src={heroPhoto.url}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover opacity-60"
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-ink via-ink/40 to-ink/10" />
        <div className="absolute inset-0 flex items-end">
          <div className="max-w-[900px] mx-auto w-full px-6 pb-10">
            {post.phase && (
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-flag mb-4">
                {post.phase}
              </p>
            )}
            <h1 className="text-[28px] md:text-[44px] font-bold leading-[1.25] tracking-tight text-paper max-w-[760px]">
              {post.title}
            </h1>
          </div>
        </div>
        {heroPhoto && (
          <a
            href={heroPhoto.photographerUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="absolute bottom-2 right-3 font-mono text-[10px] text-paper/50 hover:text-paper/80"
          >
            Photo: {heroPhoto.photographer} / Pexels
          </a>
        )}
      </div>

      <article className="max-w-[760px] mx-auto px-6">
        <div className="pt-8 pb-6">
          <Breadcrumbs current={post.title} />
        </div>

        <div className="flex items-center gap-5 font-mono text-[12px] text-mute pb-10 border-b border-rule mb-10">
          <span>{post.date}</span>
          <span className="w-1 h-1 rounded-full bg-rule" />
          <span>約{post.readingTime}分で読めます</span>
          {post.phase && (
            <>
              <span className="w-1 h-1 rounded-full bg-rule" />
              <Link
                href={`/category/${encodeURIComponent(post.phase)}`}
                className="text-steel hover:underline"
              >
                {post.phase}
              </Link>
            </>
          )}
        </div>

        <PhaseFlowDiagram highlight={post.phase} />

        <TableOfContents items={post.toc} />

        <div
          className="prose prose-neutral max-w-none text-[17px] leading-[1.95]
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink
            prose-h2:text-[22px] prose-h2:mt-14 prose-h2:mb-5 prose-h2:pt-8 prose-h2:border-t prose-h2:border-rule
            prose-p:text-ink prose-p:leading-[1.95] prose-p:my-5
            prose-strong:text-ink prose-strong:font-semibold
            prose-a:text-steel prose-a:no-underline hover:prose-a:underline
            prose-li:text-ink prose-li:leading-[1.9] prose-li:my-1.5
            prose-ul:my-6"
          dangerouslySetInnerHTML={{ __html: post.contentHtml }}
        />

        <LineCTA />
        <AuthorBio />
        <RelatedPosts currentSlug={post.slug} />
      </article>
    </main>
  )
}
