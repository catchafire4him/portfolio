"use client";

import Link from "next/link";
import { useRef } from "react";
import type { FeaturedProject } from "@/content/projects";
import { ArrowUpRight } from "@/components/ui/icons";

type Props = { project: FeaturedProject; children: React.ReactNode };

/** Bento card with a border spotlight that follows the cursor. */
export function ProjectCard({ project, children }: Props) {
  const ref = useRef<HTMLAnchorElement>(null);

  function onPointerMove(event: React.PointerEvent<HTMLAnchorElement>) {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    el.style.setProperty("--mx", `${event.clientX - rect.left}px`);
    el.style.setProperty("--my", `${event.clientY - rect.top}px`);
  }

  const wide = project.visual === "assembly";

  return (
    <Link
      ref={ref}
      href={`/work/${project.slug}`}
      onPointerMove={onPointerMove}
      className={`spotlight group border-line bg-surface ease-out-soft flex rounded-[22px] border p-5 transition-[transform,border-color] duration-500 hover:-translate-y-1 hover:border-[#3a3a41] sm:p-7 ${
        wide ? "flex-col gap-6 md:flex-row md:gap-7" : "flex-col gap-[22px]"
      } ${project.tall ? "lg:h-[540px]" : wide ? "md:h-[360px]" : "lg:h-[420px]"}`}
    >
      <div
        className={`overflow-hidden ${
          wide ? "h-[240px] md:h-auto md:w-[330px] md:shrink-0" : "h-[260px] flex-1 lg:h-auto"
        }`}
      >
        {children}
      </div>
      <div className={`flex items-end justify-between gap-4 ${wide ? "md:flex-1" : ""}`}>
        <div className="flex flex-col gap-2">
          <span className="text-subtle font-mono text-xs uppercase">{project.tags}</span>
          <h3
            className={`font-semibold tracking-tight ${project.span === 8 ? "text-[28px]" : "text-2xl"}`}
          >
            {project.name}
          </h3>
          <p className="text-muted text-[15px] leading-relaxed">{project.tagline}</p>
        </div>
        <span className="border-line-strong flex size-[46px] shrink-0 items-center justify-center rounded-full border transition-transform duration-300 group-hover:translate-x-[3px] group-hover:-translate-y-[3px]">
          <ArrowUpRight className="size-[18px]" />
        </span>
      </div>
    </Link>
  );
}
