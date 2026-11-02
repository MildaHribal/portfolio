"use client";

import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";
import { isExternal, kindLabel, loc, projects } from "@/lib/projects";
import { getPostHog } from "@/lib/posthog";
import ProjectIndex from "@/components/work/ProjectIndex";

export default function Work() {
  const { t, lang } = useLanguage();
  const root = useRef<HTMLElement>(null);
  const canvas = useRef<HTMLCanvasElement>(null);
  const [active, setActive] = useState(0);
  const [gl, setGl] = useState<"pending" | "on" | "off">("pending");
  const p = projects[Math.min(Math.max(active, 0), projects.length - 1)];

  useGSAP(() => {
    if (prefersReducedMotion()) {
      setGl("off");
      return;
    }
    type Ribbon = ReturnType<typeof import("@/components/work/ribbon-gl").createRibbon>;
    let ribbon: Ribbon | undefined;
    let running = false;
    let cancelled = false;
    let progress = 0;
    const tick = () => ribbon?.render();
    const onResize = () => ribbon?.resize();
    const run = (on: boolean) => {
      if (on && !running) gsap.ticker.add(tick);
      if (!on && running) gsap.ticker.remove(tick);
      running = on;
    };
    const span = () => (projects.length - 1) * window.innerHeight * 0.6;

    // Pin is created synchronously so every trigger below it measures the right offsets.
    const pin = ScrollTrigger.create({
      trigger: ".work-pin",
      start: "top top",
      end: () => `+=${span()}`,
      pin: true,
      onUpdate: (self) => {
        progress = self.progress;
        ribbon?.setProgress(progress);
      },
    });
    // Render while the strip is anywhere near the viewport, idle otherwise.
    const near = ScrollTrigger.create({
      trigger: ".work-pin",
      start: "top bottom",
      end: () => `+=${span() + window.innerHeight * 2}`,
      onToggle: (self) => run(self.isActive),
    });

    // three.js is ~190 kB: fetch it only when the strip is a couple of screens away.
    let loading = false;
    const load = () => {
      if (loading) return;
      loading = true;
      import("@/components/work/ribbon-gl").then(({ createRibbon }) => {
      if (cancelled || !canvas.current) return;
      try {
        ribbon = createRibbon({
          canvas: canvas.current,
          covers: projects.map((x) => x.cover),
          onActive: (i) => setActive(Math.min(Math.max(i, 0), projects.length - 1)),
        });
      } catch {
        return setGl("off");
      }
      setGl("on");
      ribbon.setProgress(progress);
      ribbon.render();
      run(near.isActive);
      window.addEventListener("resize", onResize);
      });
    };
    const warm = ScrollTrigger.create({
      trigger: ".work-pin",
      start: "top bottom+=200%",
      end: () => `+=${span() + window.innerHeight * 4}`,
      onToggle: (self) => self.isActive && load(),
    });

    const pin_el = root.current!.querySelector<HTMLElement>(".work-pin")!;
    const onPointer = (e: PointerEvent) => ribbon?.pointer(e.clientX, e.clientY, e.pointerType === "mouse");
    const onOut = (e: PointerEvent) => ribbon?.pointer(e.clientX, e.clientY, false);
    pin_el.addEventListener("pointermove", onPointer);
    pin_el.addEventListener("pointerleave", onOut);

    return () => {
      cancelled = true;
      run(false);
      pin.kill();
      near.kill();
      warm.kill();
      window.removeEventListener("resize", onResize);
      pin_el.removeEventListener("pointermove", onPointer);
      pin_el.removeEventListener("pointerleave", onOut);
      ribbon?.dispose();
    };
  }, { scope: root });

  // Caption swaps with a short vertical wipe whenever a new card reaches the centre.
  useGSAP(
    () => {
      gsap.fromTo(".work-cap > *", { yPercent: 60, opacity: 0 }, { yPercent: 0, opacity: 1, duration: 0.6, stagger: 0.04, ease: "expo.out" });
    },
    { scope: root, dependencies: [active] },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      gsap.from(".work-title", {
        yPercent: 100,
        duration: 1.2,
        ease: "expo.out",
        scrollTrigger: { trigger: ".work-pin", start: "top 70%" },
      });
    },
    { scope: root },
  );

  const open = () => {
    getPostHog().capture("project_opened", { project: p.id, from: "ribbon" });
    if (isExternal(p.href)) window.open(p.href, "_blank", "noopener");
    else window.location.href = p.href;
  };

  return (
    <section ref={root} id="projects" aria-labelledby="projects-title" className="bg-coal text-chalk">
      <div className="work-pin relative h-svh overflow-hidden">
        {gl !== "off" && (
          <canvas
            ref={canvas}
            onClick={open}
            data-cursor={t.projects.open}
            aria-hidden="true"
            className="absolute inset-0 size-full cursor-pointer"
          />
        )}

        {gl === "off" && (
          <div className="absolute inset-x-0 top-[22svh] flex gap-5 overflow-x-auto snap-x snap-mandatory px-4 sm:px-8 pb-4">
            {projects.map((x, i) => (
              <button
                key={x.id}
                type="button"
                onClick={() => setActive(i)}
                className="snap-center shrink-0 w-[78vw] md:w-[34vw] rounded-2xl overflow-hidden"
                aria-label={x.title}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={x.cover} alt="" className="w-full aspect-[16/10] object-cover" loading="lazy" />
              </button>
            ))}
          </div>
        )}

        <div className="absolute inset-x-0 bottom-0 px-4 sm:px-8 pb-6 sm:pb-8 grid md:grid-cols-12 gap-6 items-end pointer-events-none">
          <h2 id="projects-title" className="v-skew md:col-span-5 overflow-hidden font-display font-bold uppercase leading-[0.98] tracking-[-0.04em] text-[clamp(3rem,7.4vw,8rem)]">
            <span className="work-title block">{t.projects.title}</span>
          </h2>

          <div className="md:col-span-4 md:col-start-9 pointer-events-auto" aria-live="polite">
            <div className="work-cap overflow-hidden">
              <p className="text-sm font-medium text-chalk/60 tabular-nums">
                {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
                <span className="ml-3">{loc(kindLabel[p.kind], lang)}{p.year ? `, ${p.year}` : ""}</span>
              </p>
              <h3 className="mt-2 font-display font-semibold text-3xl sm:text-4xl tracking-[-0.03em] leading-none">{p.title}</h3>
              <p className="mt-2 text-chalk/70 leading-snug">{loc(p.tagline, lang)}</p>
              <div className="mt-4 flex flex-wrap gap-2.5">
                <a
                  href={p.href}
                  target={isExternal(p.href) ? "_blank" : undefined}
                  rel={isExternal(p.href) ? "noopener noreferrer" : undefined}
                  onClick={() => getPostHog().capture("project_opened", { project: p.id, from: "caption" })}
                  className="btn btn-light btn-sm"
                >
                  {isExternal(p.href) ? t.projects.visit : t.projects.caseStudy}
                </a>
                <a
                  href={`#project-${p.id}`}
                  onClick={() => window.dispatchEvent(new CustomEvent("project:open", { detail: p.id }))}
                  className="btn btn-outline-light btn-sm"
                >
                  {t.projects.details}
                </a>
              </div>
            </div>
          </div>
        </div>

        <p className="hidden md:block absolute top-24 right-8 text-sm text-chalk/55 max-w-[30ch] text-right">{t.projects.lead}</p>
      </div>

      <ProjectIndex />
    </section>
  );
}
