"use client";

import { useState } from "react";
import { getPostHog } from "@/lib/posthog";
import { useT } from "@/lib/language-context";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-xl border-2 border-ink bg-stock text-ink placeholder:text-muted focus-visible:outline-offset-0 disabled:opacity-60";

export default function Contact() {
  const t = useT();
  const [form, setForm] = useState({ name: "", email: "", message: "", website: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

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

  return (
    <section id="contact" aria-labelledby="contact-title" className="border-t-2 border-ink py-24 sm:py-32">
      <div className="max-w-[90rem] mx-auto px-5 sm:px-8 grid lg:grid-cols-12 gap-x-10 gap-y-12">
        <div className="lg:col-span-5">
          <h2 id="contact-title" className="reveal-title font-spine text-[clamp(3.5rem,10vw,6rem)]">
            {t.contact.title}
          </h2>
          <p className="reveal mt-6 text-lg leading-relaxed max-w-[44ch]">{t.contact.lead}</p>
          <dl className="mt-10 border-t-2 border-ink">
            <div className="flex flex-wrap gap-x-6 py-3 border-b border-ink/25">
              <dt className="w-28 text-muted">{t.contact.emailLabel}</dt>
              <dd>
                <a href="mailto:miloslav@hribal.site" className="font-semibold link-draw">
                  miloslav@hribal.site
                </a>
              </dd>
            </div>
            <div className="flex flex-wrap gap-x-6 py-3 border-b border-ink/25">
              <dt className="w-28 text-muted">{t.contact.locationLabel}</dt>
              <dd>{t.contact.locationValue}</dd>
            </div>
          </dl>
        </div>

          <form className="reveal lg:col-span-7 space-y-5 relative" onSubmit={handleSubmit} noValidate>
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
                <label htmlFor="name" className="font-semibold">
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
                <label htmlFor="email" className="font-semibold">
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
              <label htmlFor="message" className="font-semibold">
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
              {status === "error" && <span className="font-semibold text-danger">{errorMsg}</span>}
            </p>

            <button
              type="submit"
              disabled={status === "loading"}
              className="btn btn-primary min-h-12 px-7"
            >
              {status === "loading" ? t.contact.sending : t.contact.send}
            </button>
          </form>
      </div>
    </section>
  );
}
