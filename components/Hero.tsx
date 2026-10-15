"use client";

import ScrollCue from "@/components/ScrollCue";
import Shelf from "@/components/Shelf";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

export default function Hero() {
  const t = useT();

  return (
    <section aria-labelledby="hero-title" className="pt-16">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 pt-8 sm:pt-12 pb-8 sm:pb-10 grid lg:grid-cols-12 gap-x-10 gap-y-6 items-end">
        <div className="hero-drift relative z-10 lg:col-span-7">
          <h1 id="hero-title" className="hero-in font-spine text-[clamp(3.5rem,11vw,6rem)] text-balance">
            Miloslav Hříbal
            <span className="sr-only">, {t.hero.srTitle}</span>
          </h1>
          <p style={{ "--d": "120ms" } as React.CSSProperties} className="hero-in mt-4 text-xl sm:text-2xl font-semibold font-wide">{t.hero.role}</p>
        </div>
        <div className="relative z-10 lg:col-span-5 lg:pb-1">
          <p style={{ "--d": "220ms" } as React.CSSProperties} className="hero-in text-base sm:text-lg leading-relaxed max-w-[60ch]">{t.hero.pitch}</p>
          <div style={{ "--d": "320ms" } as React.CSSProperties} className="hero-in mt-6 flex flex-wrap items-center gap-x-6 gap-y-3">
            <a
              href="#contact"
              onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "contact_me" })}
              className="btn btn-primary min-h-12 px-6"
            >
              {t.hero.ctaContact}
            </a>
            <a
              href="/Miloslav-Hribal-CV.pdf"
              download
              onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "download_cv" })}
              className="btn btn-ghost min-h-12 px-6"
            >
              {t.hero.ctaCv}
            </a>
            <a
              href="https://www.linkedin.com/in/miloslav-hribal/"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "linkedin" })}
              className="inline-flex items-center gap-2 min-h-12 font-semibold"
            >
              <LinkedInIcon />
              <span className="link-draw">{t.hero.ctaLinkedin}</span>
            </a>
            <a
              href="https://github.com/MildaHribal"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "github" })}
              className="inline-flex items-center gap-2 min-h-12 font-semibold"
            >
              <GitHubIcon />
              <span className="link-draw">{t.hero.ctaGithub}</span>
            </a>
          </div>
        </div>
      </div>
      <Shelf />
      <ScrollCue />
    </section>
  );
}
