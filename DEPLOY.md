# Aura Audio — Vercel deploy

## 1. Repo

```bash
git init
git add .
git commit -m "Initial Aura Pro landing"
# push to new GitHub repo, then Import in Vercel
```

## 2. Environment variables (Vercel → Project → Settings → Env)

| Name | Notes |
|---|---|
| `NEXT_PUBLIC_SITE_URL` | `https://your-deployment.vercel.app` then custom domain |
| `STRIPE_SECRET_KEY` | Live or test |
| `STRIPE_WEBHOOK_SECRET` | From Stripe Dashboard → Webhooks |
| `RESEND_API_KEY` | Domain verified for `@auraaudio.com` |
| `ORDERS_FROM_EMAIL` | Verified sender |
| `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Waitlist bot protection |
| `NEXT_PUBLIC_SANITY_PROJECT_ID` / `DATASET` / `SANITY_API_TOKEN` | When CMS connected |
| `NEXT_PUBLIC_GA4_ID` / `META_PIXEL_ID` / `CLARITY_ID` | Analytics |

## 3. Stripe webhook

Endpoint: `https://<domain>/api/webhooks/stripe`  
Events: `checkout.session.completed` (add `payment_intent.*` if you extend status sync)  
Verify signature in production. Enable Apple Pay domain in Stripe.

## 4. CORS / CSP

Assets and workers are same-origin. Allow Stripe.js, Sanity CDN, Google Fonts, Turnstile, GA/Meta/Clarity in production headers (see `docs/security.md`). Prefer Vercel Headers or `next.config` `headers()`.

## 5. Sequence assets

Place encoded WebP frames under:

- `public/sequence/desktop/frame_XXX.webp`
- `public/sequence/mobile/frame_XXX.webp`
- `public/sequence/poster.webp` (or `.svg` during simulation)

Update `src/content/product.ts` `frameCount` (or Sanity fields) after encode. Pass weight gate before launch.

## 6. Launch blockers

- Real company number (replace simulation)
- DNS mailboxes: orders@, support@, legal@
- Stripe live + Apple Pay domain verification
- Encode sequence under size budget
