"use client";

/** E1-13 rotating seal — spin the SVG only; wrapper stays anchored in layout. */
export function Stamp({
  label = "AURA PRO · 40 HR · PRE-ORDER",
  className = "",
}: {
  label?: string;
  className?: string;
}) {
  const id = "aura-stamp-path";
  return (
    <div
      className={`aura-stamp pointer-events-none select-none ${className}`}
      aria-hidden
    >
      <div className="aura-stamp__spin">
        <svg viewBox="0 0 200 200" className="h-full w-full">
          <defs>
            <path
              id={id}
              d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0"
            />
          </defs>
          <circle
            cx="100"
            cy="100"
            r="88"
            fill="none"
            stroke="rgba(255,255,255,0.18)"
            strokeWidth="1"
          />
          <circle
            cx="100"
            cy="100"
            r="62"
            fill="none"
            stroke="rgba(0,122,255,0.35)"
            strokeWidth="1"
          />
          <text
            fill="rgba(245,245,247,0.75)"
            fontSize="11"
            fontFamily="ui-monospace, monospace"
            letterSpacing="0.28em"
          >
            <textPath href={`#${id}`} startOffset="0%">
              {label} · {label}
            </textPath>
          </text>
          <text
            x="100"
            y="106"
            textAnchor="middle"
            fill="#fff"
            fontSize="13"
            fontWeight="700"
            letterSpacing="-0.04em"
            fontFamily="system-ui, sans-serif"
          >
            AURA
          </text>
        </svg>
      </div>
    </div>
  );
}
