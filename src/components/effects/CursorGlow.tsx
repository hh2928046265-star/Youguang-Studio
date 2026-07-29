"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    let raf: number;
    let targetX = -300;
    let targetY = -300;
    let currentX = -300;
    let currentY = -300;

    const onMove = (e: MouseEvent) => {
      targetX = e.clientX - 300;
      targetY = e.clientY - 300;
    };

    const animate = () => {
      currentX += (targetX - currentX) * 0.06;
      currentY += (targetY - currentY) * 0.06;
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
          width: "600px",
          height: "600px",
          background: "radial-gradient(ellipse at center, rgba(185,154,91,0.06) 0%, rgba(185,154,91,0.025) 25%, rgba(185,154,91,0.005) 50%, transparent 70%)",
          filter: "blur(80px)",
        }}
      />
    </div>
  );
}
