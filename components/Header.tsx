"use client";

import { useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";
import LanguageToggle from "@/components/LanguageToggle";

export default function Header() {
  const t = useT();
  const [menuOpen, setMenuOpen] = useState(false);

  const navLinks = [
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.experience, href: "#experience" },
    { label: t.nav.about, href: "#about" },
  ];

  const handleScroll = (
    e: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    label: string,
    menuType: string
  ) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      setMenuOpen(false);

      const element = document.querySelector(href);
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", href);
      }

      getPostHog().capture("nav_link_clicked", {
        label: label,
        href: href,
        menu: menuType,
      });
    }
  };

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-zinc-950/90 backdrop-blur-md border-b border-zinc-800/60 shadow-[0_1px_0_0_rgba(255,255,255,0.03)] transition-all duration-500">
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          className="group inline-flex items-center gap-2 text-zinc-400 font-semibold tracking-tight text-base hover:text-zinc-200 transition-colors duration-200"
        >
          <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0 transition-transform duration-200 group-hover:scale-150" />
          hribal.site
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) =>
                handleScroll(e, link.href, link.label, "desktop")
              }
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <LanguageToggle source="desktop" />
          <Link
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact", t.nav.contact, "desktop")}
            className="text-sm px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 hover:border-zinc-400 hover:text-white transition-all duration-200"
          >
            {t.nav.contact}
          </Link>
        </nav>

        {/* Mobile right cluster */}
        <div className="md:hidden flex items-center gap-3">
          <LanguageToggle source="mobile" />
          <button
            className="text-zinc-400 hover:text-zinc-50 transition-colors"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={t.nav.menuAria}
          >
            {menuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={(e) => handleScroll(e, link.href, link.label, "mobile")}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={(e) => handleScroll(e, "#contact", t.nav.contact, "mobile")}
            className="text-sm w-fit px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 hover:border-zinc-400 hover:text-white transition-all"
          >
            {t.nav.contact}
          </Link>
        </div>
      )}
    </header>
  );
}
