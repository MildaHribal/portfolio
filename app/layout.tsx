import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Miloslav Hříbal",
  description:
    "Personal portfolio of Miloslav Hříbal, a Frontend Developer specialising in React, Next.js and TypeScript.",
  icons: {
    icon: "/favicon.svg",
  },
  other: {
    "darkreader-lock": "true",
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-zinc-950 text-zinc-50`}
        suppressHydrationWarning
      >
        {children}
      </body>
    </html>
  );
}
