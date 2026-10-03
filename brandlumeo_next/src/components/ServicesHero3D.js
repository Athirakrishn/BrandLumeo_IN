'use client';

import { useEffect, useRef, useState } from 'react';

const GREEN = 0x0aa53e;

// Three.js backdrop for the services hero: a rolling "data ocean" of green particles
// that drifts toward the mouse.
export default function ServicesHero3D() {
  const boxRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let disposed = false;
    let cleanup = () => {};

    import('three').then((THREE) => {
      if (disposed) return;

      let renderer;
      try {
        renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      } catch {
        return; // No WebGL: the CSS visual still stands on its own.
      }
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
      renderer.setClearColor(0x000000, 0);
      box.appendChild(renderer.domElement);

      const scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x050505, 8, 22);
      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 60);
      camera.position.set(0, 2.6, 9);
      const lookAt = new THREE.Vector3(0, 0.4, 0);

      // Particle wave: a grid of points whose height is a sum of sine waves.
      const COLS = 110;
      const ROWS = 46;
      const SPACING = 0.32;
      const count = COLS * ROWS;
      const positions = new Float32Array(count * 3);
      const base = new Float32Array(count * 2);
      for (let r = 0, i = 0; r < ROWS; r++) {
        for (let c = 0; c < COLS; c++, i++) {
          const x = (c - COLS / 2) * SPACING;
          const z = (r - ROWS / 2) * SPACING;
          base[i * 2] = x;
          base[i * 2 + 1] = z;
          positions[i * 3] = x;
          positions[i * 3 + 2] = z;
        }
      }
      const waveGeometry = new THREE.BufferGeometry();
      waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      const waveMaterial = new THREE.PointsMaterial({
        color: GREEN,
        size: 0.055,
        transparent: true,
        opacity: 0.85,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      const wave = new THREE.Points(waveGeometry, waveMaterial);
      wave.position.y = -1.6;
      scene.add(wave);

      const disposables = [waveGeometry, waveMaterial];

      const resize = () => {
        const { clientWidth: w, clientHeight: h } = box;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        camera.aspect = w / h;
        // Narrow screens: pull back so the wave still spans the frame.
        camera.position.z = w / h < 1.2 ? 12 : 9;
        camera.updateProjectionMatrix();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(box);

      // Mouse parallax, eased toward the pointer.
      const pointer = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      const onPointerMove = (e) => {
        const rect = box.getBoundingClientRect();
        pointer.x = ((e.clientX - rect.left) / rect.width) * 2 - 1;
        pointer.y = ((e.clientY - rect.top) / rect.height) * 2 - 1;
      };
      const onPointerLeave = () => {
        pointer.x = 0;
        pointer.y = 0;
      };
      box.parentElement.addEventListener('pointermove', onPointerMove);
      box.parentElement.addEventListener('pointerleave', onPointerLeave);

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const clock = new THREE.Clock();
      const renderFrame = () => {
        const t = reduceMotion ? 2 : clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
          const x = base[i * 2];
          const z = base[i * 2 + 1];
          positions[i * 3 + 1] =
            Math.sin(x * 0.45 + t * 0.9) * 0.35 +
            Math.cos(z * 0.6 + t * 0.7) * 0.25 +
            Math.sin((x + z) * 0.25 + t * 0.5) * 0.3;
        }
        waveGeometry.attributes.position.needsUpdate = true;

        eased.x += (pointer.x - eased.x) * 0.05;
        eased.y += (pointer.y - eased.y) * 0.05;
        camera.position.x = eased.x * 1.2;
        camera.position.y = 2.6 - eased.y * 0.6;
        camera.lookAt(lookAt);

        renderer.render(scene, camera);
      };

      let rafId = null;
      let inView = true;
      const loop = () => {
        renderFrame();
        rafId = requestAnimationFrame(loop);
      };
      const start = () => {
        if (rafId === null && inView && !document.hidden && !reduceMotion) rafId = requestAnimationFrame(loop);
      };
      const stop = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
      };
      const io = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        inView ? start() : stop();
      });
      io.observe(box);
      const onVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener('visibilitychange', onVisibility);

      renderFrame();
      start();
      setReady(true);

      cleanup = () => {
        stop();
        io.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        box.parentElement?.removeEventListener('pointermove', onPointerMove);
        box.parentElement?.removeEventListener('pointerleave', onPointerLeave);
        disposables.forEach((d) => d.dispose());
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={boxRef} className={`shv__3d${ready ? ' is-ready' : ''}`} aria-hidden="true" />;
}
