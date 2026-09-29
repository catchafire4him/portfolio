import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { featuredProjects } from "@/content/projects";
import { ProjectVisual } from "@/components/home/ProjectVisual";
import { Reveal } from "@/components/motion/Reveal";

function findProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  return project ? { title: project.name, description: project.tagline } : {};
}

// Placeholder until the MDX case studies land (plan phase 3).
export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const project = findProject((await params).slug);
  if (!project) notFound();

  return (
    <article className="mx-auto flex max-w-[1312px] flex-col gap-10 px-4 pt-20 pb-32 sm:px-8 md:pt-28">
      <Link href="/#work" className="link-u text-muted hover:text-fg self-start text-sm">
        ← All work
      </Link>
      <Reveal className="flex flex-col gap-6">
        <span className="text-accent font-mono text-[13px] tracking-[0.1em] uppercase">
          {project.tags}
        </span>
        <h1 className="text-6xl leading-[0.95] font-semibold tracking-[-0.05em] md:text-[112px]">
          {project.name}
        </h1>
        <p className="text-muted max-w-[760px] text-xl leading-snug md:text-2xl">
          {project.tagline}
        </p>
      </Reveal>
      <Reveal
        delay={0.1}
        className="border-line bg-surface h-[360px] rounded-3xl border p-6 md:h-[520px] md:p-9"
      >
        <ProjectVisual kind={project.visual} />
      </Reveal>
      <p className="text-subtle font-mono text-sm">Full case study coming soon.</p>
    </article>
  );
}
