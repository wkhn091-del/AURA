# Hero Script 1.2 — Stage 4 Motion Map

**Status:** Awaiting “מאושר” · 25.10.2026  
**Locks:** Video→Still (no scroll scrub) · Stage 2 copy · Stage 3 center stack

---

## On Load (≤3s clarity path)

| Order | Beat | Spec |
|---|---|---|
| 0 | **Poster / end-frame** | Eager in DOM as LCP candidate under video (`fetchPriority=high`). Visible if video buffers. |
| 1 | **Video** | Autoplay muted `playsInline`. Full-bleed `object-cover`. No opacity fade on first paint of poster. |
| 2 | **Video end** | Crossfade video → still (~0.45s, `power2.out`). Still stays razor-sharp (no blur/parallax). |
| 3 | **Type + CTA** | After still settles (or on `ended`): staggered reveal — wordmark → H1 → H2 → CTA → reassurance. `y: 24→0`, opacity, stagger `0.12s`, ease `cubic-bezier(0.16, 1, 0.3, 1)` / GSAP `power3.out`. |
| 4 | **H1 SSR** | H1 text in server HTML always; animation only uncovers (never waits on GSAP to inject copy). |

---

## Scroll-Telling

| Decision | Spec |
|---|---|
| Hero scrub / Sequence | **OFF** — locked |
| Lenis | **Not required for Hero v1** (Tier 3 deferred). Native scroll OK. |
| Section height | **`100vh` only** — no pinned runway |
| After Hero | Page continues to Lifestyle; floating Order Now appears after leaving Hero (`scroll ≥ 100vh`) |

---

## On Interaction

| Element | Spec |
|---|---|
| CTA hover | `scale(1.05)` · 0.3s soft · transform only |
| Magnetic custom cursor | **Deferred** (Tier 3) |
| Video | No controls, no scrub UI |

---

## Kinetic Typography

| Element | Spec |
|---|---|
| H1 | Optional mask / clip reveal on post-video beat; if bundle cost high → simple fade+y (preferred for LCP calm) |
| SplitText | Optional enhancement — not blocking |

---

## Reduced Motion

| Prefers-reduced-motion | Behavior |
|---|---|
| On | Skip video autoplay; show end-frame immediately; UI opacity 1 (no stagger) |
| Off | Full choreography above |

---

## Assets in motion scope

| Asset | Role |
|---|---|
| `/hero/aura-pro.mp4` | Play once HQ |
| `/hero/end-frame.jpg` | Freeze still |
| `/lifestyle/city-day.png` | Post-hero |
| `/lifestyle/city-golden.png` | Post-hero |
| `/lifestyle/city-transit.png` | Post-hero (new) |

---

## Approval checklist

- [ ] Load order: poster → video → still → type/CTA
- [ ] No Hero scroll scrub / no Lenis mandate in v1
- [ ] CTA scale-only hover
- [ ] Reduced-motion = still + static UI
