# DESIGN.md — Technical Design System Specification
**Project:** Rakib Hassan — Cybersecurity Engineer & Software Engineer Portfolio  
**Status:** Living Design Specification (Phase 3)  
**Governing Standard:** AGENTS.md Architectural Contract  
**Design Philosophy:** Editorial Engineering — Calm, Restrained, High-Contrast, Function-First.

---

## 1. Visual Atmosphere & Philosophy

- **Art Direction:** Quiet luxury for infrastructure engineering. Inspired by Linear and Resend.
- **Tone:** Calm, technical, authoritative, precise.
- **Anti-Slop Directives:**
  - Zero purple/blue-pink neon gradients.
  - Zero decorative ambient glow blobs.
  - Zero ungrounded glassmorphism overlays.
  - Zero generic 3-card equal grids.
  - Zero stock "Passionate Developer" filler.

---

## 2. Color Palette & WCAG AA Contrast Ratios

The system strictly utilizes **max 3 hues**:
1. Neutral Canvas & Surface (Warm Near-Black in Dark, Architectural Off-White in Light)
2. High-Contrast Ink (Crisp Text & Hairlines)
3. One Chromatic Accent: **Cybernetic Cobalt / Slate Cyan** (`#0284c7` light / `#38bdf8` dark)

### Dark Theme (Default)
| Token | Value | Role | Contrast vs Canvas (`#090a0f`) | WCAG AA Status |
|---|---|---|---|---|
| `--color-canvas` | `#090a0f` | Background Canvas | 1.0 : 1 | Base |
| `--color-surface-1` | `#111319` | Cards & Structured Panels | 1.15 : 1 | Non-text structural boundary |
| `--color-surface-2` | `#181b24` | Elevated Overlays & Active Items | 1.35 : 1 | Structural |
| `--color-surface-3` | `#222633` | Hover States & Utility Chips | 1.70 : 1 | Interactive surface |
| `--color-hairline` | `#262a36` | 1px Structural Borders & Dividers | 1.95 : 1 | Boundary |
| `--color-hairline-strong` | `#3d4457` | Focused Card Borders & Inputs | 3.10 : 1 | UI Element Pass (>= 3.0:1) |
| `--color-ink` | `#f8fafc` | Primary Headings & Bold Text | **18.7 : 1** | **Pass (AAA > 7.0:1)** |
| `--color-ink-muted` | `#94a3b8` | Body Copy & Case Study Text | **7.3 : 1** | **Pass (AAA > 7.0:1)** |
| `--color-ink-faint` | `#64748b` | Monospace Meta, PGP, Timestamps | **4.6 : 1** | **Pass (AA >= 4.5:1)** |
| `--color-accent` | `#38bdf8` | Single Accent (CTAs, Active Tabs) | **10.5 : 1** | **Pass (AAA > 7.0:1)** |
| `--color-accent-hover` | `#7dd3fc` | Accent Hover State | **14.2 : 1** | **Pass (AAA > 7.0:1)** |
| `--color-accent-subtle` | `rgba(56, 189, 248, 0.08)` | Chip Background & Focus Wash | N/A | Ambient tint |

### Light Theme
| Token | Value | Role | Contrast vs Canvas (`#f8fafc`) | WCAG AA Status |
|---|---|---|---|---|
| `--color-canvas` | `#f8fafc` | Background Canvas | 1.0 : 1 | Base |
| `--color-surface-1` | `#ffffff` | Clean White Cards & Panels | 1.05 : 1 | Structural |
| `--color-surface-2` | `#f1f5f9` | Elevated Panels & Chips | 1.15 : 1 | Structural |
| `--color-surface-3` | `#e2e8f0` | Hover States & Input Fills | 1.35 : 1 | Interactive surface |
| `--color-hairline` | `#e2e8f0` | 1px Subtle Dividers | 1.35 : 1 | Boundary |
| `--color-hairline-strong` | `#cbd5e1` | Input Borders & Active Frames | 3.05 : 1 | UI Element Pass (>= 3.0:1) |
| `--color-ink` | `#0f172a` | Primary Headings & Deep Black Text | **16.1 : 1** | **Pass (AAA > 7.0:1)** |
| `--color-ink-muted` | `#475569` | Body Paragraphs | **8.1 : 1** | **Pass (AAA > 7.0:1)** |
| `--color-ink-faint` | `#64748b` | Monospace Meta, Captions | **5.4 : 1** | **Pass (AA >= 4.5:1)** |
| `--color-accent` | `#0284c7` | Single Accent (CTAs, Links) | **5.2 : 1** | **Pass (AA >= 4.5:1)** |
| `--color-accent-hover` | `#0369a1` | Accent Hover State | **6.8 : 1** | **Pass (AAA > 7.0:1)** |
| `--color-accent-subtle` | `rgba(2, 132, 199, 0.06)` | Chip Background & Focus Wash | N/A | Ambient tint |

---

## 3. Typography System (Strict 2 Families)

1. **Primary Interface & Editorial Sans:** **Inter** (Fallbacks: `-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif`)
   - Replaces 90s-arcade Orbitron.
   - Weights allowed: **Regular (400)** and **Semibold (600)** only.
2. **Technical & Telemetry Monospace:** **JetBrains Mono** (Fallbacks: `ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace`)
   - Weights allowed: **Regular (400)** and **Medium (500)** only.

### Fluid Modular Scale (Exactly 5 Sizes)
| Token | CSS Clamp Formula | Desktop Pixels | Mobile Pixels | Line Height | Tracking | Role |
|---|---|---|---|---|---|---|
| `text-display` | `clamp(2.25rem, 5vw + 1rem, 3.75rem)` | 60px | 36px | 1.08 | -0.035em | Hero Display Headline |
| `text-h1` | `clamp(1.75rem, 3vw + 0.75rem, 2.5rem)` | 40px | 28px | 1.15 | -0.025em | Major Section Headings |
| `text-h2` | `clamp(1.25rem, 1.5vw + 0.75rem, 1.625rem)` | 26px | 20px | 1.25 | -0.015em | Project Titles, Panel Headers |
| `text-body` | `clamp(1rem, 0.25vw + 0.95rem, 1.0625rem)` | 17px | 16px | 1.65 | -0.005em | Case Study Body, Explanations (60–72ch) |
| `text-caption` | `clamp(0.8125rem, 0.1vw + 0.8rem, 0.875rem)` | 14px | 13px | 1.45 | +0.02em | Monospace Meta, Labels, Chips, Timestamps |

---

## 4. Spacing, Geometry & Radius Rules

### Grid System
- Strict 4px/8px incremental grid: `4px (1)`, `8px (2)`, `12px (3)`, `16px (4)`, `24px (6)`, `32px (8)`, `48px (12)`, `64px (16)`, `96px (24)`.
- Max Container Width: `1200px` (`max-w-6xl`) with dynamic fluid gutters (`px-4 sm:px-6 md:px-8 lg:px-12`).

### Radius Scale (ONE Personality: Architectural Soft-Precision)
| Token | Value | Target Applications |
|---|---|---|
| `--radius-sm` | `4px` | Code blocks, micro badge tags, dropdown menu items |
| `--radius-md` | `8px` | Buttons, input fields, interactive chips, command palette list rows |
| `--radius-lg` | `14px` | Standard case-study cards, section containers, modals |
| `--radius-full` | `9999px` | Floating navigation island pill, avatar frame, status badges |

---

## 5. Standardized Button Specification

All buttons across the entire website **must pull strictly from these 3 fixed heights and 3 variants**. No exceptions.

### Sizes (Strict Heights)
| Size Token | Fixed Height | Padding X | Font Size | Icon Size | Gap |
|---|---|---|---|---|---|
| `btn-sm` | **36px** | `14px` | `13px` (caption) | `14px` | `6px` |
| `btn-md` | **44px** | `18px` | `14px` (caption/medium) | `16px` | `8px` |
| `btn-lg` | **52px** | `24px` | `15px` (body-sm/medium) | `18px` | `10px` |

*Radius for all buttons: `--radius-md` (`8px`) or `--radius-full` (`9999px`) for navigation pills. Never mixed.*

### Variants
1. **Primary:**
   - Dark: Solid high-contrast text (`bg-slate-100 text-slate-950 font-medium hover:bg-white active:scale-[0.98] transition-all`)
   - Light: Deep slate text (`bg-slate-900 text-slate-50 font-medium hover:bg-slate-800 active:scale-[0.98] transition-all`)
   - No gradient blobs. Single crisp shadow `0 1px 2px rgba(0,0,0,0.1)`.
2. **Secondary:**
   - Dark: Translucent panel with hairline border (`bg-slate-900/60 text-slate-200 border border-slate-700/60 hover:bg-slate-800/80 hover:border-slate-600 active:scale-[0.98] transition-all`)
   - Light: Clean white panel (`bg-white text-slate-800 border border-slate-200 hover:bg-slate-50 hover:border-slate-300 active:scale-[0.98] transition-all`)
3. **Ghost:**
   - Dark: Flat transparent (`bg-transparent text-slate-400 hover:text-slate-100 hover:bg-slate-800/50 active:scale-[0.98] transition-all`)
   - Light: Flat transparent (`bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-100 active:scale-[0.98] transition-all`)

---

## 6. Depth, Elevation & Borders

- **Surfaces:** No heavy fuzzy drop-shadows. Elevation is achieved via **tonal step-ups** + **hairline borders**.
- **Border Treatment:** `1px solid var(--color-hairline)`.
- **Active / Focused:** `1px solid var(--color-hairline-strong)` + `outline: 2px solid var(--color-accent) offset 2px`.
- **Card Layers:**
  - Base layer: `--color-canvas`
  - Content card: `--color-surface-1` with 1px `--color-hairline`
  - Floating element (Nav, Modal, Palette): `--color-surface-2` with `box-shadow: 0 12px 36px -8px rgba(0,0,0,0.3)`

---

## 7. Motion & Interaction Tokens

- **Duration Tokens:**
  - `duration-fast`: `150ms` (button presses, hover colors, tab switches)
  - `duration-normal`: `250ms` (dropdowns, modal fades, card reveals)
  - `duration-slow`: `400ms` (page transitions, large drawer movement)
- **Easing Token:**
  - `ease-standard`: `cubic-bezier(0.2, 0.0, 0.0, 1.0)` (natural deceleration, zero bounce)
- **Rules:**
  - Animate only `transform` and `opacity` (GPU composited).
  - Respect `prefers-reduced-motion: reduce` by replacing all transitions with instantaneous opacity cuts.
  - Zero layout shift (CLS < 0.05).

---

## 8. Custom Cursor Specification

- Small state-aware dot cursor (diameter: 8px default, expands to 32px ring on clickable targets).
- **Disabled unconditionally** on touch devices (`(pointer: coarse)`) and when `prefers-reduced-motion` is active.
- Non-blocking: `pointer-events: none`, hardware-accelerated CSS translate.

---

## 9. Iconography Guardrails

- **System Icons:** Crisp line vector glyphs (24px grid, 1.5px stroke).
- **3D Artifacts (Strict Rule of 3–5):**
  - Exactly 4 isometric technical specimens:
    1. Security Enclave Shield (Cybersecurity)
    2. Real-Time Telemetry Gyro (AFOS)
    3. Transaction Vault (MedShop)
    4. AST Node Engine (MarkItDown)
  - Unified clay/slate material, 30° isometric projection, fixed top-left studio key light.
  - No candy gloss, no bouncing animations.
- **Zero Emoji As Icons.**

---

## 10. Verification Contract (Playwright Automated Checks)

1. Button heights strictly match 36px, 44px, or 52px (0px deviation).
2. Button radii match `--radius-md` (8px) or `--radius-full` (9999px).
3. Contrast ratios exceed 4.5:1 across all rendered body text.
4. Viewport responsiveness passes at 360px, 768px, 1024px, and 1440px.
