"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  videoSrc: string;
  stillSrc: string;
  stillMobileSrc: string;
  stillAlt: string;
};

/** Video plays once → crossfade to still (portrait still on mobile). */
export function HeroMedia({
  videoSrc,
  stillSrc,
  stillMobileSrc,
  stillAlt,
}: Props) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const stillRef = useRef<HTMLImageElement>(null);
  const doneRef = useRef(false);
  const [isMobile, setIsMobile] = useState(false);
  const [poster, setPoster] = useState(stillSrc);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 767px)");
    const apply = () => {
      setIsMobile(mq.matches);
      setPoster(mq.matches ? stillMobileSrc : stillSrc);
    };
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, [stillSrc, stillMobileSrc]);

  useEffect(() => {
    const video = videoRef.current;
    const still = stillRef.current;
    if (!video || !still) return;

    doneRef.current = false;

    const finish = () => {
      if (doneRef.current) return;
      doneRef.current = true;
      gsap.to(still, { opacity: 1, duration: 0.5, ease: "power2.out" });
      gsap.to(video, { opacity: 0, duration: 0.5, ease: "power2.out" });
      window.dispatchEvent(new CustomEvent("aura:hero-media-done"));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduced) {
      still.style.opacity = "1";
      video.style.opacity = "0";
      finish();
      return;
    }

    still.style.opacity = "0";
    video.style.opacity = "1";
    video.muted = true;
    video.playsInline = true;
    video.setAttribute("playsinline", "");
    video.setAttribute("webkit-playsinline", "");

    const onEnded = () => finish();
    video.addEventListener("ended", onEnded);

    const tryPlay = () => {
      void video.play().catch(() => finish());
    };

    if (video.readyState >= 2) {
      tryPlay();
    } else {
      video.addEventListener("loadeddata", tryPlay, { once: true });
      video.load();
    }

    return () => {
      video.removeEventListener("ended", onEnded);
      video.removeEventListener("loadeddata", tryPlay);
    };
  }, [isMobile, poster]);

  return (
    <div className="absolute inset-0 overflow-hidden">
      <img
        ref={stillRef}
        src={poster}
        alt={stillAlt}
        width={isMobile ? 572 : 2560}
        height={isMobile ? 1024 : 1440}
        fetchPriority="high"
        decoding="async"
        className="absolute inset-0 z-[1] h-full w-full object-cover object-[center_22%] opacity-0 md:object-center"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 z-0 h-full w-full scale-105 object-cover object-[center_28%] md:scale-100 md:object-center"
        src={videoSrc}
        poster={poster}
        muted
        playsInline
        preload="auto"
        controls={false}
        disablePictureInPicture
        aria-hidden
      />
    </div>
  );
}
