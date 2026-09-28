"use client"

import Image from "next/image"
import { sendGAEvent } from "@next/third-parties/google"

const LINE_ADD_LINK = "https://lin.ee/yy3wvxe"

export function LineCTA({ showDiagnosticImage = false }: { showDiagnosticImage?: boolean }) {
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
      {showDiagnosticImage && (
        <Image
          src="/images/five-phase-diagnostic.png"
          alt="5フェーズ・ボトルネック診断の結果イメージ。刺激・摂取・消化吸収・代謝・回復のうち、どこが止まっているかをレーダーチャートで表示"
          width={1040}
          height={1140}
          sizes="(min-width: 768px) 360px, 80vw"
          className="w-full max-w-[360px] h-auto mx-auto mb-6"
        />
      )}
      <p className="text-[14px] text-paper/70 mb-8 leading-relaxed max-w-[420px] mx-auto">
        5フェーズ・ボトルネック診断で、いくつかの質問に答えるだけで、あなたの体がどこで止まっているかが分かります。
      </p>
      <a
        href={LINE_ADD_LINK}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => sendGAEvent("event", "line_click", { location: "article_cta" })}
        className="inline-block px-8 py-3.5 bg-paper text-steel font-semibold text-[14px] hover:opacity-90 transition-opacity"
      >
        公式LINEで無料診断を試す
      </a>
    </div>
  )
}
