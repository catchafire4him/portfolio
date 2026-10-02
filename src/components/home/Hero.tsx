import Link from "next/link";
import { site } from "@/content/site";
import { ArrowRight } from "@/components/ui/icons";

// Entrance runs in CSS (.rise in globals.css) so the headline paints on first
// frame without waiting for JavaScript. Each step is staggered by 100ms.
const step = (i: number) => ({ animationDelay: `${0.05 + i * 0.1}s` });

export function Hero() {
  return (
    <section className="relative overflow-hidden">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div className="relative mx-auto flex max-w-[1312px] flex-col gap-8 px-4 pt-20 pb-28 sm:px-8 md:pt-32 md:pb-40">
        <p style={step(0)} className="rise text-accent text-sm font-medium sm:text-base">
          Software developer, independent
        </p>

        <h1 className="text-[46px] leading-[0.98] font-semibold tracking-[-0.045em] sm:text-7xl lg:text-[88px] xl:text-[104px]">
          <span style={step(1)} className="rise block">
            I build production software,
          </span>
          <span style={step(2)} className="rise block">
            from idea to <span className="text-accent">shipped.</span>
          </span>
        </h1>

        <p
          style={step(3)}
          className="rise text-muted max-w-[620px] text-lg leading-relaxed sm:text-xl"
        >
          Custom web apps, AI features and mobile apps for small businesses. Designed, built and
          deployed by one developer who answers the phone.
        </p>

        <div style={step(4)} className="rise flex flex-col gap-3.5 sm:flex-row">
          <Link
            href="/#work"
            className="group bg-accent text-accent-ink flex h-[52px] items-center justify-center gap-2.5 rounded-full px-[26px] font-semibold transition-transform duration-300 hover:scale-[1.03]"
          >
            See the work
            <ArrowRight className="size-4 transition-transform duration-300 group-hover:translate-x-1" />
          </Link>
          <Link
            href="/#contact"
            className="border-line-strong hover:border-subtle flex h-[52px] items-center justify-center rounded-full border px-6 transition-colors duration-300"
          >
            Get in touch
          </Link>
        </div>
      </div>

      <div className="relative mx-auto max-w-[1312px] px-4 sm:px-8">
        <ul
          aria-label="Technologies"
          className="border-line text-subtle flex flex-wrap justify-between gap-x-6 gap-y-2 border-t pt-5 pb-10 font-mono text-xs"
        >
          {site.stack.map((tech) => (
            <li key={tech}>{tech}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}
