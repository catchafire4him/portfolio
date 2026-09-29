import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const ogSize = { width: 1200, height: 630 };

type Card = { eyebrow: string; title: string; body: string };

/** Link-preview image in the site's style: dark ground, one accent, big type. */
export function renderOgCard({ eyebrow, title, body }: Card) {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        padding: 72,
        background: "#0b0b0c",
        backgroundImage:
          "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)",
        backgroundSize: "64px 64px",
        color: "#ededec",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
        <div
          style={{
            width: 56,
            height: 56,
            borderRadius: 14,
            background: "#d4ff3f",
            color: "#0b0b0c",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 24,
            fontWeight: 700,
          }}
        >
          {site.initials}
        </div>
        <div style={{ fontSize: 28, fontWeight: 600 }}>{site.name}</div>
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
        <div style={{ fontSize: 22, letterSpacing: 3, color: "#d4ff3f" }}>
          {eyebrow.toUpperCase()}
        </div>
        <div style={{ fontSize: 84, fontWeight: 700, letterSpacing: -3, lineHeight: 1 }}>
          {title}
        </div>
        <div style={{ fontSize: 30, color: "#a1a1a8", lineHeight: 1.35, maxWidth: 980 }}>
          {body}
        </div>
      </div>
    </div>,
    ogSize,
  );
}
