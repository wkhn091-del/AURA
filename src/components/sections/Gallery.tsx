"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy, type Product } from "@/content/product";
import { SplitReveal } from "@/components/motion";
import { easings } from "@/components/motion/config";

gsap.registerPlugin(ScrollTrigger);

export function Gallery({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const cards = section.querySelectorAll("[data-gallery-card]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        cards,
        { opacity: 0, y: 60, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.05,
          stagger: 0.12,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 78%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  return (
    <section
      id="gallery"
      ref={sectionRef}
      className="section-panel relative w-full py-28"
    >
      <div className="mb-12 px-6 md:px-24">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)]">
          Gallery
        </p>
        <SplitReveal
          as="h2"
          className="text-3xl font-bold tracking-[-0.03em] text-white md:text-5xl"
        >
          {copy.galleryH2}
        </SplitReveal>
      </div>
      <div className="scrollbar-hide flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-8 md:gap-8 md:px-24">
        {product.gallery.map((item) => (
          <div
            key={item.src}
            data-gallery-card
            data-cursor="hover"
            className="aura-glow-card group relative h-[400px] min-w-[85vw] snap-center overflow-hidden opacity-0 md:h-[520px] md:min-w-[42vw]"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.06]"
              style={{ transitionTimingFunction: easings.premiumOut }}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-transparent" />
            {product.isSimulationImagery ? (
              <span className="absolute bottom-4 left-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-[#86868B] backdrop-blur-md">
                Simulation
              </span>
            ) : null}
          </div>
        ))}
      </div>
    </section>
  );
}
