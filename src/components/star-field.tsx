"use client";

import { useEffect, useRef } from "react";

/*
  Page-wide starry backdrop. Fixed canvas behind all content:
  - three depth layers of stars that twinkle at their own pace
  - slight parallax against scroll (near stars drift more)
  - a rare shooting star
  Static when the visitor prefers reduced motion; paused when the tab is hidden.
*/
type Star = { x: number; y: number; r: number; layer: number; phase: number; speed: number; hue: number };

const LAYERS = [
  { count: 0.00026, size: [0.5, 1.0], parallax: 0.02, alpha: 0.7 },
  { count: 0.0001, size: [0.9, 1.5], parallax: 0.05, alpha: 0.9 },
  { count: 0.00003, size: [1.4, 2.2], parallax: 0.1, alpha: 1 },
];
const HUES = ["255,255,255", "246,227,168", "201,214,255"];

export default function StarField() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let stars: Star[] = [];
    let dpr = 1;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      stars = [];
      LAYERS.forEach((L, layer) => {
        const n = Math.round(w * h * L.count);
        for (let i = 0; i < n; i++) {
          stars.push({
            x: Math.random() * w,
            y: Math.random() * h,
            r: L.size[0] + Math.random() * (L.size[1] - L.size[0]),
            layer,
            phase: Math.random() * Math.PI * 2,
            speed: 0.4 + Math.random() * 1.6,
            hue: Math.floor(Math.random() * HUES.length),
          });
        }
      });
    };

    let shoot: { x: number; y: number; vx: number; vy: number; life: number } | null = null;
    let nextShoot = performance.now() + 4000 + Math.random() * 5000;
    let raf = 0;

    const draw = (now: number) => {
      const t = now / 1000;
      const scroll = window.scrollY;
      ctx.clearRect(0, 0, w, h);

      for (const s of stars) {
        const L = LAYERS[s.layer];
        // Wrap vertically so scrolling never runs out of stars
        let y = (s.y - scroll * L.parallax) % h;
        if (y < 0) y += h;
        const tw = reduce ? 0.8 : 0.55 + 0.45 * Math.sin(t * s.speed + s.phase);
        const a = L.alpha * tw;
        ctx.fillStyle = `rgba(${HUES[s.hue]},${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.arc(s.x, y, s.r, 0, Math.PI * 2);
        ctx.fill();
        // Bright near stars get a soft cross-glint
        if (s.layer === 2 && tw > 0.85) {
          ctx.strokeStyle = `rgba(${HUES[s.hue]},${(a * 0.35).toFixed(3)})`;
          ctx.lineWidth = 0.6;
          ctx.beginPath();
          ctx.moveTo(s.x - s.r * 4, y);
          ctx.lineTo(s.x + s.r * 4, y);
          ctx.moveTo(s.x, y - s.r * 4);
          ctx.lineTo(s.x, y + s.r * 4);
          ctx.stroke();
        }
      }

      if (!reduce) {
        if (!shoot && now > nextShoot) {
          shoot = { x: Math.random() * w * 0.7 + w * 0.2, y: Math.random() * h * 0.35, vx: 7 + Math.random() * 3, vy: 3 + Math.random() * 2, life: 1 };
          nextShoot = now + 8000 + Math.random() * 9000;
        }
        if (shoot) {
          const tail = 90;
          const len = Math.hypot(shoot.vx, shoot.vy);
          const g = ctx.createLinearGradient(shoot.x, shoot.y, shoot.x - (shoot.vx / len) * tail, shoot.y - (shoot.vy / len) * tail);
          g.addColorStop(0, `rgba(255,244,214,${shoot.life})`);
          g.addColorStop(1, "rgba(255,244,214,0)");
          ctx.strokeStyle = g;
          ctx.lineWidth = 1.4;
          ctx.beginPath();
          ctx.moveTo(shoot.x, shoot.y);
          ctx.lineTo(shoot.x - (shoot.vx / len) * tail, shoot.y - (shoot.vy / len) * tail);
          ctx.stroke();
          shoot.x += shoot.vx;
          shoot.y += shoot.vy;
          shoot.life -= 0.012;
          if (shoot.life <= 0 || shoot.x > w + tail || shoot.y > h + tail) shoot = null;
        }
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };

    build();
    if (reduce) {
      draw(performance.now());
      const onScroll = () => draw(performance.now());
      window.addEventListener("scroll", onScroll, { passive: true });
      window.addEventListener("resize", () => { build(); draw(performance.now()); });
      return () => window.removeEventListener("scroll", onScroll);
    }

    raf = requestAnimationFrame(loop);
    const onResize = () => build();
    const onVis = () => {
      cancelAnimationFrame(raf);
      if (!document.hidden) raf = requestAnimationFrame(loop);
    };
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVis);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVis);
    };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none fixed inset-0 -z-10 h-full w-full" />;
}
