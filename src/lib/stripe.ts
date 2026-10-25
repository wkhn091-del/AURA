import "server-only";

import Stripe from "stripe";
import { env, stripeConfigured } from "@/lib/env";

let stripe: Stripe | null = null;

export function getStripe(): Stripe | null {
  if (!stripeConfigured() || !env.stripeSecretKey) return null;
  if (!stripe) {
    stripe = new Stripe(env.stripeSecretKey);
  }
  return stripe;
}
