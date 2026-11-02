"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { gsap, ScrollTrigger, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

export default function Services() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const [open, setOpen] = useState(0);

  useGSAP(
    () => {
      gsap.utils.toArray<HTMLElement>(".sv-panel").forEach((el, i) => {
        gsap.to(el, {
          height: i === open ? "auto" : 0,
          duration: prefersReducedMotion() ? 0 : 0.7,
          ease: "expo.inOut",
          onComplete: () => ScrollTrigger.refresh(),
        });
      });
    },
    { scope: root, dependencies: [open] },
  );

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // Cards swing down into place like flaps on a departure board.
      gsap.from(".sv-item", {
        rotationX: -80,
        y: 40,
        opacity: 0,
        transformOrigin: "50% 0%",
        transformPerspective: 900,
        stagger: 0.12,
        duration: 1.4,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sv-list", start: "top 80%" },
      });
      gsap.from(".sv-step", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".sv-steps", start: "top 85%" },
      });
    },
    { scope: root },
  );

  return (
    <section ref={root} id="services" aria-labelledby="services-title" className="bg-coal text-chalk border-t border-chalk/15 py-24 sm:py-36">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 mb-14 sm:mb-20">
          <h2 id="services-title" className="v-skew lg:col-span-7 font-display font-bold uppercase leading-[0.98] tracking-[-0.04em] text-[clamp(2.6rem,6vw,6.2rem)] text-balance">
            {t.services.title}
          </h2>
          <p className="lg:col-span-4 lg:col-start-9 self-end text-lg leading-relaxed text-chalk/75 max-w-[48ch]">{t.services.lead}</p>
        </div>

        <ul className="sv-list flex flex-col gap-3">
          {t.services.items.map((item, i) => {
            const on = open === i;
            const external = item.href.startsWith("http");
            return (
              <li key={item.title} className="sv-item sv-card" data-open={on}>
                <button
                  type="button"
                  aria-expanded={on}
                  aria-controls={`sv-panel-${i}`}
                  onClick={() => setOpen(on ? -1 : i)}
                  className="w-full flex items-center justify-between gap-6 px-5 sm:px-8 py-6 text-left cursor-pointer"
                >
                  <span className="font-display font-semibold text-[clamp(1.5rem,3vw,2.4rem)] tracking-[-0.03em] leading-none">{item.title}</span>
                  <span className="pi-plus shrink-0" data-open={on} aria-hidden="true" />
                </button>
                <div id={`sv-panel-${i}`} className="sv-panel h-0 overflow-hidden" inert={!on}>
                  <div className="px-5 sm:px-8 pb-8 grid md:grid-cols-12 gap-6 items-end">
                    <p className="md:col-span-7 text-lg leading-relaxed max-w-[58ch] opacity-85">{item.desc}</p>
                    <Link
                      href={item.href}
                      target={external ? "_blank" : undefined}
                      rel={external ? "noopener noreferrer" : undefined}
                      className="md:col-span-4 md:col-start-9 md:justify-self-end font-semibold link-draw"
                    >
                      {item.proof}
                    </Link>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>

        <div className="mt-24 sm:mt-32 grid lg:grid-cols-12 gap-x-10 gap-y-10">
          <h3 className="lg:col-span-3 font-display font-semibold text-3xl tracking-[-0.03em] leading-tight">{t.services.processTitle}</h3>
          <ol className="sv-steps lg:col-span-9 grid sm:grid-cols-2 xl:grid-cols-4 gap-x-8 gap-y-10">
            {t.services.process.map((step, i) => (
              <li key={step.title} className="sv-step border-t border-chalk/40 pt-4">
                <span className="font-display font-semibold text-5xl leading-none tracking-[-0.04em]" aria-hidden>
                  {i + 1}
                </span>
                <p className="mt-6 font-semibold text-lg leading-snug">{step.title}</p>
                <p className="mt-2 leading-relaxed text-chalk/70">{step.desc}</p>
              </li>
            ))}
          </ol>
        </div>

        <a href="#contact" onClick={() => getPostHog().capture("services_cta_clicked")} className="btn btn-light mt-16">
          {t.services.cta}
        </a>
      </div>
    </section>
  );
}
