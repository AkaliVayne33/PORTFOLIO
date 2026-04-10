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
- `main.js`: IntersectionObserver for `.animate-in` class + smooth scroll

## Progress
- [x] Step 1: CLAUDE.md + CONTEXT.md
- [x] Step 2: index.html + global.css + main.js (basic)
- [x] Step 3: sport.html + sport.css
- [x] Step 4: immobilier.html + immobilier.css
- [x] Step 5: pharmacie.html + pharmacie.css
- [x] Step 5b: restaurant.html + restaurant.css
- [x] Step 6: main.js polish (staggered animations, nav active state highlight)
- [x] Step 7: Final responsive pass + cross-browser testing

## How to resume in a new session
1. Open the PORTFOLIO folder in VS Code
2. Tell Claude: "Read CLAUDE.md and CONTEXT.md then resume the project"
3. Check the Progress section above for what's done and what's next
4. Claude should start at the first unchecked step without asking

## Important rules for Claude
- Update CLAUDE.md and/or CONTEXT.md immediately whenever a notable change is made
- All content (including these files) must be in English
- Never add French text to any file in this project
