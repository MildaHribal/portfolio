"use client";

import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

/** Sits under the shelf and points down to the projects. */
export default function ScrollCue() {
  const t = useT();

  return (
    <div className="flex justify-center pt-2 pb-4">
      <a
        href="#projects"
        onClick={() => getPostHog().capture("scroll_cue_clicked")}
        className="scroll-cue group relative z-10 inline-flex items-center gap-3 rounded-full border-2 border-ink/30 bg-board/60 pl-5 pr-2 py-2 text-sm font-medium transition-colors hover:border-ink"
      >
        {t.shelf.scrollCue}
        <span className="grid place-items-center w-9 h-9 rounded-full bg-sticker text-black">
          <svg
            width="12"
            height="14"
            viewBox="0 0 14 16"
            fill="none"
            aria-hidden
            className="scroll-cue-arrow"
          >
            <path
              d="M7 1v13M1 8.5 7 14.5l6-6"
              stroke="currentColor"
              strokeWidth="2"
            />
          </svg>
        </span>
      </a>
    </div>
  );
}
