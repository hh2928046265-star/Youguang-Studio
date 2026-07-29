"use client";

import { useEffect, ReactNode } from "react";
import Lenis from "lenis";

export default function LenisScroll({ children }: { children: ReactNode }) {
  useEffect(() => {
    const isMobile = window.innerWidth < 768;

    const lenis = new Lenis({
      duration: isMobile ? 0.8 : 1.2,
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