import { ogSize, renderOgCard } from "@/lib/og";
import { featuredProjects } from "@/content/projects";

export const alt = "Case study";
export const size = ogSize;
export const contentType = "image/png";

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const project = featuredProjects.find((p) => p.slug === slug);
  return renderOgCard({
    eyebrow: project ? `Case study · ${project.tags}` : "Case study",
    title: project?.name ?? "Case study",
    body: project?.tagline ?? "",
  });
}
