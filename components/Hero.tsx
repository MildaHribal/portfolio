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

      <div className="relative max-w-6xl mx-auto px-6 py-32 text-left">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 px-3 py-1 text-xs text-zinc-400 mb-8 animate-fade-up">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
          </span>
          AVAILABLE FOR PROJECTS
        </div>

        {/* Headline */}
        <h1 className="animate-fade-up animation-delay-100 text-5xl sm:text-6xl md:text-7xl font-bold tracking-tight text-zinc-50 leading-[1.08] mb-6">
          <span className="text-zinc-50">
            Miloslav Hříbal
          </span>
          <br />
          <Typewriter />
        </h1>

        {/* Sub-copy */}
        <p className="animate-fade-up animation-delay-200 max-w-2xl text-zinc-400 text-lg sm:text-xl leading-relaxed mb-6">
          Software Engineer & Fullstack Developer with 4 years of experience. 
          I build robust backend systems in Kotlin & Node.js, modern web platforms 
          with Next.js & Nuxt.js, and manage production Linux/Docker infrastructure.
        </p>

        {/* Location */}
        <div className="animate-fade-up animation-delay-200 flex items-center gap-2 text-zinc-500 mb-10 text-sm">
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          Czech Republic
        </div>

        {/* Stats */}
        <div className="animate-fade-up animation-delay-300 flex items-center gap-8 mb-10">
          <div>
            <div className="text-2xl font-bold text-zinc-50 mb-1">4+</div>
            <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Years Experience</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-50 mb-1">10+</div>
            <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Technologies</div>
          </div>
          <div>
            <div className="text-2xl font-bold text-zinc-50 mb-1">3+</div>
            <div className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">Production Apps</div>
          </div>
        </div>

        {/* CTA buttons */}
        <div className="animate-fade-up animation-delay-400">
          <HeroCTAs />
        </div>

        {/* Scroll hint */}
        <div className="animate-fade-up animation-delay-500 mt-20 flex justify-center w-full">
          <div className="flex flex-col items-center gap-1 text-zinc-500 text-xs tracking-widest uppercase">
            <span>Scroll</span>
            <div className="w-px h-8 bg-gradient-to-b from-zinc-600 to-transparent" />
          </div>
        </div>
      </div>
    </section>
  );
}
