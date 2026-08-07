const LINE_ADD_LINK = "https://lin.ee/VlTmydv"

export function LineCTA() {
  return (
    <div className="mt-16 rounded-2xl border border-neutral-800 bg-neutral-900 p-8 text-center">
      <p className="text-lg font-semibold text-white mb-3">
        自分の体、どこで止まっているか知っていますか？
      </p>
      <p className="text-sm text-neutral-400 mb-6 leading-relaxed">
        5フェーズ・ボトルネック診断で、いくつかの質問に答えるだけで
        <br className="hidden md:block" />
        あなたの体がどこで止まっているかが分かります。
      </p>
      <a
        href={LINE_ADD_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3 rounded-xl bg-emerald-500 text-black font-semibold hover:opacity-90 transition-opacity"
      >
        公式LINEで無料診断を試す
      </a>
    </div>
  )
}
