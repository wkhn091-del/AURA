"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { features } from "@/content/product";
import { SplitReveal } from "@/components/motion";
import { TiltCard } from "@/components/ui/TiltCard";

gsap.registerPlugin(ScrollTrigger);

const icons = [
  <svg key="anc" viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
    <path d="M12 3v3M12 18v3M4.9 4.9l2.1 2.1M17 17l2.1 2.1M3 12h3M18 12h3M4.9 19.1 7 17M17 7l2.1-2.1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <circle cx="12" cy="12" r="3.5" stroke="currentColor" strokeWidth="1.5" />
  </svg>,
  <svg key="ti" viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
    <path d="M4 10v4a8 8 0 0 0 16 0v-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M8 10V7a4 4 0 0 1 8 0v3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M4 12H2M22 12h-2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
  </svg>,
  <svg key="bat" viewBox="0 0 24 24" fill="none" className="h-7 w-7" aria-hidden>
    <rect x="2" y="7" width="18" height="10" rx="2" stroke="currentColor" strokeWidth="1.5" />
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
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 56 },
        {
          opacity: 1,
          y: 0,
          duration: 1.1,
          stagger: 0.16,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="features"
      ref={sectionRef}
      className="section-panel relative px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto mb-14 max-w-6xl">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
          The instrument
        </p>
        <SplitReveal
          as="h2"
          className="max-w-xl text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl"
        >
          Three reasons the city stays outside.
        </SplitReveal>
      </div>

      <div
        className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-3 md:gap-8"
        style={{ perspective: "1200px" }}
      >
        {features.map((feature, i) => (
          <TiltCard
            key={feature.title}
            data-feature-card
            className="aura-glow-card relative h-full p-8 opacity-0 transition-[box-shadow] duration-500 hover:shadow-[var(--shadow-glow)]"
          >
            <div className="relative z-[1] mb-8 flex items-center justify-between">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.04] text-white shadow-[0_0_24px_rgba(0,122,255,0.15)]">
                {icons[i]}
              </div>
              <span className="font-mono text-xs tracking-[0.18em] text-[#007AFF]">
                {feature.mono}
              </span>
            </div>
            <h3 className="relative z-[1] text-xl font-bold tracking-tight text-white md:text-[1.35rem]">
              {feature.title}
            </h3>
            <p className="relative z-[1] mt-3 text-sm leading-relaxed text-[#86868B] md:text-base">
              {feature.description}
            </p>
          </TiltCard>
        ))}
      </div>
    </section>
  );
}
