"use client";

import Link from "next/link";
import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";
import { type PublicProduct } from "../lib/products";
import ProductCard from "./ProductCard";
import { ghostBtn } from "./shared";
import { ArrowIcon } from "./icons";

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

      <div ref={gridRef} className="mt-10 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} product={p} />
        ))}
      </div>

      <div className="mt-10 text-center">
        <Link href="/catalogo" className={ghostBtn}>
          Ver catálogo completo
          <ArrowIcon className="size-[18px]" />
        </Link>
      </div>
    </section>
  );
}
