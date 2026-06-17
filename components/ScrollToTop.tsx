"use client";

import { ArrowUp } from "lucide-react";
import { useT } from "@/lib/language-context";

export default function ScrollToTop() {
  const t = useT();
  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      aria-label={t.footer.backToTopAria}
      className="group flex items-center gap-2 text-xs text-zinc-500 hover:text-zinc-300 transition-colors duration-300 cursor-pointer"
    >
      {t.footer.backToTop}
      <span className="flex items-center justify-center w-8 h-8 rounded-lg border border-zinc-800 bg-zinc-900/30 group-hover:border-zinc-600 group-hover:-translate-y-0.5 transition-all duration-300">
        <ArrowUp size={14} />
      </span>
    </button>
  );
}
