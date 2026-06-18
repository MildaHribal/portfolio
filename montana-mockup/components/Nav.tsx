'use client';

import { useEffect, useState } from 'react';
import { Logotype } from './Logotype';

const ITEMS = [
  { href: '#spreje', label: 'Spreje' },
  { href: '#fixy', label: 'Fixy' },
  { href: '#trysky', label: 'Trysky' },
  { href: '#obleceni', label: 'Oblečení' },
  { href: '#komunita', label: 'Komunita' },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-colors duration-300 ${
        scrolled
          ? 'bg-wall-deep/90 backdrop-blur-md border-b border-wall-edge'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <div className="content-grid">
        <div className="flex items-center justify-between py-4">
          <a href="#" className="block" aria-label="Montana Cans CZ - úvod">
            <Logotype />
          </a>

          <nav className="hidden lg:flex items-center gap-7 text-sm uppercase tracking-[0.16em]">
            {ITEMS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="relative py-1 text-ash hover:text-bone transition-colors after:absolute after:left-0 after:-bottom-0.5 after:h-px after:w-0 after:bg-tape after:transition-all hover:after:w-full"
              >
                {item.label}
              </a>
            ))}
          </nav>

          <div className="flex items-center gap-2">
            <button
              type="button"
              className="hidden md:inline-flex items-center gap-2 stamp hover:bg-bone/10 transition-colors"
            >
              <span className="size-1.5 rounded-full bg-tape animate-pulse" />
              Skladem
            </button>
            <button
              type="button"
              aria-label="Košík"
              className="relative size-10 inline-flex items-center justify-center border border-wall-edge hover:border-bone transition-colors"
            >
              <CartIcon />
              <span className="absolute -top-1 -right-1 size-4 rounded-full bg-marker text-bone text-[0.6rem] flex items-center justify-center font-mono">
                3
              </span>
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}

function CartIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M3 4h2.4l2.4 12h11.2l2-8H6.8"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinejoin="round"
      />
      <circle cx="9" cy="20" r="1.4" fill="currentColor" />
      <circle cx="18" cy="20" r="1.4" fill="currentColor" />
    </svg>
  );
}
