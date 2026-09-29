import Image from "next/image";
import type { Shot } from "@/content/case-studies";

type Props = { shot: Shot; priority?: boolean; sizes?: string; className?: string };

/** A real screenshot in a light device frame: browser chrome, phone bezel or app window. */
export function ShotFrame({ shot, priority, sizes, className = "" }: Props) {
  const image = (
    <Image
      src={shot.src}
      alt={shot.alt}
      width={shot.width}
      height={shot.height}
      priority={priority}
      sizes={
        sizes ??
        (shot.frame === "phone" || shot.frame === "watch"
          ? "(min-width: 768px) 320px, 70vw"
          : "(min-width: 1312px) 1248px, 100vw")
      }
      className="block h-auto w-full"
    />
  );

  if (shot.frame === "watch") {
    return (
      <figure className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="border-line-strong w-full max-w-[260px] overflow-hidden rounded-full border-[10px] bg-black">
          {image}
        </div>
        {shot.caption ? <Caption text={shot.caption} /> : null}
      </figure>
    );
  }

  if (shot.frame === "phone") {
    return (
      <figure className={`flex flex-col items-center gap-3 ${className}`}>
        <div className="border-line-strong w-full max-w-[320px] overflow-hidden rounded-[36px] border-[6px] bg-black">
          {image}
        </div>
        {shot.caption ? <Caption text={shot.caption} /> : null}
      </figure>
    );
  }

  return (
    <figure className={`flex flex-col gap-3 ${className}`}>
      <div className="border-line bg-surface-2 overflow-hidden rounded-2xl border">
        {shot.frame === "browser" ? (
          <div
            className="border-line flex h-9 items-center gap-1.5 border-b px-4"
            aria-hidden="true"
          >
            <span className="bg-line-strong size-2.5 rounded-full" />
            <span className="bg-line-strong size-2.5 rounded-full" />
            <span className="bg-line-strong size-2.5 rounded-full" />
          </div>
        ) : null}
        {image}
      </div>
      {shot.caption ? <Caption text={shot.caption} /> : null}
    </figure>
  );
}

function Caption({ text }: { text: string }) {
  return <figcaption className="text-subtle text-sm leading-relaxed">{text}</figcaption>;
}
