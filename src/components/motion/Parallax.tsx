"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

export interface ParallaxProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  speed?: number;
  image?: boolean;
}

export function Parallax({
  children,
  as: Tag = "div",
  className,
  style,
  speed = 0.2,
  image = false,
}: ParallaxProps) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) return;
      const isTouch =
        typeof window !== "undefined" &&
        !window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      const shift = (isTouch ? speed * 0.4 : speed) * 50;
      gsap.fromTo(
        el,
        { yPercent: -shift, scale: image ? 1 + Math.abs(speed) : 1 },
        {
          yPercent: shift,
          ease: "none",
          scrollTrigger: {
            trigger: image ? (el.parentElement ?? el) : el,
            start: "top bottom",
            end: "bottom top",
            scrub: true,
          },
        },
      );
    },
    { scope: ref, dependencies: [speed, image] },
  );

  return (
    <Tag
      ref={ref}
      className={className}
      style={{ willChange: "transform", ...style }}
    >
      {children}
    </Tag>
  );
}
