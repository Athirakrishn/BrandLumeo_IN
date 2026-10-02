'use client';

import { useEffect, useRef, useState } from 'react';

const GRAY = 0x575b5f; // same grey as the giant "ABOUT"
const EDGE = 0x0a0a0b; // dark outlines that reveal the 3D depth (rno1 style)

// rno1-style "US" emblem: a thick coin-like ring with extruded "US" inside, flat grey
// with dark edge lines. It turns half a turn, holds, then turns the next half, and the
// single "US" always reads correctly.
export default function Us3D({ delay = 0.6 }) {
  const boxRef = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const box = boxRef.current;
    if (!box) return;

    let disposed = false;
    let cleanup = () => {};

    Promise.all([
      import('three'),
      import('three/addons/loaders/FontLoader.js'),
      import('three/addons/geometries/TextGeometry.js'),
    ]).then(([THREE, { FontLoader }, { TextGeometry }]) => {
      if (disposed) return;

      new FontLoader().load('/fonts/anton-us.typeface.json', (font) => {
        if (disposed) return;

        let renderer;
        try {
          renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        } catch {
          return; // No WebGL: keep the plain-text fallback.
        }
        renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
        renderer.setClearColor(0x000000, 0);
        box.appendChild(renderer.domElement);

        const scene = new THREE.Scene();
        const camera = new THREE.PerspectiveCamera(26, 1, 0.1, 50);
        camera.position.set(0, 0, 5.6);

        const faceMaterial = new THREE.MeshBasicMaterial({
          color: GRAY,
          polygonOffset: true, // keep edge lines crisp on top of the faces
          polygonOffsetFactor: 1,
          polygonOffsetUnits: 1,
        });
        const edgeMaterial = new THREE.LineBasicMaterial({ color: EDGE });
        const disposables = [faceMaterial, edgeMaterial];

        const addWithEdges = (geometry, parent) => {
          const mesh = new THREE.Mesh(geometry, faceMaterial);
          const edgesGeometry = new THREE.EdgesGeometry(geometry, 30);
          const edges = new THREE.LineSegments(edgesGeometry, edgeMaterial);
          const holder = new THREE.Group();
          holder.add(mesh, edges);
          parent.add(holder);
          disposables.push(edgesGeometry);
          return holder;
        };

        const emblem = new THREE.Group();
        const THICKNESS = 0.32;

        // Thick ring (a coin rim): outer radius 1, inner radius 0.78.
        const ringShape = new THREE.Shape();
        ringShape.absarc(0, 0, 1, 0, Math.PI * 2, false);
        const hole = new THREE.Path();
        hole.absarc(0, 0, 0.78, 0, Math.PI * 2, true);
        ringShape.holes.push(hole);
        const ringGeometry = new THREE.ExtrudeGeometry(ringShape, {
          depth: THICKNESS,
          bevelEnabled: false,
          curveSegments: 96,
        });
        ringGeometry.translate(0, 0, -THICKNESS / 2);
        addWithEdges(ringGeometry, emblem);
        disposables.push(ringGeometry);

        // A single extruded "US" filling the coin's full thickness.
        const textGeometry = new TextGeometry('US', {
          font,
          size: 1,
          depth: THICKNESS,
          curveSegments: 8,
          bevelEnabled: false,
        });
        textGeometry.computeBoundingBox();
        const cap = textGeometry.boundingBox.max.y;
        const scale = 0.98 / cap; // letters ~0.98 tall inside the 1.56-wide opening
        textGeometry.scale(scale, scale, 1);
        textGeometry.center();
        const text = addWithEdges(textGeometry, emblem);
        disposables.push(textGeometry);

        scene.add(emblem);

        const resize = () => {
          const { clientWidth: w, clientHeight: h } = box;
          if (!w || !h) return;
          renderer.setSize(w, h, false);
          camera.aspect = w / h;
          camera.updateProjectionMatrix();
        };
        resize();
        const resizeObserver = new ResizeObserver(resize);
        resizeObserver.observe(box);

        // Half turn (180°), hold facing front, then the next half.
        const TURN = 1.3;
        const HOLD = 1.6;
        const easeInOutCubic = (x) => (x < 0.5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2);
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        const clock = new THREE.Clock();
        const renderFrame = () => {
          const t = clock.getElapsedTime();
          if (reduceMotion) {
            emblem.rotation.y = -0.45;
          } else {
            const cycle = TURN + HOLD;
            const step = Math.floor(t / cycle);
            const progress = Math.max(0, Math.min(1, (t - step * cycle - HOLD) / TURN));
            // Rest slightly angled (like rno1) so the depth outlines stay visible.
            emblem.rotation.y = -0.45 + (step + easeInOutCubic(progress)) * Math.PI;
          }
          // When the coin's back faces the viewer, mirror the letters so "US" still reads
          // correctly. The swap happens edge-on (90°), where the letters are invisible.
          text.scale.x = Math.cos(emblem.rotation.y) < 0 ? -1 : 1;
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
          disposables.forEach((d) => d.dispose());
          renderer.dispose();
          renderer.domElement.remove();
        };
      });
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return (
    <span
      ref={boxRef}
      className={`us3d letter-reveal__char${ready ? ' is-ready' : ''}`}
      style={{ animationDelay: `${delay}s` }}
    >
      <span className="sr-only"> Us</span>
      <span className="us3d__fallback" aria-hidden="true">US</span>
    </span>
  );
}
