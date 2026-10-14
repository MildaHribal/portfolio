"use client";

import { useT } from "@/lib/language-context";

export default function Experience() {
  const t = useT();
  const items = t.experience.items;

  const rows = [
    { years: `2025–${t.experience.present}`, ...items.freelance },
    { years: "2024–2025", ...items.skinsmc },
    { years: "2023–2025", ...items.mcip },
    { years: "2020–2024", ...items.infis },
  ];

  return (
    <section id="experience" aria-labelledby="experience-title" className="py-24 sm:py-32">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
        <h2 id="experience-title" className="reveal-title font-spine text-[clamp(3rem,8vw,5.5rem)] mb-12">
          {t.experience.title}
        </h2>
        <table className="reveal w-full text-left border-t-2 border-ink">
          <caption className="sr-only">{t.experience.caption}</caption>
          <thead className="sr-only">
            <tr>
              <th scope="col">{t.experience.cols.years}</th>
              <th scope="col">{t.experience.cols.where}</th>
              <th scope="col">{t.experience.cols.role}</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.company} className="border-b-2 border-ink grid md:table-row gap-1 py-6 md:py-0">
                <td className="md:py-7 md:pr-8 md:w-48 align-top font-semibold">{r.years}</td>
                <th scope="row" className="md:py-7 md:pr-8 md:w-[30%] align-top font-spine text-3xl sm:text-4xl">
                  {r.company}
                </th>
                <td className="md:py-7 align-top">
                  <p className="font-semibold">{r.role}</p>
                  <p className="mt-1 leading-relaxed text-muted max-w-[64ch]">{r.description}</p>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
