import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";

export const alt = "Miloslav Hříbal, web developer: websites, e-shops and web apps (Nuxt, Next.js, TypeScript)";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Same look as the hero: black room, a pool of light, the name set huge in General Sans.
export default async function OpengraphImage() {
  const [bold, medium] = await Promise.all([
    readFile(new URL("../assets/og/general-sans-700.ttf", import.meta.url)),
    readFile(new URL("../assets/og/general-sans-500.ttf", import.meta.url)),
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "52px 60px 48px",
          color: "#f3f3ef",
          fontFamily: "General Sans",
          backgroundColor: "#000",
          backgroundImage: "radial-gradient(circle at 78% 30%, rgba(255,255,255,0.13), rgba(0,0,0,0) 55%)",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", fontSize: 26, fontWeight: 500 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            <div style={{ width: 14, height: 14, borderRadius: 14, background: "#8af0c8" }} />
            Taking new projects
          </div>
          <div style={{ display: "flex", color: "rgba(243,243,239,0.6)" }}>hribal.site</div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", fontWeight: 700, fontSize: 188, lineHeight: 0.98, letterSpacing: "-0.045em" }}>
          <div style={{ display: "flex" }}>MILOSLAV</div>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>HŘÍBAL</div>
        </div>

        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", fontSize: 30, fontWeight: 500 }}>
          <div style={{ display: "flex" }}>Websites, e-shops and web apps</div>
          <div style={{ display: "flex", color: "rgba(243,243,239,0.6)", fontSize: 24 }}>Nuxt, Next.js, TypeScript</div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "General Sans", data: bold, weight: 700, style: "normal" },
        { name: "General Sans", data: medium, weight: 500, style: "normal" },
      ],
    },
  );
}
