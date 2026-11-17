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
    // Cascade among the elements that appear together (not their rank in the whole list:
    // on a phone the 8th card of a one-column grid scrolls in alone and must not wait 630 ms)
    entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => (staggerIndex.get(a.target) || 0) - (staggerIndex.get(b.target) || 0))
      .forEach((entry, i) => {
        const el = entry.target;
        scrollObserver.unobserve(el);
        setTimeout(() => el.classList.add('visible'), i * 90);
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

  // The nav element is looked up once; its height is read on scroll (it changes on phones,
  // where the nav wraps onto two rows) — no geometry read at page load.
  const navEl = document.querySelector('.site-nav');
  function getActiveSection() {
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


/* ── 5. Contact forms (home page and audit page): open the visitor's email app ──
   <form data-mailto="address" data-kind="contact|audit"> ; every [required] field is checked first.
   mailto opens the visitor's email app; if none is set up nothing happens, so the address is shown too. */

document.querySelectorAll('form[data-mailto]').forEach((form) => {
  const to = form.dataset.mailto;
  // The script checks the fields itself (clear messages); without JS the browser checks them and the
  // form falls back to a plain mailto post (action attribute).
  form.noValidate = true;
  const status = form.querySelector('[role="status"]');
  const required = Array.from(form.querySelectorAll('[required]'));
  const value = (id) => (form.querySelector('#' + id)?.value || '').trim();
  const filled = (field) => field.value.trim() !== '' && field.checkValidity();

  function mark(field, invalid) {
    if (invalid) {
      field.setAttribute('aria-invalid', 'true');
      if (status && status.id) field.setAttribute('aria-describedby', status.id);
    } else {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
    }
  }

  function say(html) {
    if (!status) return;
    status.innerHTML = '';
    // set a moment later: an identical message is announced again by screen readers
    setTimeout(() => { status.innerHTML = html; }, 50);
  }

  required.forEach((field) => field.addEventListener('input', () => {
    if (filled(field)) mark(field, false);
  }));

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const invalid = required.filter((field) => !filled(field));
    required.forEach((field) => mark(field, invalid.includes(field)));
    if (invalid.length) {
      const label = (field) => (form.querySelector(`label[for="${field.id}"]`)?.textContent || field.name)
        .replace(/\*|\(optional\)/g, '').replace(/\?\s*$/, '').trim();
      const empty = invalid.filter((field) => field.value.trim() === '').map(label);
      const wrong = invalid.filter((field) => field.value.trim() !== '').map(label);
      say([empty.length ? 'Please fill in: ' + empty.join(', ') + '.' : '',
           wrong.length ? 'Please check the format of: ' + wrong.join(', ') + ' (e.g. name@company.com).' : ''].join(' ').trim());
      setTimeout(() => invalid[0].focus(), 100);
      return;
    }

    let subject, body;
    if (form.dataset.kind === 'audit') {
      const industry = value('af-industry');
      subject = 'Free Audit Request — ' + industry + ' — ' + value('af-name');
      body = 'FREE AUDIT REQUEST\n══════════════════\n\n'
        + 'Name:     ' + value('af-name') + '\n'
        + 'Email:    ' + value('af-email') + '\n'
        + 'Website:  ' + value('af-url') + '\n'
        + 'Industry: ' + industry + '\n'
        + (value('af-notes') ? '\nNotes:\n' + value('af-notes') : '');
    } else {
      subject = 'StudioWeb — Free audit request from ' + value('contact-name');
      body = 'Name: ' + value('contact-name') + '\n'
        + 'Email: ' + value('contact-email') + '\n'
        + (value('contact-business') ? 'Business: ' + value('contact-business') + '\n' : '')
        + '\n' + value('contact-message');
    }
    let url = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body);
    // Some mail apps refuse mailto links longer than about 2,000 characters
    if (url.length > 2000) {
      url = 'mailto:' + to + '?subject=' + encodeURIComponent(subject) + '&body=' + encodeURIComponent(body.slice(0, 600) + '\n\n[…message shortened, please paste the rest here]');
      say('Your message is long: your email app opens with the beginning of it, please paste the rest. Or write to us directly at <a href="mailto:' + to + '">' + to + '</a>.');
    } else {
      say('Your email app should open now. If it doesn\u2019t, write to us directly at <a href="mailto:' + to + '">' + to + '</a>.');
    }
    window.location.href = url;
  });
});
