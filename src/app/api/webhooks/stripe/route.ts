import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { getStripe } from "@/lib/stripe";
import { env } from "@/lib/env";
import { claimOrderIdempotency } from "@/lib/orders-store";
import { sendOrderNotification } from "@/lib/resend";

export async function POST(req: Request) {
  const stripe = getStripe();
  if (!stripe || !env.stripeWebhookSecret) {
    return NextResponse.json({ error: "Webhook not configured" }, { status: 503 });
  }

  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const raw = await req.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(
      raw,
      signature,
      env.stripeWebhookSecret,
    );
  } catch {
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const key = session.id;
    if (!claimOrderIdempotency(key)) {
      return NextResponse.json({ received: true, duplicate: true });
    }

    await sendOrderNotification({
      sessionId: session.id,
      email: session.customer_details?.email ?? session.customer_email ?? null,
      amountTotal: session.amount_total,
      currency: session.currency,
    });
  }

  return NextResponse.json({ received: true });
}
