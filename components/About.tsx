const skillCategories = [
  {
    label: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "Vue.js", "Nuxt.js", "Tailwind CSS"],
  },
  {
    label: "Backend",
    skills: ["Node.js", "tRPC", "Prisma", "PostgreSQL", "MongoDB"],
  },
  {
    label: "Tooling",
    skills: ["Git", "GitHub Actions", "Docker", "Vite", "Storybook"],
  },
  {
    label: "Design",
    skills: ["Figma", "Radix UI", "shadcn/ui", "CSS Animations", "SVG"],
  },
];

export default function About() {
  return (
    <section id="about" className="py-32 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left – bio */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-zinc-700" />
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
                About me
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-6">
              Passionate about the craft
            </h2>
            <div className="space-y-4 text-zinc-400 text-base leading-relaxed">
              <p>
                My journey into development started pretty quietly while studying 
                at INFIS in Pilsen. I realized I enjoyed building things and putting 
                them together way more than just using them. Lately, I've been spending 
                most of my time with Next.js and Tailwind, turning ideas into fast, 
                functional apps.
              </p>
              <p>
                What I love about programming is the constant challenge—figuring out 
                how to build a solid foundation on the backend while keeping the user 
                interface clean and straightforward. For me, a project isn't truly 
                finished until the code makes sense and using the app feels completely 
                natural.
              </p>
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
      </div>
    </section>
  );
}
