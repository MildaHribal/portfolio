"use client";

import { useEffect, useState } from "react";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.services, href: "#services" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.about, href: "#about" },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    const close = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => window.removeEventListener("keydown", close);
  }, [menuOpen]);

  const track = (label: string, href: string, menu: string) => {
    setMenuOpen(false);
    getPostHog().capture("nav_link_clicked", { label, href, menu });
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-board border-b-2 border-ink">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:bg-sticker focus:text-black focus:rounded-xl focus:px-3 focus:py-2 focus:font-semibold"
      >
        {t.nav.skip}
      </a>
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 h-16 flex items-center justify-between gap-6">
        <a href="#" className="font-spine text-2xl leading-none" aria-label="hribal.site, back to top">
          hribal.site
        </a>

        <nav className="hidden md:flex items-center gap-7" aria-label="Main">
          {navLinks.map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => track(link.label, link.href, "desktop")}
              className="text-[0.95rem] font-medium hover:underline"
            >
              {link.label}
            </a>
          ))}
          <LanguageToggle source="desktop" />
          <a
            href="#contact"
            onClick={() => track(t.nav.contact, "#contact", "desktop")}
            className="btn btn-light h-10 px-4"
          >
            {t.nav.contact}
          </a>
        </nav>

        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle source="mobile" />
          <button
            type="button"
            className="w-11 h-11 grid place-items-center border-2 border-ink rounded-xl"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t.nav.menuAria}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="20" height="14" viewBox="0 0 20 14" aria-hidden>
              {menuOpen ? (
                <path d="M3 1l14 12M17 1L3 13" stroke="currentColor" strokeWidth="2" />
              ) : (
                <path d="M0 1h20M0 7h20M0 13h20" stroke="currentColor" strokeWidth="2" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="md:hidden border-t-2 border-ink bg-board px-5 py-2 flex flex-col">
          {[...navLinks, { label: t.nav.contact, href: "#contact" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => track(link.label, link.href, "mobile")}
              className="font-spine text-3xl py-3 border-b border-ink/20 last:border-0"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </header>
  );
}
