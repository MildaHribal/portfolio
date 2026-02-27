const techs = [
  "React",
  "Next.js",
  "TypeScript",
  "Vue.js",
  "Nuxt.js",
  "Tailwind CSS",
  "Node.js",
  "Kotlin",
  "Docker",
  "MongoDB",
  "PostgreSQL",
  "tRPC",
  "Prisma",
  "Git",
  "Capacitor",
  "Ionic",
  "PHP",
  "MariaDB",
  "Figma",
  "Vite",
];

// Duplicate for seamless loop
const items = [...techs, ...techs];

export default function TechMarquee() {
  return (
    <div className="w-full py-6">
      <div className="max-w-6xl mx-auto px-6">
        <div className="relative overflow-hidden rounded-2xl border border-zinc-800/50 py-4 bg-zinc-900/20">
          {/* Fade edges */}
          <div className="pointer-events-none absolute inset-y-0 left-0 w-16 z-10 bg-gradient-to-r from-zinc-900 to-transparent" />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-16 z-10 bg-gradient-to-l from-zinc-900 to-transparent" />

          <div className="flex w-max animate-marquee gap-10">
            {items.map((tech, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-2 text-sm text-zinc-500 whitespace-nowrap select-none"
              >
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-600/70 shrink-0" />
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
