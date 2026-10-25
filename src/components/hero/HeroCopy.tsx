"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { copy } from "@/content/product";
import { Magnetic } from "@/components/motion";

/** Animates in after media finishes; copy is always in the DOM (SSR / LCP safe). */
export function HeroCopy() {
  const rootRef = useRef<HTMLDivElement>(null);
  const playedRef = useRef(false);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return;

    const play = () => {
      if (playedRef.current) return;
      playedRef.current = true;
      const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
      const nodes = root.querySelectorAll("[data-hero-reveal]");
      if (reduced) {
        gsap.set(nodes, { opacity: 1, y: 0, filter: "none" });
        return;
      }
      gsap.fromTo(
        nodes,
        { opacity: 0, y: 36, filter: "blur(8px)" },
        {
          opacity: 1,
          y: 0,
          filter: "blur(0px)",
          duration: 1.15,
          stagger: 0.14,
          ease: "power4.out",
          clearProps: "filter",
          overwrite: "auto",
        },
      );
    };

    window.addEventListener("aura:hero-media-done", play);
    const t = window.setTimeout(play, 2500);
    return () => {
      window.removeEventListener("aura:hero-media-done", play);
      window.clearTimeout(t);
    };
  }, []);

  return (
    <div
      ref={rootRef}
      className="absolute inset-x-0 bottom-0 z-10 flex flex-col items-center px-5 pb-[max(1.5rem,env(safe-area-inset-bottom))] text-center md:px-6 md:pb-20"
    >
      <p
        data-hero-reveal
        className="mb-3 font-mono text-[10px] uppercase tracking-[0.35em] text-white/70 opacity-0 md:mb-4 md:text-[11px]"
      >
        Aura Pro · Pre-order
      </p>

      <h1
        data-hero-reveal
        className="aura-metallic max-w-3xl text-[clamp(2.15rem,8.5vw,4.75rem)] font-bold leading-[1.05] tracking-[-0.035em] opacity-0"
      >
        {copy.heroH1}
      </h1>

      <p
        data-hero-reveal
        className="mt-3 max-w-lg text-[0.95rem] leading-relaxed text-white/70 opacity-0 md:mt-5 md:text-[clamp(0.95rem,1.35vw,1.125rem)]"
      >
        {copy.heroH2}
      </p>

      <div data-hero-reveal className="mt-6 flex w-full flex-col items-center gap-3 opacity-0 md:mt-9">
        <Magnetic strength={0.35}>
          <a
            href="#preorder"
            data-cursor="hover"
            className="aura-btn-live inline-flex min-h-12 w-full max-w-[20rem] items-center justify-center rounded-full bg-white px-10 py-3.5 text-base font-bold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[color:var(--accent)] md:py-4"
          >
            {copy.heroCta}
          </a>
        </Magnetic>
        <p className="max-w-md text-[11px] leading-relaxed text-white/45 md:text-[13px]">
          {copy.heroReassurance}
        </p>
      </div>

      <a
        href="#features"
        data-hero-reveal
        data-cursor="hover"
        className="aura-scroll-cue mt-6 hidden flex-col items-center gap-2 opacity-0 md:mt-10 md:flex"
        aria-label="Scroll to tech"
      >
        <span className="font-mono text-[9px] uppercase tracking-[0.28em] text-white/40">
          Scroll
        </span>
        <span className="h-8 w-px bg-gradient-to-b from-white/50 to-transparent" />
      </a>
    </div>
  );
}
