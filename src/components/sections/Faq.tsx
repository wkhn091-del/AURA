"use client";

import { useState } from "react";
import { Reveal } from "@/components/motion";
import { easings } from "@/components/motion/config";
import { site } from "@/content/product";

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

const sideNotes = [
  { label: "Ship window", value: "30 business days" },
  { label: "Returns", value: "30-day policy" },
  { label: "Checkout", value: "Guest · Stripe" },
  { label: "Shipping", value: "Free worldwide" },
] as const;

export function Faq() {
  const [open, setOpen] = useState<number | null>(0);
  const waDigits = site.phone.replace(/\D/g, "");
  const waHref = `https://wa.me/${waDigits}?text=${encodeURIComponent(
    "Hi Aura — question about Aura Pro.",
  )}`;

  return (
    <section
      id="faq"
      className="relative bg-[#0a0b0d] px-5 py-20 md:px-12 md:py-28 lg:px-20"
      aria-labelledby="faq-heading"
    >
      <div className="mx-auto grid max-w-6xl gap-14 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.4fr)] lg:gap-20 lg:items-start">
        <div>
          <Reveal y={28}>
            <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
              Before you decide
            </p>
          </Reveal>
          <h2
            id="faq-heading"
            className="text-[clamp(1.85rem,7vw,3rem)] font-bold tracking-[-0.02em] text-white md:text-5xl"
          >
            Straight answers. No script.
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-[#A1A1A6] md:text-base">
            Specs, shipping, and checkout — plain language. Still stuck? Reach
            support on email or WhatsApp.
          </p>

          <dl className="mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-white/15 pt-8">
            {sideNotes.map((note) => (
              <div key={note.label}>
                <dt className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
                  {note.label}
                </dt>
                <dd className="mt-1.5 text-sm font-medium text-white">
                  {note.value}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 border-t border-white/15 pt-8">
            <p className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/45">
              Talk to us
            </p>
            <p className="mt-3 text-sm">
              <a
                href={`mailto:${site.supportEmail}`}
                className="text-white transition-colors hover:text-[color:var(--accent)]"
              >
                <bdi>{site.supportEmail}</bdi>
              </a>
            </p>
            <p className="mt-1 text-sm text-[#A1A1A6]">
              <a
                href={`tel:${site.phone.replace(/\s/g, "")}`}
                className="transition-colors hover:text-white"
              >
                <bdi>{site.phone}</bdi>
              </a>
            </p>
            <a
              href={waHref}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-5 inline-flex text-sm font-medium text-[#25D366] underline-offset-4 hover:underline"
            >
              WhatsApp · Message support
            </a>
          </div>
        </div>

        <ul className="border-t border-white/15">
          {faqs.map((item, i) => {
            const isOpen = open === i;
            return (
              <li key={item.q} className="border-b border-white/15">
                <Reveal y={16} delay={0.03 * i}>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={`faq-panel-${i}`}
                    id={`faq-trigger-${i}`}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="flex w-full items-center justify-between gap-4 py-5 text-start text-base font-medium text-white md:py-6 md:text-lg"
                  >
                    <span>{item.q}</span>
                    <span
                      className="flex h-8 w-8 shrink-0 items-center justify-center text-lg text-white/45 transition-transform duration-400"
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
                    className="pb-5 text-sm leading-relaxed text-[#A1A1A6] md:pb-6 md:text-base"
                  >
                    {isOpen ? <p className="pb-1">{item.a}</p> : null}
                  </div>
                </Reveal>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
