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
        "Fullstack Developer — React, Next.js, TypeScript, Nuxt.js and Kotlin",
      subcopy:
        "Software Engineer & Fullstack Developer from Pilsen, Czech Republic with 4+ years of experience. I build robust backend systems in Kotlin & Node.js, modern web platforms with Next.js & Nuxt.js, and manage production Linux/Docker infrastructure. Available for hire — full-time, contract or freelance, remote or on-site.",
      location: "Czech Republic",
      statsYears: "Years Experience",
      statsTech: "Technologies",
      statsApps: "Production Apps",
      scroll: "Scroll",
      ctaWork: "View Work",
      ctaContact: "Contact Me",
    },
    typewriter: [
      "Fullstack Developer",
      "Frontend Engineer",
      "Software Engineer",
      "UI Craftsman",
    ],
    stats: [
      { suffix: "+", label: "Years of experience" },
      { suffix: "", label: "Live projects" },
      { suffix: "+", label: "Technologies I work with" },
      { suffix: "k+", label: "Users reached" },
    ],
    projects: {
      eyebrow: "Selected Work",
      title: "My Projects",
      visit: "Visit",
      liveDemo: "Live Demo",
      closeDemo: "Close Demo",
      source: "Source",
      items: {
        skinsmc:
          "A Minecraft skin gallery serving millions of users — browse, upload, tag-based search, an in-browser skin editor, and Microsoft account integration. Worked across the Nuxt.js frontend and Kotlin backend as part of a small team, focused on keeping image-heavy pages fast under heavy load, plus Docker-based deployment and DevOps.",
        mcip: "A directory for discovering Minecraft multiplayer servers — tag-based search, rankings, and detailed server pages with video banners and live player counts, indexing thousands of servers with daily international traffic. Built the Nuxt.js frontend with performance as a first-class constraint, and collaborated on the Kotlin + MongoDB backend and Docker deployment.",
        budbuddy:
          "A cross-platform plant care app where users log watering, light, and photos to build a timeline of each plant's growth. Built solo with a single Nuxt.js codebase shipped to web, iOS, and Android via Capacitor — with offline-friendly state syncing across devices.",
        questie:
          "A gamified task manager that turns everyday to-dos into quests — earn XP, level up characters, and unlock achievements. Built the Nuxt.js frontend and shaped the app's architecture, with a focus on making the game mechanics feel motivating without becoming pressure.",
      },
    },
    about: {
      eyebrow: "About me",
      title: "Passionate about the craft",
      p1: "My journey began at INFIS in Pilsen, where I went from experimenting with hobby projects to contributing to production platforms serving hundreds of thousands of users. Over the past four years, I've focused on the JavaScript and Kotlin ecosystems, moving between building frontends in Next.js/Nuxt.js and working on backend APIs with Dockerized infrastructure.",
      p2: "I thrive in environments where I can own the full stack, from database schema design to the final CSS animation. Driven by genuine curiosity and relentless iteration, I'm always exploring new system design patterns — usually with a fresh espresso in hand. I believe the best software isn't just written; it's carefully crafted through continuous learning.",
      skills: {
        frontend: "Frontend",
        backend: "Backend",
        tooling: "Tooling",
        design: "Design",
      },
      philosophy: {
        cleanTitle: "Clean Code",
        cleanDesc:
          "I write readable, maintainable code with consistent structure. Every function has a clear purpose, every module a single responsibility.",
        perfTitle: "Performance First",
        perfDesc:
          "From lazy loading to database indexing, I obsess over speed. Fast apps aren't a bonus — they're a baseline expectation.",
        userTitle: "User-Centric Design",
        userDesc:
          "I build for real people. Every interaction is intentional, every layout is tested, and accessibility is never an afterthought.",
      },
    },
    experience: {
      eyebrow: "Career",
      title: "Experience",
      present: "Present",
      items: {
        freelance: {
          role: "Freelance Software Engineer",
          company: "Self-Employed",
          description:
            "Working independently on web and mobile projects across the full stack, delivering custom solutions for clients. Building personal projects like BudBuddy and Questie to explore new technologies and sharpen my skills. Focused on modern JavaScript ecosystems, clean architecture, and shipping working products.",
        },
        skinsmc: {
          role: "Fullstack Developer",
          company: "SkinsMC",
          description:
            "Worked across the full stack on a high-traffic platform for browsing and uploading Minecraft skins, serving millions of users. Contributed to both the Kotlin backend and the Nuxt.js frontend as part of a small team, and helped with DevOps — containerized infrastructure using Docker and the deployment pipeline.",
        },
        mcip: {
          role: "Frontend Developer",
          company: "MinecraftIPList",
          description:
            "Built and maintained the Nuxt.js frontend for a comprehensive Minecraft server directory. Collaborated on integrating a resilient Kotlin-based backend with MongoDB, and handled containerization and deployment using Docker. Improved overall site performance and user experience across major feature releases.",
        },
        infis: {
          role: "IT Student",
          company:
            "INFIS — Secondary School of Information Technology, Pilsen",
          description:
            "Studied information technology with a focus on software development, computer networks, and system administration. Graduated with a solid foundation in programming principles and modern web technologies, which fueled further self-directed learning in the JavaScript and Kotlin ecosystems.",
        },
      },
    },
    contact: {
      eyebrow: "Contact",
      title: "Let's work together",
      lead: "Got a project or an open role? Or just want to connect? Drop me a message. I typically respond within a day.",
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
        "Fullstack vývojář — React, Next.js, TypeScript, Nuxt.js a Kotlin",
      subcopy:
        "Software Engineer & Fullstack vývojář z Plzně se 4+ lety praxe. Stavím robustní backendy v Kotlinu & Node.js, moderní webové platformy v Next.js & Nuxt.js a spravuji produkční Linux/Docker infrastrukturu. Volný na nové projekty — na plný úvazek, kontrakt nebo freelance, vzdáleně i on-site.",
      location: "Česká republika",
      statsYears: "Let praxe",
      statsTech: "Technologií",
      statsApps: "Produkčních aplikací",
      scroll: "Posunout",
      ctaWork: "Mé projekty",
      ctaContact: "Napsat mi",
    },
    typewriter: [
      "Fullstack vývojář",
      "Frontend Engineer",
      "Software Engineer",
      "UI řemeslník",
    ],
    stats: [
      { suffix: "+", label: "Let zkušeností" },
      { suffix: "", label: "Živých projektů" },
      { suffix: "+", label: "Technologií, co používám" },
      { suffix: "k+", label: "Oslovených uživatelů" },
    ],
    projects: {
      eyebrow: "Vybraná práce",
      title: "Moje projekty",
      visit: "Otevřít",
      liveDemo: "Živé demo",
      closeDemo: "Zavřít demo",
      source: "Zdroj",
      items: {
        skinsmc:
          "Galerie Minecraft skinů s miliony uživatelů — procházení, nahrávání, vyhledávání podle tagů, editor skinů přímo v prohlížeči a integrace s Microsoft účtem. Pracoval jsem v malém týmu na Nuxt.js frontendu i Kotlin backendu, se zaměřením na rychlost obrazově náročných stránek pod velkou zátěží. K tomu nasazování přes Docker a DevOps.",
        mcip: "Katalog multiplayer Minecraft serverů — vyhledávání podle tagů, žebříčky, detailní stránky s video bannery a počtem hráčů v reálném čase, indexuje tisíce serverů s denní mezinárodní návštěvností. Postavil jsem Nuxt.js frontend s důrazem na výkon a spolupracoval na Kotlin + MongoDB backendu a Docker nasazení.",
        budbuddy:
          "Cross-platform aplikace pro péči o rostliny — uživatelé si zaznamenávají zálivku, světlo a fotky a skládají si časovou osu růstu každé rostliny. Postavil jsem ji sám s jednou Nuxt.js kódovou základnou nasazenou na web, iOS i Android přes Capacitor — s offline-friendly synchronizací mezi zařízeními.",
        questie:
          "Gamifikovaný správce úkolů, který běžné to-do mění v questy — sbíráš XP, levelíš postavy a odemykáš achievementy. Postavil jsem Nuxt.js frontend a navrhl architekturu aplikace, s důrazem na to, aby herní mechaniky motivovaly, ale netlačily.",
      },
    },
    about: {
      eyebrow: "O mně",
      title: "Řemeslo mě baví",
      p1: "Moje cesta začala na INFIS v Plzni, kde jsem se z hobby projektů posunul k práci na produkčních platformách pro statisíce uživatelů. Posledních čtyři roky se soustředím na JavaScript a Kotlin ekosystémy, střídám stavění frontendů v Next.js/Nuxt.js s backend API a Docker infrastrukturou.",
      p2: "Daří se mi v prostředí, kde můžu mít na starosti celý stack — od schématu databáze po finální CSS animaci. Žene mě upřímná zvědavost a neustálé iterování, pořád zkoumám nové vzory v návrhu systémů — obvykle s čerstvým espressem v ruce. Věřím, že nejlepší software se nepíše, ale pečlivě řemeslně tvoří skrz neustálé učení.",
      skills: {
        frontend: "Frontend",
        backend: "Backend",
        tooling: "Nástroje",
        design: "Design",
      },
      philosophy: {
        cleanTitle: "Čistý kód",
        cleanDesc:
          "Píšu čitelný a udržovatelný kód s konzistentní strukturou. Každá funkce má jasný účel, každý modul jedinou odpovědnost.",
        perfTitle: "Výkon na prvním místě",
        perfDesc:
          "Od lazy loadingu po databázové indexy — rychlost mě posedlá. Rychlé aplikace nejsou bonus, ale základ.",
        userTitle: "Návrh pro uživatele",
        userDesc:
          "Stavím pro reálné lidi. Každá interakce má smysl, každý layout je vyzkoušený a přístupnost není nikdy až na poslední chvíli.",
      },
    },
    experience: {
      eyebrow: "Kariéra",
      title: "Zkušenosti",
      present: "současnost",
      items: {
        freelance: {
          role: "Freelance Software Engineer",
          company: "OSVČ",
          description:
            "Pracuju samostatně na webových a mobilních projektech napříč celým stackem a dodávám zakázková řešení pro klienty. Stavím vlastní projekty jako BudBuddy a Questie, abych zkoušel nové technologie a brousil dovednosti. Zaměřuju se na moderní JavaScript ekosystémy, čistou architekturu a dotahování věcí do konce.",
        },
        skinsmc: {
          role: "Fullstack vývojář",
          company: "SkinsMC",
          description:
            "Pracoval jsem napříč celým stackem na vysoce navštěvované platformě pro procházení a nahrávání Minecraft skinů s miliony uživatelů. V malém týmu jsem přispíval do Kotlin backendu i Nuxt.js frontendu a pomáhal s DevOps — kontejnerizace v Dockeru a deploy pipeline.",
        },
        mcip: {
          role: "Frontend vývojář",
          company: "MinecraftIPList",
          description:
            "Postavil a udržoval Nuxt.js frontend pro rozsáhlý katalog Minecraft serverů. Spolupracoval na integraci odolného Kotlin backendu s MongoDB a řešil kontejnerizaci a deploy přes Docker. Zlepšil jsem celkový výkon stránek a uživatelský zážitek napříč většími feature release.",
        },
        infis: {
          role: "Student IT",
          company: "INFIS — Střední škola informatiky, Plzeň",
          description:
            "Studoval jsem informační technologie se zaměřením na vývoj softwaru, počítačové sítě a správu systémů. Maturita mi dala solidní základ v programátorských principech a moderních webových technologiích, na což jsem navázal vlastním studiem JavaScript a Kotlin ekosystémů.",
        },
      },
    },
    contact: {
      eyebrow: "Kontakt",
      title: "Pojďme spolupracovat",
      lead: "Máte projekt nebo otevřenou pozici? Nebo se jen chcete spojit? Napište mi zprávu. Obvykle odpovídám do jednoho dne.",
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
