"use client";

import { useEffect, useRef, useState } from "react";
import { gsap, prefersReducedMotion } from "@/lib/gsap";

// A ring that trails the pointer, swells over anything clickable and shows a word where one is set
// with data-cursor="…". Mouse only; touch and reduced motion keep the system cursor alone.
export default function Cursor() {
  const ring = useRef<HTMLDivElement>(null);
  const [label, setLabel] = useState("");

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || prefersReducedMotion()) return;
    const el = ring.current!;
    el.dataset.on = "true";
    const x = gsap.quickTo(el, "x", { duration: 0.45, ease: "power3.out" });
    const y = gsap.quickTo(el, "y", { duration: 0.45, ease: "power3.out" });
    let mode = "";
    let px = -100;
    let py = -100;

    const update = (t: Element | null) => {
      const tagged = t?.closest<HTMLElement>("[data-cursor]");
      const next = tagged ? "label" : t?.closest("a, button, input, textarea, label") ? "link" : "";
      const text = tagged?.dataset.cursor ?? "";
      if (next !== mode || (tagged && text !== el.dataset.text)) {
        mode = next;
        el.dataset.mode = next;
        el.dataset.text = text;
        setLabel(text);
      }
    };
    const move = (e: PointerEvent) => {
      px = e.clientX;
      py = e.clientY;
      x(px);
      y(py);
      update(e.target as Element | null);
    };
    // Scrolling moves the page under a still pointer, so re-read what it is over.
    const onScroll = () => update(document.elementFromPoint(px, py));
    const down = () => gsap.to(el, { scale: 0.8, duration: 0.15 });
    const up = () => gsap.to(el, { scale: 1, duration: 0.4, ease: "back.out(3)" });
    const hide = () => gsap.to(el, { opacity: 0, duration: 0.2 });
    const show = () => gsap.to(el, { opacity: 1, duration: 0.2 });

    window.addEventListener("pointermove", move);
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointerdown", down);
    window.addEventListener("pointerup", up);
    document.documentElement.addEventListener("pointerleave", hide);
    document.documentElement.addEventListener("pointerenter", show);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointerdown", down);
      window.removeEventListener("pointerup", up);
      document.documentElement.removeEventListener("pointerleave", hide);
      document.documentElement.removeEventListener("pointerenter", show);
    };
  }, []);

  return (
    <div ref={ring} aria-hidden="true" className="cursor">
      <span className="cursor-label">{label}</span>
    </div>
  );
}
