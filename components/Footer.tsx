const YOUTUBE_URL = "https://www.youtube.com/@kintorekagakulab"
const LINE_ADD_LINK = "https://lin.ee/VlTmydv"

export function Footer() {
  return (
    <footer className="border-t border-neutral-800 mt-24">
      <div className="max-w-[720px] mx-auto px-6 py-12">
        <p className="text-sm font-bold text-white mb-2">筋トレ科学ラボ</p>
        <p className="text-xs text-neutral-500 leading-relaxed mb-6">
          筋トレ・栄養・体の仕組みを、気合いや根性ではなく科学的根拠から解説するチャンネル・ブログです。
        </p>
        <div className="flex gap-6 text-xs text-neutral-400 mb-8">
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            YouTube
          </a>
          <a
            href={LINE_ADD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-emerald-400 transition-colors"
          >
            公式LINE
          </a>
        </div>
        <p className="text-[10px] text-neutral-600 leading-relaxed mb-4">
          本ブログの内容は医療行為ではありません。疾病の診断・治療・予防を目的とするものではなく、医師による診断・治療の代替となるものではありません。健康上の問題がある方、治療中の方は必ず医師にご相談のうえご覧ください。
        </p>
        <p className="text-[10px] text-neutral-600">
          © {new Date().getFullYear()} 筋トレ科学ラボ
        </p>
      </div>
    </footer>
  )
}
