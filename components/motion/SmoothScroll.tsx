"use client";

import { useLayoutEffect } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/lib/gsap";

declare global {
  interface Window {
    __lenis?: Lenis;
  }
}

// Lenis drives the scroll, GSAP's ticker drives Lenis, so pins and scrubs never drift apart.
export default function SmoothScroll() {
  useLayoutEffect(() => {
    // Split text and pins measure type, so re-measure once the web fonts are in.
    document.fonts?.ready.then(() => ScrollTrigger.refresh());
    if (prefersReducedMotion()) return;

    const lenis = new Lenis({ lerp: 0.09, anchors: true, autoRaf: false });
    window.__lenis = lenis;
    lenis.on("scroll", ScrollTrigger.update);
    // Big type leans with scroll speed (.v-skew reads --v).
    const root = document.documentElement;
    const setV = gsap.quickTo(root, "--v", { duration: 0.5, ease: "power3.out" });
    lenis.on("scroll", ({ velocity }: { velocity: number }) => setV(gsap.utils.clamp(-40, 40, velocity)));

    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      delete window.__lenis;
    };
  }, []);

  return null;
}
