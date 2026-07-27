"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function LightSweep() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  const left = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], ["-20%", "30%", "70%", "120%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.15, 0.5, 0.85, 1], [0, 0.12, 0.06, 0.12, 0]);

  return (
    <div ref={ref} className="fixed inset-0 pointer-events-none z-[2]">
      <motion.div
        className="absolute top-0 bottom-0 w-[300px]"
        style={{
          left,
          opacity,
          background: "linear-gradient(90deg, transparent 0%, rgba(185,154,91,0.22) 40%, rgba(185,154,91,0.06) 60%, transparent 100%)",
        }}
      />
    </div>
  );
}
