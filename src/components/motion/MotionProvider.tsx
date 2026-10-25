"use client";

import Lenis from "lenis";
import "lenis/dist/lenis.css";
import "./motion.css";
import { usePathname } from "next/navigation";
import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  type ReactNode,
} from "react";
import { presets, type MotionPreset, type MotionSettings } from "./config";
import { gsap, prefersReducedMotion, ScrollTrigger } from "./gsap";

type ScrollTarget = number | string | HTMLElement;

interface MotionContextValue {
  settings: MotionSettings;
  getLenis: () => Lenis | null;
  scrollTo: (
    target: ScrollTarget,
    options?: { offset?: number; immediate?: boolean },
  ) => void;
}

const MotionContext = createContext<MotionContextValue>({
  settings: presets.studio,
  getLenis: () => null,
  scrollTo: () => {},
});

export interface MotionProviderProps {
  children: ReactNode;
  preset?: MotionPreset;
  overrides?: Partial<MotionSettings>;
  smooth?: boolean;
}

export function MotionProvider({
  children,
  preset = "studio",
  overrides,
  smooth,
}: MotionProviderProps) {
  const lenisRef = useRef<Lenis | null>(null);
  const pathname = usePathname();

  const overridesKey = JSON.stringify(overrides ?? {});
  const settings = useMemo<MotionSettings>(
    () => ({
      ...presets[preset],
      ...(JSON.parse(overridesKey) as Partial<MotionSettings>),
    }),
    [preset, overridesKey],
  );
  const smoothEnabled = smooth ?? settings.lerp < 1;

  useEffect(() => {
    if (!smoothEnabled || prefersReducedMotion()) return;

    const fine =
      typeof window !== "undefined" &&
      window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (!fine) return;

    const lenis = new Lenis({
      lerp: settings.lerp,
      autoRaf: false,
      anchors: true,
      stopInertiaOnNavigate: true,
    });
    lenisRef.current = lenis;

    lenis.on("scroll", ScrollTrigger.update);
    const tick = (time: number) => lenis.raf(time * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      gsap.ticker.remove(tick);
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [smoothEnabled, settings.lerp]);

  useEffect(() => {
    let timer: ReturnType<typeof setTimeout> | undefined;
    const observer = new ResizeObserver(() => {
      clearTimeout(timer);
      timer = setTimeout(() => ScrollTrigger.refresh(), 200);
    });
    observer.observe(document.body);
    return () => {
      clearTimeout(timer);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    const id = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => cancelAnimationFrame(id);
  }, [pathname]);

  const value = useMemo<MotionContextValue>(
    () => ({
      settings,
      getLenis: () => lenisRef.current,
      scrollTo: (target, options = {}) => {
        const lenis = lenisRef.current;
        if (lenis) {
          lenis.scrollTo(target, options);
          return;
        }
        const el =
          typeof target === "string"
            ? document.querySelector<HTMLElement>(target)
            : target;
        const top =
          typeof el === "number"
            ? el
            : el
              ? el.getBoundingClientRect().top + window.scrollY
              : 0;
        window.scrollTo({
          top: top + (options.offset ?? 0),
          behavior: options.immediate ? "auto" : "smooth",
        });
      },
    }),
    [settings],
  );

  return (
    <MotionContext.Provider value={value}>{children}</MotionContext.Provider>
  );
}

export function useMotion() {
  return useContext(MotionContext);
}
