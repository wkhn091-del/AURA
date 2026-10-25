# Aura Audio — Immersive Sequence Module (Path A)

**Status:** Awaiting approval · 25.10.2026  
**Pipeline:** Path A — Apple-style Canvas Image Sequence (WebGL / R3F deferred)  
**Serves sale by:** Frame-accurate product cinema on scroll — sharper control than muted MP4, 60fps target on mid devices, zero runtime 3D cost.

---

## 1. Why not video-only?

| Criterion | MP4 Hero | Canvas Sequence |
|---|---|---|
| Scrub precision | Keyframe-dependent, can tear | Exact frame index |
| End freeze | Unreliable across browsers | Explicit last frame hold |
| Mobile weight | One heavy file | Separate light set |
| Decode control | Browser video pipeline | Worker + Blob + drawImage |

Hero still ships a **poster** for LCP; sequence is progressive enhancement.

---

## 2. Asset pipeline

| Set | Resolution | Frame count (target) | Notes |
|---|---|---|---|
| Desktop | 1920×1080 WebP | Aim **180–240** from 10s source (stride if needed) | Quality over raw FPS of source |
| Mobile | ≤1280×720 WebP | Aim **90–120** | Fewer frames, same narrative beats |
| Poster | Same aspect, single WebP/AVIF | 1 | First narrative frame; LCP; no fade-in |
| Naming | `/sequence/desktop/frame_000.webp` … | zero-padded | Config in Sanity or `sequence.manifest.json` |

**Weight gate (launch requirement):**
- Current estimate “tens of MB” is **too heavy**.
- Encode pass mandatory: WebP q≈60–75, strip metadata, optional frame stride (e.g. every 2nd source frame).
- Aspirational budget ≤5MB incl. worker is aggressive; **acceptable v1 ceiling:** desktop ≤12MB, mobile ≤4MB after encode — document actuals in `docs/asset-licenses.md` / brief.
- If still overweight: reduce to 150 desktop / 80 mobile before go-live.

**Licensing:** Aura + Studio Omek owned — green. Log in `docs/asset-licenses.md` at ingest (paths, date, owner). No NC/Editorial stock.

**Simulation:** Lifestyle + gallery remain labeled Simulation until shoot.

---

## 3. Runtime architecture

```
Poster <img> (LCP)
  → Intersection / idle → spawn SequenceWorker
    → fetch frames as ArrayBuffer → Blob URLs (or ImageBitmap)
    → postMessage({ ready: true, count })
  → mount <canvas> (lazy)
  → ScrollTrigger progress 0–1 → targetIndex
  → lerp currentIndex → targetIndex each rAF
  → drawImage only when rounded index changes
  → progress ≥ 0.98 → hold last frame → fire UI reveal
```

### Worker duties
- Prefetch with concurrency limit (e.g. 6).
- Retry failed frame once; on hard fail keep poster + degrade to static.
- Prefer `createImageBitmap` where supported; fallback `Image()`.
- Revoke Blob URLs on unmount.

### Main thread
- No decode loops on scroll handler.
- ScrollTrigger updates `targetIndex` only.
- `gsap.ticker` / rAF: `current += (target - current) * damping` (damping ~0.12–0.18).
- DPR capped (e.g. `Math.min(devicePixelRatio, 2)`); canvas CSS size = layout, buffer scaled.

### CSP
```
worker-src 'self' blob:;
img-src 'self' blob: data: <Sanity CDN>;
```
Assets served from same origin `/public/sequence/**` (or Sanity CDN if hashed URLs allowlisted).

---

## 4. Scroll mapping

| Param | Proposal |
|---|---|
| Runway | Hero section scroll height ≈ **180vh** (tune in QA) |
| Pin | Optional short pin; prefer scrub without jacking wheel |
| Progress | `0 → frame 0`, `1 → frame N-1` |
| Mobile | Same mapping, mobile manifest |
| Reduced motion | Skip worker; poster only; reveal UI on load |

---

## 5. Failure modes

| Case | Behavior |
|---|---|
| Worker unsupported | Poster + CSS/GSAP UI only |
| Partial frames loaded | Draw max available index; continue background fetch |
| Save-Data / ≤2GB RAM hint | Mobile set or poster-only |
| Tab backgrounded | Pause rAF; resume on visible |

---

## 6. File plan (implementation later)

```
src/components/hero/HeroPoster.tsx
src/components/hero/HeroSequenceCanvas.tsx
src/workers/sequence-loader.worker.ts
src/lib/sequence/lerp.ts
src/lib/sequence/manifest.ts
public/sequence/desktop/
public/sequence/mobile/
public/sequence/poster.webp
```

Sanity fields (already in architecture): `heroPoster`, `sequenceDesktop`, `sequenceMobile`.

---

## 7. Acceptance tests (manual + future automated)

1. LCP element is poster (not canvas).
2. After full load, scrubbing Hero advances frames monotonically.
3. Fast fling still smooth (lerp visible, no frame tearing).
4. End holds last frame; H1 reveal fires once.
5. Mobile loads mobile manifest only (Network panel).
6. `prefers-reduced-motion`: no worker fetch storm.
7. CSP report: no blocked worker/blob.

---

## 8. Approval checklist

- [ ] Path A only for v1
- [ ] Poster-first LCP
- [ ] Worker + lerp + rAF draw-on-change
- [ ] Dual desktop/mobile sets
- [ ] Weight encode gate before production
- [ ] Licensing log on ingest
- [ ] Reduced-motion / failure fallbacks

**Reply “Sequence מאושר” — then Script 1 allows full-stack core build (still after this approval).**
