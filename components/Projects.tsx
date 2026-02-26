import { ExternalLink, Github } from "lucide-react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo: string;
}

const projects: Project[] = [
  {
    title: "Horizon Dashboard",
    description:
      "A data analytics platform built for real-time monitoring of business KPIs. Features interactive charts, automated reporting and role-based access control.",
    tags: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Recharts"],
    href: "#",
    repo: "#",
  },
  {
    title: "Aether Design System",
    description:
      "A fully accessible component library with 40+ primitives, dark-mode support, comprehensive Storybook documentation and NPM publishing pipeline.",
    tags: ["React", "Radix UI", "Tailwind CSS", "Storybook", "Rollup"],
    href: "#",
    repo: "#",
  },
  {
    title: "Nomad — Travel Planner",
    description:
      "An AI-assisted trip-planning app that generates personalised itineraries, integrates maps and lets users collaborate on shared travel boards.",
    tags: ["Next.js", "OpenAI API", "Mapbox", "Zustand", "Supabase"],
    href: "#",
    repo: "#",
  },
];

export default function Projects() {
  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        {/* Section label */}
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-zinc-700" />
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            Selected Work
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-16">
          Things I&apos;ve built
        </h2>

        {/* Project list */}
        <div className="flex flex-col gap-8">
          {projects.map((project, i) => (
            <article
              key={project.title}
              className="group grid md:grid-cols-2 gap-8 p-6 md:p-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700/60 transition-all duration-300"
            >
              {/* Left – placeholder image */}
              <div
                className={`relative aspect-video rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 ${
                  i % 2 === 1 ? "md:order-last" : ""
                }`}
              >
                {/* Grid decoration inside placeholder */}
                <div
                  aria-hidden
                  className="absolute inset-0 opacity-[0.06]"
                  style={{
                    backgroundImage:
                      "linear-gradient(#fff 1px,transparent 1px),linear-gradient(90deg,#fff 1px,transparent 1px)",
                    backgroundSize: "40px 40px",
                  }}
                />
                {/* Project number */}
                <div className="absolute bottom-4 right-5 text-zinc-700 font-bold text-6xl leading-none select-none tabular-nums">
                  0{i + 1}
                </div>
              </div>

              {/* Right – content */}
              <div className="flex flex-col justify-center gap-4">
                <h3 className="text-xl font-semibold text-zinc-50">
                  {project.title}
                </h3>
                <p className="text-zinc-400 text-sm leading-relaxed">
                  {project.description}
                </p>

                {/* Tech tags */}
                <div className="flex flex-wrap gap-2 mt-1">
                  {project.tags.map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4 mt-2">
                  <a
                    href={project.href}
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-300 hover:text-white transition-colors"
                  >
                    <ExternalLink size={14} />
                    Live Demo
                  </a>
                  <a
                    href={project.repo}
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-500 hover:text-zinc-300 transition-colors"
                  >
                    <Github size={14} />
                    Source
                  </a>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
