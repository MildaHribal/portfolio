"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { finishIntro } from "@/lib/intro";

// A hand-drawn loop: a circle whose radius wobbles a little, drawn past its start so the ends overlap.
function loopPath() {
  const cx = 300, cy = 150, R = 128;
  const pts: string[] = [];
  const steps = 180;
  for (let i = 0; i <= steps; i++) {
    const a = -0.9 + (i / steps) * (Math.PI * 2 + 1.25);
    const r = R * (1 + 0.055 * Math.sin(a * 5 + 0.6) + 0.03 * Math.sin(a * 11 + 2.1)) + i * 0.06;
    pts.push(`${(cx + Math.cos(a) * r * 1.55).toFixed(1)} ${(cy + Math.sin(a) * r * 0.82).toFixed(1)}`);
  }
  return `M${pts.join(" L")}`;
}

const PATH = loopPath();

export default function Preloader() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = root.current!;
      let seen = false;
      try {
        seen = sessionStorage.getItem("intro") === "1";
        sessionStorage.setItem("intro", "1");
      } catch {}

      if (seen || prefersReducedMotion()) {
        el.style.display = "none";
        finishIntro();
        return;
      }

      window.__lenis?.stop();
      const tl = gsap.timeline({
        onComplete: () => {
          el.style.display = "none";
          window.__lenis?.start();
        },
      });

      tl.from(".pl-char", { yPercent: 60, opacity: 0, filter: "blur(10px)", duration: 0.7, stagger: 0.06, ease: "power3.out" })
        .fromTo(".pl-loop", { drawSVG: "0% 0%" }, { drawSVG: "0% 100%", duration: 1.5, ease: "power2.inOut" }, 0.2)
        .from(".pl-dot", { scale: 0, duration: 0.5, ease: "back.out(3)" }, "-=0.55")
        .to(".pl-stage", { scale: 0.92, opacity: 0, filter: "blur(8px)", duration: 0.6, ease: "power2.in" }, "+=0.25")
        .to(el, { clipPath: "inset(0% 0% 100% 0%)", duration: 1, ease: "expo.inOut" }, "-=0.2")
        .add(finishIntro, "-=0.65");
    },
    { scope: root },
  );

  return (
    <div ref={root} className="preloader" aria-hidden="true">
      <div className="pl-stage relative">
        <svg viewBox="0 0 600 300" className="absolute inset-0 m-auto w-[min(92vw,640px)] overflow-visible">
          <path className="pl-loop" d={PATH} fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </svg>
        <p className="pl-word font-display">
          {"HŘÍBAL".split("").map((c, i) => (
            <span key={i} className="pl-char inline-block">
              {c}
            </span>
          ))}
          <span className="pl-dot inline-block">.</span>
        </p>
      </div>
    </div>
  );
}
