import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Miloslav Hříbal, frontend and fullstack developer (Vue, Nuxt, React, Next.js, TypeScript)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const spines = [
  { name: "Týnky Bordel", color: "#e889b5" },
  { name: "BudBuddy", color: "#123524" },
  { name: "SkinsMC", color: "#4e8a56" },
  { name: "Minecraft IP List", color: "#7fb6ec" },
  { name: "Questie", color: "#9ec5f7" },
];

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#0f0f0f", color: "#f2f2ee", fontFamily: "sans-serif" }}>
        <div style={{ display: "flex", flexDirection: "column", padding: "56px 64px 40px" }}>
          <div style={{ fontSize: 92, fontWeight: 800, letterSpacing: "-0.03em", lineHeight: 1 }}>Miloslav Hříbal</div>
          <div style={{ fontSize: 34, fontWeight: 600, marginTop: 18 }}>Frontend and fullstack developer, Pilsen</div>
        </div>
        <div style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 10, background: "#1d1d1d", padding: "0 64px", borderBottom: "14px solid #000" }}>
          {spines.map((s) => (
            <div key={s.name} style={{ display: "flex", flexDirection: "column", width: 190, height: 230, background: "#141414", color: "#f2f2ee", border: "3px solid #f2f2ee", borderBottom: "none" }}>
              <div style={{ height: 44, background: s.color, borderBottom: "3px solid #f2f2ee" }} />
              <div style={{ display: "flex", padding: "14px 14px", fontSize: 28, fontWeight: 800, lineHeight: 1.05 }}>{s.name}</div>
            </div>
          ))}
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", padding: "18px 64px", background: "#141414", fontSize: 26, fontWeight: 600 }}>
          <span>Shipped work: client shop, paid Minecraft platforms, own apps</span>
          <span>hribal.site</span>
        </div>
      </div>
    ),
    { ...size }
  );
}
