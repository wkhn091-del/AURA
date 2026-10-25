"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/content/product";
import { Stamp } from "@/components/ui/Stamp";

gsap.registerPlugin(ScrollTrigger);

/** Editorial feature list — no cards. */
export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const rows = section.querySelectorAll("[data-feature-row]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(rows, { opacity: 1, clearProps: "transform" });
        return;
      }
      gsap.fromTo(
        rows,
        { opacity: 0, y: 36 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 72%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="relative overflow-hidden bg-transparent px-5 py-20 md:px-12 md:py-32 lg:px-20"
    >
      <div className="relative z-[1] mx-auto mb-12 flex max-w-6xl items-end justify-between gap-8 md:mb-16">
        <div className="min-w-0 flex-1">
          <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] md:mb-4">
            The instrument
          </p>
          <h2 className="max-w-2xl text-[clamp(1.85rem,7vw,3rem)] font-bold tracking-[-0.03em] text-white md:text-5xl">
            Three reasons the city stays outside.
          </h2>
          <p className="mt-3 max-w-xl text-sm leading-relaxed text-[#A1A1A6] md:mt-4 md:text-base">
            Adaptive quiet, titanium clarity, and a full workday of power — built
            for streets that never sleep.
          </p>
        </div>
        <Stamp className="hidden h-28 w-28 shrink-0 opacity-80 md:block lg:h-36 lg:w-36" />
      </div>

      <ul className="relative z-[1] mx-auto max-w-6xl border-t border-white/15">
        {features.map((feature, i) => (
          <li
            key={feature.title}
            data-feature-row
            className="grid grid-cols-[auto_1fr] gap-x-5 gap-y-3 border-b border-white/15 py-8 md:grid-cols-[4.5rem_minmax(0,1fr)_7rem] md:items-baseline md:gap-x-10 md:py-10"
          >
            <span className="font-mono text-sm tracking-[0.2em] text-white/35 md:text-base">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="min-w-0">
              <h3 className="text-xl font-semibold tracking-[-0.02em] text-white md:text-2xl">
                {feature.title}
              </h3>
              <p className="mt-2 max-w-xl text-sm leading-relaxed text-[#A1A1A6] md:mt-3 md:text-base">
                {feature.description}
              </p>
            </div>
            <span className="col-start-2 font-mono text-[11px] tracking-[0.18em] text-[#007AFF] md:col-start-auto md:justify-self-end md:text-xs">
              {feature.mono}
            </span>
          </li>
        ))}
      </ul>

      <div className="relative z-[1] mx-auto mt-12 flex max-w-6xl flex-col gap-4 border-t border-white/15 pt-8 md:mt-16 md:flex-row md:items-center md:justify-between">
        <p className="text-sm text-[#A1A1A6] md:text-base">
          <span className="font-medium text-white">$349</span>
          <span className="mx-2 text-white/25">·</span>
          Free worldwide shipping · Guest checkout
        </p>
        <a
          href="#preorder"
          className="inline-flex w-fit items-center gap-2 text-sm font-semibold text-white underline-offset-4 transition-colors hover:text-[color:var(--accent)] hover:underline"
        >
          Pre-order Now
          <span aria-hidden>→</span>
        </a>
      </div>
    </section>
  );
}
