(() => {
  if (!matchMedia('(any-pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ring = document.createElement('span');
  ring.setAttribute('aria-hidden', 'true');
  Object.assign(ring.style, {
    position: 'fixed', width: '20px', height: '20px',
    boxSizing: 'border-box', border: '2px solid #34d264',
    borderRadius: '50%', pointerEvents: 'none', zIndex: '2147483647'
  });

  addEventListener('pointerdown', (event) => {
    if (event.pointerType !== 'mouse' || event.button !== 0 ||
        getComputedStyle(event.target).cursor === 'text') return;
    ring.getAnimations().forEach(animation => animation.cancel());
    ring.style.left = event.clientX + 'px';
    ring.style.top = event.clientY + 'px';
    document.body.append(ring);
    ring.animate([
      { transform: 'translate(-50%, -50%) scale(1)', opacity: 0.75 },
      { transform: 'translate(-50%, -50%) scale(1.7)', opacity: 0 }
    ], { duration: 240, easing: 'ease-out' }).onfinish = () => ring.remove();
  }, { passive: true });
})();