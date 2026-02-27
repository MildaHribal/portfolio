"use client";

import { useEffect, useRef, useState } from "react";

const lines = [
  { text: "const miloslav = {", color: "text-sky-400" },
  { text: '  role: "Fullstack Developer",', color: "text-emerald-300" },
  { text: '  stack: ["Next.js", "TypeScript", "Kotlin", "Docker"],', color: "text-amber-300" },
  { text: '  passion: "Building things that matter",', color: "text-violet-300" },
  { text: "  yearsOfExperience: 4,", color: "text-orange-300" },
  { text: "  available: true,", color: "text-emerald-400" },
  { text: "};", color: "text-sky-400" },
  { text: "", color: "" },
  { text: "// Let's build something great together 🚀", color: "text-zinc-500" },
];

export default function CodeTerminal() {
  const [visibleLines, setVisibleLines] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          let i = 0;
          const interval = setInterval(() => {
            i++;
            setVisibleLines(i);
            if (i >= lines.length) clearInterval(interval);
          }, 220);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="w-full py-6">
      <div className="max-w-3xl mx-auto px-6">
        <div className="rounded-2xl border border-zinc-800/60 bg-zinc-900/40 overflow-hidden shadow-2xl shadow-black/20">
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-zinc-900/80 border-b border-zinc-800/60">
            <span className="w-3 h-3 rounded-full bg-red-500/80" />
            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <span className="w-3 h-3 rounded-full bg-green-500/80" />
            <span className="ml-3 text-xs text-zinc-500 font-mono">developer.ts</span>
          </div>

          {/* Code body */}
          <div className="p-5 font-mono text-sm leading-7 min-h-[260px]">
            {lines.map((line, i) => (
              <div
                key={i}
                className={`transition-all duration-500 ${line.color}`}
                style={{
                  opacity: i < visibleLines ? 1 : 0,
                  transform: i < visibleLines ? "translateX(0)" : "translateX(-12px)",
                  transitionDelay: `${i * 40}ms`,
                }}
              >
                {line.text || "\u00A0"}
                {i === visibleLines - 1 && (
                  <span className="inline-block w-[7px] h-[14px] bg-emerald-400 ml-0.5 translate-y-[2px] animate-pulse" />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
