# Loom script — Aura Pro store manager (≈8 min)

## [0:00–0:40] Open the site
**Show:** Production / preview URL, scroll hero once.  
**Say:** “This is Aura Pro. Hero plays the product film once, then freezes on the still. Pre-order is the only CTA.”

## [0:40–2:00] Change product status
**Show:** `src/content/product.ts` → `status`: `preorder_open` | `preorder_sold_out` | `waitlist`.  
**Say:** “Publish means saving and redeploying until Sanity is connected. Never invent a discount price in the client.”

## [2:00–3:30] Gallery & lineup
**Show:** `/public/lifestyle/`, Color Lineup section.  
**Say:** “Replace files with the same names. If a shot isn’t the real product, keep the Simulation badge on.”

## [3:30–5:00] Orders
**Show:** Stripe Dashboard → Payments; ops email from Resend when configured.  
**Say:** “Prices always come from the server. If someone tampers in DevTools, checkout still charges $349.”

## [5:00–6:30] Policies & FAQ
**Show:** `/shipping`, `/returns`, FAQ accordion.  
**Say:** “Update policies in `policies.ts`. FAQ answers objections before checkout.”

## [6:30–7:30] Security hygiene
**Show:** Vercel env vars list (names only).  
**Say:** “Don’t paste secrets into Loom. Don’t open CSV exports from unknown senders — formula injection risk.”

## [7:30–8:00] Publish checklist
**Say:** “Change → commit → deploy → click Pre-order on preview → confirm Stripe test mode. Done.”
