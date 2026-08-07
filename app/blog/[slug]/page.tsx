import Link from "next/link"
import Image from "next/image"
import { notFound } from "next/navigation"
import { getAllPostSlugs, getPostBySlug, insertMidContentImage } from "@/lib/posts"
import { fetchPexelsPhoto, pickQueryForPost } from "@/lib/pexels"
import { LineCTA } from "@/components/LineCTA"
import { AuthorBio } from "@/components/AuthorBio"
import { RelatedPosts } from "@/components/RelatedPosts"
import { PhaseFlowDiagram } from "@/components/PhaseFlowDiagram"
import { TableOfContents } from "@/components/TableOfContents"
import { Breadcrumbs } from "@/components/Breadcrumbs"

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || "https://kintore-blog.vercel.app"

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

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
  const heroPhoto = await fetchPexelsPhoto(pickQueryForPost(post.slug, post.phase))
  const bodyPhoto = await fetchPexelsPhoto(pickQueryForPost(post.slug, post.phase, 1))

  const contentHtml = bodyPhoto
    ? insertMidContentImage(
        post.contentHtml,
        `<figure class="not-prose my-10 -mx-6 md:mx-0">
          <img src="${escapeHtml(bodyPhoto.url)}" alt="${escapeHtml(bodyPhoto.alt)}" loading="lazy" class="w-full aspect-[16/9] object-cover md:rounded-sm" />
          <figcaption class="mt-2 text-right font-mono text-[10px] text-mute">Photo: ${escapeHtml(bodyPhoto.photographer)} / Pexels</figcaption>
        </figure>`
      )
    : post.contentHtml

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

        <TableOfContents items={post.toc} />

        <div
          className="prose prose-neutral max-w-none text-[17px] leading-[1.95]
            prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-ink
            prose-h2:text-[22px] prose-h2:mt-14 prose-h2:mb-5 prose-h2:pt-8 prose-h2:border-t prose-h2:border-rule
            prose-h2:flex prose-h2:items-center prose-h2:gap-3
            [&_h2]:before:content-[''] [&_h2]:before:block [&_h2]:before:w-[9px] [&_h2]:before:h-[9px] [&_h2]:before:bg-flag [&_h2]:before:flex-shrink-0
            prose-h3:text-[18px] prose-h3:mt-8 prose-h3:mb-3
            prose-p:text-ink prose-p:leading-[1.95] prose-p:my-5
            prose-strong:text-ink prose-strong:font-semibold prose-strong:bg-steel-light prose-strong:px-1 prose-strong:box-decoration-clone
            prose-a:text-steel prose-a:no-underline hover:prose-a:underline
            prose-li:text-ink prose-li:leading-[1.9] prose-li:my-1.5
            prose-ol:my-8 prose-ol:p-0 prose-ol:list-none prose-ol:border prose-ol:border-rule prose-ol:divide-y prose-ol:divide-rule
            [&_ol]:bg-paper-raised/40
            [&_ol>li]:relative [&_ol>li]:pl-16 [&_ol>li]:pr-6 [&_ol>li]:py-5 [&_ol>li]:my-0
            [&_ol]:[counter-reset:pt]
            [&_ol>li]:[counter-increment:pt]
            [&_ol>li:before]:content-[counter(pt)] [&_ol>li:before]:absolute [&_ol>li:before]:left-5 [&_ol>li:before]:top-5
            [&_ol>li:before]:font-mono [&_ol>li:before]:text-[13px] [&_ol>li:before]:font-semibold [&_ol>li:before]:text-steel
            [&_ol>li:before]:w-7 [&_ol>li:before]:h-7 [&_ol>li:before]:rounded-full [&_ol>li:before]:border [&_ol>li:before]:border-steel
            [&_ol>li:before]:flex [&_ol>li:before]:items-center [&_ol>li:before]:justify-center
            prose-ul:my-8 prose-ul:p-0 prose-ul:list-none prose-ul:border prose-ul:border-rule prose-ul:divide-y prose-ul:divide-rule
            [&_ul]:bg-paper-raised/40
            [&_ul>li]:relative [&_ul>li]:pl-16 [&_ul>li]:pr-6 [&_ul>li]:py-4 [&_ul>li]:my-0
            [&_ul>li:before]:content-['✓'] [&_ul>li:before]:absolute [&_ul>li:before]:left-5 [&_ul>li:before]:top-4
            [&_ul>li:before]:text-[12px] [&_ul>li:before]:font-bold [&_ul>li:before]:text-paper
            [&_ul>li:before]:w-6 [&_ul>li:before]:h-6 [&_ul>li:before]:rounded-full [&_ul>li:before]:bg-steel
            [&_ul>li:before]:flex [&_ul>li:before]:items-center [&_ul>li:before]:justify-center
            prose-blockquote:not-italic prose-blockquote:font-normal prose-blockquote:border-l-0
            [&_blockquote]:relative [&_blockquote]:my-8 [&_blockquote]:pl-14 [&_blockquote]:pr-6 [&_blockquote]:py-5
            [&_blockquote]:bg-paper-raised/70 [&_blockquote]:border [&_blockquote]:border-rule
            [&_blockquote]:before:content-['💡'] [&_blockquote]:before:absolute [&_blockquote]:before:left-5 [&_blockquote]:before:top-5 [&_blockquote]:before:text-[17px]
            [&_blockquote_p]:text-[15px] [&_blockquote_p]:text-mute [&_blockquote_p]:leading-relaxed [&_blockquote_p]:my-0
            [&_blockquote_strong]:text-ink"
          dangerouslySetInnerHTML={{ __html: contentHtml }}
        />

        <PhaseFlowDiagram highlight={post.phase} />

        <LineCTA />
        <AuthorBio />
        <RelatedPosts currentSlug={post.slug} />
      </article>
    </main>
  )
}
