# CLAUDE.md — Instructions for Claude Code

## Project context
Static web agency portfolio for client outreach.
Goal: showcase web redesign examples by industry sector,
with 3 positioning styles per sector.

## Keeping context files up to date
**Important rule:** Any time a notable change is made to the project
(new sector, new page, new convention, change of target market, etc.),
update CLAUDE.md and/or CONTEXT.md immediately — whichever file is relevant.
This ensures future sessions can resume without losing context.

## Tech stack
- HTML5 / CSS3 / vanilla JavaScript ONLY
- No JS framework (no React, Vue, etc.)
- No build tools (no Webpack, Vite, etc.)
- No backend
- Pure static files, opened directly in the browser (or via a simple HTTP server)

## File structure
```
PORTFOLIO/
├── CLAUDE.md
├── CONTEXT.md
├── index.html
├── sport.html
├── immobilier.html
├── pharmacie.html
├── restaurant.html
├── beauty.html          ← skeleton ready, mockups to build
├── clinic.html          ← skeleton ready, mockups to build
├── tutoring.html        ← skeleton ready, mockups to build
├── interior.html        ← skeleton ready, mockups to build
├── assets/
│   ├── css/
│   │   ├── global.css       ← reset, CSS variables, typography, shared components
│   │   ├── sport.css
│   │   ├── immobilier.css
│   │   ├── pharmacie.css
│   │   ├── restaurant.css
│   │   ├── beauty.css       ← prefixes: .bw-luxe-* / .bw-premium-* / .bw-vibrant-*
│   │   ├── clinic.css       ← prefixes: .cl-luxe-* / .cl-premium-* / .cl-vibrant-*
│   │   ├── tutoring.css     ← prefixes: .tu-luxe-* / .tu-premium-* / .tu-vibrant-*
│   │   └── interior.css     ← prefixes: .id-luxe-* / .id-premium-* / .id-vibrant-*
│   ├── js/
│   │   └── main.js          ← scroll animations, smooth scroll, active nav state
│   └── img/                 ← images via Unsplash URLs or inline SVG
```

## CSS conventions
- CSS variables in `:root` for colours and typography
- BEM naming: `.block__element--modifier`
- Mobile-first: base styles = mobile, media queries for desktop (`min-width: 768px`, `min-width: 1200px`)
- No `!important` except when justified

## HTML structure of each sector page
Each page (sport.html, immobilier.html, pharmacie.html, restaurant.html) contains:
1. Global nav (back to index + anchors to the 3 sections)
2. Section `id="luxe"` — Luxury & Minimalist positioning
3. Section `id="premium"` — Premium & Corporate positioning
4. Section `id="vibrant"` — Vibrant & Creative positioning

Each section contains a full mockup:
- Hero (headline + subtitle + CTA)
- Services (3 cards)
- Testimonials (2–3 fake)
- Final call-to-action
- Simplified footer

## Design per positioning

### Luxury & Minimalist
- Palette: off-white (#FAFAFA), black (#0A0A0A), gold (#C9A84C)
- Title font: `Playfair Display` (Google Fonts, serif)
- Body font: `Inter` thin (weight 300)
- Generous spacing, lots of whitespace
- Large full-screen images
- Animations: very subtle, slow fade

### Premium & Corporate
- Palette: navy (#0D1B3E), charcoal (#2C2C2C), white (#FFFFFF), emerald green accent (#2ECC71)
- Title font: `Inter` bold or `DM Sans`
- Body font: `Inter` regular
- Structured layout, clean grids
- Animations: clean, professional

### Vibrant & Creative
- Palette: bold gradients (e.g. purple → pink → orange), dark or off-white background
- Title font: `Space Grotesk` or `Syne` (heavy, weight 800)
- Asymmetric layout
- Hover micro-interactions
- Animations: dynamic, CSS keyframes

## JavaScript (main.js)
- IntersectionObserver to animate elements on scroll (class `animate-in`)
- Smooth scroll on anchor links
- No external dependencies

## Language
- **All visible content must be in English** — target market: Singapore
- Fake testimonial names: English-speaking (e.g. Sarah L., James T., Priya M., Aaron R.)
- No French text anywhere in the mockups or navigation

## General rules
- Clean, commented code (sections clearly separated by comments)
- Each section must be independently editable
- Unsplash image URLs must point to licence-free images relevant to the sector
- Testimonials: credible fake names, star rating, short quote
- Never use Bootstrap or any other CSS framework
