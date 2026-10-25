# Aura Audio — Motion Engine (Module A-3)

**Status:** Awaiting approval · 25.10.2026  
**Direction:** Silent Frame · Tier 2 Sequence · EN/LTR  
**Iron rules:** animate only `transform` + `opacity` · 60fps · LCP poster never opacity-fades in · motion never blocks clicks · no scroll-jacking (pin OK)

---

## 1. Easing tokens

| Token | Value | Use |
|---|---|---|
| `--ease-out-expo` | `cubic-bezier(0.16, 1, 0.3, 1)` | Primary reveals, CTA fade-in |
| `--ease-out-quart` | `cubic-bezier(0.25, 1, 0.5, 1)` | Section slide-ups |
| `--ease-in-out-soft` | `cubic-bezier(0.45, 0, 0.55, 1)` | Hover scale settle |
| `--ease-spring-soft` | GSAP `power3.out` / custom `0.22, 1, 0.36, 1` | Kinetic type mask reveal |
| Duration reveal | `0.85s–1.1s` | Scroll enters |
| Duration micro | `0.25s–0.35s` | Hovers, floating CTA |
| Stagger cards | `0.2s` | Features grid |
| Stagger copy | `0.12s–0.14s` | Text lines |

**Banned:** linear / default `ease-in-out` on hero-scale moments.

**GSAP defaults (proposed):**
```ts
gsap.defaults({ ease: "power3.out", duration: 0.9 });
```

---

## 2. Global behaviors

| Behavior | Spec | Mobile |
|---|---|---|
| Floating Order Now | `opacity 0` until `scroll ≥ 100vh`; then fade 0.35s `--ease-out-expo`; `pointer-events` none while hidden | Same; bottom-center |
| Reduced motion | `prefers-reduced-motion: reduce` → no sequence scrub; static poster + instant section opacity 1 | Required |
| Hover | Cards/CTA `scale(1.05)` · 0.3s soft; only transform | Disable scale on coarse pointer if jittery |
| Magnetic cursor / custom cursor | **Out of v1** (Tier 3 deferred) | — |
| Lenis smooth scroll | **Out of v1** (Tier 3 deferred); native scroll + ScrollTrigger | — |
| Kinetic SplitText | Optional on H1 after sequence end only (word/line mask). If bundle cost high → CSS clip-path reveal | Prefer simpler fade+y on mobile |

---

## 3. Motion map by section

### `/` Hero
| Beat | Trigger | Animation |
|---|---|---|
| LCP | Load | Poster visible immediately (no fade) |
| Sequence | Scroll through Hero pin (optional short pin) OR scrub without heavy pin | Frame index lerped from scroll progress; rAF draw on change only |
| End frame hold | Sequence complete / end of scrub | Freeze last frame |
| UI reveal | After freeze (or when progress ≥ 0.98) | Wordmark + H1 + H2: opacity 0→1, y 24→0, stagger 0.12s, mask optional |
| Earbuds overlay (if used) | `video/sequence ended` equivalent | scale 0.8→1 + fade (transform+opacity) |

**Pin policy:** Prefer light ScrollTrigger scrub on Hero height (~150–200vh scroll runway) without stealing scroll speed. If pin used: pin Hero while sequence plays, then release — never custom wheel hijack.

### Lifestyle / Deep Dive
| Beat | Trigger | Animation |
|---|---|---|
| Image | section top 75% | y 80→0, opacity 0→1, 1.1s power3.out |
| Text | section top 70% | children stagger y 32→0, opacity, 0.14s |

### Features Grid
| Beat | Trigger | Animation |
|---|---|---|
| Cards | section top 75% | each card y 40→0, opacity, stagger **0.2s** |

### Gallery
| Beat | Trigger | Animation |
|---|---|---|
| Section | top 80% | whole block y 50→0, fade |
| Card hover | pointer | inner img scale 1→1.05, 700ms soft |
| Horizontal scroll | native | snap-x mandatory; no JS scroll hijack |

### Checkout / CTA
| Beat | Trigger | Animation |
|---|---|---|
| Title + button | top 75% | opacity + scale 0.92→1, stagger 0.18s |
| Footer | none / with section | static or slight fade |

### Policy pages
| Beat | Trigger | Animation |
|---|---|---|
| Article | load / enter | simple y 16→0 fade once — keep calm |

---

## 4. Performance budget (motion)

- Compositor-only props.
- `will-change: transform` only while animating; remove after.
- Sequence worker off main thread for decode/fetch.
- No animating `blur`/`filter` on scroll (hover-only if needed).
- Kill ScrollTriggers on unmount (`gsap.context` / `revert`).

---

## 5. Approval checklist

- [ ] Easing tokens accepted
- [ ] No Lenis / no magnetic cursor in v1 accepted
- [ ] Hero scrub + post-sequence type reveal accepted
- [ ] Section map accepted
- [ ] Reduced-motion fallback accepted

**Reply “תנועה מאושרת” to proceed to Module 3D / Sequence technical plan (still no app code until that is approved too).**
