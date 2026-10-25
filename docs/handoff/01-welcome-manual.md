# The keys to the store — Aura Audio

Welcome. Aura Pro is live as a single-SKU pre-order landing, built to Studio Omek’s $100K motion / CRO / AppSec standard.

## Sign in to content

- **CMS (Sanity):** connect when project ID is provisioned → Studio URL will be `https://<project>.sanity.studio` or embedded `/studio`.
- Until Sanity is wired, product copy & price live in `src/content/product.ts` (ship note, status, gallery).

## What you can change safely

| Action | Where |
|---|---|
| Pre-order open / sold out / waitlist | `product.status` (later: Sanity) |
| Price | Server source of truth only — never edit client-only |
| Hero still / video | `/public/hero/` |
| Lifestyle & gallery | `/public/lifestyle/` |
| Policies | `src/content/policies.ts` |

## SLA (default — confirm retainer $)

- **Included:** production bugs, security patches, LCP/60FPS regressions, dependency CVEs High+.
- **Not included:** new immersive scenes, extra SKUs, new languages/currencies, custom 3D — scoped as paid change orders.

## Security you must keep

- Enable **2FA** on GitHub, Vercel, Stripe, Sanity, domain registrar.
- Never share API secrets in chat or Notion.
- The storefront already runs cart integrity (server price), webhook verification path, CSP Report-Only, rate limits, and Zod on checkout/waitlist.

— Studio Omek
