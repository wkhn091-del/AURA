"use client";

import { useRef, type CSSProperties } from "react";
import { gsap, prefersReducedMotion, useGSAP } from "./gsap";

export interface CounterProps {
  to: number;
  from?: number;
  duration?: number;
  decimals?: number;
  prefix?: string;
  suffix?: string;
  locale?: string;
  className?: string;
  style?: CSSProperties;
}

export function Counter({
  to,
  from = 0,
  duration = 2,
  decimals = 0,
  prefix = "",
  suffix = "",
  locale,
  className,
  style,
}: CounterProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const format = (n: number) =>
    prefix +
    new Intl.NumberFormat(locale, {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }).format(n) +
    suffix;

  useGSAP(
    () => {
      const el = ref.current;
      if (!el) return;
      if (prefersReducedMotion()) return;

      const state = { value: from };
      el.textContent = format(from);
      gsap.to(state, {
        value: to,
        duration,
        ease: "power2.out",
        onUpdate: () => {
          el.textContent = format(state.value);
        },
        scrollTrigger: { trigger: el, start: "top 90%", once: true },
      });
    },
    {
      scope: ref,
      dependencies: [to, from, duration, decimals, prefix, suffix, locale],
    },
  );

  return (
    <span
      ref={ref}
      className={className}
      style={{ fontVariantNumeric: "tabular-nums", ...style }}
    >
      {format(to)}
    </span>
  );
}
