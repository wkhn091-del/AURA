# Hero Script 1.2 — Stage 3 Art Direction

**Status:** Awaiting “מאושר” · 25.10.2026  
**Copy locked (Stage 2):** H1 / H2 refined / Pre-order Now / reassurance line  
**Visual lock:** HQ video once → sharp still (no scroll scrub)

---

## Layout (Desktop)

**Center-aligned cinematic stack** over full-bleed media (not split-screen).

```
[ 100vh black field ]
  Video / end-frame (object-cover, edge-to-edge)
  Soft bottom gradient (for type legibility only — not a card)
  Bottom-center stack:
    AURA wordmark (small)
    H1 (clamp, tracking -0.03em)
    H2 (mono / muted, max ~2 lines)
    CTA white pill (sole accent competitor: none)
    Microcopy muted under CTA
```

Eye path (brutal hierarchy): **face/product in still → H1 → H2 → Pre-order Now**.  
No second button. No floating badges on media.

---

## Typographic scale

| Role | Spec |
|---|---|
| Wordmark | ~14–16px · tracking `-0.04em` · white/90 |
| H1 | `clamp(2.5rem, 6vw, 4.5rem)` · bold · `-0.03em` · white |
| H2 | `clamp(0.95rem, 1.4vw, 1.125rem)` · `#A1A1A6` · mono OK · max-width ~36rem |
| CTA | white bg · black text · rounded-full · generous px/py · glow `0 0 30px rgba(255,255,255,0.2)` |
| Reassurance | 12–13px · `#86868B` |

Accent `#007AFF` = focus ring only, not CTA fill (keeps checkout trust).

---

## The “Wow” element (premium physics)

1. **Media:** 1440p H.264 play-once; crossfade (~0.45s) to `end-frame` still (no canvas scrub).  
2. **Still sharpness:** `object-cover`, no parallax on the end frame, no filter blur on the photo.  
3. **Glass:** none in Hero text stack (avoid competing with the portrait). Glass reserved for floating Order Now after 100vh.  
4. **Contact:** multi-stop gradient from black at bottom only — no neumorphic fake cards.

**Lifestyle assets received (post-Hero sections):**
- `/lifestyle/city-day.png` — daylight street, left/right negative space  
- `/lifestyle/city-golden.png` — golden hour, left negative space for copy  

Use in Deep Dive / Gallery — **not** as Hero LCP (Hero keeps video + end-frame).

---

## Mobile (375px)

- Same center stack; H1 wraps to 2–3 lines max.  
- H2 shortens visually via line-clamp 3 if needed.  
- CTA full-width max `min(100%, 20rem)`.  
- No mouse/WebGL interactions.  
- Video `playsInline` muted; reduced-motion → still + UI immediate.

---

## Approval checklist

- [ ] Center stack over full-bleed media
- [ ] White CTA only (no blue fill)
- [ ] No scroll sequence in Hero
- [ ] New lifestyle PNGs for later sections, not Hero poster
- [ ] Clamp + negative tracking as specified
