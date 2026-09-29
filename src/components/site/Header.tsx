"use client";

import Link from "next/link";
import { useState } from "react";
import { motion, useMotionValueEvent, useScroll } from "motion/react";
import { site } from "@/content/site";

const links = [
  { href: "/#work", label: "Work" },
  { href: "/#services", label: "Services" },
  { href: "/colophon", label: "How it's built" },
];

/** Frosted header that hides while scrolling down and returns on scroll up. */
export function Header() {
  const { scrollY } = useScroll();
  const [hidden, setHidden] = useState(false);

  useMotionValueEvent(scrollY, "change", (y) => {
    const previous = scrollY.getPrevious() ?? 0;
    setHidden(y > previous && y > 160);
  });

  return (
    <motion.header
      animate={{ y: hidden ? "-100%" : "0%" }}
      transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
      className="border-line bg-bg/70 sticky top-0 z-40 border-b backdrop-blur-xl"
    >
      <div className="mx-auto flex h-[72px] max-w-[1312px] items-center justify-between px-4 sm:px-8">
        <Link href="/" className="flex items-center gap-3" aria-label={`${site.name}, home`}>
          <span className="bg-accent text-accent-ink flex size-[34px] items-center justify-center rounded-[9px] text-sm font-bold tracking-tight">
            {site.initials}
          </span>
          <span className="font-semibold tracking-tight">{site.name}</span>
        </Link>

        <nav aria-label="Primary" className="text-muted hidden gap-9 text-sm md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="link-u hover:text-fg">
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="text-muted hidden items-center gap-2 font-mono text-xs lg:flex">
            <span className="pulse-dot bg-ok size-2 rounded-full" aria-hidden="true" />
            Available for projects
          </span>
          <Link
            href="/#contact"
            className="bg-fg text-bg flex h-10 items-center rounded-full px-[18px] text-sm font-semibold transition-transform duration-300 hover:scale-[1.03]"
          >
            Start a project
          </Link>
        </div>
      </div>
    </motion.header>
  );
}
