import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex max-w-[1312px] flex-col items-start gap-6 px-4 py-40 sm:px-8">
      <span className="text-accent font-mono text-[13px]">404</span>
      <h1 className="text-5xl font-semibold tracking-[-0.04em] md:text-7xl">
        Nothing <span className="text-accent font-serif font-normal italic">here.</span>
      </h1>
      <p className="text-muted text-lg">That page doesn&apos;t exist, or it moved.</p>
      <Link
        href="/"
        className="bg-accent text-accent-ink flex h-12 items-center rounded-full px-6 font-semibold"
      >
        Back home
      </Link>
    </section>
  );
}
