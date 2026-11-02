"use client";

import { useRef } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { onIntroDone } from "@/lib/intro";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

export default function Hero() {
  const t = useT();
  const root = useRef<HTMLElement>(null);
  const [first, ...rest] = t.about.title.split(" ");

  useGSAP(
    (_, contextSafe) => {
      const reduce = prefersReducedMotion();
      const split = SplitText.create(".hero-line", { type: "chars", charsClass: "hero-char" });

      // Entrance, once the preloader curtain lifts.
      gsap.set(split.chars, { yPercent: 115 });
      gsap.set(".hero-fade", { opacity: 0, y: 24 });
      gsap.set(".hero-cue-in", { opacity: 0, scale: 0.6, rotation: -90 });
      onIntroDone(contextSafe!(() => {
        // Lines stop clipping once the letters are up, so they can tumble freely on scroll.
        const tl = gsap.timeline({ defaults: { ease: "expo.out" }, onComplete: () => gsap.set(".hero-line", { overflow: "visible" }) });
        tl.to(split.chars, { yPercent: 0, duration: reduce ? 0 : 1.3, stagger: reduce ? 0 : 0.035 })
          .to(".hero-fade", { opacity: 1, y: 0, duration: reduce ? 0 : 1, stagger: 0.08 }, reduce ? 0 : 0.5)
          .to(".hero-cue-in", { opacity: 1, scale: 1, rotation: 0, duration: reduce ? 0 : 1.4 }, reduce ? 0 : 0.7);
      }));

      if (reduce) return;

      // Pointer: the cursor is a torch in a dark room, and letters near it lean away from it.
      const hero = root.current!;
      const chars = split.chars as HTMLElement[];
      const lean = chars.map((c) => ({
        y: gsap.quickTo(c, "y", { duration: 0.6, ease: "power3.out" }),
        r: gsap.quickTo(c, "rotation", { duration: 0.8, ease: "power3.out" }),
      }));
      const torchX = gsap.quickTo(hero, "--mx", { duration: 0.7, ease: "power3.out" });
      const torchY = gsap.quickTo(hero, "--my", { duration: 0.7, ease: "power3.out" });
      const onMove = (e: PointerEvent) => {
        if (e.pointerType !== "mouse") return;
        torchX(e.clientX);
        torchY(e.clientY);
        chars.forEach((c, i) => {
          const b = c.getBoundingClientRect();
          const dx = e.clientX - (b.left + b.width / 2);
          const dy = e.clientY - (b.top + b.height / 2);
          const f = Math.max(0, 1 - Math.hypot(dx, dy) / 340);
          lean[i].y(-f * f * 46 * Math.sign(dy || 1));
          lean[i].r(-f * 14 * Math.sign(dx || 1));
        });
      };
      const onLeave = () => lean.forEach((l) => (l.y(0), l.r(0)));
      hero.addEventListener("pointermove", onMove);
      hero.addEventListener("pointerleave", onLeave);

      // Scroll: the name parts, a dark window rises from below and opens into the next section.
      const mm = gsap.matchMedia();
      mm.add({ narrow: "(max-width: 767px)", wide: "(min-width: 768px)" }, (ctx) => {
        // Phones get a wider window so the title still fits inside it.
        const side = ctx.conditions?.narrow ? 12 : 37;
        const tl = gsap.timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=190%",
            pin: true,
            scrub: 0.8,
          },
        });
        // Each letter tumbles off on its own path while the two lines pull apart.
        const rnd = gsap.utils.random(-1, 1, 0.01, true);
        tl.to(".hero-l1", { xPercent: -30, ease: "power1.in" }, 0)
          .to(".hero-l2", { xPercent: 30, ease: "power1.in" }, 0)
          .to(
            chars,
            {
              x: () => rnd() * 160,
              rotationX: () => rnd() * 120,
              rotationY: () => rnd() * 90,
              z: () => 100 + rnd() * 300,
              filter: "blur(8px)",
              opacity: 0,
              transformPerspective: 700,
              ease: "power2.in",
              stagger: { each: 0.008, from: "random" },
              duration: 0.55,
            },
            0,
          )
          .to(".hero-bottom", { opacity: 0, y: -40 }, 0)
          .to(".hero-cue", { opacity: 0, scale: 0.5, rotation: 120, duration: 0.25 }, 0)
          .fromTo(
            ".hero-window",
            { clipPath: `inset(100% ${side}% 0% ${side}% round 28px)` },
            { clipPath: `inset(26% ${side}% 16% ${side}% round 28px)`, ease: "power2.out", duration: 0.45 },
            0,
          )
          .to(".hero-window", { clipPath: "inset(0% 0% 0% 0% round 0px)", ease: "power2.inOut", duration: 0.55 }, 0.45)
          .fromTo(".hero-w1", { xPercent: 0 }, { xPercent: -95, ease: "power2.inOut", duration: 0.55 }, 0.45)
          .fromTo(".hero-w2", { xPercent: 0 }, { xPercent: 95, ease: "power2.inOut", duration: 0.55 }, 0.45)
          .fromTo(".hero-beam", { opacity: 0.35, rotate: -8 }, { opacity: 1, rotate: 4, duration: 1 }, 0);
      });

      return () => {
        hero.removeEventListener("pointermove", onMove);
        hero.removeEventListener("pointerleave", onLeave);
        split.revert();
      };
    },
    { scope: root, dependencies: [t] },
  );

  return (
    <section ref={root} id="top" aria-labelledby="hero-title" className="hero relative h-svh overflow-hidden bg-coal text-chalk">
      <div aria-hidden="true" className="hero-torch" />
      <h1 id="hero-title" className="absolute inset-x-0 top-[15svh] sm:top-[17svh] px-4 sm:px-8 font-display hero-name">
        <span className="hero-line hero-l1 block">Miloslav</span>
        <span className="hero-line hero-l2 block text-right">Hříbal</span>
        <span className="sr-only">, {t.hero.srTitle}</span>
      </h1>

      {/* Scroll cue: a slowly turning ring of text around an arrow that keeps dropping. */}
      <a
        href="#about"
        aria-label={t.hero.scroll}
        className="hero-cue absolute z-10 left-4 sm:left-8 top-[44svh] md:top-[calc(17svh+19vw)]"
      >
        <span className="hero-cue-in relative grid place-items-center size-24 md:size-32">
          <svg viewBox="0 0 100 100" className="hero-cue-ring absolute inset-0 size-full" aria-hidden="true">
            <defs>
              <path id="cue-circle" d="M50,50 m-38,0 a38,38 0 1,1 76,0 a38,38 0 1,1 -76,0" />
            </defs>
            <text className="fill-current text-[9.5px] font-semibold uppercase">
              {/* Stretched to exactly one lap of the circle (2π × 38), so the ends never collide. */}
              <textPath href="#cue-circle" textLength="236" lengthAdjust="spacing">{`${t.hero.scroll} ✱ ${t.hero.scroll} ✱`}</textPath>
            </text>
          </svg>
          <svg viewBox="0 0 24 24" className="hero-cue-arrow size-6" fill="none" stroke="currentColor" strokeWidth="1.6" aria-hidden="true">
            <path d="M12 4v15M6 13l6 6 6-6" />
          </svg>
        </span>
      </a>

      <div className="hero-bottom absolute inset-x-0 bottom-0 px-4 sm:px-8 pb-6 sm:pb-8 grid md:grid-cols-12 gap-x-8 gap-y-5 items-end">
        <div className="md:col-span-5 lg:col-span-4">
          <p className="hero-fade inline-flex items-center gap-2.5 text-sm font-medium">
            <span className="relative flex size-2.5">
              <span className="absolute inset-0 rounded-full bg-mint-deep animate-ping opacity-60" />
              <span className="relative rounded-full size-2.5 bg-mint-deep" />
            </span>
            {t.hero.open}
          </p>
          <p className="hero-fade mt-3 text-xl sm:text-2xl font-display font-semibold leading-tight max-w-[30ch]">{t.hero.role}</p>
        </div>
        <div className="md:col-span-7 lg:col-span-5 lg:col-start-8">
          <p className="hero-fade text-[0.95rem] sm:text-base leading-relaxed max-w-[54ch] text-chalk/75">{t.hero.pitch}</p>
          <div className="hero-fade mt-5 flex flex-wrap gap-3">
            <a
              href="#contact"
              onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "contact_me" })}
              className="btn btn-light"
            >
              {t.hero.ctaContact}
            </a>
            <a
              href="/Miloslav-Hribal-CV.pdf"
              download
              onClick={() => getPostHog().capture("hero_cta_clicked", { cta: "download_cv" })}
              className="btn btn-outline-light"
            >
              {t.hero.ctaCv}
            </a>
          </div>
        </div>
      </div>

      {/* The window that grows into the About section. Decorative; About repeats its title for readers. */}
      <div aria-hidden="true" className="hero-window absolute inset-0 text-chalk" style={{ clipPath: "inset(100% 37% 0% 37% round 28px)" }}>
        <div className="hero-beam beam" />
        <div className="absolute inset-0 grid place-items-center">
          <p className="font-display hero-window-word flex gap-[0.25em] uppercase">
            <span className="hero-w1 inline-block">{first}</span>
            <span className="hero-w2 inline-block">{rest.join(" ")}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
