"use client"

import { sendGAEvent } from "@next/third-parties/google"

const YOUTUBE_URL = "https://www.youtube.com/channel/UCdKE82HB0yptEo1pEU066kg"
const LINE_ADD_LINK = "https://lin.ee/yy3wvxe"

export function Footer() {
  return (
    <footer className="border-t border-rule mt-24">
      <div className="max-w-[760px] mx-auto px-6 py-14">
        <p className="text-base font-semibold text-ink mb-2">筋トレ科学ラボ</p>
        <p className="text-[15px] text-mute leading-relaxed mb-8 max-w-[480px]">
          筋トレ・栄養・体の仕組みを、気合いや根性ではなく科学的根拠から解説するチャンネル・ブログです。
        </p>
        <div className="flex gap-8 font-mono text-[13px] text-mute mb-10">
          <a href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer" className="hover:text-steel transition-colors">
            YouTube ↗
          </a>
          <a
            href={LINE_ADD_LINK}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => sendGAEvent("event", "line_click", { location: "footer" })}
            className="hover:text-steel transition-colors"
          >
            公式LINE ↗
          </a>
        </div>
        <p className="text-xs text-mute/80 leading-relaxed mb-4 max-w-[540px]">
          本ブログの内容は医療行為ではありません。疾病の診断・治療・予防を目的とするものではなく、医師による診断・治療の代替となるものではありません。健康上の問題がある方、治療中の方は必ず医師にご相談のうえご覧ください。
        </p>
        <p className="font-mono text-xs text-mute/60">
          © {new Date().getFullYear()} 筋トレ科学ラボ
        </p>
      </div>
    </footer>
  )
}
