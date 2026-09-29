import Image from "next/image";
import type { FeaturedProject } from "@/content/projects";

/** Card artwork: a real screenshot, or a plain blueprint pattern until one exists. */
export function ProjectCover({ project }: { project: FeaturedProject }) {
  const cover = project.cover;

  if (!cover) {
    return <div className="bg-blueprint h-full rounded-[14px]" aria-hidden="true" />;
  }

  if (cover.frame === "phone") {
    return (
      <div className="bg-surface-2 relative flex h-full items-start justify-center overflow-hidden rounded-[14px] pt-6">
        <Image
          src={cover.src}
          alt={cover.alt}
          width={cover.width}
          height={cover.height}
          sizes="220px"
          className="border-line-strong w-[180px] rounded-[26px] border-4 transition-transform duration-700 ease-out group-hover:-translate-y-2"
        />
      </div>
    );
  }

  return (
    <div className="bg-surface-2 relative h-full overflow-hidden rounded-[14px]">
      <Image
        src={cover.src}
        alt={cover.alt}
        fill
        sizes="(min-width: 1024px) 60vw, 100vw"
        className="object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.03]"
      />
    </div>
  );
}
