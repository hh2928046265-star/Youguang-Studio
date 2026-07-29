"use client";

import { useEffect, useRef } from "react";

export default function CursorGlow() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const glow = glowRef.current;
    if (!glow) return;

    const onMove = (e: MouseEvent) => {
      const x = e.clientX - 200;
      const y = e.clientY - 200;
      glow.style.transform = "translate(" + x + "px, " + y + "px)";
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={glowRef}
      className="pointer-events-none fixed inset-0 z-[100]"
      style={{ willChange: "transform" }}
    >
      <div className="absolute w-[400px] h-[400px] rounded-full opacity-[0.03] transition-transform duration-700 ease-out"
        style={{
          background: "radial-gradient(circle, #B99A5B 0%, #D4B978 30%, transparent 70%)",
          filter: "blur(60px)",
        }}
      />
    </div>
  );
}
