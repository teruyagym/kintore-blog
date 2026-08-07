const phases = [
  { key: "刺激", en: "STIMULUS", desc: "トレーニングで筋肉に負荷を与える" },
  { key: "摂取", en: "INTAKE", desc: "栄養を食事から取り込む" },
  { key: "消化吸収", en: "ABSORPTION", desc: "栄養を分解し、体に取り込む" },
  { key: "代謝", en: "METABOLISM", desc: "エネルギーや材料に変える" },
  { key: "回復", en: "RECOVERY", desc: "筋繊維を修復し、合成する" },
]

export function PhaseFlowDiagram({ highlight }: { highlight?: string }) {
  return (
    <div className="not-prose my-12 border border-rule bg-paper-raised/60 px-5 py-7 md:px-8 md:py-9">
      <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-9">
        Fig. 1 — 筋肉が作られる5つの工程
      </p>

      {/* desktop: horizontal pipeline with a connecting rule through the nodes */}
      <div className="hidden md:grid md:grid-cols-5 md:gap-4 relative">
        <div className="absolute left-[10%] right-[10%] top-[6px] h-px bg-rule" aria-hidden />
        {phases.map((phase) => {
          const isFlagged = phase.key === highlight
          return (
            <div key={phase.key} className="relative flex flex-col items-center text-center">
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 relative z-10 ${
                  isFlagged ? "bg-flag border-flag" : "bg-paper border-steel"
                }`}
              />
              <p className={`text-[15px] font-semibold mt-4 ${isFlagged ? "text-flag" : "text-ink"}`}>
                {phase.key}
              </p>
              <p className="font-mono text-[9px] tracking-[0.15em] text-mute uppercase mt-0.5">
                {phase.en}
              </p>
              <p className="text-xs text-mute leading-snug mt-1.5 max-w-[120px]">
                {phase.desc}
              </p>
            </div>
          )
        })}
      </div>

      {/* mobile: vertical list */}
      <div className="md:hidden space-y-5">
        {phases.map((phase) => {
          const isFlagged = phase.key === highlight
          return (
            <div key={phase.key} className="flex items-center gap-4">
              <div
                className={`w-3.5 h-3.5 rounded-full border-2 flex-shrink-0 ${
                  isFlagged ? "bg-flag border-flag" : "bg-paper border-steel"
                }`}
              />
              <div>
                <span className={`text-[15px] font-semibold ${isFlagged ? "text-flag" : "text-ink"}`}>
                  {phase.key}
                </span>
                <span className="font-mono text-[9px] tracking-[0.15em] text-mute uppercase ml-2">
                  {phase.en}
                </span>
              </div>
            </div>
          )
        })}
      </div>

      {highlight && (
        <p className="text-[13px] text-flag mt-8 pt-5 border-t border-rule flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-flag inline-block flex-shrink-0" />
          この記事が扱っているのは、主に「{highlight}」の工程です
        </p>
      )}
    </div>
  )
}
