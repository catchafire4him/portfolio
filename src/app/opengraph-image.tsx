import { ogSize, renderOgCard } from "@/lib/og";
import { site } from "@/content/site";

export const alt = `${site.name}, software developer`;
export const size = ogSize;
export const contentType = "image/png";

export default function Image() {
  return renderOgCard({
    eyebrow: "Software developer · AI-first · Independent",
    title: "I build production software, from idea to shipped.",
    body: site.description,
  });
}
