"use client";

import { useRef, useState, ReactNode } from "react";

export function ShineSweep({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: -200, opacity: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = e.clientX - rect.left;
    setPos({ x, opacity: 0.3 });
  };

  return (
    <div
      ref={ref}
      className={"relative overflow-hidden " + className}
      onMouseMove={handleMove}
      onMouseLeave={() => setPos({ x: -200, opacity: 0 })}
    >
      {children}
      <div
        className="pointer-events-none absolute inset-y-0 w-[120px] transition-opacity duration-500"
        style={{
          left: pos.x - 60,
          opacity: pos.opacity,
          background: "linear-gradient(90deg, transparent 0%, rgba(185,154,91,0.15) 40%, rgba(212,185,120,0.06) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}

export function ImageZoom({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"group overflow-hidden " + className}>
      <div className="transition-transform duration-[1.2s] ease-out group-hover:scale-[1.04]">
        {children}
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
    </div>
  );
}

export function DynamicLight({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [glowPos, setGlowPos] = useState({ x: "50%", y: "50%", opacity: 0 });

  const handleMove = (e: React.MouseEvent) => {
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setGlowPos({ x: x + "%", y: y + "%", opacity: 1 });
  };

  return (
    <div
      ref={ref}
      className={"relative " + className}
      onMouseMove={handleMove}
      onMouseLeave={() => setGlowPos({ x: "50%", y: "50%", opacity: 0 })}
    >
      <div
        className="pointer-events-none absolute inset-0 rounded-inherit transition-opacity duration-400 z-10"
        style={{
          opacity: glowPos.opacity,
          background: "radial-gradient(circle 200px at " + glowPos.x + " " + glowPos.y + ", rgba(185,154,91,0.08), transparent 70%)",
        }}
      />
      {children}
    </div>
  );
}

export function BorderGlow({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={"relative group " + className}>
      <div className="absolute -inset-[1px] rounded-[inherit] bg-gradient-to-r from-gold/0 via-gold/40 to-gold/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-pulse pointer-events-none"
        style={{ animationDuration: "3s" }}
      />
      {children}
    </div>
  );
}
