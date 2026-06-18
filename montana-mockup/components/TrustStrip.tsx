import { Counter, Reveal } from './interactive';

export function TrustStrip() {
  return (
    <Reveal as="section" className="full content-grid border-y border-wall-edge bg-wall-deep/60">
      <div className="grid grid-cols-2 md:grid-cols-4 hairline-x">
        {ITEMS.map((it, i) => (
          <div
            key={i}
            className="flex items-center gap-4 py-6 md:py-8 px-4 md:px-6 first:pl-0 last:pr-0"
          >
            <div
              className="size-12 md:size-14 shrink-0 border border-wall-edge inline-flex items-center justify-center"
              style={{ color: 'var(--accent)' }}
            >
              <it.icon />
            </div>
            <div className="min-w-0">
              <div className="font-display text-xl md:text-2xl tracking-tightest leading-none">
                {it.title}
              </div>
              <div className="font-mono text-[0.6rem] uppercase tracking-[0.2em] text-ash mt-1.5 truncate">
                {it.sub}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-wall-edge py-4 flex flex-wrap items-center gap-x-8 gap-y-2 justify-center text-ash">
        <span className="font-mono text-[0.6rem] uppercase tracking-[0.22em]">
          Skladem značky
        </span>
        {['MONTANA', 'BELTON', 'MOLOTOW', 'NBQ', 'KRINK', 'IRONLAK', 'OTR'].map(
          (b) => (
            <span
              key={b}
              className="font-display tracking-tightest text-lg md:text-xl text-bone/85 hover:text-[color:var(--accent)] transition-colors cursor-default"
            >
              {b}
            </span>
          ),
        )}
      </div>
    </Reveal>
  );
}

const ITEMS = [
  {
    title: <Doprava />,
    sub: 'Zásilkovna · PPL · osobní výdej Brno',
    icon: TruckIcon,
  },
  {
    title: <DodaniHod />,
    sub: 'Když to chvátá, máš to ráno',
    icon: ClockIcon,
  },
  {
    title: <LetNaTrhu />,
    sub: 'Importujeme Montanu od 1994',
    icon: BadgeIcon,
  },
  {
    title: <Hvezdy />,
    sub: <><Counter to={740} />+ recenzí · 98 % doporučuje</>,
    icon: StarIcon,
  },
];

function Doprava() {
  return (
    <>
      Doprava od <Counter to={79} /> Kč
    </>
  );
}

function DodaniHod() {
  return (
    <>
      Dodání do <Counter to={24} />&nbsp;h
    </>
  );
}

function LetNaTrhu() {
  return (
    <>
      <Counter to={30} /> let na trhu
    </>
  );
}

function Hvezdy() {
  return <>4,9 ★ Google</>;
}

function TruckIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path d="M2 5h11v11H2zM13 8h5l3 3v5h-8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="6" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
      <circle cx="17" cy="18" r="1.8" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="1.6" />
      <path d="M12 7v6l4 2" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function BadgeIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" aria-hidden>
      <path
        d="M12 2l3 3 4-1 1 4 3 3-3 3-1 4-4-1-3 3-3-3-4 1-1-4-3-3 3-3 1-4 4 1z"
        stroke="currentColor"
        strokeWidth="1.4"
      />
      <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.6" />
    </svg>
  );
}
function StarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M12 2l3 7h7l-6 4 2 7-6-4-6 4 2-7-6-4h7z" />
    </svg>
  );
}
