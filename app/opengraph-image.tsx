import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt =
  "Miloslav Hříbal — Fullstack Developer (React, Next.js, TypeScript, Kotlin)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "80px",
          background:
            "radial-gradient(1200px 600px at 80% 0%, rgba(16,185,129,0.18), transparent 60%), radial-gradient(900px 500px at 10% 100%, rgba(16,185,129,0.08), transparent 60%), #09090b",
          color: "#fafafa",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "16px",
            color: "#a1a1aa",
            fontSize: 22,
            letterSpacing: "0.2em",
            textTransform: "uppercase",
          }}
        >
          <span
            style={{
              width: 14,
              height: 14,
              borderRadius: 999,
              background: "#10b981",
              boxShadow: "0 0 24px #10b981",
            }}
          />
          hribal.site · available for hire
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
          <div
            style={{
              fontSize: 88,
              fontWeight: 800,
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
              color: "#fafafa",
            }}
          >
            Miloslav Hříbal
          </div>
          <div
            style={{
              fontSize: 48,
              fontWeight: 500,
              color: "#10b981",
              letterSpacing: "-0.01em",
            }}
          >
            Fullstack Developer
          </div>
          <div
            style={{
              fontSize: 30,
              color: "#a1a1aa",
              maxWidth: 980,
              lineHeight: 1.35,
            }}
          >
            4+ years building production web apps · React, Next.js,
            TypeScript, Nuxt.js, Kotlin & Docker · Pilsen, Czech Republic
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            color: "#71717a",
            fontSize: 24,
          }}
        >
          <div style={{ display: "flex", gap: 28 }}>
            <span>React</span>
            <span>·</span>
            <span>Next.js</span>
            <span>·</span>
            <span>TypeScript</span>
            <span>·</span>
            <span>Kotlin</span>
            <span>·</span>
            <span>Docker</span>
          </div>
          <div style={{ color: "#fafafa", fontWeight: 600 }}>hribal.site</div>
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
