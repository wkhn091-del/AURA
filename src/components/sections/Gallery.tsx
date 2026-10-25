"use client";

import { useState } from "react";
import { type Product } from "@/content/product";
import { HorizontalScroll, TextFill } from "@/components/motion";

/** Desktop: pinned filmstrip. Mobile: vertical stack so images read fully. */
export function Gallery({ product }: { product: Product }) {
  const slides = product.gallery;
  const [progress, setProgress] = useState(0);
  const active = Math.min(
    slides.length - 1,
    Math.floor(progress * (slides.length - 0.001)),
  );

  return (
    <div id="gallery">
      {/* Mobile — full-width vertical images */}
      <section className="relative bg-[color:var(--bg-deep)] px-5 py-20 md:hidden">
        <p className="mb-3 font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
          Gallery
        </p>
        <h2 className="text-[clamp(2rem,8vw,2.75rem)] font-bold leading-[1.05] tracking-[-0.035em] text-white">
          Every angle.
          <br />
          Same instrument.
        </h2>
        <p className="mt-4 max-w-sm text-sm leading-relaxed text-white/50">
          Street, mall, park — same quiet, every place you move.
        </p>

        <ul className="mt-10 space-y-5">
          {slides.map((item, i) => (
            <li key={item.src}>
              <article className="aura-gallery-panel relative aspect-[4/5] overflow-hidden rounded-[1.5rem] border border-white/12">
                <img
                  src={item.src}
                  alt={item.alt}
                  className="absolute inset-0 h-full w-full object-cover object-center"
                  loading="lazy"
                  draggable={false}
                />
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/75 via-black/15 to-transparent" />
                <div className="absolute inset-x-0 bottom-0 p-5">
                  <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
                    Frame 0{i + 1}
                  </p>
                  <p className="mt-1.5 text-sm font-medium text-white">{item.alt}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>

      {/* Desktop — pinned horizontal */}
      <HorizontalScroll
        className="relative hidden h-screen w-full bg-[color:var(--bg-deep)] px-5 py-20 md:block md:px-10 md:py-24"
        trackClassName="items-center"
        gap="1.75rem"
        scrub={0.8}
        disableBelow={768}
        onProgress={setProgress}
      >
        <div className="flex h-[74vh] w-[min(36vw,30rem)] shrink-0 flex-col justify-center">
          <p className="mb-4 font-mono text-[11px] uppercase tracking-[0.28em] text-[color:var(--accent)]">
            Gallery · locked scroll
          </p>
          <TextFill className="text-[clamp(2.35rem,4.8vw,4.25rem)] font-bold leading-[1.05] tracking-[-0.035em]">
            Every angle.
            <br />
            Same instrument.
          </TextFill>
          <p className="mt-6 max-w-xs text-sm leading-relaxed text-white/50">
            Keep scrolling — the strip slides until frame 03 is fully in view,
            then the page unlocks downward.
          </p>
          <div className="mt-10 flex items-center gap-3" aria-hidden>
            {slides.map((_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-full transition-[width,background-color] duration-300"
                style={{
                  width: i === active ? 28 : 8,
                  backgroundColor:
                    i === active ? "#007AFF" : "rgba(255,255,255,0.25)",
                }}
              />
            ))}
            <span className="ml-2 font-mono text-[10px] tracking-widest text-white/40">
              0{active + 1} / 0{slides.length}
            </span>
          </div>
        </div>

        {slides.map((item, i) => (
          <article
            key={item.src}
            className="aura-gallery-panel group relative h-[74vh] w-[min(62vw,44rem)] shrink-0 overflow-hidden rounded-[1.75rem] border border-white/12"
          >
            <img
              src={item.src}
              alt={item.alt}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] group-hover:scale-[1.04]"
              style={{
                transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
              }}
              draggable={false}
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/70 via-black/10 to-transparent" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between p-6 md:p-8">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[0.3em] text-white/55">
                  Frame 0{i + 1}
                </p>
                <p className="mt-2 max-w-[16rem] text-sm font-medium text-white md:text-base">
                  {item.alt}
                </p>
              </div>
              <span className="font-mono text-4xl font-bold tracking-tighter text-white/15 md:text-6xl">
                0{i + 1}
              </span>
            </div>
            {product.isSimulationImagery ? (
              <span className="absolute left-4 top-4 rounded-full border border-white/15 bg-black/50 px-3 py-1 text-xs text-[#86868B] backdrop-blur-md">
                Simulation
              </span>
            ) : null}
          </article>
        ))}
      </HorizontalScroll>
    </div>
  );
}
