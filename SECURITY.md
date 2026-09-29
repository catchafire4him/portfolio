# Security policy

## Reporting a vulnerability

Please report security issues privately through
[GitHub security advisories](https://github.com/catchafire4him/portfolio/security/advisories/new),
not in public issues. You'll get a reply within three business days.

In scope: this site and its source. Out of scope: denial of service, social engineering,
and findings that need a compromised device or browser.

## What this site does

- **Content Security Policy** with a fresh nonce per request and `'strict-dynamic'`
  ([src/proxy.ts](src/proxy.ts)). No `'unsafe-inline'` scripts. Inline style _attributes_
  are allowed for per-element values like animation delays; they cannot run script.
- **Transport and browser headers** ([next.config.ts](next.config.ts)): HSTS with preload,
  `nosniff`, `frame-ancestors 'none'` plus `X-Frame-Options: DENY`, a strict referrer policy,
  a Permissions-Policy that turns off camera, mic, location and similar APIs, and
  same-origin COOP/CORP.
- **Analytics** (PostHog) loads only when configured, sends through this site's own `/ingest`
  path, stores nothing in cookies or localStorage, and has session recording off.
- **No third-party scripts, fonts or embeds.** Fonts are self-hosted at build time.
- **CI** runs lint, type checks, a production build, `npm audit`, gitleaks secret scanning
  and CodeQL on every push and pull request. Dependabot keeps dependencies and Actions current.
