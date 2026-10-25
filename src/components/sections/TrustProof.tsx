"use client";

import { Counter } from "@/components/motion";
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

/** Spec anchors as a clean type strip — no cards, no broken seams. */
export function TrustProof() {
  return (
    <section
      id="trust"
      className="relative bg-transparent px-5 py-20 md:px-12 md:py-28 lg:px-20"
      aria-labelledby="trust-heading"
    >
      <div className="mx-auto max-w-6xl">
        <p className="mb-3 font-mono text-xs uppercase tracking-[0.2em] text-[color:var(--accent)]">
          Why pre-order Aura Pro
        </p>
        <h2
          id="trust-heading"
          className="max-w-2xl text-[clamp(1.85rem,7vw,3rem)] font-bold tracking-[-0.02em] text-white md:text-5xl"
        >
          Specs you can verify. Promises we can ship.
        </h2>
        <p className="mt-5 max-w-xl text-base leading-relaxed text-[#A1A1A6]">
          No star ratings yet — we won&apos;t invent them. Until owners review,
          these are the cold-start anchors: battery, price clarity, free
          shipping, and a real returns window.
        </p>

        <dl className="mt-14 grid grid-cols-1 gap-0 border-t border-white/15 sm:grid-cols-2 lg:grid-cols-4">
          {anchors.map((a) => (
            <div
              key={a.label}
              className="border-b border-white/15 py-7 sm:border-b-0 sm:border-r sm:px-6 sm:py-8 sm:first:pl-0 sm:last:border-r-0 sm:last:pr-0 lg:px-8"
            >
              <dt className="font-mono text-[11px] uppercase tracking-[0.2em] text-white/45">
                {a.label}
              </dt>
              <dd className="mt-3 text-3xl font-bold tracking-[-0.03em] text-white md:text-4xl">
                {a.value}
              </dd>
              <dd className="mt-2 text-sm leading-relaxed text-[#86868B]">
                {a.note}
              </dd>
            </div>
          ))}
        </dl>

        <p className="mt-12 text-sm text-[#86868B]">
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
