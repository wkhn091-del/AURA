"use client";

import "./motion.css";
import { useRef, type CSSProperties, type ReactNode } from "react";
import {
  gsap,
  isRTL,
  prefersReducedMotion,
  ScrollTrigger,
  useGSAP,
} from "./gsap";

export interface HorizontalScrollProps {
  children: ReactNode;
  gap?: string;
  scrub?: boolean | number;
  disableBelow?: number;
  className?: string;
  trackClassName?: string;
  style?: CSSProperties;
  id?: string;
  /** Called with 0–1 progress while scrubbing. */
  onProgress?: (progress: number) => void;
}

/**
 * Section pins; track slides sideways with vertical scroll (book E1-30 / A06).
 * RTL reverses direction. Below disableBelow → native swipe.
 */
export function HorizontalScroll({
  children,
  gap = "2rem",
  scrub = 1,
  disableBelow = 768,
  className,
  trackClassName,
  style,
  id,
  onProgress,
}: HorizontalScrollProps) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const section = sectionRef.current;
      const track = trackRef.current;
      if (!section || !track || prefersReducedMotion()) return;

      const mm = gsap.matchMedia();
      mm.add(`(min-width: ${disableBelow}px)`, () => {
        const direction = isRTL(section) ? 1 : -1;
        const distance = () => {
          const cs = getComputedStyle(section);
          const padL = parseFloat(cs.paddingLeft) || 0;
          const padR = parseFloat(cs.paddingRight) || 0;
          const inner = section.clientWidth - padL - padR;
          return Math.max(0, track.scrollWidth - inner);
        };

        const tween = gsap.to(track, {
          x: () => direction * distance(),
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: () => `+=${distance() * 1.15}`,
            pin: true,
            scrub,
            anticipatePin: 1,
            invalidateOnRefresh: true,
            onUpdate: (self) => onProgress?.(self.progress),
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          tween.kill();
        };
      });

      if (disableBelow > 0) {
        mm.add(`(max-width: ${disableBelow - 1}px)`, () => {
          section.style.overflowX = "auto";
          return () => {
            section.style.overflowX = "";
          };
        });
      }

      ScrollTrigger.refresh();
      return () => mm.revert();
    },
    { scope: sectionRef, dependencies: [scrub, disableBelow] },
  );

  return (
    <section
      id={id}
      ref={sectionRef}
      className={["mk-hscroll", className].filter(Boolean).join(" ")}
      style={style}
    >
      <div
        ref={trackRef}
        className={["mk-hscroll__track", trackClassName].filter(Boolean).join(" ")}
        style={{ ["--mk-gap" as string]: gap } as CSSProperties}
      >
        {children}
      </div>
    </section>
  );
}
