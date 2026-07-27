"use client";

import { motion, useMotionValue, useSpring } from "framer-motion";
import { ReactNode, useRef } from "react";

interface CenterProximityProps {
  children: ReactNode;
  className?: string;
}

export default function CenterProximity({ children, className = "" }: CenterProximityProps) {
  const ref = useRef<HTMLDivElement>(null);
  const scale = useSpring(1, { stiffness: 200, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const dist = Math.sqrt((e.clientX - centerX) ** 2 + (e.clientY - centerY) ** 2);
    const maxDist = Math.sqrt((rect.width / 2) ** 2 + (rect.height / 2) ** 2);
    const proximity = Math.max(0, 1 - dist / maxDist);
    scale.set(1 + proximity * 0.03);
  };

  const handleMouseLeave = () => scale.set(1);

  return (
    <motion.div
      ref={ref}
      className={className}
      style={{ scale }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}
