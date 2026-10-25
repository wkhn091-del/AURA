# Security & incident sheet — Aura Audio

## What the site already defends
- Cart / price tampering (server re-price vs product source)
- Checkout rate limits + Origin host match
- Stripe webhook signature path
- CSP (Report-Only until `CSP_ENFORCE=1`)
- Security headers (HSTS, frame deny, nosniff, COOP/CORP)
- Zod validation on checkout & waitlist
- No card data on our servers (Stripe Checkout redirect)

## Your responsibilities
- 2FA everywhere (GitHub, Vercel, Stripe, Sanity, registrar)
- Least-privilege team invites
- Never commit `.env` secrets
- Review who can publish content

## If you suspect a breach
1. Revoke Vercel + Stripe + Sanity tokens immediately  
2. Message Studio Omek with time + what you saw  
3. Rotate all secrets; force-logout sessions  
4. Do **not** email passwords or full card numbers  

## Security incident vs normal bug
- **Incident:** data leak, unauthorized admin, webhook forgery, defacement  
- **Bug:** layout, copy typo, slow image — normal support channel  

SLA response (default): Critical security ≤ 4 business hours; standard bugs next business day.
