const YOUTUBE_URL = "https://www.youtube.com/channel/UCdKE82HB0yptEo1pEU066kg"

export function AuthorBio() {
  return (
    <div className="mt-14 pt-8 border-t border-rule flex items-start gap-4">
      <div className="w-10 h-10 border border-steel flex items-center justify-center flex-shrink-0 font-mono text-steel font-semibold text-sm">
        筋
      </div>
      <div>
        <p className="text-[15px] font-semibold text-ink mb-1.5">筋トレ科学ラボ</p>
        <p className="text-[14px] text-mute leading-relaxed max-w-[520px]">
          筋トレ・栄養・体の仕組みを、気合いや根性ではなく科学的根拠から解説するYouTubeチャンネル。
          「頑張っているのに変わらない」原因を、5つの工程から読み解いています。
        </p>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 font-mono text-[12px] text-steel hover:underline"
        >
          YouTubeチャンネル ↗
        </a>
      </div>
    </div>
  )
}
