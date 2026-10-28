"use client";

import { useEffect, useRef } from "react";

export default function CelestialCanvas() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animationFrameId: number;
    let width = (canvas.width = window.innerWidth);
    let height = (canvas.height = window.innerHeight);

    const handleResize = () => {
      if (!canvas) return;
      width = canvas.width = window.innerWidth;
      height = canvas.height = window.innerHeight;
    };

    window.addEventListener("resize", handleResize);

    // Mouse tracking with inertia
    let mouseX = width / 2;
    let mouseY = height / 2;
    let targetMouseX = width / 2;
    let targetMouseY = height / 2;

    const handleMouseMove = (e: MouseEvent) => {
      targetMouseX = e.clientX;
      targetMouseY = e.clientY;
    };

    window.addEventListener("mousemove", handleMouseMove);

    // Star & Constellation particles
    const numStars = Math.min(100, Math.floor((width * height) / 12000));
    const stars: {
      x: number;
      y: number;
      z: number;
      size: number;
      brightness: number;
      baseBrightness: number;
      pulseSpeed: number;
      vx: number;
      vy: number;
      color: string;
    }[] = [];

    const colors = [
      "rgba(212, 175, 55, ", // champagne gold
      "rgba(243, 229, 171, ", // soft gold
      "rgba(220, 224, 235, ", // cool silver
      "rgba(255, 255, 255, ", // white
    ];

    for (let i = 0; i < numStars; i++) {
      stars.push({
        x: (Math.random() - 0.5) * width * 1.5,
        y: (Math.random() - 0.5) * height * 1.5,
        z: Math.random() * 800 + 100,
        size: Math.random() * 2 + 0.8,
        brightness: Math.random() * 0.7 + 0.3,
        baseBrightness: Math.random() * 0.7 + 0.3,
        pulseSpeed: Math.random() * 0.02 + 0.005,
        vx: (Math.random() - 0.5) * 0.3,
        vy: (Math.random() - 0.5) * 0.3,
        color: colors[Math.floor(Math.random() * colors.length)],
      });
    }

    let time = 0;

    const render = () => {
      time += 0.015;

      // Mouse damping
      mouseX += (targetMouseX - mouseX) * 0.05;
      mouseY += (targetMouseY - mouseY) * 0.05;

      const mouseNormX = (mouseX / width - 0.5) * 2;
      const mouseNormY = (mouseY / height - 0.5) * 2;

      ctx.clearRect(0, 0, width, height);

      // Celestial radial gradient center
      const gradient = ctx.createRadialGradient(
        width / 2 + mouseNormX * 50,
        height * 0.4 + mouseNormY * 40,
        10,
        width / 2,
        height * 0.4,
        Math.max(width, height) * 0.75
      );
      gradient.addColorStop(0, "rgba(245, 158, 11, 0.08)");
      gradient.addColorStop(0.3, "rgba(139, 92, 246, 0.05)");
      gradient.addColorStop(0.7, "rgba(6, 6, 12, 0.2)");
      gradient.addColorStop(1, "rgba(6, 6, 12, 0)");

      ctx.fillStyle = gradient;
      ctx.fillRect(0, 0, width, height);

      // Render 3D constellation nodes
      const projectedStars: { x: number; y: number; brightness: number; size: number }[] = [];

      for (let i = 0; i < stars.length; i++) {
        const star = stars[i];

        star.x += star.vx;
        star.y += star.vy;

        // Wrap around bounds
        if (star.x < -width) star.x = width;
        if (star.x > width) star.x = -width;
        if (star.y < -height) star.y = height;
        if (star.y > height) star.y = -height;

        // 3D perspective projection
        const fov = 400;
        const scale = fov / (fov + star.z);

        const projX = width / 2 + (star.x - mouseNormX * 60) * scale;
        const projY = height / 2 + (star.y - mouseNormY * 60) * scale;

        const pulse = Math.sin(time * 5 + i) * 0.25;
        const alpha = Math.max(0.1, Math.min(1, star.baseBrightness + pulse));

        ctx.beginPath();
        ctx.arc(projX, projY, star.size * scale * 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `${star.color}${alpha})`;
        ctx.shadowColor = star.color + "1)";
        ctx.shadowBlur = 8;
        ctx.fill();

        projectedStars.push({ x: projX, y: projY, brightness: alpha, size: star.size * scale });
      }

      ctx.shadowBlur = 0;

      // Draw constellation connections between close stars
      ctx.lineWidth = 0.5;
      for (let i = 0; i < projectedStars.length; i++) {
        for (let j = i + 1; j < projectedStars.length; j++) {
          const dx = projectedStars[i].x - projectedStars[j].x;
          const dy = projectedStars[i].y - projectedStars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);

          if (dist < 110) {
            const lineAlpha = (1 - dist / 110) * 0.22;
            ctx.strokeStyle = `rgba(245, 158, 11, ${lineAlpha})`;
            ctx.beginPath();
            ctx.moveTo(projectedStars[i].x, projectedStars[i].y);
            ctx.lineTo(projectedStars[j].x, projectedStars[j].y);
            ctx.stroke();
          }
        }
      }

      animationFrameId = requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", handleResize);
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(animationFrameId);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="pointer-events-none fixed inset-0 z-0 opacity-40"
      aria-hidden="true"
    />
  );
}
