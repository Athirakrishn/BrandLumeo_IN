(() => {
  if (!matchMedia('(any-pointer: fine)').matches ||
      matchMedia('(prefers-reduced-motion: reduce)').matches) return;

  const ring = document.createElement('span');
  ring.setAttribute('aria-hidden', 'true');
  Object.assign(ring.style, {
    position: 'fixed', top: '0', left: '0', width: '22px', height: '22px',
    boxSizing: 'border-box', border: '1.5px solid #34d264', borderRadius: '50%',
    pointerEvents: 'none', zIndex: '2147483647', opacity: '0',
    transition: 'opacity 120ms ease, width 180ms ease, height 180ms ease'
  });
  document.body.append(ring);

  const root = document.documentElement;
  const cursor = 'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%278%27 height=%278%27%3E%3Ccircle cx=%274%27 cy=%274%27 r=%273%27 fill=%27%2334d264%27/%3E%3C/svg%3E") 4 4';
  let x, y, targetX, targetY, frame = 0;
  let visible = false;

  function follow() {
    x += (targetX - x) * 0.24;
    y += (targetY - y) * 0.24;
    ring.style.transform = 'translate3d(' + x + 'px,' + y + 'px,0) translate(-50%,-50%)';
    frame = Math.hypot(targetX - x, targetY - y) > 0.1 ? requestAnimationFrame(follow) : 0;
  }

  function hide() {
    visible = false;
    ring.style.opacity = '0';
    root.style.removeProperty('--green-mouse-cursor');
  }

  addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse' || getComputedStyle(event.target).cursor === 'text') {
      hide();
      return;
    }
    targetX = event.clientX;
    targetY = event.clientY;
    if (!visible) {
      x = targetX;
      y = targetY;
      root.style.setProperty('--green-mouse-cursor', cursor);
      visible = true;
    }
    const size = event.target.closest('a[href], button, summary, [role="button"]') ? '34px' : '22px';
    ring.style.width = size;
    ring.style.height = size;
    if (!frame) follow();
    ring.style.opacity = '1';
  }, { passive: true });

  document.documentElement.addEventListener('pointerleave', hide);
  addEventListener('blur', hide);
})();