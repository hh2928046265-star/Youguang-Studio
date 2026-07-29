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

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX - 150;
      targetY = e.clientY - 150;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.08;
      currentY += (targetY - currentY) * 0.08;
      glow.style.transform = "translate(" + currentX + "px, " + currentY + "px)";
      raf = requestAnimationFrame(animate);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
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
          background: "radial-gradient(ellipse at center, rgba(185,154,91,0.05) 0%, rgba(185,154,91,0.015) 40%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />
    </div>
  );
}
