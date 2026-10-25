"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { SKU } from "@/content/product";
import { getProduct } from "@/lib/product-server";
import { getStripe } from "@/lib/stripe";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { env } from "@/lib/env";

const bodySchema = z.object({
  sku: z.literal(SKU),
  qty: z.number().int().min(1).max(5),
});

export type CheckoutResult =
  | { ok: true; url: string }
  | { ok: false; error: string; code?: string };

export async function createCheckoutSession(
  input: z.infer<typeof bodySchema>,
): Promise<CheckoutResult> {
  const parsed = bodySchema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Invalid cart.", code: "VALIDATION" };
  }

  const h = await headers();
  const origin = h.get("origin");
  const host = h.get("host");
  if (origin && host) {
    try {
      const originHost = new URL(origin).host;
      if (originHost !== host) {
        return { ok: false, error: "Request rejected.", code: "ORIGIN" };
      }
    } catch {
      return { ok: false, error: "Request rejected.", code: "ORIGIN" };
    }
  }

  const ip = clientIp(h);
  const limited = rateLimit(`checkout:${ip}`, 8, 60_000);
  if (!limited.ok) {
    return { ok: false, error: "Too many requests. Try again shortly.", code: "RATE" };
  }

  const product = await getProduct();
  if (parsed.data.sku !== product.sku) {
    return { ok: false, error: "Unknown product.", code: "SKU" };
  }
  if (product.status !== "preorder_open") {
    return {
      ok: false,
      error:
        product.status === "waitlist"
          ? "Pre-order closed. Join the waitlist."
          : "Pre-order sold out.",
      code: "STATUS",
    };
  }

  const stripe = getStripe();
  if (!stripe) {
    return {
      ok: false,
      error: "Payments are not configured yet. Set STRIPE_SECRET_KEY.",
      code: "CONFIG",
    };
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer_creation: "always",
    automatic_tax: { enabled: true },
    shipping_address_collection: { allowed_countries: ["US", "GB", "DE", "FR", "IL", "CA", "AU", "NL", "SE", "CH"] },
    shipping_options: [
      {
        shipping_rate_data: {
          type: "fixed_amount",
          fixed_amount: { amount: 0, currency: product.currency },
          display_name: "Free worldwide shipping",
        },
      },
    ],
    line_items: [
      {
        quantity: parsed.data.qty,
        price_data: {
          currency: product.currency,
          unit_amount: product.priceCents,
          product_data: {
            name: `${product.title} · ${product.colorName}`,
            description: product.preorderShipNote,
            metadata: { sku: product.sku },
          },
        },
      },
    ],
    metadata: { sku: product.sku, qty: String(parsed.data.qty) },
    success_url: `${env.siteUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${env.siteUrl}/#preorder`,
    invoice_creation: { enabled: true },
  });

  if (!session.url) {
    return { ok: false, error: "Could not start checkout.", code: "STRIPE" };
  }

  return { ok: true, url: session.url };
}
