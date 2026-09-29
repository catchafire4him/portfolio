# Portfolio

Personal portfolio of Aaron Tingler: case studies of shipped software, built to production standards.

- **Stack:** Next.js 16 (App Router), React 19, TypeScript (strict), Tailwind CSS v4, Motion.
- **Hosting:** Vercel.
- **Security:** per-request nonce CSP, HSTS preload, strict browser headers, first-party cookieless
  analytics, secret scanning and CodeQL in CI. Details in [SECURITY.md](SECURITY.md).
- **Plan and decisions:** [docs/PLAN.md](docs/PLAN.md).

## Develop

```bash
npm install
cp .env.example .env.local   # optional: analytics key, contact email
npm run dev
```

| Script                 | What it does                                 |
| ---------------------- | -------------------------------------------- |
| `npm run dev`          | Dev server (CSP relaxed for hot reload only) |
| `npm run build`        | Production build                             |
| `npm run start`        | Serve the production build locally           |
| `npm run lint`         | ESLint                                       |
| `npm run typecheck`    | Generate route types and run `tsc`           |
| `npm run format:check` | Prettier                                     |

## Layout

```
src/
  proxy.ts                 per-request CSP with nonce
  instrumentation-client.ts  PostHog (off unless configured)
  app/                     routes: home, /work/[slug], 404
  components/home/         hero, bento grid, project visuals, sections
  components/site/         header, footer
  content/                 site copy and project data
docs/                      plan (client notes live in git-ignored docs/private/)
```
