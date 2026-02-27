const experiences = [
  {
    period: "2025 — Present",
    role: "Freelance Software Engineer",
    company: "Self-Employed",
    description:
      "Working independently on web and mobile projects across the full stack. Delivering custom software solutions for clients while continuously maintaining and evolving personal projects like SkinsMC and MinecraftIPList. Focused on modern JavaScript ecosystems, scalable backend architecture, and clean user interfaces.",
  },
  {
    period: "2024 — 2025",
    role: "Fullstack Developer",
    company: "SkinsMC",
    description:
      "Architected and maintained a high-traffic platform for browsing and uploading Minecraft skins, serving millions of users. Responsible for both the Kotlin backend and the Nuxt.js frontend, with a strong emphasis on DevOps — containerized infrastructure using Docker and managed the full deployment pipeline.",
  },
  {
    period: "2023 — 2025",
    role: "Frontend Developer",
    company: "MinecraftIPList",
    description:
      "Built and maintained the Nuxt.js frontend for a comprehensive Minecraft server directory. Collaborated on integrating a resilient Kotlin-based backend with MongoDB, and handled containerization and deployment using Docker. Improved overall site performance and user experience across major feature releases.",
  },
  {
    period: "2020 — 2024",
    role: "IT Student",
    company: "INFIS — Secondary School of Information Technology, Pilsen",
    description:
      "Studied information technology with a focus on software development, computer networks, and system administration. Graduated with a solid foundation in programming principles and modern web technologies, which fueled further self-directed learning in the JavaScript and Kotlin ecosystems.",
  },
];

export default function Experience() {
  return (
    <section id="experience" className="py-32 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-zinc-700" />
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            Career
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-16">
          Experience
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
