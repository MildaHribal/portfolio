import { Counter, Reveal, SectionNumber } from './interactive';

export function BrandStrip() {
  return (
    <section
      id="komunita"
      className="relative content-grid py-24 md:py-32 border-t border-wall-edge"
    >
      <Reveal>
        <SectionNumber n="03" label="Manifesto" className="mb-8" />
      </Reveal>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-16 items-start">
        <Reveal className="lg:col-span-7">
          <h2 className="display-tight text-[15vw] sm:text-7xl md:text-8xl lg:text-[7vw] xl:text-[110px]">
            NEPRODÁVÁME
            <br />
            <span className="relative inline-block">
              <span className="relative z-10 text-wall-deep">PLECHOVKY.</span>
              <span
                aria-hidden
                className="absolute inset-x-0 top-[12%] bottom-[10%] -z-0"
                style={{ background: 'var(--accent)' }}
              />
            </span>
            <br />
            <span className="text-bone">PRODÁVÁME</span>
            <br />
            <span className="text-bone">
              <span className="underline decoration-marker decoration-[6px] underline-offset-[10px]">
                NÁSTROJE
              </span>
              .
            </span>
          </h2>

          <p className="mt-10 max-w-lg text-bone/75 text-lg leading-relaxed">
            Montanu jezdíme přímo od dovozce, máme ji srovnanou podle kódů a víme,
            co s ní. Když potřebuješ pomoct s výběrem, napiš — někdo z nás taky
            někde maluje.
          </p>

          {/* by-the-numbers row */}
          <div className="mt-12 grid grid-cols-3 gap-4 max-w-2xl">
            <NumberBlock value={<Counter to={212} suffix="+" />} label="Odstínů skladem" />
            <NumberBlock value={<Counter to={740} suffix="+" />} label="Google recenzí" />
            <NumberBlock value={<Counter to={1994} />} label="Importujeme od" mono />
          </div>
        </Reveal>

        <Reveal className="lg:col-span-5 space-y-5" delay={120}>
          <Pillar
            n="01"
            title="Sklad v Brně"
            body="Skoro všechno máš příští den. Když to chvátá, vyzvedneš si to ten den u nás v prodejně."
          />
          <Pillar
            n="02"
            title="Sledujeme dropy"
            body="Limitky a barevný edice naskladňujeme jako první v ČR. Newsletter nepřespí — pošleme tip dřív, než to mizí."
          />
          <Pillar
            n="03"
            title="Workshopy & rady"
            body="Pravidelný legal walls, workshopy s lidmi z Berlína a Vídně. Začátečníci taky vítaní."
          />
        </Reveal>
      </div>
    </section>
  );
}

function NumberBlock({
  value,
  label,
  mono = false,
}: {
  value: React.ReactNode;
  label: string;
  mono?: boolean;
}) {
  return (
    <div className="border-t border-wall-edge pt-4">
      <div
        className={`${
          mono ? 'font-mono text-2xl md:text-3xl' : 'font-display text-4xl md:text-5xl tracking-tightest'
        } leading-none`}
      >
        {value}
      </div>
      <div className="font-mono text-[0.65rem] uppercase tracking-[0.22em] text-ash mt-2">
        {label}
      </div>
    </div>
  );
}

function Pillar({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="group relative border-l-2 border-wall-edge pl-5 py-3 hover:border-[color:var(--accent)] transition-colors">
      <div className="flex items-baseline gap-3">
        <span className="font-mono text-xs text-ash">{n}</span>
        <h3 className="font-display text-2xl tracking-tightest">{title}</h3>
      </div>
      <p className="mt-2 text-bone/70 leading-relaxed">{body}</p>
    </div>
  );
}
