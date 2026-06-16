# Antigravity build prompt — Jain Polymer Co. website

> **How to use:** Create a new project folder in Antigravity, unzip `JainPolymer_web_assets.zip` into `/public/brand/` inside it (keep the `pages/` and `crops/` subfolders), then paste everything below the line into the Agent Manager. Let it produce its Implementation Plan first, review it, then let it build and self-verify in the browser.

---

## ROLE & OBJECTIVE

You are a senior front-end engineer **and** an art director with a portfolio of award-winning B2B industrial sites (Awwwards / FWA tier). Build a complete, production-ready marketing website for **Jain Polymer Co.**, an Indian manufacturer of PTFE/Teflon and FEP wires, cables, sleeves and tapes, established 1991, with Ministry of Defence and C-DOT approvals.

The site must read as **bespoke, engineered, and expensive** — the kind of site a serious aerospace/defence-grade components company would commission. It must NOT look like a generic AI-generated template.

Plan first (produce the Implementation Plan artifact), then scaffold, build, and verify each page in the built-in browser with screenshots at desktop (1440px), tablet (768px) and mobile (390px). Fix anything that looks off before reporting done.

---

## HARD RULE: IT MUST NOT LOOK AI-GENERATED

**Banned patterns — do not produce any of these:**
- Purple-to-blue gradient hero with one centred headline and a single glowing button.
- Three identical glassmorphic/rounded-3xl "feature cards" with generic lucide line-icons.
- Gradient-filled text headings; emojis in headings or buttons.
- The "bento grid" cliché; everything centred and perfectly symmetric.
- Inter (or system-ui) used for *everything*.
- Vague marketing fluff: "empower", "seamlessly", "elevate", "unlock", "in today's fast-paced world", "solutions that scale".
- Stock blob illustrations, floating 3D shapes, fake dashboard mockups.
- Uniform soft drop-shadows on every card.

**The art direction to follow instead — "Engineered Precision / technical editorial":**
- A confident, asymmetric editorial layout built on a strict 12-column baseline grid. Let content breathe; use generous, intentional whitespace and hairline rules (1px) as dividers.
- **Typography as the hero.** Pair a sharp display face for headlines (e.g. *Söhne*, *Neue Haas Grotesk*, or free alternatives **Archivo / Space Grotesk / Fraunces** for headlines) with a **monospace** (e.g. **JetBrains Mono** or **IBM Plex Mono**) used specifically for spec labels, AWG sizes, standards codes and small captions — this "data type" treatment signals technical precision. Body in a clean grotesque (**Inter Tight** or **Söhne** alt). Use large, tightly-tracked headlines.
- **Restrained palette, used with discipline.** Mostly an off-white/paper canvas (`#F7F6F2`) and near-black ink (`#16181D`). Brand cobalt (`#1F4FA3`) and the swan orange-red (`#F2602F`) appear as *accents only* — a rule line, an underline that draws on scroll, a single CTA, a stat highlight. Never fill whole sections with gradient.
- **Blueprint / spec-sheet sensibility.** Thin technical annotations, dimension-line motifs, monospace coordinate labels, subtle dotted/engineering grid texture in select sections. Reference: the look of a precision datasheet, not a SaaS landing page.
- **Real product photography**, treated consistently (consistent crop, subtle duotone or clean white-bg masking where possible). Use the supplied photos; never insert stock imagery.
- Motion is purposeful and physics-based (see Motion spec), never decorative noise.

---

## TECH STACK
- **Next.js (App Router) + TypeScript**, Tailwind CSS.
- **Motion:** Framer Motion (`motion`) for component-level transitions + **GSAP + ScrollTrigger** for scroll choreography + **Lenis** for smooth scrolling. Respect `prefers-reduced-motion`.
- `next/image` for all imagery; self-host fonts via `next/font` (no FOUT).
- Static content (no CMS needed now), but structure content in typed data files (`/content/*.ts`) so it's CMS-ready later.
- Deploy target: Vercel. Include `sitemap.xml`, `robots.txt`, JSON-LD (`Organization` + `Product`), Open Graph tags.

---

## ASSETS (already in `/public/brand/`)
- `crops/logo_swan.jpg`, `crops/logo_swan_red.jpg` — swan mark. **Vectorise the swan to a clean SVG** (single-curve mark) and use the SVG for header/favicon; keep it sharp at all sizes.
- `crops/wordmark_jain_polymer.jpg` — wordmark reference (rebuild the wordmark in live text using the chosen display font; don't ship the JPG).
- `crops/photo_wire_coils_bundles.jpg`, `photo_sleeves_pcb.jpg`, `photo_fep_coils.jpg`, `photo_three_strip.jpg`, `photo_assorted_wires_left.jpg`, `photo_cutaway_sleeves.jpg` — product photography.
- `pages/*.jpg` — original brochure scans for reference only (do not ship).
- `JainPolymer_brand_asset_sheet.md` — full brand sheet incl. the complete PTFE wire spec table; read it for authoritative content.

---

## REAL CONTENT (use this — do not invent filler)

**Company:** Jain Polymer Co. Promoted 1991 by proprietor Shri S.K. Jain. Manufacturer of PTFE/TEFLON & FEP wire, cable, sleeve and tape. Rohtak, Haryana, India. Quality conforms to JSS & MIL standards.

**Approvals / credibility (feature prominently):** Ministry of Defence (L.C.S.O), C-DOT (Centre for Development of Telematics), JSS & MIL conformance.

**Voltage classes (hook-up wire):** Type ET = 250 V, Type E = 600 V, Type EE = 1000 V (AC RMS). Dielectric/spark test values: ET 1500/2500 V, E 2000/3400 V, EE 3000/5000 V.

**Product families (each gets its own page):**
1. **PTFE Hook-up (Equipment) Wires** — JSS 51004 / MIL-W-16878E; annealed copper, silver-plated (SPC), nickel-plated (NPC) or copper-weld; AWG-30 to AWG-8; 10 standard colours; service −65 °C to +260 °C.
2. **Multi-core & Co-axial / Tri-axial Cables** — JSS-51100 / MIL-C-17; RG-196/198/195 (50/75/90 Ω), RG-115/140/141/142 A/U; shielded, double-shielded or flat-woven; PTFE/PVC/varnished-FG jackets.
3. **FEP Extruded Wires** — fluorinated ethylene propylene; −65 °C to +260 °C; co-extruded up to 10 colours; self-extinguishing, non-toxic.
4. **PTFE Sleevings** — JSS 54802 / MIL-I-22129; bore 0.3–30 mm, wall from 0.25 mm; breakdown voltage up to 17 kV; full colour range + pink & natural.
5. **PTFE Tapes** — Premium electrical-grade cable-wrap tape (150 mm jumbo/slit) and "JAIN FLON" thread-seal tape (12.5 / 19 / 25 mm).
   *(Also mention: Thermocouple & Compensating Cables, Silicon Rubber Tubing.)*

**Spec table (render as real, sortable/filterable HTML on the Wires page — sample rows; full table is in the asset sheet):**
| AWG | Strands | Cond. dia (mm) | Area (mm²) | EE dia max (mm) | Resistance Ω/1000 m | Current (A) |
|---|---|---|---|---|---|---|
| 30 | 7/38 | 0.31 | 0.055 | 1.16 | 330.37 | 1.0 |
| 24 | 19/36 | 0.64 | 0.252 | 1.47 | 79.72 | 4.0 |
| 20 | 19/32 | 1.02 | 0.596 | 1.82 | 30.15 | 11.0 |
| 16 | 19/29 | 1.45 | 1.254 | 2.41 | 14.82 | 22.0 |
| 12 | 19/25 | 2.31 | 3.021 | 3.37 | 5.93 | 41.0 |
| 8  | 133/29| 4.29 | 8.784 | 5.56 | 2.15 | 75.0 |
| 6  | 133/27| 5.41 | 13.537| 6.93 | 1.37 | 100.0 |

**Why Teflon over PVC (a strong story — build a section):** Teflon-insulated copper rated to 300 °C vs. best FRLS PVC at 105 °C and conventional PVC at 70 °C. PVC succumbs to overload, ignites, and emits toxic/corrosive fumes; PTFE is self-extinguishing, non-toxic, chemically inert, immune to fungus/UV/water. Frame as "The Permanent Solution."

**Applications (build an industries section):** Aerospace & defence, atomic energy & reactor control, satellite launch & ground control, radar & navigation, telecom exchanges, high-performance motors/transformers, furnace & oven wiring, load cells & pressure transducers, infra-red & airfield lighting, thermocouple leads, control-panel wiring, computers, refrigeration.

**Contact:** 565/32, Circular Road, Rohtak – 124001, Haryana, India · Tel/Fax 01262-259727 / 248679 / 248604 · Mobile 98100-46627 / 9999995556 · Email sales@jainpolymers.com (use this modern placeholder, not the legacy vsnl address).

**Taglines (use sparingly, as section openers):** "The proven technology." · "Marked advantage. Matchless range." · "Engineered PTFE — meeting your needs, exceeding your expectations." · "The permanent solution to your wiring problems."

---

## SITE MAP & SECTION SPEC

**Global:** sticky slim header (vectorised swan + live-text wordmark, nav, an outlined "Request a Quote" CTA that turns solid on scroll). Footer with sitemap, standards/approvals badges, address, an inquiry shortcut.

1. **Home**
   - Hero: NOT a centred gradient. Left-aligned oversized headline ("The proven technology" / "PTFE & FEP wire engineered for −65 °C to +260 °C"), a one-line technical sub, a monospace credibility strip (`JSS 51004 · MIL-W-16878E · MoD approved · since 1991`). Signature motion: a single PTFE wire/cable rendered as an **SVG path that draws itself** across the hero on load, with a real product photo revealed via mask. Subtle parallax on scroll.
   - Credibility bar: MoD / C-DOT / JSS / MIL set in monospace with hairline separators.
   - Product families: an asymmetric editorial grid (varying tile sizes, not 3 equal cards), each with a real photo, the family name, key standard, and a hover state that shifts the accent rule.
   - "Teflon vs PVC" story section with animated stat counters (300 °C vs 105 °C vs 70 °C) and a temperature-bar that fills on scroll.
   - Industries marquee / logo-style list.
   - Closing CTA band (cobalt or ink, one orange-red action).
2. **Products** (overview) + 5 family detail pages. Each detail page: hero photo, spec table (real HTML; Wires page filterable by AWG/voltage type), standards, colour-options swatch row (the 10/12 colours), applications, per-page "Request a Quote".
3. **Quality & Approvals** — JSS/MIL conformance, testing (dielectric/spark table), quality policy, approvals.
4. **About** — 1991 heritage, proprietor, manufacturing/quality narrative, timeline.
5. **Contact / Request a Quote** — real form (product, standard, conductor, colour, AWG/bore, quantity, length, message) with inline validation and a success state; address block + embedded map. (Wire to Formspree or a Next.js route handler stub.)

---

## MOTION SPEC (purposeful, performant)
- Lenis smooth scroll site-wide; one signature hero animation only (the self-drawing wire path).
- Scroll-triggered reveals: text rises + fades with a slight stagger; hairline rules and accent underlines *draw* left-to-right on enter.
- Magnetic / subtle-scale CTA buttons; link hover = animated underline, not colour-only.
- Animated number counters for stats; temperature bar fill.
- Cross-page transitions via View Transitions API (fallback to Framer Motion).
- Spec-table rows reveal in sequence; hovering a row highlights with the accent.
- **Guardrails:** 60fps, transform/opacity only (no layout thrash), all motion gated behind `prefers-reduced-motion: reduce`, no animation blocks LCP.

---

## ACCEPTANCE CRITERIA (verify in browser before reporting done)
- Lighthouse: Performance ≥ 90, Accessibility ≥ 95, Best-Practices ≥ 95, SEO 100 (mobile).
- LCP < 2.5s, CLS < 0.05; all images via `next/image` with width/height; fonts preloaded.
- Fully responsive at 390 / 768 / 1024 / 1440; no horizontal scroll; tap targets ≥ 44px.
- WCAG AA contrast; full keyboard nav; visible focus states; semantic landmarks; meaningful alt text from the asset sheet.
- Zero console errors; no placeholder lorem; all content from the brief above.
- Take and attach screenshots of every page at the three breakpoints, plus a short browser recording of the home-page scroll + hero animation, as Artifacts.
- Self-audit against the "Banned patterns" list and confirm none are present.

Deliver the Implementation Plan first for review. Then build, verify, and summarise with screenshots and a list of any assumptions or follow-ups.
