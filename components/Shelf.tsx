"use client";

import Image from "next/image";
import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { getPostHog } from "@/lib/posthog";
import { useLanguage } from "@/lib/language-context";
import { isExternal, kindLabel, loc, projects } from "@/lib/projects";

export default function Shelf() {
  const { lang, t } = useLanguage();
  // Starts with every box shelved; the first one is pulled out once on load.
  const [active, setActive] = useState(-1);
  const slots = useRef<(HTMLButtonElement | null)[]>([]);
  const focusIndex = active < 0 ? 0 : active;

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const id = window.setTimeout(() => setActive(0), reduce ? 0 : 450);
    return () => window.clearTimeout(id);
  }, []);

  const pull = (i: number, source: "click" | "key") => {
    if (i === active) {
      document.getElementById(projects[i].id)?.scrollIntoView({ behavior: "smooth" });
      return;
    }
    setActive(i);
    slots.current[i]?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
    getPostHog().capture("shelf_box_pulled", { project: projects[i].id, source });
  };

  const onKeyDown = (e: KeyboardEvent<HTMLDivElement>) => {
    const last = projects.length - 1;
    const next =
      e.key === "ArrowRight" ? Math.min(focusIndex + 1, last)
      : e.key === "ArrowLeft" ? Math.max(focusIndex - 1, 0)
      : e.key === "Home" ? 0
      : e.key === "End" ? last
      : null;
    if (next === null) return;
    e.preventDefault();
    slots.current[next]?.focus();
    pull(next, "key");
  };

  const current = projects[focusIndex];

  return (
    <div className="relative isolate overflow-hidden border-t-2 border-ink text-white">
      {/* No wall colour of its own: the pulled box lights the shelf with its own cover. */}
      <div className="absolute inset-0 -z-10 bg-board" aria-hidden>
        {projects.map((p, i) => (
          <Image
            key={p.id}
            src={p.cover}
            alt=""
            fill
            sizes="320px"
            quality={40}
            className="shelf-light object-cover"
            data-on={i === focusIndex}
          />
        ))}
      </div>
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 pt-4 sm:pt-5">
        <p className="mb-5 text-sm sm:text-right" aria-hidden>
          <span className="sm:hidden">{t.shelf.hintTouch}</span>
          <span className="hidden sm:inline">{t.shelf.hint}</span>
        </p>
        <div
          role="toolbar"
          aria-label={t.shelf.label}
          aria-orientation="horizontal"
          onKeyDown={onKeyDown}
          className="shelf flex items-end gap-1.5 overflow-x-auto overflow-y-visible pt-6 -mt-6 pb-0 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {projects.map((p, i) => {
            const isActive = i === active;
            return (
              <button
                key={p.id}
                ref={(el) => {
                  slots.current[i] = el;
                }}
                type="button"
                tabIndex={i === focusIndex ? 0 : -1}
                aria-pressed={isActive}
                aria-label={`${p.title}, ${loc(p.tagline, lang)}`}
                data-active={isActive}
                onClick={() => pull(i, "click")}
                className="carton shelf-slot relative shrink-0 cursor-pointer text-left focus-visible:outline-offset-8"
              >
                <span className="shelf-box block" aria-hidden>
                  <span className="shelf-face shelf-front flex flex-col">
                    <span className="relative block flex-1 overflow-hidden border-b-2 border-ink">
                      <Image
                        src={p.cover}
                        alt=""
                        fill
                        sizes="(max-width: 640px) 68vw, 600px"
                        quality={85}
                        priority={i < 2}
                        className="object-cover"
                      />
                    </span>
                    <span className="flex items-center justify-between gap-3 px-4" style={{ height: "var(--band)" }}>
                      <span className="font-spine text-2xl sm:text-3xl truncate">{p.title}</span>
                      <span className="shrink-0 text-xs sm:text-sm font-semibold bg-sticker text-black px-2 py-1 rounded-md">
                        {loc(kindLabel[p.kind], lang)}
                      </span>
                    </span>
                  </span>
                  <span className="shelf-face shelf-spine flex flex-col items-center">
                    <span className="block w-full h-10 border-b-2 border-ink" style={{ background: p.color }} />
                    <span className="spine-title flex-1 py-3 font-spine whitespace-nowrap overflow-hidden">
                      {p.spine}
                    </span>
                    <span className="w-full h-9 border-t-2 border-ink grid place-items-center text-xs font-semibold">
                      {p.year}
                    </span>
                  </span>
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* The shelf edge, with a price-rail label for whichever box is out. */}
      <div className="carton border-y-2 border-ink bg-stock">
        <div className="max-w-[90rem] mx-auto px-5 sm:px-8 py-4 flex flex-wrap items-baseline gap-x-6 gap-y-2" aria-live="polite">
          <p className="font-spine text-2xl">{current.title}</p>
          <p className="text-muted">{loc(current.tagline, lang)}</p>
          <div className="flex gap-5 ml-auto text-sm font-semibold">
            <a href={`#${current.id}`} className="link-draw">
              {t.shelf.details}
            </a>
            <a
              href={current.href}
              target={isExternal(current.href) ? "_blank" : undefined}
              rel={isExternal(current.href) ? "noopener noreferrer" : undefined}
              className="link-draw"
            >
              {isExternal(current.href) ? t.shelf.live : t.shelf.caseStudy}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
