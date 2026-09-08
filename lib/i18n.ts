export type Lang = "cs" | "en";

export const LANGS: readonly Lang[] = ["cs", "en"] as const;
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";

export function isLang(value: string | undefined | null): value is Lang {
  return value === "cs" || value === "en";
}

const en = {
  nav: {
    projects: "Projects",
    experience: "Experience",
    about: "About",
    contact: "Contact",
    toggleAria: "Switch language",
    menuAria: "Toggle menu",
  },
  hero: {
    badge: "AVAILABLE FOR PROJECTS",
    srTitle:
      "Fullstack & Frontend Developer — React, Next.js, TypeScript, Nuxt.js & Node.js",
    subcopy:
      "Fullstack & Frontend Developer from Pilsen, Czech Republic with 4+ years of web development experience. I build fast, modern web platforms with Next.js & Nuxt.js, clean backend APIs in Node.js, and deploy production Docker applications. Available for hire — full-time, contract or freelance, remote or on-site.",
    location: "Czech Republic",
    statsYears: "Years with Code",
    statsApps: "Shipped Projects",
    statsUsers: "Production Users",
    scroll: "Scroll",
    ctaWork: "View Work",
    ctaContact: "Contact Me",
  },
  typewriter: [
    "Fullstack Developer",
    "Frontend Engineer",
    "Software Engineer",
    "Web Application Developer",
  ],
  stats: [
    { suffix: "+", label: "Years with code" },
    { suffix: "", label: "Live projects" },
    { suffix: "+", label: "Technologies" },
    { suffix: "M+", label: "Users reached" },
  ],
  projects: {
    eyebrow: "Selected Work",
    title: "My Projects",
    visit: "Visit",
    liveDemo: "Live Demo",
    closeDemo: "Close Demo",
    source: "Source",
    preview: "Quick Preview",
    featuredBadge: "Featured Work",
    closeModal: "Close",
    prevProject: "Previous",
    nextProject: "Next",
    proprietaryCode: "Proprietary code",
    clientProject: "Client project",
    filters: {
      all: "All",
      commercial: "Production & Client",
      concepts: "Concepts & UI",
      apps: "Apps",
    },
    badges: {
      commercial: "Commercial / Employment",
      client: "Client Work",
      concept: "Concept Redesign",
      personal: "Personal Project",
    },
    items: {
      tynkybordel:
        "A bespoke fullstack e-commerce store built for an independent artisan (handcrafted jewelry, resin ashtrays, paintings, and art pieces). Built in Nuxt with a PostgreSQL database via Drizzle ORM, Stripe card checkout, automatic Czech QR-code bank transfers, and automated PDF invoice generation emailed to customers.",
      skinsmc:
        "A high-traffic Minecraft skin gallery serving millions of users worldwide — browsing, uploads, tag-based search, an in-browser skin editor, and Microsoft account integration. Worked in a small agile team building the Nuxt.js frontend, optimizing image-heavy pages for fast loading under peak traffic, with Dockerized deployment.",
      dosmundos:
        "A concept redesign of Dos Mundos, a real Prague specialty café whose live site scored 22/100 on Google PageSpeed and took 12.5 s to show content. Rebuilt as a lightning-fast single-page presentation in Next.js 15 with warm editorial design, an interactive before/after comparison slider, and mobile-first architecture.",
      montana:
        "A concept redesign of the Montana Cans Czech spray-paint shop built to push frontend and motion design. Its signature feature is an interactive color wall: picking any spray shade dynamically propagates the accent across the entire page. Built with Next.js 15, React 19, and Motion animations.",
      mcip:
        "An international directory and ranking platform for Minecraft multiplayer servers with daily global traffic. Built the Nuxt.js frontend focused on speed and clean UX, detailed server profiles with video banners, real-time player counts, and Docker deployment.",
      budbuddy:
        "A cross-platform plant care journaling app tracking watering, light, and growth timelines. Built solo from a single Nuxt codebase shipped to Web, iOS, and Android via Capacitor, featuring offline-friendly state synchronization.",
      questie:
        "A gamified task manager that turns everyday to-dos into quests — earn XP, level up characters, and unlock achievements. Built the Nuxt.js frontend and Ionic UI designed to make productivity motivating and playful.",
    },
  },
  about: {
    eyebrow: "About me",
    title: "Passionate about the craft",
    p1: "My journey began at INFIS in Pilsen, where I evolved from hobby experiments to building production platforms with international traffic. For over four years, I've focused deeply on the JavaScript and TypeScript ecosystems, building modern web platforms in Next.js and Nuxt.js, alongside backend services with SQL and NoSQL databases in Dockerized environments.",
    p2: "I thrive in environments where I can take full ownership — from database schema and API design to pixel-perfect layouts and smooth micro-interactions. Driven by genuine curiosity and continuous iteration, I build software that is both rock-solid under the hood and delightful to use.",
    skills: {
      frontend: "Frontend",
      backend: "Backend",
      tooling: "Tooling",
      design: "Design",
    },
    philosophy: {
      cleanTitle: "Clean & Type-Safe Code",
      cleanDesc:
        "I rely on TypeScript, component architecture, and structured maintainability. Every function has a clear purpose and code stays readable as the project grows.",
      perfTitle: "Proven Performance",
      perfDesc:
        "From optimizing image rendering for millions of SkinsMC visitors to sub-second load times on Dos Mundos. Fast apps aren't optional — they drive retention.",
      userTitle: "Crafted for Real People",
      userDesc:
        "Software must feel great in hand. I focus on intuitive UX, smooth micro-interactions, accessibility, and uncompromising mobile responsiveness.",
    },
  },
  experience: {
    eyebrow: "Career",
    title: "Experience",
    present: "Present",
    items: {
      freelance: {
        role: "Fullstack Web Developer",
        company: "Freelance & Client Work",
        description:
          "Independent fullstack web development delivering custom client solutions. Shipped the complete Týnky Bordel e-commerce store (Nuxt, PostgreSQL, Drizzle ORM, Stripe, Czech QR payments) and created personal apps like BudBuddy and Questie.",
      },
      skinsmc: {
        role: "Frontend Developer",
        company: "SkinsMC",
        description:
          "Frontend development on a high-traffic platform serving millions of users. Worked in a team on the Nuxt.js frontend, optimizing rendering and image loading for tens of thousands of textures under heavy load, deployed with Docker.",
      },
      mcip: {
        role: "Frontend Developer",
        company: "MinecraftIPList",
        description:
          "Built and maintained the Nuxt.js frontend for an international Minecraft server directory. Implemented real-time player counts, video banners, backend API integrations, and Dockerized deployment.",
      },
      infis: {
        role: "IT Student",
        company: "INFIS — High School of Informatics, Pilsen",
        description:
          "Studied information technology focusing on software development, databases, and networking. Built a solid computer science foundation and transitioned into professional web development.",
      },
    },
  },
  contact: {
    eyebrow: "Contact",
    title: "Let's work together",
    lead: "Got a project, an open role, or want to collaborate? Drop me a message. I typically respond within 24 hours.",
    emailLabel: "Email",
    locationLabel: "Location",
    locationValue: "Pilsen, Czech Republic",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldMessage: "Message",
    placeholderName: "Jane Smith",
    placeholderEmail: "john@mail.com",
    placeholderMessage: "Tell me about your project…",
    sending: "Sending…",
    send: "Send Message",
    success: "Message sent! I'll get back to you within 24 hours.",
    genericError: "Something went wrong",
    networkError: "Failed to send message",
  },
  footer: {
    builtWith: "Built with Next.js & Tailwind CSS.",
    backToTop: "Back to top",
    backToTopAria: "Back to top",
  },
};

export type Messages = typeof en;

const cs: Messages = {
  nav: {
    projects: "Projekty",
    experience: "Zkušenosti",
    about: "O mně",
    contact: "Kontakt",
    toggleAria: "Přepnout jazyk",
    menuAria: "Otevřít menu",
  },
  hero: {
    badge: "K DISPOZICI NA PROJEKTY",
    srTitle:
      "Fullstack & Frontend vývojář — React, Next.js, TypeScript, Nuxt.js a Node.js",
    subcopy:
      "Fullstack & Frontend vývojář z Plzně se 4+ lety zkušeností s programováním a tvorbou moderních webů. Stavím rychlé webové platformy v Next.js & Nuxt.js, backendové API v Node.js a spravuji produkční kontejnerizované aplikace v Dockeru. K dispozici pro novou práci — na plný úvazek, kontrakt i freelance, vzdáleně i on-site.",
    location: "Česká republika",
    statsYears: "Let s kódem",
    statsApps: "Hotových projektů",
    statsUsers: "Uživatelů v produkci",
    scroll: "Posunout",
    ctaWork: "Mé projekty",
    ctaContact: "Napsat mi",
  },
  typewriter: [
    "Fullstack vývojář",
    "Frontend Engineer",
    "Software Engineer",
    "Vývojář webových aplikací",
  ],
  stats: [
    { suffix: "+", label: "Let s kódem" },
    { suffix: "", label: "Živých projektů" },
    { suffix: "+", label: "Technologií" },
    { suffix: "M+", label: "Uživatelů celkem" },
  ],
  projects: {
    eyebrow: "Vybraná práce",
    title: "Moje projekty",
    visit: "Otevřít",
    liveDemo: "Živé demo",
    closeDemo: "Zavřít demo",
    source: "Zdroj",
    preview: "Rychlý náhled",
    featuredBadge: "Vybraný projekt",
    closeModal: "Zavřít",
    prevProject: "Předchozí",
    nextProject: "Další",
    proprietaryCode: "Proprietární kód",
    clientProject: "Zakázkový projekt",
    filters: {
      all: "Vše",
      commercial: "Produkce & Zakázky",
      concepts: "Koncepty & UI",
      apps: "Aplikace",
    },
    badges: {
      commercial: "Komerční projekt / Zaměstnání",
      client: "Klientská zakázka",
      concept: "Koncepční redesign",
      personal: "Osobní projekt",
    },
    items: {
      tynkybordel:
        "Zakázkový fullstack e-shop na klíč pro originální ruční tvorbu (bižuterie, pryskyřicové popelníky, obrazy a sošky). Postaveno v Nuxtu s PostgreSQL databází přes Drizzle ORM, online platbami Stripe, automatickým generováním QR plateb pro bankovní převody a vystavováním PDF faktur s odesíláním e-mailem.",
      skinsmc:
        "Mezinárodní galerie Minecraft skinů s miliony uživatelů — vyhledávání podle tagů, nahrávání, pokročilý editor skinů přímo v prohlížeči a integrace s Microsoft účty. V malém týmu jsem vyvíjel Nuxt.js frontend se zaměřením na rychlost načítání obrázků při masivní návštěvnosti a kontejnerizované nasazení přes Docker.",
      dosmundos:
        "Koncepční redesign webu skutečné pražské kavárny Dos Mundos zaměřený na radikální zrychlení a moderní UI. Původní web měl v testu PageSpeed skóre 22/100 a načítal se přes 12 s — nová moderní prezentace v Next.js 15 s bleskovým zobrazením, interaktivním srovnávačem před/po a mobile-first layoutem.",
      montana:
        "Koncepční redesign českého e-shopu Montana Cans se spreji zaměřený na interaktivitu a frontendový cit. Hlavním prvkem je interaktivní barevná zeď vzorníků: kliknutí na jakýkoliv odstín spreje plynule přebarví akcenty celého webu. Vytvořeno v Next.js 15 a Reactu 19 s animacemi přes Motion.",
      mcip:
        "Katalog multiplayer Minecraft serverů s mezinárodní denní návštěvností. Postavil jsem moderní Nuxt.js frontend s důrazem na rychlost a čistý UX, detailní profily serverů s video bannery, sledování počtu online hráčů v reálném čase a kontejnerizaci v Dockeru.",
      budbuddy:
        "Cross-platform aplikace pro milovníky pokojových rostlin — zaznamenávání zálivky, světla a fotodokumentace růstu. Vyvinuto samostatně v Nuxtu a zabaleno pro web, iOS i Android přes Capacitor, s offline synchronizací stavu mezi zařízeními.",
      questie:
        "Gamifikovaný správce úkolů, který běžné to-do mění v RPG výpravy — získávejte zkušenosti (XP), vylepšujte postavy a odemykejte achievementy. Postavil jsem Nuxt.js frontend a rozhraní v Ionicu pro motivující uživatelský zážitek.",
    },
  },
  about: {
    eyebrow: "O mně",
    title: "Řemeslo mě baví",
    p1: "Moje cesta začala na INFIS v Plzni, kde jsem se z hobby projektů posunul k vývoji produkčních webových platforem s mezinárodní návštěvností. Už přes čtyři roky se intenzivně věnuji modernímu JavaScriptu a TypeScriptu, stavění webových aplikací v Next.js a Nuxt.js a backendovým službám napojeným na SQL i NoSQL databáze v Docker kontejnerech.",
    p2: "Daří se mi v projektech, kde můžu mít odpovědnost za celý stack — od návrhu schématu databáze a API po vyladěný layout a plynulé mikro-interakce. Žene mě upřímná zvědavost a neustálé posouvání detailů. Tvořím software, který spolehlivě funguje a zároveň se skvěle používá.",
    skills: {
      frontend: "Frontend",
      backend: "Backend",
      tooling: "Nástroje",
      design: "Design",
    },
    philosophy: {
      cleanTitle: "Čistý a typově bezpečný kód",
      cleanDesc:
        "Sázím na TypeScript, komponentovou architekturu a přehlednou strukturu. Kód píšu tak, aby se v něm snadno orientoval celý tým i po měsících.",
      perfTitle: "Rychlost a odezva v praxi",
      perfDesc:
        "Od optimalizace načítání obrázků u SkinsMC po sražení odezvy na zlomky sekundy u Dos Mundos. Rychlost přímo určuje, jestli uživatel zůstane.",
      userTitle: "Dotažené do detailu",
      userDesc:
        "Aplikace musí nejen spolehlivě fungovat na backendu, ale také skvěle působit v ruce. Řeším intuitivní UX, micro-interakce i responzivitu pro mobil.",
    },
  },
  experience: {
    eyebrow: "Kariéra",
    title: "Zkušenosti",
    present: "současnost",
    items: {
      freelance: {
        role: "Fullstack Web Developer",
        company: "Freelance / Zakázkový vývoj",
        description:
          "Samostatný vývoj moderních webů a aplikací na zakázku. Kompletní realizace e-shopu Týnky Bordel (Nuxt, PostgreSQL, Drizzle ORM, Stripe, QR platby) a tvorba vlastních aplikací jako BudBuddy a Questie. Důraz na spolehlivost, moderní stack a dotažení projektů do produkce.",
      },
      skinsmc: {
        role: "Frontend Developer",
        company: "SkinsMC",
        description:
          "Vývoj frontendu na platformě pro stahování a úpravu Minecraft skinů s miliony uživatelů. Práce v týmu na Nuxt.js aplikaci, optimalizace vykreslování a načítání desítek tisíc obrázků při vysoké zátěži a kontejnerizace přes Docker.",
      },
      mcip: {
        role: "Frontend Developer",
        company: "MinecraftIPList",
        description:
          "Tvorba a správa Nuxt.js frontendu pro mezinárodní katalog Minecraft serverů. Zobrazení stavu serverů a online hráčů v reálném čase, video bannery, integrace backendových API a nasazení v Dockeru.",
      },
      infis: {
        role: "Student IT",
        company: "INFIS — Střední škola informatiky, Plzeň",
        description:
          "Studium informačních technologií se zaměřením na vývoj softwaru, počítačové sítě a databáze. Získání pevných základů programování a webových technologií, na které jsem plynule navázal komerční praxí.",
      },
    },
  },
  contact: {
    eyebrow: "Kontakt",
    title: "Pojďme spolupracovat",
    lead: "Máte projekt, otevřenou pozici nebo se jen chcete spojit? Napište mi zprávu. Obvykle odpovídám do jednoho dne.",
    emailLabel: "Email",
    locationLabel: "Lokace",
    locationValue: "Plzeň, Česká republika",
    fieldName: "Jméno",
    fieldEmail: "Email",
    fieldMessage: "Zpráva",
    placeholderName: "Jan Novák",
    placeholderEmail: "jan@mail.cz",
    placeholderMessage: "Napište mi o svém projektu…",
    sending: "Odesílám…",
    send: "Odeslat zprávu",
    success: "Zpráva odeslána! Ozvu se do 24 hodin.",
    genericError: "Něco se nepovedlo",
    networkError: "Nepodařilo se odeslat zprávu",
  },
  footer: {
    builtWith: "Postaveno na Next.js & Tailwind CSS.",
    backToTop: "Nahoru",
    backToTopAria: "Zpět nahoru",
  },
};

export const messages: Record<Lang, Messages> = { en, cs };

export function detectLangFromAcceptLanguage(
  header: string | null | undefined
): Lang {
  if (!header) return DEFAULT_LANG;
  const parts = header
    .split(",")
    .map((p) => p.trim().split(";")[0].trim().toLowerCase())
    .filter(Boolean);
  for (const code of parts) {
    if (code === "cs" || code.startsWith("cs-")) return "cs";
  }
  return DEFAULT_LANG;
}
