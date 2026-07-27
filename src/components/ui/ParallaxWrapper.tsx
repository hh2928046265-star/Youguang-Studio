"use client";

import { useRef, ReactNode } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface ParallaxWrapperProps {
  children: ReactNode;
  className?: string;
}

export default function ParallaxWrapper({ children, className = "" }: ParallaxWrapperProps) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });
  const y = useTransform(scrollYProgress, [0, 1], [40, -40]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.96, 1, 0.96]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0.85, 1, 1, 0.85]);
  const rotateX = useTransform(scrollYProgress, [0, 0.5, 1], [1, 0, -1]);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale, opacity, rotateX, perspective: 1200 }}
    >
      {children}
    </motion.div>
  );
}
