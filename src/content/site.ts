export const site = {
  name: "Aaron Tingler",
  initials: "AT",
  url: process.env.NEXT_PUBLIC_SITE_URL ?? "https://aarontingler.vercel.app",
  title: "Aaron Tingler, Software Developer",
  description:
    "Custom web apps, AI features and mobile apps for small businesses. Designed, built and deployed by one developer.",
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
    body: "Fast sites for small businesses that load instantly and are easy to update.",
  },
  {
    title: "Mobile apps",
    body: "iOS and Android apps from the same codebase as your web app.",
  },
] as const;

export const strengths = [
  {
    title: "I ship whole products",
    body: "Design, back end, web, mobile and deployment, all by one person. AiProConstruct runs a real contracting business on web, iOS and Android from a single codebase.",
  },
  {
    title: "I make AI do real work",
    body: "Reading blueprint sets, taking dictation that usually lands in under a second, hosting a party game out loud. Each has a person in the loop where it matters, or a fallback for when the AI is slow.",
  },
  {
    title: "I build around how the business runs",
    body: "Estimates become jobs, jobs become invoices, and invoices get paid online. The software follows the work instead of making the team learn a new process.",
  },
  {
    title: "I keep improving it after launch",
    body: "The Assembly's member platform grew across three phases from April to August 2026: applications, payments, a member directory and a marketplace.",
  },
] as const;

// Figures from the live AiProConstruct app as of September 2026.
export const stats = [
  { value: "384", label: "estimates written in the app" },
  { value: "75", label: "jobs tracked, 44 completed" },
  { value: "5", label: "platforms shipped: web, iOS, Android, Windows and Wear OS" },
] as const;
