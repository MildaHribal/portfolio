"use client";

import { useEffect, useRef, useState } from "react";

const stats = [
  { value: 4, suffix: "+", label: "Years of experience" },
  { value: 3, suffix: "", label: "Live projects" },
  { value: 10, suffix: "+", label: "Technologies mastered" },
  { value: 100, suffix: "k+", label: "Users reached" },
];

function Counter({ target, suffix }: { target: number; suffix: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 1200;
          const steps = 40;
          const increment = target / steps;
          let current = 0;
          const interval = setInterval(() => {
            current += increment;
            if (current >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(Math.floor(current));
            }
          }, duration / steps);
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {count >= target ? suffix : ""}
    </span>
  );
}

export default function StatsStrip() {
  return (
    <div className="w-full py-8">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat) => (
            <div
              key={stat.label}
              className="flex flex-col items-center text-center p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:border-zinc-700/60 hover:bg-zinc-900/40 transition-all duration-300"
            >
              <p className="text-3xl font-bold text-zinc-50 mb-1">
                <Counter target={stat.value} suffix={stat.suffix} />
              </p>
              <p className="text-xs text-zinc-500 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
