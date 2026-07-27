"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function VignetteOverlay() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [0.15, 0.04, 0, 0.04, 0.15]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-[2]">
      <motion.div
        className="absolute inset-0"
        style={{
          opacity,
          background:
            "radial-gradient(ellipse at center, transparent 55%, rgba(21,21,21,0.5) 100%)",
        }}
      />
    </div>
  );
}
