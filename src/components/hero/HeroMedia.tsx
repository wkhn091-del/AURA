"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

type Props = {
  videoSrc: string;
  stillSrc: string;
  stillAlt: string;
};

/**
 * Client media layer only: HQ video plays once → crossfade to sharp still.
 * No scroll-scrub. Copy/CTA live in the server-rendered Hero shell.
 */
export function HeroMedia({ videoSrc, stillSrc, stillAlt }: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);
  const doneRef = useRef(false);

  useEffect(() => {
    const video = videoRef.current;
    const still = stillRef.current;
    if (!video || !still) return;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      gsap.to(still, { opacity: 1, duration: 0.45, ease: "power2.out" });
      gsap.to(video, { opacity: 0, duration: 0.45, ease: "power2.out" });
      window.dispatchEvent(new CustomEvent("aura:hero-media-done"));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      still.style.opacity = "1";
      video.style.opacity = "0";
      finish();
      return;
    }

    video.addEventListener("ended", finish);
    void video.play().catch(() => finish());

    return () => video.removeEventListener("ended", finish);
  }, []);

  return (
    <>
      <img
        ref={stillRef}
        src={stillSrc}
        alt={stillAlt}
        width={2560}
        height={1440}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover opacity-0"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 h-full w-full object-cover"
        src={videoSrc}
        poster={stillSrc}
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden
      />
    </>
  );
}
