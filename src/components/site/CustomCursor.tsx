"use client";

import { useEffect, useRef } from "react";
import { gsap, hasFinePointer, prefersReducedMotion } from "@/components/motion";

/** DOM magnetic cursor — fine pointer only (book E1-50 / A11). */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!hasFinePointer() || prefersReducedMotion()) return;
    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    document.documentElement.classList.add("aura-cursor-on");

    const xTo = gsap.quickTo(dot, "x", { duration: 0.12, ease: "power3.out" });
    const yTo = gsap.quickTo(dot, "y", { duration: 0.12, ease: "power3.out" });
    const rxTo = gsap.quickTo(ring, "x", { duration: 0.45, ease: "power3.out" });
    const ryTo = gsap.quickTo(ring, "y", { duration: 0.45, ease: "power3.out" });

    const onMove = (e: PointerEvent) => {
      xTo(e.clientX);
      yTo(e.clientY);
      rxTo(e.clientX);
      ryTo(e.clientY);
    };

    const onOver = (e: PointerEvent) => {
      const t = e.target as HTMLElement | null;
      const hot = t?.closest?.("a, button, [data-cursor='hover']");
      gsap.to(ring, {
        scale: hot ? 2.4 : 1,
        opacity: hot ? 0.35 : 0.55,
        duration: 0.35,
        ease: "power3.out",
      });
      gsap.to(dot, {
        scale: hot ? 0.4 : 1,
        duration: 0.35,
        ease: "power3.out",
      });
    };

    window.addEventListener("pointermove", onMove);
    window.addEventListener("pointerover", onOver);
    return () => {
      document.documentElement.classList.remove("aura-cursor-on");
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerover", onOver);
    };
  }, []);

  return (
    <div
      className="aura-cursor pointer-events-none fixed inset-0 z-[100] hidden"
      style={{ position: "fixed" }}
      aria-hidden
    >
      <div
        ref={ringRef}
        className="aura-cursor__ring absolute left-0 top-0 h-10 w-10 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/40"
      />
      <div
        ref={dotRef}
        className="aura-cursor__dot absolute left-0 top-0 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-white"
      />
    </div>
  );
}
