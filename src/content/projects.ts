export type Cover = {
  src: string;
  alt: string;
  width: number;
  height: number;
  frame: "screen" | "phone";
};

export type FeaturedProject = {
  slug: string;
  name: string;
  tagline: string;
  tags: string;
  /** Column span in the 12-column bento grid on large screens. */
  span: 4 | 5 | 7 | 8;
  tall?: boolean;
  /** A real screenshot. Projects without one show a plain pattern, never mock data. */
  cover?: Cover;
};

const screen = (src: string, alt: string, width = 2400, height = 1500): Cover => ({
  src,
  alt,
  width,
  height,
  frame: "screen",
});

export const featuredProjects: FeaturedProject[] = [
  {
    slug: "aiproconstruct",
    name: "AiProConstruct",
    tagline:
      "The operating system for an electrical contracting business: estimates, AI takeoffs, invoicing, payments.",
    tags: "SaaS · Web + iOS + Android · In production",
    cover: screen("/work/aiproconstruct/estimate.webp", "An approved AiProConstruct estimate"),
    span: 8,
    tall: true,
  },
  {
    slug: "ai-takeoff",
    cover: screen(
      "/work/ai-takeoff/sheets.webp",
      "AI takeoff with detected symbols on a power plan",
    ),
    name: "AI Electrical Takeoff",
    tagline: "Reads blueprint PDFs and counts every fixture, with a person approving each count.",
    tags: "Computer vision · Gemini",
    span: 4,
    tall: true,
  },
  {
    slug: "dayrecall",
    name: "DayRecall",
    tagline:
      "An all-day memory on a smartwatch, encrypted on the phone with a hardware-backed key.",
    tags: "Kotlin · Wear OS · AES-GCM",
    cover: {
      src: "/work/dayrecall/today.webp",
      alt: "DayRecall Today screen",
      width: 1080,
      height: 2230,
      frame: "phone",
    },
    span: 4,
  },
  {
    slug: "geminiflow",
    name: "GeminiFlow",
    tagline: "Hold a key, speak, and your words appear in any app on your computer.",
    tags: "Rust · Tauri · Windows",
    cover: screen("/work/geminiflow/dictation.webp", "GeminiFlow dictation history", 1163, 778),
    span: 4,
  },
  {
    slug: "chaos-games",
    name: "Chaos Games",
    tagline:
      "A party game on your TV with an AI host that narrates out loud. Players join by phone.",
    tags: "Real-time · WebSockets · AI voice",
    cover: screen("/work/chaos-games/crime.webp", "Chaos Games: the AI host opens a Whodunnit"),
    span: 4,
  },
  {
    slug: "the-assembly",
    name: "The Assembly",
    tagline:
      "A private member platform for health-industry leaders: applications, payments, a member directory and events.",
    tags: "Client work · Supabase · Stripe",
    cover: screen("/work/the-assembly/home.webp", "The Assembly home page"),
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
