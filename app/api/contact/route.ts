import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

function buildHtml(name: string, email: string, message: string) {
  return `
    <div style="font-family:sans-serif;max-width:560px;margin:0 auto;color:#18181b">
      <h2 style="margin-bottom:4px">New contact form submission</h2>
      <p style="color:#71717a;font-size:13px;margin-top:0">from your portfolio</p>
      <hr style="border:none;border-top:1px solid #e4e4e7;margin:16px 0"/>
      <p><strong>Name:</strong> ${name}</p>
      <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Message:</strong></p>
      <blockquote style="margin:0;padding:12px 16px;background:#f4f4f5;border-left:3px solid #a1a1aa;border-radius:4px;white-space:pre-wrap">${message}</blockquote>
    </div>
  `;
}

export async function POST(req: NextRequest) {
  let body: ContactPayload;

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  const { name, email, message } = body;

  if (!name?.trim() || !email?.trim() || !message?.trim()) {
    return NextResponse.json({ error: "All fields are required" }, { status: 400 });
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

  const errors: string[] = [];

  // --- Attempt 1: configured SMTP with SSL (port 465) ---
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.seznam.com",
      port: 465,
      secure: true, // SSL
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      connectionTimeout: 8000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] SMTP SSL (465) failed:", msg);
    errors.push(`SSL: ${msg}`);
  }

  // --- Attempt 2: configured SMTP with STARTTLS (port 587) ---
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST ?? "smtp.seznam.com",
      port: Number(process.env.SMTP_PORT ?? 587),
      secure: false,
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: { rejectUnauthorized: false },
      connectionTimeout: 8000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] SMTP STARTTLS (587) failed:", msg);
    errors.push(`STARTTLS: ${msg}`);
  }

  // --- Attempt 3: emailproffi.seznam.cz (no auth) ---
  try {
    const transporter = nodemailer.createTransport({
      host: "emailproffi.seznam.cz",
      port: 25,
      secure: false,
      tls: { rejectUnauthorized: false },
      connectionTimeout: 8000,
      greetingTimeout: 5000,
      socketTimeout: 10000,
    });
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] emailproffi failed:", msg);
    errors.push(`proffi: ${msg}`);
  }

  // --- Attempt 4: sendmail (Linux servers) ---
  try {
    const transporter = nodemailer.createTransport({
      sendmail: true,
      newline: "unix",
      path: "/usr/sbin/sendmail",
    });
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ success: true });
  } catch (err) {
    const msg = err instanceof Error ? err.message : String(err);
    console.error("[contact] sendmail failed:", msg);
    errors.push(`sendmail: ${msg}`);
  }

  console.error("[contact] All attempts failed:", errors);

  return NextResponse.json(
    { error: "Failed to send message. Please try emailing directly." },
    { status: 500 }
  );
}
