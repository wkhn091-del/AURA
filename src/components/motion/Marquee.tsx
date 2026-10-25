import type { CSSProperties, ReactNode } from "react";
import "./motion.css";

export interface MarqueeProps {
  children: ReactNode;
  duration?: number;
  gap?: string;
  reverse?: boolean;
  pauseOnHover?: boolean;
  repeat?: number;
  className?: string;
  style?: CSSProperties;
}

export function Marquee({
  children,
  duration = 30,
  gap = "3rem",
  reverse = false,
  pauseOnHover = false,
  repeat = 1,
  className,
  style,
}: MarqueeProps) {
  const items = Array.from({ length: Math.max(1, repeat) }, (_, i) => (
    <div key={i} style={{ display: "contents" }}>
      {children}
    </div>
  ));

  return (
    <div
      className={["mk-marquee", className].filter(Boolean).join(" ")}
      style={
        {
          "--mk-duration": `${duration}s`,
          "--mk-gap": gap,
          ...style,
        } as CSSProperties
      }
      data-reverse={reverse ? "" : undefined}
      data-pause-on-hover={pauseOnHover ? "" : undefined}
    >
      <div className="mk-marquee__track">
        <div className="mk-marquee__group">{items}</div>
        <div className="mk-marquee__group" aria-hidden="true">
          {items}
        </div>
      </div>
    </div>
  );
}
