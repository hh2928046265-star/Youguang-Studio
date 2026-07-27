"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface WordRevealProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function WordReveal({ text, className = "", delay = 0 }: WordRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  const words = text.split(" ");

  return (
    <span ref={ref} className={className}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden">
          <motion.span
            className="inline-block"
            initial={{ y: "100%" }}
            animate={isInView ? { y: 0 } : {}}
            transition={{ duration: 0.6, delay: delay + i * 0.08, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {word + "\u00A0"}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
