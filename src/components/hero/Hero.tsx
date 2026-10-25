import { product } from "@/content/product";
import { HeroMedia } from "@/components/hero/HeroMedia";
import { HeroCopy } from "@/components/hero/HeroCopy";

/** Full-viewport hero — media covers the entire section on mobile + desktop. */
export function Hero() {
  return (
    <section
      className="relative h-[100svh] min-h-[36rem] w-full overflow-hidden bg-black"
      aria-label="Aura Pro hero"
    >
      <HeroMedia
        videoSrc="/hero/aura-pro.mp4"
        stillSrc={product.heroPosterSrc}
        stillMobileSrc={product.heroPosterMobileSrc}
        stillAlt="Aura Pro"
      />

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
