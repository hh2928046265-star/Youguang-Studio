"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef } from "react";

interface LineDrawProps {
  delay?: number;
  className?: string;
}

export default function LineDraw({ delay = 0, className = "" }: LineDrawProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={className}>
      <svg width="100" height="2" viewBox="0 0 100 2" className="w-full">
        <motion.line
          x1="0" y1="1" x2="100" y2="1"
          stroke="#B99A5B"
          strokeWidth="0.5"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={isInView ? { pathLength: 1, opacity: 1 } : {}}
          transition={{ duration: 1.5, delay, ease: [0.25, 0.1, 0.25, 1] }}
        />
      </svg>
    </div>
  );
}
