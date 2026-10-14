"use client";

import { useT } from "@/lib/language-context";

export default function About() {
  const t = useT();

  const tools = [
    { label: t.about.skills.frontend, value: "Vue, Nuxt, React, Next.js, TypeScript, Tailwind CSS" },
    { label: t.about.skills.backend, value: "Node.js, PostgreSQL, Drizzle ORM, MongoDB, Supabase" },
    { label: t.about.skills.tooling, value: "Git, GitHub Actions, Docker, Capacitor, pnpm" },
  ];

  return (
    <section id="about" aria-labelledby="about-title" className="border-t-2 border-ink bg-stock py-24 sm:py-32">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-x-10 gap-y-12">
        <h2 id="about-title" className="reveal-title lg:col-span-4 font-spine text-[clamp(3rem,8vw,5.5rem)]">
          {t.about.title}
        </h2>
        <div className="lg:col-span-8 flex flex-col gap-12">
          <div className="reveal space-y-5 text-lg sm:text-xl leading-relaxed max-w-[60ch]">
            <p>{t.about.p1}</p>
            <p>{t.about.p2}</p>
          </div>
          <table className="reveal w-full text-left border-t-2 border-ink">
            <caption className="text-left font-semibold mb-3">{t.about.toolsCaption}</caption>
            <tbody>
              {tools.map((row) => (
                <tr key={row.label} className="border-b border-ink/25 align-top">
                  <th scope="row" className="py-3 pr-6 w-40 font-medium text-muted">
                    {row.label}
                  </th>
                  <td className="py-3">{row.value}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
