"use client";

import { useEffect, useRef, useState, useTransition } from "react";
import Image from "next/image";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { copy, site, type Product } from "@/content/product";
import { useCart } from "@/store/cart";
import { createCheckoutSession } from "@/app/actions/checkout";
import { joinWaitlist } from "@/app/actions/waitlist";
import { Magnetic } from "@/components/motion";
import { easings } from "@/components/motion/config";
import { Stamp } from "@/components/ui/Stamp";

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
        { opacity: 0, y: 48, scale: 0.88, filter: "blur(10px)" },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          filter: "blur(0px)",
          duration: 1.25,
          stagger: 0.16,
          ease: "expo.out",
          clearProps: "filter",
          scrollTrigger: { trigger: section, start: "top 78%" },
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
      className="relative w-full overflow-hidden px-5 py-20 md:px-6 md:py-32"
    >
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <Image
          src="/lifestyle/city-golden.png"
          alt=""
          fill
          sizes="100vw"
          className="scale-105 object-cover object-[center_22%] md:object-[center_28%]"
          priority={false}
        />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(10,11,13,0.35)_0%,rgba(10,11,13,0.2)_40%,rgba(10,11,13,0.65)_100%)] md:bg-[linear-gradient(180deg,rgba(10,11,13,0.22)_0%,rgba(10,11,13,0.12)_40%,rgba(10,11,13,0.55)_100%)]" />
      </div>

      <div className="relative z-[1] mx-auto flex max-w-4xl flex-col items-center text-center">
        <Stamp className="mb-6 h-24 w-24 opacity-95 md:mb-8 md:h-36 md:w-36" />
        <div data-checkout-reveal className="mb-5 md:mb-6">
          <h2 className="text-[clamp(2.4rem,10vw,4.5rem)] font-bold tracking-[-0.03em] text-white drop-shadow-[0_6px_28px_rgba(0,0,0,0.65)] md:text-7xl">
            {copy.checkoutH2}
          </h2>
        </div>
        <p className="mb-2 font-mono text-lg text-white drop-shadow-[0_2px_12px_rgba(0,0,0,0.7)] md:text-xl">
          {copy.priceLine}
        </p>
        <p className="mb-4 text-sm text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {copy.taxNote}
        </p>
        <p className="mb-10 max-w-lg text-sm text-white/85 drop-shadow-[0_2px_10px_rgba(0,0,0,0.6)]">
          {product.preorderShipNote}
        </p>

        {product.status === "preorder_open" ? (
          <Magnetic strength={0.3}>
            <button
              type="button"
              data-checkout-reveal
              onClick={onPreorder}
              disabled={pending}
              className="inline-flex w-full max-w-[20rem] items-center justify-center rounded-full bg-white px-10 py-4 text-base font-bold text-black shadow-[0_12px_40px_-8px_rgba(255,255,255,0.35)] transition-transform duration-500 hover:scale-[1.03] disabled:opacity-60 md:w-auto md:px-12 md:py-5 md:text-lg"
              style={{ transitionTimingFunction: easings.premiumOut }}
            >
              {pending ? "Starting checkout…" : copy.primaryCta}
            </button>
          </Magnetic>
        ) : product.status === "waitlist" ? (
          <div data-checkout-reveal className="flex w-full max-w-md flex-col gap-3">
            {waitlistOk ? (
              <p className="text-white/85">{copy.waitlistSuccess}</p>
            ) : (
              <>
                <input
                  type="email"
                  value={waitlistEmail}
                  onChange={(e) => setWaitlistEmail(e.target.value)}
                  placeholder="you@email.com"
                  className="rounded-full border border-white/15 bg-black/30 px-5 py-3 text-white outline-none ring-[#007AFF] backdrop-blur-sm focus:ring-2"
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
          <p data-checkout-reveal className="text-lg text-white/85">
            {copy.soldOut}
          </p>
        )}

        {error ? (
          <p className="mt-4 text-sm text-red-400" role="alert">
            {error}
          </p>
        ) : null}

        <p className="mt-4 max-w-md text-xs leading-relaxed text-white/80 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          {copy.heroReassurance}
        </p>
        <p className="mt-4 text-xs text-white/75 drop-shadow-[0_2px_8px_rgba(0,0,0,0.6)]">
          Guest checkout · No account required · {site.brandName}
        </p>
      </div>
    </section>
  );
}
