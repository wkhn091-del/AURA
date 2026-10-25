# Aura Audio — Design Tokens (A-2 Stage 2)

**Direction:** Silent Frame + Instrument mono  
**Status:** Awaiting approval · 25.10.2026

---

## Color

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0A0B0D` | Page field (premium charcoal, not pure black) |
| `--bg-deep` | `#050608` | Deepest layer |
| `--bg-elevated` | `#12141A` | Lifted panels |
| `--surface` | `#1C1C1E` | Cards, panels |
| `--muted` | `#86868B` | Secondary text, hairlines |
| `--text` | `#FFFFFF` | Primary text |
| `--text-dim` | `#A1A1A6` | Body on black (slightly brighter than muted for long copy) |
| `--accent` | `#007AFF` | Focus ring, text links, 2px signal ticks only |
| `--accent-soft` | `rgba(0,122,255,0.12)` | Rare: focus wash ≤8% viewport area |
| `--border` | `rgba(255,255,255,0.10)` | Glass edges |
| `--border-strong` | `rgba(255,255,255,0.20)` | Hover glass |
| `--cta-bg` | `#FFFFFF` | Primary Order / Pre-order |
| `--cta-fg` | `#000000` | On primary CTA |

**Hard rules**
- No purple/pink neon washes (superseded by locked blue).
- No flat `box-shadow: 0 4px 6px #000` — use layered contact shadows (see below).
- Accent never fills Hero background.

---

## Typography

| Role | Family | Notes |
|---|---|---|
| Wordmark | Geist Sans / Satoshi | `AURA` · tracking `-0.04em` · weight 500–600 |
| Display H1 | Geist Sans / Satoshi | `clamp(2.5rem, 6vw, 4.5rem)` · tracking `-0.03em` · weight 700 |
| H2 | same | `clamp(1.75rem, 3.5vw, 3rem)` · `-0.02em` |
| Body | Geist Sans | 16–18px · leading 1.6 · color `--text-dim` |
| Spec / mono | Geist Mono / JetBrains Mono | Battery, ANC labels, price numerals |

**Banned:** Inter, Roboto, Arial as brand voice. Soft AI slogans (see Copy Deck).

---

## Elevation / Glass (Visual Physics)

```css
/* Glass card */
background: rgba(255,255,255,0.05);
backdrop-filter: blur(16px);
border: 1px solid rgba(255,255,255,0.10);
border-radius: 1rem; /* 2xl */
box-shadow:
  0 1px 0 rgba(255,255,255,0.06) inset,
  0 20px 50px -20px rgba(0,0,0,0.75),
  0 0 0 1px rgba(0,0,0,0.4);

/* Product glow (sequence freeze / gallery) — white, not blue */
filter: drop-shadow(0 24px 48px rgba(0,0,0,0.65));
```

---

## Spacing / Layout

- Section padding: `py-24` → `py-32` on checkout
- Content max: `max-w-6xl` marketing · `max-w-4xl` checkout statement
- Mobile first: 375px
- Floating CTA: hidden until `scrollY ≥ 100vh`

---

## Anti-AI Hero filter (Bullshit Filter)

| Forbidden | Required |
|---|---|
| “The journey begins here” | Concrete product claim |
| “Innovation” / “Next level” / “Redefine everything” alone | Number or mechanism (40 hr, adaptive ANC) |
| H1 that could fit any brand | H1 that only fits headphones / Aura Pro |
| Opacity fade on LCP poster | Poster painted opaque first |
| Accent glow competing with sequence | Sequence + product light only |

**H1 pattern:** concrete benefit or object truth.  
**H2 pattern:** backs H1 with a measurable fact.
