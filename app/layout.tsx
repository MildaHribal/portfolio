import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
      "Miloslav Hříbal — Fullstack Developer | React, Next.js, TypeScript & Kotlin",
    template: "%s | Miloslav Hříbal — Fullstack Developer",
  },
  description:
    "Miloslav Hříbal — Fullstack Developer from Pilsen, Czech Republic. 4+ years building production React, Next.js, Nuxt.js, TypeScript, Kotlin & Docker apps for 100k+ users. Available for hire — full-time, contract or freelance, remote or on-site in Czechia.",
  applicationName: "Miloslav Hříbal — Developer Portfolio",
  category: "technology",
  keywords: [
    "Miloslav Hříbal",
    "Milda Hříbal",
    "hribal.site",
    "fullstack developer",
    "full-stack developer",
    "frontend developer",
    "backend developer",
    "software engineer",
    "React developer",
    "Next.js developer",
    "TypeScript developer",
    "Vue.js developer",
    "Nuxt.js developer",
    "Kotlin developer",
    "Node.js developer",
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
    title: "Miloslav Hříbal — Fullstack Developer (React, Next.js, Kotlin)",
    description:
      "Fullstack Developer from Pilsen, Czech Republic. 4+ years shipping production web apps with React, Next.js, TypeScript, Kotlin & Docker. Available for hire — remote or on-site.",
    firstName: "Miloslav",
    lastName: "Hříbal",
    username: "MildaHribal",
    gender: "male",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Miloslav Hříbal — Fullstack Developer (React, Next.js, TypeScript, Kotlin)",
        type: "image/png",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miloslav Hříbal — Fullstack Developer",
    description:
      "Fullstack Developer from Czech Republic — React, Next.js, TypeScript, Kotlin & Docker. 4+ years of production experience. Available for hire.",
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
    "Fullstack Developer from Pilsen, Czech Republic with 4+ years of experience building production web applications with React, Next.js, Nuxt.js, TypeScript, Kotlin and Docker. Available for full-time, contract or freelance work — remote or on-site.",
  knowsLanguage: ["cs", "en"],
  nationality: { "@type": "Country", name: "Czech Republic" },
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "JavaScript",
    "Vue.js",
    "Nuxt.js",
    "Kotlin",
    "Node.js",
    "Docker",
    "Linux",
    "PostgreSQL",
    "MongoDB",
    "MariaDB",
    "Tailwind CSS",
    "REST APIs",
    "DevOps",
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
      "React, Next.js, TypeScript, Vue.js, Nuxt.js, Kotlin, Node.js, Docker, PostgreSQL, MongoDB, Tailwind CSS, DevOps",
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
    "Portfolio of Miloslav Hříbal, a Fullstack Developer from Czech Republic specialising in React, Next.js, TypeScript, Kotlin and Docker.",
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
  numberOfItems: 4,
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      item: {
        "@type": "CreativeWork",
        name: "SkinsMC",
        url: "https://skinsmc.org/",
        image: `${siteUrl}/skinsmc.webp`,
        description:
          "Minecraft skin gallery serving millions of users. Built the Nuxt.js frontend, Kotlin backend, and managed the Dockerised DevOps stack.",
        keywords: "Nuxt.js, Kotlin, PHP, MariaDB, Docker, DevOps",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 2,
      item: {
        "@type": "CreativeWork",
        name: "Minecraft IP List",
        url: "https://www.minecraftiplist.com/",
        image: `${siteUrl}/mcip.webp`,
        description:
          "International directory of Minecraft multiplayer servers — Nuxt.js frontend, Kotlin + MongoDB backend, Dockerised deployment.",
        keywords: "Nuxt.js, Kotlin, MongoDB, Docker, DevOps",
        author: { "@id": personId },
      },
    },
    {
      "@type": "ListItem",
      position: 3,
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
      position: 4,
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
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
        {children}
      </body>
    </html>
  );
}
