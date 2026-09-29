import { contactSchema } from "@/lib/contact";
import { site } from "@/content/site";

const MAX_BODY_BYTES = 16 * 1024;
const MIN_FILL_MS = 3_000;
const MAX_FORM_AGE_MS = 24 * 60 * 60 * 1000;
const RATE_LIMIT = { max: 5, windowMs: 10 * 60 * 1000 };

// Best-effort limiter. It lives in the function instance's memory, so it resets
// on cold starts and isn't shared across instances. It stops a single client
// hammering the form without adding a database.
const recent = new Map<string, number[]>();

function rateLimited(key: string) {
  const now = Date.now();
  const hits = (recent.get(key) ?? []).filter((t) => now - t < RATE_LIMIT.windowMs);
  hits.push(now);
  recent.set(key, hits);
  if (recent.size > 5_000) recent.clear();
  return hits.length > RATE_LIMIT.max;
}

function json(body: unknown, status = 200) {
  return Response.json(body, { status, headers: { "Cache-Control": "no-store" } });
}

function sameOrigin(request: Request) {
  const origin = request.headers.get("origin");
  if (!origin) return false;
  const allowed = new Set([new URL(request.url).origin, new URL(site.url).origin]);
  const fetchSite = request.headers.get("sec-fetch-site");
  return allowed.has(origin) && (fetchSite === null || fetchSite === "same-origin");
}

export async function POST(request: Request) {
  // Only this site's own pages may post here.
  if (!sameOrigin(request)) return json({ error: "Forbidden." }, 403);
  if (!request.headers.get("content-type")?.startsWith("application/json")) {
    return json({ error: "Unsupported content type." }, 415);
  }
  if (Number(request.headers.get("content-length") ?? 0) > MAX_BODY_BYTES) {
    return json({ error: "Message too large." }, 413);
  }

  const ip =
    request.headers.get("x-real-ip") ??
    request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ??
    "unknown";
  if (rateLimited(ip)) {
    return json({ error: "Too many messages. Please try again later." }, 429);
  }

  const raw = await request.text();
  if (raw.length > MAX_BODY_BYTES) return json({ error: "Message too large." }, 413);

  let body: unknown;
  try {
    body = JSON.parse(raw);
  } catch {
    return json({ error: "Invalid request." }, 400);
  }

  const parsed = contactSchema.safeParse(body);
  if (!parsed.success) {
    return json(
      { error: "Please check the form.", fields: parsed.error.flatten().fieldErrors },
      422,
    );
  }
  const data = parsed.data;

  // Bots that fill the honeypot or submit instantly get a normal-looking success,
  // so they learn nothing, and nothing is sent.
  const age = Date.now() - data.startedAt;
  if (data.website || age < MIN_FILL_MS) return json({ ok: true });
  if (age > MAX_FORM_AGE_MS) return json({ error: "This form expired. Please reload." }, 400);

  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.CONTACT_TO ?? site.email;
  if (!apiKey || !to) return json({ error: "The form isn't set up yet." }, 503);

  // Plain text only: nothing the visitor typed is ever interpreted as HTML.
  const text = [
    `Name: ${data.name}`,
    `Email: ${data.email}`,
    `Company: ${data.company || "-"}`,
    `Project: ${data.projectType}`,
    "",
    data.message,
    "",
    `Sent from ${new URL(site.url).host}`,
  ].join("\n");

  try {
    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${apiKey}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: process.env.CONTACT_FROM ?? "Portfolio <onboarding@resend.dev>",
        to: [to],
        reply_to: data.email,
        subject: `Portfolio inquiry: ${data.projectType} from ${data.name}`,
        text,
      }),
      signal: AbortSignal.timeout(8_000),
    });
    if (!res.ok) {
      // Log the status only; never the visitor's message.
      console.error("contact: email provider returned", res.status);
      return json({ error: "Couldn't send right now. Please email instead." }, 502);
    }
  } catch {
    console.error("contact: email provider unreachable");
    return json({ error: "Couldn't send right now. Please email instead." }, 502);
  }

  return json({ ok: true });
}
