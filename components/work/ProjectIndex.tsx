"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { isExternal, kindLabel, loc, projects } from "@/lib/projects";
import { getPostHog } from "@/lib/posthog";

export default function ProjectIndex() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState<string | null>(null);
  const [hover, setHover] = useState<number | null>(null);

  // The ribbon caption asks for a project's details.
  useEffect(() => {
    const onOpen = (e: Event) => setOpen((e as CustomEvent<string>).detail);
    window.addEventListener("project:open", onOpen);
    return () => window.removeEventListener("project:open", onOpen);
  }, []);

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".pi-row", {
        y: 60,
        opacity: 0,
        stagger: 0.06,
        duration: 1.1,
        ease: "expo.out",
        scrollTrigger: { trigger: root.current, start: "top 80%" },
      });
    },
    { scope: root },
  );

  // Panels open and close with real height, not a fixed max-height.
  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".pi-panel").forEach((el) => {
        const on = el.dataset.id === open;
        gsap.to(el, {
          height: on ? "auto" : 0,
          duration: prefersReducedMotion() ? 0 : 0.7,
          ease: "expo.inOut",
          onComplete: () => ScrollTrigger.refresh(),
        });
      });
    },
    { scope: root, dependencies: [open] },
  );

  const move = (e: React.PointerEvent<HTMLDivElement>) => {
    const el = e.currentTarget.querySelector(".pi-preview");
    if (!el || e.pointerType !== "mouse") return;
    const r = e.currentTarget.getBoundingClientRect();
    gsap.to(el, { x: e.clientX - r.left, y: e.clientY - r.top, duration: 0.6, ease: "power3.out", overwrite: "auto" });
  };

  return (
    <div ref={root} className="relative max-w-[90rem] mx-auto px-4 sm:px-8 pt-24 pb-32" onPointerMove={move} onPointerLeave={() => setHover(null)}>
      <h3 className="text-sm font-medium text-chalk/60 mb-6">{t.projects.indexTitle}</h3>

      <div
        aria-hidden="true"
        className="pi-preview hidden lg:block pointer-events-none absolute left-0 top-0 z-10 w-[22rem] -translate-x-1/2 -translate-y-1/2"
        data-on={hover !== null && open === null}
      >
        {projects.map((p, i) => (
          // eslint-disable-next-line @next/next/no-img-element
          <img key={p.id} src={p.cover} alt="" loading="lazy" className="absolute inset-0 w-full aspect-[16/10] object-cover rounded-xl" style={{ opacity: hover === i ? 1 : 0 }} />
        ))}
      </div>

      <ul className="border-b border-chalk/15">
        {projects.map((p, i) => {
          const expanded = open === p.id;
          return (
            <li key={p.id} id={`project-${p.id}`} className="pi-row border-t border-chalk/15 scroll-mt-24">
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls={`pi-panel-${p.id}`}
                onClick={() => {
                  setOpen(expanded ? null : p.id);
                  if (!expanded) getPostHog().capture("project_details_opened", { project: p.id });
                }}
                onPointerEnter={() => setHover(i)}
                className="pi-head group w-full grid grid-cols-[1fr_auto] md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)_9rem_2.5rem] items-center gap-x-6 gap-y-1 py-6 sm:py-7 text-left cursor-pointer"
              >
                <span className="font-display font-semibold text-[clamp(1.8rem,4vw,3.4rem)] leading-none tracking-[-0.035em] transition-transform duration-500 ease-[cubic-bezier(.16,1,.3,1)] group-hover:translate-x-3">
                  {p.title}
                </span>
                <span className="hidden md:block text-chalk/70">{loc(p.tagline, lang)}</span>
                <span className="hidden md:block text-sm text-chalk/60">
                  {loc(kindLabel[p.kind], lang)}
                  {p.year && <span className="block tabular-nums">{p.year}</span>}
                </span>
                <span className="pi-plus justify-self-end" data-open={expanded} aria-hidden="true" />
              </button>

              <div id={`pi-panel-${p.id}`} data-id={p.id} className="pi-panel h-0 overflow-hidden" role="region" aria-label={p.title} inert={!expanded}>
                <div className="grid lg:grid-cols-12 gap-x-10 gap-y-8 pb-10 pt-2">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img src={p.cover} alt="" loading="lazy" className="lg:col-span-5 w-full aspect-[16/10] object-cover rounded-xl" />
                  <div className="lg:col-span-7">
                    <p className="md:hidden text-chalk/70 mb-3">{loc(p.tagline, lang)}</p>
                    <p className="text-lg leading-relaxed max-w-[62ch]">{loc(p.description, lang)}</p>
                    <dl className="mt-6 grid sm:grid-cols-[10rem_1fr] text-[0.95rem]">
                      <dt className="py-2.5 border-t border-chalk/15 text-chalk/60">{t.projects.type}</dt>
                      <dd className="py-2.5 sm:border-t border-chalk/15">{loc(kindLabel[p.kind], lang)}</dd>
                      {p.specs.map((s) => (
                        <div key={s.label.en} className="contents">
                          <dt className="py-2.5 border-t border-chalk/15 text-chalk/60">{loc(s.label, lang)}</dt>
                          <dd className="py-2.5 sm:border-t border-chalk/15">{loc(s.value, lang)}</dd>
                        </div>
                      ))}
                    </dl>
                    <div className="mt-6 flex flex-wrap gap-2.5">
                      <a
                        href={p.href}
                        target={isExternal(p.href) ? "_blank" : undefined}
                        rel={isExternal(p.href) ? "noopener noreferrer" : undefined}
                        onClick={() => getPostHog().capture("project_opened", { project: p.id, from: "index" })}
                        className="btn btn-light btn-sm"
                      >
                        {isExternal(p.href) ? t.projects.visit : t.projects.caseStudy}
                      </a>
                      {p.repo && (
                        <a href={p.repo} target="_blank" rel="noopener noreferrer" className="btn btn-outline-light btn-sm">
                          {t.projects.source}
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
