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
    role: "Web developer in Pilsen. I build websites, e-shops and web apps that load fast and sell.",
    pitch:
      "Programming since 2018, shipping to production since 2023: an e-shop with card and QR payments for a small art studio, two Minecraft platforms used by millions of players and my own Android app. Tell me what your business needs online and you'll have a clear quote within one working day.",
    ctaContact: "Ask for a quote",
    ctaCv: "Download CV",
    ctaLinkedin: "LinkedIn",
    ctaGithub: "GitHub",
    open: "Taking new projects",
    scroll: "Scroll down",
  },
  shelf: {
    label: "Project shelf. Use the arrow keys to pull out a box.",
    hint: "Click a spine to pull the box out. Arrow keys work too.",
    hintTouch: "Tap a spine to pull the box out.",
    scrollCue: "Projects below",
    details: "Project details",
    live: "Open live site",
    caseStudy: "Open the case study",
  },
  projects: {
    title: "Shipped work",
    details: "Details",
    open: "Open",
    indexTitle: "Every project, with the details",
    lead: "Client and paid work, my own apps, and two concept redesigns at the end. Every project links to the live product or its case study.",
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
    lead: "You don't need to know what Next.js is. Tell me what the website should do for you: more bookings, more orders, fewer phone calls. I handle design, code, hosting and launch, and you get a fixed price before any work starts.",
    items: [
      {
        title: "Business websites",
        desc: "A fast site for a café, studio, workshop or service. Opening hours, prices, booking and contact exactly where people look for them, readable on a phone, and easy to find on Google.",
        proof: "Example: Dos Mundos redesign",
        href: "/ukazky/dos-mundos",
      },
      {
        title: "E-shops",
        desc: "A shop built around how you sell: card payments, QR bank transfers, invoices created and emailed automatically, and an admin you can run yourself without calling me.",
        proof: "Example: Týnky Bordel",
        href: "https://tynkybordel.shop/",
      },
      {
        title: "Redesigns and speed-ups",
        desc: "Your current site is slow, dated or broken on mobile, and visitors leave. I measure what's wrong, rebuild what matters and show you the numbers before and after.",
        proof: "Example: Montana Cans concept",
        href: "https://montana.hribal.site/",
      },
    ],
    processTitle: "How it works",
    process: [
      { title: "You write or call", desc: "Tell me what you need. I reply within one working day, and I'll say honestly if I'm not the right fit." },
      { title: "Fixed price and date in writing", desc: "Before I start you know exactly what you get, what it costs and when it's done. The price only changes if the scope does." },
      { title: "You watch it grow", desc: "From the first week you have a private preview link, so there are no surprises at the end." },
      { title: "Launch and handover", desc: "I deploy it, show you how to run it and stay around for fixes and changes." },
    ],
    cta: "Ask for a quote",
  },
  about: {
    title: "About me",
    statement: "I've been programming since 2018. Since 2023 my code has run in production for millions of Minecraft players, a small art studio and the users of my own Android app.",
    p1: "I started teaching myself in 2018 and in 2020 went to INFIS, an IT high school in Pilsen. Since 2023 I've worked on production sites: first the Minecraft IP List frontend, then SkinsMC, and since 2025 my own client projects.",
    p2: "You talk directly to the person who writes the code: no account managers, no handoffs, no lost messages. I take a feature from the database to the last detail on a phone screen, and I test what ships.",
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
    title: "Tell me about your project",
    big: "Let's get in touch",
    lead: "A few sentences are enough: what you do, what the website should do and when you need it. I reply within one working day with questions or a rough price. Job offers welcome too.",
    emailLabel: "Email",
    locationLabel: "Based in",
    locationValue: "Pilsen, Czech Republic",
    fieldName: "Name",
    fieldEmail: "Email",
    fieldMessage: "Message",
    placeholderName: "Jane Smith",
    placeholderEmail: "jane@company.com",
    placeholderMessage: "What should the website do, and by when?",
    sending: "Sending…",
    send: "Send message",
    success: "Message sent. I'll get back to you within one working day.",
    genericError: "The message didn't go through. Try again, or email me directly.",
    networkError: "Couldn't reach the server. Check your connection, or email me directly.",
    required: "Fill in your name, email and a message.",
  },
  footer: {
    builtWith: "Built with Next.js, GSAP, Lenis and three.js. Set in General Sans and Geist.",
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
    role: "Webový vývojář z Plzně. Stavím weby, e-shopy a aplikace, které jsou rychlé a prodávají.",
    pitch:
      "Programuju od roku 2018, do produkce dodávám od roku 2023: e-shop s platbou kartou a QR kódem pro malou uměleckou dílnu, dvě Minecraft platformy s miliony hráčů a vlastní aplikaci pro Android. Napište mi, co vaše firma potřebuje, a do jednoho pracovního dne máte jasnou nabídku.",
    ctaContact: "Chci nabídku",
    ctaCv: "Stáhnout CV",
    ctaLinkedin: "LinkedIn",
    ctaGithub: "GitHub",
    open: "Beru nové zakázky",
    scroll: "Scrollujte",
  },
  shelf: {
    label: "Regál s projekty. Šipkami vysunete krabici.",
    hint: "Klikněte na hřbet a krabice se vysune. Fungují i šipky.",
    hintTouch: "Klepněte na hřbet a krabice se vysune.",
    scrollCue: "Projekty níže",
    details: "Detail projektu",
    live: "Otevřít web",
    caseStudy: "Otevřít ukázku",
  },
  projects: {
    title: "Hotová práce",
    details: "Detail",
    open: "Otevřít",
    indexTitle: "Všechny projekty a jejich detaily",
    lead: "Zakázky a placená práce, vlastní aplikace a na konci dva koncepty redesignu. Každý projekt vede na živý web nebo ukázku.",
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
    lead: "Nemusíte vědět, co je Next.js. Řekněte mi, co má web dělat: víc rezervací, víc objednávek, míň telefonátů. Design, kód, hosting i spuštění zařídím já a pevnou cenu znáte dřív, než začnu.",
    items: [
      {
        title: "Firemní weby",
        desc: "Rychlý web pro kavárnu, studio, dílnu nebo službu. Otevírací doba, ceny, rezervace a kontakt přesně tam, kde je lidé hledají, čitelně na mobilu a dobře dohledatelné na Googlu.",
        proof: "Ukázka: redesign Dos Mundos",
        href: "/ukazky/dos-mundos",
      },
      {
        title: "E-shopy",
        desc: "Obchod postavený podle toho, jak prodáváte: platby kartou, QR platby převodem, faktury vystavené a odeslané automaticky a administrace, kterou zvládnete sami bez volání mně.",
        proof: "Ukázka: Týnky Bordel",
        href: "https://tynkybordel.shop/",
      },
      {
        title: "Redesign a zrychlení",
        desc: "Váš současný web je pomalý, zastaralý nebo se rozpadá na mobilu a návštěvníci odcházejí. Změřím, co je špatně, předělám to podstatné a ukážu vám čísla před a po.",
        proof: "Ukázka: koncept Montana Cans",
        href: "https://montana.hribal.site/",
      },
    ],
    processTitle: "Jak to probíhá",
    process: [
      { title: "Napíšete nebo zavoláte", desc: "Řeknete mi, co potřebujete. Ozvu se do jednoho pracovního dne a na rovinu řeknu, když pro to nejsem ten pravý." },
      { title: "Pevná cena a termín písemně", desc: "Než začnu, víte přesně, co dostanete, kolik to stojí a kdy to bude hotové. Cena se mění jen se změnou zadání." },
      { title: "Vidíte, jak web roste", desc: "Od prvního týdne máte soukromý odkaz na rozpracovaný web, takže vás na konci nic nepřekvapí." },
      { title: "Spuštění a předání", desc: "Web nasadím, ukážu vám, jak ho spravovat, a zůstávám k dispozici na opravy a úpravy." },
    ],
    cta: "Chci nezávaznou nabídku",
  },
  about: {
    title: "O mně",
    statement: "Programuju od roku 2018. Od roku 2023 běží můj kód v produkci pro miliony hráčů Minecraftu, jednu malou uměleckou dílnu i uživatele mé vlastní aplikace pro Android.",
    p1: "Začal jsem sám v roce 2018 a v roce 2020 jsem nastoupil na INFIS, střední školu informatiky v Plzni. Od roku 2023 pracuju na webech v produkci: nejdřív frontend Minecraft IP List, potom SkinsMC a od roku 2025 vlastní zakázky.",
    p2: "Mluvíte přímo s tím, kdo píše kód: žádní obchodníci, žádné předávání, nic se neztratí po cestě. Funkci dotáhnu od databáze až po poslední detail na mobilu a před spuštěním ji otestuju.",
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
    title: "Napište mi o svém projektu",
    big: "Ozvěte se",
    lead: "Stačí pár vět: co děláte, co má web umět a do kdy ho potřebujete. Do jednoho pracovního dne se ozvu s otázkami nebo orientační cenou. Nabídky práce také vítám.",
    emailLabel: "E-mail",
    locationLabel: "Sídlím v",
    locationValue: "Plzeň, Česko",
    fieldName: "Jméno",
    fieldEmail: "E-mail",
    fieldMessage: "Zpráva",
    placeholderName: "Jan Novák",
    placeholderEmail: "jan@firma.cz",
    placeholderMessage: "Co má web umět a do kdy ho potřebujete?",
    sending: "Odesílám…",
    send: "Odeslat zprávu",
    success: "Zpráva odešla. Ozvu se do jednoho pracovního dne.",
    genericError: "Zprávu se nepodařilo odeslat. Zkuste to znovu, nebo mi napište e-mail.",
    networkError: "Nepodařilo se spojit se serverem. Zkontrolujte připojení, nebo mi napište e-mail.",
    required: "Vyplňte jméno, e-mail a zprávu.",
  },
  footer: {
    builtWith: "Postaveno v Next.js, GSAP, Lenis a three.js. Písma General Sans a Geist.",
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
