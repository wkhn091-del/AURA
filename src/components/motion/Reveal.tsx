"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";
import { useMotion } from "./MotionProvider";

export interface RevealProps {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  y?: number;
  x?: number;
  scale?: number;
  blur?: number;
  delay?: number;
  duration?: number;
  ease?: string;
  stagger?: boolean | number;
  once?: boolean;
  start?: string;
  immediate?: boolean;
}

export function Reveal({
  children,
  as: Tag = "div",
  className,
  style,
  y,
  x = 0,
  scale,
  blur,
  delay = 0,
  duration,
  ease,
  stagger = false,
  once = true,
  start,
  immediate = false,
}: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const { settings } = useMotion();

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      el.removeAttribute("data-motion-pending");
      if (prefersReducedMotion()) return;

      const targets = stagger ? Array.from(el.children) : el;
      const from: gsap.TweenVars = {
        autoAlpha: 0,
        y: y ?? settings.distance,
        x,
      };
      const to: gsap.TweenVars = { autoAlpha: 1, y: 0, x: 0 };
      if (scale !== undefined) {
        from.scale = scale;
        to.scale = 1;
      }
      if (blur) {
        from.filter = `blur(${blur}px)`;
        to.filter = "blur(0px)";
        to.clearProps = "filter";
      }

      gsap.fromTo(targets, from, {
        ...to,
        delay,
        duration: duration ?? settings.duration,
        ease: ease ?? settings.ease,
        stagger: stagger === true ? settings.stagger : stagger || 0,
        ...(!immediate && {
          scrollTrigger: {
            trigger: el,
            start: start ?? settings.start,
            toggleActions: once
              ? "play none none none"
              : "play none none reverse",
          },
        }),
      });
    },
    { scope: ref, dependencies: [settings, immediate] },
  );

  return (
    <Tag ref={ref} className={className} style={style}>
      {children}
    </Tag>
  );
}
