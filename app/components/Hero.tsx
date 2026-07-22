"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";
import { STORE_URL, INSTAGRAM_URL, primaryBtn, ghostBtn } from "./shared";
import { ArrowIcon, InstagramIcon } from "./icons";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);
  const typedTarget = useRef<HTMLSpanElement>(null);

  // Typed.js — the rotating word in the headline (Origin's `.typed-words`).
  useEffect(() => {
    if (!typedTarget.current) return;
    const typed = new Typed(typedTarget.current, {
      strings: ["sentidos", "memórias", "desejos", "histórias"],
      typeSpeed: 70,
      backSpeed: 40,
      backDelay: 1800,
      startDelay: 600,
      loop: true,
      smartBackspace: true,
    });
    return () => typed.destroy();
  }, []);

  // Atmospheric entrance timeline (design.md motion: slow, confident reveal).
  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const items = ref.current.querySelectorAll("[data-hero]");
      gsap.from(items, {
        opacity: 0,
        y: 28,
        duration: 1.1,
        ease: "power3.out",
        stagger: 0.14,
        delay: 0.15,
      });
    },
    { scope: ref },
  );

  return (
    <section
      ref={ref}
      id="top"
      className="relative mx-auto max-w-[1200px] px-6 pb-28 pt-44 text-center"
    >
      <span data-hero className="eyebrow text-[11px]">
        Perfumaria de nicho · Baixada Santista
      </span>
      <h1
        data-hero
        className="display mx-auto mt-8 max-w-4xl text-[clamp(46px,9vw,80px)]"
      >
        Exclusividade que desperta{" "}
        <em className="italic text-gold-gradient">
          <span ref={typedTarget} />
        </em>
      </h1>
      <p
        data-hero
        className="mx-auto mt-7 max-w-xl text-[17px] leading-relaxed text-ash"
      >
        Composições marcantes em frascos exclusivos. Perfumes de nicho, importados e árabes com
        curadoria autoral.
      </p>
      <div
        data-hero
        className="mt-11 flex flex-col items-center justify-center gap-3.5 sm:flex-row"
      >
        <a href={STORE_URL} target="_blank" rel="noopener" className={primaryBtn}>
          Visitar a loja
          <ArrowIcon className="size-[18px]" />
        </a>
        <a href={INSTAGRAM_URL} target="_blank" rel="noopener" className={ghostBtn}>
          <InstagramIcon className="size-[18px]" />
          Seguir no Instagram
        </a>
      </div>
    </section>
  );
}
