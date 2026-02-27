import Typewriter from "@/components/Typewriter";
import HeroCTAs from "@/components/HeroCTAs";

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Subtle radial glow behind hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 flex items-center justify-center"
      >
        <div className="w-[600px] h-[600px] rounded-full bg-zinc-800/20 blur-[120px]" />
      </div>

      {/* Dotted grid decoration */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, #fff 1px, transparent 1px)",
          backgroundSize: "32px 32px",
        }}
      />

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-zinc-800 bg-zinc-900/50 text-xs text-zinc-400 mb-8 animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          AVAILABLE FO PROJECT
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up animation-delay-100 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.08] mb-6">
          Hi, I&apos;m{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-zinc-100 to-zinc-400">
            Miloslav Hříbal
          </span>
          <br />
          <Typewriter />
        </h1>

        {/* Sub-copy */}
        <p className="animate-fade-up animation-delay-200 max-w-xl mx-auto text-zinc-400 text-lg leading-relaxed mb-10">
          I craft clean, performant web experiences with React and Next.js —
          turning ambitious ideas into pixel-perfect, accessible interfaces that
          feel as good as they look.
        </p>

        {/* CTA buttons */}
        <HeroCTAs />

        {/* Scroll hint */}
        <div className="animate-fade-up animation-delay-400 mt-20 flex justify-center">
          <div className="flex flex-col items-center gap-1 text-zinc-600 text-xs tracking-widest uppercase">
            <span>Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
