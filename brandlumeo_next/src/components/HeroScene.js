'use client';

import { useEffect, useRef } from 'react';

const GREEN = 0x34d264;
const EMERALD = 0x0b7a37;
const DEEP_GREEN = 0x068f34;

// Soft round sprite so points render as glowing dots instead of squares.
function makeDotTexture(THREE) {
  const size = 64;
  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  const g = ctx.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.3, 'rgba(255,255,255,0.55)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  ctx.fillStyle = g;
  ctx.fillRect(0, 0, size, size);
  const texture = new THREE.CanvasTexture(canvas);
  texture.colorSpace = THREE.SRGBColorSpace;
  return texture;
}

export default function HeroScene() {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    let disposed = false;
    let cleanup = () => {};

    Promise.all([
      import('three'),
      import('three/addons/environments/RoomEnvironment.js'),
      import('three/addons/postprocessing/EffectComposer.js'),
      import('three/addons/postprocessing/RenderPass.js'),
      import('three/addons/postprocessing/UnrealBloomPass.js'),
      import('three/addons/postprocessing/OutputPass.js'),
    ]).then(async ([THREE, { RoomEnvironment }, { EffectComposer }, { RenderPass }, { UnrealBloomPass }, { OutputPass }]) => {
      if (disposed) return;

      const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const isSmall = window.innerWidth < 768;

      const renderer = new THREE.WebGLRenderer({ antialias: true, powerPreference: 'high-performance' });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio, isSmall ? 1.5 : 2));
      renderer.setClearColor(0x000000, 1);
      renderer.toneMapping = THREE.ACESFilmicToneMapping;
      renderer.toneMappingExposure = 1.05;
      container.appendChild(renderer.domElement);

      const dotTexture = makeDotTexture(THREE);

      // ============ Main scene: particle wave, wireframe globe, dust ============
      const scene = new THREE.Scene();
      scene.fog = new THREE.FogExp2(0x000000, 0.034);

      const camera = new THREE.PerspectiveCamera(50, 1, 0.1, 200);
      camera.position.set(0, 4, 22);

      // Particle wave with a depth gradient: bright green up front, fading to deep green far away.
      const cols = isSmall ? 80 : 160;
      const rows = isSmall ? 45 : 70;
      const spacing = 0.55;
      const count = cols * rows;
      const positions = new Float32Array(count * 3);
      const colors = new Float32Array(count * 3);
      const near = new THREE.Color(GREEN);
      const far = new THREE.Color(0x0a3d1c);
      const tmp = new THREE.Color();
      for (let i = 0; i < cols; i++) {
        for (let j = 0; j < rows; j++) {
          const k = (i * rows + j) * 3;
          positions[k] = (i - cols / 2) * spacing;
          positions[k + 2] = (j - rows) * spacing + 14;
          tmp.copy(far).lerp(near, Math.pow(j / rows, 1.6));
          colors[k] = tmp.r;
          colors[k + 1] = tmp.g;
          colors[k + 2] = tmp.b;
        }
      }
      const waveGeometry = new THREE.BufferGeometry();
      waveGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      waveGeometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));
      const waveMaterial = new THREE.PointsMaterial({
        size: 0.17,
        vertexColors: true,
        map: dotTexture,
        transparent: true,
        opacity: 0.95,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const wave = new THREE.Points(waveGeometry, waveMaterial);
      wave.position.y = -6.5;
      scene.add(wave);

      // Wireframe globe behind the wordmark: fine lines, a few glowing nodes, and a faint halo ring.
      const globe = new THREE.Group();
      const globeGeometry = new THREE.IcosahedronGeometry(7.5, 3);
      const wireGeometry = new THREE.WireframeGeometry(globeGeometry);
      const wireMaterial = new THREE.LineBasicMaterial({
        color: DEEP_GREEN,
        transparent: true,
        opacity: 0.16,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
      });
      globe.add(new THREE.LineSegments(wireGeometry, wireMaterial));
      const nodeGeometry = new THREE.IcosahedronGeometry(7.5, 1);
      const nodeMaterial = new THREE.PointsMaterial({
        color: GREEN,
        size: 0.32,
        map: dotTexture,
        transparent: true,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      globe.add(new THREE.Points(nodeGeometry, nodeMaterial));
      globe.scale.setScalar(0.62);
      globe.position.set(0, 0.5, -3);
      scene.add(globe);

      // Rotating ring of giant condensed text around the globe (rno1-style).
      // The near side is solid gray; the far side shows through faintly, mirrored.
      await document.fonts.load('400px Anton').catch(() => {});
      if (disposed) {
        renderer.dispose();
        renderer.domElement.remove();
        return;
      }
      const RING_TEXT = 'BRANDLUMEO  •  GROWING BRANDS ACROSS KERALA & THE GCC  •  ';
      const ringCanvas = document.createElement('canvas');
      const ringCtx = ringCanvas.getContext('2d');
      const ringFont = '400 360px Anton, Impact, "Arial Narrow", sans-serif';
      ringCtx.font = ringFont;
      ringCanvas.width = Math.min(Math.ceil(ringCtx.measureText(RING_TEXT).width), renderer.capabilities.maxTextureSize);
      ringCanvas.height = 440;
      ringCtx.font = ringFont;
      ringCtx.fillStyle = '#ffffff';
      ringCtx.textBaseline = 'middle';
      ringCtx.fillText(RING_TEXT, 0, ringCanvas.height / 2 + 12);
      const ringTexture = new THREE.CanvasTexture(ringCanvas);
      ringTexture.colorSpace = THREE.SRGBColorSpace;
      ringTexture.anisotropy = renderer.capabilities.getMaxAnisotropy();

      const RING_RADIUS = isSmall ? 10 : 16;
      const ringHeight = (2 * Math.PI * RING_RADIUS * ringCanvas.height) / ringCanvas.width;
      const ringGeometry = new THREE.CylinderGeometry(RING_RADIUS, RING_RADIUS, ringHeight, 160, 1, true);
      const ringFrontMaterial = new THREE.MeshBasicMaterial({
        map: ringTexture,
        color: 0x5f6368,
        transparent: true,
        side: THREE.FrontSide,
        depthWrite: false,
        fog: false,
        toneMapped: false,
      });
      const ringBackMaterial = ringFrontMaterial.clone();
      ringBackMaterial.side = THREE.BackSide;
      ringBackMaterial.color = new THREE.Color(0x3a3d40);
      ringBackMaterial.opacity = 0.55;
      const textRing = new THREE.Group();
      const ringBack = new THREE.Mesh(ringGeometry, ringBackMaterial);
      const ringFront = new THREE.Mesh(ringGeometry, ringFrontMaterial);
      ringBack.renderOrder = 1;
      ringFront.renderOrder = 3;
      textRing.add(ringBack, ringFront);
      textRing.position.set(0, 1.8, -5);
      textRing.rotation.x = 0.16;
      textRing.rotation.z = -0.04;
      scene.add(textRing);

      // Sparse floating dust for depth.
      const dustCount = isSmall ? 160 : 420;
      const dustPositions = new Float32Array(dustCount * 3);
      for (let i = 0; i < dustCount; i++) {
        dustPositions[i * 3] = (Math.random() - 0.5) * 60;
        dustPositions[i * 3 + 1] = (Math.random() - 0.3) * 30;
        dustPositions[i * 3 + 2] = (Math.random() - 0.7) * 40;
      }
      const dustGeometry = new THREE.BufferGeometry();
      dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPositions, 3));
      const dustMaterial = new THREE.PointsMaterial({
        color: 0xd9fbe5,
        size: 0.09,
        map: dotTexture,
        transparent: true,
        opacity: 0.55,
        depthWrite: false,
        blending: THREE.AdditiveBlending,
      });
      const dust = new THREE.Points(dustGeometry, dustMaterial);
      scene.add(dust);

      // ============ Blob scene: glossy emerald spheres ============
      // Drawn with an orthographic camera so they stay perfectly round at the screen
      // edges, and lit by a studio environment map for realistic reflections.
      const BLOB_HALF_H = 10;
      const blobScene = new THREE.Scene();
      const blobCamera = new THREE.OrthographicCamera(-BLOB_HALF_H, BLOB_HALF_H, BLOB_HALF_H, -BLOB_HALF_H, 0.1, 100);
      blobCamera.position.z = 30;

      const pmrem = new THREE.PMREMGenerator(renderer);
      const roomEnvironment = new RoomEnvironment();
      const envTexture = pmrem.fromScene(roomEnvironment, 0.04).texture;
      blobScene.environment = envTexture;
      blobScene.environmentIntensity = 0.32;

      const keyLight = new THREE.DirectionalLight(0xffffff, 1.2);
      keyLight.position.set(-6, 10, 14);
      blobScene.add(keyLight);
      const rimLight = new THREE.DirectionalLight(GREEN, 2.2);
      rimLight.position.set(10, -8, -2);
      blobScene.add(rimLight);

      const blobMaterial = new THREE.MeshPhysicalMaterial({
        color: EMERALD,
        metalness: 0.1,
        roughness: 0.22,
        clearcoat: 1,
        clearcoatRoughness: 0.05,
        iridescence: 0.2,
        iridescenceIOR: 1.3,
        iridescenceThicknessRange: [200, 450],
      });
      const moonMaterial = new THREE.MeshPhysicalMaterial({
        color: 0x0d2a18,
        metalness: 0.9,
        roughness: 0.2,
        clearcoat: 1,
        clearcoatRoughness: 0.1,
      });
      const moonGeometry = new THREE.SphereGeometry(1, 48, 48);

      const makeBlob = (seed, moons) => {
        const segments = isSmall ? 64 : 96;
        const geometry = new THREE.SphereGeometry(1, segments, segments);
        const base = geometry.getAttribute('position').array.slice();
        const mesh = new THREE.Mesh(geometry, blobMaterial);
        const group = new THREE.Group();
        group.add(mesh);
        const orbiters = moons.map(({ size, dist, speed, tilt, phase }) => {
          const moon = new THREE.Mesh(moonGeometry, moonMaterial);
          moon.scale.setScalar(size);
          group.add(moon);
          return { moon, dist, speed, tilt, phase };
        });
        blobScene.add(group);
        return { group, mesh, geometry, base, seed, orbiters };
      };

      const blobs = [
        makeBlob(1.3, [
          { size: 0.12, dist: 1.45, speed: 0.32, tilt: 0.5, phase: 0 },
          { size: 0.07, dist: 1.72, speed: -0.24, tilt: -0.8, phase: 2.4 },
        ]),
        makeBlob(4.1, [
          { size: 0.11, dist: 1.5, speed: 0.38, tilt: -0.4, phase: 1.2 },
          { size: 0.065, dist: 1.78, speed: -0.28, tilt: 0.9, phase: 4 },
        ]),
      ];

      // Slow, liquid wobble: push each vertex in/out with layered sine "noise".
      const wobble = (blob, t) => {
        const pos = blob.geometry.getAttribute('position');
        const arr = pos.array;
        const { base, seed } = blob;
        for (let i = 0; i < arr.length; i += 3) {
          const x = base[i], y = base[i + 1], z = base[i + 2];
          const n =
            Math.sin(x * 1.8 + t * 0.55 + seed) * 0.035 +
            Math.sin(y * 2.2 + t * 0.7 + seed * 2) * 0.03 +
            Math.sin(z * 2.9 + t * 0.45 + seed * 3) * 0.02;
          const s = 1 + n;
          arr[i] = x * s;
          arr[i + 1] = y * s;
          arr[i + 2] = z * s;
        }
        pos.needsUpdate = true;
        blob.geometry.computeVertexNormals();
      };

      const placeBlobs = () => {
        const halfH = BLOB_HALF_H;
        const halfW = halfH * camera.aspect;
        blobCamera.left = -halfW;
        blobCamera.right = halfW;
        blobCamera.updateProjectionMatrix();
        // Sizes mirror the original 2D blobs (~22vw and ~16vw wide), capped on tall/narrow screens.
        const r1 = Math.min(halfW * 0.22, halfH * 0.42);
        const r2 = Math.min(halfW * 0.16, halfH * 0.32);
        blobs[0].group.scale.setScalar(r1);
        blobs[0].group.position.set(-halfW + r1 * 0.7, halfH - r1 * 1.35, 0);
        blobs[1].group.scale.setScalar(r2);
        blobs[1].group.position.set(halfW - r2 * 0.65, -halfH + r2 * 1.25, 0);
        blobs.forEach((blob) => {
          blob.group.userData.baseX = blob.group.position.x;
          blob.group.userData.baseY = blob.group.position.y;
        });
      };

      // ============ Post-processing: soft bloom (desktop only) + tone mapping ============
      const composer = new EffectComposer(renderer);
      composer.addPass(new RenderPass(scene, camera));
      const blobPass = new RenderPass(blobScene, blobCamera);
      blobPass.clear = false;
      blobPass.clearDepth = true;
      composer.addPass(blobPass);
      // High threshold: only the brightest points (nodes, highlights) glow, no haze.
      const bloomPass = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.45, 0.4, 0.55);
      bloomPass.enabled = !isSmall;
      composer.addPass(bloomPass);
      composer.addPass(new OutputPass());

      // ============ Sizing ============
      const resize = () => {
        const { clientWidth: w, clientHeight: h } = container;
        if (!w || !h) return;
        renderer.setSize(w, h, false);
        composer.setPixelRatio(renderer.getPixelRatio());
        composer.setSize(w, h);
        camera.aspect = w / h;
        camera.updateProjectionMatrix();
        placeBlobs();
      };
      resize();
      const resizeObserver = new ResizeObserver(resize);
      resizeObserver.observe(container);

      // ============ Mouse parallax (heavily eased for a smooth, weighty feel) ============
      const pointer = { x: 0, y: 0 };
      const eased = { x: 0, y: 0 };
      const onPointerMove = (e) => {
        pointer.x = (e.clientX / window.innerWidth) * 2 - 1;
        pointer.y = (e.clientY / window.innerHeight) * 2 - 1;
      };
      window.addEventListener('pointermove', onPointerMove, { passive: true });

      const clock = new THREE.Clock();
      const posAttr = waveGeometry.getAttribute('position');

      const renderFrame = () => {
        const t = clock.getElapsedTime();

        for (let i = 0; i < count; i++) {
          const x = positions[i * 3];
          const z = positions[i * 3 + 2];
          positions[i * 3 + 1] =
            Math.sin(x * 0.24 + t * 0.55) * 0.85 +
            Math.cos(z * 0.28 + t * 0.42) * 0.65 +
            Math.sin((x + z) * 0.1 + t * 0.3) * 0.55;
        }
        posAttr.needsUpdate = true;

        globe.rotation.y = t * 0.07;
        globe.rotation.x = Math.sin(t * 0.15) * 0.12;
        textRing.rotation.y = -t * 0.16;
        dust.rotation.y = t * 0.012;

        eased.x += (pointer.x - eased.x) * 0.035;
        eased.y += (pointer.y - eased.y) * 0.035;
        camera.position.x = eased.x * 2.2;
        camera.position.y = 4 - eased.y * 1.3;
        camera.lookAt(0, 0, -4);

        blobs.forEach((blob, b) => {
          wobble(blob, t);
          blob.mesh.rotation.y = t * 0.1 * (b ? -1 : 1);
          blob.mesh.rotation.x = Math.sin(t * 0.2 + b) * 0.2;
          // Gentle float plus a little parallax opposite the camera drift.
          blob.group.position.x = blob.group.userData.baseX - eased.x * 0.6;
          blob.group.position.y =
            blob.group.userData.baseY + Math.sin(t * 0.6 + b * 2) * blob.group.scale.y * 0.06 + eased.y * 0.4;
          blob.orbiters.forEach(({ moon, dist, speed, tilt, phase }) => {
            const a = t * speed + phase;
            moon.position.set(Math.cos(a) * dist, Math.sin(a) * dist * Math.sin(tilt), Math.sin(a) * dist * Math.cos(tilt));
          });
        });

        composer.render();
      };

      // ============ Run only while the hero is on screen and the tab is visible ============
      let rafId = null;
      let inView = true;
      const loop = () => {
        renderFrame();
        rafId = requestAnimationFrame(loop);
      };
      const start = () => {
        if (rafId === null && inView && !document.hidden && !reduceMotion) {
          rafId = requestAnimationFrame(loop);
        }
      };
      const stop = () => {
        if (rafId !== null) cancelAnimationFrame(rafId);
        rafId = null;
      };

      const intersectionObserver = new IntersectionObserver(([entry]) => {
        inView = entry.isIntersecting;
        inView ? start() : stop();
      });
      intersectionObserver.observe(container);
      const onVisibility = () => (document.hidden ? stop() : start());
      document.addEventListener('visibilitychange', onVisibility);

      if (reduceMotion) {
        renderFrame();
      } else {
        start();
      }
      requestAnimationFrame(() => container.classList.add('is-ready'));

      cleanup = () => {
        stop();
        intersectionObserver.disconnect();
        resizeObserver.disconnect();
        document.removeEventListener('visibilitychange', onVisibility);
        window.removeEventListener('pointermove', onPointerMove);
        [waveGeometry, globeGeometry, nodeGeometry, wireGeometry, ringGeometry, dustGeometry, moonGeometry, ...blobs.map((b) => b.geometry)].forEach((g) => g.dispose());
        [waveMaterial, wireMaterial, nodeMaterial, ringFrontMaterial, ringBackMaterial, dustMaterial, blobMaterial, moonMaterial].forEach((m) => m.dispose());
        dotTexture.dispose();
        ringTexture.dispose();
        envTexture.dispose();
        roomEnvironment.dispose();
        pmrem.dispose();
        composer.dispose();
        renderer.dispose();
        renderer.domElement.remove();
      };
    });

    return () => {
      disposed = true;
      cleanup();
    };
  }, []);

  return <div ref={containerRef} className="hero-scene" aria-hidden="true" />;
}
