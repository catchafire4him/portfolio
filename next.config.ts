import type { NextConfig } from "next";
import { securityHeaders } from "./src/lib/security";

// PostHog region: "us" or "eu". Traffic is proxied through /ingest so the
// browser only ever talks to this site (see src/lib/security.ts for the CSP).
const posthogRegion = process.env.NEXT_PUBLIC_POSTHOG_REGION === "eu" ? "eu" : "us";

const nextConfig: NextConfig = {
  poweredByHeader: false,
  reactStrictMode: true,
  // Required so PostHog's trailing-slash API paths reach the rewrite intact.
  skipTrailingSlashRedirect: true,

  async headers() {
    // The Content-Security-Policy is set per request in src/proxy.ts because it carries a nonce.
    return [
      { source: "/:path*", headers: securityHeaders.map(({ key, value }) => ({ key, value })) },
    ];
  },

  async rewrites() {
    return [
      {
        source: "/ingest/static/:path*",
        destination: `https://${posthogRegion}-assets.i.posthog.com/static/:path*`,
      },
      {
        source: "/ingest/:path*",
        destination: `https://${posthogRegion}.i.posthog.com/:path*`,
      },
    ];
  },
};

export default nextConfig;
