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
/* Main headings: clicking a letter plays a green light sweep (and a small hop) on that letter. */
(() => {
  if (matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  const HEADINGS = '.rn-display';

  function caretAt(x, y) {
    if (document.caretPositionFromPoint) {
      const p = document.caretPositionFromPoint(x, y);
      return p && { node: p.offsetNode, offset: p.offset };
    }
    if (document.caretRangeFromPoint) {
      const r = document.caretRangeFromPoint(x, y);
      return r && { node: r.startContainer, offset: r.startOffset };
    }
    return null;
  }

  // The caret sits between characters; pick the character whose box holds the click.
  function charAt(node, offset, x, y) {
    const range = document.createRange();
    for (const o of [offset, offset - 1]) {
      if (o < 0 || o >= node.data.length) continue;
      range.setStart(node, o);
      range.setEnd(node, o + 1);
      for (const b of range.getClientRects()) {
        if (x >= b.left && x <= b.right && y >= b.top && y <= b.bottom) return o;
      }
    }
    return -1;
  }

  function play(span) {
    span.classList.remove('lt-pop');
    void span.offsetWidth;
    span.classList.add('lt-pop');
  }

  document.addEventListener('click', (e) => {
    if (!e.target.closest || !e.target.closest(HEADINGS)) return;
    const sel = getSelection();
    if (sel && !sel.isCollapsed) return;

    const hit = caretAt(e.clientX, e.clientY);
    if (!hit || hit.node.nodeType !== Node.TEXT_NODE) return;
    const node = hit.node;
    const parent = node.parentElement;
    if (!parent || !parent.closest(HEADINGS)) return;

    // Clicking a letter that is still animating: replay it.
    if (parent.classList.contains('lt-letter')) { play(parent); return; }

    const i = charAt(node, hit.offset, e.clientX, e.clientY);
    if (i < 0 || /\s/.test(node.data[i])) return;

    const base = getComputedStyle(parent).color;
    const transparent = base === 'transparent' || /,\s*0\)$/.test(base);

    const after = node.splitText(i + 1);
    const mid = node.splitText(i);
    const span = document.createElement('span');
    span.className = 'lt-letter';
    span.style.setProperty('--lt-base', transparent ? '#575b5f' : base);
    parent.insertBefore(span, mid);
    span.append(mid);
    play(span);

    // Put the text back exactly as it was once the sweep is done.
    span.addEventListener('animationend', function done(ev) {
      if (ev.animationName !== 'lt-sweep') return;
      span.removeEventListener('animationend', done);
      node.data += mid.data + after.data;
      span.remove();
      after.remove();
    });
  });
})();
