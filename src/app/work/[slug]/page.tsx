import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getCaseStudy, type Section } from "@/content/case-studies";
import { featuredProjects } from "@/content/projects";
import { ShotFrame } from "@/components/case/ShotFrame";
import { ProjectCover } from "@/components/home/ProjectCover";
import { Reveal } from "@/components/motion/Reveal";
import { ArrowRight, Check } from "@/components/ui/icons";

function findProject(slug: string) {
  return featuredProjects.find((project) => project.slug === slug);
}

export async function generateMetadata({ params }: PageProps<"/work/[slug]">): Promise<Metadata> {
  const project = findProject((await params).slug);
  if (!project) return {};
  return {
    title: project.name,
    description: project.tagline,
    alternates: { canonical: `/work/${project.slug}` },
    openGraph: {
      type: "article",
      url: `/work/${project.slug}`,
      title: `${project.name} · Case study`,
      description: project.tagline,
    },
  };
}

function Label({ children }: { children: React.ReactNode }) {
  return <h2 className="text-subtle font-mono text-[13px] uppercase lg:col-span-4">{children}</h2>;
}

function SectionList({ items, icon }: { items: Section[]; icon?: boolean }) {
  return (
    <div className="grid gap-4 sm:grid-cols-2 lg:col-span-8">
      {items.map((item) => (
        <div key={item.title} className="border-line flex flex-col gap-2 rounded-2xl border p-6">
          <h3 className="flex items-center gap-2.5 text-lg font-semibold tracking-tight">
            {icon ? <Check className="text-accent size-4 shrink-0" /> : null}
            {item.title}
          </h3>
          <p className="text-muted text-[15px] leading-relaxed">{item.body}</p>
        </div>
      ))}
    </div>
  );
}

export default async function CaseStudyPage({ params }: PageProps<"/work/[slug]">) {
  const { slug } = await params;
  const project = findProject(slug);
  if (!project) notFound();

  const study = getCaseStudy(slug);
  const index = featuredProjects.indexOf(project);
  const next = featuredProjects[(index + 1) % featuredProjects.length];
  const phones = study?.gallery.filter((s) => s.frame === "phone" || s.frame === "watch") ?? [];
  const wides = study?.gallery.filter((s) => s.frame !== "phone" && s.frame !== "watch") ?? [];

  return (
    <article className="mx-auto flex max-w-[1312px] flex-col px-4 pt-16 pb-24 sm:px-8 md:pt-24">
      <Link href="/#work" className="link-u text-muted hover:text-fg mb-12 self-start text-sm">
        ← All work
      </Link>

      <header className="flex flex-col gap-6">
        <span className="rise text-accent font-mono text-[13px] tracking-[0.1em] uppercase">
          {project.tags}
        </span>
        <h1
          className="rise text-6xl leading-[0.95] font-semibold tracking-[-0.05em] md:text-[112px]"
          style={{ animationDelay: "0.08s" }}
        >
          {project.name}
        </h1>
        <p
          className="rise text-muted max-w-[780px] text-xl leading-snug md:text-2xl"
          style={{ animationDelay: "0.16s" }}
        >
          {study?.intro ?? project.tagline}
        </p>
        {study ? (
          <dl
            className="rise border-line mt-4 grid grid-cols-2 border-t lg:grid-cols-4"
            style={{ animationDelay: "0.24s" }}
          >
            {study.facts.map((fact) => (
              <div key={fact.label} className="flex flex-col gap-2 py-5 pr-4">
                <dt className="text-subtle font-mono text-xs uppercase">{fact.label}</dt>
                <dd className="text-[15px]">{fact.value}</dd>
              </div>
            ))}
          </dl>
        ) : null}
      </header>

      <Reveal className="mt-12">
        {study ? (
          study.hero.frame === "phone" ? (
            <div className="border-line bg-surface flex justify-center rounded-3xl border px-6 py-12">
              <ShotFrame shot={study.hero} priority />
            </div>
          ) : (
            <ShotFrame shot={study.hero} priority />
          )
        ) : (
          <div className="border-line bg-surface h-[360px] rounded-3xl border p-6 md:h-[560px]">
            <ProjectCover project={project} />
          </div>
        )}
      </Reveal>

      {study ? (
        <div className="mt-24 flex flex-col gap-24">
          <Reveal as="section" className="grid gap-6 lg:grid-cols-12">
            <Label>The problem</Label>
            <p className="text-2xl leading-snug tracking-[-0.01em] md:text-[28px] lg:col-span-8">
              {study.problem}
            </p>
          </Reveal>

          {study.numbers ? (
            <Reveal as="section" className="grid gap-6 lg:grid-cols-12">
              <Label>By the numbers</Label>
              <div className="grid gap-4 sm:grid-cols-3 lg:col-span-8">
                {study.numbers.map((n) => (
                  <div key={n.label} className="bg-surface flex flex-col gap-2 rounded-2xl p-6">
                    <span className="text-accent text-3xl font-semibold tracking-tight">
                      {n.value}
                    </span>
                    <span className="text-muted text-sm leading-relaxed">{n.label}</span>
                  </div>
                ))}
              </div>
            </Reveal>
          ) : null}

          <Reveal as="section" className="grid gap-6 lg:grid-cols-12">
            <Label>What I built</Label>
            <SectionList items={study.built} />
          </Reveal>

          {wides.length ? (
            <section className="flex flex-col gap-12">
              {wides.map((shot) => (
                <Reveal key={shot.src}>
                  <ShotFrame shot={shot} />
                </Reveal>
              ))}
            </section>
          ) : null}

          <Reveal as="section" className="grid gap-6 lg:grid-cols-12">
            <Label>Under the hood</Label>
            <SectionList items={study.security} icon />
          </Reveal>

          {phones.length ? (
            <Reveal
              as="section"
              className="border-line bg-surface flex flex-wrap items-start justify-center gap-10 rounded-3xl border px-6 py-12"
            >
              {phones.map((shot) => (
                <ShotFrame key={shot.src} shot={shot} className="w-[200px]" />
              ))}
            </Reveal>
          ) : null}

          {study.note || study.links ? (
            <Reveal as="section" className="grid gap-6 lg:grid-cols-12">
              <Label>Notes</Label>
              <div className="flex flex-col gap-4 lg:col-span-8">
                {study.note ? <p className="text-muted leading-relaxed">{study.note}</p> : null}
                {study.links?.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    rel="noopener noreferrer"
                    className="link-u text-accent self-start"
                  >
                    {link.label} ↗
                  </a>
                ))}
              </div>
            </Reveal>
          ) : null}
        </div>
      ) : (
        <p className="text-subtle mt-10 font-mono text-sm">Full case study coming soon.</p>
      )}

      <Link
        href={`/work/${next.slug}`}
        className="group border-line bg-surface hover:border-line-strong mt-32 flex items-center justify-between gap-6 rounded-3xl border p-8 transition-colors md:p-11"
      >
        <span className="flex flex-col gap-2.5">
          <span className="text-subtle font-mono text-[13px]">NEXT PROJECT</span>
          <span className="text-3xl font-semibold tracking-[-0.035em] md:text-[44px]">
            {next.name}
          </span>
        </span>
        <span className="bg-accent text-accent-ink flex size-14 shrink-0 items-center justify-center rounded-full transition-transform duration-300 group-hover:translate-x-1 md:size-16">
          <ArrowRight className="size-5" />
        </span>
      </Link>
    </article>
  );
}
