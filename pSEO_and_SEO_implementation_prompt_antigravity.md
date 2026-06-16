# Antigravity prompt — SEO fixes, content & programmatic SEO (pSEO)

> Paste into the Agent Manager of the existing `jpcoweb` project. Place `content_ptfeWireSizes.ts` at `/content/ptfeWireSizes.ts` and the three `article_*.md` files at `/content/articles/`. Have the agent plan first, then implement and verify in the browser.

---

You are a senior Next.js + SEO engineer. Improve the existing Jain Polymer Co. site (Next.js App Router, on Vercel) in four workstreams. Plan first (Implementation Plan artifact), then implement, then verify each route renders and that metadata is unique per page; attach screenshots and a crawl summary.

## Workstream 1 — Fix technical SEO (do this first)
1. **Unique metadata per route.** Replace the global title/description with per-route `generateMetadata`. Use these (extend the pattern to every page):
   - `/` → title "PTFE & Teflon Wire Manufacturer in India | MoD-Approved | Jain Polymer Co."
   - `/products/ptfe-wires` → "PTFE Hook-Up Wire (MIL-W-16878E / JSS 51004) | AWG 30–8 | Jain Polymer"
   - `/products/cables` → "PTFE Coaxial, Triaxial & Multicore Cables (MIL-C-17) | Jain Polymer"
   - `/products/fep-wires` → "FEP Extruded High-Temperature Wire (−65 to +200 °C) | Jain Polymer"
   - `/products/ptfe-sleevings` → "PTFE Sleeving 0.3–30 mm (MIL-I-22129 / JSS 54802) | Jain Polymer"
   - `/products/ptfe-tapes` → "PTFE Cable-Wrap & JAIN FLON Thread-Seal Tape | Jain Polymer"
   - `/quality` → "Quality, Testing & MoD / C-DOT Approvals | JSS & MIL Conformance"
   - `/contact` → "Request a Quote — Custom PTFE Wire & Cable | Jain Polymer Co., Rohtak"
   Each gets a unique ~150-char description with its primary keyword. Remove the `meta keywords` tag.
2. **Canonicals + sitemap + robots.** Add self-referencing canonical URLs. Create `app/sitemap.ts` (dynamic — include all static pages + all programmatic pages from Workstream 4) and `app/robots.ts` allowing crawl and pointing to the sitemap. Use an env-driven `SITE_URL` so it works on the custom domain.
3. **Structured data (JSON-LD):** sitewide `Organization` + `LocalBusiness` (name, Rohtak address, phones, geo 28.89,76.60, sameAs); `Product` on each product page; `BreadcrumbList` on nested pages; `FAQPage` on articles and pSEO pages that have FAQs.
4. **Custom domain readiness:** read `SITE_URL` from env everywhere (metadataBase, canonicals, sitemap, JSON-LD) so switching to `https://www.jainpolymers.com` is a one-line change. Add a redirect from the apex to `www` (or vice-versa) and document it.
5. Rename the catalogue PDF to a URL-safe filename and update the link. Confirm the hero image uses `priority` + correct `sizes` and isn't served oversized on mobile.

## Workstream 2 — Publish the articles
Build a `/resources` (blog) section. Render the three markdown articles in `/content/articles/` at `/resources/[slug]`, with: an index page listing articles, breadcrumb, author/date, table of contents, `FAQPage` JSON-LD from each article's FAQ block, and contextual internal links to the product pages referenced in each article's frontmatter. Use the `meta_title`/`meta_description` from frontmatter for metadata. Style to match the existing technical-editorial design (mono labels, hairline rules) — do NOT introduce a generic blog template.

## Workstream 3 — Internal linking
- Add a "Related" block to each product page linking to the relevant articles and pSEO pages.
- Link articles → product/pSEO pages (already in frontmatter) and pSEO pages → articles + parent product page.
- Add the `/resources` link to the header/footer nav.

## Workstream 4 — Programmatic SEO (pSEO)
Use `/content/ptfeWireSizes.ts` to generate four families of **substantive, non-thin** pages. Each page must have genuinely unique content (real data + tailored copy) — NOT a duplicated template with one word swapped (Google demotes thin/doorway pSEO).

1. **Per-AWG wire pages** — `/ptfe-wire/[awg]` from `PTFE_WIRE_SIZES` (14 pages). Each includes: H1 "{AWG} AWG PTFE Hook-Up Wire", the size's real specs (strands, dia, area, O.D., resistance, current), available voltage classes, the size's `commonUses`, a short selection note, a mini current-rating context row vs the next size up/down, a CTA to `/contact`, and a `Product` + `FAQPage` JSON-LD. Title: "{AWG} AWG PTFE / Teflon Hook-Up Wire — Specs & Current Rating | Jain Polymer".
2. **Comparison pages** — `/compare/[slug]` from `COMPARISONS`. Each: a real comparison table + ~400 words of unique copy + CTA. (The PTFE-vs-PVC etc. articles can be the long-form hubs; these are focused spec comparisons that link to the hub.)
3. **Application pages** — `/applications/[slug]` from `APPLICATIONS`. Each: why PTFE/FEP suits that industry, recommended types/AWG/plating, relevant standards, linked products, CTA.
4. **Standard pages** — `/standards/[slug]` from `STANDARDS`. Each: what the standard covers, the MIL↔JSS mapping, key ratings, linked products, CTA.

Generate via `generateStaticParams`; add all routes to the dynamic sitemap; cross-link (AWG pages ↔ ptfe-wires product page ↔ selection article; comparison pages ↔ comparison article; application pages ↔ relevant products).

## Guardrails & acceptance criteria (verify in browser before reporting done)
- Every route returns a **unique** title + meta description (spot-check 6 routes incl. two pSEO pages).
- No thin/duplicate pages: each pSEO page has unique data + ≥150 words of tailored copy.
- Valid JSON-LD (test against Google's Rich Results structure); valid sitemap including pSEO routes; robots allows crawl.
- Lighthouse (mobile): Performance ≥ 90, SEO 100, Accessibility ≥ 95; LCP < 2.5s, CLS < 0.05.
- All internal links resolve (no 404s); `/resources` and pSEO routes reachable from nav/related blocks.
- Design consistent with the existing site; no generic templates introduced.
- Deliver: Implementation Plan, a route map of everything generated, screenshots of 1 article + 1 AWG page + 1 application page at mobile & desktop, and a list of anything needing the owner (e.g. custom-domain DNS, form backend keys).

## After launch (note for the owner — not code)
Connect `jainpolymers.com`, set it as production in Vercel, verify in Google Search Console + Bing Webmaster, submit the sitemap, create a Google Business Profile for the Rohtak HQ, and start earning a few quality backlinks (industry directories, trade bodies, supplier listings). Rankings build over the following weeks — track them in Search Console.
