# CONTEXT.md — Full Project Brief

## Business objective
Static web agency portfolio for client outreach in Singapore.
The site showcases web redesign examples by industry sector.
Each sector has 3 positioning styles to show the agency's range.
The prospect must be able to imagine it is THEIR own website.

## Target market
**Singapore** — all visible content is in **English only**.
Fake names in testimonials must be English-speaking (Sarah L., James T., Priya M., etc.)

## Site pages
| Route | File | Status |
|-------|------|--------|
| / (home) | index.html | ✅ Done |
| /sport | sport.html | ✅ Done |
| /immobilier | immobilier.html | ✅ Done |
| /pharmacie | pharmacie.html | ✅ Done |
| /restaurant | restaurant.html | ✅ Done |
| /beauty | beauty.html | ✅ Done |
| /clinic | clinic.html | ✅ Done |
| /tutoring | tutoring.html | ✅ Done |
| /interior | interior.html | ✅ Done |

## Sector page structure
Each sector page (sport, immobilier, pharmacie, restaurant) contains:

```
sector-page.html
  └── global sticky nav (back to home + anchor links to 3 sections)
  └── #luxe     → Luxury & Minimalist mockup
  └── #premium  → Premium & Corporate mockup
  └── #vibrant  → Vibrant & Creative mockup
```

Each mockup contains:
1. Hero — strong headline + subtitle + CTA button
2. Services — 3 cards with icon/emoji, title, description
3. Testimonials — 2–3 fake client reviews (name, stars, quote)
4. Call-to-action — final conversion section
5. Footer — fake brand name, links, copyright

## The 3 positioning styles

### 1. Luxury & Minimalist (`#luxe`)
- Palette: off-white `#FAFAFA`, black `#0A0A0A`, gold `#C9A84C`
- Title font: `Playfair Display` (serif, Google Fonts)
- Body font: `Inter` thin (weight 300)
- Generous whitespace, full-screen images
- Animations: slow fade, subtle transitions (0.6s ease)
- Hover on service cards: background flips to dark

### 2. Premium & Corporate (`#premium`)
- Palette varies per sector but always: dark professional bg, white text, one accent colour
- Title font: `DM Sans` bold 700/800
- Body font: `Inter` 400
- Clean grid layouts, cards with shadow
- Animations: clean slide-in, 0.4s ease-out
- Stats bar in hero (3 key numbers)

### 3. Vibrant & Creative (`#vibrant`)
- Palette: bold gradients, dark background `#0F0F0F` or `#111`
- Title font: `Space Grotesk` weight 800, very large
- Body font: `Space Grotesk` 400
- Asymmetric layout, radial blob decorations
- Hover micro-interactions on cards
- Floating badge on hero image (social proof number)

## Fake brand names per sector

### Sport
- Luxury: "ÉLITE PERFORMANCE" — private club, Orchard Road
- Premium: "SportPro Club" — franchise gym
- Vibrant: "FLUX TRAINING" — CrossFit/app startup

### Real Estate (immobilier.html)
- Luxury: "Maison Blanche" — prestige real estate
- Premium: "ImmPro Advisory" — data-driven agency
- Vibrant: "NEOHABITAT" — PropTech / AI search

### Pharmacy (pharmacie.html)
- Luxury: "The Park Dispensary" — wellness pharmacy
- Premium: "PharmaCare+" — convenient community pharmacy
- Vibrant: "MEDIFAST" — HealthTech app

### Restaurant (restaurant.html)
- Luxury: "Le Cèdre Blanc" — Mediterranean fine dining
- Premium: "Brasserie Centrale" — trusted neighbourhood brasserie
- Vibrant: "STREET & CO" — bold street food brand

### Beauty & Wellness (beauty.html)
- Luxury: "SERENOVA" — upscale day spa, Orchard Road
- Premium: "GLOWPRO STUDIOS" — multi-location hair & beauty chain
- Vibrant: "BLOSSOM STUDIO" — trendy nail art bar

### Clinic & Dental (clinic.html)
- Luxury: "THE PARAGON CLINIC" — aesthetic medicine, Orchard Road
- Premium: "SMILECARE DENTAL" — multi-branch dental chain
- Vibrant: "MEDIPOINT" — tech-forward GP / telehealth

### Tutoring & Enrichment (tutoring.html)
- Luxury: "ATHENA ACADEMY" — elite IB/A-level tutoring, Buona Vista
- Premium: "SMARTPATH EDUCATION" — MOE-aligned, multi-subject
- Vibrant: "SPARK LABS" — coding, robotics & STEM for kids

### Interior Design & Renovation (interior.html)
- Luxury: "MAISON ATELIER" — bespoke luxury interior design
- Premium: "LIVSPACE PRO" — full-service HDB/condo renovation
- Vibrant: "FORM & FLUX" — bold editorial interior design studio

## Global navigation
- `index.html`: home with 4 sector cards → links to sport.html, immobilier.html, pharmacie.html, restaurant.html
- Each sector page: sticky nav with `#luxe`, `#premium`, `#vibrant` anchor links + back to home
- Direct deep links work: `sport.html#luxe`, `immobilier.html#premium`, etc.

## Assets
- Images: Unsplash URLs (licence-free, sector-appropriate)
- Icons: Unicode emojis or inline SVG (no external lib)
- Fonts: Google Fonts — Playfair Display, Inter, Space Grotesk, DM Sans

## CSS architecture
- `global.css`: reset, CSS variables, site-nav, home page styles, animate-in class
- `sport.css`: `.luxe-*`, `.premium-*`, `.vibrant-*` prefixes
- `immobilier.css`: `.re-luxe-*`, `.re-premium-*`, `.re-vibrant-*` prefixes
- `pharmacie.css`: `.ph-luxe-*`, `.ph-premium-*`, `.ph-vibrant-*` prefixes
- `restaurant.css`: `.rs-luxe-*`, `.rs-premium-*`, `.rs-vibrant-*` prefixes
- `beauty.css`: `.bw-luxe-*`, `.bw-premium-*`, `.bw-vibrant-*` prefixes
- `clinic.css`: `.cl-luxe-*`, `.cl-premium-*`, `.cl-vibrant-*` prefixes
- `tutoring.css`: `.tu-luxe-*`, `.tu-premium-*`, `.tu-vibrant-*` prefixes
- `interior.css`: `.id-luxe-*`, `.id-premium-*`, `.id-vibrant-*` prefixes
- `main.js`: IntersectionObserver for `.animate-in` class + smooth scroll + active nav state

## Progress
- [x] Step 1: CLAUDE.md + CONTEXT.md
- [x] Step 2: index.html + global.css + main.js (basic)
- [x] Step 3: sport.html + sport.css
- [x] Step 4: immobilier.html + immobilier.css
- [x] Step 5: pharmacie.html + pharmacie.css
- [x] Step 5b: restaurant.html + restaurant.css
- [x] Step 6: main.js polish (staggered animations, nav active state highlight)
- [x] Step 7: Final responsive pass + cross-browser testing
- [x] Step 8: index.html updated with 4 new sector cards (beauty, clinic, tutoring, interior)
- [x] Step 9: beauty.html + beauty.css — 3 full mockups (SERENOVA / GLOWPRO STUDIOS / BLOSSOM STUDIO)
- [x] Step 10: clinic.html + clinic.css — 3 full mockups (THE PARAGON CLINIC / SMILECARE DENTAL / MEDIPOINT)
- [x] Step 11: tutoring.html + tutoring.css — 3 full mockups (ATHENA ACADEMY / SMARTPATH EDUCATION / SPARK LABS)
- [x] Step 12: interior.html + interior.css — 3 full mockups (MAISON ATELIER / LIVSPACE PRO / FORM & FLUX)
- [x] Step 13: PWA setup — manifest.json + sw.js + service worker registration in main.js
- [x] Step 14: Performance pass — preconnect hints, fetchpriority on LCP image, width/height on all images, inline styles moved to CSS classes, ARIA labels added
- [x] Step 15: Critical CSS inlined in index.html (nav + hero above-the-fold), global.css loaded non-blocking via media="print" trick, main.js deferred
- [x] Step 16: Google Fonts non-blocking (media="print" onload), @import removed from global.css
- [x] Step 17: All 8 sector grid images downloaded locally as WebP (q=40) + JPEG fallback, served from assets/img/sectors/, <picture> elements with WebP+JPEG, LCP preload updated to local path
- [x] Step 18: Accessibility fixes — contrast colors updated (#999→#595959, #C9A84C→#8B6914 on em), <main> landmark added, site-nav__tagline class, aria-hidden on decorative elements
- [x] Step 19: PWA icons — icon-192.png and icon-512.png generated (Python), manifest updated with PNG icons for splash screen
- [x] Step 20: SW paths made dynamic via self.registration.scope — works on both GitHub Pages (/PORTFOLIO/) and any root deployment (/)
- [x] Step 21: Performance pass on all 8 sector pages — PWA meta tags, non-blocking CSS (media="print"), critical CSS inlined per page (nav + luxe hero with exact structure), <main> landmark, JS defer, LCP fetchpriority + dimensions, lazy loading on secondary images
- [x] Step 22: CLS fixes — mockup-divider and luxe-nav styles added to inline critical CSS (were unstyled at first paint, causing 0.19 CLS shift), font-display changed to optional, Google Fonts removed and replaced with system font stacks
- [x] Step 23: Contrast fixes — gold on dark bg restored to #C9A84C (8:1), gold on light bg #8B6914 (5:1), footer links rgba opacity raised to 0.65+, #E8A020→#8B5E00, mockup-divider text #777/#999→#696969
- [x] Step 24: Forced reflow fix in main.js — offsetHeight/offsetTop reads moved into requestAnimationFrame batch (was causing 36ms forced layout on every page load)
- [x] Step 25: Contrast fixes (accessibility) — tag--luxe hover/active: #fff→#1A1209 on gold #C9A84C (ratio 2.5→10:1); re-premium-footer__logo span: #8B5E00→#E8AA30 on #07192D (ratio was near-fail→7:1)
- [x] Step 26: beauty.css contrast fixes — bw-luxe-footer__logo: #8B6914→#C9A84C on #0A0A0A; all #E879A0 text uses replaced with #B5006A on light/white backgrounds (services/testimonials/footer tags, stars, nav logo span, btn background); hero title span on dark bg uses #F9A8CC; bw-premium-cta background #E879A0→#B5006A
- [x] Step 27: interior.css contrast fixes — id-luxe-footer__logo: #8B6914→#C9A84C on #0A0A0A; all #8B6914 luxe text →#7A5500 on light bg (#FAFAFA/#FAF8F5, ratio ≈5:1); #2ECC71 on light bg (nav logo span, services/temo tags, stars, btn bg) →#1A7A40 (ratio ≈5-7:1); #2ECC71 on dark bg (hero badge/title span, CTA title span, footer logo span) →#4ADE80 (ratio ≈6:1)

## Known remaining issues (as of session end)
- CLS on immobilier re-luxe-hero still showing ~0.19–0.22 in Lighthouse despite fixes — root cause unclear after multiple attempts. Suspect: either GitHub Pages cache lag, or a remaining element above the hero not covered by inline CSS. Next session should do a fresh Lighthouse audit after hard-refresh to confirm if fixes landed.
- Run Lighthouse accessibility audit on other sector pages (sport, pharmacie, restaurant, beauty, clinic, tutoring, interior) to check if similar contrast issues exist on their tag--luxe active state or premium footer spans.

## How to resume in a new session
1. Open the PORTFOLIO folder in VS Code
2. Tell Claude: "Read CLAUDE.md and CONTEXT.md then resume the project"
3. Check the Progress section above for what's done and what's next
4. Claude should start at the first unchecked step without asking

## Important rules for Claude
- Update CLAUDE.md and/or CONTEXT.md immediately whenever a notable change is made
- All content (including these files) must be in English
- Never add French text to any file in this project
