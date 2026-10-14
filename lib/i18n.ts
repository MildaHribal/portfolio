export type Lang = "cs" | "en";

export const LANGS: readonly Lang[] = ["cs", "en"] as const;
export const DEFAULT_LANG: Lang = "en";
export const LANG_COOKIE = "lang";

export function isLang(value: string | undefined | null): value is Lang {
  return value === "cs" || value === "en";
}

const en = {
  nav: {
    projects: "Work",
    services: "For clients",
    experience: "Experience",
    about: "About",
    contact: "Contact",
    toggleAria: "Switch language",
    menuAria: "Toggle menu",
    skip: "Skip to content",
  },
  hero: {
    srTitle: "Frontend and fullstack developer: Vue, Nuxt, React, Next.js, TypeScript",
    role: "Frontend and fullstack developer in Pilsen, Czech Republic.",
    pitch:
      "I build web products in Nuxt and Next.js and ship them to real users: two Minecraft platforms with millions of players, an e-shop for a client and my own Android app. Open to full-time roles, contracts and freelance work, remote or on-site.",
    ctaContact: "Contact me",
    ctaCv: "Download CV",
    ctaLinkedin: "LinkedIn",
    ctaGithub: "GitHub",
  },
  shelf: {
    label: "Project shelf. Use the arrow keys to pull out a box.",
    hint: "Click a spine to pull the box out. Arrow keys work too.",
    hintTouch: "Tap a spine to pull the box out.",
    details: "Project details",
    live: "Open live site",
    caseStudy: "Open the case study",
  },
  projects: {
    title: "Shipped work",
    lead: "Client and paid work, my own apps, and two concept redesigns at the end. Every box links to the live product.",
    visit: "Open live site",
    caseStudy: "Open the case study",
    source: "Source code",
    specsCaption: "Project details",
    type: "Type",
    paidTitle: "Paid work for the Minecraft community",
    paidLead:
      "From 2023 to 2025 I worked in a small team on two sites Minecraft players use every day. This is where I learned to ship to production, work in someone else's codebase and keep pages fast under real traffic.",
    conceptsTitle: "Concept redesigns",
    conceptsLead: "Unpaid concepts: how I would rebuild an existing site.",
  },
  services: {
    title: "Need a website or an e-shop?",
    lead: "You don't need to know what Next.js is. Tell me what the website should do for your business and I'll handle the rest: design, code, hosting and launch.",
    items: [
      {
        title: "Business websites",
        desc: "A fast, clean site for a café, studio, workshop or service. Opening hours, menu, booking and contact where people actually look for them, and readable on a phone.",
        proof: "Example: Dos Mundos redesign",
        href: "/ukazky/dos-mundos",
      },
      {
        title: "E-shops",
        desc: "A shop built around how you sell: card payments, QR bank transfers, invoices generated and emailed automatically, and an admin you can run yourself.",
        proof: "Example: Týnky Bordel",
        href: "https://tynkybordel.shop/",
      },
      {
        title: "Redesigns and speed-ups",
        desc: "Your current site is slow, dated or broken on mobile. I measure what's wrong, rebuild what matters and show you the numbers before and after.",
        proof: "Example: Montana Cans concept",
        href: "https://montana.hribal.site/",
      },
    ],
    processTitle: "How we'd work together",
    process: [
      { title: "You write or call", desc: "Tell me what you need. I reply within a day, and I'll tell you honestly if I'm not the right fit." },
      { title: "Scope, price and date in writing", desc: "Before I start you know exactly what you get, what it costs and when it's done." },
      { title: "You watch it grow", desc: "You get a private preview link from the first week, so nothing is a surprise at the end." },
      { title: "Launch and handover", desc: "I deploy it, show you how to run it, and stay around for fixes and changes." },
    ],
    cta: "Tell me about your project",
  },
  about: {
    title: "About me",
    p1: "I started programming in 2020 at INFIS, an IT high school in Pilsen. Since 2023 I've worked on production sites: first the Minecraft IP List frontend, then SkinsMC, and since 2025 my own client projects.",
    p2: "I like owning a feature from the database table to the last hover state. I use AI tools every day, like most developers now, and I read, test and fix what they write before it ships.",
    toolsCaption: "Tools I use",
    skills: {
      frontend: "Frontend",
      backend: "Backend",
      tooling: "Tooling",
    },
  },
  experience: {
    title: "Experience",
    present: "now",
    caption: "Work history",
    cols: { years: "Years", role: "Role", where: "Where" },
    items: {
      freelance: {
        role: "Fullstack web developer",
        company: "Freelance",
        description: "Client sites and shops, including Týnky Bordel end to end. My own apps BudBuddy and Questie.",
      },
      skinsmc: {
        role: "Developer",
        company: "SkinsMC",
        description: "Frontend and backend work on a Minecraft skin platform with millions of users. Image loading, rendering performance, Docker.",
      },
      mcip: {
        role: "Frontend developer",
        company: "Minecraft IP List",
        description: "Built and maintained the Nuxt frontend of an international server directory: live player counts, video banners, API integrations.",
      },
      infis: {
        role: "IT student",
        company: "INFIS, Pilsen",
        description: "Secondary school of information technology: programming, databases, networking.",
      },
    },
  },
  contact: {
    title: "Contact me",
    lead: "A job offer, a project or just a question. I usually reply within a day.",
    emailLabel: "Email",
    locationLabel: "Based in",
    locationValue: "Pilsen, Czech Republic",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldMessage: "Message",
    placeholderName: "Jane Smith",
    placeholderEmail: "jane@company.com",
    placeholderMessage: "What are you working on?",
    sending: "Sending…",
    send: "Send message",
    success: "Message sent. I'll get back to you within a day.",
    genericError: "The message didn't go through. Try again, or email me directly.",
    networkError: "Couldn't reach the server. Check your connection, or email me directly.",
    required: "Fill in your name, email and a message.",
  },
  footer: {
    builtWith: "Built with Next.js, set in Clash Display and Satoshi.",
    backToTop: "Back to top",
    backToTopAria: "Back to top",
  },
};

export type Messages = typeof en;

const cs: Messages = {
  nav: {
    projects: "Práce",
    services: "Pro klienty",
    experience: "Zkušenosti",
    about: "O mně",
    contact: "Kontakt",
    toggleAria: "Přepnout jazyk",
    menuAria: "Otevřít menu",
    skip: "Přeskočit na obsah",
  },
  hero: {
    srTitle: "Frontend a fullstack vývojář: Vue, Nuxt, React, Next.js, TypeScript",
    role: "Frontend a fullstack vývojář z Plzně.",
    pitch:
      "Stavím webové produkty v Nuxtu a Next.js a dostávám je ke skutečným uživatelům: dvě Minecraft platformy s miliony hráčů, e-shop pro klientku a vlastní aplikaci pro Android. Hledám práci na plný úvazek, kontrakt i freelance zakázky, vzdáleně i na místě.",
    ctaContact: "Napište mi",
    ctaCv: "Stáhnout CV",
    ctaLinkedin: "LinkedIn",
    ctaGithub: "GitHub",
  },
  shelf: {
    label: "Regál s projekty. Šipkami vysunete krabici.",
    hint: "Klikněte na hřbet a krabice se vysune. Fungují i šipky.",
    hintTouch: "Klepněte na hřbet a krabice se vysune.",
    details: "Detail projektu",
    live: "Otevřít web",
    caseStudy: "Otevřít ukázku",
  },
  projects: {
    title: "Hotová práce",
    lead: "Zakázky a placená práce, vlastní aplikace a na konci dva koncepty redesignu. Každá krabice vede na živý produkt.",
    visit: "Otevřít web",
    caseStudy: "Otevřít ukázku",
    source: "Zdrojový kód",
    specsCaption: "Detail projektu",
    type: "Typ",
    paidTitle: "Placená práce pro Minecraft komunitu",
    paidLead:
      "V letech 2023 až 2025 jsem v malém týmu pracoval na dvou webech, které hráči Minecraftu používají každý den. Tady jsem se naučil dodávat do produkce, pracovat v cizím kódu a držet stránky rychlé i při skutečném provozu.",
    conceptsTitle: "Koncepty redesignu",
    conceptsLead: "Neplacené koncepty: jak bych přestavěl existující web.",
  },
  services: {
    title: "Potřebujete web nebo e-shop?",
    lead: "Nemusíte vědět, co je Next.js. Řekněte mi, co má web pro vaše podnikání dělat, a o zbytek se postarám: design, kód, hosting i spuštění.",
    items: [
      {
        title: "Firemní weby",
        desc: "Rychlý a čistý web pro kavárnu, studio, dílnu nebo službu. Otevírací doba, nabídka, rezervace a kontakt tam, kde je lidé opravdu hledají, a čitelně i na mobilu.",
        proof: "Ukázka: redesign Dos Mundos",
        href: "/ukazky/dos-mundos",
      },
      {
        title: "E-shopy",
        desc: "Obchod postavený podle toho, jak prodáváte: platby kartou, QR platby převodem, faktury vystavené a odeslané automaticky a administrace, kterou zvládnete sami.",
        proof: "Ukázka: Týnky Bordel",
        href: "https://tynkybordel.shop/",
      },
      {
        title: "Redesign a zrychlení",
        desc: "Váš současný web je pomalý, zastaralý nebo se rozpadá na mobilu. Změřím, co je špatně, předělám to podstatné a ukážu vám čísla před a po.",
        proof: "Ukázka: koncept Montana Cans",
        href: "https://montana.hribal.site/",
      },
    ],
    processTitle: "Jak by spolupráce probíhala",
    process: [
      { title: "Napíšete nebo zavoláte", desc: "Řeknete mi, co potřebujete. Odpovím do druhého dne a na rovinu řeknu, když pro to nejsem ten pravý." },
      { title: "Rozsah, cena a termín písemně", desc: "Než začnu, víte přesně, co dostanete, kolik to stojí a kdy to bude hotové." },
      { title: "Vidíte, jak web roste", desc: "Od prvního týdne máte soukromý odkaz na rozpracovaný web, takže vás na konci nic nepřekvapí." },
      { title: "Spuštění a předání", desc: "Web nasadím, ukážu vám, jak ho spravovat, a zůstávám k dispozici na opravy a úpravy." },
    ],
    cta: "Napište mi o svém projektu",
  },
  about: {
    title: "O mně",
    p1: "Programovat jsem začal v roce 2020 na INFIS, střední škole informatiky v Plzni. Od roku 2023 pracuju na webech v produkci: nejdřív frontend Minecraft IP List, potom SkinsMC a od roku 2025 vlastní zakázky.",
    p2: "Nejradši mám funkci celou na starosti, od tabulky v databázi po poslední hover stav. AI nástroje používám každý den, jako dnes většina vývojářů, a co napíšou, čtu, testuju a opravuju, než to jde ven.",
    toolsCaption: "Nástroje, se kterými pracuju",
    skills: {
      frontend: "Frontend",
      backend: "Backend",
      tooling: "Nástroje",
    },
  },
  experience: {
    title: "Zkušenosti",
    present: "teď",
    caption: "Pracovní historie",
    cols: { years: "Roky", role: "Role", where: "Kde" },
    items: {
      freelance: {
        role: "Fullstack web developer",
        company: "Freelance",
        description: "Weby a e-shopy pro klienty, mimo jiné celý Týnky Bordel. Vlastní aplikace BudBuddy a Questie.",
      },
      skinsmc: {
        role: "Vývojář",
        company: "SkinsMC",
        description: "Frontend i backend platformy s Minecraft skiny pro miliony uživatelů. Načítání obrázků, výkon vykreslování, Docker.",
      },
      mcip: {
        role: "Frontend vývojář",
        company: "Minecraft IP List",
        description: "Stavba a údržba Nuxt frontendu mezinárodního katalogu serverů: hráči online v reálném čase, video bannery, napojení na API.",
      },
      infis: {
        role: "Student IT",
        company: "INFIS, Plzeň",
        description: "Střední škola informatiky: programování, databáze, sítě.",
      },
    },
  },
  contact: {
    title: "Napište mi",
    lead: "Nabídka práce, projekt nebo jen dotaz. Obvykle odpovídám do druhého dne.",
    emailLabel: "E-mail",
    locationLabel: "Sídlím v",
    locationValue: "Plzeň, Česko",
    fieldName: "Jméno",
    fieldEmail: "E-mail",
    fieldMessage: "Zpráva",
    placeholderName: "Jan Novák",
    placeholderEmail: "jan@firma.cz",
    placeholderMessage: "Na čem pracujete?",
    sending: "Odesílám…",
    send: "Odeslat zprávu",
    success: "Zpráva odešla. Ozvu se do druhého dne.",
    genericError: "Zprávu se nepodařilo odeslat. Zkuste to znovu, nebo mi napište e-mail.",
    networkError: "Nepodařilo se spojit se serverem. Zkontrolujte připojení, nebo mi napište e-mail.",
    required: "Vyplňte jméno, e-mail a zprávu.",
  },
  footer: {
    builtWith: "Postaveno v Next.js, písma Clash Display a Satoshi.",
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
