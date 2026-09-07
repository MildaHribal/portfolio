import type { Metadata } from "next";
import { Fraunces, Hanken_Grotesk } from "next/font/google";
import Showcase from "./Showcase";

// Vlastní identita kavárny — teplý editorial, ať route nevypadá jako tmavé portfolio.
// latin-ext kvůli české diakritice (ř, ž, č…).
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
  title: "Redesign kavárny — Dos Mundos (ukázka)",
  description:
    "Ukázkový redesign webu pražské kavárny Dos Mundos — z pomalého, přeplácaného webu (PageSpeed 22/100, načtení 12,5 s) na rychlou, přehlednou a chutnou prezentaci. Neoficiální koncept od Miloslava Hříbala.",
  // Neoficiální koncept cizí značky — ať se to neplete do vyhledávání pod „Dos Mundos".
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
