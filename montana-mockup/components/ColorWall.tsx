'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import { COLORS, FAMILIES, Swatch } from '@/lib/colors';
import { PRODUCTS } from '@/lib/products';
import { ProductGraphic } from './ProductGraphic';
import { asset } from '@/lib/basePath';
import { Reveal, SectionNumber } from './interactive';

/** crude luminance check for picking a readable colour over `hex`. */
function textOn(hex: string): string {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
  return lum > 0.55 ? '#0e0d10' : '#efece4';
}

export function ColorWall() {
  const [active, setActive] = useState<Swatch | null>(null);
  const [hovered, setHovered] = useState<Swatch | null>(null);
  const cursorRef = useRef<HTMLDivElement>(null);
  const wallRef = useRef<HTMLDivElement>(null);

  /** the swatch displayed in the info card — hover wins when present, else active */
  const focused = hovered ?? active;

  /* propagate accent across the page */
  useEffect(() => {
    const root = document.documentElement;
    if (active) {
      root.style.setProperty('--accent', active.hex);
      root.style.setProperty('--accent-ink', textOn(active.hex));
    } else {
      root.style.setProperty('--accent', '#ffd400');
      root.style.setProperty('--accent-ink', '#0e0d10');
    }
  }, [active]);

  /* custom spray-nozzle cursor that tracks pointer inside the wall */
  useEffect(() => {
    const wall = wallRef.current;
    const cursor = cursorRef.current;
    if (!wall || !cursor) return;
    if (window.matchMedia('(pointer: coarse)').matches) return;

    let raf = 0;
    const onMove = (e: MouseEvent) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const rect = wall.getBoundingClientRect();
        cursor.style.transform = `translate(${e.clientX - rect.left}px, ${e.clientY - rect.top}px)`;
      });
    };
    const onEnter = () => {
      cursor.style.opacity = '1';
    };
    const onLeave = () => {
      cursor.style.opacity = '0';
    };

    wall.addEventListener('mousemove', onMove);
    wall.addEventListener('mouseenter', onEnter);
    wall.addEventListener('mouseleave', onLeave);
    return () => {
      cancelAnimationFrame(raf);
      wall.removeEventListener('mousemove', onMove);
      wall.removeEventListener('mouseenter', onEnter);
      wall.removeEventListener('mouseleave', onLeave);
    };
  }, []);

  const grouped = useMemo(() => {
    const out: Record<string, Swatch[]> = {};
    for (const f of FAMILIES) out[f.id] = [];
    for (const c of COLORS) out[c.family].push(c);
    return out;
  }, []);

  const filteredProducts = useMemo(() => {
    if (!active) return PRODUCTS;
    return PRODUCTS.filter(
      (p) => p.family === active.family || p.colorCode === active.code,
    );
  }, [active]);

  return (
    <section
      id="stena"
      className="relative content-grid pt-[200px] md:pt-[240px] pb-20 md:pb-28"
    >
      <ProductShelf />

      {/* ── HEADER ─────────────────────────────────────────────── */}
      <div className="relative z-10">
        <SectionNumber n="02" label="Signature feature" className="mb-6" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="display-tight text-6xl sm:text-7xl md:text-8xl lg:text-9xl">
              BAREVNÁ
              <br />
              <span style={{ color: 'var(--accent)' }}>STĚNA.</span>
            </h2>
          </div>
          <p className="max-w-md text-bone/70 leading-relaxed md:text-right">
            Klikni na odstín a stránka se pod ním <span className="text-bone">obarví</span>.
            Pod stěnou rovnou ukážeme všechno, co k němu v krámě jede — od plechovek
            po fixy.
          </p>
        </div>
      </div>

      {/* ── ACTIVE BANNER ──────────────────────────────────────── */}
      <ActiveBanner active={active} onClear={() => setActive(null)} />

      {/* ── INFO CARD ──────────────────────────────────────────── */}
      <div className="grid grid-cols-12 gap-4 mb-8 items-stretch">
        <div
          className={`col-span-12 md:col-span-7 lg:col-span-8 flex items-stretch border bg-wall-raised/40 transition-colors duration-500 ${
            active ? 'border-[var(--accent)]' : 'border-wall-edge'
          }`}
        >
          <div
            className="w-28 md:w-40 shrink-0 transition-colors duration-300 relative overflow-hidden"
            style={{ background: focused?.hex ?? 'transparent' }}
          >
            {!focused && (
              <div className="absolute inset-0 flex items-center justify-center text-wall-edge">
                <CrosshairBig />
              </div>
            )}
          </div>
          <div className="flex-1 p-4 md:p-6 flex flex-col justify-between">
            <div className="flex items-center justify-between gap-3">
              <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ash">
                {focused
                  ? FAMILIES.find((f) => f.id === focused.family)?.label
                  : 'Najeď na odstín'}
              </span>
              {active && (
                <button
                  type="button"
                  onClick={() => setActive(null)}
                  className="stamp hover:bg-marker/15 hover:border-marker hover:text-bone transition-colors"
                >
                  Zrušit filtr ×
                </button>
              )}
            </div>
            <div className="mt-1">
              <div className="font-display text-4xl md:text-5xl tracking-tightest leading-none">
                {focused?.name ?? '—'}
              </div>
              <div className="font-mono text-sm text-ash mt-2 flex items-center gap-3">
                <span>{focused?.code ?? 'MTN-····'}</span>
                <span className="size-1 rounded-full bg-wall-edge" />
                <span className="uppercase">{focused?.hex ?? '#······'}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="col-span-12 md:col-span-5 lg:col-span-4 border border-wall-edge bg-wall-raised/40 p-4 md:p-6 flex flex-col justify-between">
          <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ash">
            Stav stěny
          </div>
          <div className="flex items-end justify-between mt-2 gap-4">
            <div>
              <div className="font-display text-4xl md:text-5xl tracking-tightest leading-none">
                {COLORS.length}
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ash mt-1">
                Odstínů na náhledu
              </div>
            </div>
            <div className="text-right">
              <div
                className="font-display text-4xl md:text-5xl tracking-tightest leading-none transition-colors"
                style={{ color: 'var(--accent)' }}
              >
                {filteredProducts.length}
              </div>
              <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ash mt-1">
                Produktů níže
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── THE WALL ───────────────────────────────────────────── */}
      <div
        ref={wallRef}
        role="listbox"
        aria-label="Barevná stěna Montana"
        className="relative border border-wall-edge bg-wall-deep/60 p-3 md:p-5 space-y-4 md:cursor-none overflow-hidden"
      >
        {FAMILIES.map((fam) => (
          <div
            key={fam.id}
            className="grid grid-cols-[5rem_1fr] md:grid-cols-[8rem_1fr] gap-3 md:gap-5 items-stretch"
          >
            <div className="flex flex-col justify-center pl-1 group">
              <div className="font-display text-xl md:text-3xl tracking-tightest leading-none">
                {fam.label}
              </div>
              <div className="mt-1.5 flex items-center gap-2">
                <span className="h-px w-6 md:w-10 bg-wall-edge" />
                <span className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                  {grouped[fam.id].length}
                </span>
              </div>
            </div>
            <div className="grid grid-cols-8 sm:grid-cols-10 md:grid-cols-12 lg:grid-cols-14 gap-1 md:gap-1.5">
              {grouped[fam.id].map((c) => {
                const isActive = active?.code === c.code;
                return (
                  <button
                    key={c.code}
                    type="button"
                    role="option"
                    aria-selected={isActive}
                    aria-label={`${c.name} (${c.code}, ${c.hex})`}
                    onMouseEnter={() => setHovered(c)}
                    onMouseLeave={() =>
                      setHovered((h) => (h?.code === c.code ? null : h))
                    }
                    onFocus={() => setHovered(c)}
                    onBlur={() => setHovered((h) => (h?.code === c.code ? null : h))}
                    onClick={() =>
                      setActive((curr) => (curr?.code === c.code ? null : c))
                    }
                    className={`relative aspect-square transition-all duration-200 ${
                      isActive
                        ? 'scale-125 z-20 shadow-[0_10px_30px_rgba(0,0,0,0.7)]'
                        : 'hover:scale-[1.25] hover:z-10 hover:shadow-[0_8px_18px_rgba(0,0,0,0.55)]'
                    }`}
                    style={{
                      background: c.hex,
                      outline: isActive ? '2px solid var(--bone)' : 'none',
                      outlineOffset: isActive ? '3px' : '0',
                    }}
                  >
                    {isActive && (
                      <span
                        aria-hidden
                        className="absolute -top-2 -right-2 size-3 rounded-full bg-bone border-2 border-wall-deep"
                      />
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        ))}

        {/* ── CUSTOM CURSOR ─────────────────────────────────── */}
        <div
          ref={cursorRef}
          aria-hidden
          className="absolute top-0 left-0 pointer-events-none opacity-0 transition-opacity duration-200 z-30 hidden md:block"
          style={{ willChange: 'transform' }}
        >
          <div
            className="-translate-x-1/2 -translate-y-1/2 size-20 rounded-full border-2 backdrop-blur-sm flex flex-col items-center justify-center transition-[background,border-color] duration-200"
            style={{
              background: hovered ? hovered.hex : 'rgba(239,236,228,0.08)',
              borderColor: hovered ? '#efece4' : 'rgba(239,236,228,0.4)',
              boxShadow: hovered
                ? `0 8px 40px ${hovered.hex}aa, 0 0 0 1px rgba(0,0,0,0.3)`
                : '0 6px 30px rgba(0,0,0,0.4)',
            }}
          >
            {hovered ? (
              <>
                <span
                  className="font-display text-sm tracking-tightest leading-none truncate max-w-[80%]"
                  style={{ color: textOn(hovered.hex) }}
                >
                  {hovered.name}
                </span>
                <span
                  className="font-mono text-[0.5rem] uppercase tracking-[0.2em] mt-1 leading-none"
                  style={{ color: textOn(hovered.hex), opacity: 0.7 }}
                >
                  {hovered.code}
                </span>
              </>
            ) : (
              <Crosshair className="text-bone/60" />
            )}
          </div>
        </div>
      </div>

      {/* ── FILTERED PRODUCTS ──────────────────────────────────── */}
      <div id="produkty" />
      <Reveal as="div" className="mt-20">
        <div className="flex items-end justify-between gap-4 mb-8">
          <div>
            <span className="stamp mb-3">
              {active ? (
                <>
                  <span
                    className="size-2 rounded-full"
                    style={{ background: active.hex }}
                  />
                  Filtr: {active.name}
                </>
              ) : (
                <>
                  <span className="size-2 rounded-full bg-bone" />
                  Vše skladem
                </>
              )}
            </span>
            <h3 className="display-tight text-4xl md:text-5xl">
              {active ? 'V TÉ BARVĚ' : 'PRÁVĚ LETÍ'}
            </h3>
          </div>
          <a href="#" className="hidden md:inline-flex btn-ghost">
            Celý katalog
          </a>
        </div>

        {filteredProducts.length === 0 ? (
          <div className="border border-wall-edge p-12 text-center text-ash">
            V téhle barvě teď nic skladem nemáme. Mrkni vedle, nebo nám napiš.
          </div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
            {filteredProducts.map((p) => (
              <article
                key={p.id}
                className="group relative border border-wall-edge bg-wall-raised/30 hover:bg-wall-raised/70 transition-colors overflow-hidden"
              >
                <div className="aspect-square relative overflow-hidden bg-bone">
                  <div
                    aria-hidden
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 mix-blend-multiply"
                    style={{
                      background: `radial-gradient(circle at 50% 60%, ${p.hex}33, transparent 65%)`,
                    }}
                  />
                  <div className="absolute inset-0 transition-transform duration-500 group-hover:-translate-y-1 group-hover:scale-[1.04]">
                    <ProductGraphic product={p} />
                  </div>
                  {p.badge && (
                    <span
                      className={`absolute top-2 left-2 px-2 py-1 font-display text-xs tracking-tightest z-10 ${
                        p.badge === 'SLEVA' ? 'bg-marker text-bone' : 'tape-strip'
                      }`}
                    >
                      {p.badge}
                    </span>
                  )}
                  <div className="absolute top-2 right-2 z-10 flex flex-col items-end gap-1">
                    {p.inStock && (
                      <span className="inline-flex items-center gap-1 font-mono text-[0.55rem] uppercase tracking-[0.18em] text-wall-deep bg-bone/90 px-1.5 py-0.5">
                        <span className="size-1.5 rounded-full bg-[#39d04a]" />
                        Skladem
                      </span>
                    )}
                    {p.colorCode && (
                      <span className="font-mono text-[0.55rem] uppercase tracking-[0.18em] text-wall-deep bg-bone/90 px-1.5 py-0.5">
                        {p.colorCode}
                      </span>
                    )}
                  </div>
                </div>
                <div className="p-4 border-t border-wall-edge flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <h4 className="font-display text-xl md:text-2xl tracking-tightest leading-none truncate">
                      {p.name}
                    </h4>
                    <p className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-ash mt-1.5 truncate">
                      {p.line}
                    </p>
                  </div>
                  <div className="text-right shrink-0">
                    {p.oldPrice && (
                      <div className="font-mono text-xs text-ash line-through leading-none">
                        {p.oldPrice}
                      </div>
                    )}
                    <div
                      className={`font-display text-2xl tracking-tightest leading-none ${
                        p.oldPrice ? 'text-marker' : ''
                      }`}
                    >
                      {p.price}
                    </div>
                    <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash">
                      Kč
                    </div>
                  </div>
                </div>
                <div
                  className="absolute inset-x-0 bottom-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 py-2.5 text-center font-display tracking-tightest text-sm"
                  style={{
                    background: 'var(--accent)',
                    color: 'var(--accent-ink)',
                  }}
                >
                  DO KOŠÍKU
                </div>
              </article>
            ))}
          </div>
        )}
      </Reveal>
    </section>
  );
}

function ActiveBanner({
  active,
  onClear,
}: {
  active: Swatch | null;
  onClear: () => void;
}) {
  return (
    <div
      aria-live="polite"
      className={`overflow-hidden transition-all duration-500 ${
        active ? 'h-12 md:h-14 mb-4 opacity-100' : 'h-0 mb-0 opacity-0'
      }`}
    >
      {active && (
        <div
          className="h-full flex items-center gap-4 px-4 md:px-6 border"
          style={{
            background: active.hex,
            color: textOn(active.hex),
            borderColor: textOn(active.hex) === '#efece4' ? 'rgba(239,236,228,0.25)' : 'rgba(14,13,16,0.25)',
          }}
        >
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.22em] opacity-70">
            Aktivní filtr
          </span>
          <span className="font-display text-lg md:text-2xl tracking-tightest leading-none">
            {active.name}
          </span>
          <span className="font-mono text-xs opacity-70">{active.code}</span>
          <span className="ml-auto flex items-center gap-3">
            <span className="hidden md:inline font-mono text-xs uppercase tracking-[0.2em] opacity-70">
              Stránka teď nese tuhle barvu
            </span>
            <button
              type="button"
              onClick={onClear}
              className="size-7 rounded-full border-2 border-current inline-flex items-center justify-center hover:opacity-70 transition-opacity"
              aria-label="Zrušit filtr"
            >
              ×
            </button>
          </span>
        </div>
      )}
    </div>
  );
}

/**
 * A "shelf" of real product photos that sits behind the section header.
 */
function ProductShelf() {
  const items: { src: string; tilt: string; height: string }[] = [
    { src: '/products/cans/black-orange.png', tilt: '-6deg', height: '160px' },
    { src: '/products/markers/markers-trio-pinks.png', tilt: '4deg', height: '140px' },
    { src: '/products/cans/chalk-green.png', tilt: '8deg', height: '170px' },
    { src: '/products/caps/cap-red.png', tilt: '-10deg', height: '80px' },
    { src: '/products/cans/black-fluo-green.png', tilt: '5deg', height: '180px' },
    { src: '/products/caps/cap-brown-yellow.png', tilt: '12deg', height: '90px' },
    { src: '/products/cans/gold-peach.png', tilt: '-4deg', height: '150px' },
    { src: '/products/markers/marker-black-water.png', tilt: '10deg', height: '120px' },
    { src: '/products/cans/tarblack.png', tilt: '-7deg', height: '170px' },
  ];

  return (
    <div
      aria-hidden
      className="full pointer-events-none absolute inset-x-0 top-0 h-[180px] md:h-[220px] overflow-hidden"
    >
      <div className="absolute left-0 right-0 top-[80%] h-px bg-wall-edge" />
      <div className="absolute left-0 right-0 top-[80%] h-3 bg-gradient-to-b from-bone/[0.04] to-transparent" />

      <div className="absolute inset-0 flex items-end justify-between gap-2 md:gap-4 px-4 md:px-10 pb-1">
        {items.map((it, i) => (
          <div
            key={i}
            className="flex-shrink-0 opacity-30 md:opacity-40"
            style={{
              height: it.height,
              aspectRatio: '0.5',
              transform: `rotate(${it.tilt})`,
              filter: 'drop-shadow(0 12px 18px rgba(0,0,0,0.4))',
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(it.src)}
              alt=""
              loading="lazy"
              decoding="async"
              className="w-full h-full object-contain"
            />
          </div>
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-b from-transparent to-[#17161b]" />
      <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-[#17161b] to-transparent" />
      <div className="absolute inset-y-0 right-0 w-32 bg-gradient-to-l from-[#17161b] to-transparent" />
    </div>
  );
}

function CrosshairBig() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" aria-hidden>
      <circle cx="24" cy="24" r="14" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M24 4v40M4 24h40" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}

function Crosshair({ className = '' }: { className?: string }) {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" className={className} aria-hidden>
      <circle cx="12" cy="12" r="8" stroke="currentColor" strokeWidth="1" fill="none" />
      <path d="M12 2v20M2 12h20" stroke="currentColor" strokeWidth="1" />
    </svg>
  );
}
