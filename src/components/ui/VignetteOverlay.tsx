"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VignetteOverlay() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.12, 0.03, 0, 0.03, 0.12]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-[2]">
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          background:
            "radial-gradient(ellipse at center, transparent 60%, #000000 100%)",
        }}
      />
    </div>
  );
}
