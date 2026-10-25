"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy, site, type Product } from "@/content/product";
import { useCart } from "@/store/cart";
import { createCheckoutSession } from "@/app/actions/checkout";
import { joinWaitlist } from "@/app/actions/waitlist";
import { SiteFooter } from "@/components/site/SiteFooter";
import { Magnetic } from "@/components/motion";
import { easings } from "@/components/motion/config";

gsap.registerPlugin(ScrollTrigger);

export function Checkout({ product }: { product: Product }) {
  const sectionRef = useRef<HTMLElement>(null);
  const qty = useCart((s) => s.qty);
  const [pending, startTransition] = useTransition();
  const [error, setError] = useState<string | null>(null);
  const [waitlistEmail, setWaitlistEmail] = useState("");
  const [waitlistOk, setWaitlistOk] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const targets = section.querySelectorAll("[data-checkout-reveal]");
    const ctx = gsap.context(() => {
      gsap.fromTo(
        targets,
        { opacity: 0, scale: 0.92 },
        {
          opacity: 1,
          scale: 1,
          duration: 1,
          stagger: 0.18,
          ease: "power2.out",
          scrollTrigger: { trigger: section, start: "top 75%" },
        },
      );
    }, section);
    return () => ctx.revert();
  }, []);

  const onPreorder = () => {
    setError(null);
    startTransition(async () => {
      const result = await createCheckoutSession({ sku: product.sku, qty });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      window.location.href = result.url;
    });
  };

  const onWaitlist = () => {
    setError(null);
    startTransition(async () => {
      const result = await joinWaitlist({ email: waitlistEmail });
      if (!result.ok) {
        setError(result.error);
        return;
      }
      setWaitlistOk(true);
    });
  };

  return (
    <section
      ref={sectionRef}
      id="preorder"
      className="relative w-full bg-gradient-to-b from-[color:var(--bg-elevated)]/40 to-[color:var(--bg-deep)] px-6 py-32"
    >
      <div className="mx-auto flex max-w-4xl flex-col items-center text-center">
        <h2
          data-checkout-reveal
          className="mb-6 text-5xl font-bold tracking-[-0.03em] text-white opacity-0 md:text-7xl"
        >
          {copy.checkoutH2}
        </h2>
        <p className="mb-2 font-mono text-xl text-[#86868B]">{copy.priceLine}</p>
        <p className="mb-4 text-sm text-[#86868B]">{copy.taxNote}</p>
        <p className="mb-10 max-w-lg text-sm text-[#A1A1A6]">
          {product.preorderShipNote}
        </p>

        {product.status === "preorder_open" ? (
          <Magnetic strength={0.3}>
            <button
              type="button"
              data-checkout-reveal
              onClick={onPreorder}
              disabled={pending}
              className="inline-flex items-center justify-center rounded-full bg-white px-12 py-5 text-lg font-bold text-black opacity-0 shadow-[0_12px_40px_-8px_rgba(255,255,255,0.35)] transition-transform duration-500 hover:scale-[1.03] disabled:opacity-60"
              style={{ transitionTimingFunction: easings.premiumOut }}
            >
              {pending ? "Starting checkout…" : copy.primaryCta}
            </button>
          </Magnetic>
        ) : product.status === "waitlist" ? (
          <div data-checkout-reveal className="flex w-full max-w-md flex-col gap-3 opacity-0">
            {waitlistOk ? (
              <p className="text-[#A1A1A6]">{copy.waitlistSuccess}</p>
            ) : (
              <>
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="rounded-full border border-white/15 bg-white/5 px-5 py-3 text-white outline-none ring-[#007AFF] focus:ring-2"
                />
                <button
                  type="button"
                  onClick={onWaitlist}
                  disabled={pending}
                  className="rounded-full bg-white px-8 py-3 font-bold text-black hover:scale-105 disabled:opacity-60"
                >
                  {copy.waitlistCta}
                </button>
              </>
            )}
          </div>
        ) : (
          <p data-checkout-reveal className="text-lg text-[#86868B] opacity-0">
            {copy.soldOut}
          </p>
        )}

        {error ? (
          <p className="mt-4 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <p className="mt-4 max-w-md text-xs leading-relaxed text-[#86868B]">
          {copy.heroReassurance}
        </p>
        <p className="mt-4 text-xs text-[#86868B]">
          Guest checkout · No account required · {site.brandName}
        </p>

        <SiteFooter />
      </div>
    </section>
  );
}
