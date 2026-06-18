import { asset } from '@/lib/basePath';
import { Reveal, SectionNumber, Tilt } from './interactive';

type ClusterItem = {
  src: string;
  /** position + size in card-percent. */
  right: string;
  bottom?: string;
  top?: string;
  width: string;
  rotate?: string;
  /** depth — affects scale opacity and hover transform. */
  layer?: 'back' | 'mid' | 'front';
};

type Cat = {
  id: string;
  title: string;
  count: number;
  lead: string;
  span: string;
  /** tint of the radial glow behind the products on the bone area. */
  glow: string;
  /** photo layers, painted back-to-front, sitting on the bone area. */
  items: ClusterItem[];
};

const CATS: Cat[] = [
  {
    id: 'spreje',
    title: 'Spreje',
    count: 212,
    lead: 'Montana BLACK, GOLD, 94, Chalk, Stencil — všechny řady.',
    span: 'col-span-12 md:col-span-7 aspect-[5/4] md:aspect-[16/10]',
    glow: 'rgba(57,208,74,0.22)',
    items: [
      {
        src: '/products/cans/gold-peach.png',
        right: '46%',
        bottom: '-8%',
        width: '24%',
        rotate: '-6deg',
        layer: 'back',
      },
      {
        src: '/products/cans/chalk-green.png',
        right: '28%',
        bottom: '-10%',
        width: '28%',
        rotate: '4deg',
        layer: 'mid',
      },
      {
        src: '/products/cans/black-fluo-green.png',
        right: '4%',
        bottom: '-6%',
        width: '34%',
        rotate: '8deg',
        layer: 'front',
      },
    ],
  },
  {
    id: 'fixy',
    title: 'Fixy & markery',
    count: 48,
    lead: 'Akrylové, lakové, refilly. 2 až 50 mm.',
    span: 'col-span-12 md:col-span-5 aspect-[5/4] md:aspect-[16/10]',
    glow: 'rgba(214,22,118,0.22)',
    items: [
      {
        src: '/products/markers/markers-trio-pinks.png',
        right: '34%',
        top: '6%',
        width: '32%',
        rotate: '-10deg',
        layer: 'back',
      },
      {
        src: '/products/markers/markers-trio-purple-pink.png',
        right: '6%',
        bottom: '-4%',
        width: '38%',
        rotate: '6deg',
        layer: 'front',
      },
    ],
  },
  {
    id: 'trysky',
    title: 'Trysky',
    count: 24,
    lead: 'Fat, skinny, calligraphy.',
    span: 'col-span-12 sm:col-span-6 md:col-span-4 aspect-square',
    glow: 'rgba(255,138,42,0.22)',
    items: [
      {
        src: '/products/caps/cap-dark-green.png',
        right: '60%',
        top: '8%',
        width: '22%',
        rotate: '-14deg',
        layer: 'back',
      },
      {
        src: '/products/caps/cap-chrome.png',
        right: '12%',
        top: '6%',
        width: '26%',
        rotate: '10deg',
        layer: 'back',
      },
      {
        src: '/products/caps/cap-red.png',
        right: '50%',
        bottom: '-2%',
        width: '28%',
        rotate: '6deg',
        layer: 'mid',
      },
      {
        src: '/products/caps/cap-gold.png',
        right: '6%',
        bottom: '-2%',
        width: '30%',
        rotate: '-6deg',
        layer: 'mid',
      },
      {
        src: '/products/caps/cap-white-orange.png',
        right: '28%',
        top: '22%',
        width: '40%',
        rotate: '0deg',
        layer: 'front',
      },
    ],
  },
  {
    id: 'obleceni',
    title: 'Oblečení',
    count: 36,
    lead: 'Tagy, throw-upy, mikiny.',
    span: 'col-span-12 sm:col-span-6 md:col-span-4 aspect-square',
    glow: 'rgba(255,212,0,0.18)',
    items: [
      {
        src: '/products/shirts/hoodie-black.png',
        right: '42%',
        top: '-4%',
        width: '50%',
        rotate: '-6deg',
        layer: 'back',
      },
      {
        src: '/products/shirts/tshirt-tag-black.png',
        right: '0%',
        top: '4%',
        width: '58%',
        rotate: '6deg',
        layer: 'front',
      },
    ],
  },
  {
    id: 'doplnky',
    title: 'Doplňky',
    count: 72,
    lead: 'Skicáky, rukavice, šablony.',
    span: 'col-span-12 md:col-span-4 aspect-square',
    glow: 'rgba(80,110,255,0.18)',
    items: [
      {
        src: '/products/markers/marker-black-water.png',
        right: '60%',
        bottom: '4%',
        width: '24%',
        rotate: '-12deg',
        layer: 'back',
      },
      {
        src: '/products/accessories/blackbook-a4.png',
        right: '-2%',
        top: '-2%',
        width: '70%',
        rotate: '4deg',
        layer: 'front',
      },
    ],
  },
];

export function Categories() {
  return (
    <section className="content-grid py-20 md:py-28 border-t border-wall-edge">
      <Reveal>
        <SectionNumber n="01" label="Co máme na pultě" className="mb-6" />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-12">
          <div>
            <h2 className="display-tight text-6xl md:text-7xl lg:text-8xl">
              CO MÁME
              <br />
              <span style={{ color: 'var(--accent)' }}>NA STĚNĚ.</span>
            </h2>
          </div>
          <p className="max-w-sm text-bone/70">
            Pět regálů, jeden sklad v Brně. Klikni a procházej — nebo nám napiš
            a my ti to nachystáme na výdej.
          </p>
        </div>
      </Reveal>

      <div className="grid grid-cols-12 gap-3 md:gap-4">
        {CATS.map((c, i) => (
          <Tilt key={c.id} max={3} className={c.span}>
            <Reveal delay={i * 80} className="h-full">
              <a
                href={`#${c.id}`}
                className="group relative flex flex-col h-full border border-wall-edge overflow-hidden bg-wall-deep"
              >
                {/* ── IMAGE AREA (light, products are clearly visible) ── */}
                <div className="relative h-[62%] bg-bone overflow-hidden border-b border-wall-edge">
                  {/* subtle coloured glow on the bone bg */}
                  <div
                    aria-hidden
                    className="absolute inset-0"
                    style={{
                      background: `radial-gradient(circle at 65% 60%, ${c.glow}, transparent 70%)`,
                    }}
                  />

                  {/* product cluster */}
                  <Cluster items={c.items} />

                  {/* top-left: count chip */}
                  <span className="absolute top-3 left-3 z-10 inline-flex items-center gap-1.5 font-mono text-[0.6rem] uppercase tracking-[0.22em] text-wall-deep bg-bone/90 backdrop-blur-sm border border-wall-edge/30 px-2 py-1">
                    <span className="size-1.5 rounded-full bg-[#39d04a]" />
                    {c.count}+ skladem
                  </span>

                  {/* top-right: arrow */}
                  <span className="absolute top-3 right-3 z-10 size-9 rounded-full bg-wall-deep text-bone group-hover:bg-[color:var(--accent)] group-hover:text-[color:var(--accent-ink)] inline-flex items-center justify-center transition-all duration-300 group-hover:rotate-[-45deg]">
                    <svg width="14" height="14" viewBox="0 0 14 14" aria-hidden>
                      <path
                        d="M0 7h12M7 1l5 6-5 6"
                        stroke="currentColor"
                        strokeWidth="1.6"
                        fill="none"
                      />
                    </svg>
                  </span>
                </div>

                {/* ── TEXT PANEL (dark, title is bold and always readable) ── */}
                <div className="relative flex-1 p-5 md:p-6 bg-wall-deep flex flex-col justify-center">
                  <h3 className="display-tight text-4xl md:text-5xl lg:text-6xl leading-[0.92] group-hover:text-[color:var(--accent)] transition-colors">
                    {c.title}
                  </h3>
                  <p className="mt-2 text-bone/65 text-sm leading-snug max-w-[90%]">
                    {c.lead}
                  </p>
                </div>
              </a>
            </Reveal>
          </Tilt>
        ))}
      </div>
    </section>
  );
}

function Cluster({ items }: { items: ClusterItem[] }) {
  return (
    <div className="absolute inset-0">
      {items.map((it, i) => {
        const layer = it.layer ?? 'mid';
        const z = layer === 'front' ? 30 : layer === 'mid' ? 20 : 10;
        const opacity = layer === 'back' ? 0.72 : layer === 'mid' ? 0.9 : 1;
        const hoverShift =
          layer === 'front'
            ? 'group-hover:-translate-y-2'
            : layer === 'mid'
              ? 'group-hover:-translate-y-1'
              : '';
        return (
          <div
            key={i}
            className={`absolute transition-transform duration-700 ${hoverShift}`}
            style={{
              right: it.right,
              bottom: it.bottom,
              top: it.top,
              width: it.width,
              aspectRatio: '3 / 4',
              transform: `rotate(${it.rotate ?? '0deg'})`,
              zIndex: z,
              opacity,
              filter: `drop-shadow(0 18px 22px rgba(0,0,0,0.18))`,
            }}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={asset(it.src)}
              alt=""
              loading="lazy"
              decoding="async"
              className="absolute inset-0 w-full h-full object-contain"
            />
          </div>
        );
      })}
    </div>
  );
}
