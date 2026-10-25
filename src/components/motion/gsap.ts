"use client";

import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
  ScrollTrigger.config({ ignoreMobileResize: true });
}

export { gsap, ScrollTrigger, useGSAP };

export function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

export function isRTL(el?: Element | null): boolean {
  if (typeof window === "undefined") return false;
  const target = el ?? document.documentElement;
  return getComputedStyle(target).direction === "rtl";
}

export function hasFinePointer(): boolean {
  return (
    typeof window !== "undefined" &&
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
  );
}
