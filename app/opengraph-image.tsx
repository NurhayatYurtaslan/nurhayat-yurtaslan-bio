import { ImageResponse } from "next/og";

export const alt = "Nurhayat Yurtaslan — Agentic AI Developer | Mobile Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", justifyContent: "center", padding: 80, background: "#f1f1ef", color: "#202124", fontFamily: "sans-serif" }}>
      <div style={{ fontSize: 18, letterSpacing: 5, color: "#696b70", marginBottom: 36 }}>PERSONAL PORTFOLIO</div>
      <div style={{ fontSize: 76, fontWeight: 700, letterSpacing: -3 }}>Nurhayat Yurtaslan</div>
      <div style={{ fontSize: 30, color: "#696b70", marginTop: 24 }}>Agentic AI Developer | Mobile Engineer</div>
      <div style={{ fontSize: 22, marginTop: 70 }}>nurhayatyurtaslan.com</div>
    </div>,
    size,
  );
}
