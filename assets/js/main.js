/* ============================================================
   MAIN.JS — Global animations & interactions
   ============================================================ */

/* ── 1. Scroll animations (IntersectionObserver + staggered cascade) ── */

const animateEls = document.querySelectorAll('.animate-in');

const scrollObserver = new IntersectionObserver((entries) => {
  // Group entries by their closest parent section so siblings
  // inside the same block stagger relative to each other.
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;

    // Find the element's stagger index among visible siblings
    const siblings = Array.from(
      (entry.target.parentElement || document).querySelectorAll('.animate-in')
    );
    const idx = siblings.indexOf(entry.target);

    setTimeout(() => {
      entry.target.classList.add('visible');
    }, idx * 90); // 90 ms between each sibling

    scrollObserver.unobserve(entry.target);
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

  // Set initial active on load based on scroll position
  function getActiveSection() {
    const navHeight = document.querySelector('.site-nav')?.offsetHeight || 64;
    const scrollMid = window.scrollY + navHeight + window.innerHeight * 0.3;

    let active = sections[0];
    for (const section of sections) {
      if (section.offsetTop <= scrollMid) active = section;
    }
    return active.id;
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
