import Link from "next/link";
import { featuredProjects, moreWork, type FeaturedProject } from "@/content/projects";
import { securityPractices, services, site } from "@/content/site";
import { Reveal } from "@/components/motion/Reveal";
import { Check } from "@/components/ui/icons";
import { ProjectCard } from "./ProjectCard";
import { ContactForm } from "./ContactForm";
import { ProjectCover } from "./ProjectCover";

function Eyebrow({ index, children }: { index: string; children: React.ReactNode }) {
  return (
    <span className="text-subtle font-mono text-[13px] uppercase">
      {index} — {children}
    </span>
  );
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
          <Eyebrow index="01">Selected work</Eyebrow>
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
            <span className="text-subtle mb-2.5 font-mono text-xs">MORE WORK</span>
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
        <Eyebrow index="02">What I build</Eyebrow>
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
            <span className="text-accent font-mono text-[13px]">0{i + 1}</span>
            <h3 className="text-[21px] font-semibold tracking-tight">{service.title}</h3>
            <p className="text-muted text-[15px] leading-relaxed">{service.body}</p>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function SecuritySection() {
  return (
    <section id="colophon" className={`${container} scroll-mt-24 pt-24 md:pt-32`}>
      <Reveal className="border-line flex flex-col gap-12 rounded-[26px] border bg-[#111113] p-7 md:p-14 lg:flex-row lg:items-center lg:gap-16">
        <div className="flex flex-col gap-4 lg:w-[440px] lg:shrink-0">
          <Eyebrow index="03">How this site is built</Eyebrow>
          <h2 className="text-4xl leading-[1.05] font-semibold tracking-[-0.03em] md:text-[44px]">
            Built like production, because it is.
          </h2>
          <p className="text-muted leading-relaxed">
            Every header, check and decision on this site is documented, and the source is public.
          </p>
          <Link href="/colophon" className="link-u text-accent self-start">
            Read the colophon →
          </Link>
        </div>
        <ul className="grid flex-1 gap-3 sm:grid-cols-2">
          {securityPractices.map((practice) => (
            <li
              key={practice.label}
              className="bg-surface-2 flex items-center gap-3 rounded-xl px-[18px] py-4 text-sm"
            >
              <Check className="text-accent size-4 shrink-0" />
              <span className="flex-1">{practice.label}</span>
              <span className="text-subtle font-mono text-[11px]">{practice.tag}</span>
            </li>
          ))}
        </ul>
      </Reveal>
    </section>
  );
}

export function ContactSection() {
  return (
    <section id="contact" className={`${container} scroll-mt-24 py-32 md:py-40`}>
      <Reveal className="flex flex-col items-center gap-7 text-center">
        <Eyebrow index="04">Contact</Eyebrow>
        <h2 className="text-5xl leading-none font-semibold tracking-[-0.045em] md:text-[88px]">
          Have something to{" "}
          <span className="text-accent font-serif font-normal italic">build?</span>
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
