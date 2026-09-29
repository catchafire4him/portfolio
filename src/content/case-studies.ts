// Case-study content. Every screenshot is a real capture of the running product;
// anything personal or client-private is blurred, never replaced with made-up data.

export type Shot = {
  src: string;
  alt: string;
  width: number;
  height: number;
  frame: "browser" | "phone" | "window" | "watch";
  caption?: string;
};

export type Section = { title: string; body: string };

export type CaseStudy = {
  slug: string;
  facts: { label: string; value: string }[];
  intro: string;
  hero: Shot;
  problem: string;
  built: Section[];
  security: Section[];
  gallery: Shot[];
  numbers?: { value: string; label: string }[];
  note?: string;
  links?: { label: string; href: string }[];
};

const desktop = (src: string, alt: string, caption?: string): Shot => ({
  src,
  alt,
  caption,
  width: 2400,
  height: 1500,
  frame: "browser",
});

const phone = (src: string, alt: string, caption?: string, height = 2532): Shot => ({
  src,
  alt,
  caption,
  width: height === 2532 ? 1170 : 1080,
  height,
  frame: "phone",
});

export const caseStudies: CaseStudy[] = [
  {
    slug: "the-assembly",
    facts: [
      { label: "Role", value: "Sole developer, client team" },
      { label: "Timeline", value: "April – August 2026, three phases" },
      { label: "Stack", value: "React, TypeScript, Supabase, Stripe, Klaviyo, Resend" },
      { label: "Status", value: "Live, in active use" },
    ],
    intro:
      "An application-only membership platform for leaders across health, fitness and longevity. I built the member experience behind the public site: applying, paying, finding each other and doing deals.",
    hero: desktop(
      "/work/the-assembly/home.webp",
      "The Assembly public home page announcing its flagship gathering",
    ),
    problem:
      "The Assembly's value is who is in the room, so everything depends on getting the right people in and helping them find each other, without exposing members' information to anyone outside. The founder approves every member by hand, and some people only attend an event rather than joining. The platform had to handle both paths, take payment for each, and hold sensitive conversations members would never post publicly.",
    built: [
      {
        title: "Applications and approvals",
        body: "Three ways in: membership, event-only attendance, and a startup pitch track with a deck upload and demo video. There's a video interview step with transcription, validation at every step, and accounts created quietly after the first step so returning applicants pick up where they left off.",
      },
      {
        title: "Payments that match reality",
        body: "Stripe checkout for membership and events. I traced unreliable webhook delivery to how the signature check behaved in the Deno edge runtime and fixed the root cause. I also added an explicit 'comped' state so members activated by hand stay active.",
      },
      {
        title: "Directory and matching",
        body: "A member directory with profile completeness tracking, photo cropping and autosave. Matching v1 draws on video-interview transcripts and post-payment profile answers.",
      },
      {
        title: "Opportunities and marketplace",
        body: "Members post deals with in-browser video recording and attachments. Partner offers go live after admin approval, with click tracking. Share links show a generic preview, so nothing behind the paywall leaks.",
      },
      {
        title: "Admin console",
        body: "One place for events, guest lists, applications and notifications. It merged three separate event systems, migrated legacy RSVPs into the new model, and gave admins per-type email preferences.",
      },
    ],
    security: [
      {
        title: "Leak deterrence, stated honestly",
        body: "I wrote the recommendation for screenshot protection. It opens by saying no website can block screenshots, then proposes what actually deters leaks: friction on sensitive pages, a per-viewer identity watermark so leaked images are traceable, and an audit trail. It explains why DevTools detection and blur-on-focus-loss are theater.",
      },
      {
        title: "Password resets that survive email scanners",
        body: "Some corporate email scanners open links before the person does, which used up single-use reset links. I diagnosed it, shipped an admin temporary-password path as a stopgap, and planned a one-time-code flow as the fix.",
      },
      {
        title: "Private by default",
        body: "Postgres row-level security throughout. Member photos and media live in private storage behind short-lived signed links.",
      },
    ],
    gallery: [
      desktop(
        "/work/the-assembly/apply.webp",
        "The three application paths: membership, event attendance and startup pitch",
        "Three application paths, each with its own approval, checkout and hub.",
      ),
      phone("/work/the-assembly/home-mobile.webp", "The Assembly home page on a phone"),
    ],
    note: "Screens behind the member login are not shown, to protect members' privacy. Everything pictured is the public site.",
    links: [{ label: "theassembly.health", href: "https://theassembly.health" }],
  },
  {
    slug: "chaos-games",
    facts: [
      { label: "Role", value: "Design and development" },
      { label: "Timeline", value: "July 2026" },
      { label: "Stack", value: "TypeScript, WebSockets, Gemini, Gemini TTS, Neon" },
      { label: "Status", value: "Live on Railway" },
    ],
    intro:
      "A party game for the living room. The TV is the board, everyone's phone is their controller, and an AI host writes the story and narrates it out loud.",
    hero: desktop(
      "/work/chaos-games/hub.webp",
      "Chaos Games hub with Mafia, Whodunnit, Dungeon Run and Chaos Campaign",
    ),
    problem:
      "Party games need someone to run them, and that person never gets to play. Chaos Games hands the job to an AI host, so nobody has to sit out. It had to feel instant on a room of phones, keep everyone's secrets on their own screen, and still work when the AI is slow or offline.",
    built: [
      {
        title: "One shared engine, four games",
        body: "Mafia, Whodunnit, Dungeon Run and a multi-night campaign share the engine, lobby, QR join, timers, reconnects and voice pipeline. A new game is one module plus its TV and phone screens.",
      },
      {
        title: "An AI director with a fallback",
        body: "Gemini writes each scenario and reacts to what players do. Gemini TTS gives the host a voice. Both work down a chain of models, and with no API key at all the game still runs with a scripted host and the browser's own speech.",
      },
      {
        title: "Tested without a room full of people",
        body: "A simulator plays full bot games through every module, and a smoke test drives real WebSocket clients through a complete game, so changes are checked end to end.",
      },
    ],
    security: [
      {
        title: "Secrets stay on your phone",
        body: "Roles, private clues and secret missions go only to the player they belong to. The TV shows the public state.",
      },
      {
        title: "Accounts are optional",
        body: "Guests are the default. Signing in only adds saved campaigns and stats, and the game never depends on it.",
      },
    ],
    gallery: [
      desktop(
        "/work/chaos-games/lobby.webp",
        "Whodunnit lobby with join code, QR code and four players",
        "Players join by scanning the QR code or typing a four-letter code.",
      ),
      desktop(
        "/work/chaos-games/crime.webp",
        "The AI host sets the scene: Death at Blackwood Manor",
        "The AI host wrote this mystery on the spot.",
      ),
      desktop(
        "/work/chaos-games/evidence.webp",
        "Evidence board after the first investigation round",
      ),
      desktop(
        "/work/chaos-games/verdict.webp",
        "A player stands accused and gives an alibi",
        "The accused gives an alibi, then the room votes guilty or innocent.",
      ),
      phone("/work/chaos-games/phone-search.webp", "Phone view: choose where to search"),
      phone("/work/chaos-games/phone-suspect.webp", "Phone view: pick your prime suspect"),
      phone("/work/chaos-games/phone-verdict.webp", "Phone view: vote guilty or innocent"),
    ],
    note: "Captured from a real game on the live deployment, with four test players.",
  },
  {
    slug: "geminiflow",
    facts: [
      { label: "Role", value: "Design and development" },
      { label: "Timeline", value: "August – September 2026" },
      { label: "Stack", value: "Rust, Tauri, React, SQLite, Gemini Live API" },
      { label: "Status", value: "Daily use, version 0.6.3" },
    ],
    intro:
      "A Windows tray app for talking instead of typing. Hold a key, speak, let go, and the text lands in whatever app you were in.",
    hero: {
      src: "/work/geminiflow/dictation.webp",
      alt: "GeminiFlow dictation history showing messages dictated for this portfolio",
      width: 1174,
      height: 491,
      frame: "window",
      caption: "Real history: these are the messages I dictated while planning this site.",
    },
    problem:
      "Dictation is only worth using if it's faster than typing and never puts text in the wrong place. That comes down to a few hundred milliseconds and a lot of Windows edge cases: global hotkeys, focus, the clipboard, and apps running as administrator.",
    numbers: [
      { value: "~410 ms", label: "key release to text on screen (live path)" },
      { value: "658 → 410 ms", label: "after moving clipboard restore off the critical path" },
      { value: "20–26 s → normal", label: "stalls fixed by not reusing HTTP/2 connections" },
    ],
    built: [
      {
        title: "Low-level Windows plumbing",
        body: "A low-level keyboard hook that catches both key edges, audio capture resampled to 16 kHz with a rolling pre-buffer, focus restore, and paste injection that puts your clipboard back afterwards.",
      },
      {
        title: "Streaming with a fallback",
        body: "The live API usually finishes in well under a second, but sessions sometimes start and return nothing. So it streams first and falls back to batch transcription automatically.",
      },
      {
        title: "Decisions backed by measurements",
        body: "The plan records what was measured and which assumptions it overturned. For example, turning off connection pooling fixed dictations that stalled for 20 seconds, and the live API's binary frames were silently dropped by a text-only client.",
      },
      {
        title: "Custom vocabulary",
        body: "Up to 1,000 terms sent with every transcription, so names like Tauri, WASAPI and useCallback come out right.",
      },
    ],
    security: [
      {
        title: "The API key never touches disk",
        body: "It's stored in Windows Credential Manager, not a config file, and never written to the log.",
      },
      {
        title: "Local and pruned",
        body: "History lives in a local SQLite database, and old recordings are deleted on a schedule. No telemetry, no auto-update, no account.",
      },
      {
        title: "Refuses rather than guesses",
        body: "If it can't return focus to the window you started in, it doesn't paste at all. The transcript stays in history instead of landing somewhere you didn't intend.",
      },
    ],
    gallery: [
      {
        src: "/work/geminiflow/settings.webp",
        alt: "Settings: API key stored in Windows Credential Manager, hotkey and microphone",
        width: 1174,
        height: 781,
        frame: "window",
        caption: "The key lives in Windows Credential Manager.",
      },
      {
        src: "/work/geminiflow/diagnostics.webp",
        alt: "Diagnostics log with live session timings",
        width: 1174,
        height: 781,
        frame: "window",
        caption: "Real session timings from the diagnostics log.",
      },
    ],
  },
  {
    slug: "dayrecall",
    facts: [
      { label: "Role", value: "Design and development" },
      { label: "Timeline", value: "September 2026" },
      { label: "Stack", value: "Kotlin, Wear OS, Android, Room, Gemini" },
      { label: "Status", value: "Working prototype, personal use" },
    ],
    intro:
      "An all-day memory. A Galaxy Watch listens once you arm it, the phone stores what it hears encrypted, and at the end of the day you can search it, ask about it, or read a summary.",
    hero: phone(
      "/work/dayrecall/today.webp",
      "DayRecall Today screen with the recording-consent notice",
      "The consent notice is the first thing on screen.",
      2230,
    ),
    problem:
      "Recording a whole day is only acceptable if the person wearing it stays in control, and the recordings are safe even if the phone is lost. It also has to survive a watch battery, spotty Bluetooth and phone calls.",
    built: [
      {
        title: "Capture on the watch",
        body: "One tap arms the day, and Pause is always one tap away. Voice activity detection splits speech into chunks encoded as 16 kHz AAC. Capture pauses itself at 15% battery or when a call takes the microphone.",
      },
      {
        title: "Transfer to the phone",
        body: "Chunks travel over the Wear OS Data Layer, with an optional local-network path, and are stored on the phone in a Room database.",
      },
      {
        title: "Making it useful",
        body: "Transcription, searchable transcripts, a daily brief, a weekly summary, questions about any day, and a reminders list.",
      },
    ],
    security: [
      {
        title: "Encrypted at rest",
        body: "Every chunk is encrypted with AES-GCM on the phone. The key is created in the Android Keystore and never leaves it: not in the repo, the logs, or the watch.",
      },
      {
        title: "Verifiable",
        body: "A built-in check decrypts the newest chunk and compares its SHA-256 hash, so encryption is proven rather than assumed.",
      },
      {
        title: "Consent and cloud are explicit",
        body: "Sending audio and text to the cloud is a switch that starts off. The app reminds you that recording other people may require their consent.",
      },
    ],
    gallery: [
      {
        src: "/work/dayrecall/watch.webp",
        alt: "DayRecall on a Galaxy Watch: Ready, microphone off, Arm day button",
        width: 480,
        height: 480,
        frame: "watch",
        caption: "The watch app. Nothing is recorded until you arm the day.",
      },
      phone("/work/dayrecall/settings.webp", "Settings with cloud processing off", undefined, 2230),
      phone(
        "/work/dayrecall/transcripts.webp",
        "Transcripts for a day, content blurred",
        "Content blurred for privacy.",
        2230,
      ),
      phone(
        "/work/dayrecall/day-brief.webp",
        "Daily brief screen, content blurred",
        "Content blurred for privacy.",
        2230,
      ),
      phone(
        "/work/dayrecall/week.webp",
        "Week summary screen, content blurred",
        "Content blurred for privacy.",
        2230,
      ),
    ],
    note: "Captured from my own watch and phone. Transcripts and summaries are real, so their text is blurred.",
  },
];

export function getCaseStudy(slug: string) {
  return caseStudies.find((study) => study.slug === slug);
}
