"use client";

import { Counter, TextFill } from "@/components/motion";
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

/** Desktop-stable trust strip — no pin (pin was blanking the page). */
export function TrustProof() {
  return (
    <section
      id="trust"
      className="section-panel relative px-5 py-20 md:px-12 md:py-24 lg:px-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
          Why pre-order Aura Pro
        </p>
        <TextFill
          id="trust-heading"
          className="max-w-2xl text-[clamp(1.85rem,7vw,3rem)] font-bold tracking-[-0.02em] md:text-5xl"
        >
          Specs you can verify. Promises we can ship.
        </TextFill>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[color:var(--text-dim)]">
          No star ratings yet — we won&apos;t invent them. Until owners review,
          these are the cold-start anchors: battery, price clarity, free
          shipping, and a real returns window.
        </p>

        <div className="mt-14 grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
          {anchors.map((a) => (
            <article
              key={a.label}
              className="aura-glow-card p-5 md:p-6"
            >
              <p className="font-mono text-[11px] uppercase tracking-wider text-[color:var(--muted)]">
                {a.label}
              </p>
              <p className="mt-3 text-2xl font-bold tracking-tight md:text-3xl">
                {a.value}
              </p>
              <p className="mt-2 text-xs leading-relaxed text-[color:var(--muted)]">
                {a.note}
              </p>
            </article>
          ))}
        </div>

        <p className="mt-10 text-sm text-[color:var(--muted)]">
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
          <a
            href="#preorder"
            className="text-white underline-offset-4 hover:underline"
          >
            {copy.primaryCta}
          </a>
        </p>
      </div>
    </section>
  );
}
