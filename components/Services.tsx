"use client";

import Link from "next/link";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

export default function Services() {
  const t = useT();

  return (
    <section id="services" aria-labelledby="services-title" className="border-y-2 border-ink bg-stock py-24 sm:py-32">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-x-10 gap-y-6 mb-16">
          <h2 id="services-title" className="reveal-title lg:col-span-7 font-spine text-[clamp(3rem,8vw,5.5rem)] text-balance">
            {t.services.title}
          </h2>
          <p className="reveal lg:col-span-5 self-end text-lg leading-relaxed max-w-[54ch]">{t.services.lead}</p>
        </div>

        {/* Each offer points at a project that proves it. */}
        <div className="grid md:grid-cols-3 border-t-2 border-ink">
          {t.services.items.map((item, i) => {
            const external = item.href.startsWith("http");
            return (
              <article
                key={item.title}
                style={{ "--stagger": `${i * 8}%` } as React.CSSProperties}
                className={`reveal flex flex-col py-8 md:px-8 ${i > 0 ? "border-t-2 md:border-t-0 md:border-l-2 border-ink" : "md:pl-0"}`}
              >
                <h3 className="font-spine text-3xl xl:text-4xl mb-4 text-balance">{item.title}</h3>
                <p className="leading-relaxed mb-6 max-w-[48ch]">{item.desc}</p>
                <Link
                  href={item.href}
                  target={external ? "_blank" : undefined}
                  rel={external ? "noopener noreferrer" : undefined}
                  className="mt-auto font-semibold link-draw"
                >
                  {item.proof}
                </Link>
              </article>
            );
          })}
        </div>

        <div className="mt-20 grid lg:grid-cols-12 gap-x-10 gap-y-8">
          <h3 className="lg:col-span-3 font-spine text-3xl">{t.services.processTitle}</h3>
          <ol className="lg:col-span-9 grid sm:grid-cols-2 gap-x-10 gap-y-8">
            {t.services.process.map((step, i) => (
              <li key={step.title} className="grid grid-cols-[2.5rem_1fr] gap-x-3">
                <span className="font-spine text-4xl" aria-hidden>
                  {i + 1}
                </span>
                <div>
                  <p className="font-semibold text-lg mb-1">{step.title}</p>
                  <p className="leading-relaxed text-muted">{step.desc}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>

        <a
          href="#contact"
          onClick={() => getPostHog().capture("services_cta_clicked")}
          className="btn btn-light min-h-12 mt-16 px-6"
        >
          {t.services.cta}
        </a>
      </div>
    </section>
  );
}
