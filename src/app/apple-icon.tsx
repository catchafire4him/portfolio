import { ImageResponse } from "next/og";
import { site } from "@/content/site";

export const size = { width: 180, height: 180 };
export const contentType = "image/png";

export default function AppleIcon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "#d4ff3f",
        color: "#0b0b0c",
        fontSize: 78,
        fontWeight: 700,
        letterSpacing: -3,
      }}
    >
      {site.initials}
    </div>,
    size,
  );
}
