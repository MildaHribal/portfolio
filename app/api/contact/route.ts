import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";
import type { Transporter } from "nodemailer";
import { getPostHogClient } from "@/lib/posthog-server";

interface ContactPayload {
  name?: unknown;
  email?: unknown;
  message?: unknown;
  /** Honeypot — hidden from people, filled in by bots. */
  website?: unknown;
}

const LIMITS = { name: 120, email: 254, message: 5000 };
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Per-instance sliding window. The site runs as a single container, so an
// in-memory map is enough to stop a script hammering the form.
const RATE_WINDOW_MS = 10 * 60 * 1000;
const RATE_MAX = 5;
const hits = new Map<string, number[]>();

function rateLimited(ip: string): boolean {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < RATE_WINDOW_MS);
  if (recent.length >= RATE_MAX) {
    hits.set(ip, recent);
    return true;
  }
  recent.push(now);
  hits.set(ip, recent);
  if (hits.size > 5000) {
    for (const [key, times] of hits) {
      if (times.every((t) => now - t >= RATE_WINDOW_MS)) hits.delete(key);
    }
  }
  return false;
}

function clientIp(req: NextRequest): string {
  return (
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown"
  );
}

function escapeHtml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

/** Header values (subject, reply-to) must never carry line breaks. */
function singleLine(value: string): string {
  return value.replace(/[\r\n]+/g, " ").trim();
}

function buildHtml(name: string, email: string, message: string) {
  const n = escapeHtml(name);
  const e = escapeHtml(email);
  const m = escapeHtml(message);
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#18181b">
      <h2 style="margin-bottom:4px">New contact form submission</h2>
      <p style="color:#71717a;font-size:13px;margin-top:0">from your portfolio</p>
      <hr style="border:none;border-top:1px solid #e4e4e7;margin:16px 0"/>
      <p><strong>Name:</strong> ${n}</p>
      <p><strong>Email:</strong> <a href="mailto:${e}">${e}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style="margin:0;padding:12px 16px;background:#f4f4f5;border-left:3px solid #a1a1aa;border-radius:4px;white-space:pre-wrap">${m}</blockquote>
    </div>
  `;
}

const timeouts = {
  connectionTimeout: 8000,
  greetingTimeout: 5000,
  socketTimeout: 10000,
};

/** Tried in order; the first transport that accepts the message wins. */
function transports(): { method: string; create: () => Transporter }[] {
  const host = process.env.SMTP_HOST ?? "smtp.seznam.com";
  const auth = { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS };
  return [
    {
      method: "smtp_ssl",
      create: () =>
        nodemailer.createTransport({ host, port: 465, secure: true, auth, ...timeouts }),
    },
    {
      // Credentials travel over this connection, so the certificate is verified.
      method: "smtp_starttls",
      create: () =>
        nodemailer.createTransport({
          host,
          port: Number(process.env.SMTP_PORT ?? 587),
          secure: false,
          requireTLS: true,
          auth,
          ...timeouts,
        }),
    },
    {
      method: "emailproffi",
      create: () =>
        nodemailer.createTransport({
          host: "emailproffi.seznam.cz",
          port: 25,
          secure: false,
          tls: { rejectUnauthorized: false },
          ...timeouts,
        }),
    },
    {
      // msmtp is linked to /usr/sbin/sendmail in the production image.
      method: "sendmail",
      create: () =>
        nodemailer.createTransport({
          sendmail: true,
          newline: "unix",
          path: "/usr/sbin/sendmail",
        }),
    },
  ];
}

export async function POST(req: NextRequest) {
  const distinctId = req.headers.get("x-posthog-distinct-id") || "anonymous";
  const sessionId = req.headers.get("x-posthog-session-id") || undefined;
  const session = sessionId ? { $session_id: sessionId } : {};

  if (rateLimited(clientIp(req))) {
    return NextResponse.json(
      { error: "Too many messages. Please try again later or email me directly." },
      { status: 429 }
    );
  }

  let body: ContactPayload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  // Bots fill every field. Pretend it worked so they don't adapt.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ success: true });
  }

  const name = typeof body.name === "string" ? singleLine(body.name) : "";
  const email = typeof body.email === "string" ? singleLine(body.email) : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (!name || !email || !message) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
  }
  if (!EMAIL_RE.test(email) || email.length > LIMITS.email) {
    return NextResponse.json({ error: "Please enter a valid email address" }, { status: 400 });
  }
  if (name.length > LIMITS.name || message.length > LIMITS.message) {
    return NextResponse.json({ error: "Message is too long" }, { status: 400 });
  }

  const recipientEmail = process.env.SMTP_USER ?? "miloslav@hribal.site";

  const mailOptions = {
    from: `"Portfolio Contact" <${recipientEmail}>`,
    to: recipientEmail,
    replyTo: email,
    subject: `[Portfolio] Message from ${name}`,
    html: buildHtml(name, email, message),
    text: `Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`,
  };

  const posthog = getPostHogClient();
  const errors: string[] = [];

  for (const { method, create } of transports()) {
    try {
      await create().sendMail(mailOptions);
      posthog.capture({
        distinctId,
        event: "contact_api_message_sent",
        properties: { method, ...session },
      });
      return NextResponse.json({ success: true });
    } catch (err) {
      const msg = err instanceof Error ? err.message : String(err);
      console.error(`[contact] ${method} failed:`, msg);
      errors.push(`${method}: ${msg}`);
    }
  }

  console.error("[contact] All attempts failed:", errors);
  posthog.capture({
    distinctId,
    event: "contact_api_message_failed",
    properties: { errors, ...session },
  });

  return NextResponse.json(
    { error: "Failed to send message. Please try emailing directly." },
    { status: 500 }
  );
}
