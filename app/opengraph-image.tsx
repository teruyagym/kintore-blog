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
          alignItems: "center",
          justifyContent: "center",
          background: "#ffffff",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#059669",
            letterSpacing: 4,
            textTransform: "uppercase",
            marginBottom: 24,
          }}
        >
          Science-based
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 700,
            color: "#18181b",
          }}
        >
          筋トレ科学ラボ
        </div>
        <div
          style={{
            fontSize: 32,
            color: "#71717a",
            marginTop: 24,
          }}
        >
          筋トレ・栄養・体の仕組みを、科学的根拠から
        </div>
      </div>
    ),
    { ...size }
  )
}
