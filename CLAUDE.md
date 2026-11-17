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
├── index.html           ← homepage, fully optimised (Performance 100 desktop)
├── manifest.json        ← PWA manifest
├── sw.js                ← Service Worker (HTML/CSS/JS network-first, images stale-while-revalidate)
├── offline.html         ← PWA offline fallback page
├── sport.html
├── real-estate.html
├── pharmacy.html
├── immobilier.html     ← redirect to real-estate.html (old URL, links already sent)
├── pharmacie.html      ← redirect to pharmacy.html (old URL, links already sent)
├── sitemap.xml
├── _config.yml          ← GitHub Pages: keeps CLAUDE.md, CONTEXT.md, email-generator.html unpublished
├── restaurant.html
├── beauty.html          ← 3 full mockups done
├── clinic.html          ← 3 full mockups done
├── tutoring.html        ← 3 full mockups done
├── interior.html        ← 3 full mockups done
├── audit.html           ← Free audit landing page (lead generation, mailto form)
├── assets/
│   ├── css/
│   │   ├── global.css       ← reset, CSS variables, typography, shared components
│   │   │                       NOTE: system font stacks only, no web fonts
│   │   │                       Critical above-the-fold CSS is inlined in index.html <style>
│   │   ├── sport.css
│   │   ├── immobilier.css
│   │   ├── pharmacie.css
│   │   ├── restaurant.css
│   │   ├── beauty.css       ← prefixes: .bw-luxe-* / .bw-premium-* / .bw-vibrant-*
│   │   ├── clinic.css       ← prefixes: .cl-luxe-* / .cl-premium-* / .cl-vibrant-*
│   │   ├── tutoring.css     ← prefixes: .tu-luxe-* / .tu-premium-* / .tu-vibrant-*
│   │   ├── interior.css     ← prefixes: .id-luxe-* / .id-premium-* / .id-vibrant-*
│   ├── js/
│   │   └── main.js          ← scroll animations, smooth scroll, active nav state, SW registration
│   └── img/
│       ├── icon.svg          ← site favicon/icon
│       ├── icon-192.png      ← PWA icon 192px
│       ├── icon-512.png      ← PWA icon 512px (required for splash screen)
│       ├── screenshot-wide.png / screenshot-narrow.png ← PWA install screenshots (regenerate after a redesign)
│       └── sectors/          ← local images for index.html sector grid
│           ├── sport.webp / sport.jpg
│           ├── realestate.webp / realestate.jpg
│           ├── pharmacy.webp / pharmacy.jpg
│           ├── restaurant.webp / restaurant.jpg
│           ├── beauty.webp / beauty.jpg
│           ├── clinic.webp / clinic.jpg
│           ├── tutoring.webp / tutoring.jpg
│           └── interior.webp / interior.jpg
```

## CSS conventions
- CSS variables in `:root` for colours and typography
- BEM naming: `.block__element--modifier`
- The existing stylesheets are desktop-first (base = desktop, `max-width: 768px` / `480px` queries). Keep that
  pattern inside them; never put layout in a `style=""` attribute (it beats the media queries)
- Small-phone fixes shared by every mockup are at the end of global.css (`body [class$="premium-hero"]`…)
- No `!important` except when justified

## HTML structure of each sector page
Each sector page (sport, real-estate, pharmacy, restaurant, beauty, clinic, tutoring, interior) contains:
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
- Title font: Georgia / serif system stack
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
- `.animate-in` only hides content under `.js` (class set by a one-line inline script right after `<meta charset>` in every page), and never with `prefers-reduced-motion: reduce` — keep both when adding a page
- Smooth scroll on anchor links (placeholder `href="#"` links in mockups do nothing)
- Service worker registered with the relative path `sw.js` (works at a domain root and under `/PORTFOLIO/`)
- No external dependencies

## Language
- **All visible content must be in English** — target market: Singapore
- Fake testimonial names: English-speaking (e.g. Sarah L., James T., Priya M., Aaron R.)
- No French text anywhere in the mockups or navigation

## Performance rules (index.html is the reference — do not regress)
- Critical CSS (nav + hero) must be inlined in `<style>` in `<head>`
- Full CSS loaded non-blocking: `<link media="print" onload="this.media='all'">`
- No web fonts (system stacks): nothing to load
- JS loaded with `defer`
- The largest first-screen element must not be hidden by `.animate-in` (no animate-in in heroes)
- A hero image that is visible on phones may be preloaded with `fetchpriority="high"`; one hidden on phones
  gets `media="(min-width: 769px)"` on its preload and a `<picture>` with a 1×1 source for phones
- Unsplash images get a `srcset` (w=640, 1000, original) + `sizes`
- Sector grid images: local WebP via `<picture>` with JPEG fallback, below the fold: no preload, no fetchpriority
- All `<img>` must have explicit `width` and `height` attributes
- Contrast ratio minimum 4.5:1 for all text (use #595959 minimum on white backgrounds)
- All pages need a `<main>` landmark

## General rules
- Clean, commented code (sections clearly separated by comments)
- Each section must be independently editable
- Sector page images: Unsplash URLs are fine for inner mockup pages (not the homepage)
- Testimonials: credible fake names, star rating, short quote
- Never use Bootstrap or any other CSS framework

## Accessibility and SEO conventions (sector pages)
- One page-level `<h1 class="sr-only">` ("<Sector> website redesign examples…"); `mockup-divider__title` = h2;
  inside each mockup, headings start at h3 (hero) → h4 (sections) → h5 (cards). CSS targets classes only.
- Each mockup's `<nav>` has `aria-label="Demo site menu (… mockup)"`; dead demo links `href="#"` get `tabindex="-1"`.
- Agency banner and sticky audit bar sit after `</main>` (complementary landmarks are top level).
- Star ratings: `role="img" aria-label="Rated N out of 5"`.
- Quotes use English quotation marks “ ”, never « ».
- Every page has canonical + Open Graph tags (og:image = assets/img/sectors/<sector>.jpg).
- Forms: `<form data-mailto="…" data-kind="contact|audit">`, handled by main.js (required fields checked,
  invalid ones marked `aria-invalid` and focused). No inline form scripts.
- audit.html shows no testimonials until real clients exist ("What you get" section instead).
