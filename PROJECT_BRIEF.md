# PROJECT_BRIEF — Aura Audio / Aura Pro

> זיכרון פרויקט. מתעדכן בסוף כל מודול / אחרי כל קבוצת תחקיר שאושרה.
> סטטוס: **Overnight batch — Motion kit + CRO trust/FAQ + Security Level A + Handoff + Script6 P1**
> עדכון אחרון: 25.10.2026 (overnight)

---

## 1. מותג ותשתית (קבוצה 1) — נעול

| שדה | ערך | סטטוס |
|---|---|---|
| מותג | Aura Audio | ✅ |
| מוצר דגל | Aura Pro (premium over-ear headphones) | ✅ |
| סטודיו מפתח | Studio Omek (סטודיו עומק) | ✅ |
| היקף מוערך | ~$100K | ✅ |
| Tier | **Tier 2** — HTML5 Canvas Image Sequence + GSAP ScrollTrigger. בלי WebGL/R3F בשלב זה | ✅ |
| Stack | **Next.js (App Router) + Tailwind CSS + Sanity + Zustand** | ✅ |
| שפה | **English only · LTR** (global / Apple-tier positioning) | ✅ |
| דומיין | TBD — candidate `aurapro-audio.com`. Build on Vercel preview URL until purchase | ⚠️ |
| לוגו | Wordmark typography **"AURA"** until final mark | ✅ temporary |
| Hero assets | Hero video already sliced into frames; lifestyle still available | ✅ |
| Other visuals | Placeholders at final dimensions until product shoot; mark as simulation where needed | ✅ |
| Accounts | Greenfield: new GitHub repo → Vercel + Sanity | ✅ |
| Footer legal name | **Aura Audio** | ✅ |
| Studio credit | **"Developed by Studio Omek"** + link to studio site | ✅ (URL to confirm at launch) |

### Brand colors (locked)

| Token | Hex | Use |
|---|---|---|
| `--bg` | `#0A0B0D` | Primary charcoal (not pure OLED #000) |
| `--bg-deep` | `#050608` | Deep field |
| `--surface` | `#1C1C1E` | Secondary surfaces / titanium-dark |
| `--muted` | `#86868B` | Secondary text |
| `--accent` | `#007AFF` | Buttons / focus (premium neon blue) |
| `--text` | `#F5F5F7` | Primary text |

### USP (from original brief)

- Slogan: **BEYOND SOUND**
- Adaptive ANC (environment-learning)
- Titanium drivers
- 40-hour battery

### Explicitly deferred (Tier 3)

- React Three Fiber / custom WebGL shaders
- Full custom cursor (magnetic buttons shipped; cursor chrome deferred)

### Overnight additions (25.10.2026)

- Motion kit adapted → `src/components/motion` (preset `studio`, Lenis desktop, Magnetic, Reveal, SplitReveal mask, Parallax, Counter, Marquee)
- Header + upgraded Footer; TrustProof + FAQ + ColorLineup
- Security: `src/middleware.ts` CSP Report-Only + headers; `/api/health`; next.config hardening; Origin check on checkout
- Handoff pack → `docs/handoff/`; questions → `docs/OPEN_QUESTIONS.md`
- Psychology playbook → `docs/psychology-playbook.md`
- Script 6 Phase 1 + score → `docs/audit/`

### Still deferred (proportionality)

- Algolia / faceted search, review photo uploads, cart upsell (single SKU)
- Upstash Redis, Turnstile keys, CSP enforce mode, live Stripe
- Auth portal / OTP (guest checkout first)

### Out of scope notes

- The standalone `Downloads/hero_section_animation.tsx` prototype is **not** the Script 1 codebase. Real build starts only after Groups 1–5 + architecture approval + A-2 / A-3 / 3D module approvals.

---

## 2. E-commerce (קבוצה 2) — נעול

| שדה | ערך | סטטוס |
|---|---|---|
| Catalog | Single-page D2C landing — **Aura Pro only** | ✅ |
| Variation | **Titanium Black** only | ✅ |
| SKU | `AURA-PRO-01` | ✅ |
| Price | **$349** fixed consumer price; no fictional “was” / fake discounts | ✅ |
| Inventory mode | **Pre-order** in Sanity; no hard physical stock cap for now | ✅ |
| At zero / closed pre-order | Show **“Pre-order Sold Out”** or switch to **Waitlist** form | ✅ |
| Promos | None (no coupons / manufactured scarcity) | ✅ |
| Shipping offer | **Free shipping** for every customer (WW) | ✅ |
| Payments | **Stripe + Apple Pay** (merchant account required before go-live) | ✅ |
| Shipping zones | Worldwide | ✅ |
| Shipping cost rule | Free WW (locked from promo answer; overrides “fixed or free” ambiguity) | ✅ |
| Checkout | **Guest checkout** first; optional auto account creation after paid order | ✅ |
| Order sink | Sanity dataset + **email notification** to ops | ✅ |
| Returns | **30 days**; customer pays return shipping unless item arrived defective | ✅ |

### Business rules (future unit tests)

1. Client cart may store only `sku` + `qty`; server resolves price from Sanity.
2. Checkout rejects any client-sent price that ≠ Sanity `AURA-PRO-01` price.
3. Pre-order open → CTA = purchase; pre-order closed + waitlist on → CTA = waitlist; closed + waitlist off → “Pre-order Sold Out”.
4. No coupon codes accepted in v1 API.
5. Guest may complete payment without auth; post-payment account link is optional/background.

---

## 3. Immersive (קבוצה 3) — נעול

| שדה | ערך | סטטוס |
|---|---|---|
| Pipeline | **Path A — Apple Sequence** (Canvas + WebP frames + GSAP). Path B/C deferred | ✅ |
| Source | ~10s hero video sliced to frames | ✅ |
| Desktop sequence | **1920×1080** WebP | ✅ |
| Weight (current estimate) | “A few tens of MB” total WebP — **over** script budget of ≤5MB incl. worker | ⚠️ risk |
| Placement | **Hero only** | ✅ |
| Hero playback (updated 25.10.2026) | **Play once HQ MP4 → freeze on still**. No scroll-scrub on Hero — **final lock** (user 25.10.2026) | ✅ |

### Hero Script 1.2 — Stage 1 lock

| Item | Value |
|---|---|
| Ideal customer | Audiophiles + creatives, 20–45 |
| Pain | Urban noise / lost focus; won’t sacrifice sound or aesthetics |
| Bad alternative | Noisy commodity headphones or generic premium (AirPods Max / Bose) |
| Promise | Advanced sound + AI ANC tuned to your city |
| Hero number | **40 hours** (+ $349 support) |
| Visual | Video once → sharp still (no scroll sequence) |
| CTA | Pre-order Now |
| Reassurance | Free WW shipping · Pre-order ≤30 business days · Guest checkout |
| LCP | Static first-frame **poster** loads before Canvas sequence | ✅ |
| Mobile | Separate lighter sequence: lower res + fewer frames; target 60fps | ✅ |
| Lifestyle + gallery | High-quality **simulation placeholders** until product shoot; mark as simulation in UI/CMS | ✅ |
| Licensing | 100% Aura + Studio Omek owned; no external stock requiring special license docs | ✅ |
| WebGL page-transition shaders | **None in v1** | ✅ |

### Immersive engineering notes (for architecture)

1. Pre-cache frames via Web Worker → Blob memory before Hero sequence section is interactive.
2. `requestAnimationFrame` draw loop; paint only when frame index changes.
3. Lerp / damping on frame index for fast scroll.
4. Poster = LCP; Canvas lazy after.
5. **Compression gate before build:** must plan aggressive WebP quality / frame stride / dual desktop-mobile sets so mobile stays smooth and total transfer approaches budget (flag if still >5MB after encode).

---

## 4. Legal (קבוצה 4) — נעול

| שדה | ערך | סטטוס |
|---|---|---|
| Legal entity | **Aura Audio Ltd.** | ✅ |
| Jurisdiction | Israel | ✅ |
| Company / VAT no. | `516000000` — **simulation placeholder**; real number required before public launch | ⚠️ blocker |
| Registered address | Ha-Galil St 12, Tiberias, Israel | ✅ |
| Support email | support@auraaudio.com | ✅ |
| Legal / privacy email | legal@auraaudio.com | ✅ |
| Phone | +972 50-396-7230 | ✅ |
| Policy pages (v1) | Privacy · Terms · Shipping · Returns (30 days) · Cookies | ✅ |
| Accessibility | Practical WCAG baseline (contrast, keyboard); **no full accessibility statement page in v1** | ✅ |
| Invoicing | Automatic via **Stripe Invoicing** after payment | ✅ |
| Tax | Display **$349 base**; **Stripe Tax** adds tax/VAT at checkout by destination | ✅ |
| Cooling-off | IL consumer protection + EU distance-selling: **14 days** from receipt / disclosure, **in addition to** 30-day returns | ✅ |
| Pre-order disclosure | Explicit near CTA/cart: Pre-order; estimated ship **up to 30 business days** after production close / first shipments launch | ✅ |

### Legal copy constraints

- Company number must be replaced before go-live (no fake CR on public site).
- Returns copy: customer pays return shipping unless defective (Group 2).
- Simulation product imagery labeled until real shoot.

---

## 5. Security / API (קבוצה 5) — נעול

| שדה | ערך | סטטוס |
|---|---|---|
| Order emails | `orders@auraaudio.com` + `support@auraaudio.com` | ✅ |
| Email provider | **Resend** | ✅ |
| Stripe webhooks | Signature verification + idempotency on `payment_intent` / `checkout.session.completed` | ✅ |
| Auth (v1) | **Guest only** — Clerk/NextAuth deferred to Modules B/C | ✅ |
| Bot protection | **Cloudflare Turnstile** on Waitlist + contact | ✅ |
| Analytics | **GA4** + **Meta Pixel** | ✅ |
| CSP allowlist | Stripe · Sanity CDN · Vercel · Google Fonts | ✅ |
| Rate limiting | IP limits on checkout session create + Waitlist submit | ✅ |
| KPIs (5) | Pre-order conversion · Scroll past Hero · CTA click · Checkout start · Checkout complete | ✅ |
| Heatmaps | **Microsoft Clarity** | ✅ |

---

## Architecture approval

See `docs/architecture.md`, `docs/security.md`, `docs/business-logic-matrix.md`.  
**Stage 2 approved 25.10.2026.** Next: Module A-2 (Art Direction) → A-3 (Motion) → 3D/Sequence module → then core code.

---

## Open questions (end of Module A core — deferred while building)

1. Final Studio Omek URL for footer credit (currently placeholder `omek-studio.vercel.app`).
2. Domain purchase timing for `aurapro-audio.com`.
3. Encode plan for sequence weight (desktop + mobile); replace poster-only until frames land.
4. Exact desktop/mobile frame counts after export → update `product.sequence*`.
5. Waitlist vs Sold Out as default when pre-order closes.
6. Stripe merchant account + Apple Pay domain verification before launch.
7. Replace simulated company number `516000000` with real CR before public launch.
8. DNS / mailbox for `@auraaudio.com` (orders, support, legal).
9. Connect live Sanity project + wire `getProduct()` to GROQ.
10. Turnstile site/secret keys for production waitlist.
