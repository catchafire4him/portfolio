export type ProjectVisual =
  "aiproconstruct" | "takeoff" | "dayrecall" | "geminiflow" | "chaos" | "assembly";

export type FeaturedProject = {
  slug: string;
  name: string;
  tagline: string;
  tags: string;
  visual: ProjectVisual;
  /** Column span in the 12-column bento grid on large screens. */
  span: 4 | 5 | 7 | 8;
  tall?: boolean;
};

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "aiproconstruct",
    name: "AiProConstruct",
    tagline:
      "The operating system for an electrical contracting business: estimates, AI takeoffs, invoicing, payments.",
    tags: "SaaS · Web + iOS + Android · In production",
    visual: "aiproconstruct",
    span: 8,
    tall: true,
  },
  {
    slug: "ai-takeoff",
    name: "AI Electrical Takeoff",
    tagline: "Reads blueprint PDFs and counts every fixture, with a person approving each count.",
    tags: "Computer vision · Gemini",
    visual: "takeoff",
    span: 4,
    tall: true,
  },
  {
    slug: "dayrecall",
    name: "DayRecall",
    tagline:
      "An all-day memory on a smartwatch, encrypted on the phone with a hardware-backed key.",
    tags: "Kotlin · Wear OS · AES-GCM",
    visual: "dayrecall",
    span: 4,
  },
  {
    slug: "geminiflow",
    name: "GeminiFlow",
    tagline: "Hold a key, speak, and your words appear in any app on your computer.",
    tags: "Rust · Tauri · Windows",
    visual: "geminiflow",
    span: 4,
  },
  {
    slug: "chaos-games",
    name: "Chaos Games",
    tagline:
      "A party game on your TV with an AI host that narrates out loud. Players join by phone.",
    tags: "Real-time · WebSockets · AI voice",
    visual: "chaos",
    span: 4,
  },
  {
    slug: "the-assembly",
    name: "The Assembly",
    tagline:
      "A private member platform for health-industry leaders: applications, payments, a member directory and events.",
    tags: "Client work · Supabase · Stripe",
    visual: "assembly",
    span: 7,
  },
];

export const moreWork = [
  { name: "Family Hub", kind: "Wall-tablet dashboard" },
  { name: "Tingler Electric", kind: "Client website" },
  { name: "Logan Land Historical Adventures", kind: "Client website" },
  { name: "Edith's Beauty Salon", kind: "Client website" },
  { name: "Slay the Spire 2 mods", kind: "C# · Steam Workshop" },
] as const;
