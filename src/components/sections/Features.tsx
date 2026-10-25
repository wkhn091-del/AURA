"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/content/product";
import { TiltCard } from "@/components/ui/TiltCard";
import { Stamp } from "@/components/ui/Stamp";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  <svg key="anc" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.4" />
  </svg>,
  <svg key="ti" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <path d="M4 10v4a8 8 0 0 0 16 0v-4" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
    <path d="M4 12H2M22 12h-2" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
  </svg>,
  <svg key="bat" viewBox="0 0 24 24" fill="none" className="h-6 w-6" aria-hidden>
    <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.4" />
    <path d="M20 10v4h1.5a.5.5 0 0 0 .5-.5v-3a.5.5 0 0 0-.5-.5H20Z" fill="currentColor" />
    <path d="M5 10h8v4H5z" fill="currentColor" opacity="0.85" />
  </svg>,
];

export function Features() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll("[data-feature-card]");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      if (reduced) {
        gsap.set(cards, { opacity: 1, clearProps: "transform" });
        return;
      }
      gsap.fromTo(
        cards,
        { opacity: 0, y: 72, rotateX: 14, transformPerspective: 1100 },
        {
          opacity: 1,
          y: 0,
          rotateX: 0,
          duration: 1.4,
          stagger: 0.16,
          ease: "expo.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
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
      <div className="relative z-[1] mx-auto mb-10 flex max-w-6xl items-end justify-between gap-8 md:mb-16">
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

      <div
        className="relative z-[1] mx-auto grid max-w-6xl grid-cols-1 gap-5 md:grid-cols-3 md:gap-8"
        style={{ perspective: "1400px" }}
      >
        {features.map((feature, i) => (
          <TiltCard
            key={feature.title}
            data-feature-card
            maxTilt={9}
            className="aura-luxe-card group relative flex h-full min-h-0 flex-col p-7 md:min-h-[22rem] md:p-9"
          >
            <div className="aura-luxe-card__sheen" aria-hidden />
            <div className="relative z-[1] mb-auto flex items-start justify-between gap-4">
              <span className="font-mono text-[11px] tracking-[0.28em] text-white/35">
                {String(i + 1).padStart(2, "0")}
              </span>
              <span className="font-mono text-[11px] tracking-[0.2em] text-[#6EB6FF]">
                {feature.mono}
              </span>
            </div>

            <div className="relative z-[1] mt-10 mb-8 flex h-14 w-14 items-center justify-center rounded-full border border-white/12 bg-gradient-to-b from-white/10 to-transparent text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.2)]">
              {icons[i]}
            </div>

            <h3 className="relative z-[1] text-[1.35rem] font-semibold tracking-[-0.02em] text-white md:text-xl">
              {feature.title}
            </h3>
            <p className="relative z-[1] mt-3 text-sm leading-relaxed text-[#9AA0AB] md:text-[0.95rem]">
              {feature.description}
            </p>

            <div
              className="relative z-[1] mt-8 h-px w-full bg-gradient-to-r from-transparent via-white/25 to-transparent"
              aria-hidden
            />
            <p className="relative z-[1] mt-4 font-mono text-[10px] uppercase tracking-[0.24em] text-white/30 transition-colors group-hover:text-white/50">
              Aura Pro · Spec
            </p>
          </TiltCard>
        ))}
      </div>

      <div className="relative z-[1] mx-auto mt-10 flex max-w-6xl flex-col items-stretch gap-4 border border-white/10 bg-black/25 px-5 py-5 backdrop-blur-md [border-radius:1.5rem] md:mt-14 md:flex-row md:items-center md:justify-between md:px-7 md:[border-radius:999px_1.25rem]">
        <p className="text-center text-sm text-[#A1A1A6] md:text-start md:text-base">
          <span className="font-medium text-white">$349</span>
          <span className="mx-2 text-white/25">·</span>
          Free worldwide shipping · Guest checkout
        </p>
        <a
          href="#preorder"
          className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-black transition-transform hover:scale-[1.03] md:py-2.5"
        >
          Pre-order Now
        </a>
      </div>
    </section>
  );
}
