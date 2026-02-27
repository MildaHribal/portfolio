"use client";

import { ExternalLink, Github, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { getPostHog } from "@/lib/posthog";

interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo: string;
  image: string;
}

const projects: Project[] = [
  {
    title: "BudBuddy",
    description:
      "BudBuddy is a comprehensive plant management and journaling application, developed using Vue.js and Nuxt.js. It empowers users to meticulously track their plants' journey, from logging daily care activities like watering and nutrient application to documenting growth stages with notes and photos.",
    tags: ["Nuxt.js", "Vue.js", "Tailwind CSS", "TypeScript", "Capacitor"],
    // OPRAVA: Použití vlastní subdomény, aby fungovalo CSP z netlify.toml
    href: "https://budbuddy.hribal.site", 
    repo: "https://github.com/MildaHribal/budbuddy",
    image: "/BudBuddy.webp",
  },
  {
    title: "Questie App",
    description:
      "A gamified personal task management app that turns everyday to-dos into quests. Users earn XP, level up unique characters, and unlock achievements as they complete tasks. Built the complete Nuxt.js frontend and application architecture from scratch.",
    tags: ["Nuxt.js", "Vue.js", "Tailwind CSS", "TypeScript", "Ionic"],
    href: "https://questieapp.com/",
    repo: "#",
    image: "/Qusteie.webp",
  },
  {
    title: "Minecraft IP List",
    description:
      "A comprehensive directory for finding and exploring the best Minecraft multiplayer servers. It features a modern Nuxt.js frontend and a resilient Kotlin backend, robustly containerized using Docker.",
    tags: ["Nuxt.js", "Kotlin", "MongoDB", "Docker", "DevOps"],
    href: "https://www.minecraftiplist.com/",
    repo: "#",
    image: "/mcip.webp",
  },
  {
    title: "SkinsMC",
    description:
      "A popular platform for browsing, downloading, and uploading millions of Minecraft skins. Powered by a scalable architecture utilizing Kotlin and PHP, with a strong focus on robust DevOps operations.",
    tags: ["Kotlin", "PHP", "MariaDB", "Docker", "DevOps"],
    href: "https://skinsmc.org/",
    repo: "#",
    image: "/skinsmc.webp",
  },
];

export default function Projects() {
  const [activeIframe, setActiveIframe] = useState<string | null>(null);

  return (
    <section id="projects" className="py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center gap-3 mb-4">
          <span className="h-px w-8 bg-zinc-700" />
          <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
            Selected Work
          </span>
        </div>
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-16">
          My Projects
        </h2>

        <div className="flex flex-col gap-8">
          {projects.map((project, i) => {
            const isQuestie = project.title === "Questie App";
            const isBudBuddy = project.title === "BudBuddy";
            const hasLink = project.href !== "#" && !isBudBuddy;

            return (
              <article
                key={project.title}
                className={`group p-6 md:p-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 ${
                  isQuestie ? "flex flex-col gap-8" : "grid md:grid-cols-2 gap-8"
                }`}
              >
                {/* Image / Iframe Container */}
                <div
                  className={`relative rounded-[2.5rem] overflow-hidden bg-zinc-950 border border-zinc-800 group/img ${
                    isBudBuddy
                      ? activeIframe === project.title
                        ? "aspect-[9/20.5] max-w-[370px] w-full mx-auto"
                        : "aspect-[9/19.5] max-w-[300px] w-full mx-auto"
                      : isQuestie ? "w-full aspect-[2.2/1]" : "aspect-video"
                  } ${!isQuestie && i % 2 === 1 ? "md:order-last" : ""}`}
                >
                  {isBudBuddy && activeIframe === project.title ? (
                    <div className="relative w-full h-full">
                      {/* Simulace horního výřezu (Notch) */}
                      <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-5 bg-zinc-900 rounded-full z-50 pointer-events-none border border-zinc-800" />
                      
                      <iframe
                        src={project.href}
                        // OPRAVA: Přidán silný rámeček (border-12) pro simulaci těla telefonu
                        className="w-full h-full border-[6px] border-zinc-900 rounded-[2.5rem] absolute inset-0 z-40 bg-zinc-950"
                        title={`${project.title} Live Demo`}
                        allow="clipboard-write"
                      />
                    </div>
                  ) : (
                    <div className="relative w-full h-full">
                      <Image
                        src={project.image}
                        alt={project.title}
                        fill
                        sizes={isBudBuddy ? "300px" : isQuestie ? "(max-width: 768px) 100vw, 800px" : "(max-width: 768px) 100vw, 50vw"}
                        className={`transition-transform duration-500 group-hover/img:scale-[1.03] ${
                          isBudBuddy ? "object-cover" : isQuestie ? "object-cover object-top" : "object-cover aspect-video"
                        }`}
                        priority={i === 0}
                        loading={i === 0 ? undefined : "lazy"}
                      />

                    </div>
                  )}

                  {/* Visit Overlay pro ostatní projekty */}
                  {hasLink && (
                    <a href={project.href} target="_blank" rel="noopener noreferrer" className="absolute inset-0 z-20">
                      <div className="absolute inset-0 flex items-start justify-end p-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 text-xs font-semibold border border-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300">
                          Visit <ArrowUpRight size={13} />
                        </span>
                      </div>
                    </a>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col justify-center gap-4">
                  <h3 className="text-xl font-semibold text-zinc-50">{project.title}</h3>
                  <p className="text-zinc-400 text-sm leading-relaxed">{project.description}</p>

                  <div className="flex flex-wrap gap-2 mt-1">
                    {project.tags.map((tag) => (
                      <span key={tag} className="text-xs px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400">
                        {tag}
                      </span>
                    ))}
                  </div>

                  {isBudBuddy && (
                    <div className="flex items-center gap-5 mt-4">
                      <button
                        onClick={() => setActiveIframe(activeIframe === project.title ? null : project.title)}
                        className="inline-flex items-center gap-2 px-5 py-2.5 bg-zinc-100 text-zinc-900 rounded-xl font-semibold hover:bg-white hover:scale-105 transition-all duration-300 active:scale-95 cursor-pointer"
                      >
                        <ExternalLink size={18} />
                        {activeIframe === project.title ? "Close Demo" : "Live Demo"}
                      </button>
                      <a href={project.repo} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 text-sm font-medium text-zinc-400 hover:text-zinc-200 transition-colors">
                        <Github size={18} /> Source
                      </a>
                    </div>
                  )}
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}