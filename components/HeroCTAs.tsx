"use client";

import Link from "next/link";
import { ArrowRight, Mail, Download } from "lucide-react";
import posthog from "posthog-js";

export default function HeroCTAs() {
  return (
    <div className="animate-fade-up animation-delay-300 flex flex-wrap items-center gap-4">
      <Link
        href="#projects"
        onClick={(e) => {
          e.preventDefault();
          posthog.capture("hero_cta_clicked", { cta: "view_work" });
          document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "#projects");
        }}
        className="group inline-flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-50 text-zinc-950 text-sm font-medium hover:bg-white transition-colors duration-200"
      >
        View Work
        <ArrowRight
          size={15}
          className="group-hover:translate-x-0.5 transition-transform"
        />
      </Link>
      <Link
        href="#contact"
        onClick={(e) => {
          e.preventDefault();
          posthog.capture("hero_cta_clicked", { cta: "contact_me" });
          document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
          window.history.pushState(null, "", "#contact");
        }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-400 hover:text-white transition-all duration-200"
      >
        <Mail size={15} />
        Contact Me
      </Link>
      <a
        href="/resume.pdf"
        download
        onClick={() => {
          posthog.capture("hero_cta_clicked", { cta: "download_cv" });
        }}
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-800 text-zinc-500 text-sm font-medium hover:border-emerald-800/50 hover:text-emerald-400 hover:bg-emerald-950/20 transition-all duration-200"
      >
        <Download size={15} />
        Download CV
      </a>
    </div>
  );
}
