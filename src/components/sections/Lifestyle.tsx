"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy, type Product } from "@/content/product";
import { Magnetic, Parallax } from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

export function Lifestyle({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const image = imageRef.current;
    const text = textRef.current;
    if (!section || !image || !text) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        image,
        { opacity: 0, y: 90, scale: 0.96 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 1.35,
          ease: "power4.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        },
      );
      gsap.fromTo(
        text.querySelectorAll("[data-reveal]"),
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 1,
          stagger: 0.12,
          ease: "power3.out",
          scrollTrigger: { trigger: section, start: "top 70%" },
        },
      );
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="section-panel relative overflow-hidden px-6 py-28 md:px-12 lg:px-20"
    >
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-14 md:grid-cols-2 md:gap-20">
        <div ref={imageRef} className="relative opacity-0">
          <div className="aura-glow-card relative overflow-hidden rounded-[1.75rem] p-0">
            <div className="overflow-hidden">
              <Parallax image speed={0.12}>
                <img
                  src={product.lifestyleSrc}
                  alt="Aura Pro in a real-world setting"
                  className="h-auto w-full object-cover"
                />
              </Parallax>
            </div>
            {product.isSimulationImagery ? (
              <span className="absolute left-4 top-4 z-10 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-[#86868B] backdrop-blur-md">
                Simulation
              </span>
            ) : null}
          </div>
        </div>
        <div ref={textRef} className="flex flex-col gap-6">
          <p
            data-reveal
            className="font-mono text-[11px] uppercase tracking-[0.22em] text-[color:var(--accent)] opacity-0"
          >
            On the street
          </p>
          <h2
            data-reveal
            className="text-4xl font-bold tracking-[-0.03em] text-white opacity-0 md:text-5xl"
          >
            {copy.lifestyleH2}
          </h2>
          <p
            data-reveal
            className="max-w-prose text-base leading-relaxed text-[#A1A1A6] opacity-0 md:text-lg"
          >
            {copy.lifestyleBody}
          </p>
          <div data-reveal className="opacity-0">
            <Magnetic strength={0.25}>
              <a
                href="#features"
                data-cursor="hover"
                className="inline-flex items-center justify-center rounded-full border border-white/15 bg-white/[0.05] px-7 py-3 text-sm font-medium tracking-wide text-white backdrop-blur-md transition-[background-color,border-color,box-shadow] duration-500 hover:border-white/30 hover:bg-white/10 hover:shadow-[0_0_30px_rgba(0,122,255,0.15)]"
                style={{ transitionTimingFunction: "var(--ease-premium)" }}
              >
                {copy.lifestyleCta}
              </a>
            </Magnetic>
          </div>
        </div>
      </div>
    </section>
  );
}
