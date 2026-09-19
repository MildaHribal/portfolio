import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import Showcase from "./Showcase";

// Custom café identity — warm editorial feel, so the route doesn't look like the dark portfolio.
// latin-ext for Czech diacritics (ř, ž, č…).
const display = Fraunces({
  subsets: ["latin", "latin-ext"],
  style: ["normal", "italic"],
  variable: "--font-display",
  display: "swap",
});

const body = Hanken_Grotesk({
  subsets: ["latin", "latin-ext"],
  variable: "--font-body",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Café Redesign — Dos Mundos (showcase)",
  description:
    "A showcase redesign of the Prague café Dos Mundos — from a slow, cluttered website (PageSpeed 22/100, 12.5 s load time) to a fast, clean, and appetising presentation. Unofficial concept by Miloslav Hříbal.",
  // Unofficial concept of an external brand — keep it out of search results for "Dos Mundos".
  robots: { index: false, follow: true },
  alternates: { canonical: "https://hribal.site/ukazky/dos-mundos" },
};

export default function DosMundosPage() {
  return (
    <div className={`${display.variable} ${body.variable}`}>
      <Showcase />
    </div>
  );
}
