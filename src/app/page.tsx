import { product } from "@/content/product";
import { Hero } from "@/components/hero/Hero";
import { SpecMarquee } from "@/components/sections/SpecMarquee";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Features } from "@/components/sections/Features";
import { ColorLineup } from "@/components/sections/ColorLineup";
import { Gallery } from "@/components/sections/Gallery";
import { TrustProof } from "@/components/sections/TrustProof";
import { Faq } from "@/components/sections/Faq";
import { Checkout } from "@/components/sections/Checkout";

export default function Home() {
  return (
    <main id="main" className="relative w-full">
      <Hero />
      <SpecMarquee />
      <Lifestyle product={product} />
      <Features />
      <ColorLineup />
      <Gallery product={product} />
      <TrustProof />
      <Faq />
      <Checkout product={product} />
    </main>
  );
}
