import { HeroCan } from './HeroCan';
import { Counter, Magnetic, SectionNumber } from './interactive';

export function Hero() {
  return (
    <section className="relative content-grid pt-12 md:pt-20 pb-12 md:pb-16 overflow-hidden">
      <Crosshair className="absolute top-4 left-4 text-wall-edge hidden md:block" />
      <Crosshair className="absolute top-4 right-4 text-wall-edge hidden md:block" />

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        {/* LEFT — headline */}
        <div className="lg:col-span-8 relative">
          <SectionNumber n="00" label="Vol. 2026 · Drop" className="mb-8 animate-rise" />

          <h1 className="display-tight leading-[0.86]">
            <span className="block text-[12vw] sm:text-[9vw] lg:text-[6.2vw] xl:text-[100px]">
              <SprayLine word="NEJVĚTŠÍ VÝBĚR" delay="80ms" accent="#ff2d4a" />
            </span>
            <span className="block text-[12vw] sm:text-[9vw] lg:text-[6.2vw] xl:text-[100px]">
              <SprayLine
                word="MONTANA CANS V ČR."
                delay="320ms"
                accent="#ffd400"
              />
            </span>

            <span className="block mt-4 md:mt-6 text-[8vw] sm:text-[6vw] lg:text-[4vw] xl:text-[66px] leading-[0.95]">
              <span
                className="inline-block animate-spray-reveal text-bone"
                style={{ animationDelay: '600ms' }}
              >
                PŘES
              </span>
              <span className="inline-block w-[0.3em]" />
              <span
                className="inline-block animate-spray-reveal"
                style={{ animationDelay: '680ms', color: 'var(--accent)' }}
              >
                200
              </span>
              <span className="inline-block w-[0.3em]" />
              <span
                className="inline-block animate-spray-reveal text-bone"
                style={{ animationDelay: '760ms' }}
              >
                ODSTÍNŮ
              </span>
              <span className="inline-block w-[0.3em]" />
              <span
                className="inline-block animate-spray-reveal text-bone"
                style={{ animationDelay: '840ms' }}
              >
                SKLADEM.
              </span>
            </span>
          </h1>

          <div className="mt-5 h-1.5 w-40 bg-bone origin-left animate-drip relative">
            <span className="absolute left-3 -bottom-3 w-1.5 h-3 bg-bone" />
            <span className="absolute left-14 -bottom-5 w-1 h-5 bg-bone" />
            <span className="absolute left-28 -bottom-2 w-1 h-2 bg-bone" />
          </div>

          <p
            className="mt-10 max-w-xl text-base md:text-lg text-bone/80 leading-relaxed animate-rise"
            style={{ animationDelay: '950ms' }}
          >
            Oficiální dovozce Montana Cans pro ČR. Vyber svoji barvu na stěně níž —{' '}
            <span className="text-bone underline decoration-tape decoration-2 underline-offset-4">
              z Brna k tobě do 24 hodin
            </span>
            .
          </p>

          <div
            className="mt-8 flex flex-wrap gap-3 animate-rise items-center"
            style={{ animationDelay: '720ms' }}
          >
            <Magnetic strength={0.4}>
              <a href="#stena" className="btn-primary">
                Procházet stěnu
                <Arrow />
              </a>
            </Magnetic>
            <a href="#produkty" className="btn-ghost">
              Celý katalog
            </a>
          </div>

          <dl
            className="mt-12 grid grid-cols-3 max-w-md text-left animate-rise"
            style={{ animationDelay: '820ms' }}
          >
            <Spec>
              <Counter to={212} className="font-display text-3xl md:text-4xl tracking-tightest" />
              <SpecLabel>Odstínů skladem</SpecLabel>
            </Spec>
            <Spec>
              <span className="font-display text-3xl md:text-4xl tracking-tightest">
                <Counter to={24} />&nbsp;h
              </span>
              <SpecLabel>Doručení po ČR</SpecLabel>
            </Spec>
            <Spec>
              <Counter to={30} suffix="+" className="font-display text-3xl md:text-4xl tracking-tightest" />
              <SpecLabel>Let na trhu</SpecLabel>
            </Spec>
          </dl>
        </div>

        {/* RIGHT — angled real Montana can */}
        <HeroCan />
      </div>

      {/* scroll indicator */}
      <div className="absolute left-1/2 -translate-x-1/2 bottom-2 hidden md:flex flex-col items-center gap-2 text-ash">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em]">
          Roluj dolů
        </span>
        <div className="w-px h-12 bg-gradient-to-b from-wall-edge via-bone to-transparent animate-pulse" />
      </div>

      {/* marquee at bottom */}
      <div className="full mt-16 md:mt-20 border-y border-wall-edge bg-wall-deep/40 overflow-hidden group">
        <div className="flex animate-marquee whitespace-nowrap py-3 font-display tracking-tightest text-2xl md:text-3xl group-hover:[animation-play-state:paused] cursor-pointer">
          {Array.from({ length: 2 }).map((_, i) => (
            <div key={i} className="flex shrink-0 items-center gap-8 pr-8">
              {[
                'PŘES 200 ODSTÍNŮ',
                'DORUČENÍ DO 24 H',
                'OFICIÁLNÍ DOVOZCE',
                'BRNO · PRAHA · OSTRAVA',
                'WORKSHOPY',
                'WRITER FRIENDLY',
                'OD 1994',
              ].map((w, j) => (
                <span
                  key={`${i}-${j}`}
                  className="flex items-center gap-8 text-bone/90"
                >
                  {w}
                  <Star />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Spec({ children }: { children: React.ReactNode }) {
  return <div className="border-t border-wall-edge pt-3 pr-3 flex flex-col">{children}</div>;
}
function SpecLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="font-mono text-[0.65rem] uppercase tracking-[0.2em] text-ash mt-1">
      {children}
    </div>
  );
}

function Arrow() {
  return (
    <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden>
      <path d="M0 7h17M11 1l6 6-6 6" stroke="currentColor" strokeWidth="1.6" fill="none" />
    </svg>
  );
}

function Star() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 14 14"
      aria-hidden
      className="shrink-0"
      style={{ color: 'var(--accent)' }}
    >
      <path
        d="M7 0v14M0 7h14M2 2l10 10M12 2L2 12"
        stroke="currentColor"
        strokeWidth="1.4"
      />
    </svg>
  );
}

function Crosshair({ className = '' }: { className?: string }) {
  return (
    <svg width="24" height="24" viewBox="0 0 24 24" className={className} aria-hidden>
      <path d="M12 0v24M0 12h24" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function SprayLine({
  word,
  delay,
  accent,
  inline = false,
}: {
  word: string;
  delay: string;
  accent: string;
  inline?: boolean;
}) {
  return (
    <span className={`relative ${inline ? 'inline-block' : 'block'} align-baseline`}>
      <span
        className="relative inline-block animate-spray-reveal spray-shadow text-bone"
        style={{ animationDelay: delay }}
      >
        {word}
      </span>
      <span
        aria-hidden
        className="pointer-events-none absolute top-1/2 left-0 -translate-y-1/2 size-[1em] rounded-full animate-spray-blob"
        style={{
          animationDelay: delay,
          background: `radial-gradient(circle at 50% 50%, ${accent}cc 0%, ${accent}66 30%, transparent 65%)`,
          filter: 'blur(6px)',
        }}
      />
    </span>
  );
}
