"use client";

import { useEffect, useRef } from "react";
import { gsap, ScrollTrigger, prefersReducedMotion } from "@/components/motion";

/** Thin top progress — transform only. */
export function ScrollProgress() {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const bar = barRef.current;
    if (!bar || prefersReducedMotion()) return;

    gsap.set(bar, { scaleX: 0, transformOrigin: "0% 50%" });
    const st = ScrollTrigger.create({
      start: 0,
      end: "max",
      onUpdate: (self) => {
        gsap.set(bar, { scaleX: self.progress });
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div
      className="pointer-events-none fixed inset-x-0 top-0 z-[60] h-[2px] overflow-hidden"
      style={{ position: "fixed" }}
      aria-hidden
    >
      <div
        ref={barRef}
        className="h-full w-full origin-left bg-gradient-to-r from-[#007AFF] via-white to-[#007AFF]"
      />
    </div>
  );
}
