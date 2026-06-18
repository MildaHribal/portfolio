import { Logotype } from './Logotype';

export function Footer() {
  return (
    <footer className="relative content-grid border-t border-wall-edge bg-wall-deep/60 pt-16 pb-8 mt-16">
      {/* big bg type */}
      <div
        aria-hidden
        className="full pointer-events-none absolute inset-x-0 -top-6 md:-top-10 text-center select-none overflow-hidden"
      >
        <span className="display-tight text-[28vw] md:text-[22vw] text-bone/[0.035] tracking-tightest leading-none">
          MONTANA
        </span>
      </div>

      <div className="relative grid grid-cols-2 md:grid-cols-12 gap-10">
        <div className="col-span-2 md:col-span-4">
          <Logotype size="md" />
          <p className="mt-6 text-bone/70 leading-relaxed max-w-xs">
            Oficiální distributor Montana Cans pro Českou republiku.
            <br />
            Kreslíme od 1994.
          </p>
          <div className="mt-6 flex gap-2">
            {[
              { label: 'Instagram', icon: 'ig' },
              { label: 'TikTok', icon: 'tt' },
              { label: 'YouTube', icon: 'yt' },
              { label: 'Facebook', icon: 'fb' },
            ].map((s) => (
              <a
                key={s.icon}
                href="#"
                aria-label={s.label}
                className="size-10 inline-flex items-center justify-center border border-wall-edge text-ash hover:text-bone hover:border-bone hover:bg-tape hover:text-wall-deep transition-colors font-display tracking-tightest text-sm uppercase"
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <FooterCol
          title="Krám"
          items={['Spreje', 'Fixy & markery', 'Trysky', 'Oblečení', 'Doplňky', 'Akce']}
          className="col-span-1 md:col-span-2"
        />
        <FooterCol
          title="Doprava"
          items={['Zásilkovna 79 Kč', 'PPL 99 Kč', 'Osobně Brno', 'Vyzvednutí Praha', 'Vrácení do 14 dní']}
          className="col-span-1 md:col-span-3"
        />
        <div className="col-span-2 md:col-span-3">
          <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ash mb-4">
            Kontakt
          </h4>
          <address className="not-italic text-bone/85 leading-relaxed">
            Bratislavská 22
            <br />
            602 00 Brno
            <br />
            <a href="tel:+420775111222" className="hover:text-tape">
              +420 775 111 222
            </a>
            <br />
            <a href="mailto:ahoj@montana-cans.cz" className="hover:text-tape underline decoration-tape underline-offset-4">
              ahoj@montana-cans.cz
            </a>
          </address>
          <div className="mt-6 stamp">
            Otevřeno · Po–Pá 10–18 · So 10–14
          </div>
        </div>
      </div>

      <div className="relative mt-16 pt-6 border-t border-wall-edge flex flex-col md:flex-row items-start md:items-center justify-between gap-3 text-xs text-ash">
        <div className="font-mono uppercase tracking-[0.16em]">
          © 2026 Montana Cans CZ s.r.o. · IČO&nbsp;12345678
        </div>
        <div className="flex gap-5 font-mono uppercase tracking-[0.16em]">
          <a href="#" className="hover:text-bone">Obchodní podmínky</a>
          <a href="#" className="hover:text-bone">Ochrana údajů</a>
          <a href="#" className="hover:text-bone">Cookies</a>
        </div>
        <div className="font-mono uppercase tracking-[0.16em] text-ash/70">
          Náhled · designed for pitch
        </div>
      </div>
    </footer>
  );
}

function FooterCol({
  title,
  items,
  className = '',
}: {
  title: string;
  items: string[];
  className?: string;
}) {
  return (
    <div className={className}>
      <h4 className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ash mb-4">
        {title}
      </h4>
      <ul className="space-y-2 text-bone/85">
        {items.map((it) => (
          <li key={it}>
            <a href="#" className="hover:text-tape transition-colors">
              {it}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
