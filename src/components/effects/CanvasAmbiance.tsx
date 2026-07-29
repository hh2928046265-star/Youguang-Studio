"use client";

import { useEffect, useRef } from "react";

interface Thread { x: number; y: number; phase: number; speed: number; amplitude: number; wavelength: number; opacity: number; }
interface Spark { x: number; y: number; life: number; maxLife: number; size: number; }
interface Burst { x: number; y: number; particles: { angle: number; speed: number; life: number; size: number; }[]; }

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
    const sparks: Spark[] = [];
    const bursts: Burst[] = [];

    const resize = () => {
      w = canvas.width = window.innerWidth;
      h = canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    // 金色丝线
    for (let i = 0; i < 6; i++) {
      threads.push({
        x: 0, y: h * 0.3 + Math.random() * h * 0.4,
        phase: Math.random() * Math.PI * 2,
        speed: 0.0003 + Math.random() * 0.0008,
        amplitude: 40 + Math.random() * 100,
        wavelength: 0.002 + Math.random() * 0.006,
        opacity: 0.06 + Math.random() * 0.1,
      });
    }

    // 光斑爆炸
    const spawnBurst = () => {
      const x = Math.random() * w;
      const y = Math.random() * h;
      const count = 8 + Math.floor(Math.random() * 15);
      const particles = [];
      for (let i = 0; i < count; i++) {
        particles.push({
          angle: (Math.PI * 2 * i) / count + Math.random() * 0.5,
          speed: 0.3 + Math.random() * 1.2,
          life: 1,
          size: 0.5 + Math.random() * 2,
        });
      }
      bursts.push({ x, y, particles });
    };

    const animate = () => {
      ctx.clearRect(0, 0, w, h);

      // 丝线
      threads.forEach((t) => {
        t.phase += t.speed;
        ctx.beginPath();
        for (let x = 0; x < w; x += 4) {
          const y = t.y + Math.sin(x * t.wavelength + t.phase) * t.amplitude;
          if (x === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }
        ctx.strokeStyle = "rgba(185,154,91," + t.opacity + ")";
        ctx.lineWidth = 0.5;
        ctx.stroke();
      });

      // 微光闪现
      if (Math.random() < 0.15) {
        sparks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          life: 1, maxLife: 2 + Math.random() * 3,
          size: 1 + Math.random() * 3,
        });
      }

      sparks.forEach((s, i) => {
        s.life -= 0.008;
        if (s.life <= 0) { sparks.splice(i, 1); return; }
        const fade = s.life < 0.3 ? s.life / 0.3 : 1;
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size * fade, 0, Math.PI * 2);
        const gradient = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 3);
        gradient.addColorStop(0, "rgba(212,185,120," + (0.6 * fade) + ")");
        gradient.addColorStop(1, "rgba(185,154,91,0)");
        ctx.fillStyle = gradient;
        ctx.fill();
      });

      // 光斑爆炸
      if (Math.random() < 0.008) spawnBurst();

      bursts.forEach((b, bi) => {
        let allDead = true;
        b.particles.forEach((p) => {
          p.life -= 0.015;
          if (p.life <= 0) return;
          allDead = false;
          const dist = (1 - p.life) * 60 * p.speed;
          const px = b.x + Math.cos(p.angle) * dist;
          const py = b.y + Math.sin(p.angle) * dist;
          ctx.beginPath();
          ctx.arc(px, py, p.size * p.life, 0, Math.PI * 2);
          ctx.fillStyle = "rgba(185,154,91," + (p.life * 0.5) + ")";
          ctx.fill();
        });
        if (allDead) bursts.splice(bi, 1);
      });

      animId = requestAnimationFrame(animate);
    };

    animate();
    return () => { cancelAnimationFrame(animId); window.removeEventListener("resize", resize); };
  }, []);

  return <canvas ref={canvasRef} className="pointer-events-none fixed inset-0 z-[1]" />;
}
