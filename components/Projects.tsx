"use client";

import { ExternalLink, Github, ChevronRight, ChevronLeft, ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

interface Project {
  title: string;
  description: string;
  tags: string[];
  href: string;
  repo: string;
  images: string[];
}

const projects: Project[] = [
  {
    title: "BudBuddy",
    description:
      "BudBuddy is a comprehensive plant management and journaling application, developed using Vue.js and Nuxt.js. It empowers users to meticulously track their plants' journey, from logging daily care activities like watering and nutrient application to documenting growth stages with notes and photos. The project showcases robust frontend development, effective state management, and seamless local storage integration for persistent data.",
    tags: ["Nuxt.js", "Vue.js", "Tailwind CSS", "TypeScript", "Capacitor"],
    href: "#",
    repo: "#",
    images: ["/BudBuddy.webp", "/BudBuddy2.webp", "/BudBuddy3.webp"],
  },
  {
    title: "Questie App",
    description:
      "A gamified personal task management app that turns everyday to-dos into quests. Users earn XP, level up unique characters, and unlock achievements as they complete tasks. Built the complete Nuxt.js frontend and application architecture from scratch.",
    tags: ["Nuxt.js", "Vue.js", "Tailwind CSS", "TypeScript", "Ionic"],
    href: "https://questieapp.com/",
    repo: "#",
    images: ["/Qusteie.webp"],
  },
  {
    title: "Minecraft IP List",
    description:
      "A comprehensive directory for finding and exploring the best Minecraft multiplayer servers. It features a modern Nuxt.js frontend and a resilient Kotlin backend, robustly containerized using Docker.",
    tags: ["Nuxt.js", "Kotlin", "MongoDB", "Docker", "DevOps"],
    href: "https://www.minecraftiplist.com/",
    repo: "#",
    images: ["/mcip.webp"],
  },
  {
    title: "SkinsMC",
    description:
      "A popular platform for browsing, downloading, and uploading millions of Minecraft skins. Powered by a scalable architecture utilizing Kotlin and PHP, with a strong focus on robust DevOps operations.",
    tags: ["Kotlin", "PHP", "MariaDB", "Docker", "DevOps"],
    href: "https://skinsmc.org/",
    repo: "#",
    images: ["/skinsmc.webp"],
  },
];

function ProjectCarousel({ images, priority }: { images: string[], priority?: boolean }) {
  const [currentIndex, setCurrentIndex] = useState(0);

  if (images.length === 0) return null;

  if (images.length === 1) {
    return (
      <Image
        src={images[0]}
        alt="Project screenshot"
        fill
        quality={100}
        className="object-cover"
        priority={priority}
      />
    );
  }

  const next = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((idx) => (idx + 1) % images.length);
  };
  const prev = (e: React.MouseEvent) => {
    e.preventDefault();
    setCurrentIndex((idx) => (idx - 1 + images.length) % images.length);
  };

  return (
    <div className="relative w-full h-full group/carousel">
      {images.map((img, idx) => (
        <Image
          key={img}
          src={img}
          alt={`Project screenshot ${idx + 1}`}
          fill
          quality={100}
          className={`object-cover transition-opacity duration-500 ${
            idx === currentIndex ? "opacity-100 relative z-10" : "opacity-0 absolute inset-0 z-0"
          }`}
          priority={priority && idx === 0}
        />
      ))}
      
      {/* Navigation arrows */}
      <div className="absolute inset-0 flex items-center justify-between p-3 opacity-0 group-hover/carousel:opacity-100 transition-opacity z-20">
        <button
          onClick={prev}
          className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm transition-colors border border-white/10"
          aria-label="Previous image"
        >
          <ChevronLeft size={18} />
        </button>
        <button
          onClick={next}
          className="p-1.5 rounded-full bg-black/60 text-white hover:bg-black/80 backdrop-blur-sm transition-colors border border-white/10"
          aria-label="Next image"
        >
          <ChevronRight size={18} />
        </button>
      </div>

      {/* Dots */}
      <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-1.5 z-20">
        {images.map((_, idx) => (
          <button
            key={idx}
            onClick={(e) => {
              e.preventDefault();
              setCurrentIndex(idx);
            }}
            className={`h-1.5 rounded-full transition-all ${
              idx === currentIndex ? "bg-white w-4" : "bg-white/40 w-1.5 hover:bg-white/70"
            }`}
            aria-label={`Go to image ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
}

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
          {projects.map((project, i) => {
            const isQuestie = project.title === "Questie App";
            return (
            <article
              key={project.title}
              className={`group p-6 md:p-8 rounded-2xl border border-zinc-800/60 bg-zinc-900/20 hover:bg-zinc-900/40 hover:border-zinc-700/60 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/30 transition-all duration-300 ${
                isQuestie ? "flex flex-col gap-8" : "grid md:grid-cols-2 gap-8"
              }`}
            >
              {/* Image — wrapped in link when href is available */}
              {(() => {
                const hasLink = project.href !== "#";
                const imageContent = (
                  <div
                    className={`relative rounded-xl overflow-hidden bg-zinc-900 border border-zinc-800 group/img ${
                      project.title === "BudBuddy" ? "aspect-[9/19.5] max-w-[300px] w-full mx-auto" : isQuestie ? "w-full" : "aspect-video"
                    } ${!isQuestie && i % 2 === 1 ? "md:order-last" : ""}`}
                  >
                    {isQuestie ? (
                      <Image
                        src={project.images[0]}
                        alt={project.title}
                        width={1920}
                        height={1080}
                        unoptimized
                        className="w-full h-auto block transition-transform duration-500 group-hover:scale-[1.03]"
                        priority={i === 0}
                      />
                    ) : (
                      <ProjectCarousel images={project.images} priority={i === 0} />
                    )}
                    {/* Hover overlay */}
                    {hasLink && (
                      <div className="absolute inset-0 transition-all duration-300 z-20 flex items-start justify-end p-3">
                        <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-black/60 backdrop-blur-sm text-white/90 text-xs font-semibold border border-white/10 opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all duration-300 shadow-lg">
                          Visit
                          <ArrowUpRight size={13} />
                        </span>
                      </div>
                    )}
                    <div className="absolute inset-0 rounded-xl border border-zinc-500/10 pointer-events-none z-30" />
                  </div>
                );

                return hasLink ? (
                  <a href={project.href} target="_blank" rel="noopener noreferrer" className={`block ${!isQuestie && i % 2 === 1 ? "md:order-last" : ""}`}>
                    {imageContent}
                  </a>
                ) : imageContent;
              })()}

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
                      className="text-xs px-2.5 py-1 rounded-md border border-zinc-800 bg-zinc-900 text-zinc-400 hover:text-emerald-400 hover:border-emerald-900/60 hover:bg-emerald-950/30 transition-all duration-200 cursor-default"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Links — only for BudBuddy */}
                {project.title === "BudBuddy" && (
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
