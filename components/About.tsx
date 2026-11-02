"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

export default function About() {
  const t = useT();
  const root = useRef<HTMLElement>(null);

  const tools = [
    { label: t.about.skills.frontend, value: "Vue, Nuxt, React, Next.js, TypeScript, Tailwind CSS" },
    { label: t.about.skills.backend, value: "Node.js, PostgreSQL, Drizzle ORM, MongoDB, Supabase" },
    { label: t.about.skills.tooling, value: "Git, GitHub Actions, Docker, Capacitor, pnpm" },
  ];

  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      // The statement lights up word by word as it passes through the viewport.
      const split = SplitText.create(".about-statement", { type: "words", aria: "none" });
      gsap.fromTo(
        split.words,
        { opacity: 0.14 },
        {
          opacity: 1,
          stagger: 0.1,
          ease: "none",
          scrollTrigger: { trigger: ".about-statement", start: "top 80%", end: "bottom 45%", scrub: true },
        },
      );
      gsap.from(".about-row", {
        y: 40,
        opacity: 0,
        stagger: 0.08,
        duration: 1,
        ease: "expo.out",
        scrollTrigger: { trigger: ".about-tools", start: "top 85%" },
      });
      return () => split.revert();
    },
    { scope: root, dependencies: [t] },
  );

  return (
    <section ref={root} id="about" aria-labelledby="about-title" className="relative bg-coal text-chalk pt-16 pb-28 sm:pb-40">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8">
        <h2 id="about-title" className="text-sm font-medium text-fog mb-8">
          {t.about.title}
        </h2>
        <p className="about-statement font-display font-semibold text-[clamp(1.9rem,4.4vw,4.1rem)] leading-[1.06] tracking-[-0.025em] max-w-[24ch]">
          {t.about.statement}
        </p>

        <div className="mt-20 sm:mt-28 grid lg:grid-cols-12 gap-x-10 gap-y-12">
          <div className="lg:col-span-5 space-y-5 text-lg leading-relaxed text-chalk/80 max-w-[52ch]">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
            <div className="pt-4 flex flex-wrap gap-3">
              <a
                href="https://www.linkedin.com/in/miloslav-hribal/"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "linkedin" })}
                className="btn btn-outline-light"
              >
                <LinkedInIcon className="size-4" /> LinkedIn
              </a>
              <a
                href="https://github.com/MildaHribal"
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "github" })}
                className="btn btn-outline-light"
              >
                <GitHubIcon className="size-4" /> GitHub
              </a>
            </div>
          </div>

          <table className="about-tools lg:col-span-6 lg:col-start-7 w-full text-left self-start">
            <caption className="text-left text-sm font-medium text-fog mb-4">{t.about.toolsCaption}</caption>
            <tbody>
              {tools.map((row) => (
                <tr key={row.label} className="about-row border-t border-chalk/15 align-top">
                  <th scope="row" className="py-5 pr-6 w-36 font-medium text-fog">
                    {row.label}
                  </th>
                  <td className="py-5 text-lg">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
