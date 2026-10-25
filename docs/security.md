# Aura Audio — Security Map (Module A · Stage 2)

**Status:** Awaiting approval · 25.10.2026

---

## Baseline (script iron rules)

| # | Rule | Implementation |
|---|---|---|
| 1 | Server-side truth | Price, tax, stock/preorder status computed on server from Sanity (+ Stripe Tax at session) |
| 2 | Client state hygiene | Zustand: `sku` + `qty` only — no PII, no prices |
| 3 | Secrets | All secret modules `import 'server-only'` |
| 4 | GROQ | Parameterized only |
| 5 | Validation | Zod on every Server Action / API body |
| 6 | Authorization | Explicit checks on every mutating server path (webhook vs public form vs checkout) |

---

## Trust boundaries

```
Public browser
  → Next.js edge/node (rate limit + Zod + Turnstile where forms)
    → Sanity (read token public dataset / write token server-only for orders)
    → Stripe (secret key server-only; webhook secret)
    → Resend (API key server-only)
    → Clarity / GA4 / Meta (client IDs only; no secrets)
```

---

## Webhooks

- **Stripe:** verify `stripe-signature`; reject unsigned/invalid.
- **Idempotency:** unique constraint on `stripeSessionId` / `paymentIntentId` / `idempotencyKey`; duplicate events return 200 without double email / double order.
- Process `checkout.session.completed` (primary) and relevant `payment_intent.*` only as needed for status sync.
- Never trust client “payment succeeded” redirects alone for fulfillment.

---

## Checkout

- Create session only if Sanity `product.status === preorder_open`.
- Line items built server-side from Sanity `priceCents` + `sku`.
- Client-supplied price ignored / rejected if present.
- Rate limit by IP on session creation.
- Success URL carries opaque session_id for display fetch server-side — no amount in query as source of truth.

---

## Forms (Waitlist / Contact)

- Cloudflare Turnstile token verified server-side.
- Zod email + length limits.
- IP rate limit.
- Store minimal fields; prefer hashed IP if retained for abuse.

---

## CSP (v1 allowlist)

| Directive | Sources (conceptual) |
|---|---|
| default-src | `'self'` |
| script-src | `'self'` + Stripe.js + GA4 + Meta + Clarity + Turnstile + Vercel insights if used |
| style-src | `'self'` `'unsafe-inline'` (Tailwind) + Google Fonts |
| img-src | `'self'` data: blob: Sanity CDN |
| font-src | `'self'` Google Fonts |
| connect-src | `'self'` Stripe API · Sanity · GA/Meta/Clarity · Turnstile · Resend only via server |
| frame-src | Stripe · Turnstile |
| worker-src | `'self'` blob: (sequence worker) |
| media-src | `'self'` blob: |

Refine exact hostnames at implementation; fail closed.

---

## Auth (v1)

- No customer portal.
- No forced login before pay.
- Clerk/NextAuth deferred — do not leave half-wired auth routes in v1.

---

## PII

- Order PII lives in Stripe + Sanity `order` (server).
- Emails via Resend to ops only.
- Analytics: follow cookie/consent banner tied to Cookies policy (Clarity + GA4 + Meta).

---

## Launch blockers (security-adjacent)

1. Real company number (not simulation).
2. Stripe live keys + webhook endpoint + Apple Pay domain verify.
3. DNS for orders@ / support@ / legal@.
4. Remove or gate any test/simulation CR from public footer.
