"use client";

import { useState, useEffect } from "react";
import Galaxy from "./Galaxy";

export default function ResponsiveGalaxy() {
  const [density, setDensity] = useState(1.0);
  const [glowIntensity, setGlowIntensity] = useState(1.5);

  useEffect(() => {
    const update = () => {
      if (window.innerWidth < 768) {
        setDensity(1.0);
        setGlowIntensity(1.5);
      } else {
        setDensity(1.0);
        setGlowIntensity(1.5);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  return (
    <Galaxy
      hueShift={0}
      saturation={0}
      glowIntensity={glowIntensity}
      density={density}
      mouseRepulsion={false}
      mouseInteraction={false}
      twinkleIntensity={0.3}
      repulsionStrength={0}
      speed={0.4}
      transparent={true}
    />
  );
}
