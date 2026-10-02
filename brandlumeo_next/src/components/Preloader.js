'use client';

import { useEffect, useRef, useState } from 'react';

// First-load splash: BRANDLUMEO rises letter by letter out of a mask while a 000-100 counter
// and a hairline track the page load; at 100 the screen splits into two curtains that slide
// apart to reveal the site. The layout persists across client navigations, so it only runs once.
const WORD = [...'BRAND'].map((c) => [c, false]).concat([...'LUMEO'].map((c) => [c, true]));
const MIN_VISIBLE_MS = 1400; // long enough for the letters to finish rising
const MAX_VISIBLE_MS = 6000; // never hold the page longer than this
const EXIT_MS = 1100;

export default function Preloader() {
  const [state, setState] = useState('loading'); // loading -> exiting -> gone
  const counterRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const start = performance.now();
    let loaded = document.readyState === 'complete';
    let progress = 0;
    let frame;
    let exitTimer;

    const onLoad = () => { loaded = true; };
    window.addEventListener('load', onLoad, { once: true });

    // Ease towards 90 while the page loads, then run up to 100 once it has (or time is up).
    const tick = () => {
      const elapsed = performance.now() - start;
      const done = (loaded && elapsed >= MIN_VISIBLE_MS) || elapsed >= MAX_VISIBLE_MS;
      progress += ((done ? 100 : 90) - progress) * (done ? 0.12 : 0.025);
      if (done && progress > 99.5) progress = 100;

      const value = Math.floor(progress);
      if (counterRef.current) counterRef.current.textContent = String(value).padStart(3, '0');
      if (lineRef.current) lineRef.current.style.transform = `scaleX(${progress / 100})`;

      if (progress === 100) {
        setState('exiting');
        exitTimer = setTimeout(() => setState('gone'), EXIT_MS);
      } else {
        frame = requestAnimationFrame(tick);
      }
    };
    frame = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener('load', onLoad);
      cancelAnimationFrame(frame);
      clearTimeout(exitTimer);
    };
  }, []);

  if (state === 'gone') return null;

  return (
    <div className={`pl${state === 'exiting' ? ' is-exiting' : ''}`} aria-hidden="true">
      <div className="pl__curtain pl__curtain--top" />
      <div className="pl__curtain pl__curtain--bottom" />

      <div className="pl__content">
        <div className="pl__word">
          {WORD.map(([char, accent], i) => (
            <span key={i} className="pl__mask">
              <span className={`pl__char${accent ? ' pl__char--accent' : ''}`} style={{ '--i': i }}>
                {char}
              </span>
            </span>
          ))}
        </div>

        <div className="pl__line"><span ref={lineRef} /></div>

        <div className="pl__meta">
          <span>Digital Marketing Studio</span>
          <span>Kerala &mdash; UAE</span>
        </div>
      </div>

      <div className="pl__counter">
        <span ref={counterRef}>000</span>
      </div>
    </div>
  );
}
