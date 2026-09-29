// Single source of truth for the site's security headers. next.config.ts sends
// them, src/proxy.ts builds the CSP, and /colophon renders these exact values.

export type HeaderSpec = { key: string; value: string; why: string };

export const securityHeaders: HeaderSpec[] = [
  {
    key: "Strict-Transport-Security",
    value: "max-age=63072000; includeSubDomains; preload",
    why: "HTTPS only, remembered for two years, so a first visit can't be downgraded later.",
  },
  {
    key: "X-Content-Type-Options",
    value: "nosniff",
    why: "Browsers use the declared file type instead of guessing, which blocks some content-sniffing attacks.",
  },
  {
    key: "X-Frame-Options",
    value: "DENY",
    why: "No other site can frame this one. Kept for older browsers; the CSP's frame-ancestors covers newer ones.",
  },
  {
    key: "Referrer-Policy",
    value: "strict-origin-when-cross-origin",
    why: "Other sites see only the domain you came from, never the full URL.",
  },
  {
    key: "Permissions-Policy",
    value: [
      "accelerometer=()",
      "autoplay=()",
      "camera=()",
      "display-capture=()",
      "geolocation=()",
      "gyroscope=()",
      "magnetometer=()",
      "microphone=()",
      "payment=()",
      "usb=()",
      "browsing-topics=()",
    ].join(", "),
    why: "Turns off device and tracking APIs this site never needs, so nothing can ask for them.",
  },
  {
    key: "Cross-Origin-Opener-Policy",
    value: "same-origin",
    why: "Pages opened from other sites can't reach back into this window.",
  },
  {
    key: "Cross-Origin-Resource-Policy",
    value: "same-origin",
    why: "Other sites can't embed this site's files.",
  },
  {
    key: "X-DNS-Prefetch-Control",
    value: "off",
    why: "No speculative DNS lookups for links on the page.",
  },
];

type Directive = { name: string; values: (nonce: string, isDev: boolean) => string[]; why: string };

export const cspDirectives: Directive[] = [
  {
    name: "default-src",
    values: () => ["'self'"],
    why: "Anything not listed below may only load from this site.",
  },
  {
    name: "script-src",
    values: (nonce, isDev) => [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    why: "Scripts run only if they carry this request's random nonce, or were loaded by one that does. Injected scripts don't have it.",
  },
  {
    name: "style-src-elem",
    values: (nonce, isDev) => ["'self'", isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`],
    why: "Stylesheets and <style> tags need the same nonce.",
  },
  {
    name: "style-src-attr",
    values: () => ["'unsafe-inline'"],
    why: "The one deliberate allowance. Components set a few per-element values inline (animation delays, image sizes). Style attributes can't run script.",
  },
  {
    name: "img-src",
    values: () => ["'self'", "blob:", "data:"],
    why: "Images come from this site only.",
  },
  {
    name: "font-src",
    values: () => ["'self'"],
    why: "Fonts are self-hosted at build time. No font CDN.",
  },
  {
    name: "connect-src",
    values: () => ["'self'"],
    why: "The page can only call this site. Analytics goes through /ingest here, not a third-party domain.",
  },
  { name: "media-src", values: () => ["'self'"], why: "Audio and video from this site only." },
  { name: "worker-src", values: () => ["'self'", "blob:"], why: "Workers from this site only." },
  { name: "manifest-src", values: () => ["'self'"], why: "App manifest from this site only." },
  { name: "object-src", values: () => ["'none'"], why: "No plugins or <object> embeds at all." },
  {
    name: "base-uri",
    values: () => ["'self'"],
    why: "Injected <base> tags can't redirect relative links elsewhere.",
  },
  { name: "form-action", values: () => ["'self'"], why: "Forms can only submit to this site." },
  {
    name: "frame-ancestors",
    values: () => ["'none'"],
    why: "Nobody can put this site in a frame (clickjacking).",
  },
  { name: "frame-src", values: () => ["'none'"], why: "This site frames nothing." },
];

export function buildCsp(nonce: string, isDev: boolean): string {
  const policy = cspDirectives
    .map((d) => `${d.name} ${d.values(nonce, isDev).join(" ")}`)
    .join("; ");
  return isDev ? policy : `${policy}; upgrade-insecure-requests`;
}
