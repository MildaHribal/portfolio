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

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Miloslav Hříbal — Fullstack Developer | React, Next.js & TypeScript",
    template: "%s | Miloslav Hříbal",
  },
  description:
    "Portfolio of Miloslav Hříbal — a Fullstack Developer with 4+ years of experience building production web applications with React, Next.js, TypeScript, Kotlin & Docker. Based in Czech Republic, available for new opportunities.",
  keywords: [
    "Miloslav Hříbal",
    "fullstack developer",
    "frontend developer",
    "React developer",
    "Next.js developer",
    "TypeScript",
    "Kotlin",
    "Docker",
    "web developer Czech Republic",
    "software engineer portfolio",
    "Nuxt.js",
    "Vue.js",
    "Node.js",
    "hire developer",
  ],
  authors: [{ name: "Miloslav Hříbal", url: siteUrl }],
  creator: "Miloslav Hříbal",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: "Miloslav Hříbal — Developer Portfolio",
    title: "Miloslav Hříbal — Fullstack Developer",
    description:
      "Fullstack Developer with 4+ years of experience. I build production-grade web apps with React, Next.js, TypeScript, Kotlin & Docker.",
    images: [
      {
        url: `${siteUrl}/og-image.png`,
        width: 1200,
        height: 630,
        alt: "Miloslav Hříbal — Fullstack Developer Portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Miloslav Hříbal — Fullstack Developer",
    description:
      "Fullstack Developer with 4+ years of experience building production web apps with modern JavaScript, Kotlin & Docker.",
    images: [`${siteUrl}/og-image.png`],
  },
  alternates: {
    canonical: siteUrl,
  },
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "darkreader-lock": "true",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Miloslav Hříbal",
  url: siteUrl,
  jobTitle: "Fullstack Developer",
  description:
    "Fullstack Developer with 4+ years of experience building production web applications with React, Next.js, TypeScript, Kotlin and Docker.",
  knowsAbout: [
    "React",
    "Next.js",
    "TypeScript",
    "Vue.js",
    "Nuxt.js",
    "Kotlin",
    "Node.js",
    "Docker",
    "PostgreSQL",
    "MongoDB",
    "Tailwind CSS",
    "DevOps",
  ],
  address: {
    "@type": "PostalAddress",
    addressLocality: "Pilsen",
    addressCountry: "CZ",
  },
  sameAs: [
    "https://github.com/MildaHribal",
    "https://linkedin.com/in/miloslav-hribal",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
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
