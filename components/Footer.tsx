"use client";

import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import { useT } from "@/lib/language-context";

const socials = [
  { label: "GitHub", href: "https://github.com/MildaHribal", Icon: GitHubIcon },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/miloslav-hribal/", Icon: LinkedInIcon },
];

export default function Footer() {
  const t = useT();
  return (
    <footer className="border-t-2 border-ink bg-stock">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 py-10 flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div>
          <p className="font-spine text-4xl">hribal.site</p>
          <p className="mt-2 text-sm text-muted">
            © {new Date().getFullYear()} Miloslav Hříbal. {t.footer.builtWith}
          </p>
        </div>
        <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-semibold">
          {socials.map((s) => (
            <a key={s.label} href={s.href} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 link-draw">
              <s.Icon />
              {s.label}
            </a>
          ))}
          <a href="#" aria-label={t.footer.backToTopAria} className="link-draw">
            {t.footer.backToTop}
          </a>
        </div>
      </div>
    </footer>
  );
}
