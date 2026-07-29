"use client";

import { useEffect, useRef } from "react";

interface SilkThread {
  baseY: number;
  phase: number;
  speed: number;
  amplitudes: number[];
  wavelengths: number[];
  opacity: number;
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

    for (let i = 0; i < 10; i++) {
      threads.push({
        baseY: h * 0.15 + Math.random() * h * 0.7,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0005,
        amplitudes: [
          50 + Math.random() * 100,
          20 + Math.random() * 50,
        ],
        wavelengths: [
          0.001 + Math.random() * 0.003,
          0.004 + Math.random() * 0.008,
        ],
        opacity: 0.12 + Math.random() * 0.15,
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // 角落强光晕
      const drawCornerGlow = (cx: number, cy: number, r: number, a: number) => {
        const grad = ctx.createRadialGradient(cx, cy, 0, cx, cy, r);
        grad.addColorStop(0, "rgba(185,154,91," + a + ")");
        grad.addColorStop(0.5, "rgba(185,154,91," + (a * 0.25) + ")");
        grad.addColorStop(1, "rgba(185,154,91,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(cx, cy, r, 0, Math.PI * 2); ctx.fill();
      };

      drawCornerGlow(0, 0, w * 0.5, 0.04);
      drawCornerGlow(w, 0, w * 0.4, 0.03);
      drawCornerGlow(0, h, w * 0.35, 0.025);
      drawCornerGlow(w, h, w * 0.4, 0.03);

      // 丝绸曲线
      threads.forEach((t) => {
        t.phase += t.speed;
        ctx.beginPath();
        for (let x = 0; x < w; x += 1) {
          let y = t.baseY;
          y += Math.sin(x * t.wavelengths[0] + t.phase) * t.amplitudes[0];
          y += Math.sin(x * t.wavelengths[1] + t.phase * 1.7) * t.amplitudes[1];
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(185,154,91," + t.opacity + ")";
        ctx.lineWidth = 0.6;
        ctx.shadowColor = "rgba(185,154,91,0.25)";
        ctx.shadowBlur = 50;
        ctx.stroke();
        ctx.shadowBlur = 0;
      });

      // 微尘
      if (Math.random() < 0.25) {
        dust.push({
          x: Math.random() * w, y: Math.random() * h,
          life: 1, maxLife: 4 + Math.random() * 6,
          size: 0.5 + Math.random() * 2,
          vx: (Math.random() - 0.5) * 0.1,
          vy: -0.08 - Math.random() * 0.25,
        });
      }

      dust.forEach((d, i) => {
        d.x += d.vx; d.y += d.vy;
        d.life -= 0.0025;
        if (d.life <= 0) { dust.splice(i, 1); return; }
        const fade = d.life < 0.15 ? d.life / 0.15 : 1;
        const grad = ctx.createRadialGradient(d.x, d.y, 0, d.x, d.y, d.size * 5);
        grad.addColorStop(0, "rgba(212,185,120," + (0.9 * fade) + ")");
        grad.addColorStop(0.3, "rgba(185,154,91," + (0.4 * fade) + ")");
        grad.addColorStop(1, "rgba(185,154,91,0)");
        ctx.fillStyle = grad;
        ctx.beginPath(); ctx.arc(d.x, d.y, d.size * 5 * fade, 0, Math.PI * 2); ctx.fill();
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
