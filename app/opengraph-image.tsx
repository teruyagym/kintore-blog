import { ImageResponse } from "next/og"

export const size = { width: 1200, height: 630 }
export const contentType = "image/png"

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#faf9f6",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", fontSize: 22, color: "#1d4e4a", letterSpacing: 4, textTransform: "uppercase" }}>
          Body Flow Report
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 64, fontWeight: 700, color: "#1c1e1b" }}>
            筋トレ科学ラボ
          </div>
          <div style={{ fontSize: 28, color: "#6b6558", marginTop: 20 }}>
            体は、努力ではなく仕組みで変わる。
          </div>
        </div>
        <div style={{ display: "flex", gap: 32, fontSize: 18, color: "#1d4e4a" }}>
          <div style={{ display: "flex" }}>刺激</div>
          <div style={{ display: "flex" }}>摂取</div>
          <div style={{ display: "flex" }}>消化吸収</div>
          <div style={{ display: "flex" }}>代謝</div>
          <div style={{ display: "flex" }}>回復</div>
        </div>
      </div>
    ),
    { ...size }
  )
}
