"use client";

import { useRef } from "react";
import { gsap, useGSAP, prefersReducedMotion } from "./gsap";

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  /** Stagger children instead of revealing the container as one block. */
  stagger?: boolean;
  delay?: number;
  as?: "div" | "section" | "ul" | "header";
};

/**
 * Scroll-triggered fade/translate reveal — the GSAP equivalent of Origin's
 * Webflow IX2 "reveal on scroll" interactions. Honors prefers-reduced-motion
 * by rendering the final state with no animation.
 */
export default function Reveal({
  children,
  className,
  stagger = false,
  delay = 0,
  as = "div",
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      if (prefersReducedMotion() || !ref.current) return;
      const targets = stagger
        ? Array.from(ref.current.children)
        : [ref.current];

      gsap.from(targets, {
        opacity: 0,
        y: 28,
        duration: 0.9,
        ease: "power2.out",
        delay,
        stagger: stagger ? 0.09 : 0,
        scrollTrigger: {
          trigger: ref.current,
          start: "top 85%",
          once: true,
        },
      });
    },
    { scope: ref },
  );

  const Tag = as as React.ElementType;
  return (
    <Tag ref={ref} className={className}>
      {children}
    </Tag>
  );
}
