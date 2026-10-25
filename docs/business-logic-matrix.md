# Aura Audio — Business Logic Matrix (future unit tests)

**Status:** Awaiting approval · 25.10.2026  
Each row = one rule → one (or more) automated tests later.

| ID | Rule | Given | When | Then |
|---|---|---|---|---|
| BL-01 | Price truth | Sanity priceCents = 34900 for AURA-PRO-01 | Client sends price 1 | Server uses 34900; request with mismatched price rejected |
| BL-02 | Single SKU | Cart sku ≠ AURA-PRO-01 | createCheckoutSession | Reject 400 |
| BL-03 | Qty bounds | qty < 1 or qty > maxAllowed (e.g. 5) | createCheckoutSession | Reject |
| BL-04 | Preorder open | status = preorder_open | createCheckoutSession | Stripe session created |
| BL-05 | Sold out | status = preorder_sold_out | createCheckoutSession | Reject; UI shows Sold Out |
| BL-06 | Waitlist mode | status = waitlist | createCheckoutSession | Reject; Waitlist accepted instead |
| BL-07 | No coupons | body contains promoCode | checkout | Ignore/reject; no discount applied |
| BL-08 | Free shipping | any WW destination | session create | shipping_amount = 0 |
| BL-09 | Tax not in base | product page | render price | Shows $349 base; tax only at Stripe |
| BL-10 | Guest allowed | no session cookie | checkout | Allowed |
| BL-11 | Webhook sig | invalid signature | POST webhook | 400; no order write |
| BL-12 | Idempotent order | same session.completed twice | webhook | One order document; one ops email batch |
| BL-13 | Order email | paid webhook success | after upsert | Resend to orders@ and support@ |
| BL-14 | Turnstile waitlist | missing/invalid token | waitlist submit | Reject |
| BL-15 | Rate limit checkout | >N sessions / IP / window | createCheckoutSession | 429 |
| BL-16 | Rate limit waitlist | >N submits / IP / window | waitlist | 429 |
| BL-17 | Simulation label | isSimulationImagery = true | render gallery/lifestyle | “Simulation” visible |
| BL-18 | Preorder disclosure | any buy CTA | render | Pre-order + ≤30 business days note present |
| BL-19 | Returns policy | /returns | content | 30 days; buyer pays return shipping unless defective |
| BL-20 | Cooling-off | /terms or /returns | content | 14-day distance-selling right referenced |
| BL-21 | Cart hygiene | inspect Zustand persist | any time | Only sku + qty keys |
| BL-22 | GROQ injection | malicious slug param | product query | Parameterized; no string concat exploit |
| BL-23 | Server-only secrets | import Stripe key in client bundle | build/test | Fail / not present |
| BL-24 | CTA after Hero | scrollY < 100vh | floating CTA | opacity 0 / not interactive |
| BL-25 | CTA past Hero | scrollY ≥ 100vh | floating CTA | visible |

### KPI instrumentation (not unit tests — launch checks)

| KPI | Event |
|---|---|
| Pre-order conversion | purchase / session |
| Scroll past Hero | scroll depth ≥ 100vh |
| CTA click | floating + section CTAs |
| Checkout start | session create success |
| Checkout complete | webhook paid |

Clarity heatmaps enabled for qualitative validation.
