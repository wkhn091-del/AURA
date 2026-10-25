import { Marquee } from "@/components/motion";

const specs = [
  "Adaptive ANC",
  "Titanium drivers",
  "40-hour battery",
  "Free worldwide shipping",
  "$349 fixed",
  "Guest checkout",
  "30-day returns",
  "BEYOND SOUND",
] as const;

/** E1-66 style trust ticker — pure CSS marquee. */
export function SpecMarquee() {
  return (
    <section
      className="relative border-y border-white/[0.07] bg-gradient-to-b from-white/[0.03] to-transparent py-5"
      aria-label="Product highlights"
    >
      <Marquee duration={42} gap="3.5rem" pauseOnHover>
        {specs.map((s) => (
          <span
            key={s}
            className="flex items-center gap-3.5 font-mono text-[11px] uppercase tracking-[0.22em] text-white/55"
          >
            <span className="h-1 w-1 rounded-full bg-[#007AFF] shadow-[0_0_10px_rgba(0,122,255,0.8)]" />
            {s}
          </span>
        ))}
      </Marquee>
    </section>
  );
}
