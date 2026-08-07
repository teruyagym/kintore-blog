const YOUTUBE_URL = "https://www.youtube.com/@kintorekagakulab"

export function AuthorBio() {
  return (
    <div className="mt-16 flex items-start gap-4 p-6 rounded-2xl border border-neutral-800 bg-neutral-950">
      <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center flex-shrink-0">
        <span className="text-emerald-400 font-bold text-sm">筋</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-white mb-1">筋トレ科学ラボ</p>
        <p className="text-xs text-neutral-400 leading-relaxed">
          筋トレ・栄養・体の仕組みを、気合いや根性ではなく科学的根拠から解説するYouTubeチャンネル。
          「頑張っているのに変わらない」原因を、5つの段階（刺激・摂取・消化吸収・代謝・回復）から読み解いています。
        </p>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-emerald-400 hover:underline"
        >
          YouTubeチャンネルを見る →
        </a>
      </div>
    </div>
  )
}
