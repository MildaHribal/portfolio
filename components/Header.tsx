"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";

const navLinks = [
  { label: "Projects", href: "#projects" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-zinc-950/80 backdrop-blur-md border-b border-zinc-800/60 shadow-[0_1px_0_0_rgba(255,255,255,0.03)]"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
        {/* Logo / Name */}
        <Link
          href="/"
          className="text-zinc-50 font-semibold tracking-tight text-sm hover:text-white transition-colors"
        >
          Miloslav Hříbal<span className="text-zinc-500">.</span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors duration-200"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            className="text-sm px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 hover:border-zinc-400 hover:text-white transition-all duration-200"
          >
            Hire me
          </Link>
        </nav>

        {/* Mobile toggle */}
        <button
          className="md:hidden text-zinc-400 hover:text-zinc-50 transition-colors"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="md:hidden bg-zinc-950/95 backdrop-blur-md border-b border-zinc-800 px-6 py-4 flex flex-col gap-4">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="text-sm text-zinc-400 hover:text-zinc-50 transition-colors"
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="#contact"
            onClick={() => setMenuOpen(false)}
            className="text-sm w-fit px-4 py-1.5 rounded-full border border-zinc-700 text-zinc-300 hover:border-zinc-400 hover:text-white transition-all"
          >
            Hire me
          </Link>
        </div>
      )}
    </header>
  );
}
