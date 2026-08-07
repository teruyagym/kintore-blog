import Link from "next/link"

const YOUTUBE_URL = "https://www.youtube.com/channel/UCdKE82HB0yptEo1pEU066kg"

export function Header() {
  return (
    <header className="border-b border-neutral-200">
      <div className="max-w-[720px] mx-auto px-6 py-5 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <span className="text-sm font-bold text-neutral-900 tracking-tight">
            筋トレ科学ラボ
          </span>
          <span className="text-[10px] font-mono uppercase tracking-[0.15em] text-emerald-600">
            Blog
          </span>
        </Link>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-xs text-neutral-500 hover:text-emerald-600 transition-colors"
        >
          YouTubeを見る →
        </a>
      </div>
    </header>
  )
}
