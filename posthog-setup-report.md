<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into this Next.js App Router portfolio site. Here's a summary of all changes made:

**New files created:**
- `instrumentation-client.ts` — Client-side PostHog initialization using Next.js 15.3+ instrumentation pattern. Initializes `posthog-js` with EU host via reverse proxy, enables exception tracking and debug mode in development.
- `lib/posthog-server.ts` — Server-side PostHog singleton (`posthog-node`) for use in API routes. Flushes immediately (`flushAt: 1`, `flushInterval: 0`) to ensure events are captured in serverless environments.
- `components/HeroCTAs.tsx` — New client component extracted from `Hero.tsx` to enable CTA click tracking while keeping the parent as a server component.

**Modified files:**
- `next.config.ts` — Added PostHog reverse proxy rewrites (`/ingest/*` → `eu.i.posthog.com`) and `skipTrailingSlashRedirect: true`.
- `components/Hero.tsx` — Replaced inline CTA buttons with `<HeroCTAs />` client component.
- `components/Projects.tsx` — Added `project_link_clicked` capture on external project link clicks.
- `components/Header.tsx` — Added `nav_link_clicked` capture on all desktop and mobile nav links (with `menu: "desktop" | "mobile"` property).
- `components/Contact.tsx` — Added `contact_form_submitted`, `contact_form_succeeded`, `contact_form_failed` captures. On submission, passes `X-POSTHOG-DISTINCT-ID` and `X-POSTHOG-SESSION-ID` headers for server-side correlation. Errors are also forwarded to PostHog's exception tracker.
- `app/api/contact/route.ts` — Added server-side `contact_api_message_sent` (with `method` property indicating which SMTP fallback succeeded) and `contact_api_message_failed` events using `posthog-node`. Reads `X-POSTHOG-DISTINCT-ID` / `X-POSTHOG-SESSION-ID` headers to correlate with client-side sessions.

**Environment variables set in `.env`:**
- `NEXT_PUBLIC_POSTHOG_KEY`
- `NEXT_PUBLIC_POSTHOG_HOST`

---

## Events instrumented

| Event name | Description | File |
|---|---|---|
| `contact_form_submitted` | User submitted the contact form (client-side, on submit) | `components/Contact.tsx` |
| `contact_form_succeeded` | Contact form submission succeeded (API returned 200) | `components/Contact.tsx` |
| `contact_form_failed` | Contact form submission failed (API returned error) | `components/Contact.tsx` |
| `contact_api_message_sent` | Server-side: email was successfully dispatched via the contact API route | `app/api/contact/route.ts` |
| `contact_api_message_failed` | Server-side: all email delivery attempts failed in the contact API route | `app/api/contact/route.ts` |
| `hero_cta_clicked` | User clicked one of the CTA buttons in the Hero section ('View Work' or 'Contact Me') | `components/HeroCTAs.tsx` |
| `project_link_clicked` | User clicked a live project link in the Projects section | `components/Projects.tsx` |
| `nav_link_clicked` | User clicked a navigation link (desktop or mobile menu) | `components/Header.tsx` |

---

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://eu.posthog.com/project/132929/dashboard/544156
- **Contact Form Funnel** (submitted → succeeded): https://eu.posthog.com/project/132929/insights/znGUtxA8
- **Contact Form Activity** (daily trend of submit/success/fail): https://eu.posthog.com/project/132929/insights/9Bg7TKTu
- **Hero CTA Clicks** (View Work vs Contact Me breakdown): https://eu.posthog.com/project/132929/insights/Zqml2HNw
- **Project Link Clicks** (by project title): https://eu.posthog.com/project/132929/insights/qeyAYfpp
- **Navigation Engagement** (by nav label): https://eu.posthog.com/project/132929/insights/9fO5x8Nd

### Agent skill

We've left an agent skill folder in your project at `.claude/skills/posthog-integration-nextjs-app-router/`. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
