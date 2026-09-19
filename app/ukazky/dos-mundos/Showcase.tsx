"use client";

import Image from "next/image";
import Link from "next/link";
import { useCallback, useEffect, useRef, useState } from "react";

const P = "/showcase/dos-mundos/photos";
const TEL = "tel:+420736454762";

/* Reveal sections on scroll (fade-up). Safe even without IntersectionObserver. */
function useReveal() {
  useEffect(() => {
    const els = Array.from(document.querySelectorAll<HTMLElement>("[data-reveal]"));
    if (!("IntersectionObserver" in window)) {
      els.forEach((e) => e.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("in");
            io.unobserve(en.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);
}

/* ------------------------------------------------------------------ *
 *  Before / After slider — both photos match the frame width exactly
 *  (clip-path), so they never drift apart while dragging.
 * ------------------------------------------------------------------ */
function BeforeAfter() {
  const [pos, setPos] = useState(52);
  const wrap = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const move = useCallback((clientX: number) => {
    const el = wrap.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    setPos(Math.max(0, Math.min(100, ((clientX - rect.left) / rect.width) * 100)));
  }, []);

  return (
    <div className="ba">
      <div
        ref={wrap}
        className="ba-frame"
        onPointerDown={(e) => {
          dragging.current = true;
          (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
          move(e.clientX);
        }}
        onPointerMove={(e) => dragging.current && move(e.clientX)}
        onPointerUp={() => (dragging.current = false)}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className="ba-img" src="/showcase/dos-mundos/po.png" alt="New Dos Mundos café website" draggable={false} />
        <span className="ba-tag ba-tag--after">AFTER</span>
        <div className="ba-before" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img className="ba-img" src="/showcase/dos-mundos/pred.png" alt="Original Dos Mundos café website" draggable={false} />
          <span className="ba-tag ba-tag--before">BEFORE</span>
        </div>
        <div className="ba-handle" style={{ left: `${pos}%` }} aria-hidden>
          <span className="ba-knob">
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" strokeLinejoin="round">
              <path d="M15 18l-6-6 6-6" /><path d="M9 6l6 6-6 6" />
            </svg>
          </span>
        </div>
      </div>
      <label className="ba-range">
        <span className="sr-only">Drag to compare the old and new website</span>
        <input type="range" min={0} max={100} value={Math.round(pos)} onChange={(e) => setPos(Number(e.target.value))} />
      </label>
      <p className="ba-hint">Drag the slider — the real original website is on the left, the new design on the right.</p>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Café website
 * ------------------------------------------------------------------ */
const NAV = [
  ["#menu", "Menu"],
  ["#story", "Story"],
  ["#gallery", "Gallery"],
  ["#visit", "Visit"],
] as const;

const TRIO = [
  { n: "01", img: `${P}/latte.jpg`, k: "Specialty Coffee", d: "From our own roastery, seasonal single origin." },
  { n: "02", img: `${P}/benedict.jpg`, k: "All-Day Brunch", d: "Eggs, sourdough bread, house-made pastries." },
  { n: "03", img: `${P}/interior.jpg`, k: "Evening Wine", d: "Natural wines and boards from local farmers." },
];

const MENU: { key: string; title: string; note: string; night?: boolean; items: [string, string, string][] }[] = [
  {
    key: "coffee",
    title: "Coffee",
    note: "from our own roastery",
    items: [
      ["Espresso", "seasonal single origin, freshly roasted daily", "65"],
      ["Flat white", "silky microfoam, double ristretto", "89"],
      ["V60 pour-over", "hand-brewed, rotating bean selection", "95"],
      ["Cold brew", "24-hour cold-steeped", "89"],
    ],
  },
  {
    key: "brunch",
    title: "Brunch",
    note: "all day",
    items: [
      ["Eggs Benedict", "poached eggs, hollandaise sauce, house-made bun", "219"],
      ["Avocado toast", "sourdough bread, poached eggs, dukkah", "195"],
      ["Shakshuka", "tomatoes, feta, coriander, bread", "205"],
      ["Banana bread", "peanut butter, caramelised nuts", "145"],
    ],
  },
  {
    key: "wine",
    title: "Wine & Evening",
    note: "from 5 pm",
    night: true,
    items: [
      ["Natural wine", "seasonal selection by the glass", "120"],
      ["Cheese board", "cheeses and charcuterie from local farmers", "245"],
      ["Vermouth & tonic", "house-made herbal vermouth", "135"],
      ["Dessert of the day", "at the pastry chef's whim", "115"],
    ],
  },
];

function Cafe() {
  const [menuOpen, setMenuOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  // Mobile menu accessibility: Esc closes, scroll lock, focus on close button.
  useEffect(() => {
    if (!menuOpen) return;
    closeRef.current?.focus();
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setMenuOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [menuOpen]);

  return (
    <div className="dm-site" id="showcase">
      {/* HERO */}
      <section className="dm-hero">
        <div className="dm-hero-media">
          <Image src={`${P}/hero.jpg`} alt="Barista pouring latte art" fill priority sizes="100vw" className="dm-hero-img" />
          <div className="dm-hero-scrim" />
        </div>

        <nav className="dm-nav" aria-label="Main navigation">
          <a className="dm-brand" href="#showcase">
            dos&nbsp;mundos
            <span>coffee · brunch · wine</span>
          </a>
          <div className="dm-links">
            {NAV.map(([href, label]) => (
              <a key={href} href={href}>{label}</a>
            ))}
          </div>
          <a className="dm-btn dm-btn--sm dm-btn--light dm-nav-cta" href={TEL}>Reserve</a>
          <button className="dm-burger" aria-label="Open menu" aria-expanded={menuOpen} onClick={() => setMenuOpen(true)}>
            <span /><span /><span />
          </button>
        </nav>

        <div className="dm-hero-inner">
          <span className="dm-eyebrow dm-eyebrow--light dm-anim" style={{ animationDelay: "0ms" }}>Coffee by day · wine by night · Vinohrady</span>
          <h2 className="dm-hero-h1">
            <span className="dm-anim" style={{ animationDelay: "120ms" }}>Two worlds,</span>
            <span className="dm-anim dm-hero-em" style={{ animationDelay: "440ms" }}>one cup.</span>
          </h2>
          <p className="dm-hero-lead dm-anim" style={{ animationDelay: "700ms" }}>
            Specialty coffee from&nbsp;our own roastery, all-day brunch and&nbsp;natural wines in&nbsp;the evening —
            just steps from&nbsp;náměstí Míru in&nbsp;Vinohrady, Prague.
          </p>
          <div className="dm-hero-cta dm-anim" style={{ animationDelay: "860ms" }}>
            <a className="dm-btn dm-btn--light" href="#menu">Browse the menu</a>
            <a className="dm-btn dm-btn--outline" href="#visit">How to find us</a>
          </div>
        </div>

        <div className="dm-hero-bar">
          <span>Mon–Fri&nbsp;8–22 · Sat–Sun&nbsp;9–22</span>
          <span>4.7&nbsp;★ &nbsp;over 600&nbsp;reviews</span>
          <span>Sázavská&nbsp;24</span>
        </div>

        <a className="dm-scrollcue" href="#menu" tabIndex={-1} aria-hidden><span /></a>
      </section>

      {/* MOBILE MENU */}
      {menuOpen && (
        <div className="dm-mobile-menu" role="dialog" aria-modal="true" aria-label="Menu">
          <button ref={closeRef} className="dm-mm-close" aria-label="Close menu" onClick={() => setMenuOpen(false)}>×</button>
          <div className="dm-mm-links">
            {NAV.map(([href, label]) => (
              <a key={href} href={href} onClick={() => setMenuOpen(false)}>{label}</a>
            ))}
            <a href={TEL} className="dm-mm-cta" onClick={() => setMenuOpen(false)}>Reserve a table</a>
          </div>
        </div>
      )}

      {/* MARQUEE */}
      <div className="dm-marquee" aria-hidden>
        <div className="dm-marquee-track">
          {Array.from({ length: 2 }).map((_, i) => (
            <span key={i}>
              own roastery <b>·</b> seasonal single origin <b>·</b> all-day brunch{" "}
              <b>·</b> natural wines <b>·</b> house-made pastries <b>·</b> coffee to go <b>·</b>{" "}
            </span>
          ))}
        </div>
      </div>

      {/* TRIO */}
      <section className="dm-trio">
        {TRIO.map((t, i) => (
          <article className={`dm-trio-card dm-trio-card--${i}`} key={t.k} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
            <div className="dm-trio-media">
              <Image src={t.img} alt={t.k} fill sizes="(max-width:820px) 100vw, 33vw" className="dm-cover" />
              <span className="dm-trio-n">{t.n}</span>
            </div>
            <h3>{t.k}</h3>
            <p>{t.d}</p>
          </article>
        ))}
      </section>

      {/* MENU */}
      <section className="dm-section" id="menu">
        <div className="dm-section-head" data-reveal>
          <span className="dm-eyebrow">Menu</span>
          <h2 className="dm-h2">What you&apos;ll&nbsp;taste</h2>
          <span className="dm-rule" />
        </div>
        <div className="dm-menu">
          {MENU.map((col, i) => (
            <div className="dm-menu-col" data-world={col.night ? "night" : "day"} key={col.title} data-reveal style={{ transitionDelay: `${i * 90}ms` }}>
              <div className="dm-menu-col-head">
                <h3>{col.title}</h3>
                <span>{col.note}</span>
              </div>
              <ul>
                {col.items.map(([name, desc, price]) => (
                  <li key={name}>
                    <div className="dm-menu-row">
                      <span className="dm-menu-name">{name}</span>
                      <span className="dm-menu-leader" />
                      <span className="dm-menu-price">{price}&nbsp;CZK</span>
                    </div>
                    <p className="dm-menu-desc">{desc}</p>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="dm-story" id="story">
        <div className="dm-story-media" data-reveal>
          <Image src={`${P}/roastery.jpg`} alt="Coffee roastery" fill sizes="(max-width:900px) 100vw, 52vw" className="dm-cover" />
          <div className="dm-story-badge"><strong>11</strong><span>years in Vinohrady</span></div>
        </div>
        <div className="dm-story-copy" data-reveal>
          <span className="dm-eyebrow">Our Story</span>
          <h2 className="dm-h2">Eleven years<br />and&nbsp;a new chapter</h2>
          <p>
            We started as a small café on&nbsp;Korunní&nbsp;31. After eleven years we moved
            to&nbsp;a larger space on&nbsp;Sázavská&nbsp;24 — with&nbsp;the same obsession for great
            coffee and&nbsp;a slightly bigger table for&nbsp;everyone who likes to&nbsp;linger.
          </p>
          <p>
            We source our beans directly from&nbsp;farmers and&nbsp;roast them ourselves. The flavour of&nbsp;one world,
            served in&nbsp;the other — in&nbsp;Vinohrady, every morning anew.
          </p>
          <div className="dm-story-stats">
            <div><strong>in-house</strong><span>coffee roastery</span></div>
            <div><strong>4.7&nbsp;★</strong><span>from 600+ guests</span></div>
            <div><strong>daily</strong><span>fresh pastries</span></div>
          </div>
        </div>
      </section>

      {/* SPLIT DAY / NIGHT — "two worlds" concept */}
      <div className="dm-split" aria-hidden>
        <div className="dm-split-day"><span className="dm-split-k">morning</span><span className="dm-split-t">belongs to coffee</span></div>
        <div className="dm-split-seam" />
        <div className="dm-split-night"><span className="dm-split-k">evening</span><span className="dm-split-t">belongs to wine</span></div>
      </div>

      {/* GALLERY / NIGHT */}
      <section className="dm-gallery" id="gallery">
        <div className="dm-gallery-grid">
          <figure className="dm-g dm-g--tall" data-reveal>
            <Image src={`${P}/interior.jpg`} alt="Café interior" fill sizes="(max-width:820px) 100vw, 50vw" className="dm-cover" />
          </figure>
          <blockquote className="dm-g dm-g--quote" data-reveal>
            <p>&ldquo;We bring coffee from&nbsp;one world.<br /><em>We serve it in&nbsp;the other.</em>&rdquo;</p>
          </blockquote>
          <figure className="dm-g" data-reveal><Image src={`${P}/avocado.jpg`} alt="Avocado toast" fill sizes="(max-width:820px) 50vw, 25vw" className="dm-cover" /></figure>
          <figure className="dm-g" data-reveal><Image src={`${P}/benedict.jpg`} alt="Eggs Benedict" fill sizes="(max-width:820px) 50vw, 25vw" className="dm-cover" /></figure>
          <figure className="dm-g" data-reveal><Image src={`${P}/latte.jpg`} alt="Cup of coffee" fill sizes="(max-width:820px) 50vw, 25vw" className="dm-cover" /></figure>
          <figure className="dm-g" data-reveal><Image src={`${P}/beans.jpg`} alt="Coffee beans" fill sizes="(max-width:820px) 50vw, 25vw" className="dm-cover" /></figure>
        </div>
      </section>

      {/* VISIT / NIGHT */}
      <section className="dm-visit" id="visit">
        <div className="dm-visit-media" data-reveal>
          <Image src={`${P}/latte.jpg`} alt="Cup of coffee" fill sizes="(max-width:900px) 100vw, 42vw" className="dm-cover" />
        </div>
        <div className="dm-visit-info" data-reveal>
          <span className="dm-eyebrow dm-eyebrow--wine">Visit</span>
          <h2 className="dm-h2">Drop by</h2>
          <table className="dm-hours">
            <tbody>
              <tr><th>Monday–Friday</th><td>8:00–22:00</td></tr>
              <tr><th>Saturday–Sunday</th><td>9:00–22:00</td></tr>
            </tbody>
          </table>
          <div className="dm-contact">
            <p><span>Address</span>Sázavská 24, Prague 2 – Vinohrady</p>
            <p><span>Phone</span><a href={TEL}>736 454 762</a></p>
            <p><span>E-mail</span><a href="mailto:ahoj@dosmundos.cz">ahoj@dosmundos.cz</a></p>
          </div>
          <a className="dm-btn dm-btn--wine" href={TEL}>Reserve a table</a>
        </div>
      </section>

      {/* CTA / NIGHT */}
      <section className="dm-cta-band">
        <h2 data-reveal>Come for&nbsp;a coffee.</h2>
        <p data-reveal>The first cup is always the best excuse to&nbsp;take a moment for&nbsp;yourself.</p>
        <a className="dm-btn dm-btn--light" href={TEL} data-reveal>Reserve a table</a>
      </section>

      {/* FOOTER */}
      <footer className="dm-footer">
        <div className="dm-brand dm-brand--footer">
          dos&nbsp;mundos
          <span>coffee · brunch · wine · Vinohrady</span>
        </div>
        <div className="dm-foot-links">
          {NAV.map(([href, label]) => (<a key={href} href={href}>{label}</a>))}
        </div>
        <p className="dm-foot-note">© 2026 Dos Mundos · Sázavská 24, Prague 2</p>
      </footer>
    </div>
  );
}

/* ------------------------------------------------------------------ *
 *  Case study wrapper
 * ------------------------------------------------------------------ */
export default function Showcase() {
  useReveal();
  return (
    <div className="cs-root">
      <style>{CSS}</style>

      <div className="cs-topbar">
        <Link href="/#projects" className="cs-back">← Back to portfolio</Link>
        <span className="cs-topbar-tag">Redesign · showcase work</span>
      </div>

      <header className="cs-head">
        <span className="cs-eyebrow">Showcase redesign</span>
        <h1 className="cs-title">Café Dos&nbsp;Mundos</h1>
        <p className="cs-intro">
          Dos&nbsp;Mundos is a real Prague café in&nbsp;Vinohrady. Their current website
          is slow and&nbsp;cluttered — Google&apos;s speed test gives it&nbsp;<strong>22&nbsp;out&nbsp;of&nbsp;100</strong> and&nbsp;the main
          content appears on&nbsp;mobile after&nbsp;<strong>12.5&nbsp;seconds</strong>. I tried to imagine what this
          café&apos;s website could look like: fast, clean, and&nbsp;appetising.
        </p>
        <p className="cs-note">
          Unofficial concept — this is not the official Dos&nbsp;Mundos website, just a showcase of my work. Photos: Unsplash.
        </p>
      </header>

      <BeforeAfter />

      <div className="cs-stats">
        <div className="cs-stat"><span className="cs-stat-label">PageSpeed (mobile)</span><span className="cs-stat-val"><b className="bad">22</b> → <b className="good">98</b><i>/100</i></span></div>
        <div className="cs-stat"><span className="cs-stat-label">Content load</span><span className="cs-stat-val"><b className="bad">12.5&nbsp;s</b> → <b className="good">~0.9&nbsp;s</b></span></div>
        <div className="cs-stat"><span className="cs-stat-label">Page weight</span><span className="cs-stat-val"><b className="bad">3.4&nbsp;MB</b> → <b className="good">~0.4&nbsp;MB</b></span></div>
        <div className="cs-stat"><span className="cs-stat-label">Design</span><span className="cs-stat-val"><b className="bad">cluttered</b> → <b className="good">clean</b></span></div>
      </div>
      <p className="cs-stats-note">The &ldquo;before&rdquo; numbers come from&nbsp;a real website audit; &ldquo;after&rdquo; is the target of the static rebuild.</p>

      <div className="cs-changes">
        <h2>What I changed</h2>
        <ul>
          <li><b>Speed.</b> A lightweight static page instead of a heavy template — loads almost instantly even on mobile data.</li>
          <li><b>Concept.</b> &ldquo;Two worlds&rdquo; — coffee by day, wine by night — runs through the entire site (light and dark halves).</li>
          <li><b>Design.</b> Large photography, unified typography and&nbsp;colours — a warm, trustworthy feel.</li>
          <li><b>Conversion.</b> Reservations and&nbsp;opening hours are visible immediately, not&nbsp;hidden behind three clicks.</li>
          <li><b>Mobile.</b> Designed mobile-first — smooth animations, nothing overflows, buttons are easy to&nbsp;tap.</li>
        </ul>
      </div>

      <div className="cs-divider"><span>↓ Live preview of the new website</span></div>

      <Cafe />

      <div className="cs-outro">
        <h2>Like what you see?</h2>
        <p>I&apos;d love to&nbsp;rebuild your website the same way — whether it&apos;s a café, a shop, or a service.</p>
        <div className="cs-outro-cta">
          <Link className="cs-btn" href="/#contact">Get in touch</Link>
          <Link className="cs-btn cs-btn--ghost" href="/#projects">More projects</Link>
        </div>
      </div>
    </div>
  );
}

/* ================================================================== */
const CSS = `
.cs-root{
  --paper:#f3ebdd; --paper-2:#e9dcc6; --ink:#221812; --ink-2:#3a2a1f; --ink-soft:#6a5747;
  --clay:#bf5a33; --clay-dark:#a1451f; --crema:#d8a15a;
  --wine:#7c3141; --wine-dark:#5f2331; --night:#1b120e; --candle:#e0a94e;
  --line:rgba(34,24,18,.14);
  font-family:var(--font-body),system-ui,sans-serif;
  background:#17110d; color:#f3ebdd; line-height:1.6; -webkit-font-smoothing:antialiased;
}
.cs-root .sr-only{position:absolute;width:1px;height:1px;padding:0;margin:-1px;overflow:hidden;clip:rect(0,0,0,0);border:0;}
.cs-root a{color:inherit;text-decoration:none;}
.cs-root h1,.cs-root h2,.cs-root h3{font-family:var(--font-display),Georgia,serif;font-weight:600;line-height:1.05;}
.cs-root a:focus-visible,.cs-root button:focus-visible,.cs-root input:focus-visible{outline:2px solid var(--crema);outline-offset:3px;border-radius:4px;}

/* reveal */
.cs-root [data-reveal]{opacity:0;transform:translateY(22px);transition:opacity .7s cubic-bezier(.2,.8,.2,1),transform .7s cubic-bezier(.2,.8,.2,1);}
.cs-root [data-reveal].in{opacity:1;transform:none;}

/* ---- case study chrome ---- */
.cs-topbar{display:flex;justify-content:space-between;align-items:center;padding:16px clamp(20px,5vw,64px);border-bottom:1px solid rgba(243,235,221,.1);background:#17110d;font-size:14px;}
.cs-back{color:#e0d3c1;transition:color .2s;}.cs-back:hover{color:#fff;}
.cs-topbar-tag{color:#a89075;font-size:12px;letter-spacing:.08em;text-transform:uppercase;}
.cs-head{max-width:760px;margin:0 auto;padding:clamp(40px,7vw,88px) clamp(20px,5vw,32px) 32px;text-align:center;}
.cs-eyebrow{display:inline-block;color:var(--crema);font-size:12px;letter-spacing:.22em;text-transform:uppercase;margin-bottom:18px;font-family:var(--font-display),serif;}
.cs-title{font-size:clamp(38px,7vw,68px);color:#f7efe4;margin-bottom:22px;}
.cs-intro{color:#d3c4b0;font-size:clamp(16px,2.1vw,19px);}.cs-intro strong{color:#f3ebdd;font-weight:600;}
.cs-note{margin-top:18px;font-size:13px;color:#a89075;font-style:italic;}

/* before/after */
.ba{max-width:1120px;margin:0 auto;padding:0 clamp(16px,4vw,32px);}
.ba-frame{position:relative;aspect-ratio:1440/900;border-radius:14px;overflow:hidden;border:1px solid rgba(243,235,221,.14);box-shadow:0 30px 80px -30px rgba(0,0,0,.7);cursor:ew-resize;touch-action:none;user-select:none;background:#0d0a08;}
.ba-img{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;object-position:top left;pointer-events:none;display:block;}
.ba-before{position:absolute;inset:0;}
.ba-tag{position:absolute;top:14px;font-size:11px;font-weight:700;letter-spacing:.12em;padding:5px 11px;border-radius:20px;color:#fff;z-index:2;}
.ba-tag--before{left:14px;background:rgba(191,90,51,.94);}
.ba-tag--after{right:14px;background:rgba(124,49,65,.94);}
.ba-handle{position:absolute;top:0;bottom:0;width:2px;background:rgba(243,235,221,.95);transform:translateX(-1px);pointer-events:none;z-index:3;}
.ba-knob{position:absolute;top:50%;left:50%;transform:translate(-50%,-50%);width:44px;height:44px;border-radius:50%;background:#f3ebdd;color:#221812;display:flex;align-items:center;justify-content:center;box-shadow:0 4px 16px rgba(0,0,0,.5);transition:transform .15s;}
.ba-frame:active .ba-knob{transform:translate(-50%,-50%) scale(1.08);}
.ba-range{display:block;max-width:1120px;margin:14px auto 0;}
.ba-range input{width:100%;accent-color:var(--clay);cursor:pointer;}
.ba-hint{text-align:center;color:#a89075;font-size:13px;margin-top:10px;}

/* stats + changes */
.cs-stats{max-width:1000px;margin:56px auto 0;padding:0 clamp(16px,4vw,32px);display:grid;grid-template-columns:repeat(4,1fr);gap:14px;}
@media(max-width:720px){.cs-stats{grid-template-columns:repeat(2,1fr);}}
.cs-stat{background:rgba(243,235,221,.05);border:1px solid rgba(243,235,221,.1);border-radius:12px;padding:16px 18px;transition:border-color .2s,background .2s;}
.cs-stat:hover{border-color:rgba(216,161,90,.4);background:rgba(243,235,221,.07);}
.cs-stat-label{display:block;font-size:12px;color:#a89075;letter-spacing:.05em;margin-bottom:8px;}
.cs-stat-val{font-family:var(--font-display),serif;font-size:clamp(18px,2.4vw,23px);}
.cs-stat-val b{font-weight:600;}.cs-stat-val i{color:#a89075;font-style:normal;font-size:14px;}
.cs-stat-val .bad{color:#e07a52;}.cs-stat-val .good{color:#a6ba81;}
.cs-stats-note{text-align:center;color:#a89075;font-size:12px;margin-top:16px;padding:0 20px;}
.cs-changes{max-width:760px;margin:56px auto 0;padding:0 clamp(20px,5vw,32px);}
.cs-changes h2{font-size:clamp(24px,3.4vw,30px);color:#f7efe4;margin-bottom:20px;text-align:center;}
.cs-changes ul{display:grid;gap:12px;}
.cs-changes li{background:rgba(243,235,221,.04);border:1px solid rgba(243,235,221,.09);border-left:3px solid var(--clay);border-radius:0 10px 10px 0;padding:14px 18px;color:#d3c4b0;font-size:15px;transition:background .2s,border-color .2s;}
.cs-changes li:hover{background:rgba(243,235,221,.07);}
.cs-changes li b{color:#f3ebdd;}
.cs-divider{margin:64px 0 0;text-align:center;}
.cs-divider span{display:inline-block;color:var(--crema);font-size:13px;letter-spacing:.14em;text-transform:uppercase;padding:10px 20px;border:1px solid rgba(216,161,90,.3);border-radius:30px;}

/* outro */
.cs-outro{text-align:center;padding:80px clamp(20px,5vw,32px);background:#17110d;}
.cs-outro h2{font-size:clamp(28px,4vw,40px);color:#f7efe4;margin-bottom:14px;}
.cs-outro p{color:#d3c4b0;margin-bottom:28px;}
.cs-outro-cta{display:flex;gap:12px;justify-content:center;flex-wrap:wrap;}
.cs-root .cs-btn{background:var(--clay);color:#fff;padding:13px 26px;border-radius:30px;font-weight:600;transition:transform .2s,background .2s,box-shadow .2s;box-shadow:0 8px 20px -8px rgba(191,90,51,.6);}
.cs-root .cs-btn:hover{background:var(--clay-dark);transform:translateY(-2px);box-shadow:0 12px 26px -8px rgba(191,90,51,.7);}
.cs-root .cs-btn--ghost{background:transparent;border:1px solid rgba(243,235,221,.25);color:#ecdfce;box-shadow:none;}
.cs-root .cs-btn--ghost:hover{background:rgba(243,235,221,.06);}

/* ================= café website ================= */
.dm-site{background:var(--paper);color:var(--ink);position:relative;}
.dm-site .dm-cover{object-fit:cover;}

/* buttons */
.dm-site .dm-btn{display:inline-block;background:var(--ink);color:var(--paper);padding:14px 28px;border-radius:40px;font-weight:600;white-space:nowrap;transition:transform .2s,background .2s,box-shadow .2s,color .2s;box-shadow:0 10px 24px -12px rgba(34,24,18,.6);}
.dm-site .dm-btn:hover{transform:translateY(-2px);background:#3d2b20;box-shadow:0 16px 30px -12px rgba(34,24,18,.7);}
.dm-site .dm-btn--sm{padding:10px 20px;font-size:14px;}
.dm-site .dm-btn--light{background:var(--paper);color:var(--ink);box-shadow:0 10px 24px -12px rgba(0,0,0,.5);}
.dm-site .dm-btn--light:hover{background:#fff;}
.dm-site .dm-btn--outline{background:transparent;color:var(--paper);border:1px solid rgba(243,235,221,.55);box-shadow:none;}
.dm-site .dm-btn--outline:hover{background:rgba(243,235,221,.14);}
.dm-site .dm-btn--wine{background:var(--wine);color:#fff;box-shadow:0 10px 24px -12px rgba(124,49,65,.7);}
.dm-site .dm-btn--wine:hover{background:var(--wine-dark);}

.dm-eyebrow{display:inline-block;color:var(--clay);font-size:12px;letter-spacing:.22em;text-transform:uppercase;margin-bottom:16px;font-family:var(--font-display),serif;font-weight:600;}
.dm-eyebrow--light{color:var(--crema);}
.dm-eyebrow--wine{color:var(--candle);}
.dm-h2{font-family:var(--font-display),serif;font-size:clamp(30px,4.6vw,52px);line-height:1.02;}
.dm-rule{display:block;width:56px;height:2px;background:var(--crema);margin:22px auto 0;}

/* HERO */
.dm-hero{position:relative;min-height:clamp(580px,94vh,900px);display:flex;flex-direction:column;justify-content:flex-end;overflow:hidden;color:var(--paper);}
.dm-hero-media{position:absolute;inset:0;z-index:0;}
.dm-hero-img{object-fit:cover;animation:dm-kenburns 20s ease-out both;}
@keyframes dm-kenburns{from{transform:scale(1.1);}to{transform:scale(1);}}
.dm-hero-scrim{position:absolute;inset:0;background:linear-gradient(90deg,rgba(23,17,13,.82) 0%,rgba(23,17,13,.45) 42%,rgba(23,17,13,0) 72%),linear-gradient(0deg,rgba(23,17,13,.85) 0%,rgba(23,17,13,0) 40%);}
.dm-nav{position:absolute;top:0;left:0;right:0;z-index:3;display:flex;align-items:center;justify-content:space-between;gap:20px;padding:22px clamp(20px,5vw,64px);}
.dm-brand{font-family:var(--font-display),serif;font-weight:600;font-size:21px;letter-spacing:.02em;display:flex;flex-direction:column;line-height:1.1;color:var(--paper);}
.dm-brand span{font-family:var(--font-body),sans-serif;font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:rgba(243,235,221,.78);font-weight:500;margin-top:3px;}
.dm-links{display:flex;gap:30px;font-size:15px;font-weight:500;margin-left:auto;margin-right:8px;}
.dm-links a{position:relative;opacity:.92;transition:opacity .2s;padding:4px 0;}
.dm-links a::after{content:"";position:absolute;left:0;right:0;bottom:0;height:1.5px;background:var(--crema);transform:scaleX(0);transform-origin:left;transition:transform .25s;}
.dm-links a:hover{opacity:1;}.dm-links a:hover::after{transform:scaleX(1);}
.dm-burger{display:none;flex-direction:column;gap:5px;background:none;border:0;cursor:pointer;padding:11px;margin:-11px;}
.dm-burger span{width:26px;height:2px;background:var(--paper);border-radius:2px;}
@media(max-width:820px){.dm-links,.dm-nav-cta{display:none;}.dm-burger{display:flex;}}
.dm-hero-inner{position:relative;z-index:2;padding:0 clamp(20px,5vw,64px);max-width:940px;margin-bottom:38px;}
.dm-hero-h1{font-family:var(--font-display),serif;font-size:clamp(48px,9vw,112px);line-height:.95;letter-spacing:-.01em;text-shadow:0 2px 30px rgba(0,0,0,.35);}
.dm-hero-h1 span{display:block;}
.dm-hero-em{font-style:italic;color:var(--crema);}
.dm-hero-lead{font-size:clamp(16px,2vw,20px);max-width:42ch;margin:24px 0 30px;color:rgba(243,235,221,.94);}
.dm-hero-cta{display:flex;gap:12px;flex-wrap:wrap;}
.dm-anim{opacity:0;animation:dm-rise .8s cubic-bezier(.2,.8,.2,1) both;}
@keyframes dm-rise{from{opacity:0;transform:translateY(26px);}to{opacity:1;transform:none;}}
.dm-hero-bar{position:relative;z-index:2;display:flex;align-items:center;flex-wrap:wrap;gap:8px 18px;padding:18px clamp(20px,5vw,64px);border-top:1px solid rgba(243,235,221,.18);font-size:13.5px;color:rgba(243,235,221,.88);letter-spacing:.02em;}
.dm-hero-bar span{position:relative;}
.dm-hero-bar span:not(:first-child)::before{content:"·";color:var(--crema);margin-right:18px;}
.dm-scrollcue{position:absolute;bottom:clamp(92px,13vh,124px);left:50%;transform:translateX(-50%);z-index:2;width:24px;height:38px;border:2px solid rgba(243,235,221,.45);border-radius:14px;display:flex;justify-content:center;}
.dm-scrollcue span{width:3px;height:7px;background:var(--paper);border-radius:3px;margin-top:7px;animation:dm-scroll 1.6s ease-in-out infinite;}
@keyframes dm-scroll{0%{opacity:0;transform:translateY(-4px);}40%{opacity:1;}100%{opacity:0;transform:translateY(10px);}}
@media(max-width:820px){.dm-scrollcue{display:none;}}

/* mobile menu */
.dm-mobile-menu{position:fixed;inset:0;z-index:60;background:rgba(23,17,13,.98);display:flex;align-items:center;justify-content:center;}
.dm-mm-close{position:absolute;top:16px;right:20px;background:none;border:0;color:var(--paper);font-size:42px;line-height:1;cursor:pointer;width:48px;height:48px;}
.dm-mm-links{display:flex;flex-direction:column;gap:8px;text-align:center;}
.dm-mm-links a{font-family:var(--font-display),serif;font-size:30px;color:var(--paper);padding:12px 24px;min-height:48px;}
.dm-mm-cta{margin-top:16px;background:var(--wine);border-radius:40px;font-family:var(--font-body),sans-serif !important;font-size:16px !important;color:#fff !important;}

/* marquee */
.dm-marquee{background:var(--ink);color:var(--paper);overflow:hidden;padding:16px 0;white-space:nowrap;}
.dm-marquee-track{display:inline-flex;animation:dm-marq 30s linear infinite;font-family:var(--font-display),serif;font-size:clamp(18px,2.6vw,27px);font-style:italic;}
.dm-marquee b{color:var(--crema);padding:0 6px;}
@keyframes dm-marq{from{transform:translateX(0);}to{transform:translateX(-50%);}}

/* trio */
.dm-trio{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(16px,2.4vw,30px);padding:clamp(56px,8vw,112px) clamp(20px,5vw,64px);max-width:1240px;margin:0 auto;align-items:start;}
@media(max-width:820px){.dm-trio{grid-template-columns:1fr;max-width:460px;gap:36px;}}
.dm-trio-card h3{font-size:23px;margin:18px 0 6px;}
.dm-trio-card p{color:var(--ink-soft);font-size:15px;}
.dm-trio-card--1{transform:translateY(38px);}
@media(max-width:820px){.dm-trio-card--1{transform:none;}}
.dm-trio-media{position:relative;aspect-ratio:4/5;border-radius:16px;overflow:hidden;background:var(--paper-2);box-shadow:0 18px 40px -22px rgba(34,24,18,.55);transition:transform .4s cubic-bezier(.2,.8,.2,1),box-shadow .4s;}
.dm-trio-media .dm-cover{transition:transform .6s cubic-bezier(.2,.8,.2,1);}
.dm-trio-card:hover .dm-trio-media{transform:translateY(-4px);box-shadow:0 26px 50px -22px rgba(34,24,18,.6);}
.dm-trio-card:hover .dm-cover{transform:scale(1.05);}
.dm-trio-n{position:absolute;top:14px;left:16px;font-family:var(--font-display),serif;font-size:14px;color:#fff;letter-spacing:.1em;text-shadow:0 1px 8px rgba(0,0,0,.5);}

/* sections */
.dm-section{padding:clamp(56px,8vw,112px) clamp(20px,5vw,64px);}
.dm-section-head{text-align:center;margin-bottom:56px;}

/* menu */
.dm-menu{display:grid;grid-template-columns:repeat(3,1fr);gap:clamp(28px,4vw,56px);max-width:1120px;margin:0 auto;}
@media(max-width:820px){.dm-menu{grid-template-columns:1fr;gap:44px;}}
.dm-menu-col-head{display:flex;align-items:baseline;justify-content:space-between;border-bottom:2px solid var(--ink);padding-bottom:10px;margin-bottom:24px;}
.dm-menu-col-head h3{font-size:27px;}
.dm-menu-col-head span{font-size:12px;color:var(--clay);text-transform:uppercase;letter-spacing:.1em;font-weight:600;}
.dm-menu-col[data-world="night"] .dm-menu-col-head{border-color:var(--wine);}
.dm-menu-col[data-world="night"] .dm-menu-col-head h3{color:var(--wine);}
.dm-menu-col[data-world="night"] .dm-menu-col-head span{color:var(--wine);}
.dm-menu-col[data-world="night"] .dm-menu-price{color:var(--wine);}
.dm-menu-col ul{display:grid;gap:22px;}
.dm-menu-row{display:flex;align-items:baseline;gap:8px;}
.dm-menu-name{font-weight:600;font-size:16px;}
.dm-menu-leader{flex:1;border-bottom:1px dotted var(--line);transform:translateY(-3px);}
.dm-menu-price{font-family:var(--font-display),serif;font-weight:600;white-space:nowrap;}
.dm-menu-desc{font-size:14px;color:var(--ink-soft);margin-top:3px;}

/* story */
.dm-story{display:grid;grid-template-columns:1fr 1fr;gap:clamp(28px,5vw,72px);align-items:center;padding:clamp(20px,4vw,40px) clamp(20px,5vw,64px) clamp(56px,8vw,112px);max-width:1300px;margin:0 auto;}
@media(max-width:900px){.dm-story{grid-template-columns:1fr;}}
.dm-story-media{position:relative;aspect-ratio:5/6;border-radius:20px;overflow:hidden;background:var(--paper-2);box-shadow:0 24px 60px -30px rgba(34,24,18,.6);}
.dm-story-badge{position:absolute;left:18px;bottom:18px;background:var(--paper);border-radius:14px;padding:14px 20px;display:flex;flex-direction:column;box-shadow:0 12px 30px -12px rgba(34,24,18,.5);}
.dm-story-badge strong{font-family:var(--font-display),serif;font-size:38px;color:var(--clay);line-height:1;}
.dm-story-badge span{font-size:13px;color:var(--ink-soft);margin-top:4px;}
.dm-story-copy .dm-h2{margin-top:14px;}
.dm-story-copy p{color:var(--ink-soft);margin-top:18px;max-width:52ch;}
.dm-story-stats{display:flex;gap:28px;flex-wrap:wrap;margin-top:32px;}
.dm-story-stats div{display:flex;flex-direction:column;}
.dm-story-stats strong{font-family:var(--font-display),serif;font-size:26px;color:var(--ink);line-height:1;}
.dm-story-stats span{font-size:13px;color:var(--ink-soft);margin-top:5px;}

/* split day/night */
.dm-split{display:grid;grid-template-columns:1fr auto 1fr;align-items:stretch;min-height:clamp(150px,22vw,230px);}
.dm-split-day,.dm-split-night{display:flex;flex-direction:column;align-items:center;justify-content:center;padding:32px 20px;}
.dm-split-day{background:var(--paper);color:var(--ink);}
.dm-split-night{background:var(--night);color:var(--paper);}
.dm-split-seam{width:2px;background:linear-gradient(var(--paper),var(--crema),var(--night));}
.dm-split-k{font-family:var(--font-display),serif;font-style:italic;font-size:clamp(24px,3.4vw,40px);}
.dm-split-day .dm-split-k{color:var(--clay);}
.dm-split-night .dm-split-k{color:var(--candle);}
.dm-split-t{font-size:12px;letter-spacing:.22em;text-transform:uppercase;margin-top:8px;opacity:.8;}

/* gallery / night */
.dm-gallery{background:var(--night);padding:clamp(16px,2.5vw,28px);}
.dm-gallery-grid{display:grid;grid-template-columns:repeat(4,1fr);grid-auto-rows:minmax(clamp(150px,19vw,240px),1fr);gap:clamp(10px,1.4vw,16px);max-width:1440px;margin:0 auto;}
.dm-g{position:relative;overflow:hidden;border-radius:14px;background:#120c09;margin:0;}
.dm-g .dm-cover{transition:transform .7s cubic-bezier(.2,.8,.2,1);}
.dm-g:hover .dm-cover{transform:scale(1.06);}
.dm-g--tall{grid-row:span 2;grid-column:span 2;}
.dm-g--quote{grid-column:span 2;display:flex;align-items:center;justify-content:center;text-align:center;padding:clamp(20px,3vw,44px);background:none;}
.dm-g--quote p{font-family:var(--font-display),serif;font-size:clamp(28px,3.6vw,52px);color:var(--paper);line-height:1.16;}
.dm-g--quote em{color:var(--candle);font-style:italic;}
@media(max-width:820px){.dm-gallery-grid{grid-template-columns:1fr 1fr;grid-auto-rows:minmax(140px,1fr);}.dm-g--tall{grid-column:span 2;}.dm-g--quote{grid-column:span 2;}}

/* visit / night */
.dm-visit{background:var(--night);color:var(--paper);display:grid;grid-template-columns:.9fr 1.1fr;gap:clamp(28px,5vw,72px);align-items:center;padding:clamp(56px,8vw,112px) clamp(20px,5vw,64px);}
@media(max-width:900px){.dm-visit{grid-template-columns:1fr;}}
.dm-visit-media{position:relative;aspect-ratio:4/5;border-radius:20px;overflow:hidden;background:#120c09;box-shadow:0 24px 60px -30px rgba(0,0,0,.7);}
.dm-visit .dm-h2{color:#f7efe4;}
.dm-hours{width:100%;margin:22px 0;border-collapse:collapse;max-width:380px;}
.dm-hours th,.dm-hours td{text-align:left;padding:13px 0;border-bottom:1px solid rgba(243,235,221,.14);font-weight:500;color:rgba(243,235,221,.9);}
.dm-hours td{text-align:right;font-family:var(--font-display),serif;font-weight:600;color:var(--paper);}
.dm-contact{margin:6px 0 28px;display:grid;gap:14px;}
.dm-contact p{display:flex;flex-direction:column;color:rgba(243,235,221,.92);}
.dm-contact span{font-size:11px;text-transform:uppercase;letter-spacing:.12em;color:var(--candle);font-weight:600;margin-bottom:3px;}
.dm-contact a{text-decoration:underline;text-underline-offset:3px;text-decoration-color:rgba(224,169,78,.5);padding:2px 0;}
.dm-contact a:hover{text-decoration-color:var(--candle);}

/* cta band / night (wine) */
.dm-cta-band{background:var(--wine);color:#fff;text-align:center;padding:clamp(64px,9vw,120px) clamp(20px,5vw,64px);}
.dm-cta-band h2{font-family:var(--font-display),serif;font-size:clamp(32px,5.5vw,60px);margin-bottom:16px;}
.dm-cta-band p{opacity:.94;margin-bottom:30px;max-width:42ch;margin-left:auto;margin-right:auto;}

/* footer */
.dm-footer{background:var(--night);color:var(--paper);padding:52px clamp(20px,5vw,64px);display:flex;flex-wrap:wrap;gap:24px;align-items:center;justify-content:space-between;}
.dm-brand--footer{color:var(--paper);}
.dm-brand--footer span{color:#c2b09a;}
.dm-foot-links{display:flex;gap:28px;font-size:15px;}
.dm-foot-links a{padding:6px 0;}
.dm-foot-links a:hover{color:var(--candle);}
.dm-foot-note{width:100%;color:#a89075;font-size:12px;border-top:1px solid rgba(243,235,221,.1);padding-top:20px;margin-top:6px;}

/* reduced motion */
@media(prefers-reduced-motion:reduce){
  .cs-root [data-reveal]{opacity:1;transform:none;transition:none;}
  .dm-anim{opacity:1;animation:none;}
  .dm-hero-img{animation:none;}
  .dm-marquee-track{animation:none;}
  .dm-marquee-track span:nth-child(2){display:none;}
  .dm-scrollcue span{animation:none;}
}
`;
