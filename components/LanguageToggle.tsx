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
    getPostHog().capture("language_switched", { from: lang, to: next, source });
  };

  return (
    <div role="group" aria-label={t.nav.toggleAria} className="inline-flex border-2 border-ink rounded-xl overflow-hidden text-sm font-semibold select-none">
      {LANGS.map((code) => {
        const active = code === lang;
        return (
          <button
            key={code}
            type="button"
            onClick={() => handleClick(code)}
            aria-pressed={active}
            lang={code}
            className={`h-9 min-w-10 px-2 cursor-pointer transition-colors ${
              active ? "bg-ink text-board" : "hover:bg-ink/15"
            }`}
          >
            {code === "cs" ? "CZ" : "EN"}
          </button>
        );
      })}
    </div>
  );
}
