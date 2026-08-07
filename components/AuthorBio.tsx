const YOUTUBE_URL = "https://www.youtube.com/channel/UCdKE82HB0yptEo1pEU066kg"

export function AuthorBio() {
  return (
    <div className="mt-16 flex items-start gap-4 p-6 rounded-2xl border border-neutral-200 bg-neutral-50">
      <div className="w-12 h-12 rounded-full bg-emerald-50 border border-emerald-200 flex items-center justify-center flex-shrink-0">
        <span className="text-emerald-600 font-bold text-sm">筋</span>
      </div>
      <div>
        <p className="text-sm font-semibold text-neutral-900 mb-1">筋トレ科学ラボ</p>
        <p className="text-xs text-neutral-500 leading-relaxed">
          筋トレ・栄養・体の仕組みを、気合いや根性ではなく科学的根拠から解説するYouTubeチャンネル。
          「頑張っているのに変わらない」原因を、5つの段階（刺激・摂取・消化吸収・代謝・回復）から読み解いています。
        </p>
        <a
          href={YOUTUBE_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block mt-3 text-xs text-emerald-600 hover:underline"
        >
          YouTubeチャンネルを見る →
        </a>
      </div>
    </div>
  )
}
