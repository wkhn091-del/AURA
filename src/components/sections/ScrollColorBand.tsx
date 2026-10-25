"use client";

import { useEffect, useRef, type ReactNode } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

/** Shared scroll-scrubbed tint behind child sections (studio-style color morph). */
export function ScrollColorBand({
  children,
  from = "#0a0b0d",
  to = "#1e2d45",
  className = "",
}: {
  children: ReactNode;
  from?: string;
  to?: string;
  className?: string;
}) {
  const bandRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const band = bandRef.current;
    if (!band) return;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const ctx = gsap.context(() => {
      gsap.set(band, { backgroundColor: from });
      if (reduced) {
        gsap.set(band, { backgroundColor: to });
        return;
      }
      gsap.fromTo(
        band,
        { backgroundColor: from },
        {
          backgroundColor: to,
          ease: "none",
          scrollTrigger: {
            trigger: band,
            start: "top 45%",
            end: "70% bottom",
            scrub: 1.25,
          },
        },
      );
    }, band);

    return () => ctx.revert();
  }, [from, to]);

  return (
    <div ref={bandRef} className={`relative ${className}`}>
      {children}
    </div>
  );
}
