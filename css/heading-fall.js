/* Page hero heading (contact + services): words rise in on load, fall away when the page scrolls. */
(() => {
  const SELECTOR = '.rn-page-hero .rn-display';
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const root = document.documentElement;
  root.classList.add('hf-pending');
  const failsafe = setTimeout(() => root.classList.remove('hf-pending'), 9000);

  // Rotation (deg), sideways drift (vw) and delay (s) for each word as it falls.
  const FALL = [
    { r: -38, x: -6, d: 0.05 },
    { r: 24, x: 4, d: 0 },
    { r: -16, x: -3, d: 0.14 },
    { r: 34, x: 5, d: 0.09 },
    { r: -26, x: 2, d: 0.18 }
  ];

  function preloaderDone() {
    const pl = document.querySelector('.pl');
    return !pl || pl.classList.contains('is-exiting');
  }

  function split(h) {
    const text = h.textContent.trim().replace(/\s+/g, ' ');
    h.setAttribute('aria-label', text);
    h.textContent = '';
    text.split(' ').forEach((word, i, words) => {
      const f = FALL[i % FALL.length];
      const outer = document.createElement('span');
      outer.className = 'hf-word';
      outer.setAttribute('aria-hidden', 'true');
      outer.style.setProperty('--hf-r', f.r + 'deg');
      outer.style.setProperty('--hf-x', f.x + 'vw');
      outer.style.setProperty('--hf-fall-delay', f.d + 's');
      outer.style.setProperty('--hf-rise-delay', (0.1 + 0.08 * i).toFixed(2) + 's');
      const mask = document.createElement('span');
      mask.className = 'hf-mask';
      const inner = document.createElement('span');
      inner.className = 'hf-inner';
      inner.textContent = word;
      mask.append(inner);
      outer.append(mask);
      h.append(outer);
      if (i < words.length - 1) h.append(' ');
    });
  }

  function start() {
    const h = document.querySelector(SELECTOR);
    clearTimeout(failsafe);
    if (!h) { root.classList.remove('hf-pending'); return; }
    split(h);
    h.classList.add('hf-ready');
    root.classList.remove('hf-pending');
    requestAnimationFrame(() => requestAnimationFrame(() => h.classList.add('hf-show')));

    let fallen = false;
    const onScroll = () => {
      const y = window.scrollY;
      if (!fallen && y > 40) {
        fallen = true;
        h.classList.add('hf-fallen');
      } else if (fallen && y < 8) {
        // Back at the top: hide the words behind their masks, then rise in again.
        fallen = false;
        h.classList.remove('hf-show', 'hf-fallen');
        void h.offsetWidth;
        h.classList.add('hf-show');
      }
    };
    onScroll();
    addEventListener('scroll', onScroll, { passive: true });
  }

  // Wait for the page to finish loading (so React has hydrated) and the preloader to open.
  function wait() {
    const began = performance.now();
    (function poll() {
      if (preloaderDone() || performance.now() - began > 7500) start();
      else setTimeout(poll, 80);
    })();
  }

  if (document.readyState === 'complete') wait();
  else addEventListener('load', wait, { once: true });
})();

/* Services "What We Do" cards: staggered scroll reveal + cursor spotlight and gentle 3D tilt. */
(() => {
  const section = document.querySelector('.svc-wwd');
  if (!section || !('IntersectionObserver' in window)) return;
  const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;

  function setup() {
    const cards = [...section.querySelectorAll('.svc-card')];
    if (!cards.length) return;
    if (!reduced) {
      // Hide cards only once the observer is ready, so they can never get stuck hidden.
      document.documentElement.classList.add('wwd-js');
      const io = new IntersectionObserver((entries) => {
        // Stagger cards that enter together, top-left first.
        entries.filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top || a.boundingClientRect.left - b.boundingClientRect.left)
          .forEach((e, i) => {
            e.target.style.setProperty('--wwd-d', (i * 0.12).toFixed(2) + 's');
            e.target.classList.add('wwd-in');
            io.unobserve(e.target);
          });
      }, { threshold: 0.15, rootMargin: '0px 0px -8% 0px' });
      cards.forEach((c) => io.observe(c));
    }

    if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;
    cards.forEach((card) => {
      let raf = 0;
      card.addEventListener('pointermove', (e) => {
        cancelAnimationFrame(raf);
        raf = requestAnimationFrame(() => {
          const r = card.getBoundingClientRect();
          const x = (e.clientX - r.left) / r.width;
          const y = (e.clientY - r.top) / r.height;
          card.style.setProperty('--wwd-mx', (x * 100).toFixed(1) + '%');
          card.style.setProperty('--wwd-my', (y * 100).toFixed(1) + '%');
          if (!reduced) {
            card.style.setProperty('--wwd-ry', ((x - 0.5) * 6).toFixed(2) + 'deg');
            card.style.setProperty('--wwd-rx', ((0.5 - y) * 5).toFixed(2) + 'deg');
          }
        });
      });
      card.addEventListener('pointerleave', () => {
        cancelAnimationFrame(raf);
        card.style.setProperty('--wwd-rx', '0deg');
        card.style.setProperty('--wwd-ry', '0deg');
      });
    });
  }

  if (document.readyState === 'complete') setup();
  else addEventListener('load', setup, { once: true });
})();
