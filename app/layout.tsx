import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { cookies } from "next/headers";
import "./globals.css";
import { LanguageProvider } from "@/lib/language-context";
import { DEFAULT_LANG, LANG_COOKIE, isLang } from "@/lib/i18n";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

const siteUrl = "https://hribal.site";
const personEmail = "miloslav@hribal.site";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default:
      "Miloslav Hříbal — Fullstack & Frontend Developer | React, Next.js, Nuxt & TypeScript",
    template: "%s | Miloslav Hříbal — Fullstack & Frontend Developer",
  },
  description:
    "Miloslav Hříbal — Fullstack & Frontend Developer from Pilsen, Czech Republic. 4+ years building modern web applications with React, Next.js, Nuxt.js, TypeScript & Docker. Production experience serving millions of users. Available for hire — full-time, contract or freelance.",
  applicationName: "Miloslav Hříbal — Developer Portfolio",
  category: "technology",
  keywords: [
    "Miloslav Hříbal",
    "Milda Hříbal",
    "hribal.site",
    "fullstack developer",
    "full-stack developer",
    "frontend developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Vue.js developer",
    "Nuxt.js developer",
    "Node.js developer",
    "Drizzle ORM",
    "Stripe",
    "Docker",
    "Tailwind CSS",
    "PostgreSQL",
    "MongoDB",
    "DevOps",
    "freelance developer",
    "contract developer",
    "remote developer",
    "hire fullstack developer",
    "hire React developer",
    "hire Next.js developer",
    "developer for hire",
    "available for work",
    "web developer Czech Republic",
    "web developer Pilsen",
    "web developer Plzeň",
    "web developer Prague",
    "web developer Praha",
    "vývojář Plzeň",
    "vývojář Praha",
    "frontend vývojář",
    "fullstack vývojář",
    "programátor",
    "software engineer portfolio",
  ],
  authors: [{ name: "Miloslav Hříbal", url: siteUrl }],
  creator: "Miloslav Hříbal",
  publisher: "Miloslav Hříbal",
  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    locale: "en_US",
    alternateLocale: ["cs_CZ"],
    url: siteUrl,
    siteName: "Miloslav Hříbal — Developer Portfolio",
    title: "Miloslav Hříbal — Fullstack & Frontend Developer (React, Next.js, Nuxt)",
    description:
      "Fullstack & Frontend Developer from Pilsen, Czech Republic. 4+ years shipping production web apps with React, Next.js, Nuxt.js, TypeScript & Docker. Available for hire — remote or on-site.",
    firstName: "Miloslav",
    lastName: "Hříbal",
    username: "MildaHribal",
    gender: "male",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Miloslav Hříbal — Fullstack & Frontend Developer (React, Next.js, Nuxt.js, TypeScript)",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miloslav Hříbal — Fullstack & Frontend Developer",
    description:
      "Fullstack & Frontend Developer from Czech Republic — React, Next.js, Nuxt.js, TypeScript & Docker. Available for hire.",
    images: ["/opengraph-image"],
  },
  alternates: {
    canonical: siteUrl,
    languages: {
      "en-US": siteUrl,
      "x-default": siteUrl,
    },
  },
  icons: {
    icon: [
      { url: "/logo.webp?v=4", type: "image/webp" },
    ],
    apple: [
      { url: "/logo.webp?v=4", type: "image/webp" },
    ],
  },
  verification: {},
  other: {
    "darkreader-lock": "true",
  },
};

const personId = `${siteUrl}#person`;
const websiteId = `${siteUrl}#website`;
const profilePageId = `${siteUrl}#profilepage`;

const personSchema = {
  "@context": "https://schema.org",
  "@type": "Person",
  "@id": personId,
  name: "Miloslav Hříbal",
  alternateName: ["Milda Hříbal", "Miloslav Hribal"],
  givenName: "Miloslav",
  familyName: "Hříbal",
  url: siteUrl,
  image: `${siteUrl}/logo.webp`,
  email: `mailto:${personEmail}`,
  jobTitle: "Fullstack Developer",
  description:
    "Fullstack & Frontend Developer from Pilsen, Czech Republic with 4+ years of web development experience building production applications with React, Next.js, Nuxt.js, TypeScript and Docker. Available for full-time, contract or freelance work — remote or on-site.",
  knowsLanguage: ["cs", "en"],
  nationality: { "@type": "Country", name: "Czech Republic" },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Vue.js",
    "Nuxt.js",
    "Node.js",
    "Drizzle ORM",
    "Stripe",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "REST APIs",
    "CI/CD",
    "Web performance",
  ],
  hasOccupation: {
    "@type": "Occupation",
    name: "Fullstack Developer",
    occupationLocation: {
      "@type": "Country",
      name: "Czech Republic",
    },
    skills:
      "React, Next.js, TypeScript, Vue.js, Nuxt.js, Node.js, Drizzle ORM, Stripe, Docker, PostgreSQL, MongoDB, Tailwind CSS",
    responsibilities:
      "Designing and shipping production-grade web applications across the full stack — frontend, backend, and DevOps.",
  },
  seeks: {
    "@type": "Demand",
    name: "Fullstack / Frontend developer role (full-time, contract or freelance)",
  },
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pilsen",
    addressRegion: "Plzeňský kraj",
    addressCountry: "CZ",
  },
  workLocation: [
    { "@type": "Place", name: "Czech Republic" },
    { "@type": "VirtualLocation", name: "Remote" },
  ],
  sameAs: [
    "https://github.com/MildaHribal",
    "https://www.linkedin.com/in/miloslav-h%C5%99%C3%ADbal-792578280/",
  ],
};

const websiteSchema = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  "@id": websiteId,
  url: siteUrl,
  name: "Miloslav Hříbal — Developer Portfolio",
  inLanguage: "en",
  description:
    "Portfolio of Miloslav Hříbal, a Fullstack Developer from Czech Republic specialising in React, Next.js, Nuxt.js, TypeScript and Docker.",
  publisher: { "@id": personId },
};

const profilePageSchema = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  "@id": profilePageId,
  url: siteUrl,
  name: "Miloslav Hříbal — Fullstack Developer Portfolio",
  inLanguage: "en",
  isPartOf: { "@id": websiteId },
  mainEntity: { "@id": personId },
  about: { "@id": personId },
  primaryImageOfPage: {
    "@type": "ImageObject",
    url: `${siteUrl}/opengraph-image`,
    width: 1200,
    height: 630,
  },
};

const projectsItemList = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  name: "Selected projects by Miloslav Hříbal",
  itemListOrder: "https://schema.org/ItemListOrderAscending",
  numberOfItems: 7,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "CreativeWork",
        name: "Týnky Bordel",
        url: "https://tynkybordel.shop/",
        image: `${siteUrl}/tynkybordel.webp`,
        description:
          "Custom fullstack e-commerce store built with Nuxt, PostgreSQL, Drizzle ORM, Stripe payments, Czech QR payments, and automated PDF invoicing.",
        keywords: "Nuxt, Vue.js, TypeScript, PostgreSQL, Drizzle ORM, Stripe, Docker",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "CreativeWork",
        name: "SkinsMC",
        url: "https://skinsmc.org/",
        image: `${siteUrl}/skinsmc.webp`,
        description:
          "Minecraft skin gallery serving millions of users. Built the Nuxt.js frontend and managed Dockerized deployment.",
        keywords: "Nuxt.js, Vue.js, TypeScript, Docker, DevOps",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
      item: {
        "@type": "CreativeWork",
        name: "Dos Mundos — Redesign",
        url: `${siteUrl}/ukazky/dos-mundos`,
        image: `${siteUrl}/showcase/dos-mundos/card-v2.png`,
        description:
          "Concept redesign of Prague café Dos Mundos focused on speed and modern editorial UI. Rebuilt in Next.js 15 with sub-second load times.",
        keywords: "Next.js, React 19, TypeScript, UI/UX, Web Performance",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 4,
      item: {
        "@type": "CreativeWork",
        name: "Montana Cans",
        url: "https://montana.hribal.site/",
        image: `${siteUrl}/montana.webp`,
        description:
          "Interactive concept redesign with dynamic color wall and theme propagation built with Next.js 15 and Motion.",
        keywords: "Next.js 15, React 19, TypeScript, Tailwind CSS, Motion",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 5,
      item: {
        "@type": "CreativeWork",
        name: "Minecraft IP List",
        url: "https://www.minecraftiplist.com/",
        image: `${siteUrl}/mcip.webp`,
        description:
          "International directory of Minecraft multiplayer servers — Nuxt.js frontend and Docker deployment.",
        keywords: "Nuxt.js, Vue.js, TypeScript, Docker",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 6,
      item: {
        "@type": "CreativeWork",
        name: "BudBuddy",
        url: "https://budbuddy.hribal.site",
        image: `${siteUrl}/BudBuddy.webp`,
        description:
          "Cross-platform plant journaling app built with Nuxt.js, Vue.js, TypeScript and Capacitor — shipped to iOS, Android and the web from one codebase.",
        keywords: "Nuxt.js, Vue.js, TypeScript, Tailwind CSS, Capacitor",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 7,
      item: {
        "@type": "CreativeWork",
        name: "Questie App",
        url: "https://questieapp.com/",
        image: `${siteUrl}/Questie.webp`,
        description:
          "Gamified personal task manager — XP, levels, characters and achievements. Full Nuxt.js frontend and application architecture.",
        keywords: "Nuxt.js, Vue.js, TypeScript, Tailwind CSS, Ionic",
        author: { "@id": personId },
      },
    },
  ],
};

const graphJsonLd = {
  "@context": "https://schema.org",
  "@graph": [personSchema, websiteSchema, profilePageSchema, projectsItemList],
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const cookieStore = await cookies();
  const cookieLang = cookieStore.get(LANG_COOKIE)?.value;
  const lang = isLang(cookieLang) ? cookieLang : DEFAULT_LANG;

  return (
    <html lang={lang} className="dark" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(graphJsonLd) }}
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
        suppressHydrationWarning
      >
        <LanguageProvider initialLang={lang}>{children}</LanguageProvider>
      </body>
    </html>
  );
}
