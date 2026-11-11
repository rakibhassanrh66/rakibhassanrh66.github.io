# Phase 0 — Codebase Audit & Reconnaissance

**Date:** November 11, 2026  
**Repository:** `rakibhassanrh66.github.io`  
**Branch:** `feat/portfolio-upgrade`  
**Auditor:** Lead Engineer / Superpowers AI

---

## 1. Executive Summary

The existing portfolio is a React 19 + TypeScript single-page application bundled with Vite 7 and Tailwind CSS 4. It features a cyberpunk/terminal dark aesthetic with React Three Fiber 3D particle hero, Framer Motion animations, and a Resend email API.

While functional, it exhibits classic "AI-generated portfolio" traits:
- Over-saturated cyan/purple neon accents and glow blobs.
- Generic cards in repeating grids.
- Singlefile bundler (`vite-plugin-singlefile`) which inlines a 1.32MB payload, harming initial load performance.
- Stale links (all projects have empty `links: []`).
- Unverified/awkward copy in bio ("Pursuing as a cybersecurity professional...").
- Dead code, unused assets, and security issues in API routes.

This upgrade will transform it into an editorial, calm, and technically credible showcase for Rakib's dual expertise in Cybersecurity Engineering and Software Engineering.

---

## 2. Tech Stack Audit

| Category | Current Implementation | Verdict | Target Direction |
|---|---|---|---|
| **Framework** | React 19.2.3 | **Keep** | Retain React 19 |
| **Language** | TypeScript 5.9.3 | **Keep** | Strict types, tokens typed |
| **Build Tool** | Vite 7.2.4 | **Keep** | Retain Vite |
| **Bundling** | `vite-plugin-singlefile` (1.32MB inline) | **Replace** | Remove or optimize: standard code-split Vite build for Vercel/GitHub Pages with fast LCP |
| **Styling** | Tailwind CSS 4.1.17 (`@tailwindcss/vite`) | **Keep & Upgrade** | Keep Tailwind 4, define strict CSS variables & token system in `DESIGN.md` |
| **3D / Canvas** | Three.js 0.184 + R3F 9.6 + Drei 10.7 | **Refactor** | Keep subtle, calm, or replace with lightweight Canvas/SVG to meet LCP < 2.5s and mobile perf >= 90 |
| **Animation** | Framer Motion 12.38.0 | **Keep & Restrain** | Standardize easing, durations (150-500ms), respect `prefers-reduced-motion` |
| **Icons** | `react-icons` 5.6.0 | **Keep** | Consistent Lucide-style or Tabler icons, zero emoji-as-icons |
| **Backend/Email** | Resend 6.12.3 (`api/contact.js`, `api/send-message.ts`) | **Fix & Consolidate** | Fix HTML injection (XSS), delete duplicate `send-message.ts`, provide graceful mailto fallback |

---

## 3. Architecture & File Inventory

### Source Structure
- `src/App.tsx` — Main orchestrator with lazy-loaded sections and section spy.
- `src/main.tsx` — React root mount.
- `src/index.css` — Global styles, Google Fonts imports, font-family declarations.
- `src/data/portfolio.ts` — Central data store (222 lines). Needs updating with real project URLs and clean copy.
- `src/components/hero/` — `HeroSection.tsx` & `ParticleBackground.tsx`.
- `src/components/about/` — `AboutSection.tsx` (glass cards, skill bars, education/experience tabs).
- `src/components/projects/` — `ProjectsSection.tsx` (3-column grid + modal dialog).
- `src/components/contact/` — `ContactSection.tsx` (form + quick actions + timezone).
- `src/components/layout/` — `Navigation.tsx` (sticky auto-hide navbar) & `Footer.tsx`.
- `src/components/ui/` — `CursorGlow.tsx`, `ThemeToggle.tsx`, `SocialLinks.tsx`, `SearchBar.tsx`, `CVDownload.tsx`, `TimeZone.tsx`.
- `src/hooks/` — `useTheme.ts`, `useScrollPosition.ts`, `useDeviceDetect.ts`, `useCursorPosition.ts` (unused), `useTimeZone.ts`.
- `src/utils/cn.ts` — Standard `clsx` + `twMerge` helper (unused currently).

### Asset Inventory (`public/`)
- `Rakib_Hassan_CV.pdf` (valid, 163 KB)
- `images/rakib.jpg` (valid profile picture)
- `images/hero-bg.jpg` (dead asset, unreferenced)
- `icons/r.svg`, `icons/r.png` (favicons)

---

## 4. Tech Debt & Defects Identified

1. **Dead Code & Unused Files:**
   - `api/send-message.ts` is an unreferenced duplicate of `api/contact.js`.
   - `src/hooks/useCursorPosition.ts` is completely unused.
   - `src/utils/cn.ts` is never imported.
   - `public/images/hero-bg.jpg` is unreferenced.

2. **Security Vulnerabilities:**
   - `api/contact.js`: Form input fields (`name`, `email`, `message`) are concatenated directly into an HTML string sent via email without HTML entity escaping, permitting Stored XSS in recipient email clients.

3. **Data Mismatches & Broken Links:**
   - `portfolioData.cvUrl` in `src/data/portfolio.ts` points to `/public/CV of RAKIB HASSAN.pdf`, but the actual public asset is `/Rakib_Hassan_CV.pdf`.
   - All 5 projects currently have `links: []`, meaning the "View Project" action never renders.
   - Projects in data do not match all the verified GitHub repositories (AFOS, MedShop, MarkItDown Flutter, Airport Management, AccessX, etc.).

4. **UI & Accessibility Defects:**
   - Footer contains Latin placeholder text: `Generis occidio.`
   - Double semicolon in `HeroSection.tsx` line 196 (`);;}`).
   - TimeZone widget only calculates once on mount; does not tick or update live.
   - `SocialLinks` icon sizing is broken (inner SVG is hardcoded to `h-5 w-5` regardless of container sizing).
   - `useDeviceDetect` event listener leak on `orientationchange` (`removeEventListener` passes a new anonymous lambda).
   - Missing OpenGraph image (`og:image`) and Twitter image in `index.html`.
   - Orbitron font used for headings creates readability friction at smaller sizes and feels stereotypically "gamer/crypto".

5. **Performance & Bundle Weight:**
   - Singlefile inlines Three.js, R3F, Drei, and all fonts into a 1.32MB monolithic HTML file. This defeats code-splitting and damages mobile First Contentful Paint (FCP) and Largest Contentful Paint (LCP).

---

## 5. What to Keep vs. What to Replace

### Keep
- Core Vite + React 19 + TypeScript stack.
- Real personal data, education history (Daffodil International Univ, GPA 5.0), verified certifications (Cisco, LinkedIn Learning), and achievements (cycling 61 districts, marathon leadership).
- High-level section structure: Nav, Hero, About/Skills, Projects (as deep case studies), Experience/Education, Contact/CTA, Footer, Command Palette (`Cmd+K`).
- Clean dark/light theme switching with zero-FOUC inline script.

### Replace
- **Visual Language:** Replace neon cyan/purple glows and heavy glassmorphism with an editorial, calm, high-contrast palette (neutral canvas + single precise accent hue).
- **Typography:** Replace Orbitron display font with a refined modern editorial sans/display pairing (e.g., Geist / Inter + JetBrains Mono for security/terminal details).
- **Project Showcase:** Transform shallow cards with empty links into structured case studies featuring real GitHub links, architecture overviews, threat models, and live badges.
- **Singlefile Bundling:** Configure Vite for clean code-splitting and asset optimization for Vercel/GitHub Pages.
- **Button & Token System:** Replace ad-hoc Tailwind classes with rigid tokens defined in `DESIGN.md` (3 fixed button heights, uniform radius, WCAG AA contrast).
- **Bio Copy:** Rewrite awkward phrasing into confident, concise, technically rigorous descriptions.

---

## 6. Risks & Mitigation Plan

| Risk | Impact | Mitigation |
|---|---|---|
| R3F 3D particle canvas impacts mobile performance / LCP | Drops Lighthouse mobile score < 90 | Use CSS/SVG or lightweight Canvas with `requestIdleCallback`, disable completely on low-power / mobile |
| Removing `vite-plugin-singlefile` changes deployment assumptions | Site may break if host expected a single HTML file | Verify Vercel / GitHub Pages deployment configuration supports standard multi-asset dist folder |
| Resend API key exposure or missing environment variable | Contact form failure in production | Secure API route with validation, rate-limiting, and graceful client-side `mailto:` fallback |
