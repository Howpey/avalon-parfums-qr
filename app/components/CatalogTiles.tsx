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
  image: string;
  title: string;
  description: string;
  badge?: string;
};

const catalogItems: Item[] = [
  {
    Icon: NicheIcon,
    image: "/cards/nicho.webp",
    title: "Nicho",
    description: "Fragrâncias raras e exclusivas das melhores casas de perfumaria.",
  },
  {
    Icon: ImportedIcon,
    image: "/cards/importados.webp",
    title: "Importados",
    description: "Grandes marcas internacionais com procedência garantida.",
  },
  {
    Icon: NeecheIcon,
    image: "/cards/neeche.webp",
    title: "Neeche Collection",
    description: "Inspirações de nicho com identidade autoral.",
    badge: "a partir de R$ 69,90",
  },
  {
    Icon: ArabicIcon,
    image: "/cards/arabes.webp",
    title: "Árabes",
    description: "Perfumes orientais intensos, marcantes e de alta fixação.",
  },
  {
    Icon: CreamIcon,
    image: "/cards/cremes.webp",
    title: "Cremes corporais",
    description: "Hidratantes e body splash para completar o ritual.",
  },
];

const families = ["Cítricos", "Amadeirados", "Doces", "Florais", "Frutados", "Especiados"];

/** Left-to-right scrim so the copy stays readable over the photography. */
const scrim =
  "bg-[linear-gradient(100deg,rgba(15,16,17,0.96)_0%,rgba(15,16,17,0.82)_34%,rgba(15,16,17,0.35)_66%,rgba(15,16,17,0.05)_100%)]";

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
        {catalogItems.map(({ Icon, image, title, description, badge }) => (
          <article
            key={title}
            className="group relative flex min-h-[340px] flex-col justify-end overflow-hidden rounded-[30px] bg-obsidian p-8"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={image}
              alt=""
              loading="lazy"
              aria-hidden="true"
              className="absolute inset-0 size-full object-cover transition-transform duration-700 group-hover:scale-105"
            />
            <div className={`absolute inset-0 ${scrim}`} aria-hidden="true" />
            {/* Extra bottom fade: on narrow cards the copy reaches further into the photo */}
            <div
              className="absolute inset-x-0 bottom-0 h-2/3 bg-gradient-to-t from-obsidian via-obsidian/55 to-transparent"
              aria-hidden="true"
            />

            <div className="relative">
              <Icon className="size-8 text-gold-bright" />
              <h3 className="display mt-6 text-[clamp(26px,4vw,34px)] text-cloud">{title}</h3>
              <p className="mt-2 max-w-[22ch] text-[14.5px] leading-relaxed text-ash">
                {description}
              </p>
              {badge && (
                <span className="mt-4 inline-flex w-fit rounded-full border border-gold/40 bg-gold/10 px-3.5 py-1 font-mono text-[11px] font-medium uppercase tracking-wide text-gold-bright">
                  {badge}
                </span>
              )}
            </div>
          </article>
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
