"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxRevealProps {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "left" | "right";
  distance?: number;
}

export default function ParallaxReveal({ children, className = "", direction = "up", distance = 80 }: ParallaxRevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });

  const xDir = direction === "left" ? -distance : direction === "right" ? distance : 0;
  const yDir = direction === "up" ? distance : 0;

  const x = useTransform(scrollYProgress, [0, 0.3, 1], [xDir, 0, -xDir * 0.3]);
  const y = useTransform(scrollYProgress, [0, 0.3, 1], [yDir, 0, -yDir * 0.3]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.92, 1]);

  return (
    <motion.div ref={ref} className={className} style={{ x, y, opacity, scale }}>
      {children}
    </motion.div>
  );
}
