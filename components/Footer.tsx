import { Github, Linkedin } from "lucide-react";
import ScrollToTop from "@/components/ScrollToTop";

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/MildaHribal",
    icon: Github,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/miloslav-h%C5%99%C3%ADbal-792578280/",
    icon: Linkedin,
  },
];

export default function Footer() {
  return (
    <footer className="border-t border-zinc-800/60 py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col md:flex-row items-center justify-between gap-8">
          {/* Left – branding */}
          <div className="flex flex-col items-center md:items-start gap-2">
            <div className="flex items-center gap-2 text-zinc-400 font-semibold text-sm">
              <span className="w-2 h-2 rounded-full bg-emerald-500" />
              hribal.site
            </div>
            <p className="text-xs text-zinc-500">
              © {new Date().getFullYear()} Miloslav Hříbal. Built with Next.js &amp; Tailwind CSS.
            </p>
          </div>

          {/* Center – social links */}
          <div className="flex items-center gap-5">
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="group flex items-center justify-center w-10 h-10 rounded-xl border border-zinc-800 bg-zinc-900/30 text-zinc-500 hover:text-emerald-400 hover:border-emerald-800/50 hover:bg-emerald-950/30 transition-all duration-300"
              >
                <s.icon size={18} className="group-hover:scale-110 transition-transform duration-300" />
              </a>
            ))}
          </div>

          {/* Right – back to top */}
          <ScrollToTop />
        </div>
      </div>
    </footer>
  );
}
