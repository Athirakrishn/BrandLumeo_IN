'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

// Every heading except the home hero title, the nav menu and the footer (the footer sits at
// the very bottom, so its headings can never scroll far enough to finish and stay shifted
// down over the contact details).
const SELECTOR = ':is(h1, h2, h3, h4, h5, h6):not(.hh-hero *, .nav-menu-modal *, .rn-nav *, .lc-footer *)';

// Scroll-scrubbed heading entrance (socialbeast.in "Let's make it happen." style): each
// heading starts up to 65px lower and tipped back 12deg, then straightens as it scrolls from
// 95% to 60% of the viewport.
export default function HeadingTilt() {
  const pathname = usePathname();

  useEffect(() => {
    const mm = gsap.matchMedia();
    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.utils.toArray(SELECTOR).forEach((heading) => {
        // Big titles drop the full 65px; small labels drop about one line so they don't
        // land on the content right under them.
        const fontSize = parseFloat(getComputedStyle(heading).fontSize) || 16;
        gsap.from(heading, {
          y: Math.min(65, fontSize * 1.1),
          rotateX: 12,
          transformPerspective: 900,
          ease: 'none',
          scrollTrigger: { trigger: heading, start: 'top 95%', end: 'top 60%', scrub: 0.6 },
        });
      });
    });
    return () => mm.revert();
  }, [pathname]);

  return null;
}
