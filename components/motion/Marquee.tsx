"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";

const A = ["Nuxt", "Next.js", "Vue", "React", "TypeScript", "Tailwind", "Capacitor"];
const B = ["Node.js", "PostgreSQL", "Drizzle", "Supabase", "Docker", "Stripe", "GitHub Actions"];

function Band({ words, className }: { words: string[]; className: string }) {
  const row = words.flatMap((w) => [w, "✱"]);
  return (
    <div className={`mq-band ${className}`}>
      <div className="mq-track flex w-max">
        {[0, 1].map((k) => (
          <div key={k} className="flex shrink-0 items-center">
            {row.map((w, i) => (
              <span key={i} className={w === "✱" ? "mq-star" : "mq-word"}>
                {w}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

// Two bands of the stack cross like tape; they run with the scroll and speed up when you scroll fast.
export default function Marquee() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const tracks = gsap.utils.toArray<HTMLElement>(".mq-track");
      const loops = tracks.map((t, i) =>
        gsap.fromTo(t, { xPercent: i ? -50 : 0 }, { xPercent: i ? 0 : -50, duration: 38, ease: "none", repeat: -1 }).totalTime(38 * 400),
      );
      // Idle off-screen: no point ticking two endless tweens nobody can see.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top bottom",
        end: "bottom top",
        onToggle: (self) => loops.forEach((l) => (self.isActive ? l.resume() : l.pause())),
      });
      const lenis = window.__lenis;
      if (!lenis) return;
      let dir = 1;
      const settle = gsap
        .delayedCall(0.25, () => loops.forEach((l) => gsap.to(l, { timeScale: dir, duration: 1.2, overwrite: true })))
        .pause();
      const onScroll = ({ velocity }: { velocity: number }) => {
        if (velocity) dir = Math.sign(velocity);
        const speed = dir * (1 + Math.min(Math.abs(velocity) * 0.35, 9));
        loops.forEach((l) => gsap.to(l, { timeScale: speed, duration: 0.3, overwrite: true }));
        settle.restart(true);
      };
      lenis.on("scroll", onScroll);
      return () => lenis.off("scroll", onScroll);
    },
    { scope: root },
  );

  return (
    <div ref={root} aria-hidden="true" className="relative h-[44vh] min-h-[280px] overflow-hidden bg-coal select-none">
      <Band words={A} className="mq-a" />
      <Band words={B} className="mq-b" />
    </div>
  );
}
