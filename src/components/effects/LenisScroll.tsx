"use client";

import { useEffect, useRef, ReactNode } from "react";
import Lenis from "lenis";

export default function LenisScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    // 移动端不用 Lenis，用原生滚动
    if (window.innerWidth < 768) return;

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }
    requestAnimationFrame(raf);

    return () => lenis.destroy();
  }, []);

  return <>{children}</>;
}
