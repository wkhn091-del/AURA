"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy, product } from "@/content/product";
import { Reveal } from "@/components/motion";

gsap.registerPlugin(ScrollTrigger);

const COLOR_FROM = "#1e2d45";
const COLOR_TO = "#121820";

/** Color series film — loops while visible on mobile + desktop. */
export function ColorLineup() {
  const sectionRef = useRef<HTMLElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const bg = bgRef.current;
    if (!section || !bg) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const ctx = gsap.context(() => {
      gsap.set(bg, { backgroundColor: COLOR_FROM });
      if (!reduced) {
        gsap.to(bg, {
          backgroundColor: COLOR_TO,
          ease: "none",
          scrollTrigger: {
            trigger: section,
            start: "top 60%",
            end: "bottom bottom",
            scrub: 1.1,
          },
        });
      } else {
        gsap.set(bg, { backgroundColor: COLOR_TO });
      }
    }, section);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    const video = videoRef.current;
    if (!section || !video) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      video.pause();
      return;
    }

    const play = () => {
      video.muted = true;
      void video.play().catch(() => {
        /* autoplay blocked — poster still visible */
      });
    };

    const pause = () => {
      video.pause();
    };

    const st = ScrollTrigger.create({
      trigger: section,
      start: "top 85%",
      end: "bottom 15%",
      onEnter: play,
      onEnterBack: play,
      onLeave: pause,
      onLeaveBack: pause,
    });

    if (st.isActive) play();

    return () => {
      pause();
      st.kill();
    };
  }, []);

  return (
    <section
      id="colors"
      ref={sectionRef}
      className="relative overflow-hidden"
      aria-labelledby="colors-heading"
    >
      <div ref={bgRef} className="absolute inset-0" aria-hidden />

      <div className="relative z-[1] px-5 pb-8 pt-20 md:px-12 md:pb-12 md:pt-28 lg:px-20">
        <div className="mx-auto max-w-6xl">
          <Reveal y={24}>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
              {copy.colorsEyebrow}
            </p>
          </Reveal>
          <h2
            id="colors-heading"
            className="max-w-3xl text-[clamp(2rem,8vw,3.75rem)] font-bold tracking-[-0.03em] text-white md:text-5xl lg:text-6xl"
          >
            {copy.colorsH2}
          </h2>
          <Reveal y={16} delay={0.06}>
            <p className="mt-4 max-w-xl text-sm leading-relaxed text-[#B8BCC8] md:mt-5 md:text-lg">
              {copy.colorsBody}
            </p>
          </Reveal>
        </div>
      </div>

      <div className="relative z-[1] mx-auto w-full max-w-6xl px-5 pb-14 md:px-12 md:pb-16 lg:px-20">
        <figure className="relative aspect-video w-full overflow-hidden rounded-2xl border border-white/10 bg-black md:rounded-3xl">
          <video
            ref={videoRef}
            className="absolute inset-0 z-[1] h-full w-full object-cover object-center"
            src={product.colorSeriesVideoSrc}
            poster={product.colorLineupSrc}
            muted
            loop
            playsInline
            autoPlay
            preload="auto"
            controls={false}
            disablePictureInPicture
            aria-label="Aura Pro color series film"
          />
        </figure>

        <div className="mt-6 flex flex-col gap-4 md:mt-8 md:flex-row md:items-center md:justify-between md:gap-5">
          <div className="flex flex-wrap gap-2">
            {["Titanium Black", "Deep Blue", "Forest", "Rose"].map((name, i) => (
              <span
                key={name}
                className={`rounded-full border px-3 py-1.5 text-[11px] font-medium md:px-4 md:py-2 md:text-sm ${
                  i === 0
                    ? "border-white/40 bg-white text-black"
                    : "border-white/20 bg-white/5 text-white/85"
                }`}
              >
                {name}
                {i === 0 ? " · Now" : " · Soon"}
              </span>
            ))}
          </div>
          <a
            href="#preorder"
            className="inline-flex w-full items-center justify-center rounded-full bg-white px-8 py-3.5 text-sm font-bold text-black transition-transform hover:scale-[1.03] md:w-fit"
          >
            Claim Titanium Black
          </a>
        </div>
      </div>
    </section>
  );
}
