"use client";

import { useRef, useState } from "react";
import { gsap, SplitText, useGSAP, prefersReducedMotion } from "@/lib/gsap";
import { GitHubIcon, LinkedInIcon } from "@/components/SocialIcons";
import Footer from "@/components/Footer";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-0 py-3 bg-transparent border-0 border-b border-chalk/30 text-chalk text-lg placeholder:text-chalk/35 focus:border-chalk focus-visible:outline-none transition-colors disabled:opacity-60";

export default function Contact() {
  const t = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const root = useRef<HTMLElement>(null);

  // The big line folds up out of the floor, letter by letter, as the section scrolls in.
  useGSAP(
    () => {
      if (prefersReducedMotion()) return;
      const split = SplitText.create(".ct-big", { type: "words,chars", charsClass: "ct-char" });
      // The line assembles out of letters flung around in 3D, finishing exactly as the page bottoms out.
      const rnd = gsap.utils.random(-1, 1, 0.01, true);
      gsap.fromTo(
        split.chars,
        {
          x: () => rnd() * window.innerWidth * 0.5,
          y: () => rnd() * window.innerHeight * 0.6,
          z: () => -600 + rnd() * 400,
          rotationX: () => rnd() * 180,
          rotationY: () => rnd() * 180,
          rotation: () => rnd() * 60,
          opacity: 0,
          filter: "blur(12px)",
        },
        {
          x: 0,
          y: 0,
          z: 0,
          rotationX: 0,
          rotationY: 0,
          rotation: 0,
          opacity: 1,
          filter: "blur(0px)",
          ease: "power3.out",
          stagger: { each: 0.02, from: "random" },
          scrollTrigger: { trigger: ".ct-finale", start: "top 95%", end: "top 8%", scrub: 0.7 },
        },
      );
      gsap.from(".ct-pill", {
        y: 30,
        opacity: 0,
        stagger: 0.06,
        duration: 0.9,
        ease: "expo.out",
        scrollTrigger: { trigger: ".ct-pills", start: "top 95%" },
      });
      return () => split.revert();
    },
    { scope: root, dependencies: [t] },
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim() || !form.email.trim() || !form.message.trim()) {
      setStatus("error");
      setErrorMsg(t.contact.required);
      return;
    }
    setStatus("loading");
    setErrorMsg("");

    getPostHog().capture("contact_form_submitted", {
      has_name: form.name.trim().length > 0,
      has_email: form.email.trim().length > 0,
      has_message: form.message.trim().length > 0,
    });

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-POSTHOG-DISTINCT-ID": getPostHog().get_distinct_id() ?? "",
          "X-POSTHOG-SESSION-ID": getPostHog().get_session_id() ?? "",
        },
        body: JSON.stringify(form),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error ?? t.contact.genericError);
      }

      getPostHog().capture("contact_form_succeeded");
      setStatus("success");
      setForm({ name: "", email: "", message: "", website: "" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : t.contact.networkError;
      getPostHog().capture("contact_form_failed", { error: errorMessage });
      getPostHog().captureException(err);
      setStatus("error");
      setErrorMsg(errorMessage);
    }
  };

  const pills = [
    { label: "miloslav@hribal.site", href: "mailto:miloslav@hribal.site" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/miloslav-hribal/", Icon: LinkedInIcon },
    { label: "GitHub", href: "https://github.com/MildaHribal", Icon: GitHubIcon },
    { label: t.hero.ctaCv, href: "/Miloslav-Hribal-CV.pdf", download: true },
  ];

  return (
    <section ref={root} id="contact" aria-labelledby="contact-title" className="bg-coal text-chalk pt-28 sm:pt-40 overflow-hidden">
      <div className="max-w-[90rem] mx-auto px-4 sm:px-8 grid lg:grid-cols-12 gap-x-10 gap-y-10">
        <div className="lg:col-span-4">
          <h2 id="contact-title" className="font-display font-semibold text-4xl sm:text-5xl tracking-[-0.035em]">{t.contact.title}</h2>
          <p className="mt-4 text-chalk/60 max-w-[34ch]">{t.contact.lead}</p>
          <p className="mt-2 text-chalk/60">
            {t.contact.locationLabel} {t.contact.locationValue}
          </p>
        </div>
          <form className="lg:col-span-8 space-y-7 relative" onSubmit={handleSubmit} noValidate>
            {/* Honeypot — invisible to people, irresistible to bots. */}
            <div aria-hidden className="absolute -left-[9999px] w-px h-px overflow-hidden">
              <label htmlFor="website">Website</label>
              <input
                id="website"
                name="website"
                type="text"
                tabIndex={-1}
                autoComplete="off"
                value={form.website}
                onChange={handleChange}
              />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-sm font-medium text-chalk/60">
                  {t.contact.fieldName}
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder={t.contact.placeholderName}
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  disabled={status === "loading"}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-sm font-medium text-chalk/60">
                  {t.contact.fieldEmail}
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder={t.contact.placeholderEmail}
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  disabled={status === "loading"}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-sm font-medium text-chalk/60">
                {t.contact.fieldMessage}
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder={t.contact.placeholderMessage}
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                required
                disabled={status === "loading"}
              />
            </div>

            <p role="status" aria-live="polite" className="min-h-6">
              {status === "success" && <span className="font-semibold">{t.contact.success}</span>}
              {status === "error" && <span className="font-semibold text-[#ff8a8a]">{errorMsg}</span>}
            </p>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-light"
            >
              {status === "loading" ? t.contact.sending : t.contact.send}
            </button>
          </form>
      </div>

      {/* Finale: fills the last screen, so the big line is whole when the page bottoms out. */}
      <div className="ct-finale relative mt-32 sm:mt-40 min-h-svh flex flex-col">
        <div className="flex-1 grid place-items-center content-center px-4 sm:px-8 py-16 text-center [perspective:1000px]">
          <p className="ct-big font-display font-bold uppercase leading-[0.98] tracking-[-0.045em] text-[clamp(3.2rem,11.5vw,13.5rem)] text-balance">
            {t.contact.big}
          </p>
          <ul className="ct-pills mt-12 flex flex-wrap justify-center gap-3">
            {pills.map((p) => (
              <li key={p.href} className="ct-pill">
                <a
                  href={p.href}
                  download={p.download || undefined}
                  target={p.href.startsWith("http") ? "_blank" : undefined}
                  rel={p.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  onClick={() => getPostHog().capture("contact_pill_clicked", { target: p.label })}
                  className="btn btn-outline-light"
                >
                  {p.Icon && <p.Icon className="size-4" />}
                  {p.label}
                </a>
              </li>
            ))}
          </ul>
        </div>
        <Footer />
      </div>
    </section>
  );
}
