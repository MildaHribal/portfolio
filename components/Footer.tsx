import { Github, Linkedin, Twitter } from "lucide-react";

const socials = [
  { icon: Github, href: "#", label: "GitHub" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Twitter, href: "#", label: "Twitter / X" },
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-zinc-800/60 py-10">
      <div className="max-w-6xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4">
        <p className="text-xs text-zinc-600">
          © {year} Miloslav Hříbal. Crafted with Next.js &amp; Tailwind CSS.
        </p>
        <div className="flex items-center gap-4">
          {socials.map(({ icon: Icon, href, label }) => (
            <a
              key={label}
              href={href}
              aria-label={label}
              className="text-zinc-600 hover:text-zinc-300 transition-colors"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
