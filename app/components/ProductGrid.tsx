"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";
import {
  type PublicProduct,
  label,
  formatPrice,
  formatVolume,
} from "../lib/products";
import { STORE_URL, ghostBtn } from "./shared";
import { ArrowIcon } from "./icons";

const chip =
  "rounded-full border border-white/10 px-3 py-1 font-mono text-[10.5px] uppercase tracking-wide text-ash";

function Notes({ title, notes }: { title: string; notes: string[] | null }) {
  if (!notes || notes.length === 0) return null;
  return (
    <p className="text-[13px] leading-relaxed text-ash">
      <span className="font-mono text-[10.5px] uppercase tracking-wide text-fog">{title}</span>
      <br />
      {notes.join(" · ")}
    </p>
  );
}

export default function ProductGrid({ products }: { products: PublicProduct[] }) {
  const gridRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !gridRef.current) return;
      gsap.from(gridRef.current.children, {
        opacity: 0,
        y: 32,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.07,
        scrollTrigger: { trigger: gridRef.current, start: "top 85%", once: true },
      });
    },
    { scope: gridRef, dependencies: [products.length] },
  );

  if (products.length === 0) return null;

  return (
    <section className="mx-auto max-w-[1200px] px-6 pb-20">
      <div className="text-center">
        <span className="eyebrow text-[11px]">Nossos perfumes</span>
        <h3 className="display mt-3 text-[clamp(26px,4.5vw,38px)]">Disponíveis agora</h3>
      </div>

      <div
        ref={gridRef}
        className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3"
      >
        {products.map((p) => {
          const meta = [
            label.type(p.type),
            label.concentration(p.concentration),
            formatVolume(p.volume_ml),
            label.audience(p.audience),
          ].filter(Boolean);
          const traits = [label.longevity(p.longevity), label.sillage(p.sillage)].filter(Boolean);

          return (
            <article
              key={p.id}
              className="flex flex-col overflow-hidden rounded-[30px] bg-graphite transition-colors hover:bg-steel"
            >
              {p.main_image_url && (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={p.main_image_url}
                  alt={p.name}
                  loading="lazy"
                  className="aspect-[4/3] w-full object-cover"
                />
              )}

              <div className="flex flex-1 flex-col p-7">
                {p.brand && (
                  <span className="font-mono text-[10.5px] uppercase tracking-[0.16em] text-gold">
                    {p.brand}
                  </span>
                )}
                <h4 className="display mt-2 text-[22px] leading-tight text-cloud">{p.name}</h4>

                {p.category && (
                  <span className="mt-3 w-fit rounded-full bg-white/[0.06] px-3 py-1 font-mono text-[10.5px] uppercase tracking-wide text-ash">
                    {p.category}
                  </span>
                )}

                {p.description && (
                  <p className="mt-4 line-clamp-3 text-[14px] leading-relaxed text-ash">
                    {p.description}
                  </p>
                )}

                {meta.length > 0 && (
                  <div className="mt-4 flex flex-wrap gap-1.5">
                    {meta.map((m) => (
                      <span key={m} className={chip}>
                        {m}
                      </span>
                    ))}
                  </div>
                )}

                <div className="mt-4 space-y-2">
                  <Notes title="Saída" notes={p.top_notes} />
                  <Notes title="Coração" notes={p.heart_notes} />
                  <Notes title="Fundo" notes={p.base_notes} />
                </div>

                {traits.length > 0 && (
                  <p className="mt-3 font-mono text-[10.5px] uppercase tracking-wide text-fog">
                    {traits.join(" · ")}
                  </p>
                )}

                {/* Price pinned to the bottom so cards align regardless of copy length */}
                <div className="mt-auto pt-6">
                  {p.price != null && p.price > 0 && (
                    <span className="display text-2xl text-gold-bright">{formatPrice(p.price)}</span>
                  )}
                </div>
              </div>
            </article>
          );
        })}
      </div>

      <div className="mt-10 text-center">
        <a
          href={STORE_URL}
          target="_blank"
          rel="noopener"
          className={ghostBtn}
        >
          Ver catálogo completo
          <ArrowIcon className="size-[18px]" />
        </a>
      </div>
    </section>
  );
}
