/* ============================================================
   MAIN.JS — Global animations & interactions
   ============================================================ */

// Tells the inline <head> script that this file did load (otherwise it un-hides the content after 3 s)
window.mainReady = true;

const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

/* ── 1. Scroll animations (IntersectionObserver + staggered cascade) ── */

const animateEls = document.querySelectorAll('.animate-in');

// Stagger index of each element among the .animate-in children of its parent,
// computed once at load (instead of re-querying the siblings on every intersection).
const staggerIndex = new Map();
const perParent = new Map();
animateEls.forEach((el) => {
  const parent = el.parentElement;
  const idx = perParent.get(parent) || 0;
  staggerIndex.set(el, idx);
  perParent.set(parent, idx + 1);
});

if (reduceMotion || !('IntersectionObserver' in window)) {
  // No animation: show everything right away
  animateEls.forEach((el) => el.classList.add('visible'));
} else {
  const scrollObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      scrollObserver.unobserve(el);
      setTimeout(() => el.classList.add('visible'), (staggerIndex.get(el) || 0) * 90);
    });
  }, {
    threshold: 0.12,
    rootMargin: '0px 0px -50px 0px'
  });

  animateEls.forEach((el) => scrollObserver.observe(el));
}


/* ── 2. Anchor links ──
   Real anchors are left to the browser: CSS handles the smooth scroll (html{scroll-behavior},
   off with reduced motion) and the sticky-nav offset ([id]{scroll-margin-top} in global.css),
   which also covers a page opened with #premium in the URL, and focus moves to the target.
   Only the placeholder links of the mockups ("#") are neutralised, so they don't jump to the top. */

document.querySelectorAll('a[href="#"]').forEach((anchor) => {
  anchor.addEventListener('click', (e) => e.preventDefault());
});


/* ── 3. Service Worker registration (PWA) ── */

if ('serviceWorker' in navigator && location.protocol !== 'file:') {
  window.addEventListener('load', () => {
    // Relative path: works at the domain root and under a sub-folder (e.g. GitHub Pages /PORTFOLIO/)
    navigator.serviceWorker.register('sw.js').catch(() => {});
  });
}


/* ── 4. Active nav state — highlight tag as section enters viewport ── */

(function initActiveNav() {
  // Only runs on sector pages that have the three anchor tags
  const sections = ['luxe', 'premium', 'vibrant']
    .map(id => document.getElementById(id))
    .filter(Boolean);

  if (!sections.length) return;

  const navLinks = document.querySelectorAll('.site-nav__links a');
  if (!navLinks.length) return;

  function setActive(id) {
    navLinks.forEach(link => {
      const isActive = link.getAttribute('href') === `#${id}`;
      link.classList.toggle('is-active', isActive);
      if (isActive) link.setAttribute('aria-current', 'true');
      else link.removeAttribute('aria-current');
    });
  }

  // Reads geometry lazily on scroll using getBoundingClientRect() —
  // avoids any forced reflow at page load (no offsetTop/offsetHeight reads on init).
  function getActiveSection() {
    const navEl = document.querySelector('.site-nav');
    const navHeight = navEl ? navEl.getBoundingClientRect().height : 64;
    const threshold = navHeight + window.innerHeight * 0.3;
    let activeId = sections[0].id;
    for (const s of sections) {
      if (s.getBoundingClientRect().top <= threshold) activeId = s.id;
    }
    return activeId;
  }

  // Initial state: the first section, or the one in the URL (page opened with #premium…)
  const fromHash = sections.find((s) => '#' + s.id === location.hash);
  setActive((fromHash || sections[0]).id);

  // Update on scroll (throttled with requestAnimationFrame)
  let ticking = false;
  window.addEventListener('scroll', () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(() => {
      setActive(getActiveSection());
      ticking = false;
    });
  }, { passive: true });
})();
