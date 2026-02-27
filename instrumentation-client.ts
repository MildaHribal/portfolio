// PostHog is loaded lazily via requestIdleCallback to avoid blocking the main thread.
// This eliminates ~54.5 KiB of render-blocking JavaScript during initial page load.

if (typeof window !== 'undefined') {
  let posthogInitialized = false;

  const initPostHog = () => {
    if (posthogInitialized) return;
    posthogInitialized = true;

    import('posthog-js').then(({ default: posthog }) => {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY!, {
        api_host: "/ingest",
        ui_host: "https://eu.posthog.com",
        defaults: "2026-01-30",
        capture_exceptions: true,
        debug: process.env.NODE_ENV === "development",
      });
    });

    // Cleanup listeners
    ['mousemove', 'scroll', 'touchstart', 'keydown'].forEach((event) => {
      window.removeEventListener(event, initPostHog, { capture: true });
    });
  };

  // Wait for user interaction to load PostHog
  ['mousemove', 'scroll', 'touchstart', 'keydown'].forEach((event) => {
    window.addEventListener(event, initPostHog, { once: true, passive: true, capture: true });
  });

  // Fallback if no interaction after 5 seconds
  setTimeout(initPostHog, 5000);
}

// IMPORTANT: Never combine this approach with other client-side PostHog initialization
// approaches, especially components like a PostHogProvider. instrumentation-client.ts
// is the correct solution for initializing client-side PostHog in Next.js 15.3+ apps.
