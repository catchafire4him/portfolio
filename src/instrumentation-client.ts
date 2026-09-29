import posthog from "posthog-js";

// Analytics is off unless a key is configured, so local development and
// preview builds without the variable send nothing.
const key = process.env.NEXT_PUBLIC_POSTHOG_KEY;

if (key) {
  posthog.init(key, {
    // First-party path, rewritten to PostHog in next.config.ts.
    api_host: "/ingest",
    ui_host:
      process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu"
        ? "https://eu.posthog.com"
        : "https://us.posthog.com",
    defaults: "2025-05-24",
    // No cookies or localStorage: each page load is anonymous.
    persistence: "memory",
    disable_session_recording: true,
    respect_dnt: true,
    person_profiles: "identified_only",
  });
}
