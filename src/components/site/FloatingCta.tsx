"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy } from "@/content/product";
import { Magnetic } from "@/components/motion";
import { easings } from "@/components/motion/config";

gsap.registerPlugin(ScrollTrigger);

export function FloatingCta() {
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    gsap.set(wrap, { opacity: 0, pointerEvents: "none" });

    const trigger = ScrollTrigger.create({
      start: () => window.innerHeight,
      end: "max",
      onUpdate: (self) => {
        const pastHero = self.scroll() >= window.innerHeight;
        gsap.to(wrap, {
          opacity: pastHero ? 1 : 0,
          pointerEvents: pastHero ? "auto" : "none",
          duration: 0.4,
          ease: "power3.out",
          overwrite: "auto",
        });
      },
    });

    return () => {
      trigger.kill();
      gsap.killTweensOf(wrap);
    };
  }, []);

  return (
    <div
      ref={wrapRef}
      className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2 opacity-0 md:bottom-auto md:left-auto md:right-6 md:top-24 md:translate-x-0"
      style={{ position: "fixed" }}
    >
      <Magnetic strength={0.25}>
        <a
          href="#preorder"
          className="inline-flex rounded-full border border-white/20 bg-white/10 px-6 py-2 text-sm font-medium tracking-wide text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] backdrop-blur-md transition-[background-color,border-color,transform] duration-500 hover:scale-[1.03] hover:border-white/30 hover:bg-white/15"
          style={{ transitionTimingFunction: easings.premiumOut }}
          aria-label={copy.floatingCta}
        >
          {copy.floatingCta}
        </a>
      </Magnetic>
    </div>
  );
}
