export const site = {
  name: "Aaron Tingler",
  initials: "AT",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aarontingler.vercel.app",
  title: "Aaron Tingler — Software Developer",
  description:
    "Custom web apps, AI features and mobile apps for small businesses. Designed, built, secured and deployed by one developer.",
  // Set NEXT_PUBLIC_CONTACT_EMAIL once the domain mailbox exists.
  email: process.env.NEXT_PUBLIC_CONTACT_EMAIL ?? null,
  github: "https://github.com/catchafire4him",
  stack: [
    "TypeScript",
    "React",
    "Node",
    "Rust",
    "Kotlin",
    "Postgres",
    "Gemini",
    "Stripe",
    "Capacitor",
    "Vercel",
  ],
} as const;

export const services = [
  {
    title: "Business web apps",
    body: "Estimating, scheduling, invoicing, customer portals. Built around how your team actually works.",
  },
  {
    title: "AI features",
    body: "Document reading, voice, assistants and automation added to the tools you already use.",
  },
  {
    title: "Websites",
    body: "Fast, secure sites for small businesses that load instantly and are easy to update.",
  },
  {
    title: "Mobile apps",
    body: "iOS and Android apps from the same codebase as your web app.",
  },
] as const;

export const securityPractices = [
  { label: "Strict Content Security Policy", tag: "CSP" },
  { label: "HTTPS only, enforced with HSTS", tag: "HSTS" },
  { label: "Cookieless, first-party analytics", tag: "POSTHOG" },
  { label: "Secret scanning on every push", tag: "CI" },
  { label: "Dependencies audited automatically", tag: "CI" },
  { label: "Responsible disclosure contact", tag: "SECURITY.TXT" },
] as const;
