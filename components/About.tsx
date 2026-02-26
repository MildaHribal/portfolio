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
                I studied information technology at INFIS in Pilsen, 
                where I built a solid foundation for my software engineering journey. 
                Since then, I've fully immersed myself in the modern web ecosystem, 
                focusing primarily on building fast, responsive, and high-performing applications.
              </p>
              <p>
                I enjoy the entire process of bringing digital products to life—from 
                crafting pixel-perfect user interfaces with Tailwind CSS to designing 
                robust frontend architectures using React and Next.js. My main focus is 
                always on writing clean code, ensuring smooth interactions, and delivering 
                an intuitive user experience.
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
                      className="flex items-center gap-2 text-sm text-zinc-300"
                    >
                      <span className="w-1 h-1 rounded-full bg-zinc-600 shrink-0" />
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
