"use client";

import Header from "@/components/Header";
import Preloader from "@/components/Preloader";
import SmoothScroll from "@/components/motion/SmoothScroll";
import Hero from "@/components/Hero";
import Cursor from "@/components/motion/Cursor";
import Marquee from "@/components/motion/Marquee";
import About from "@/components/About";
import Experience from "@/components/Experience";
import Work from "@/components/work/Work";
import Services from "@/components/Services";
import Contact from "@/components/Contact";
import { useEffect } from "react";
import { ScrollTrigger } from "@/lib/gsap";
import { useLanguage } from "@/lib/language-context";

export default function Site() {
  const { lang } = useLanguage();
  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [lang]);
  return (
    <>
      <SmoothScroll />
      <Preloader />
      <Cursor />
      <Header />
      {/* Remount on language switch so split text and pins are rebuilt from the new copy. */}
      <main id="main" key={lang}>
        <Hero />
        <About />
        <Marquee />
        <Experience />
        <Work />
        <Services />
        <Contact />
      </main>
    </>
  );
}
