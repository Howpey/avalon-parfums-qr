"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";
import type { IconProps } from "./icons";
import {
  NicheIcon,
  ImportedIcon,
  NeecheIcon,
  ArabicIcon,
  CreamIcon,
} from "./icons";

type Item = {
  Icon: (p: IconProps) => JSX.Element;
  tile: string;
  title: string;
  description: string;
  badge?: string;
};

const catalogItems: Item[] = [
  { Icon: NicheIcon, tile: "bg-amber", title: "Nicho", description: "Fragrâncias raras e exclusivas das melhores casas de perfumaria." },
  { Icon: ImportedIcon, tile: "bg-copper", title: "Importados", description: "Grandes marcas internacionais com procedência garantida." },
  { Icon: NeecheIcon, tile: "bg-rose", title: "Neeche Collection", description: "Inspirações de nicho com identidade autoral.", badge: "a partir de R$ 69,90" },
  { Icon: ArabicIcon, tile: "bg-bronze", title: "Árabes", description: "Perfumes orientais intensos, marcantes e de alta fixação." },
  { Icon: CreamIcon, tile: "bg-sand", title: "Cremes corporais", description: "Hidratantes e body splash para completar o ritual." },
];

const families = ["Cítricos", "Amadeirados", "Doces", "Florais", "Frutados", "Especiados"];

export default function CatalogTiles() {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.08,
        scrollTrigger: { trigger: gridRef.current, start: "top 80%", once: true },
      });
    },
    { scope: gridRef },
  );

  return (
    <section id="catalogo" className="mx-auto max-w-[1200px] px-6 py-20">
      <div className="text-center">
        <span className="eyebrow text-[11px]">Catálogo</span>
        <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">O que você encontra</h2>
      </div>

      <div ref={gridRef} className="mt-12 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {catalogItems.map(({ Icon, tile, title, description, badge }) => (
          <div
            key={title}
            className={`group flex flex-col rounded-[30px] ${tile} p-8 text-obsidian transition-transform duration-300 hover:-translate-y-1`}
          >
            <Icon className="size-9 text-obsidian/90" />
            <h3 className="display mt-8 text-[clamp(26px,4vw,38px)] text-obsidian">{title}</h3>
            <p className="mt-2 text-[15px] leading-relaxed text-obsidian/75">{description}</p>
            {badge && (
              <span className="mt-5 inline-flex w-fit rounded-full bg-obsidian/15 px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-obsidian">
                {badge}
              </span>
            )}
          </div>
        ))}
      </div>

      <div className="mt-9 flex flex-wrap justify-center gap-2">
        {families.map((family) => (
          <span
            key={family}
            className="rounded-full border border-white/10 px-4 py-1.5 font-mono text-[11px] uppercase tracking-wide text-ash"
          >
            {family}
          </span>
        ))}
      </div>
    </section>
  );
}
