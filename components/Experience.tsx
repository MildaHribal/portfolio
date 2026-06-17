"use client";

import { useT } from "@/lib/language-context";

export default function Experience() {
  const t = useT();

  const experiences = [
    {
      period: `2025 — ${t.experience.present}`,
      role: t.experience.items.freelance.role,
      company: t.experience.items.freelance.company,
      description: t.experience.items.freelance.description,
    },
    {
      period: "2024 — 2025",
      role: t.experience.items.skinsmc.role,
      company: t.experience.items.skinsmc.company,
      description: t.experience.items.skinsmc.description,
    },
    {
      period: "2023 — 2025",
      role: t.experience.items.mcip.role,
      company: t.experience.items.mcip.company,
      description: t.experience.items.mcip.description,
    },
    {
      period: "2020 — 2024",
      role: t.experience.items.infis.role,
      company: t.experience.items.infis.company,
      description: t.experience.items.infis.description,
    },
  ];

  return (
    <section id="experience" className="py-32 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-zinc-700" />
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            {t.experience.eyebrow}
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-16">
          {t.experience.title}
        </h2>

        <div className="flex flex-col">
          {experiences.map((exp, i) => (
            <div
              key={i}
              className={`group relative grid md:grid-cols-[180px_1fr] gap-4 md:gap-12 py-10 pl-4 rounded-xl transition-all duration-300 hover:bg-emerald-950/20 ${
                i !== 0 ? "border-t border-zinc-800/60" : ""
              }`}
            >
              {/* Green left accent bar */}
              <span className="absolute left-0 top-6 bottom-6 w-px bg-emerald-500 scale-y-0 group-hover:scale-y-100 origin-top transition-transform duration-300 rounded-full" />

              {/* Date */}
              <p className="text-sm text-zinc-500 pt-0.5 shrink-0 transition-transform duration-300 group-hover:translate-x-1 group-hover:text-zinc-400">
                {exp.period}
              </p>

              {/* Content */}
              <div>
                <h3 className="text-base font-semibold text-zinc-100 mb-1 group-hover:text-emerald-400 transition-colors duration-200">
                  {exp.role}
                </h3>
                <p className="text-sm text-zinc-500 mb-3">{exp.company}</p>
                <p className="text-base text-zinc-400 leading-relaxed">
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
