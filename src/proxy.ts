import { NextResponse, type NextRequest } from "next/server";

/**
 * Builds a per-request Content-Security-Policy with a fresh nonce.
 *
 * - Scripts: only those carrying this request's nonce, plus anything they load
 *   ('strict-dynamic'). No 'unsafe-inline' for scripts, ever.
 * - Style elements: nonce only. Style *attributes* are allowed because
 *   components set per-element values (animation delays, sizes, the header's
 *   slide transform) inline. Style attributes cannot run script; the tradeoff
 *   is documented in SECURITY.md.
 * - Analytics goes through our own /ingest rewrite, so connect-src stays 'self'.
 */
export function buildCsp(nonce: string, isDev: boolean): string {
  const directives: Record<string, string[]> = {
    "default-src": ["'self'"],
    "script-src": [
      "'self'",
      `'nonce-${nonce}'`,
      "'strict-dynamic'",
      ...(isDev ? ["'unsafe-eval'"] : []),
    ],
    "style-src-elem": ["'self'", isDev ? "'unsafe-inline'" : `'nonce-${nonce}'`],
    "style-src-attr": ["'unsafe-inline'"],
    "img-src": ["'self'", "blob:", "data:"],
    "font-src": ["'self'"],
    "connect-src": ["'self'"],
    "media-src": ["'self'"],
    "worker-src": ["'self'", "blob:"],
    "manifest-src": ["'self'"],
    "object-src": ["'none'"],
    "base-uri": ["'self'"],
    "form-action": ["'self'"],
    "frame-ancestors": ["'none'"],
    "frame-src": ["'none'"],
  };

  const policy = Object.entries(directives)
    .map(([name, values]) => `${name} ${values.join(" ")}`)
    .join("; ");

  return isDev ? policy : `${policy}; upgrade-insecure-requests`;
}

export function proxy(request: NextRequest) {
  const nonce = Buffer.from(crypto.randomUUID()).toString("base64");
  const csp = buildCsp(nonce, process.env.NODE_ENV === "development");

  const requestHeaders = new Headers(request.headers);
  requestHeaders.set("x-nonce", nonce);
  requestHeaders.set("Content-Security-Policy", csp);

  const response = NextResponse.next({ request: { headers: requestHeaders } });
  response.headers.set("Content-Security-Policy", csp);
  return response;
}

export const config = {
  matcher: [
    {
      // Skip API routes, the analytics proxy, static files and metadata files.
      source:
        "/((?!api|ingest|_next/static|_next/image|favicon.ico|icon|apple-icon|robots.txt|sitemap.xml|\\.well-known).*)",
      missing: [
        { type: "header", key: "next-router-prefetch" },
        { type: "header", key: "purpose", value: "prefetch" },
      ],
    },
  ],
};
