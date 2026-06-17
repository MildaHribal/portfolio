"use client";

import { LANGS, type Lang } from "@/lib/i18n";
import { useLanguage } from "@/lib/language-context";
import { getPostHog } from "@/lib/posthog";

export default function LanguageToggle({
  source,
}: {
  source: "desktop" | "mobile";
}) {
  const { lang, setLang, t } = useLanguage();

  const handleClick = (next: Lang) => {
    if (next === lang) return;
    setLang(next);
    getPostHog().capture("language_switched", {
      from: lang,
      to: next,
      source,
    });
  };

  return (
    <div
      role="group"
      aria-label={t.nav.toggleAria}
      className="inline-flex items-center rounded-full border border-zinc-700 bg-zinc-900/40 p-0.5 text-xs font-medium select-none"
    >
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleClick(code)}
            aria-pressed={active}
            className={`px-2.5 py-1 rounded-full uppercase tracking-wider transition-colors duration-200 cursor-pointer ${
              active
                ? "bg-zinc-50 text-zinc-950"
                : "text-zinc-400 hover:text-zinc-100"
            }`}
          >
            {code}
          </button>
        );
      })}
    </div>
  );
}
