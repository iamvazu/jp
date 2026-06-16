# Jain Polymer Co. — Site Check, Keyword Map & SEO Strategy
*Live site reviewed: https://jpcoweb.vercel.app/ (home, /products, /products/ptfe-wires, /contact). This is a best-practice review of fetched HTML + a keyword/competitor analysis. It is **not** a live rank report — see "The ranking reality" below.*

---

## 1. What the build got right
- Strong, on-brief technical-editorial design; real content (specs, AWG table, voltage classes, MoD/C-DOT approvals, Teflon-vs-PVC story, applications).
- Genuinely useful product pages: full 14-row spec table, voltage-class filter, RFQ configurator with colours and coil options.
- Good keyword-relevant copy already on product/quality pages (MIL-W-16878E, JSS 51004/54802/51100, MIL-C-17, MIL-I-22129).
- Clean URL structure (`/products/ptfe-wires`, `/products/cables`, etc.).

## 2. Issues to fix — prioritised

### 🔴 Critical
1. **Every page shares the same `<title>` and meta description.** Home, /products, /products/ptfe-wires and /contact all return:
   - title: *"Jain Polymer Co. | High-Performance PTFE & FEP Cables"*
   - description: the same MoD/C-DOT sentence.
   This is the single biggest on-page problem — duplicate titles/descriptions cripple how each page ranks. **Fix:** unique, keyword-targeted title + meta description per page (templates in §5).
2. **Hosted on a `vercel.app` subdomain.** `*.vercel.app` is shared, has no domain authority, and Google often treats it as staging — you will struggle to rank on it no matter how good the content is. **Fix (highest ROI of anything here):** connect the real domain (`jainpolymers.com`), set it as the canonical/production domain in Vercel, and 301 everything. Do this *before* chasing keywords.

### 🟠 Important
3. **No content / resources / blog section.** All current pages are transactional/product. There is zero informational content, so the site captures none of the high-volume "what is / vs / how to select" searches competitors win. (This is exactly what the articles + pSEO below fix.)
4. **Verify `sitemap.xml`, `robots.txt`, and canonical tags exist** (I couldn't confirm them from here). Generate a dynamic sitemap, ensure `robots.txt` allows crawling + points to the sitemap, and add self-referencing canonicals.
5. **Add structured data (JSON-LD):** `Organization` + `LocalBusiness` (Rohtak HQ, phone, geo) sitewide; `Product` on each product page; `BreadcrumbList`; `FAQPage` on articles. This drives rich results.
6. **Set up measurement:** Google Search Console + Bing Webmaster Tools + analytics (GA4 or Plausible). Submit the sitemap. Without GSC you're flying blind on rankings — and it's the only legitimate source for "what do we rank for."

### 🟡 Minor / polish
7. **Drop the `meta keywords` tag** — search engines ignore it and it just hands competitors your target list.
8. **Capabilities PDF link contains spaces** (`WIRE & SLEEVE CATALOGUE.pdf`) — rename to a hyphenated, URL-safe filename.
9. **RFQ form:** confirm it actually submits server-side (with spam protection) and routes to a real inbox + a thank-you page that fires a conversion event.
10. **Run Lighthouse** (Antigravity's browser can do this). Confirm LCP < 2.5s and CLS < 0.05; the hero image is requested at `w=3840` — make sure it's sized/`priority`-loaded correctly and not oversized on mobile.

---

## 3. The ranking reality (read this before the keyword map)
"Do we rank for all the competitors' keywords?" — Honestly, **no, not yet**, and any tool would tell you the same for three structural reasons:
1. **The site is brand-new and on a vercel.app subdomain.** It has no domain age, no backlinks, and likely isn't fully indexed yet. New sites take weeks-to-months to rank for anything competitive.
2. **Ranking ≠ on-page keywords.** You can have every keyword on the page and still not rank without (a) indexing, (b) topical depth/content, and (c) authority (links + trust). Right now you have good on-page coverage but no content depth and no authority.
3. **I can't read your live positions** — that requires Search Console / Ahrefs / SEMrush. Set up GSC first; in ~2–4 weeks it will show real impressions and positions.

What you *can* control immediately, and what this package delivers: fix the technical issues, move to the real domain, and build the content depth (articles + pSEO) that earns rankings over the following weeks.

---

## 4. Competitor keyword universe (built from competitor pages & SERP research)
Grouped by search intent. These are the themes the leading PTFE/wire players (Indian: Meerut PTFE, Parag, PTFE Electronics; global: Allied Wire & Cable, Phoenix Wire, ZW/Central, Hongsen, Sycor) target.

**A. Transactional / product (buyer intent — your bread and butter)**
PTFE wire, Teflon wire, PTFE insulated wire, PTFE hook-up wire, PTFE coated wire, silver plated copper PTFE wire, nickel plated copper wire, FEP wire / FEP insulated wire, PTFE cable, high temperature wire / cable, PTFE coaxial cable, RF coaxial cable, PTFE multicore cable, PTFE ribbon cable, thermocouple compensating cable, RTD cable, PTFE sleeve / sleeving / Teflon sleeve, PTFE tape, thread seal tape, + **"…manufacturer / supplier / exporter / in India / price"** variants of each.

**B. Comparison (high-volume informational — you have NONE of these)**
PTFE vs PVC wire, Teflon vs PVC insulated wire, PTFE vs FEP wire, FEP vs PVC, PTFE vs silicone wire, PTFE vs PFA, solid vs stranded hook-up wire, extruded vs tape-wrapped PTFE.

**C. Spec / standard (authority + you legitimately own these)**
MIL-W-16878 / MIL-W-16878E, MIL-W-16878 Type E / Type EE / Type ET, JSS 51004, JSS 54802, JSS 51100, MIL-C-17, MIL-I-22129, NEMA HP3, M16878 color code, AWG wire size chart, PTFE wire temperature rating, dielectric strength of PTFE.

**D. Selection / "how to" (buyer-research intent)**
how to select hook-up wire, 20 vs 18 vs 16 AWG wire, what is the ampacity of wire, which insulation for high temperature, PTFE wire wall thickness, how to choose sleeving size.

**E. Application (industry capture)**
aerospace wire, defense / military wire, medical device wire, satellite / avionics wire, furnace / oven wiring, atomic energy / reactor cable, high temperature motor lead wire, chemical processing wire.

**F. Local / brand**
PTFE wire manufacturer Rohtak / Haryana / India, Teflon wire manufacturer near me, Jain Polymer / Jain Flon.

## 5. Gap analysis & title/meta templates
| Cluster | Current coverage | Action |
|---|---|---|
| A. Product/transactional | Decent (product pages) | Fix unique titles; add per-AWG pSEO pages |
| B. Comparison | **None** | Articles 1 (+ pSEO compare pages) |
| C. Spec/standard | Mentioned, not targeted | Article 2 + `/standards/*` pSEO pages |
| D. Selection/how-to | None | Article 3 |
| E. Application | Listed only | `/applications/*` pSEO pages |
| F. Local/brand | Partial | Add LocalBusiness schema + Google Business Profile |

**Unique title/meta templates (fixes Critical #1):**
- Home → `PTFE & Teflon Wire Manufacturer in India | MoD-Approved | Jain Polymer Co.`
- /products/ptfe-wires → `PTFE Hook-Up Wire (MIL-W-16878E / JSS 51004) | AWG 30–8 | Jain Polymer`
- /products/cables → `PTFE Coaxial, Triaxial & Multicore Cables (MIL-C-17) | Jain Polymer`
- /products/fep-wires → `FEP Extruded High-Temperature Wire (-65 to +200 °C) | Jain Polymer`
- /products/ptfe-sleevings → `PTFE Sleeving 0.3–30 mm (MIL-I-22129 / JSS 54802) | Jain Polymer`
- /products/ptfe-tapes → `PTFE Cable-Wrap & JAIN FLON Thread-Seal Tape | Jain Polymer`
- /quality → `Quality, Testing & MoD / C-DOT Approvals | JSS & MIL Conformance`
- /contact → `Request a Quote — Custom PTFE Wire & Cable | Jain Polymer Co., Rohtak`
Each meta description: one specific sentence with the primary keyword + a differentiator (MoD-approved, since 1991, custom to MIL/JSS), ~150 chars, unique.

## 6. Content backlog (publish in this order)
1. PTFE vs PVC vs FEP vs Silicone — comparison hub *(written — file provided)*
2. MIL-W-16878 & JSS 51004 explained: Types ET/E/EE *(written — file provided)*
3. How to select PTFE hook-up wire: AWG, plating, voltage, temperature *(written — file provided)*
4. FEP vs PTFE wire: which to choose
5. Solid vs stranded hook-up wire
6. PTFE coaxial cable types (RG-178/316/etc.) explained
7. PTFE sleeving size & wall-thickness selection guide
8. Why aerospace & defence specify PTFE wire
9. Hook-up wire ampacity & AWG current-rating chart
10. PTFE wire colour codes & striping (NEMA HP3)

Cadence: 2–4 long, genuinely useful articles/month. Each links to relevant product + pSEO pages and earns links over time.

> **One honest note on "keyword-dense" articles:** modern Google ranks *comprehensive, helpful* content, and actively demotes keyword-stuffed pages (Helpful Content / spam systems). The articles provided are written to cover each topic's keywords *naturally and thoroughly* (semantic depth, entities, FAQs) — that's what actually ranks. Stuffing the same phrase repeatedly would hurt you, so I deliberately didn't.
