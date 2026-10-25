import "server-only";

import { Resend } from "resend";
import { env } from "@/lib/env";
import { site } from "@/content/product";

let resend: Resend | null = null;

function getResend(): Resend | null {
  if (!env.resendApiKey) return null;
  if (!resend) resend = new Resend(env.resendApiKey);
  return resend;
}

export async function sendOrderNotification(input: {
  sessionId: string;
  email: string | null;
  amountTotal: number | null;
  currency: string | null;
}): Promise<void> {
  const client = getResend();
  if (!client) {
    console.info("[orders] Resend not configured — order logged only", input);
    return;
  }

  const amount =
    input.amountTotal != null
      ? `${(input.amountTotal / 100).toFixed(2)} ${input.currency?.toUpperCase() ?? "USD"}`
      : "n/a";

  await client.emails.send({
    from: env.ordersFromEmail,
    to: [site.ordersEmail, site.supportEmail],
    subject: `Aura Pro pre-order · ${input.sessionId}`,
    text: [
      "New Aura Pro pre-order paid.",
      `Stripe session: ${input.sessionId}`,
      `Customer: ${input.email ?? "unknown"}`,
      `Amount: ${amount}`,
    ].join("\n"),
  });
}
