"use client";

import { motion } from "framer-motion";

interface DiagonalDividerProps {
  direction?: "left" | "right";
  className?: string;
}

export default function DiagonalDivider({ direction = "left", className = "" }: DiagonalDividerProps) {
  const rotate = direction === "left" ? "rotate-[-20deg]" : "rotate-[20deg]";
  return (
    <motion.div
      className={"hidden md:block h-px w-24 bg-gold/40 " + rotate + " " + className}
      initial={{ scaleX: 0, opacity: 0 }}
      whileInView={{ scaleX: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    />
  );
}
