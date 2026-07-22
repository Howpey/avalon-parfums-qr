"use client";

import { useEffect, useRef } from "react";
import Typed from "typed.js";
import { mountScrollWorld } from "./scrub-engine";
import { STORE_URL, INSTAGRAM_URL } from "./shared";

/**
 * Single-scene scroll-scrubbed hero built on the scroll-world engine
 * (github.com/oso95/scroll-world, MIT). Scroll drives the video's currentTime,
 * so the camera "flies into the valley" as you scroll. The engine handles mobile
 * hardening (seek coalescing, iOS priming, lighter clip) and prefers-reduced-motion
 * (shows the poster still, no scrub) on its own.
 */
export default function ScrollWorldHero() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = ref.current;
    if (!container) return;

    // Theme the engine to the Avalon palette (obsidian bg = seamless handoff to
    // the rest of the page; gold accent; site fonts). Set on the container so our
    // unlayered vars win over the engine's @layer defaults.
    const vars: Record<string, string> = {
      "--sw-bg": "#0f1011",
      "--sw-ink": "#f5f5f7",
      "--sw-ink-soft": "#9f9fa0",
      "--sw-accent": "#c9a24b",
      "--sw-font-display": "var(--font-display)",
      "--sw-font-body": "var(--font-sans)",
    };
    Object.entries(vars).forEach(([k, v]) => container.style.setProperty(k, v));

    mountScrollWorld(container, {
      nav: false,
      atmosphere: true,
      diveScroll: 1.8,
      hint: "role para explorar",
      sections: [
        {
          id: "hero",
          label: "Avalon",
          still: "/hero/valley-poster.jpg",
          stillMobile: "/hero/valley-m-poster.jpg",
          clip: "/hero/valley.mp4",
          clipMobile: "/hero/valley-m.mp4",
          accent: "#c9a24b",
          eyebrow: "Perfumaria de nicho · Baixada Santista",
          title:
            'Exclusividade que desperta <em class="italic text-gold-gradient"><span id="hero-typed"></span></em>',
          body:
            "Composições marcantes em frascos exclusivos. Perfumes de nicho, importados e árabes com curadoria autoral.",
          cta: {
            primary: { label: "Visitar a loja", href: STORE_URL },
            secondary: { label: "Seguir no Instagram", href: INSTAGRAM_URL },
          },
        },
      ],
      connectors: [],
    });

    // Re-attach the Typed.js rotating word into the (now HTML) title.
    let typed: Typed | undefined;
    const target = container.querySelector("#hero-typed");
    if (target) {
      typed = new Typed(target as Element, {
        strings: ["sentidos", "memórias", "desejos", "histórias"],
        typeSpeed: 70,
        backSpeed: 40,
        backDelay: 1800,
        startDelay: 600,
        loop: true,
        smartBackspace: true,
      });
    }

    return () => {
      typed?.destroy();
      // Tear down the engine's injected DOM (it appends children into container).
      container.innerHTML = "";
      container.classList.remove("sw-root");
    };
  }, []);

  // The engine fills this container with its own fixed-position layers.
  return <div ref={ref} aria-label="Vídeo do hero" />;
}
