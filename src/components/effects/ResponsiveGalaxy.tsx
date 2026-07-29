"use client";

import { useState, useEffect } from "react";
import Galaxy from "./Galaxy";
import { useIsMobile } from "./MobileGuard";

export default function ResponsiveGalaxy() {
  const isMobile = useIsMobile();

  if (isMobile) return null;

  return (
    <Galaxy
      hueShift={0}
      saturation={0}
      glowIntensity={1.5}
      density={1.0}
      mouseRepulsion={true}
      mouseInteraction={true}
      twinkleIntensity={0.4}
      repulsionStrength={1.5}
      speed={0.6}
      transparent={true}
    />
  );
}
