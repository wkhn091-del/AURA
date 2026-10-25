"use client";

import { useState } from "react";
import { Reveal, SplitReveal } from "@/components/motion";
import { easings } from "@/components/motion/config";

const faqs = [
  {
    q: "When does Aura Pro ship?",
    a: "Pre-orders ship within 30 business days after production begins shipping. You’ll get tracking by email when your unit leaves fulfillment.",
  },
  {
    q: "Is the $349 price final?",
    a: "Yes. $349 USD is the consumer price — no fake “was” price. Taxes are calculated at Stripe Checkout for your shipping country.",
  },
  {
    q: "Do I need an account to buy?",
    a: "No. Guest checkout is the default. We only need what Stripe needs to fulfill and receipt your order.",
  },
  {
    q: "What’s covered if I change my mind?",
    a: "30-day returns. You cover return shipping unless the unit arrived defective or wrong. See Returns for the full policy.",
  },
  {
    q: "Is shipping really free worldwide?",
    a: "Yes — free shipping on every Aura Pro pre-order. Duties or VAT may still apply depending on your country’s import rules.",
  },
  {
    q: "Why no review stars yet?",
    a: "We don’t publish reviews we didn’t earn. Until verified owners write in, we show measurable specs and policies instead.",
  },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section
      id="faq"
      className="section-panel relative px-6 py-24 md:px-12 lg:px-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto max-w-3xl">
        <Reveal y={32}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Before you decide
          </p>
        </Reveal>
        <SplitReveal
          id="faq-heading"
          as="h2"
          className="text-3xl font-bold tracking-[-0.02em] text-white md:text-5xl"
        >
          Straight answers. No script.
        </SplitReveal>

        <ul className="mt-12 space-y-3">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <Reveal key={item.q} y={24} delay={0.05 * i} as="li">
                <div className="overflow-hidden rounded-2xl border border-white/10 bg-white/[0.03]">
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 px-5 py-4 text-start text-base font-medium text-white md:px-6 md:py-5 md:text-lg"
                  >
                    <span>{item.q}</span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-white/15 text-lg text-[color:var(--muted)] transition-transform duration-400"
                      style={{
                        transitionTimingFunction: easings.premiumOut,
                        transform: isOpen ? "rotate(45deg)" : "none",
                      }}
                      aria-hidden
                    >
                      +
                    </span>
                  </button>
                  <div
                    id={`faq-panel-${i}`}
                    role="region"
                    aria-labelledby={`faq-trigger-${i}`}
                    hidden={!isOpen}
                    className="border-t border-white/5 px-5 pb-5 pt-0 text-sm leading-relaxed text-[color:var(--text-dim)] md:px-6 md:pb-6 md:text-base"
                  >
                    {isOpen ? <p className="pt-3">{item.a}</p> : null}
                  </div>
                </div>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
