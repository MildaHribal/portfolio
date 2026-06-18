# Montana Cans CZ — homepage mockup

Statický náhled (mockup) modernizované homepage e-shopu **Montana Cans CZ**.
Slouží jako koncept pro pitch klientovi — nemá backend ani košík, je to čistý
front-end určený k nahrání jako statický web.

- Next.js 15 (App Router) + React 19 + TypeScript
- Tailwind CSS 3
- Žádné externí obrázky ani externí závislosti pro běh — všechny "produkty"
  jsou vykreslené v SVG, žádné logo Montany se nepoužívá

## Spuštění lokálně

Vyžaduje Node.js 20+ a `pnpm` (nebo `npm` / `yarn`).

```bash
cd montana-mockup
pnpm install
pnpm dev
```

Web v dev módu jede na rootu — <http://localhost:3000/>. `basePath: '/montana'`
se zapne jenom při `pnpm build`, aby produkční export odpovídal cílovému URL
(<https://hribal.site/montana/>). Když chceš dev server explicitně pod
podsložkou, spusť ho s `BASE_PATH=/montana pnpm dev` a otevři
<http://localhost:3000/montana/>.

## Statický export

```bash
pnpm install
pnpm build
```

Hotový statický web najdeš ve složce `out/`. Obsah `out/` rovnou nahraj na
hosting do podsložky odpovídající `basePath`, tj.:

```
hribal.site/montana/   ←  obsah out/
```

`output: 'export'` + `trailingSlash: true` zajistí, že každá stránka má
vlastní `index.html` a funguje to bez Node serveru.

## Struktura

```
montana-mockup/
├── app/
│   ├── layout.tsx          Root layout, fonty (Anton + DM Sans + JetBrains Mono)
│   ├── page.tsx            Skládá homepage
│   └── globals.css         Design tokeny, wall texture, base styly
├── components/
│   ├── Nav.tsx             Sticky horní nav
│   ├── Hero.tsx            Hero se spray-reveal nadpisem + marquee pásem
│   ├── Categories.tsx      Bento mřížka kategorií (Spreje, Fixy, Trysky…)
│   ├── ColorWall.tsx       Signature feature — interaktivní barevná stěna
│   │                       s filtrem produktů (single-select + Zrušit filtr)
│   ├── BrandStrip.tsx      "Proč u nás" sekce
│   ├── Footer.tsx          Patička s kontaktem, dopravou, soc. sítěmi
│   ├── ProductGraphic.tsx  Pure SVG kresby produktů (spray/marker/cap/...)
│   └── Logotype.tsx        Vlastní textový logotyp MONTANA CANS · CZ
├── lib/
│   ├── colors.ts           60 placeholder odstínů s názvy a kódy
│   └── products.ts         16 placeholder produktů s vazbou na barvy
├── next.config.js          basePath '/montana' + output 'export'
├── tailwind.config.ts      Design tokeny, animace
└── tsconfig.json
```

## Design poznámky

- Základ stránky je tmavá betonová charcoal `#17161b` se SVG noise overlayem,
  aby evokovala stěnu. Klasické "AI default" černá + acid green je vyhnutá.
- Barvu do designu přidávají samy produkty — barevná stěna je hlavní zdroj
  barvy na celé stránce.
- Display font **Anton** (kondenzovaný, poster), body **DM Sans**,
  kódy & detaily **JetBrains Mono**.
- Hlavní motion moment: spray reveal nadpisu v hero. Jednotlivá slova
  vyjedou zleva doprava clip-path animací + barevný mlžný "blob" simuluje
  hlavu trysky. Pod nadpisem dokapou kapky.
- Všechny animace respektují `prefers-reduced-motion`.
- Klávesnice: viditelný focus (`:focus-visible` = žlutá outline), všechny
  swatche jsou tlačítka s `aria-label`.

## Customizace pro klienta

- Barvy stěny → `lib/colors.ts` (pole `COLORS`, sortováno podle rodiny a
  světlosti — drž to pravidlo, ať si stěna zachová gradient)
- Placeholder produkty → `lib/products.ts`
- Tonalita textů → texty jsou napevno v komponentách (`Hero.tsx`,
  `BrandStrip.tsx` atd.), v reálném nasazení sem půjde napojit CMS
- Brand fonty → `app/layout.tsx`, `next/font/google`
