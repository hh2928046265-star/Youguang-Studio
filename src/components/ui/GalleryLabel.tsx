"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface GalleryLabelProps {
  title: string;
  subtitle?: string;
  year?: string;
  medium?: string;
}

export default function GalleryLabel({ title, subtitle, year, medium }: GalleryLabelProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      className="font-sans text-stone tracking-wide"
      initial={{ opacity: 0, x: -20 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ duration: 0.6, delay: 0.3 }}
    >
      <div className="w-8 h-[2px] bg-gold mb-3" />
      {year && <p className="text-xs text-stone-light tracking-[0.15em] uppercase mb-1">{year}</p>}
      <h4 className="text-sm font-medium text-ink tracking-[0.05em]">{title}</h4>
      {subtitle && <p className="text-xs text-stone-light italic mt-0.5">{subtitle}</p>}
      {medium && <p className="text-xs text-stone-light mt-1">{medium}</p>}
    </motion.div>
  );
}
