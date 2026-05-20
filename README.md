# 💼 Portfolio

A personal portfolio website built with **Next.js 16** (App Router) and **React 19**, styled with **Tailwind CSS v4**. It features hero, about, experience and projects sections, plus a contact form that sends emails over SMTP. Traffic is tracked with PostHog. ✨

## 🧰 Tech stack

- ⚡ [Next.js 16](https://nextjs.org) (App Router, standalone output)
- ⚛️ [React 19](https://react.dev)
- 🎨 [Tailwind CSS v4](https://tailwindcss.com)
- 🟦 [TypeScript](https://www.typescriptlang.org)
- ✉️ [Nodemailer](https://nodemailer.com) – sending emails from the contact form
- 📊 [PostHog](https://posthog.com) – analytics (client + server)
- 🎯 [lucide-react](https://lucide.dev) – icons
- 📦 [pnpm](https://pnpm.io) – package manager

## 📁 Project structure

```
app/
  layout.tsx            root layout
  page.tsx              main page
  globals.css           global styles (Tailwind)
  api/contact/route.ts  contact form API endpoint
components/             UI components (Hero, About, Experience, Projects, Contact, ...)
lib/
  posthog.ts            PostHog client (browser)
  posthog-server.ts     PostHog client (server)
public/                static assets
```

## 🚀 Development

Requirements: Node.js 20+ and pnpm.

```bash
pnpm install
pnpm dev
```

The app runs at [http://localhost:3000](http://localhost:3000).

### 📜 Scripts

| Command      | Description               |
| ------------ | ------------------------- |
| `pnpm dev`   | Start the dev server      |
| `pnpm build` | Production build          |
| `pnpm start` | Run the production build  |
| `pnpm lint`  | Run ESLint                |

## 🔐 Environment variables

Create a `.env.local` file (for development) with the following values:

```bash
# Contact form (SMTP)
SMTP_HOST=smtp.seznam.com   # default: smtp.seznam.com
SMTP_PORT=587               # default: 587 (STARTTLS); 465 is tried first over SSL
SMTP_USER=you@email.com     # also the recipient of form messages
SMTP_PASS=password

# PostHog analytics
NEXT_PUBLIC_POSTHOG_KEY=phc_...
NEXT_PUBLIC_POSTHOG_HOST=https://eu.i.posthog.com
```

> 💡 The contact endpoint tries to deliver the email through several methods in order: SMTP over SSL (465), SMTP over STARTTLS (587), `emailproffi.seznam.cz` without authentication, and finally local `sendmail`. This lets it work both on regular hosting and inside a Docker container.

## 🐳 Docker

The repository includes a multi-stage `Dockerfile` (deps → build → runner) using the Next.js standalone output. The runner image ships `msmtp` as `sendmail` for the email fallback.

```bash
docker build -t portfolio .
docker run -p 3000:3000 --env-file .env.local portfolio
```

## 📈 Analytics

PostHog is integrated on both the client (`instrumentation-client.ts`, `lib/posthog.ts`) and the server (`lib/posthog-server.ts`). Requests are proxied through `/ingest` (see rewrites in `next.config.ts`). The contact API captures the `contact_api_message_sent` and `contact_api_message_failed` events.