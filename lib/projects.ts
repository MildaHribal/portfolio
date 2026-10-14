import type { Lang } from "@/lib/i18n";

export type Kind = "client" | "paid" | "own" | "concept";

type Localized = { en: string; cs: string };

export interface Spec {
  label: Localized;
  value: Localized;
}

export interface Project {
  id: string;
  title: string;
  /** Shorter name for the box spine. */
  spine: string;
  kind: Kind;
  /** Brand colour taken from the product itself; paints the spine cap. */
  color: string;
  cover: string;
  href: string;
  repo?: string;
  /** Only where the date is known. */
  year?: string;
  tagline: Localized;
  description: Localized;
  specs: Spec[];
}

const L = (en: string, cs: string): Localized => ({ en, cs });

const role = L("Role", "Role");
const built = L("Built with", "Technologie");
const when = L("Years", "Roky");

export const projects: Project[] = [
  {
    id: "tynky-bordel",
    title: "Týnky Bordel",
    spine: "Týnky Bordel",
    kind: "client",
    color: "#e889b5",
    cover: "/covers/tynky.webp",
    href: "https://tynkybordel.shop/",
    year: "2025",
    tagline: L("Online shop for a handmade art studio", "E-shop pro ruční tvorbu"),
    description: L(
      "A complete shop for an independent artist who sells paintings, resin ashtrays and jewellery. Customers pay by card or by Czech QR bank transfer and get a PDF confirmation by email. The owner issues invoices through Fakturoid with one click and runs the whole admin herself.",
      "Kompletní e-shop pro nezávislou tvůrkyni, která prodává obrazy, pryskyřicové popelníky a bižuterii. Zákazníci platí kartou nebo QR platbou převodem a e-mailem jim přijde PDF potvrzení. Majitelka vystavuje faktury přes Fakturoid jedním kliknutím a celou administraci zvládá sama."
    ),
    specs: [
      { label: role, value: L("All of it: design, frontend, backend, deployment", "Všechno: design, frontend, backend, nasazení") },
      { label: built, value: L("Nuxt, Vue, TypeScript, PostgreSQL, Drizzle ORM, Stripe, Docker", "Nuxt, Vue, TypeScript, PostgreSQL, Drizzle ORM, Stripe, Docker") },
      { label: L("Payments", "Platby"), value: L("Card, QR bank transfer, Fakturoid invoices", "Karta, QR platba, faktury přes Fakturoid") },
      { label: L("Live since", "V provozu od"), value: L("2025", "2025") },
    ],
  },
  {
    id: "budbuddy",
    title: "BudBuddy",
    spine: "BudBuddy",
    kind: "own",
    color: "#123524",
    cover: "/covers/budbuddy.webp",
    href: "https://budbuddy.hribal.site",
    repo: "https://github.com/MildaHribal/budbuddy",
    year: "2026",
    tagline: L("Grow journal for home growers", "Pěstitelský deník pro domácí pěstitele"),
    description: L(
      "My own app and what I spend most of my time on right now. One Nuxt codebase ships to the web and to Android through Capacitor: plant timelines with photos, reminders that follow the light schedule, native home-screen widgets, a 58-lesson grow guide, a community on Supabase and an AI assistant that reads plant photos. The journal stays on the device, no account needed.",
      "Moje vlastní aplikace, na které teď dělám nejvíc. Jeden Nuxt kód běží na webu i na Androidu přes Capacitor: časová osa rostlin s fotkami, připomínky podle světelného režimu, nativní widgety na plochu, průvodce pěstováním s 58 lekcemi, komunita na Supabase a AI asistent, který čte fotky rostlin. Deník zůstává v zařízení, účet není potřeba."
    ),
    specs: [
      { label: role, value: L("Solo: product, design, code", "Sám: produkt, design, kód") },
      { label: built, value: L("Nuxt 4, Vue, TypeScript, Capacitor 7, Supabase, Netlify Functions", "Nuxt 4, Vue, TypeScript, Capacitor 7, Supabase, Netlify Functions") },
      { label: L("Platforms", "Platformy"), value: L("Web, Android with widgets and notifications", "Web, Android s widgety a notifikacemi") },
      { label: L("Status", "Stav"), value: L("Version 1.2 on GitHub, Play Store release in preparation", "Verze 1.2 na GitHubu, vydání na Google Play se chystá") },
    ],
  },
  {
    id: "skinsmc",
    title: "SkinsMC",
    spine: "SkinsMC",
    kind: "paid",
    color: "#4e8a56",
    cover: "/covers/skinsmc.webp",
    href: "https://skinsmc.org/",
    year: "2024",
    tagline: L("Minecraft skin gallery and editor", "Galerie a editor Minecraft skinů"),
    description: L(
      "A skin gallery used by millions of Minecraft players: search by tag and colour, uploads, a 3D preview, an editor in the browser and Microsoft account login. I worked across the frontend and backend, mostly on keeping image-heavy pages fast under peak traffic.",
      "Galerie skinů, kterou používají miliony hráčů Minecraftu: hledání podle tagů a barev, nahrávání, 3D náhled, editor přímo v prohlížeči a přihlášení Microsoft účtem. Pracoval jsem na frontendu i backendu, hlavně na tom, aby stránky plné obrázků zůstaly rychlé i ve špičce."
    ),
    specs: [
      { label: role, value: L("Developer in a team of four", "Vývojář ve čtyřčlenném týmu") },
      { label: built, value: L("Nuxt, Vue, TypeScript, PostgreSQL, Docker", "Nuxt, Vue, TypeScript, PostgreSQL, Docker") },
      { label: when, value: L("2024–2025", "2024–2025") },
    ],
  },
  {
    id: "minecraft-ip-list",
    title: "Minecraft IP List",
    spine: "Minecraft IP List",
    kind: "paid",
    color: "#7fb6ec",
    cover: "/covers/mcip.webp",
    href: "https://www.minecraftiplist.com/",
    year: "2023",
    tagline: L("Directory of Minecraft servers", "Katalog Minecraft serverů"),
    description: L(
      "My first production job. An international directory where server owners list their servers and players pick where to play: rankings, tags, server pages with video banners and live player counts. I built and maintained the Nuxt frontend and its Docker deployment.",
      "Moje první práce v produkci. Mezinárodní katalog, kam majitelé přidávají své servery a hráči si vybírají, kde hrát: žebříčky, tagy, profily serverů s video bannery a počty hráčů online v reálném čase. Stavěl a udržoval jsem Nuxt frontend a jeho nasazení v Dockeru."
    ),
    specs: [
      { label: role, value: L("Frontend developer", "Frontend vývojář") },
      { label: built, value: L("Nuxt, Vue, TypeScript, MongoDB, Docker", "Nuxt, Vue, TypeScript, MongoDB, Docker") },
      { label: when, value: L("2023–2025", "2023–2025") },
    ],
  },
  {
    id: "questie",
    title: "Questie",
    spine: "Questie",
    kind: "own",
    color: "#9ec5f7",
    cover: "/covers/questie.webp",
    href: "https://questieapp.com/",
    tagline: L("To-do app that plays like an RPG", "Úkolníček, který se hraje jako RPG"),
    description: L(
      "A to-do list that turns tasks into quests. Finishing them earns XP, levels up your character and unlocks new ones. Built with Nuxt and Ionic, published on the web and on Google Play.",
      "To-do aplikace, která z úkolů dělá questy. Za splněné úkoly dostáváte XP, vaše postava roste a odemykáte nové. Postaveno v Nuxtu a Ionicu, vydáno na webu i na Google Play."
    ),
    specs: [
      { label: role, value: L("Frontend and app UI", "Frontend a UI aplikace") },
      { label: built, value: L("Nuxt, Vue, TypeScript, Ionic, Capacitor", "Nuxt, Vue, TypeScript, Ionic, Capacitor") },
      { label: L("Platforms", "Platformy"), value: L("Web, Android on Google Play", "Web, Android na Google Play") },
    ],
  },
  {
    id: "dos-mundos",
    title: "Dos Mundos",
    spine: "Dos Mundos",
    kind: "concept",
    color: "#3b2a20",
    cover: "/covers/dosmundos.webp",
    href: "/ukazky/dos-mundos",
    year: "2026",
    tagline: L("Redesign concept for a Prague café", "Koncept redesignu pražské kavárny"),
    description: L(
      "The café's real site scored 22/100 on mobile PageSpeed and took 12.5 s to show anything. I rebuilt it as a one-page concept with a before/after slider and put the measured Lighthouse results next to it.",
      "Skutečný web kavárny měl v mobilním PageSpeed 22/100 a obsah ukázal až po 12,5 s. Přestavěl jsem ho jako jednostránkový koncept se srovnávačem před a po a naměřené výsledky Lighthouse dal hned vedle."
    ),
    specs: [
      { label: built, value: L("Next.js, React 19, TypeScript", "Next.js, React 19, TypeScript") },
      { label: L("Result", "Výsledek"), value: L("Lighthouse mobile 99/100", "Lighthouse mobil 99/100") },
    ],
  },
  {
    id: "montana-cans",
    title: "Montana Cans",
    spine: "Montana Cans",
    kind: "concept",
    color: "#8ad12e",
    cover: "/covers/montana.webp",
    href: "https://montana.hribal.site/",
    repo: "https://github.com/MildaHribal/montana-cans-cz",
    year: "2026",
    tagline: L("Concept shop for spray paint", "Koncept e-shopu se spreji"),
    description: L(
      "A concept store for the Montana Cans spray paint range. Its main feature is a colour wall: pick any shade and the accent colour of the whole site changes to match.",
      "Koncept e-shopu se spreji Montana Cans. Hlavní prvek je barevná zeď: vyberete odstín a akcentová barva celého webu se mu přizpůsobí."
    ),
    specs: [
      { label: built, value: L("Next.js 15, React 19, Tailwind CSS, Motion", "Next.js 15, React 19, Tailwind CSS, Motion") },
    ],
  },
];

export const kindLabel: Record<Kind, Localized> = {
  client: L("Client project", "Zakázka pro klienta"),
  paid: L("Paid work", "Placená práce"),
  own: L("My own app", "Vlastní aplikace"),
  concept: L("Concept", "Koncept"),
};

export const loc = (v: Localized, lang: Lang) => v[lang];

export const isExternal = (href: string) => href.startsWith("http");
