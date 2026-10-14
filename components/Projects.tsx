"use client";

import Image from "next/image";
import Tilt from "@/components/Tilt";
import { getPostHog } from "@/lib/posthog";
import { useLanguage } from "@/lib/language-context";
import { isExternal, kindLabel, loc, projects, type Project } from "@/lib/projects";

const byId = (id: string) => projects.find((p) => p.id === id)!;

/** The box front: cover art with a coloured spine strip down the left edge. */
function BoxFront({ p, sizes, priority }: { p: Project; sizes: string; priority?: boolean }) {
  const { lang } = useLanguage();
  return (
    <div className="turn-in">
      <Tilt className="rounded-2xl">
        <a
          href={p.href}
          target={isExternal(p.href) ? "_blank" : undefined}
          rel={isExternal(p.href) ? "noopener noreferrer" : undefined}
          onClick={() => getPostHog().capture("project_link_clicked", { project: p.id, link: "cover" })}
          aria-label={p.title}
          className="flex border-2 border-ink bg-stock rounded-2xl overflow-hidden"
        >
          <span className="w-3 sm:w-4 shrink-0 border-r-2 border-ink" style={{ background: p.color }} aria-hidden />
          <span className="relative block flex-1 aspect-[16/10] overflow-hidden">
            <Image
              src={p.cover}
              alt={`${p.title}: ${loc(p.tagline, lang)}`}
              fill
              sizes={sizes}
              quality={85}
              priority={priority}
              className="object-cover"
            />
          </span>
        </a>
      </Tilt>
    </div>
  );
}

function Specs({ p, compact }: { p: Project; compact?: boolean }) {
  const { lang, t } = useLanguage();
  return (
    <table className={`w-full text-left border-t-2 border-ink ${compact ? "text-sm" : "text-[0.95rem]"}`}>
      <caption className="sr-only">
        {t.projects.specsCaption}: {p.title}
      </caption>
      <tbody>
        <tr className="border-b border-ink/25 align-top">
          <th scope="row" className="py-2.5 pr-4 font-medium text-muted w-[34%] whitespace-nowrap">
            {t.projects.type}
          </th>
          <td className="py-2.5">{loc(kindLabel[p.kind], lang)}</td>
        </tr>
        {p.specs.map((s) => (
          <tr key={s.label.en} className="border-b border-ink/25 align-top">
            <th scope="row" className="py-2.5 pr-4 font-medium text-muted w-[34%] whitespace-nowrap">
              {loc(s.label, lang)}
            </th>
            <td className="py-2.5">{loc(s.value, lang)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function Links({ p }: { p: Project }) {
  const { t } = useLanguage();
  const ext = isExternal(p.href);
  return (
    <div className="flex flex-wrap items-center gap-x-6 gap-y-3">
      <a
        href={p.href}
        target={ext ? "_blank" : undefined}
        rel={ext ? "noopener noreferrer" : undefined}
        onClick={() => getPostHog().capture("project_link_clicked", { project: p.id, link: "live" })}
        className="btn btn-light min-h-11 px-5"
      >
        {ext ? t.projects.visit : t.projects.caseStudy}
      </a>
      {p.repo && (
        <a
          href={p.repo}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => getPostHog().capture("project_link_clicked", { project: p.id, link: "source" })}
          className="font-semibold link-draw"
        >
          {t.projects.source}
        </a>
      )}
    </div>
  );
}

function Heading({ p, size = "lg" }: { p: Project; size?: "lg" | "md" | "sm" }) {
  const { lang } = useLanguage();
  const cls = size === "lg" ? "text-5xl sm:text-6xl" : size === "md" ? "text-4xl sm:text-5xl" : "text-3xl";
  return (
    <div>
      <h3 className={`font-spine ${cls}`}>{p.title}</h3>
      <p className="mt-2 text-lg font-semibold font-wide">{loc(p.tagline, lang)}</p>
    </div>
  );
}

/** Big spread: the box front and its back panel side by side. */
function Feature({ p, flip }: { p: Project; flip?: boolean }) {
  const { lang } = useLanguage();
  return (
    <article id={p.id} className="grid lg:grid-cols-12 gap-x-10 gap-y-8 items-start">
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <BoxFront p={p} sizes="(max-width: 1024px) 100vw, 760px" />
      </div>
      <div className={`slide-in lg:col-span-5 flex flex-col gap-6 border-2 border-ink bg-stock rounded-3xl p-6 sm:p-8 ${flip ? "lg:order-1" : ""}`}>
        <Heading p={p} />
        <p className="leading-relaxed max-w-[62ch]">{loc(p.description, lang)}</p>
        <Specs p={p} />
        <Links p={p} />
      </div>
    </article>
  );
}

/** Two boxes sold together: the paid Minecraft work. */
function Bundle() {
  const { lang, t } = useLanguage();
  const items = [byId("skinsmc"), byId("minecraft-ip-list")];
  return (
    <section aria-labelledby="paid-title" className="border-2 border-ink bg-stock rounded-3xl overflow-hidden">
      <div className="grid lg:grid-cols-12 border-b-2 border-ink">
        <h3 id="paid-title" className="lg:col-span-5 font-spine text-4xl sm:text-5xl p-6 sm:p-8 lg:border-r-2 border-ink">
          {t.projects.paidTitle}
        </h3>
        <p className="lg:col-span-7 p-6 sm:p-8 pt-0 lg:pt-8 leading-relaxed max-w-[68ch] self-end">{t.projects.paidLead}</p>
      </div>
      <div className="grid md:grid-cols-2">
        {items.map((p, i) => (
          <article
            key={p.id}
            id={p.id}
            className={`p-6 sm:p-8 flex flex-col gap-5 ${i === 0 ? "md:border-r-2 border-b-2 md:border-b-0 border-ink" : ""}`}
          >
            <BoxFront p={p} sizes="(max-width: 768px) 100vw, 640px" />
            <Heading p={p} size="md" />
            <p className="leading-relaxed">{loc(p.description, lang)}</p>
            <Specs p={p} compact />
            <div className="mt-auto pt-1">
              <Links p={p} />
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

function Compact({ p }: { p: Project }) {
  const { lang } = useLanguage();
  return (
    <article id={p.id} className="flex flex-col gap-4">
      <BoxFront p={p} sizes="(max-width: 768px) 100vw, 560px" />
      <Heading p={p} size="sm" />
      <p className="leading-relaxed text-[0.95rem]">{loc(p.description, lang)}</p>
      <Specs p={p} compact />
      <Links p={p} />
    </article>
  );
}

export default function Projects() {
  const { lang, t } = useLanguage();
  const questie = byId("questie");

  return (
    <section id="projects" aria-labelledby="projects-title" className="py-24 sm:py-32">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-4 mb-16 sm:mb-20">
          <h2 id="projects-title" className="reveal-title lg:col-span-7 font-spine text-[clamp(3.5rem,10vw,6rem)]">
            {t.projects.title}
          </h2>
          <p className="reveal lg:col-span-5 self-end text-lg leading-relaxed max-w-[52ch]">{t.projects.lead}</p>
        </div>

        <div className="flex flex-col gap-24 sm:gap-32">
          <Feature p={byId("tynky-bordel")} />
          <Feature p={byId("budbuddy")} flip />
          <Bundle />

          <article id={questie.id} className="reveal grid md:grid-cols-12 gap-x-10 gap-y-8 items-start">
            <div className="md:col-span-5">
              <BoxFront p={questie} sizes="(max-width: 768px) 100vw, 520px" />
            </div>
            <div className="md:col-span-7 flex flex-col gap-5 max-w-[62ch]">
              <Heading p={questie} size="md" />
              <p className="leading-relaxed">{loc(questie.description, lang)}</p>
              <Specs p={questie} compact />
              <Links p={questie} />
            </div>
          </article>

          <section aria-labelledby="concepts-title" className="border-t-2 border-ink pt-10">
            <div className="flex flex-wrap items-baseline justify-between gap-x-10 gap-y-2 mb-10">
              <h3 id="concepts-title" className="reveal-title font-spine text-4xl sm:text-5xl">
                {t.projects.conceptsTitle}
              </h3>
              <p className="text-muted">{t.projects.conceptsLead}</p>
            </div>
            <div className="reveal grid md:grid-cols-2 gap-x-10 gap-y-16">
              <Compact p={byId("dos-mundos")} />
              <Compact p={byId("montana-cans")} />
            </div>
          </section>
        </div>
      </div>
    </section>
  );
}
