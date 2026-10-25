"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

type Props = {
  videoSrc: string;
  stillSrc: string;
  stillMobileSrc: string;
  stillAlt: string;
};

/** Desktop: video → landscape still. Mobile: portrait hero still fills the viewport. */
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
      gsap.to(still, { opacity: 1, duration: 0.45, ease: "power2.out" });
      gsap.to(video, { opacity: 0, duration: 0.45, ease: "power2.out" });
      window.dispatchEvent(new CustomEvent("aura:hero-media-done"));
    };

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // Portrait asset fills mobile hero edge-to-edge — no letterbox video crop.
    if (reduced || isMobile) {
      still.style.opacity = "1";
      video.style.opacity = "0";
      finish();
      return;
    }

    still.style.opacity = "0";
    video.style.opacity = "1";

    video.addEventListener("ended", finish);
    void video.play().catch(() => finish());

    return () => video.removeEventListener("ended", finish);
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
        className="absolute inset-0 h-full w-full object-cover object-[center_22%] opacity-0 md:object-center"
      />
      <video
        ref={videoRef}
        className="absolute inset-0 hidden h-full w-full object-cover object-center md:block"
        src={videoSrc}
        poster={stillSrc}
        muted
        playsInline
        preload="metadata"
        controls={false}
        disablePictureInPicture
        aria-hidden
      />
    </div>
  );
}
