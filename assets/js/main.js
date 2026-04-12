/* ============================================================
   MAIN.JS — Global animations & interactions
   ============================================================ */

/* ── 1. Scroll animations (IntersectionObserver + staggered cascade) ── */

const animateEls = document.querySelectorAll('.animate-in');

const scrollObserver = new IntersectionObserver((entries) => {
  // Batch all DOM reads first, then schedule writes — avoids forced reflow
  const toAnimate = [];

  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Read: find stagger index (pure read, no write yet)
    const siblings = Array.from(
      (entry.target.parentElement || document).querySelectorAll('.animate-in')
    );
    const idx = siblings.indexOf(entry.target);
    toAnimate.push({ el: entry.target, idx });
    scrollObserver.unobserve(entry.target);
  });

  // Write: schedule classList changes after all reads are done
  toAnimate.forEach(({ el, idx }) => {
    setTimeout(() => el.classList.add('visible'), idx * 90);
  });
}, {
  threshold: 0.12,
  rootMargin: '0px 0px -50px 0px'
});

animateEls.forEach(el => scrollObserver.observe(el));


/* ── 2. Smooth scroll on anchor links ── */

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', (e) => {
    const href = anchor.getAttribute('href');
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      // Offset for the sticky nav height (64 px)
      const navHeight = document.querySelector('.site-nav')?.offsetHeight || 64;
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});


/* ── 3. Service Worker registration (PWA) ── */

if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    const swPath = location.pathname.startsWith('/PORTFOLIO') ? '/PORTFOLIO/sw.js' : '/sw.js';
    navigator.serviceWorker.register(swPath).catch(() => {});
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

  setActive(getActiveSection());

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
