const LINE_ADD_LINK = "https://lin.ee/VlTmydv"

export function LineCTA() {
  return (
    <div className="mt-16 bg-steel px-7 py-10 md:px-10 md:py-12 text-center">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-paper/60 mb-4">
        5-Phase Bottleneck Check
      </p>
      <p className="text-[19px] md:text-[21px] font-semibold text-paper mb-4 leading-snug">
        自分の体、どこで止まっているか
        <br className="hidden md:block" />
        知っていますか。
      </p>
      <p className="text-[14px] text-paper/70 mb-8 leading-relaxed max-w-[420px] mx-auto">
        5フェーズ・ボトルネック診断で、いくつかの質問に答えるだけで、あなたの体がどこで止まっているかが分かります。
      </p>
      <a
        href={LINE_ADD_LINK}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-block px-8 py-3.5 bg-paper text-steel font-semibold text-[14px] hover:opacity-90 transition-opacity"
      >
        公式LINEで無料診断を試す
      </a>
    </div>
  )
}
