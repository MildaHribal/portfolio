"use client";

import { useEffect, useState } from "react";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.about, href: "#about" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.services, href: "#services" },
  ];

  useEffect(() => {
    if (!menuOpen) return;
    window.__lenis?.stop();
    const close = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", close);
    return () => {
      window.removeEventListener("keydown", close);
      window.__lenis?.start();
    };
  }, [menuOpen]);

  const track = (label: string, href: string, menu: string) => {
    setMenuOpen(false);
    getPostHog().capture("nav_link_clicked", { label, href, menu });
  };

  return (
    <>
    {/* Difference blend keeps the bar legible over both the light and the dark sections. */}
    <header className="fixed top-0 inset-x-0 z-50 mix-blend-difference text-white">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-10 focus:bg-chalk focus:text-coal focus:rounded-full focus:px-4 focus:py-2 focus:font-semibold"
      >
        {t.nav.skip}
      </a>
      <div className="px-4 sm:px-8 h-16 sm:h-20 flex items-center justify-between gap-6">
        <a href="#top" className="font-display font-semibold text-xl tracking-[-0.03em] leading-none" aria-label="hříbal.site, back to top">
          hříbal<span className="text-white/50">.site</span>
        </a>

        <nav className="hidden md:flex items-center gap-1 lg:gap-2" aria-label="Main">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} onClick={() => track(link.label, link.href, "desktop")} className="nav-link">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-3">
          <LanguageToggle source="desktop" />
          <a href="#contact" onClick={() => track(t.nav.contact, "#contact", "desktop")} className="btn btn-outline-light btn-sm">
            {t.nav.contact}
          </a>
        </div>

        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle source="mobile" />
          <button
            type="button"
            className="w-11 h-11 grid place-items-center rounded-full border border-white/60"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label={t.nav.menuAria}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <svg width="18" height="12" viewBox="0 0 18 12" aria-hidden>
              {menuOpen ? (
                <path d="M3 0l12 12M15 0L3 12" stroke="currentColor" strokeWidth="1.6" />
              ) : (
                <path d="M0 3h18M0 9h18" stroke="currentColor" strokeWidth="1.6" />
              )}
            </svg>
          </button>
        </div>
      </div>

    </header>
      {menuOpen && (
        <nav id="mobile-menu" aria-label="Main" className="md:hidden fixed inset-0 z-40 pt-24 bg-coal text-chalk px-4 flex flex-col">
          {[...navLinks, { label: t.nav.contact, href: "#contact" }].map((link) => (
            <a
              key={link.href}
              href={link.href}
              onClick={() => track(link.label, link.href, "mobile")}
              className="font-display font-bold uppercase tracking-[-0.04em] text-5xl py-3 border-b border-chalk/15"
            >
              {link.label}
            </a>
          ))}
        </nav>
      )}
    </>
  );
}
