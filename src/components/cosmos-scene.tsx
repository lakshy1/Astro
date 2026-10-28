"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";

/*
  Hero WebGL scene: a gold armillary sphere.
  - A radiant Sun at the centre
  - Celestial equator, meridians and the ecliptic as gilded rings
  - The zodiac band on the ecliptic with all 12 rashi glyphs
  - The grahas (Moon, Mars, Mercury, Jupiter, Venus, Saturn) moving along the ecliptic
  - A star field with a few traced constellations
  Pointer moves add parallax; dragging spins the sphere with inertia.
*/

const GLYPHS = ["♈", "♉", "♊", "♋", "♌", "♍", "♎", "♏", "♐", "♑", "♒", "♓"];

function glyphTexture(glyph: string) {
  const c = document.createElement("canvas");
  c.width = c.height = 128;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#f1d99a";
  ctx.shadowColor = "rgba(217,178,95,0.9)";
  ctx.shadowBlur = 14;
  ctx.font = "84px 'Segoe UI Symbol', 'Apple Symbols', 'Noto Sans Symbols', serif";
  ctx.textAlign = "center";
  ctx.textBaseline = "middle";
  ctx.fillText(glyph + "︎", 64, 70);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function CosmosScene({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const probe = document.createElement("canvas");
    if (!(probe.getContext("webgl2") || probe.getContext("webgl"))) return;
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    } catch {
      // No WebGL (old device, disabled GPU): keep the static fallback wheel
      return;
    }
    mount.dataset.webgl = "on";
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(mount.clientWidth, mount.clientHeight);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, mount.clientWidth / mount.clientHeight, 0.1, 200);
    camera.position.set(0, 1.2, 13.5);

    scene.add(new THREE.AmbientLight(0x8090c0, 0.5));
    const key = new THREE.DirectionalLight(0xfff1d0, 1.6);
    key.position.set(4, 6, 8);
    scene.add(key);
    const sunLight = new THREE.PointLight(0xffd27a, 30, 20, 1.6);
    scene.add(sunLight);

    const sphere = new THREE.Group();
    sphere.rotation.set(0.3, 0, 0);
    scene.add(sphere);

    const gold = new THREE.MeshStandardMaterial({ color: 0xd9b25f, metalness: 0.9, roughness: 0.32, emissive: 0x3a2a08, emissiveIntensity: 0.6 });
    const goldDim = new THREE.MeshStandardMaterial({ color: 0xb08a3e, metalness: 0.85, roughness: 0.45, transparent: true, opacity: 0.55 });

    // Sun
    const sun = new THREE.Mesh(
      new THREE.SphereGeometry(0.8, 64, 64),
      new THREE.ShaderMaterial({
        uniforms: { uTime: { value: 0 } },
        vertexShader: `varying vec3 vN; varying vec3 vP; void main(){ vN = normalize(normalMatrix*normal); vP = position; gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `
          uniform float uTime; varying vec3 vN; varying vec3 vP;
          void main(){
            float n = sin(vP.x*9.0+uTime)*sin(vP.y*8.0-uTime*0.7)*sin(vP.z*7.0+uTime*0.5);
            vec3 core = mix(vec3(1.0,0.78,0.36), vec3(1.0,0.93,0.7), n*0.5+0.5);
            float rim = pow(1.0-max(dot(vN,vec3(0.0,0.0,1.0)),0.0),2.0);
            gl_FragColor = vec4(core + rim*vec3(1.0,0.55,0.15), 1.0);
          }`,
      })
    );
    sphere.add(sun);
    const corona = new THREE.Mesh(
      new THREE.SphereGeometry(1.35, 48, 48),
      new THREE.ShaderMaterial({
        transparent: true,
        side: THREE.BackSide,
        blending: THREE.AdditiveBlending,
        depthWrite: false,
        vertexShader: `varying vec3 vN; void main(){ vN = normalize(normalMatrix*normal); gl_Position = projectionMatrix*modelViewMatrix*vec4(position,1.0); }`,
        fragmentShader: `varying vec3 vN; void main(){ float i = pow(0.72 - dot(vN, vec3(0.0,0.0,1.0)), 3.2); gl_FragColor = vec4(1.0,0.75,0.35,1.0)*i; }`,
      })
    );
    sphere.add(corona);

    const ring = (r: number, tube: number, mat: THREE.Material) => new THREE.Mesh(new THREE.TorusGeometry(r, tube, 12, 260), mat);

    // Armillary frame: equator, two meridians, tropics
    const R = 3.4;
    const equator = ring(R, 0.025, gold);
    equator.rotation.x = Math.PI / 2;
    sphere.add(equator);
    const meridianA = ring(R, 0.025, gold);
    sphere.add(meridianA);
    const meridianB = ring(R, 0.018, goldDim);
    meridianB.rotation.y = Math.PI / 2;
    sphere.add(meridianB);
    for (const lat of [0.41, -0.41]) {
      const tr = ring(R * Math.cos(lat), 0.012, goldDim);
      tr.rotation.x = Math.PI / 2;
      tr.position.y = R * Math.sin(lat);
      sphere.add(tr);
    }

    // Ecliptic plane, tilted 23.4°: zodiac band, glyphs, grahas
    const ecliptic = new THREE.Group();
    ecliptic.rotation.z = THREE.MathUtils.degToRad(23.4);
    sphere.add(ecliptic);
    const zodiacPlane = new THREE.Group();
    zodiacPlane.rotation.x = Math.PI / 2;
    ecliptic.add(zodiacPlane);

    const band = new THREE.Mesh(
      new THREE.RingGeometry(R + 0.35, R + 1.15, 180, 1),
      new THREE.MeshBasicMaterial({ color: 0xd9b25f, transparent: true, opacity: 0.08, side: THREE.DoubleSide, depthWrite: false })
    );
    zodiacPlane.add(band);
    zodiacPlane.add(ring(R + 0.35, 0.02, gold));
    zodiacPlane.add(ring(R + 1.15, 0.03, gold));

    const glyphs: THREE.Sprite[] = [];
    for (let i = 0; i < 12; i++) {
      const a = (i / 12) * Math.PI * 2;
      // House dividers
      const tick = new THREE.Mesh(new THREE.BoxGeometry(0.8, 0.012, 0.012), gold);
      tick.position.set(Math.cos(a) * (R + 0.75), Math.sin(a) * (R + 0.75), 0);
      tick.rotation.z = a;
      zodiacPlane.add(tick);
      // Glyph at sign centre
      const mid = a + Math.PI / 12;
      const sprite = new THREE.Sprite(new THREE.SpriteMaterial({ map: glyphTexture(GLYPHS[i]), transparent: true, depthWrite: false }));
      sprite.scale.setScalar(0.62);
      sprite.position.set(Math.cos(mid) * (R + 0.75), Math.sin(mid) * (R + 0.75), 0);
      zodiacPlane.add(sprite);
      glyphs.push(sprite);
    }

    // Grahas on the ecliptic
    const grahas = [
      { name: "Moon", color: 0xe8ecf5, r: 1.55, size: 0.11, speed: 0.9 },
      { name: "Mercury", color: 0x9fe0b8, r: 1.95, size: 0.08, speed: 0.62 },
      { name: "Venus", color: 0xfff3e0, r: 2.35, size: 0.12, speed: 0.44 },
      { name: "Mars", color: 0xff7a5c, r: 2.75, size: 0.1, speed: 0.31 },
      { name: "Jupiter", color: 0xf4c26b, r: 3.1, size: 0.17, speed: 0.18 },
      { name: "Saturn", color: 0xa9b8d8, r: R + 0.75, size: 0.14, speed: 0.1 },
    ].map((g, i) => {
      const pivot = new THREE.Group();
      zodiacPlane.add(pivot);
      const orbit = new THREE.Mesh(
        new THREE.TorusGeometry(g.r, 0.004, 6, 200),
        new THREE.MeshBasicMaterial({ color: 0xd9b25f, transparent: true, opacity: 0.18 })
      );
      if (g.r < R) zodiacPlane.add(orbit);
      const body = new THREE.Mesh(new THREE.SphereGeometry(g.size, 32, 32), new THREE.MeshBasicMaterial({ color: g.color }));
      body.position.x = g.r;
      const glow = new THREE.Mesh(
        new THREE.SphereGeometry(g.size * 2.6, 24, 24),
        new THREE.MeshBasicMaterial({ color: g.color, transparent: true, opacity: 0.16, blending: THREE.AdditiveBlending, depthWrite: false })
      );
      body.add(glow);
      pivot.add(body);
      pivot.rotation.z = i * 1.1;
      return { pivot, speed: g.speed };
    });

    // Star field
    const starCount = 1600;
    const pos = new Float32Array(starCount * 3);
    const col = new Float32Array(starCount * 3);
    const palette = [new THREE.Color(0xffffff), new THREE.Color(0xf6e3a8), new THREE.Color(0xc9d6ff)];
    for (let i = 0; i < starCount; i++) {
      const r = 16 + Math.random() * 40;
      const t = Math.random() * Math.PI * 2;
      const p = Math.acos(2 * Math.random() - 1);
      pos.set([r * Math.sin(p) * Math.cos(t), r * Math.sin(p) * Math.sin(t), r * Math.cos(p) - 12], i * 3);
      const c = palette[i % palette.length];
      col.set([c.r, c.g, c.b], i * 3);
    }
    const starGeo = new THREE.BufferGeometry();
    starGeo.setAttribute("position", new THREE.BufferAttribute(pos, 3));
    starGeo.setAttribute("color", new THREE.BufferAttribute(col, 3));
    const stars = new THREE.Points(starGeo, new THREE.PointsMaterial({ size: 0.07, vertexColors: true, transparent: true, opacity: 0.8, depthWrite: false }));
    scene.add(stars);

    // Constellations (Orion-like, Ursa-like, Cassiopeia-like) traced in faint gold
    const constellations: [number, number][][] = [
      [[-9, 4], [-8.2, 3.1], [-7.6, 2.2], [-8.6, 1.6], [-9.6, 2.2], [-9, 3.1]],
      [[7, 5], [7.9, 5.3], [8.8, 5.1], [9.4, 4.4], [9.1, 3.6], [8.2, 3.7]],
      [[-7, -3.6], [-6.2, -2.9], [-5.4, -3.5], [-4.6, -2.8], [-3.8, -3.4]],
    ];
    const constGroup = new THREE.Group();
    for (const pts of constellations) {
      const v = pts.map(([x, y]) => new THREE.Vector3(x, y, -6));
      constGroup.add(new THREE.Line(new THREE.BufferGeometry().setFromPoints(v), new THREE.LineBasicMaterial({ color: 0xd9b25f, transparent: true, opacity: 0.22 })));
      const dots = new THREE.Points(new THREE.BufferGeometry().setFromPoints(v), new THREE.PointsMaterial({ color: 0xf6e3a8, size: 0.12 }));
      constGroup.add(dots);
    }
    scene.add(constGroup);

    // Interaction
    const pointer = { x: 0, y: 0 };
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let spinY = 0;
    let spinX = 0;
    let velY = 0.0018;
    let velX = 0;
    const onMove = (e: PointerEvent) => {
      const rect = mount.getBoundingClientRect();
      pointer.x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      pointer.y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      if (dragging) {
        velY = (e.clientX - lastX) * 0.004;
        velX = (e.clientY - lastY) * 0.004;
        lastX = e.clientX;
        lastY = e.clientY;
      }
    };
    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      mount.setPointerCapture(e.pointerId);
    };
    const onUp = () => {
      dragging = false;
    };
    window.addEventListener("pointermove", onMove);
    mount.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);

    const ro = new ResizeObserver(() => {
      renderer.setSize(mount.clientWidth, mount.clientHeight);
      camera.aspect = mount.clientWidth / mount.clientHeight;
      camera.updateProjectionMatrix();
    });
    ro.observe(mount);
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const t = clock.getElapsedTime();
      (sun.material as THREE.ShaderMaterial).uniforms.uTime.value = t;
      if (!reduceMotion) {
        if (!dragging) {
          velY += (0.0018 - velY) * 0.02;
          velX *= 0.95;
        }
        spinY += velY;
        spinX = Math.max(-0.5, Math.min(0.5, spinX + velX));
        for (const g of grahas) g.pivot.rotation.z = g.pivot.rotation.z + g.speed * 0.01;
        zodiacPlane.rotation.z = -t * 0.03;
        stars.rotation.y = t * 0.004;
        corona.scale.setScalar(1 + Math.sin(t * 1.4) * 0.03);
      }
      sphere.rotation.y = spinY;
      sphere.rotation.x = 0.3 + spinX;
      camera.position.x += (pointer.x * 0.7 - camera.position.x) * 0.04;
      camera.position.y += (1.2 - pointer.y * 0.5 - camera.position.y) * 0.04;
      camera.lookAt(0, 0, 0);
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener("pointermove", onMove);
      mount.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      glyphs.forEach((g) => g.material.map?.dispose());
      scene.traverse((o) => {
        const m = o as THREE.Mesh;
        m.geometry?.dispose();
        const mat = m.material as THREE.Material | THREE.Material[] | undefined;
        if (Array.isArray(mat)) mat.forEach((x) => x.dispose());
        else mat?.dispose();
      });
      renderer.dispose();
      mount.removeChild(renderer.domElement);
    };
  }, []);

  return (
    <div
      ref={mountRef}
      className={`group/cosmos relative cursor-grab active:cursor-grabbing touch-pan-y ${className}`}
      role="img"
      aria-label="Interactive 3D armillary sphere showing the zodiac and planets around the Sun. Drag to rotate."
    >
      {/* Static fallback, hidden once WebGL takes over */}
      <svg viewBox="0 0 200 200" className="absolute inset-0 m-auto h-full max-h-[85%] w-auto group-data-[webgl=on]/cosmos:hidden" aria-hidden="true">
        <defs>
          <radialGradient id="cs-sun">
            <stop offset="0" stopColor="#fff3c4" />
            <stop offset=".6" stopColor="#e9c46a" />
            <stop offset="1" stopColor="#e9c46a" stopOpacity="0" />
          </radialGradient>
        </defs>
        <circle cx="100" cy="100" r="30" fill="url(#cs-sun)" />
        <g fill="none" stroke="#d9b25f">
          <circle cx="100" cy="100" r="92" strokeWidth="1.2" />
          <circle cx="100" cy="100" r="70" strokeWidth="0.8" />
          <ellipse cx="100" cy="100" rx="92" ry="30" strokeWidth="0.8" opacity=".6" transform="rotate(-23 100 100)" />
        </g>
        {GLYPHS.map((g, i) => {
          const a = ((i + 0.5) / 12) * Math.PI * 2 - Math.PI / 2;
          return (
            <text key={g} x={(100 + Math.cos(a) * 81).toFixed(1)} y={(100 + Math.sin(a) * 81 + 4).toFixed(1)} textAnchor="middle" fontSize="11" fill="#f1d99a">
              {g + "\uFE0E"}
            </text>
          );
        })}
      </svg>
    </div>
  );
}
