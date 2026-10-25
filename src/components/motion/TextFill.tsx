"use client";

import { useRef, type CSSProperties, type ElementType, type ReactNode } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

/** E1-11 — optional scroll fill. Always readable even if ScrollTrigger fails. */
export function TextFill({
  children,
  as: Tag = "h2",
  className,
  style,
  id,
}: {
  children: ReactNode;
  as?: ElementType;
  className?: string;
  style?: CSSProperties;
  id?: string;
}) {
  const ref = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const el = ref.current;
      if (!el || prefersReducedMotion()) {
        if (el) el.style.backgroundSize = "100% 100%";
        return;
      }
      gsap.fromTo(
        el,
        { backgroundSize: "0% 100%" },
        {
          backgroundSize: "100% 100%",
          ease: "none",
          scrollTrigger: {
            trigger: el,
            start: "top 85%",
            end: "top 40%",
            scrub: true,
          },
        },
      );
      // Failsafe: if ST never paints, show text after 1.2s
      const t = window.setTimeout(() => {
        const size = getComputedStyle(el).backgroundSize;
        if (size.startsWith("0%")) {
          gsap.set(el, { backgroundSize: "100% 100%" });
        }
      }, 1200);
      return () => window.clearTimeout(t);
    },
    { scope: ref },
  );

  return (
    <Tag
      ref={ref}
      id={id}
      className={["aura-text-fill", className].filter(Boolean).join(" ")}
      style={{ backgroundSize: "100% 100%", ...style }}
    >
      {children}
    </Tag>
  );
}
