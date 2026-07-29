"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let raf: number;
    let targetX = -150;
    let targetY = -150;
    let currentX = -150;
    let currentY = -150;
    const isMobile = window.innerWidth < 768;

    const moveTo = (x: number, y: number) => {
      targetX = x - 150;
      targetY = y - 150;
    };

    const onMouseMove = (e: MouseEvent) => moveTo(e.clientX, e.clientY);
    const onTouchMove = (e: TouchEvent) => {
      const t = e.touches[0];
      if (t) moveTo(t.clientX, t.clientY);
    };

    const animate = () => {
      currentX += (targetX - currentX) * (isMobile ? 0.12 : 0.08);
      currentY += (targetY - currentY) * (isMobile ? 0.12 : 0.08);
      glow.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });
    window.addEventListener("touchmove", onTouchMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("touchmove", onTouchMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ willChange: "transform" }}
    >
      <div
        className="absolute rounded-full"
        style={{
          width: "300px",
          height: "300px",
          background: "radial-gradient(ellipse at center, rgba(185,154,91,0.06) 0%, rgba(185,154,91,0.02) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}