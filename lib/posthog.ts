/**
 * Safe PostHog helper — returns the PostHog instance if loaded,
 * or a no-op stub if it hasn't initialized yet.
 * This avoids importing posthog-js directly in components,
 * which would pull the entire library into the initial bundle.
 */

type PostHogLike = {
  capture: (event: string, properties?: Record<string, unknown>) => void;
  get_distinct_id: () => string;
  get_session_id: () => string;
  captureException: (error: unknown) => void;
};

const noop = () => {};
const noopString = () => "";

const stub: PostHogLike = {
  capture: noop,
  get_distinct_id: noopString,
  get_session_id: noopString,
  captureException: noop,
};

export function getPostHog(): PostHogLike {
  if (typeof window !== "undefined") {
    try {
      // posthog-js attaches itself to window when initialized
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const ph = (window as any).posthog;
      if (ph && typeof ph.capture === "function") {
        return ph as PostHogLike;
      }
    } catch {
      // silently fall back to stub
    }
  }
  return stub;
}
