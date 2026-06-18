import type { Metadata } from 'next';
import { Antonio, DM_Sans, JetBrains_Mono } from 'next/font/google';
import './globals.css';

/**
 * Antonio — redraw of Anton (the original choice for the poster/stencil feel)
 * but with full latin-ext on Google Fonts, so Czech diacritics render the
 * same glyph weight as the rest of the headline. Oswald was correct but
 * looked newspapery; Antonio holds the condensed graffiti-poster geometry.
 */
const display = Antonio({
  weight: '700',
  subsets: ['latin', 'latin-ext'],
  variable: '--font-display',
  display: 'swap',
});

const body = DM_Sans({
  subsets: ['latin', 'latin-ext'],
  variable: '--font-body',
  display: 'swap',
});

const mono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Montana Cans CZ — Spreje, fixy, trysky & oblečení',
  description:
    'Oficiální dovozce Montana Cans v ČR. Přes 200 odstínů, fixy, trysky, oblečení a doplňky pro writery, street artisty a každého, kdo chce tvořit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="cs" className={`${display.variable} ${body.variable} ${mono.variable}`}>
      <body className="font-sans">
        <div className="relative z-10">{children}</div>
      </body>
    </html>
  );
}
