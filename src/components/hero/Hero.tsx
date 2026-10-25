import { product } from "@/content/product";
import { HeroMedia } from "@/components/hero/HeroMedia";
import { HeroCopy } from "@/components/hero/HeroCopy";

/** Server shell — single H1, eager poster, 100vh, no scroll-scrub. */
export function Hero() {
  return (
    <section
      className="relative h-screen w-full overflow-hidden bg-[color:var(--bg-deep)]"
      aria-label="Aura Pro hero"
    >
      <HeroMedia
        videoSrc="/hero/aura-pro.mp4"
        stillSrc={product.heroPosterSrc}
        stillAlt="Aura Pro"
      />

      {/* Soft vignette only — keep top of film visible under the glass header */}
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_center,transparent_40%,rgba(5,6,8,0.4)_100%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[color:var(--bg-deep)] via-transparent to-transparent"
        aria-hidden
      />

      <HeroCopy />
    </section>
  );
}
