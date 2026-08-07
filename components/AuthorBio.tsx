import Image from "next/image"

const YOUTUBE_URL = "https://www.youtube.com/channel/UCdKE82HB0yptEo1pEU066kg"
const CHANNEL_ICON =
  "https://yt3.googleusercontent.com/qleQLhZChnUwQeGgFx6NNM_v18K9_MR_bLWSK_-QkoZlhT4-X47Klcuj6rd_7h63JHsAWgDx=s900-c-k-c0x00ffffff-no-rj"

export function AuthorBio() {
  return (
    <div className="mt-16 pt-10 border-t border-rule">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-5">
        この記事を書いたチャンネル
      </p>

      <div className="bg-paper-raised/60 border border-rule p-6 md:p-8 flex flex-col sm:flex-row gap-5 sm:gap-7 items-start">
        <div className="relative w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden flex-shrink-0 border border-rule">
          <Image
            src={CHANNEL_ICON}
            alt="筋トレ科学ラボ チャンネルアイコン"
            fill
            sizes="80px"
            className="object-cover"
          />
        </div>

        <div className="min-w-0 flex-1">
          <p className="text-[17px] font-semibold text-ink mb-2">筋トレ科学ラボ</p>
          <p className="text-[14px] text-mute leading-relaxed">
            筋トレ・栄養・体の仕組みを、気合いや根性ではなく科学的根拠から解説するYouTubeチャンネル。
            「頑張っているのに変わらない」原因を、体の中で起きていることから読み解いています。
          </p>

          <div className="mt-5">
            <a
              href={YOUTUBE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 bg-flag text-paper px-5 py-2.5 font-mono text-[12px] font-semibold hover:opacity-90 transition-opacity"
            >
              <svg viewBox="0 0 24 24" className="w-4 h-4 fill-current" aria-hidden="true">
                <path d="M23.5 6.2a3 3 0 0 0-2.1-2.1C19.5 3.5 12 3.5 12 3.5s-7.5 0-9.4.6A3 3 0 0 0 .5 6.2 31.3 31.3 0 0 0 0 12a31.3 31.3 0 0 0 .5 5.8 3 3 0 0 0 2.1 2.1c1.9.6 9.4.6 9.4.6s7.5 0 9.4-.6a3 3 0 0 0 2.1-2.1A31.3 31.3 0 0 0 24 12a31.3 31.3 0 0 0-.5-5.8ZM9.6 15.5V8.5L15.8 12Z" />
              </svg>
              YouTubeチャンネルを見る
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}
