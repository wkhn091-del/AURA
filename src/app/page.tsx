import { product } from "@/content/product";
import { Hero } from "@/components/hero/Hero";
import { SpecMarquee } from "@/components/sections/SpecMarquee";
import { Lifestyle } from "@/components/sections/Lifestyle";
import { Features } from "@/components/sections/Features";
import { ScrollColorBand } from "@/components/sections/ScrollColorBand";
import { ColorLineup } from "@/components/sections/ColorLineup";
import { Gallery } from "@/components/sections/Gallery";
import { TrustProof } from "@/components/sections/TrustProof";
import { Faq } from "@/components/sections/Faq";
import { Checkout } from "@/components/sections/Checkout";
import { SiteFooter } from "@/components/site/SiteFooter";

export default function Home() {
  return (
    <main id="main" className="relative w-full">
      <Hero />
      <SpecMarquee />
      <ScrollColorBand from="#0a0b0d" to="#1e2d45">
        <Lifestyle product={product} />
        <Features />
      </ScrollColorBand>
      <ColorLineup />
      <Gallery product={product} />
      <TrustProof />
      <Faq />
      <Checkout product={product} />
      <SiteFooter />
    </main>
  );
}
