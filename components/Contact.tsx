"use client";

import { useState } from "react";
import { Send } from "lucide-react";

const inputClass =
  "w-full px-4 py-3 rounded-xl border border-zinc-800 bg-zinc-900/50 text-white placeholder:text-zinc-600 text-sm focus:outline-none focus:ring-1 focus:ring-zinc-500 focus:border-zinc-600 transition-colors";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => setForm({ ...form, [e.target.name]: e.target.value });

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
              Have a project in mind, a role to fill, or just want to say hello?
              My inbox is always open. I&apos;ll do my best to reply within
              24 hours.
            </p>

            {/* Contact details */}
            <div className="space-y-3">
              {[
                { label: "Email", value: "miloslav.hribal@gmail.com" },
                { label: "Location", value: "Pilsen, Czech Republic" },
              ].map((item) => (
                <div key={item.label} className="flex gap-3">
                  <span className="text-xs text-zinc-600 w-20 pt-0.5">
                    {item.label}
                  </span>
                  <span className="text-sm text-zinc-300">{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right – form */}
          <form
            className="space-y-4"
            onSubmit={(e) => e.preventDefault()}
            noValidate
          >
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
              />
            </div>
            <button
              type="submit"
              className="group w-full flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-zinc-50 text-zinc-950 text-sm font-medium hover:bg-white transition-colors duration-200"
            >
              Send Message
              <Send
                size={14}
                className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform"
              />
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}
