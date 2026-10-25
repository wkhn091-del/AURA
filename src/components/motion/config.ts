/**
 * Motion presets. One prop on <MotionProvider preset="..."> changes the feel of the whole site.
 */

export interface MotionSettings {
  ease: string;
  duration: number;
  distance: number;
  stagger: number;
  lerp: number;
  start: string;
}

export type MotionPreset = "luxury" | "studio" | "snappy" | "minimal";

export const presets: Record<MotionPreset, MotionSettings> = {
  luxury: {
    ease: "expo.out",
    duration: 1.6,
    distance: 60,
    stagger: 0.12,
    lerp: 0.07,
    start: "top 85%",
  },
  studio: {
    ease: "power4.out",
    duration: 1.2,
    distance: 80,
    stagger: 0.08,
    lerp: 0.1,
    start: "top 85%",
  },
  snappy: {
    ease: "power3.out",
    duration: 0.7,
    distance: 32,
    stagger: 0.05,
    lerp: 0.14,
    start: "top 90%",
  },
  minimal: {
    ease: "power2.out",
    duration: 0.6,
    distance: 16,
    stagger: 0.04,
    lerp: 1,
    start: "top 90%",
  },
};

/** CSS cubic-bezier twins for Tailwind / inline transitions */
export const easings = {
  premiumOut: "cubic-bezier(0.16, 1, 0.3, 1)",
  softSpring: "cubic-bezier(0.34, 1.56, 0.64, 1)",
  editorial: "cubic-bezier(0.22, 1, 0.36, 1)",
} as const;
