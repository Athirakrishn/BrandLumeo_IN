'use client';

import { useEffect, useRef } from 'react';

// Tilts the 3D-extruded BRAND / LUMEO title toward the pointer. The extrusion direction
// (--ex / --ey, used by the layered text-shadows in style.css) moves opposite the tilt,
// so the letter sides stay consistent with the perspective.
export default function Title3D({ children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    if (!window.matchMedia('(hover: hover)').matches) return;

    let target = { x: 0, y: 0 };
    let current = { x: 0, y: 0 };
    let rafId = null;

    // Frame-rate independent easing so the glide feels the same on 60Hz and 120Hz screens.
    let last = performance.now();
    const apply = (now) => {
      const dt = Math.min(64, now - last);
      last = now;
      const k = 1 - Math.pow(0.0025, dt / 1000); // ~ settles in about half a second
      current.x += (target.x - current.x) * k;
      current.y += (target.y - current.y) * k;
      el.style.setProperty('--ry', `${(current.x * 9).toFixed(3)}deg`);
      el.style.setProperty('--rx', `${(-current.y * 6).toFixed(3)}deg`);
      // Default extrusion points down-right; it swings gently with the pointer.
      el.style.setProperty('--ex', `${(0.6 - current.x * 0.7).toFixed(4)}`);
      el.style.setProperty('--ey', `${(1 - current.y * 0.45).toFixed(4)}`);
      if (Math.abs(target.x - current.x) > 0.0005 || Math.abs(target.y - current.y) > 0.0005) {
        rafId = requestAnimationFrame(apply);
      } else {
        rafId = null;
      }
    };
    const kick = () => {
      if (rafId === null) {
        last = performance.now();
        rafId = requestAnimationFrame(apply);
      }
    };

    const onMove = (e) => {
      target = { x: e.clientX / window.innerWidth - 0.5, y: e.clientY / window.innerHeight - 0.5 };
      kick();
    };
    const onLeave = () => {
      target = { x: 0, y: 0 };
      kick();
    };

    window.addEventListener('pointermove', onMove, { passive: true });
    document.addEventListener('pointerleave', onLeave);
    return () => {
      if (rafId !== null) cancelAnimationFrame(rafId);
      window.removeEventListener('pointermove', onMove);
      document.removeEventListener('pointerleave', onLeave);
    };
  }, []);

  return <h1 ref={ref} className="hh-title">{children}</h1>;
}
