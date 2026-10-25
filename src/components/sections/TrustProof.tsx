"use client";

import { Counter, Reveal, SplitReveal } from "@/components/motion";
import { copy, site } from "@/content/product";

const anchors = [
  {
    label: "Battery",
    value: (
      <>
        <Counter to={40} suffix=" hr" className="text-white" />
        <span className="sr-only">40 hours</span>
      </>
    ),
    note: "Playback on a single charge",
  },
  {
    label: "Price",
    value: <span className="text-white">$349</span>,
    note: "Fixed · taxes at checkout",
  },
  {
    label: "Shipping",
    value: <span className="text-white">Free</span>,
    note: "Worldwide · every order",
  },
  {
    label: "Returns",
    value: <span className="text-white">30 days</span>,
    note: "Buyer pays return shipping unless defective",
  },
] as const;

export function TrustProof() {
  return (
    <section
      id="trust"
      className="section-panel relative px-6 py-24 md:px-12 lg:px-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl">
        <Reveal y={40}>
          <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
            Why pre-order Aura Pro
          </p>
        </Reveal>
        <SplitReveal
          id="trust-heading"
          as="h2"
          className="max-w-2xl text-3xl font-bold tracking-[-0.02em] text-white md:text-5xl"
        >
          Specs you can verify. Promises we can ship.
        </SplitReveal>
        <Reveal y={24} delay={0.15}>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--text-dim)]">
            No star ratings yet — we won&apos;t invent them. Until owners
            review, these are the cold-start anchors: battery, price clarity,
            free shipping, and a real returns window.
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {anchors.map((a, i) => (
            <Reveal key={a.label} y={32} delay={0.08 * i} as="article">
              <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-5 shadow-[0_20px_50px_-28px_rgba(0,0,0,0.8),0_1px_0_rgba(255,255,255,0.06)_inset] md:p-6">
                <p className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--muted)]">
                  {a.label}
                </p>
                <p className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                  {a.value}
                </p>
                <p className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]">
                  {a.note}
                </p>
              </div>
            </Reveal>
          ))}
        </div>

        <Reveal y={20} delay={0.2} className="mt-10">
          <p className="text-sm text-[color:var(--muted)]">
            Questions before you buy?{" "}
            <a
              href={`mailto:${site.supportEmail}`}
              className="text-white underline-offset-4 hover:underline"
            >
              <bdi>{site.supportEmail}</bdi>
            </a>
            {" · "}
            <a
              href={`tel:${site.phone.replace(/\s/g, "")}`}
              className="text-white underline-offset-4 hover:underline"
            >
              <bdi>{site.phone}</bdi>
            </a>
            {" · "}
            <a href="#preorder" className="text-white underline-offset-4 hover:underline">
              {copy.primaryCta}
            </a>
          </p>
        </Reveal>
      </div>
    </section>
  );
}
