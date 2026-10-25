"use client";

import { Reveal, SplitReveal } from "@/components/motion";

export function ColorLineup() {
  return (
    <section
      id="colors"
      className="section-panel relative px-6 py-24 md:px-12 lg:px-20"
      aria-labelledby="colors-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal y={36}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Color series
          </p>
        </Reveal>
        <SplitReveal
          id="colors-heading"
          as="h2"
          className="max-w-xl text-3xl font-bold tracking-[-0.02em] text-white md:text-5xl"
        >
          Titanium Black leads the line.
        </SplitReveal>
        <Reveal y={20} delay={0.1}>
          <p className="mt-4 max-w-lg text-base text-[color:var(--text-dim)]">
            Launch SKU is Titanium Black. The lineup frame shows the series
            language — only Titanium Black is available to pre-order today.
          </p>
        </Reveal>

        <Reveal y={40} delay={0.12} className="mt-12">
          <figure className="relative overflow-hidden rounded-3xl border border-white/10 bg-[#0c0e12] shadow-[0_40px_100px_-40px_rgba(0,0,0,0.9)]">
            <img
              src="/lifestyle/color-lineup.png"
              alt="Aura Pro color series lineup — Titanium Black and companion finishes"
              className="block h-auto w-full object-contain object-center"
              loading="lazy"
            />
            <figcaption className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/55 px-4 py-1.5 text-xs text-[color:var(--muted)] backdrop-blur-md md:bottom-5 md:left-5">
              Available now · Titanium Black
            </figcaption>
          </figure>
        </Reveal>
      </div>
    </section>
  );
}
