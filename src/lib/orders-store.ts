import "server-only";

/**
 * In-memory order idempotency for local/dev when Sanity write token is absent.
 * Production should upsert into Sanity `order` documents (unique stripeSessionId).
 */
const seen = new Set<string>();

export function claimOrderIdempotency(key: string): boolean {
  if (seen.has(key)) return false;
  seen.add(key);
  return true;
}
