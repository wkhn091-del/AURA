"use client";

import { useId } from "react";
import { site } from "@/content/product";

type Props = {
  className?: string;
  markOnly?: boolean;
};

/** Premium wordmark — titanium ring + quiet-wave mark + tracked AURA type. */
export function AuraLogo({ className = "", markOnly = false }: Props) {
  const gid = useId().replace(/:/g, "");

  return (
    <span
      className={`inline-flex items-center gap-2.5 text-white ${className}`}
      aria-label={site.brandName}
    >
      <svg
        viewBox="0 0 40 40"
        className="h-7 w-7 shrink-0 md:h-8 md:w-8"
        fill="none"
        aria-hidden
      >
        <defs>
          <linearGradient
            id={`aura-mark-${gid}`}
            x1="8"
            y1="4"
            x2="34"
            y2="36"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#FFFFFF" stopOpacity="0.95" />
            <stop offset="0.45" stopColor="#C8CDD6" stopOpacity="0.9" />
            <stop offset="1" stopColor="#007AFF" stopOpacity="0.85" />
          </linearGradient>
        </defs>
        <circle
          cx="20"
          cy="20"
          r="18"
          stroke={`url(#aura-mark-${gid})`}
          strokeWidth="1.25"
          opacity="0.9"
        />
        <circle
          cx="20"
          cy="20"
          r="11.5"
          stroke="rgba(255,255,255,0.22)"
          strokeWidth="0.75"
        />
        <path
          d="M12.5 20c2.2-3.2 5-4.8 7.5-4.8S25.3 16.8 27.5 20"
          stroke={`url(#aura-mark-${gid})`}
          strokeWidth="1.35"
          strokeLinecap="round"
        />
        <path
          d="M14.5 23.2c1.6-2.2 3.5-3.3 5.5-3.3s3.9 1.1 5.5 3.3"
          stroke="rgba(255,255,255,0.55)"
          strokeWidth="1.15"
          strokeLinecap="round"
        />
        <circle cx="20" cy="26.5" r="1.35" fill="#fff" />
      </svg>

      {!markOnly ? (
        <span className="flex flex-col leading-none">
          <span className="font-sans text-[0.95rem] font-semibold tracking-[-0.06em] md:text-[1.05rem]">
            {site.wordmark}
          </span>
          <span className="mt-0.5 hidden font-mono text-[7px] uppercase tracking-[0.32em] text-white/45 sm:block md:text-[8px]">
            {site.slogan}
          </span>
        </span>
      ) : null}
    </span>
  );
}
