"use client";

import {
  useRef,
  type CSSProperties,
  type HTMLAttributes,
  type ReactNode,
  type PointerEvent as ReactPointerEvent,
} from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/components/motion";

/** E1-51 Tilt + shine — 3D hover card, transform only. */
export function TiltCard({
  children,
  className,
  style,
  maxTilt = 8,
  ...rest
}: {
  children: ReactNode;
  className?: string;
  style?: CSSProperties;
  maxTilt?: number;
} & HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  const onMove = (e: ReactPointerEvent<HTMLDivElement>) => {
    const el = ref.current;
    if (!el || !hasFinePointer() || prefersReducedMotion()) return;
    const r = el.getBoundingClientRect();
    const px = (e.clientX - r.left) / r.width;
    const py = (e.clientY - r.top) / r.height;
    const rx = (py - 0.5) * -2 * maxTilt;
    const ry = (px - 0.5) * 2 * maxTilt;
    gsap.to(el, {
      rotateX: rx,
      rotateY: ry,
      duration: 0.45,
      ease: "power3.out",
      transformPerspective: 900,
    });
    if (shineRef.current) {
      gsap.to(shineRef.current, {
        opacity: 0.55,
        backgroundPosition: `${px * 100}% ${py * 100}%`,
        duration: 0.35,
      });
    }
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    gsap.to(el, {
      rotateX: 0,
      rotateY: 0,
      duration: 0.7,
      ease: "elastic.out(1, 0.45)",
    });
    if (shineRef.current) {
      gsap.to(shineRef.current, { opacity: 0, duration: 0.4 });
    }
  };

  return (
    <div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={onLeave}
      className={className}
      style={{ transformStyle: "preserve-3d", ...style }}
      data-cursor="hover"
      {...rest}
    >
      <div
        ref={shineRef}
        className="pointer-events-none absolute inset-0 z-10 rounded-[inherit] opacity-0"
        style={{
          background:
            "radial-gradient(circle at 50% 50%, rgba(255,255,255,0.22) 0%, transparent 55%)",
          mixBlendMode: "soft-light",
        }}
        aria-hidden
      />
      {children}
    </div>
  );
}
