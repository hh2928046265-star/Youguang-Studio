"use client";

import { useEffect, useRef } from "react";

interface Thread {
  baseY: number; phase: number; speed: number;
  amp1: number; amp2: number; amp3: number;
  wl1: number; wl2: number; wl3: number;
  opacity: number;
}

interface Star {
  x: number; y: number; life: number; maxLife: number;
  size: number; pulse: number; pulseSpeed: number;
}

export default function CanvasAmbiance() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let animId: number;
    let w = 0, h = 0;
    const threads: Thread[] = [];
    const stars: Star[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 20条极细丝线
    for (let i = 0; i < 20; i++) {
      threads.push({
        baseY: h * 0.1 + (h * 0.8 * i) / 20,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0002 + Math.random() * 0.0004,
        amp1: 20 + Math.random() * 70,
        amp2: 8 + Math.random() * 30,
        amp3: 3 + Math.random() * 12,
        wl1: 0.0008 + Math.random() * 0.0025,
        wl2: 0.003 + Math.random() * 0.007,
        wl3: 0.008 + Math.random() * 0.015,
        opacity: 0.08 + Math.random() * 0.14,
      });
    }

    // 50颗固定星点
    for (let i = 0; i < 50; i++) {
      stars.push({
        x: Math.random() * w,
        y: Math.random() * h,
        life: 1, maxLife: 3 + Math.random() * 8,
        size: 0.3 + Math.random() * 0.8,
        pulse: Math.random() * Math.PI * 2,
        pulseSpeed: 0.005 + Math.random() * 0.02,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // 上层丝线 — 更细更亮
      threads.forEach((t, i) => {
        t.phase += t.speed;
        const isTop = i >= 14;

        ctx.beginPath();
        for (let x = 0; x < w; x += 1) {
          let y = t.baseY;
          y += Math.sin(x * t.wl1 + t.phase) * t.amp1;
          y += Math.sin(x * t.wl2 + t.phase * 1.6) * t.amp2;
          y += Math.sin(x * t.wl3 + t.phase * 2.3) * t.amp3;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        const alpha = isTop ? t.opacity * 0.7 : t.opacity;
        const lw = isTop ? 0.15 : 0.35;

        ctx.strokeStyle = "rgba(185,154,91," + alpha + ")";
        ctx.lineWidth = lw;
        ctx.shadowColor = "rgba(185,154,91," + (alpha * 0.4) + ")";
        ctx.shadowBlur = isTop ? 15 : 25;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 固定星点 — 微微闪烁
      stars.forEach((s) => {
        s.pulse += s.pulseSpeed;
        const brightness = 0.3 + 0.7 * (0.5 + 0.5 * Math.sin(s.pulse));
        const alpha = brightness * 0.7;
        const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        grad.addColorStop(0, "rgba(212,185,120," + alpha + ")");
        grad.addColorStop(0.5, "rgba(185,154,91," + (alpha * 0.4) + ")");
        grad.addColorStop(1, "rgba(185,154,91,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
    };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1]" />;
}
