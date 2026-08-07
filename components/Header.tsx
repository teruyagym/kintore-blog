import Link from "next/link"

const YOUTUBE_URL = "https://www.youtube.com/channel/UCdKE82HB0yptEo1pEU066kg"

export function Header() {
  return (
    <header className="border-b border-rule">
      <div className="max-w-[760px] mx-auto px-6 py-6 flex items-center justify-between">
        <Link href="/" className="flex items-baseline gap-2.5">
          <span className="text-base font-semibold text-ink tracking-tight">
            筋トレ科学ラボ
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-steel">
            Lab Notes
          </span>
        </Link>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="font-mono text-[13px] text-mute hover:text-steel transition-colors"
        >
          YouTube ↗
        </a>
      </div>
    </header>
  )
}
