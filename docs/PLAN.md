# Portfolio Site — Plan

Status: draft for review · 2026-09-29

## 1. Goal

A fast, clean, modern portfolio that:

1. Wins freelance and contract work by showing real, shipped projects as short case studies.
2. Holds up when a security-minded web developer inspects it: headers, CSP, dependencies, and the source code itself.
3. Can be built in pieces and shown early, before a company name exists.

The site should prove the "built well from the ground up" claim on its own. The code will be in a public repo, and a page on the site explains how it is built and secured.

---

## 2. Project review: what to feature

I reviewed all 20 GitHub repos plus the local folders in `C:\Coding`. Nearly all of them are private, so the site will show **case studies** (writeups, screenshots, short videos, architecture diagrams), not source links. Source links only go to repos that are made public on purpose.

### Tier 1 — Flagship case studies

| #   | Project                                                                             | Why it is strong                                                                                                                                                                                                                                                                                                                            | Angle                                                                                                                                                                   |
| --- | ----------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1   | **AiProConstruct** (`replitesitmator`)                                              | A production SaaS for an electrical contractor, live and in use. It covers estimating, Stripe, QuickBooks OAuth and webhooks, Neon Postgres with managed migrations, S3 storage, and Capacitor iOS/Android apps on Railway. The release process is documented: review before merge, a staging lane, production snapshots before migrations. | "Built and run a real business platform from zero." This is the main piece.                                                                                             |
| 2   | **AI Electrical Takeoff** (part of AiProConstruct, prototyped in `Takeoff feature`) | Reads blueprint PDFs and counts electrical symbols in 5 detection tiers: legend OCR, vector text, OpenCV templates, then Gemini Vision. It has a three-layer canvas, a human review step, and output that matches Accubid.                                                                                                                  | A deep technical dive. Put it on its own page even though it lives inside #1.                                                                                           |
| 3   | **GeminiFlow** (Rust + Tauri)                                                       | A Windows tray app for voice dictation. It uses a low-level keyboard hook, audio resampling, and paste injection. The API key lives in Windows Credential Manager, never on disk. `PLAN.md` records measured decisions, such as turning off HTTP/2 connection pooling after it caused stalls.                                               | Systems work and engineering driven by measurement. Security reviewers will like how the key is stored.                                                                 |
| 4   | **DayRecall** (Kotlin, Wear OS + Android)                                           | A watch captures audio and sends it to the phone, where it is encrypted at rest with AES-GCM. The key lives in the Android Keystore. Decrypts are checked with SHA-256, and the repo includes a privacy and consent doc.                                                                                                                    | "Privacy-first by design." This is probably the best piece for the security reviewer. Frame it as a personal R&D build and lead with the consent and encryption design. |
| 5   | **Chaos Games**                                                                     | A party game played in real time over WebSockets. A shared TV screen, phones join by QR code, and an AI Game Master narrates with Gemini TTS. It falls back to a no-key mode, includes a bot simulation test harness, and is deployed on Railway.                                                                                           | The fun, visual demo. Good for motion and video on the site.                                                                                                            |
| 6   | **theassembly.health** (client work)                                                | Real work for a paying client.                                                                                                                                                                                                                                                                                                              | Social proof. **I need details and the client's OK** (see Open questions).                                                                                              |

### Tier 2 — Smaller cards ("More work" grid)

- **Family Hub** (`Family-Calendar`): a wall-tablet dashboard. It uses Firebase auth and a Node proxy that keeps the Sense energy credentials on the server so they never reach the browser. That design is a good security story in a small card.
- **Client sites**: Tingler Electric, Logan Land Historical Adventures (Next.js), and Edith's Beauty Salon (public repo). These show you deliver for small businesses. Only list the ones that are live and that the owners are fine with.
- **Slay the Spire 2 mods** (AjayTheCatalyst, SpireCoopExchange; C#, published to Steam Workshop): a short "also" line. It shows range and that you ship to real users.

### Leave out, for now

Roam.ai and Shaniah-Ai (their READMEs are still the AI Studio boilerplate), Hash, Satisfactory, Chaos-Ai (replaced by chaosgames), tingler-estimator (replaced by AiProConstruct), AInvite, whisper-wit, Construct-marketing, and creighton-calendar (personal). Any of these can be promoted later once it has a real README and screenshots.

> **Before anything is made public:** run a secret scan (gitleaks) over its full git history. For example, DayRecall has `local.properties` and `.env` handling, and AiProConstruct has deploy scripts and logs. A key leaking from a portfolio repo is the one thing a security reviewer would remember.

---

## 3. Tech stack (decided 2026-09-29)

Changed from the first draft: **Vercel** hosting, **Next.js** instead of Astro, and **PostHog** analytics. Next.js is Vercel's own framework, it's React (which you already use), and it has no limit on how rich the animation gets.

| Layer     | Choice                                                                                                                                                                                                                                                                 | Why                                                                                               |
| --------- | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| Framework | **Next.js** (App Router) + TypeScript (strict)                                                                                                                                                                                                                         | Familiar React, first-class on Vercel. Case studies are MDX files with a typed schema.            |
| Styling   | **Tailwind CSS v4** + CSS custom-property design tokens                                                                                                                                                                                                                | Clean, consistent, easy dark and light themes.                                                    |
| Motion    | **Motion** (motion.dev, formerly Framer Motion) for reveals, hovers and layout animation; the **View Transitions API** for card-to-case-study morphs; **GSAP** (now free, including ScrollTrigger) only if a hero moment needs it; optional **Lenis** smooth scrolling | Room for real flash. All of it respects `prefers-reduced-motion`.                                 |
| Fonts     | `next/font` with **Geist, Geist Mono, Instrument Serif**                                                                                                                                                                                                               | Self-hosted at build time, so there's no Google Fonts request and nothing third-party in the CSP. |
| Hosting   | **Vercel**                                                                                                                                                                                                                                                             | Keeps everything in one place with your other projects. Preview deploys on every PR.              |
| Contact   | Route handler → **Resend** email, **Cloudflare Turnstile** or **Vercel BotID** bot check, **zod** validation, **Upstash** rate limiting (Vercel Marketplace)                                                                                                           | No database and no stored personal data.                                                          |
| Analytics | **PostHog**, cookieless, sent through a first-party `/ingest` rewrite                                                                                                                                                                                                  | Same tool you already use. See section 4 for the privacy setup.                                   |

---

## 4. Security plan (the part the reviewer will check)

**Target scores:** A+ on Mozilla Observatory and securityheaders.com, 100 on all four Lighthouse categories, and an A+ SSL Labs grade.

### HTTP headers (`next.config.ts` `headers()` + Next's `proxy.ts` for the CSP)

- `Content-Security-Policy`: `default-src 'self'`; scripts allowed by a **per-request nonce** with `'strict-dynamic'`, with no `'unsafe-inline'` for scripts; `frame-ancestors 'none'`; `base-uri 'self'`; `form-action 'self'`; `object-src 'none'`; `upgrade-insecure-requests`. Only the bot-check widget is allowed as a third party, and only on `/contact`. Nonces mean pages render per request instead of being fully static. At portfolio traffic that costs nothing noticeable, and it's the pattern Next.js documents.
- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`, then submit the domain to the HSTS preload list.
- `X-Content-Type-Options: nosniff`, `Referrer-Policy: strict-origin-when-cross-origin`, and `Permissions-Policy` that turns off camera, mic, geolocation, and the rest.
- `Cross-Origin-Opener-Policy: same-origin` and `Cross-Origin-Resource-Policy: same-origin`.
- Start with CSP in `Report-Only` mode, then enforce it once no violations show up.

### Contact endpoint

- Validate on the server with zod, set length caps, and strip or escape everything that goes into the email.
- Verify the bot-check token on the server. Rate-limit by IP with Upstash. Add a honeypot field.
- Keep secrets in Vercel environment variables only (marked Sensitive). `.env.example` lists names, never values.
- Return generic errors to the client and log details on the server only.

### PostHog, done privately

- **First-party proxy:** a Next.js rewrite sends `/ingest/*` to PostHog, so the CSP stays `connect-src 'self'` and ad blockers don't break it.
- **Cookieless:** use PostHog's cookieless mode or memory persistence, so no cookie banner is needed.
- **Session replay:** off, or on with every input masked. It never runs on `/contact`.
- The colophon states exactly what is collected.

### Domain and DNS

- DNSSEC on, CAA records limiting certificates to the chosen issuer, and TLS 1.2+ only.
- If email is sent from the domain: SPF, DKIM, and `DMARC p=reject`.
- `/.well-known/security.txt` with a contact address and an expiry date.

### Supply chain and CI (GitHub Actions)

- Commit the lockfile and install with `npm ci`. Keep dependencies few; each one should earn its place.
- **Renovate** or Dependabot, `npm audit` in CI, **CodeQL**, and **gitleaks** on every push.
- Pin Actions to commit SHAs with least-privilege `permissions:`, and protect `main` once the repo is public.
- Lighthouse CI and an Observatory check on every PR, so a regression fails the build.

### Show it on the site

- A **`/colophon`** ("How this site is built") page. It lists the stack, the actual header values, a CSP explanation, the CI pipeline, and scores, and links to the public repo. Most portfolios skip this. For your reviewer it is the page that matters most.
- Each flagship case study gets a short **"Security considerations"** section: Keystore encryption in DayRecall, Credential Manager in GeminiFlow, OAuth and webhook signature checks plus migration safety in AiProConstruct, and server-held secrets in Family Hub.

---

## 5. Design direction

**Feel:** Calm, precise, modern. Lots of space, strong type, one accent color. Motion is smooth and purposeful, never flashy.

- **Theme:** Dark first (near-black `#0A0A0B`, not pure black), with a matching light theme and a toggle that follows the system setting.
- **Color:** Neutral grays plus **one** accent, for example electric blue or lime. It can nod to your construction and electrical work without copying AiProConstruct's brand. Final pick after we see it on screen.
- **Type:** Geist Sans for large, tight headlines. Geist Mono for labels, tech tags, and small metadata, which gives a subtle engineering feel.
- **Layout:** A **bento grid** for featured work on the home page, a max width around 1200px, and a mobile-first layout.

### Motion (clean, not busy)

| Where             | Effect                                                                                                                                              |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------------------- |
| Hero              | The headline reveals line by line with a staggered fade-up. A subtle animated grid or gradient mesh sits in the background, pure CSS and GPU-cheap. |
| Scrolling         | Sections fade and slide up about 16px as they enter, once only, using CSS scroll-driven animations.                                                 |
| Project cards     | A spotlight follows the cursor across the card edge, the image zooms slightly on hover, and the arrow nudges.                                       |
| Card → case study | A **View Transition** morphs the card image into the case study hero. This is the "wow" moment.                                                     |
| Navigation        | Frosted glass (`backdrop-filter`), and it hides on scroll down and shows on scroll up.                                                              |
| Buttons and links | An animated underline and a subtle magnetic pull on the main call-to-action.                                                                        |
| Reduced motion    | Everything above turns into simple fades or no motion.                                                                                              |

Rule: never more than one moving thing competing for attention on screen, and no scroll-jacking.

---

## 6. Site map and content

```
/                 Home: hero, featured work (bento), what I build, short about, call to action
/work             All projects, filterable by type (Web App · Mobile · AI · Desktop · Client Site)
/work/[slug]      Case study template (below)
/about            Story, how you work (including AI-assisted development), tools
/services         What you offer: custom web apps, AI integrations, small business sites, mobile
/contact          Form and email
/colophon         How this site is built and secured
/404              Designed, not default
```

**Case study template:** a one-line summary and key facts (role, timeline, stack, status) → the problem → what was built (screenshots or video) → an architecture diagram → key decisions and tradeoffs → security considerations → results or what's next.

**Positioning (a draft to react to):** "I build production software with AI, from idea to deployed app." Being honest about the AI-first workflow is a selling point, especially since the projects show real engineering discipline: review before merge, measured decisions, and tests.

**Assets to collect:** clean screenshots and 10–20 second screen recordings (WebM or MP4, muted, looping) for each Tier 1 project, a headshot or avatar, and a short bio.

---

## 7. Build phases

| Phase                          | Deliverable                                                                                                                                                                                                   | Output you can show                              |
| ------------------------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------ |
| **0 · Decisions**              | Answer the open questions, choose a domain and name, gather assets                                                                                                                                            | —                                                |
| **1 · Foundation**             | Next.js, TS, and Tailwind scaffold, design tokens, fonts, the security headers and nonce CSP, PostHog through `/ingest`, the CI pipeline (lint, types, audit, gitleaks, CodeQL, Lighthouse), deploy to Vercel | A live URL with an A+ headers grade from day one |
| **2 · Shell and home**         | Layout, nav, footer, theme toggle, hero with motion, bento grid (placeholder content)                                                                                                                         | The first version to show your contact           |
| **3 · Case studies**           | MDX schema, case study template, the 5 flagship writeups, View Transitions                                                                                                                                    | The real portfolio                               |
| **4 · Contact**                | Route handler, bot check, Resend, Upstash rate limiting, tests                                                                                                                                                | A working inquiry flow                           |
| **5 · Colophon and hardening** | `/colophon`, CSP switched from report-only to enforced, security.txt, DNSSEC/CAA, accessibility pass (WCAG 2.2 AA), performance budget                                                                        | Security review ready                            |
| **6 · Launch**                 | HSTS preload submission, sitemap, Open Graph images, make the repo public                                                                                                                                     | Share it                                         |

Phases 1–2 are enough to show your contact something real. Phase 5 is what makes the security story airtight.

---

## 8. Decisions and open items

**Decided (2026-09-29)**

- **Name:** personal name for now; a company brand can come later. Domain still to pick (e.g. `aarontingler.dev`).
- **Hosting and framework:** Vercel + Next.js. **Analytics:** PostHog, set up as in section 4.
- **The Assembly:** show the public site only (screenshots from theassembly.health). The members-only side stays private: describe that work in general terms, with no client names, member data or internal screens. Source material is in Slack docs, which you'll point me to.
- **DayRecall:** included, framed as a working R&D build with privacy and encryption up front.
- **Design:** mockups on the canvas "Portfolio Design Mockups" (Direction A dark, recommended; Direction B light).

**Public source (recommendation)**

| Repo           | Public?                                | Why                                                                                          |
| -------------- | -------------------------------------- | -------------------------------------------------------------------------------------------- |
| This portfolio | **Yes, from day one**                  | The code is part of the pitch.                                                               |
| GeminiFlow     | **Yes, after a gitleaks history scan** | Its README and PLAN.md show careful, measured engineering, and no business data is involved. |
| Chaos Games    | Optional, after a scan                 | A fun, readable codebase. Fine either way.                                                   |
| AiProConstruct | **No**                                 | A live business with customer data and payment integrations. Case study only.                |
| DayRecall      | **No**                                 | Personal, and it has your name and device setup in it. Case study only.                      |
| Family Hub     | **No**                                 | Home setup and energy account integration.                                                   |

**Still open**

1. **AiProConstruct:** Is your dad OK with screenshots and naming the business? Is there a demo account with fake data for screenshots?
2. **The Assembly:** a pointer to the Slack docs, plus one line on what you built.
3. **Services and pricing:** see the suggestions in chat, then pick what fits.
4. **Domain:** pick and buy one.
