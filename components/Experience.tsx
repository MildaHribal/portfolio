"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { useT } from "@/lib/language-context";

export default function Experience() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const items = t.experience.items;

  const rows = [
    { years: "2020–2024", ...items.infis },
    { years: "2023–2025", ...items.mcip },
    { years: "2024–2025", ...items.skinsmc },
    { years: `2025–${t.experience.present}`, ...items.freelance },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const mm = gsap.matchMedia();

      // Desktop: the timeline is pinned and slides sideways; each title resolves out of a blurred double image.
      mm.add("(min-width: 768px)", () => {
        const track = root.current!.querySelector<HTMLElement>(".exp-track")!;
        const distance = () => track.scrollWidth - window.innerWidth;
        const bar = root.current!.querySelector(".exp-progress");
        const tabs = root.current!.querySelectorAll(".exp-tab");

        const slide = gsap.to(track, {
          x: () => -distance(),
          ease: "none",
          scrollTrigger: {
            trigger: ".exp-pin",
            start: "top top",
            end: () => `+=${distance()}`,
            pin: true,
            scrub: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => bar && gsap.set(bar, { scaleX: self.progress }),
          },
        });

        gsap.to(".exp-ghost", {
          xPercent: -45,
          ease: "none",
          scrollTrigger: { trigger: ".exp-pin", start: "top top", end: () => `+=${distance()}`, scrub: 1.4 },
        });

        gsap.utils.toArray<HTMLElement>(".exp-panel").forEach((panel, i) => {
          const tl = gsap.timeline({
            scrollTrigger: {
              trigger: panel,
              containerAnimation: slide,
              start: "left 95%",
              end: "right 5%",
              scrub: true,
              onToggle: (self) => {
                if (!self.isActive) return;
                tabs.forEach((tab, j) => tab.toggleAttribute("data-on", j === i));
                // Year and role decode themselves as the panel arrives.
                panel.querySelectorAll<HTMLElement>(".exp-scramble").forEach((el) =>
                  gsap.to(el, { duration: 1.1, scrambleText: { text: el.dataset.text!, chars: "01<>/{}#*", speed: 0.6 } }),
                );
              },
            },
          });
          tl.fromTo(panel.querySelector(".exp-title"), { "--g": 1 }, { "--g": 0, duration: 0.35, ease: "power2.out" })
            .fromTo(panel.querySelectorAll(".exp-fade"), { opacity: 0, y: 30 }, { opacity: 1, y: 0, stagger: 0.05, duration: 0.25 }, 0.1)
            .to(panel.querySelector(".exp-title"), { "--g": 1, duration: 0.3, ease: "power2.in" }, 0.7)
            .to(panel.querySelectorAll(".exp-fade"), { opacity: 0, duration: 0.2 }, 0.75);
        });
      });

      mm.add("(max-width: 767px)", () => {
        gsap.utils.toArray<HTMLElement>(".exp-panel").forEach((panel) => {
          gsap.fromTo(
            panel.querySelector(".exp-title"),
            { "--g": 1 },
            { "--g": 0, ease: "none", scrollTrigger: { trigger: panel, start: "top 85%", end: "top 45%", scrub: true } },
          );
        });
      });
    },
    { scope: root, dependencies: [t] },
  );

  return (
    <section ref={root} id="experience" aria-labelledby="experience-title" className="bg-coal text-chalk">
      <div className="exp-pin relative md:h-svh overflow-hidden">
        <div aria-hidden="true" className="v-skew hidden md:block absolute inset-x-0 top-1/2 -translate-y-1/2"><div className="exp-ghost whitespace-nowrap font-display font-bold uppercase leading-none text-[26vh] text-outline select-none">
          {rows.map((r) => r.company.split(",")[0]).join("  ")}
        </div></div>

        <div className="relative md:absolute md:top-24 inset-x-0 px-4 sm:px-8 pt-24 md:pt-0 flex items-baseline justify-between">
          <h2 id="experience-title" className="text-sm font-medium text-fog">
            {t.experience.title}
          </h2>
        </div>

        <ol className="exp-track relative flex flex-col md:flex-row md:h-full md:items-center md:w-max md:pl-[8vw] md:pr-[14vw] gap-y-20 md:gap-x-[10vw] px-4 sm:px-8 py-14 md:py-0">
          {rows.map((r) => (
            <li key={r.company} className="exp-panel md:w-[min(64vw,980px)] shrink-0">
              <p className="exp-fade exp-scramble text-sm font-medium text-fog tabular-nums" data-text={r.years}>{r.years}</p>
              <h3 className="exp-title glitch font-display font-bold uppercase leading-none tracking-[-0.035em] text-[clamp(2.8rem,8.4vw,9rem)] mt-3">
                {r.company}
              </h3>
              <div className="mt-6 grid sm:grid-cols-[minmax(0,14rem)_minmax(0,1fr)] gap-x-10 gap-y-2 max-w-[60rem]">
                <p className="exp-fade exp-scramble font-semibold text-lg" data-text={r.role}>{r.role}</p>
                <p className="exp-fade leading-relaxed text-chalk/70 max-w-[56ch]">{r.description}</p>
              </div>
            </li>
          ))}
        </ol>

        <div aria-hidden="true" className="hidden md:flex absolute bottom-8 inset-x-8 items-center gap-6">
          <div className="flex gap-2">
            {rows.map((r) => (
              <span key={r.company} className="exp-tab">
                {r.years.slice(0, 4)}
              </span>
            ))}
          </div>
          <div className="flex-1 h-px bg-chalk/15 relative">
            <div className="exp-progress absolute inset-0 bg-chalk origin-left scale-x-0" />
          </div>
        </div>
      </div>
    </section>
  );
}
