"use client";

import { useT } from "@/lib/language-context";

export default function Footer() {
  const t = useT();
  return (
    <footer className="bg-coal text-chalk/55 border-t border-chalk/10">
      <div className="px-4 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 text-sm">
        <p>
          © {new Date().getFullYear()} Miloslav Hříbal. {t.footer.builtWith}
        </p>
        <a href="#top" aria-label={t.footer.backToTopAria} className="link-draw text-chalk">
          {t.footer.backToTop}
        </a>
      </div>
    </footer>
  );
}
