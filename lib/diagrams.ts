function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}

function decodeEntities(value: string): string {
  return value
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&amp;/g, "&")
}

function splitLines(raw: string): string[] {
  return decodeEntities(raw)
    .split("\n")
    .map((l) => l.trim())
    .filter(Boolean)
}

interface Step {
  title: string
  desc: string
}

function parseSteps(raw: string): Step[] {
  return splitLines(raw).map((line) => {
    const idx = line.indexOf(":")
    if (idx === -1) return { title: line, desc: "" }
    return { title: line.slice(0, idx).trim(), desc: line.slice(idx + 1).trim() }
  })
}

interface KV {
  label: string
  value: number
}

function parseKV(raw: string): KV[] {
  return splitLines(raw)
    .map((line) => {
      const idx = line.indexOf(":")
      if (idx === -1) return null
      const label = line.slice(0, idx).trim()
      const valueStr = line.slice(idx + 1).trim()
      const value = parseFloat(valueStr.replace(/[^\d.]/g, ""))
      return Number.isFinite(value) ? { label, value } : null
    })
    .filter((x): x is KV => x !== null)
}

interface GaugeItem {
  label: string
  value: number
  max: number
}

function parseGauge(raw: string): GaugeItem[] {
  return splitLines(raw)
    .map((line) => {
      const idx = line.indexOf(":")
      if (idx === -1) return null
      const label = line.slice(0, idx).trim()
      const scoreStr = line.slice(idx + 1).trim()
      const m = scoreStr.match(/(\d+(?:\.\d+)?)\s*\/\s*(\d+(?:\.\d+)?)/)
      if (!m) return null
      return { label, value: parseFloat(m[1]), max: parseFloat(m[2]) }
    })
    .filter((x): x is GaugeItem => x !== null)
}

const CARD = "not-prose my-10 border border-rule bg-paper-raised/50 px-5 py-7 md:px-8 md:py-9"
const EYEBROW = "font-mono text-[11px] uppercase tracking-[0.2em] text-mute mb-8"

function renderFlow(raw: string, label: string): string {
  const steps = parseSteps(raw)
  if (steps.length === 0) return ""

  const desktopNodes = steps
    .map(
      (s) => `
        <div class="relative flex flex-col items-center text-center">
          <div class="w-3.5 h-3.5 rounded-full border-2 bg-paper border-steel relative z-10"></div>
          <p class="text-[14px] font-semibold mt-4 text-ink">${escapeHtml(s.title)}</p>
          ${s.desc ? `<p class="text-xs text-mute leading-snug mt-1.5 max-w-[130px]">${escapeHtml(s.desc)}</p>` : ""}
        </div>`
    )
    .join("")

  const mobileNodes = steps
    .map(
      (s) => `
        <div class="flex items-start gap-4">
          <div class="w-3.5 h-3.5 rounded-full border-2 bg-paper border-steel flex-shrink-0 mt-1.5"></div>
          <div>
            <p class="text-[14px] font-semibold text-ink">${escapeHtml(s.title)}</p>
            ${s.desc ? `<p class="text-xs text-mute leading-snug mt-1">${escapeHtml(s.desc)}</p>` : ""}
          </div>
        </div>`
    )
    .join("")

  return `<div class="${CARD}">
    <p class="${EYEBROW}">${escapeHtml(label)}</p>
    <div class="hidden md:grid relative" style="grid-template-columns:repeat(${steps.length},1fr);gap:1rem">
      <div class="absolute left-[8%] right-[8%] top-[6px] h-px bg-rule" aria-hidden="true"></div>
      ${desktopNodes}
    </div>
    <div class="md:hidden space-y-6">${mobileNodes}</div>
  </div>`
}

function renderCause(raw: string): string {
  const items = splitLines(raw)
  if (items.length === 0) return ""

  const nodes = items
    .map((item, i) => {
      const isLast = i === items.length - 1
      return `
        <div class="flex flex-col items-center">
          <div class="w-full border border-rule bg-paper px-5 py-4 text-center">
            <p class="text-[14px] text-ink leading-snug">${escapeHtml(item)}</p>
          </div>
          ${
            !isLast
              ? `<div class="my-1 text-steel text-[18px] leading-none">↓</div>`
              : ""
          }
        </div>`
    })
    .join("")

  return `<div class="${CARD}">
    <p class="${EYEBROW}">CAUSE &amp; EFFECT</p>
    <div class="max-w-[420px] mx-auto space-y-0">${nodes}</div>
  </div>`
}

function renderCompare(raw: string): string {
  const items = parseKV(raw)
  if (items.length === 0) return ""
  const max = Math.max(...items.map((i) => i.value), 1)

  const bars = items
    .map(
      (i) => `
        <div class="mb-5 last:mb-0">
          <div class="flex justify-between items-baseline mb-1.5">
            <span class="text-[13px] text-ink font-semibold">${escapeHtml(i.label)}</span>
            <span class="font-mono text-[12px] text-mute">${i.value}</span>
          </div>
          <div class="h-2.5 bg-rule/60 w-full">
            <div class="h-full bg-steel" style="width:${((i.value / max) * 100).toFixed(1)}%"></div>
          </div>
        </div>`
    )
    .join("")

  return `<div class="${CARD}">
    <p class="${EYEBROW}">COMPARISON</p>
    ${bars}
  </div>`
}

function renderBreakdown(raw: string): string {
  const items = parseKV(raw)
  if (items.length === 0) return ""
  const total = items.reduce((sum, i) => sum + i.value, 0) || 1
  const shades = ["bg-steel", "bg-steel/70", "bg-steel/45", "bg-flag/70", "bg-flag/40"]

  const segments = items
    .map(
      (i, idx) =>
        `<div class="h-full ${shades[idx % shades.length]}" style="width:${((i.value / total) * 100).toFixed(1)}%"></div>`
    )
    .join("")

  const legend = items
    .map(
      (i, idx) => `
        <div class="flex items-center gap-2 text-[13px] text-ink">
          <span class="w-2.5 h-2.5 ${shades[idx % shades.length]} flex-shrink-0"></span>
          <span>${escapeHtml(i.label)}</span>
          <span class="font-mono text-[12px] text-mute ml-auto">${((i.value / total) * 100).toFixed(0)}%</span>
        </div>`
    )
    .join("")

  return `<div class="${CARD}">
    <p class="${EYEBROW}">BREAKDOWN</p>
    <div class="h-4 w-full flex overflow-hidden">${segments}</div>
    <div class="mt-6 space-y-2.5 max-w-[360px]">${legend}</div>
  </div>`
}

function renderTrend(raw: string): string {
  const items = parseKV(raw)
  if (items.length < 2) return ""
  const max = Math.max(...items.map((i) => i.value))
  const min = Math.min(...items.map((i) => i.value), 0)
  const range = max - min || 1

  const W = 600
  const H = 160
  const padX = 40
  const padY = 20
  const stepX = (W - padX * 2) / (items.length - 1)

  const points = items.map((it, i) => {
    const x = padX + stepX * i
    const y = padY + (1 - (it.value - min) / range) * (H - padY * 2)
    return { x, y, it }
  })

  const polyline = points.map((p) => `${p.x.toFixed(1)},${p.y.toFixed(1)}`).join(" ")
  const dots = points
    .map((p) => `<circle cx="${p.x.toFixed(1)}" cy="${p.y.toFixed(1)}" r="4" fill="var(--color-steel)" />`)
    .join("")
  const labels = points
    .map(
      (p) =>
        `<text x="${p.x.toFixed(1)}" y="${H - 2}" font-size="11" text-anchor="middle" fill="var(--color-mute)">${escapeHtml(p.it.label)}</text>`
    )
    .join("")

  return `<div class="${CARD}">
    <p class="${EYEBROW}">TREND</p>
    <svg viewBox="0 0 ${W} ${H}" class="w-full h-auto" role="img" aria-label="推移グラフ">
      <polyline points="${polyline}" fill="none" stroke="var(--color-steel)" stroke-width="2" />
      ${dots}
      ${labels}
    </svg>
  </div>`
}

function renderTimeline(raw: string): string {
  return renderFlow(raw, "TIMELINE")
}

function renderGauge(raw: string): string {
  const items = parseGauge(raw)
  if (items.length === 0) return ""

  const rows = items
    .map((i) => {
      const filled = Math.round(i.value)
      const total = Math.round(i.max)
      const dots = Array.from({ length: total }, (_, idx) =>
        idx < filled
          ? `<span class="w-3.5 h-3.5 rounded-full bg-steel inline-block"></span>`
          : `<span class="w-3.5 h-3.5 rounded-full border border-rule inline-block"></span>`
      ).join("")
      return `
        <div class="flex items-center justify-between gap-4 mb-4 last:mb-0">
          <span class="text-[13px] text-ink">${escapeHtml(i.label)}</span>
          <span class="flex gap-1.5 flex-shrink-0">${dots}</span>
        </div>`
    })
    .join("")

  return `<div class="${CARD}">
    <p class="${EYEBROW}">SCORE</p>
    ${rows}
  </div>`
}

const RENDERERS: Record<string, (raw: string) => string> = {
  flow: (raw) => renderFlow(raw, "PROCESS"),
  timeline: renderTimeline,
  cause: renderCause,
  compare: renderCompare,
  breakdown: renderBreakdown,
  trend: renderTrend,
  gauge: renderGauge,
}

export function renderDiagramBlocks(html: string): string {
  const pattern = /<pre><code class="language-(flow|timeline|cause|compare|breakdown|trend|gauge)">([\s\S]*?)<\/code><\/pre>/g
  return html.replace(pattern, (_match, type: string, body: string) => {
    const renderer = RENDERERS[type]
    if (!renderer) return _match
    const rendered = renderer(body)
    return rendered || _match
  })
}
