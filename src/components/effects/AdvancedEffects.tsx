"use client";

import { useEffect, useRef, useState, ReactNode } from "react";

export function Parallax3D({ children, speed = 0.02 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [transform, setTransform] = useState("");

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      const cx = window.innerWidth / 2;
      const cy = window.innerHeight / 2;
      const dx = (e.clientX - cx) / cx;
      const dy = (e.clientY - cy) / cy;
      const tx = dx * speed * 20;
      const ty = dy * speed * 10;
      const ry = dx * speed * 5;
      const rx = -dy * speed * 5;
      setTransform("perspective(1000px) rotateY(" + ry + "deg) rotateX(" + rx + "deg) translateX(" + tx + "px) translateY(" + ty + "px)");
    };
    window.addEventListener("mousemove", onMove, { passive: true });
    return () => window.removeEventListener("mousemove", onMove);
  }, [speed]);

  return (
    <div ref={ref} style={{ transform, transition: "transform 0.6s ease-out", willChange: "transform" }}>
      {children}
    </div>
  );
}

export function FloatAnimation({ children, amplitude = 8, period = 4 }: { children: ReactNode; amplitude?: number; period?: number }) {
  return (
    <div
      className="animate-float"
      style={{
        animationDuration: period + "s",
        "--float-amp": amplitude + "px",
      } as React.CSSProperties}
    >
      {children}
    </div>
  );
}

export function ScrollBgGradient() {
  return (
    <div className="fixed inset-0 pointer-events-none z-0 transition-colors duration-1000" id="scroll-bg" />
  );
}

export function ScrollBgScript() {
  useEffect(() => {
    const bg = document.getElementById("scroll-bg");
    if (!bg) return;

    const sections = [0, 0.12, 0.25, 0.42, 0.58, 0.72, 0.85, 1];
    const colors = [
      "#0A0A0A", "#0B0B0B", "#0C0C0C", "#0D0D0C",
      "#0C0C0B", "#0B0B0B", "#0A0A0A", "#0A0A0A",
    ];

    const onScroll = () => {
      const scrollRatio = window.scrollY / (document.body.scrollHeight - window.innerHeight);
      let idx = 0;
      for (let i = 0; i < sections.length - 1; i++) {
        if (scrollRatio >= sections[i] && scrollRatio <= sections[i + 1]) {
          idx = i; break;
        }
      }
      bg.style.background = colors[idx];
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return null;
}

export function TextMask({ text, src }: { text: string; src: string }) {
  return (
    <h1
      className="font-serif text-[20vw] md:text-[16vw] lg:text-[14vw] font-light leading-[0.9] tracking-tighter"
      style={{
        backgroundImage: "url(" + src + ")",
        backgroundSize: "cover",
        backgroundPosition: "center",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        color: "transparent",
        filter: "brightness(1.1) contrast(1.05)",
      }}
    >
      {text}
    </h1>
  );
}
