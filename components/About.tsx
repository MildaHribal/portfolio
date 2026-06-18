"use client";

import { Code2, Zap, Users } from "lucide-react";
import { useT } from "@/lib/language-context";

export default function About() {
  const t = useT();

  const skillCategories = [
    {
      label: t.about.skills.frontend,
      skills: ["React", "Next.js", "TypeScript", "Vue.js", "Nuxt.js", "Tailwind CSS"],
    },
    {
      label: t.about.skills.backend,
      skills: ["Node.js", "Kotlin", "tRPC", "Prisma", "PostgreSQL", "MongoDB"],
    },
    {
      label: t.about.skills.tooling,
      skills: ["Git", "GitHub Actions", "Docker", "Vite", "Linux", "CI/CD"],
    },
    {
      label: t.about.skills.design,
      skills: ["Figma", "Radix UI", "shadcn/ui", "CSS Animations", "SVG", "Responsive Design"],
    },
  ];

  const philosophy = [
    {
      icon: Code2,
      title: t.about.philosophy.cleanTitle,
      desc: t.about.philosophy.cleanDesc,
    },
    {
      icon: Zap,
      title: t.about.philosophy.perfTitle,
      desc: t.about.philosophy.perfDesc,
    },
    {
      icon: Users,
      title: t.about.philosophy.userTitle,
      desc: t.about.philosophy.userDesc,
    },
  ];

  return (
    <section id="about" className="py-32 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left – bio */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-zinc-700" />
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
                {t.about.eyebrow}
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-6">
              {t.about.title}
            </h2>
            <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
              <p>{t.about.p1}</p>
              <p>{t.about.p2}</p>
            </div>
          </div>

          {/* Right – skills */}
          <div className="grid grid-cols-2 gap-6">
            {skillCategories.map((cat) => (
              <div key={cat.label}>
                <p className="text-xs font-medium text-zinc-500 uppercase tracking-widest mb-3">
                  {cat.label}
                </p>
                <ul className="space-y-1.5">
                  {cat.skills.map((skill) => (
                    <li
                      key={skill}
                      className="group/skill flex items-center gap-2 text-sm text-zinc-300 hover:text-emerald-400 transition-colors duration-200 cursor-default"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-600 group-hover/skill:bg-emerald-500 shrink-0 transition-colors duration-200" />
                      {skill}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Philosophy Cards */}
        <div className="grid md:grid-cols-3 gap-6 mt-20">
          {philosophy.map((item) => (
            <div
              key={item.title}
              className="group p-6 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:bg-zinc-900/50 hover:border-zinc-700/60 hover:-translate-y-1 transition-all duration-300"
            >
              <item.icon
                size={24}
                className="text-emerald-500 mb-4 group-hover:scale-110 transition-transform duration-300"
              />
              <h3 className="text-base font-semibold text-zinc-100 mb-2">
                {item.title}
              </h3>
              <p className="text-sm text-zinc-400 leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
