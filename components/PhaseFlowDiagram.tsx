const phases = [
  { key: "刺激", desc: "トレーニングで筋肉に負荷を与える" },
  { key: "摂取", desc: "栄養を食事から取り込む" },
  { key: "消化吸収", desc: "栄養を分解し、体に取り込む" },
  { key: "代謝", desc: "取り込んだ栄養をエネルギーや材料に変える" },
  { key: "回復", desc: "壊れた筋繊維を修復し、合成する" },
]

export function PhaseFlowDiagram({ highlight }: { highlight?: string }) {
  return (
    <div className="not-prose my-10 p-6 rounded-2xl border border-neutral-800 bg-neutral-950">
      <p className="text-[11px] font-mono uppercase tracking-[0.15em] text-neutral-500 mb-6">
        筋肉が作られる5つの段階
      </p>
      <div className="flex flex-col md:flex-row md:items-stretch gap-2">
        {phases.map((phase, i) => {
          const isHighlight = phase.key === highlight
          return (
            <div key={phase.key} className="flex md:flex-1 items-center gap-2">
              <div
                className={`flex-1 p-3 rounded-xl border text-center ${
                  isHighlight
                    ? "border-emerald-500 bg-emerald-500/10"
                    : "border-neutral-800 bg-neutral-900"
                }`}
              >
                <p
                  className={`text-sm font-semibold ${
                    isHighlight ? "text-emerald-400" : "text-neutral-300"
                  }`}
                >
                  {phase.key}
                </p>
                <p className="text-[10px] text-neutral-500 mt-1 leading-snug hidden md:block">
                  {phase.desc}
                </p>
              </div>
              {i < phases.length - 1 && (
                <span className="text-neutral-700 text-sm flex-shrink-0 md:rotate-0 rotate-90">
                  →
                </span>
              )}
            </div>
          )
        })}
      </div>
      {highlight && (
        <p className="text-xs text-emerald-400/80 mt-4">
          ※ この記事で扱っているのは主に「{highlight}」の段階です
        </p>
      )}
    </div>
  )
}
