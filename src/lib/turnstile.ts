import "server-only";

import { env } from "@/lib/env";

export async function verifyTurnstile(
  token: string | undefined,
  ip: string,
): Promise<boolean> {
  if (!env.turnstileSecret) {
    // Dev without Turnstile: allow, but require token presence in production later
    return process.env.NODE_ENV !== "production";
  }
  if (!token) return false;

  const body = new URLSearchParams({
    secret: env.turnstileSecret,
    response: token,
    remoteip: ip,
  });

  const res = await fetch(
    "https://challenges.cloudflare.com/turnstile/v0/siteverify",
    { method: "POST", body },
  );
  const data = (await res.json()) as { success?: boolean };
  return Boolean(data.success);
}
