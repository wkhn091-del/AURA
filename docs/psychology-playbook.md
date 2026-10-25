# Psychology & Motion Playbook — Aura Audio / Aura Pro

Distilled from *Million Sites*, *Million Words*, *Motion of Millions*, and `motion-kit`.  
Niche map: **N25 Electronics / gadgets** · Voice: **confident studio / silent luxury** · Tier 2.

---

## Locked principles for this build

### Attention (P01–P06 / L01–L07)
- One job above the fold: **40 hours of wearable silence** — not a feature laundry list.
- Hero = HQ video once → still (no scrub). Motion serves the product; product does not serve motion.
- Micro-trust under CTA within 5 seconds (shipping / guest / timeline).

### Trust (P14–P20 / L14–L19)
- Cold-start stack (no fake reviews): real specs → free WW shipping → 30-day returns → Studio Omek credit → contact channels.
- No fake scarcity, no “was $X”, no countdown clocks.
- Simulation imagery labeled until real shoot lands.

### Desire → Decision → Action (P21–P38 / L20–L30)
- Features answer objections (noise / fatigue / charge anxiety), not marketing fluff.
- Single SKU → one decision path → sticky CTA after hero.
- Checkout is guest-first; price computed server-side only.

### Copy (H / M / X from Million Words)
- H1 ≤ 8 words, concrete benefit (locked: “40 hours of silence you can wear.”).
- Blacklist purge: no “seamless”, “next-gen”, “unlock potential”, “journey starts here”.
- Microcopy: verbs on buttons (“Pre-order Now”), reassurance under CTA, errors that tell what to do next.

### Motion (A01–A40 + motion-kit presets)
- Preset: **`studio`** (power4.out, 1.2s, distance 80, lerp 0.1) — editorial product feel.
- Easings: `cubic-bezier(0.16, 1, 0.3, 1)` / GSAP `power3.out` | `expo.out` — never linear ease-in-out for brand moments.
- Animate only `transform` + `opacity` (+ CSS vars). Honor `prefers-reduced-motion`.
- Signature mechanics (Tier 1/2 safe):
  1. **Magnetic CTA** (fine pointer only)
  2. **Scroll Reveal / SplitReveal masks** on section headlines
  3. **Parallax lifestyle** + soft counter for “40 hr”
- Mobile: magnetic off; Lenis optional but soft; reduce parallax distance.

### CRO for single-SKU D2C
- Defer Algolia search, review photos, and cart upsell (proportionality — documented).
- Keep: Trust strip, FAQ objections, sticky Order Now, WhatsApp/email contact (EN market: email + phone).

---

## Auto-decisions (overnight — queued for user confirmation in OPEN_QUESTIONS.md)

| Topic | Default applied |
|---|---|
| Motion preset | `studio` + Lenis on desktop |
| Social proof | Cold-start anchors (no fabricated reviews) |
| Search / reviews / upsell | Deferred (single SKU) |
| CSP | Report-Only → enforce after launch checklist |
| Rate limit | In-memory (Upstash when keys provided) |
| Handoff SLA | Template defaults until retainer $ set |
| Script 6 | Run Phase 1 on live hero copy; score at end |
