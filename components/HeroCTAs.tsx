"use client";

import Link from "next/link";
import { ArrowRight, Mail } from "lucide-react";
import posthog from "posthog-js";

export default function HeroCTAs() {
  return (
    <div className="animate-fade-up animation-delay-300 flex flex-wrap items-center justify-center gap-4">
      <Link
        href="#projects"
        onClick={() =>
          posthog.capture("hero_cta_clicked", { cta: "view_work" })
        }
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
        onClick={() =>
          posthog.capture("hero_cta_clicked", { cta: "contact_me" })
        }
        className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-zinc-700 text-zinc-300 text-sm font-medium hover:border-zinc-400 hover:text-white transition-all duration-200"
      >
        <Mail size={15} />
        Contact Me
      </Link>
    </div>
  );
}
