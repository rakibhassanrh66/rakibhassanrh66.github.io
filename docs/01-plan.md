# Phase 4 — Comprehensive Portfolio Implementation Plan

**Governing Standards:** `AGENTS.md`, `DESIGN.md`, `PRODUCT.md`  
**Architecture:** Vite 7 + React 19 + TypeScript + Tailwind CSS 4 + Framer Motion  
**Target Quality Bar:** Linear + Resend calm editorial craft. Zero AI slop.

---

## 1. Master Section & System Breakdown Table

| Section / System | Purpose | Layout Pattern | Content Needed | Interaction Model | Reference Used | Needs From Owner? |
|---|---|---|---|---|---|---|
| **1. Navigation Shell** | Brand identity, primary section jumps, theme toggle, fast actions | Floating top island capsule (`max-w-4xl`, centered, `rounded-full`, hairline border) | Monogram "RH", 4 section links, `⌘K` trigger, Theme switch, CV download | Hide on scroll-down, reveal on scroll-up; Framer Motion `layoutId` pill tracker | `navbar.gallery` (Island dock) | None (All derived) |
| **2. Command Palette (`Cmd+K`)** | Keyboard-first search across all case studies, skills, actions | Centered spotlight dialog with frosted backdrop, category headers | Projects list, security skills, social links, actions (Copy Email, Toggle Theme) | `Ctrl/Cmd+K` global trigger, `↑/↓` arrow traversal, `Enter` selection, `Esc` dismiss | `navbar.gallery` + `refero.design` | None (Automatic index) |
| **3. Hero Section** | Immediate credibility: dual identity as Security & Software Engineer | 60/40 Asymmetric Split: Editorial copy & CTAs on left; interactive live System Telemetry Card on right | Real name, refined headline, verified tagline, live status dot, Dhaka time | Hover depth tilt on specimen card; primary case study CTA + secondary CV download | `supahero.io` (Zed / Pierre style) | None (Verified in Phase 0) |
| **4. Architectural Specimen (Hero Right)** | Replaces heavy 3D particle swarm with clean, performant technical artifact | Framed terminal/enclave card with tabbed inspection (Architecture, Threat Model, Active CVEs) | Technical architecture overview of AccessX / AFOS, real GitHub stats | Tab switching, copy code snippet, live latency indicator | `refero.design` + `supahero.io` | None |
| **5. Projects (Deep Case Studies)** | Concrete proof of engineering depth across 5 real repositories | Asymmetric split-pane rows (68% interactive architecture/preview + 32% technical spec rail) | **1. AFOS** (Facility IoT)<br>**2. AccessX** (Red-Team Recon)<br>**3. MarkItDown Flutter** (AST Engine)<br>**4. MedShop** (E-Commerce)<br>**5. Vehicle Detection** (YOLOv8) | Live demo link, GitHub source button, interactive threat model drawer, expandable CVE details | `refero.design` (Product deep-dives) | GitHub live URLs for MedShop / AFOS if deployed |
| **6. Technical Matrix & Skills** | Categorized taxonomy of proven capabilities (No percentage bars) | 3-column structured matrix: 1. Offensive Security & Linux, 2. Backend & Core Systems, 3. Applied AI & Data | Verified tools: Linux Admin, Burp Suite, Python/Django, Java, YOLOv8, Qiskit | Category hover highlighting, clicking a tag filters matching case studies | `refero.design` (Taxonomy chips) | None |
| **7. Experience & Education Timeline** | Professional trajectory & academic record | Alternating hairline list rows with tabular metadata (Year, Role, Organization, Location) | Associate at BRAC IT (2025), Foodpanda IT (2021), Daffodil Univ CSE (2026, GPA 5.0) | Subtle hover background lift (`var(--color-surface-2)`), milestone tags | `refero.design` + `footer.design` | None |
| **8. Certifications & Achievements** | Hard-skill verification & distinct personal accomplishments | 2-column tabular grid with credential badges and verified issue dates | Cisco Network Defense, Cisco Intro to Cyber, LinkedIn Security Foundations, 61-district cycling | Modal/accordion with credential syllabus and verification notes | `refero.design` | Verification credential IDs/URLs |
| **9. Contact & Conversion (CTA)** | Low-friction inquiry path for recruiters and clients | Asymmetric: Left conversational invitation + 1-click email copy; Right 3-field form (Name, Email, Message) | Direct email (`protonmail`), phone, Mirpur address, PGP public key fingerprint | 1-click clipboard copy with animated checkmark; Resend API submission with sanitized input & mailto fallback | `cta.gallery` + `footer.design` | Resend API Key for live production email delivery |
| **10. Colophon & Footer** | Definitive editorial close, system specs, availability status | 4-column directory + monumental subdued typography sign-off (`RAKIB HASSAN`) | Availability badge, local Dhaka time, git commit hash, copyright, RSS/PGP | Live ticking second counter, smooth back-to-top scroll button | `footer.design` (Architectural colophon) | None |
| **11. State-Aware Cursor** | Desktop precision affordance (Zero lag) | 8px dot following mouse; expands to 32px ring over links and buttons | CSS transform coordinates via requestAnimationFrame | Automatically disabled on touch screens (`pointer: coarse`) and reduced motion | Custom minimal design token | None |
| **12. Smart Site Engine** | Client-side environmental adaptation (Privacy-safe) | Background hook listener | System theme, device capability, connection speed, returning visitor flag | Low-power mode disables heavy animations; remembers theme preference; greets based on Dhaka time | Modern Web Platform APIs | None |
| **13. Performance & Singlefile Strategy** | Sub-2.5s LCP on mobile, Lighthouse >= 90 | Standard Vite split chunks + gzip asset delivery | Self-hosted Inter + JetBrains Mono fonts, WebP assets | Instant paint, zero CLS, deferred analytics/extras | Web Vitals contract | None |

---

## 2. "NEEDS FROM OWNER" — Review Items

The following are the only items that require your confirmation or assets:

1. **Live Demo URLs:**  
   Do you have deployed live URLs for **MedShop**, **AFOS**, or **MarkItDown Flutter**, or should the primary action button point directly to their verified GitHub source repositories? (Default: Link to GitHub source code with clean clone affordance).
2. **Contact Email Destination:**  
   Currently, the code has both `rakibhassan.rh66@protonmail.com` and `rakibhassan.rh66@gmail.com`. Which one do you prefer as your primary public contact address?
3. **Resend API Key:**  
   For the contact form to deliver live emails directly into your inbox from Vercel, a `RESEND_API_KEY` environment variable will be required in Vercel settings. (The form will include an automatic fallback to open your mail client with pre-filled subject/body).
4. **PGP Fingerprint (Optional):**  
   For the cybersecurity technical colophon, do you have a public PGP key fingerprint you want displayed, or should we display your verified GitHub key ID?

---

## 3. Implementation Sequence (Phase 5 Order of Execution)

Once approved, execution will strictly follow this order:
1. **Core Data & Schema Upgrade:** Refactor `src/data/portfolio.ts` with complete, verified project data for AFOS, AccessX, MarkItDown, MedShop, and Vehicle Detection.
2. **Navigation & Command Palette:** Build floating island `Navigation.tsx` and keyboard-driven `CommandPalette.tsx`.
3. **Scroll & Transition System:** Configure smooth scrolling and section reveal observers.
4. **Editorial Hero Section:** Rebuild `HeroSection.tsx` with 60/40 split, editorial typography, and interactive Telemetry Card.
5. **Deep Project Case Studies:** Rebuild `ProjectsSection.tsx` into asymmetric split-pane case studies with threat models and architecture breakdowns.
6. **Skills, Experience & Certifications:** Rebuild `AboutSection.tsx` into categorized technical matrices and tabular timelines.
7. **Conversion & Contact:** Rebuild `ContactSection.tsx` with sanitization, XSS mitigation, and 1-click clipboard actions.
8. **Architectural Footer:** Rebuild `Footer.tsx` with live Dhaka clock and colophon.
9. **Smart Site & Custom Cursor:** Wire `useDeviceDetect`, ambient cursor, and performance budgeting.
10. **Automated Verification:** Playwright screenshots at 360, 768, 1024, 1440px + Button height measurements + Lighthouse checks.
