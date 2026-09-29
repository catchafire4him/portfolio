import type { Metadata } from "next";
import { headers } from "next/headers";
import pkg from "../../../package.json";
import { Reveal } from "@/components/motion/Reveal";
import { Check } from "@/components/ui/icons";
import { cspDirectives, securityHeaders } from "@/lib/security";
import { site } from "@/content/site";

export const metadata: Metadata = {
  title: "How this site is built",
  description:
    "The stack, security headers, Content Security Policy, analytics setup and CI checks behind this site, read from the code that serves it.",
  alternates: { canonical: "/colophon" },
  openGraph: {
    url: "/colophon",
    title: "How this site is built",
    description:
      "Security headers, CSP, analytics and CI checks, rendered from the code that serves the site.",
  },
};

const REPO = "https://github.com/catchafire4him/portfolio";
const SITE = "https://aarontingler.vercel.app";

const ci = [
  { step: "Formatting", detail: "Prettier check" },
  { step: "Lint", detail: "ESLint with the Next.js rules" },
  { step: "Types", detail: "Strict TypeScript, with generated route types" },
  { step: "Build", detail: "Full production build" },
  {
    step: "Dependency audit",
    detail: "npm audit on production dependencies, fails on high severity",
  },
  { step: "Secret scan", detail: "gitleaks over the entire git history, binary checksum-verified" },
  { step: "Code scanning", detail: "CodeQL security-extended queries, on every push and weekly" },
  { step: "Updates", detail: "Dependabot for npm packages and GitHub Actions, weekly" },
];

const tradeoffs = [
  {
    title: "Per-request rendering",
    body: "A nonce has to be new on every request, so pages render per request instead of being served as static files. At portfolio traffic that costs nothing noticeable, and it means no inline script runs without permission.",
  },
  {
    title: "Inline style attributes",
    body: "style-src-attr allows inline style attributes. A few components set per-element values that way. It's the one relaxation in the policy, and style attributes can't execute script.",
  },
  {
    title: "Not on the HSTS preload list yet",
    body: "The header carries the preload directive, but the list only accepts registrable domains. This site is on a vercel.app subdomain until it has its own domain.",
  },
  {
    title: "A simple rate limit",
    body: "The contact form's rate limit lives in the server function's memory. It stops one client from hammering the form, but resets on cold starts and isn't shared between instances. A firewall-level limit is the next step.",
  },
];

function Heading({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-3 lg:col-span-4">
      <span className="text-subtle font-mono text-[13px]">{index}</span>
      <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">{children}</h2>
    </div>
  );
}

function Code({ children }: { children: React.ReactNode }) {
  return (
    <code className="bg-surface-2 text-fg rounded-md px-1.5 py-0.5 font-mono text-[13px]">
      {children}
    </code>
  );
}

export default async function ColophonPage() {
  const nonce = (await headers()).get("x-nonce") ?? "";
  const deps = Object.keys(pkg.dependencies);
  const version = (name: keyof typeof pkg.dependencies | keyof typeof pkg.devDependencies) =>
    (
      (pkg.dependencies as Record<string, string>)[name] ??
      (pkg.devDependencies as Record<string, string>)[name]
    )?.replace(/^[\^~]/, "");

  const stack = [
    { name: "Next.js", detail: `${version("next")}, App Router` },
    { name: "React", detail: version("react") },
    { name: "TypeScript", detail: "strict mode" },
    { name: "Tailwind CSS", detail: version("tailwindcss") },
    { name: "Motion", detail: `${version("motion")}, header only; everything else is CSS` },
    { name: "PostHog", detail: `posthog-js ${version("posthog-js")}` },
    { name: "Hosting", detail: "Vercel" },
  ];

  return (
    <article className="mx-auto flex max-w-[1312px] flex-col px-4 pt-16 pb-32 sm:px-8 md:pt-24">
      <header className="flex max-w-[900px] flex-col gap-6">
        <span className="rise text-accent font-mono text-[13px] tracking-[0.1em]">COLOPHON</span>
        <h1
          className="rise text-5xl leading-[0.95] font-semibold tracking-[-0.045em] md:text-[88px]"
          style={{ animationDelay: "0.08s" }}
        >
          How this site is <span className="text-accent font-serif font-normal italic">built.</span>
        </h1>
        <p className="rise text-muted text-xl leading-snug" style={{ animationDelay: "0.16s" }}>
          Everything below is rendered from the same code that serves the site. The headers, the
          policy and the version numbers can&apos;t drift from what&apos;s actually running.
        </p>
      </header>

      <div className="mt-24 flex flex-col gap-24">
        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="01">Stack</Heading>
          <div className="flex flex-col gap-4 lg:col-span-8">
            <dl className="border-line grid border-t sm:grid-cols-2">
              {stack.map((item) => (
                <div
                  key={item.name}
                  className="border-line flex justify-between gap-4 border-b py-4 pr-6"
                >
                  <dt>{item.name}</dt>
                  <dd className="text-subtle text-right font-mono text-sm">{item.detail}</dd>
                </div>
              ))}
            </dl>
            <p className="text-muted leading-relaxed">
              {deps.length} runtime dependencies in total: <Code>{deps.join(", ")}</Code>. Fonts
              (Geist, Geist Mono, Instrument Serif) are downloaded at build time and served from
              this domain. There are no third-party scripts, fonts or embeds.
            </p>
          </div>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="02">Content Security Policy</Heading>
          <div className="flex flex-col gap-6 lg:col-span-8">
            <p className="text-muted leading-relaxed">
              Every response carries a fresh random nonce, and only scripts holding it may run. The
              nonce for the page you&apos;re reading is <Code>{nonce}</Code>. Reload and it changes.
            </p>
            <div className="border-line overflow-hidden rounded-2xl border">
              {cspDirectives.map((d) => (
                <div
                  key={d.name}
                  className="border-line grid gap-2 border-b p-5 last:border-b-0 md:grid-cols-[220px_1fr]"
                >
                  <div className="flex flex-col gap-1.5">
                    <span className="text-accent font-mono text-sm">{d.name}</span>
                    <span className="text-subtle font-mono text-xs break-all">
                      {d.values("…", false).join(" ")}
                    </span>
                  </div>
                  <p className="text-muted text-[15px] leading-relaxed">{d.why}</p>
                </div>
              ))}
              <div className="grid gap-2 p-5 md:grid-cols-[220px_1fr]">
                <span className="text-accent font-mono text-sm">upgrade-insecure-requests</span>
                <p className="text-muted text-[15px] leading-relaxed">
                  Any stray http:// request is upgraded to HTTPS.
                </p>
              </div>
            </div>
          </div>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="03">Response headers</Heading>
          <div className="border-line overflow-hidden rounded-2xl border lg:col-span-8">
            {securityHeaders.map((h) => (
              <div
                key={h.key}
                className="border-line flex flex-col gap-2 border-b p-5 last:border-b-0"
              >
                <div className="flex flex-col gap-1 md:flex-row md:items-baseline md:justify-between md:gap-6">
                  <span className="font-mono text-sm">{h.key}</span>
                  <span className="text-subtle font-mono text-xs break-all md:text-right">
                    {h.value}
                  </span>
                </div>
                <p className="text-muted text-[15px] leading-relaxed">{h.why}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="04">Analytics</Heading>
          <ul className="flex flex-col gap-3 lg:col-span-8">
            {[
              "PostHog, loaded only on the production site. Previews and local development send nothing.",
              "Requests go to /ingest on this domain and are forwarded from there, so the browser never talks to a third party and the CSP stays 'self'.",
              "Nothing is stored in cookies, localStorage or sessionStorage. Every visit is anonymous, so there is no cookie banner.",
              "Session recording is off. Do Not Track is honored.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="text-accent mt-1 size-4 shrink-0" />
                <span className="text-muted leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="05">Contact form</Heading>
          <ul className="flex flex-col gap-3 lg:col-span-8">
            {[
              "The form posts JSON to one route. Requests from any other origin, or with another content type, are refused before anything is read.",
              "The same validation schema runs in the browser and on the server. The server's check is the one that counts: length limits on every field, a real email address, a fixed list of project types, and no control characters in single-line fields, so nobody can inject email headers.",
              "Bodies over 16 KB are rejected. Each IP gets five attempts per ten minutes.",
              "A hidden honeypot field and a minimum fill time catch simple bots. They get a normal-looking success, so they learn nothing, and nothing is sent.",
              "The message goes out as plain-text email through Resend's API, called with fetch (no SDK). Nothing is stored on this site, and the visitor's message is never written to the logs.",
              "No CAPTCHA and no third-party bot-detection script. That would mean fingerprinting every visitor for a form most of them never touch.",
            ].map((line) => (
              <li key={line} className="flex gap-3">
                <Check className="text-accent mt-1 size-4 shrink-0" />
                <span className="text-muted leading-relaxed">{line}</span>
              </li>
            ))}
          </ul>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="06">On every push</Heading>
          <div className="grid gap-3 sm:grid-cols-2 lg:col-span-8">
            {ci.map((c) => (
              <div key={c.step} className="bg-surface flex flex-col gap-1.5 rounded-xl p-5">
                <span className="font-semibold">{c.step}</span>
                <span className="text-muted text-sm leading-relaxed">{c.detail}</span>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="07">Tradeoffs</Heading>
          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
            {tradeoffs.map((t) => (
              <div key={t.title} className="border-line flex flex-col gap-2 rounded-2xl border p-6">
                <h3 className="font-semibold">{t.title}</h3>
                <p className="text-muted text-[15px] leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="08">Screenshots</Heading>
          <p className="text-muted text-lg leading-relaxed lg:col-span-8">
            Every screenshot in the case studies is a real capture of the running product. Where it
            shows a customer, a client or someone&apos;s personal data, that part is blurred. It is
            never swapped for invented data.
          </p>
        </Reveal>

        <Reveal as="section" className="grid gap-8 lg:grid-cols-12">
          <Heading index="09">Check it yourself</Heading>
          <div className="flex flex-col gap-5 lg:col-span-8">
            <pre className="bg-surface-2 overflow-x-auto rounded-xl p-5 font-mono text-sm">
              <code>curl -sI {SITE}</code>
            </pre>
            <div className="flex flex-wrap gap-x-8 gap-y-3">
              {[
                { label: "Source on GitHub", href: REPO },
                { label: "Security policy", href: `${REPO}/blob/main/SECURITY.md` },
                { label: "security.txt", href: "/.well-known/security.txt" },
                {
                  label: "securityheaders.com",
                  href: `https://securityheaders.com/?q=${encodeURIComponent(SITE)}&followRedirects=on`,
                },
                {
                  label: "Mozilla Observatory",
                  href: `https://developer.mozilla.org/en-US/observatory/analyze?host=${new URL(SITE).host}`,
                },
              ].map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  rel="noopener noreferrer"
                  className="link-u text-accent"
                >
                  {l.label} ↗
                </a>
              ))}
            </div>
            <p className="text-subtle text-sm">
              Found a problem? Report it privately through the security policy. {site.name} will
              reply within three business days.
            </p>
          </div>
        </Reveal>
      </div>
    </article>
  );
}
