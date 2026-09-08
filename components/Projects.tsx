"use client";

import { ExternalLink, Github } from "lucide-react";
import Image from "next/image";
import { useT } from "@/lib/language-context";

interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo: string;
  image: string;
  personal?: boolean;
  client?: boolean;
  commercial?: boolean;
  /**
   * Váha projektu v sekci: 1 = vlajkový (přes celou šířku, s rámem prohlížeče),
   * 2 = poloviční, 3 = čtvrtinový. Hierarchii nese velikost, ne dekorace — díky
   * tomu je z jednoho pohledu poznat, co je ta nejlepší práce.
   */
  tier: 1 | 2 | 3;
  /** Adresa v liště prohlížeče. Rám má schválně JEN vlajkový projekt, ať to
   *  znamená „tohle je živý web klienta“, a ne aby to byla opakovaná ozdoba. */
  frameLabel?: string;
}

/**
 * Druh projektu jako obyčejný text, ne verzálkový štítek. Je to užitečná
 * informace, ale ne ta nejdůležitější na kartě — a barevná pilulka verzálkami
 * na ní byla dosud vždycky nejhlasitější prvek.
 */
function kindLabel(project: Project, t: ReturnType<typeof useT>): string | null {
  if (project.client) return t.projects.badges.client;
  if (project.commercial) return t.projects.badges.commercial;
  if (project.personal) return t.projects.badges.personal;
  return null;
}

export default function Projects() {
  const t = useT();

  const projects: Project[] = [
    {
      title: "Týnky Bordel — E-shop",
      description: t.projects.items.tynkybordel,
      tags: ["Nuxt", "Vue.js", "TypeScript", "PostgreSQL", "Drizzle ORM", "Stripe", "Docker"],
      href: "https://tynkybordel.shop/",
      repo: "#",
      image: "/tynkybordel.webp",
      client: true,
      tier: 1,
      frameLabel: "tynkybordel.shop",
    },
    {
      title: "Dos Mundos — redesign",
      description: t.projects.items.dosmundos,
      tags: ["Next.js", "React 19", "TypeScript", "UI/UX", "Web performance"],
      href: "/ukazky/dos-mundos",
      repo: "#",
      image: "/showcase/dos-mundos/card-v2.png",
      personal: true,
      tier: 2,
    },
    {
      title: "Montana Cans",
      description: t.projects.items.montana,
      tags: ["Next.js 15", "React 19", "TypeScript", "Tailwind CSS", "Motion"],
      href: "https://montana.hribal.site/",
      repo: "https://github.com/MildaHribal/montana-cans-cz",
      image: "/montana.webp",
      personal: true,
      tier: 2,
    },
    {
      title: "SkinsMC",
      description: t.projects.items.skinsmc,
      tags: ["Nuxt.js", "Vue.js", "TypeScript", "Tailwind CSS", "Docker", "DevOps"],
      href: "https://skinsmc.org/",
      repo: "#",
      image: "/skinsmc.webp",
      commercial: true,
      tier: 3,
    },
    {
      title: "Minecraft IP List",
      description: t.projects.items.mcip,
      tags: ["Nuxt.js", "Vue.js", "TypeScript", "MongoDB", "Docker"],
      href: "https://www.minecraftiplist.com/",
      repo: "#",
      image: "/mcip.webp",
      commercial: true,
      tier: 3,
    },
    {
      title: "BudBuddy",
      description: t.projects.items.budbuddy,
      tags: ["Nuxt.js", "Vue.js", "Tailwind CSS", "TypeScript", "Capacitor"],
      href: "https://budbuddy.hribal.site",
      repo: "https://github.com/MildaHribal/budbuddy",
      image: "/showcase/thumbs/budbuddy.png",
      personal: true,
      tier: 3,
    },
    {
      title: "Questie App",
      description: t.projects.items.questie,
      tags: ["Nuxt.js", "Vue.js", "Tailwind CSS", "TypeScript", "Ionic"],
      href: "https://questieapp.com/",
      repo: "#",
      image: "/showcase/thumbs/questie-v3.png",
      personal: true,
      tier: 3,
    },
  ];

  const flagship = projects.filter((p) => p.tier === 1);
  const showcase = projects.filter((p) => p.tier === 2);
  const rest = projects.filter((p) => p.tier === 3);

  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-baseline gap-4 mb-14">
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50">
            {t.projects.title}
          </h2>
          <span className="text-sm text-zinc-500">{t.projects.eyebrow}</span>
        </div>

        {/* Vlajkový projekt: obrázek a text vedle sebe, ne pod sebou. Ušetří to
            polovinu výšky a dá sekci osu, na které stojí zbytek. */}
        {flagship.map((project) => (
          <article key={project.title} className="grid lg:grid-cols-12 gap-8 lg:gap-10 items-center">
            <a
              href={project.href}
              target="_blank"
              rel="noopener noreferrer"
              className="lg:col-span-7 group/img block rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800"
            >
              {/* Rám prohlížeče má jen tenhle projekt — je to signál „živý web
                  klienta, klikni“, ne ozdoba opakovaná u každé karty. */}
              <div className="flex items-center gap-2 px-4 h-9 bg-zinc-900 border-b border-zinc-800">
                <div className="flex gap-1.5">
                  <span className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="w-3 h-3 rounded-full bg-zinc-700" />
                  <span className="w-3 h-3 rounded-full bg-zinc-700" />
                </div>
                <div className="flex-1 flex justify-center">
                  <span className="px-4 py-1 rounded-md bg-zinc-950 border border-zinc-800 text-[11px] text-zinc-500 max-w-full truncate">
                    {project.frameLabel}
                  </span>
                </div>
                <div className="w-[52px]" aria-hidden />
              </div>
              <div className="relative w-full aspect-[1078/674] bg-zinc-950">
                <Image
                  src={project.image}
                  alt={`${project.title} — ukázka práce Miloslava Hříbala (${project.tags.join(", ")})`}
                  fill
                  quality={100}
                  sizes="(max-width: 1024px) 100vw, 640px"
                  className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover/img:scale-[1.02]"
                  priority
                />
              </div>
            </a>

            <div className="lg:col-span-5 flex flex-col gap-4">
              <div>
                <h3 className="text-2xl font-semibold text-zinc-50">{project.title}</h3>
                {kindLabel(project, t) && (
                  <p className="text-sm text-zinc-500 mt-1">{kindLabel(project, t)}</p>
                )}
              </div>
              <p className="text-zinc-400 leading-relaxed">{project.description}</p>
              <p className="text-xs text-zinc-600 leading-relaxed">{project.tags.join(", ")}</p>
              <div className="flex items-center gap-5 mt-2">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-900 rounded-xl font-semibold hover:bg-white transition-colors"
                >
                  <ExternalLink size={18} />
                  {t.projects.visit}
                </a>
                {project.repo !== "#" && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    <Github size={18} /> {t.projects.source}
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}

        {/* Dva redesigny vedle sebe — stejná váha, protože jsou to obě ukázky
            toho samého: jak umím předělat existující web. */}
        <div className="grid md:grid-cols-2 gap-8 mt-20">
          {showcase.map((project) => (
            <article key={project.title} className="flex flex-col gap-4">
              <a
                href={project.href}
                target={project.href.startsWith("/") ? undefined : "_blank"}
                rel="noopener noreferrer"
                className="group/img block relative aspect-[16/10] rounded-xl overflow-hidden bg-zinc-950 border border-zinc-800"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} — ukázka práce Miloslava Hříbala (${project.tags.join(", ")})`}
                  fill
                  quality={95}
                  sizes="(max-width: 768px) 100vw, 560px"
                  className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover/img:scale-[1.03]"
                />
              </a>
              <div>
                <h3 className="text-lg font-semibold text-zinc-50">{project.title}</h3>
                {kindLabel(project, t) && (
                  <p className="text-sm text-zinc-500 mt-0.5">{kindLabel(project, t)}</p>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>
              <p className="text-xs text-zinc-600">{project.tags.join(", ")}</p>
              <div className="flex items-center gap-5 mt-auto pt-1">
                <a
                  href={project.href}
                  target={project.href.startsWith("/") ? undefined : "_blank"}
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-sm font-semibold text-zinc-100 hover:text-white transition-colors"
                >
                  <ExternalLink size={16} /> {t.projects.visit}
                </a>
                {project.repo !== "#" && (
                  <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm text-zinc-400 hover:text-zinc-200 transition-colors">
                    <Github size={16} /> {t.projects.source}
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Starší produkty a appky. Menší, ale pořád klikací — dohromady zaberou
            tolik místa co dřív jedna karta. */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-x-6 gap-y-10 mt-20 pt-12 border-t border-zinc-800/60">
          {rest.map((project) => (
            <article key={project.title} className="flex flex-col gap-3">
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group/img block relative aspect-[16/10] rounded-lg overflow-hidden bg-zinc-950 border border-zinc-800"
              >
                <Image
                  src={project.image}
                  alt={`${project.title} — ukázka práce Miloslava Hříbala (${project.tags.join(", ")})`}
                  fill
                  quality={85}
                  sizes="(max-width: 1024px) 50vw, 270px"
                  className="object-cover object-top motion-safe:transition-transform motion-safe:duration-500 group-hover/img:scale-[1.04]"
                  loading="lazy"
                />
              </a>
              <div>
                <h3 className="text-base font-semibold text-zinc-50">{project.title}</h3>
                {kindLabel(project, t) && (
                  <p className="text-xs text-zinc-500 mt-0.5">{kindLabel(project, t)}</p>
                )}
              </div>
              <p className="text-zinc-400 text-sm leading-relaxed line-clamp-4">{project.description}</p>
              <div className="flex items-center gap-4 mt-auto pt-1">
                <a
                  href={project.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-zinc-100 hover:text-white transition-colors"
                >
                  <ExternalLink size={15} /> {t.projects.visit}
                </a>
                {project.repo !== "#" && (
                  <a
                    href={project.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${project.title} — ${t.projects.source}`}
                    className="inline-flex items-center gap-1.5 text-sm text-zinc-400 hover:text-zinc-200 transition-colors"
                  >
                    <Github size={15} />
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
