/* Contact hero heading: words rise in on load, fall away when the page scrolls. */
(() => {
  const SELECTOR = '.ct-hero .rn-display';
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
