"use client";

import { useEffect, useRef } from "react";

interface SilkThread {
  baseY: number;
  phase: number;
  speed: number;
  amplitudes: number[];
  wavelengths: number[];
  opacity: number;
  hue: number;
}

interface DustParticle {
  x: number; y: number;
  life: number; maxLife: number;
  size: number; vx: number; vy: number;
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
    const threads: SilkThread[] = [];
    const dust: DustParticle[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 多条丝绸线 — 不同振幅、波长叠加，模拟丝滑曲线
    for (let i = 0; i < 14; i++) {
      threads.push({
        baseY: h * 0.2 + Math.random() * h * 0.6,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0002 + Math.random() * 0.0006,
        amplitudes: [
          30 + Math.random() * 80,
          15 + Math.random() * 40,
          8 + Math.random() * 20,
        ],
        wavelengths: [
          0.001 + Math.random() * 0.004,
          0.003 + Math.random() * 0.008,
          0.006 + Math.random() * 0.012,
        ],
        opacity: 0.04 + Math.random() * 0.08,
        hue: 185 + Math.random() * 10, // gold range
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // 角落光晕
      const drawCornerGlow = (cx: number, cy: number, radius: number, alpha: number) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
        grad.addColorStop(0, "rgba(185,154,91," + alpha + ")");
        grad.addColorStop(0.4, "rgba(185,154,91," + (alpha * 0.3) + ")");
        grad.addColorStop(1, "rgba(185,154,91,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(cx, cy, radius, 0, Math.PI * 2);
        ctx.fill();
      };

      drawCornerGlow(0, 0, w * 0.4, 0.015);
      drawCornerGlow(w, 0, w * 0.35, 0.012);
      drawCornerGlow(0, h, w * 0.3, 0.01);
      drawCornerGlow(w, h, w * 0.35, 0.013);

      // 丝绸曲线 — 多层正弦波叠加
      threads.forEach((t) => {
        t.phase += t.speed;
        ctx.beginPath();
        for (let x = 0; x < w; x += 2) {
          let y = t.baseY;
          for (let j = 0; j < t.amplitudes.length; j++) {
            y += Math.sin(x * t.wavelengths[j] + t.phase * (j + 1)) * t.amplitudes[j];
          }
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(185,154,91," + t.opacity + ")";
        ctx.lineWidth = 0.4;
        ctx.shadowColor = "rgba(185,154,91," + (t.opacity * 0.5) + ")";
        ctx.shadowBlur = 30;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 金色微尘 — 缓慢漂浮
      if (Math.random() < 0.3) {
        dust.push({
          x: Math.random() * w,
          y: Math.random() * h,
          life: 1, maxLife: 3 + Math.random() * 5,
          size: 0.3 + Math.random() * 1.5,
          vx: (Math.random() - 0.5) * 0.15,
          vy: -0.05 - Math.random() * 0.2,
        });
      }

      dust.forEach((d, i) => {
        d.x += d.vx;
        d.y += d.vy;
        d.life -= 0.003;
        if (d.life <= 0) { dust.splice(i, 1); return; }
        const fade = d.life < 0.2 ? d.life / 0.2 : 1;

        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size * 4);
        grad.addColorStop(0, "rgba(212,185,120," + (0.7 * fade) + ")");
        grad.addColorStop(0.3, "rgba(185,154,91," + (0.3 * fade) + ")");
        grad.addColorStop(1, "rgba(185,154,91,0)");
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.size * 4 * fade, 0, Math.PI * 2);
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
