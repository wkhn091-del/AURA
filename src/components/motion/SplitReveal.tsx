"use client";

/**
 * Mask reveal without GSAP Club SplitText — overflow mask + yPercent spring.
 * Drop-in API compatible with motion-kit SplitReveal for lines mode.
 */

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";
import "./motion.css";

export interface SplitRevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
  by?: "lines" | "words" | "chars";
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: number;
  scrub?: boolean;
  start?: string;
  immediate?: boolean;
}

export function SplitReveal({
  children,
  as: Tag = "h2",
  className,
  style,
  id,
  delay = 0,
  duration,
  ease,
  scrub = false,
  start,
  immediate = false,
}: SplitRevealProps) {
  const ref = useRef<HTMLElement>(null);
  const innerRef = useRef<HTMLSpanElement>(null);
  const { settings } = useMotion();

  useGSAP(
    () => {
      const el = ref.current;
      const inner = innerRef.current;
      if (!el || !inner) return;
      el.removeAttribute("data-motion-pending");
      if (prefersReducedMotion()) {
        gsap.set(inner, { yPercent: 0 });
        return;
      }

      gsap.fromTo(
        inner,
        { yPercent: 110 },
        {
          yPercent: 0,
          delay,
          duration: duration ?? settings.duration,
          ease: scrub ? "none" : (ease ?? settings.ease),
          ...(scrub
            ? {
                scrollTrigger: {
                  trigger: el,
                  start: "top 90%",
                  end: "bottom 55%",
                  scrub: true,
                },
              }
            : !immediate && {
                scrollTrigger: {
                  trigger: el,
                  start: start ?? settings.start,
                  once: true,
                },
              }),
        },
      );
    },
    { scope: ref, dependencies: [settings, immediate, scrub] },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      className={className}
      style={style}
      data-motion-pending=""
    >
      <span className="mk-split-mask">
        <span ref={innerRef} className="mk-split-inner">
          {children}
        </span>
      </span>
    </Tag>
  );
}
