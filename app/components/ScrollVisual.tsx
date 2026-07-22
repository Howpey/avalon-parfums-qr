"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

/**
 * Origin's forecast-chart "playhead" analog: an SVG that draws itself as you
 * scroll, driven by ScrollTrigger scrub. Here it's an olfactive curve rising
 * through the three fragrance notes, with a glowing playhead dot tracking it.
 */
const notes = [
  { x: 120, label: "Saída" },
  { x: 400, label: "Corpo" },
  { x: 680, label: "Fundo" },
];

export default function ScrollVisual() {
  const ref = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const dotRef = useRef<SVGGElement>(null);

  useGSAP(
    () => {
      const path = pathRef.current;
      const dot = dotRef.current;
      if (!path || !dot || !ref.current) return;

      const len = path.getTotalLength();
      gsap.set(path, { strokeDasharray: len, strokeDashoffset: len });

      const place = (p: number) => {
        const pt = path.getPointAtLength(len * p);
        gsap.set(dot, { attr: { transform: `translate(${pt.x} ${pt.y})` } });
      };
      place(0);

      if (prefersReducedMotion()) {
        gsap.set(path, { strokeDashoffset: 0 });
        place(1);
        return;
      }

      const st = {
        trigger: ref.current,
        start: "top 75%",
        end: "bottom 60%",
        scrub: 1,
      } as const;

      gsap.to(path, { strokeDashoffset: 0, ease: "none", scrollTrigger: st });

      // Move the playhead dot along the path in sync with the draw.
      const proxy = { p: 0 };
      gsap.to(proxy, {
        p: 1,
        ease: "none",
        scrollTrigger: st,
        onUpdate: () => place(proxy.p),
      });
    },
    { scope: ref },
  );

  return (
    <section className="mx-auto max-w-[1200px] px-6 py-24">
      <div className="mx-auto max-w-2xl text-center">
        <span className="eyebrow text-[11px]">A jornada olfativa</span>
        <h2 className="display mt-4 text-[clamp(32px,6vw,48px)]">Da primeira borrifada ao fundo</h2>
        <p className="mx-auto mt-4 max-w-md text-[15.5px] leading-relaxed text-ash">
          Cada perfume evolui na pele — role para acompanhar como as notas se revelam ao longo do
          tempo.
        </p>
      </div>

      <div ref={ref} className="mx-auto mt-12 max-w-3xl overflow-hidden rounded-[30px] bg-abyss p-6 sm:p-10">
        <svg viewBox="0 0 800 300" className="w-full" role="img" aria-label="Curva de evolução das notas do perfume">
          <defs>
            <linearGradient id="curveStroke" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#e3c378" />
              <stop offset="100%" stopColor="#c9a24b" />
            </linearGradient>
          </defs>

          {/* baseline */}
          <line x1="60" y1="250" x2="740" y2="250" stroke="#ffffff" strokeOpacity="0.08" strokeWidth="1" />

          {/* note markers */}
          {notes.map((n) => (
            <g key={n.label}>
              <line x1={n.x} y1="70" x2={n.x} y2="250" stroke="#ffffff" strokeOpacity="0.06" strokeWidth="1" />
              <text x={n.x} y="278" textAnchor="middle" className="fill-fog" style={{ font: "500 12px var(--font-mono)", letterSpacing: "0.12em", textTransform: "uppercase" }}>
                {n.label}
              </text>
            </g>
          ))}

          {/* the olfactive curve that draws on scroll */}
          <path
            ref={pathRef}
            d="M120 230 C 240 210, 300 90, 400 110 S 560 210, 680 90"
            fill="none"
            stroke="url(#curveStroke)"
            strokeWidth="3"
            strokeLinecap="round"
          />
          {/* playhead — group translated along the path on scroll */}
          <g ref={dotRef}>
            <circle r="14" fill="#e3c378" opacity="0.2" />
            <circle r="6" fill="#e3c378" />
          </g>
        </svg>
      </div>
    </section>
  );
}
