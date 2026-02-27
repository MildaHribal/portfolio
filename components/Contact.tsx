"use client";

import { useState } from "react";
import { Send, CheckCircle, AlertCircle, Loader2, Mail } from "lucide-react";
import { getPostHog } from "@/lib/posthog";

type Status = "idle" | "loading" | "success" | "error";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-600 transition-colors";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
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
        throw new Error(data.error ?? "Something went wrong");
      }

      getPostHog().capture("contact_form_succeeded");
      setStatus("success");
      setForm({ name: "", email: "", message: "" });
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to send message";
      getPostHog().capture("contact_form_failed", { error: errorMessage });
      getPostHog().captureException(err);
      setStatus("error");
      setErrorMsg(errorMessage);
    }
  };

  return (
    <section id="contact" className="py-32 border-t border-zinc-800/60">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid md:grid-cols-2 gap-16 items-start">
          {/* Left – copy */}
          <div>
            <div className="flex items-center gap-3 mb-4">
              <span className="h-px w-8 bg-zinc-700" />
              <span className="text-xs text-zinc-500 uppercase tracking-widest font-medium">
                Contact
              </span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-zinc-50 mb-6">
              Let&apos;s work together
            </h2>
            <p className="text-zinc-400 text-sm leading-relaxed mb-8">
              Got a project or an open role? Or just want to connect? Drop me a message. I typically respond within a day.
            </p>

            {/* Contact details */}
            <div className="space-y-4 mb-4">
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-600 w-20">Email</span>
                <a
                  href="mailto:miloslav@hribal.site"
                  className="group flex items-center gap-2 text-base sm:text-lg font-medium text-zinc-300 hover:text-emerald-400 transition-colors duration-300"
                >
                  <Mail className="w-5 h-5 text-zinc-500 group-hover:text-emerald-400 transition-colors duration-300" />
                  miloslav@hribal.site
                </a>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-xs text-zinc-600 w-20">Location</span>
                <span className="text-sm text-zinc-300">Pilsen, Czech Republic</span>
              </div>
            </div>
          </div>

          {/* Right – form */}
          <form className="space-y-4" onSubmit={handleSubmit} noValidate>
            <div className="grid sm:grid-cols-2 gap-4">
              <div className="flex flex-col gap-1.5">
                <label htmlFor="name" className="text-xs text-zinc-500">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Jane Smith"
                  value={form.name}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  disabled={status === "loading"}
                />
              </div>
              <div className="flex flex-col gap-1.5">
                <label htmlFor="email" className="text-xs text-zinc-500">
                  Email
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@mail.com"
                  value={form.email}
                  onChange={handleChange}
                  className={inputClass}
                  required
                  disabled={status === "loading"}
                />
              </div>
            </div>
            <div className="flex flex-col gap-1.5">
              <label htmlFor="message" className="text-xs text-zinc-500">
                Message
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                placeholder="Tell me about your project…"
                value={form.message}
                onChange={handleChange}
                className={`${inputClass} resize-none`}
                required
                disabled={status === "loading"}
              />
            </div>

            {/* Status messages */}
            {status === "success" && (
              <div className="flex items-center gap-2 text-sm text-emerald-400 bg-emerald-950/40 border border-emerald-800/50 rounded-xl px-4 py-3">
                <CheckCircle size={15} className="shrink-0" />
                Message sent! I&apos;ll get back to you within 24 hours.
              </div>
            )}
            {status === "error" && (
              <div className="flex items-center gap-2 text-sm text-red-400 bg-red-950/40 border border-red-800/50 rounded-xl px-4 py-3">
                <AlertCircle size={15} className="shrink-0" />
                {errorMsg}
              </div>
            )}

            <button
              type="submit"
              disabled={status === "loading"}
              className="group w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-50 text-zinc-950 text-sm font-medium hover:bg-white transition-colors duration-200 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {status === "loading" ? (
                <>
                  <Loader2 size={14} className="animate-spin" />
                  Sending…
                </>
              ) : (
                <>
                  Send Message
                  <Send
                    size={14}
                    className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
                  />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
