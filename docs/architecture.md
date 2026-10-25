# Aura Audio — Architecture Summary (Module A · Stage 2)

**Status:** Awaiting approval  
**Date:** 25.10.2026  
**Stack:** Next.js App Router · Tailwind · Sanity · Zustand · GSAP · Canvas Image Sequence  
**Tier:** 2 (Path A) · **Locale:** English LTR

---

## 1. System map

```
Browser (LTR landing)
  ├─ Hero Canvas Sequence (poster LCP → worker-precache → rAF draw)
  ├─ Marketing sections (Lifestyle, Features, Gallery, Checkout CTA)
  ├─ Zustand cart (sku + qty only)
  └─ Stripe Checkout / Apple Pay (hosted or embedded Payment Element)

Next.js (Vercel)
  ├─ Server Components: product + site settings from Sanity (GROQ params)
  ├─ Server Actions / Route Handlers:
  │    ├─ createCheckoutSession (Zod + rate limit + Sanity price truth)
  │    ├─ waitlistSubmit (Turnstile + rate limit)
  │    └─ contactSubmit (Turnstile + rate limit)
  ├─ Webhooks:
  │    └─ /api/webhooks/stripe (signature + idempotency → order in Sanity + Resend)
  └─ import 'server-only' for secrets

Sanity
  ├─ product (AURA-PRO-01)
  ├─ siteSettings / preorderConfig
  ├─ order (server-written only)
  ├─ waitlistEntry
  └─ policyPage

Stripe
  ├─ Checkout Session + Apple Pay
  ├─ Stripe Tax (destination)
  └─ Stripe Invoicing (post-pay)
```

---

## 2. Sanity schemas (proposed)

### `product`
| Field | Type | Notes |
|---|---|---|
| title | string | Aura Pro |
| sku | string | unique, `AURA-PRO-01` |
| slug | slug | |
| colorName | string | Titanium Black |
| priceCents | number | 34900 — **server truth** |
| currency | string | `usd` |
| status | string enum | `preorder_open` \| `preorder_sold_out` \| `waitlist` |
| preorderShipNote | text | up to 30 business days disclosure |
| isSimulationImagery | boolean | forces “simulation” label |
| heroPoster | image | LCP |
| sequenceDesktop | object | basePath, frameCount, fpsHint |
| sequenceMobile | object | basePath, frameCount |
| lifestyleImage | image | |
| gallery | array of images | |
| features | array | ANC / titanium / battery copy from CMS |

### `siteSettings` (singleton)
| Field | Type | Notes |
|---|---|---|
| brandName | string | Aura Audio |
| wordmark | string | AURA |
| supportEmail | string | |
| legalEmail | string | |
| ordersEmail | string | |
| phone | string | |
| legalEntityName | string | Aura Audio Ltd. |
| companyNumber | string | real CR before launch |
| registeredAddress | text | |
| studioCreditLabel | string | Developed by Studio Omek |
| studioCreditUrl | url | |
| freeShipping | boolean | true |
| stripeTaxEnabled | boolean | true |
| analytics | object | ga4Id, metaPixelId, clarityId |

### `order` (server-only writes)
| Field | Type | Notes |
|---|---|---|
| stripeSessionId | string | unique |
| stripePaymentIntentId | string | unique sparse |
| sku | string | |
| qty | number | |
| amountTotal | number | from Stripe |
| currency | string | |
| taxAmount | number | |
| customerEmail | string | |
| shippingAddress | object | |
| status | enum | `paid` \| `fulfilled` \| `refunded` \| `cancelled` |
| idempotencyKey | string | unique |
| createdAt | datetime | |

### `waitlistEntry`
email, createdAt, turnstilePass, source, ipHash (no raw IP long-term if avoidable)

### `policyPage`
slug enum: privacy | terms | shipping | returns | cookies · portable text body · updatedAt

### `contactMessage` (optional)
name, email, message, createdAt — rate-limited + Turnstile

**GROQ rule:** parameterized queries only — no string concatenation of user input.

---

## 3. Cart architecture (Zustand)

**Client may store only:**
```ts
{ sku: "AURA-PRO-01", qty: 1 }
```

**Never on client:** price, tax, PII, payment tokens.

**Flow:**
1. User clicks Order / Pre-order → ensure cart qty ≥ 1.
2. `createCheckoutSession` Server Action reads product from Sanity by sku.
3. Rejects if `status !== preorder_open`.
4. Creates Stripe Checkout Session with `price_data` or Price ID synced from Sanity; enables automatic_tax; shipping WW free.
5. Redirect / present Stripe; Apple Pay via Stripe.
6. Webhook `checkout.session.completed` → verify signature → idempotent upsert `order` → Resend to orders@ + support@ → Stripe Invoice.

**Guest first:** no login gate. Post-pay account creation deferred to Modules B/C.

---

## 4. Immersive (Hero Sequence)

| Layer | Behavior |
|---|---|
| Poster | Static WebP/AVIF in Hero — **LCP**, no opacity fade-in on LCP |
| Worker | Prefetch desktop or mobile frame list into Blobs |
| Canvas | Lazy mount after poster; rAF draw only on index change |
| Scroll | GSAP ScrollTrigger maps progress → lerped frame index |
| Mobile | Fewer frames, lower res asset path from Sanity/config |
| Weight gate | Encode plan required; current “tens of MB” is a **risk** vs ≤5MB aspirational budget |

Path B/C and WebGL transitions: **out of v1**.

---

## 5. App routes (v1)

| Route | Purpose |
|---|---|
| `/` | Landing (all marketing + sticky Order Now) |
| `/privacy` `/terms` `/shipping` `/returns` `/cookies` | Policy pages from Sanity |
| `/api/webhooks/stripe` | Stripe webhook |
| `/api/checkout` or Server Action | Create session |
| `/api/waitlist` | Waitlist |
| `/success` | Post-checkout thank-you (no sensitive data in URL) |
| `/studio` | Sanity Studio (deployed separately or `/studio` protected) |

---

## 6. Deferred (documented)

| Feature | Why deferred |
|---|---|
| Tier 3 WebGL / Lenis / magnetic cursor | Tier 2 chosen |
| Multi-SKU catalog / coupons | Single SKU, no promos |
| Customer portal / Clerk / NextAuth | Modules B/C |
| Full IL accessibility statement page | WCAG baseline only in v1 |
| Multi-currency display | USD base + Stripe Tax |

---

## 7. Approval checklist

- [ ] Sanity schemas accepted
- [ ] Cart hygiene (ids+qty only) accepted
- [ ] Security map accepted (`docs/security.md`)
- [ ] Business logic matrix accepted (`docs/business-logic-matrix.md`)
- [ ] Sequence weight risk acknowledged (encode before production assets)

**Reply “ארכיטקטורה מאושרת” (or list change requests) to proceed to Module A-2 (Art Direction) — still no app code until A-2 / A-3 / 3D are also approved per script.**
