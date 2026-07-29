"use client";

import { useState, useEffect, ReactNode } from "react";

export function useIsMobile() {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 768);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return isMobile;
}

export function MobileOnly({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  return isMobile ? <>{children}</> : null;
}

export function DesktopOnly({ children }: { children: ReactNode }) {
  const isMobile = useIsMobile();
  return isMobile ? null : <>{children}</>;
}
