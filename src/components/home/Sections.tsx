import Link from "next/link";
import { featuredProjects, moreWork, type FeaturedProject } from "@/content/projects";
import { services, stats, strengths, site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { ProjectCard } from "./ProjectCard";
import { ContactForm } from "./ContactForm";
import { ProjectCover } from "./ProjectCover";

function Eyebrow({ children }: { children: React.ReactNode }) {
  return <span className="text-accent text-sm font-medium">{children}</span>;
}

const spanClass: Record<FeaturedProject["span"], string> = {
  4: "lg:col-span-4",
  5: "lg:col-span-5",
  7: "lg:col-span-7",
  8: "lg:col-span-8",
};

const container = "mx-auto max-w-[1312px] px-4 sm:px-8";

export function WorkSection() {
  return (
    <section id="work" className={`${container} scroll-mt-24 pt-24 pb-10 md:pt-32`}>
      <Reveal className="mb-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
        <div className="flex flex-col gap-3.5">
          <Eyebrow>Selected work</Eyebrow>
          <h2 className="text-4xl leading-none font-semibold tracking-[-0.035em] md:text-[56px]">
            Things I&apos;ve built and shipped.
          </h2>
        </div>
      </Reveal>

      <div className="grid grid-cols-12 gap-5">
        {featuredProjects.map((project, i) => (
          <Reveal
            key={project.slug}
            delay={(i % 3) * 0.08}
            className={`col-span-12 grid ${spanClass[project.span]}`}
          >
            <ProjectCard project={project}>
              <ProjectCover project={project} />
            </ProjectCard>
          </Reveal>
        ))}

        <Reveal className="col-span-12 lg:col-span-5" delay={0.08}>
          <div className="border-line flex h-full flex-col gap-1.5 rounded-[22px] border p-7">
            <span className="text-subtle mb-2.5 text-sm">More work</span>
            <ul>
              {moreWork.map((item) => (
                <li
                  key={item.name}
                  className="border-line flex items-center justify-between gap-4 border-b py-3 last:border-b-0"
                >
                  <span>{item.name}</span>
                  <span className="text-subtle text-right font-mono text-xs">{item.kind}</span>
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      </div>
    </section>
  );
}

export function ServicesSection() {
  return (
    <section id="services" className={`${container} scroll-mt-24 pt-24 pb-10 md:pt-32`}>
      <Reveal className="mb-12 flex flex-col gap-3.5">
        <Eyebrow>What I build</Eyebrow>
        <h2 className="text-4xl leading-none font-semibold tracking-[-0.035em] md:text-[56px]">
          Software that runs a real business.
        </h2>
      </Reveal>
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {services.map((service, i) => (
          <Reveal
            key={service.title}
            delay={i * 0.08}
            className="border-line hover:border-line-strong flex min-h-[240px] flex-col gap-3.5 rounded-[20px] border p-7 transition-colors duration-300"
          >
            <h3 className="text-[21px] font-semibold tracking-tight">{service.title}</h3>
            <p className="text-muted text-[15px] leading-relaxed">{service.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function StrengthsSection() {
  return (
    <section id="how-i-work" className={`${container} scroll-mt-24 pt-24 md:pt-32`}>
      <Reveal className="mb-12 flex flex-col gap-3.5">
        <Eyebrow>How I work</Eyebrow>
        <h2 className="text-4xl leading-none font-semibold tracking-[-0.035em] md:text-[56px]">
          One developer, start to finish.
        </h2>
      </Reveal>
      <div className="grid gap-x-12 gap-y-10 md:grid-cols-2">
        {strengths.map((item, i) => (
          <Reveal key={item.title} delay={(i % 2) * 0.08} className="border-line border-t pt-6">
            <h3 className="mb-3 text-[21px] font-semibold tracking-tight">{item.title}</h3>
            <p className="text-muted leading-relaxed">{item.body}</p>
          </Reveal>
        ))}
      </div>
      <Reveal className="mt-20 grid gap-10 sm:grid-cols-3">
        {stats.map((stat) => (
          <div key={stat.label} className="flex flex-col gap-2">
            <span className="text-accent text-6xl leading-none font-semibold tracking-[-0.04em]">
              {stat.value}
            </span>
            <span className="text-muted max-w-[260px] leading-snug">{stat.label}</span>
          </div>
        ))}
      </Reveal>
      <p className="text-subtle mt-8 text-sm">
        Figures from the live AiProConstruct app, September 2026.
      </p>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className={`${container} scroll-mt-24 py-32 md:py-40`}>
      <Reveal className="flex flex-col items-center gap-7 text-center">
        <Eyebrow>Contact</Eyebrow>
        <h2 className="text-5xl leading-none font-semibold tracking-[-0.045em] md:text-[88px]">
          Have something to <span className="text-accent">build?</span>
        </h2>
        <p className="text-muted max-w-[560px] text-lg leading-relaxed">
          Tell me what you&apos;re working on. You&apos;ll hear back within one business day.
        </p>
        <div className="mt-4 w-full max-w-[760px]">
          <ContactForm email={site.email} />
        </div>
        <p className="text-subtle text-sm">
          Prefer email?{" "}
          {site.email ? (
            <a href={`mailto:${site.email}`} className="link-u text-fg">
              {site.email}
            </a>
          ) : null}
          {site.email ? " · " : null}
          <Link href={site.github} rel="noopener noreferrer" className="link-u text-fg">
            GitHub
          </Link>
        </p>
      </Reveal>
    </section>
  );
}
