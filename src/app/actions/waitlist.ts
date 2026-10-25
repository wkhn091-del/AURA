"use server";

import { z } from "zod";
import { headers } from "next/headers";
import { clientIp, rateLimit } from "@/lib/rate-limit";
import { verifyTurnstile } from "@/lib/turnstile";

const schema = z.object({
  email: z.string().email().max(200),
  turnstileToken: z.string().optional(),
});

const entries: { email: string; at: string }[] = [];

export type WaitlistResult =
  | { ok: true }
  | { ok: false; error: string };

export async function joinWaitlist(
  input: z.infer<typeof schema>,
): Promise<WaitlistResult> {
  const parsed = schema.safeParse(input);
  if (!parsed.success) {
    return { ok: false, error: "Enter a valid email." };
  }

  const h = await headers();
  const ip = clientIp(h);
  const limited = rateLimit(`waitlist:${ip}`, 5, 60_000);
  if (!limited.ok) {
    return { ok: false, error: "Too many attempts. Try again later." };
  }

  const human = await verifyTurnstile(parsed.data.turnstileToken, ip);
  if (!human) {
    return { ok: false, error: "Bot check failed." };
  }

  entries.push({ email: parsed.data.email.toLowerCase(), at: new Date().toISOString() });
  console.info("[waitlist]", parsed.data.email);
  return { ok: true };
}
