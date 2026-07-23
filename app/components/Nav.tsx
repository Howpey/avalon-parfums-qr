"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";
import { STORE_URL } from "./shared";
import { ArrowIcon } from "./icons";

// Absolute so they work from any page (home anchors + the catalog route).
const links = [
  { label: "Catálogo", href: "/catalogo" },
  { label: "Sobre", href: "/#sobre" },
  { label: "Depoimentos", href: "/#depoimentos" },
];

export default function Nav() {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      gsap.from(ref.current, { y: -16, opacity: 0, duration: 0.7, ease: "power2.out" });
    },
    { scope: ref },
  );

  return (
    <header
      ref={ref}
      className="fixed inset-x-0 top-0 z-[140] border-b border-white/[0.06] bg-obsidian/70 backdrop-blur-2xl"
    >
      <div className="mx-auto flex max-w-[1200px] items-center justify-between px-6 py-4">
        <a href="/" className="display text-xl tracking-wide">
          Avalon Parfums
        </a>
        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-[12px] uppercase tracking-[0.14em] text-ash transition-colors hover:text-cloud"
            >
              {l.label}
            </a>
          ))}
        </nav>
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener"
          className="inline-flex h-9 items-center gap-2 rounded-lg bg-gold px-4 text-[13px] font-medium text-obsidian transition-colors hover:bg-gold-bright"
        >
          Visitar a loja
          <ArrowIcon className="size-4" />
        </a>
      </div>
    </header>
  );
}
