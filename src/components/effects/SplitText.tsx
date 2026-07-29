"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SplitTextProps {
  text: string;
  className?: string;
  delay?: number;
}

export default function SplitText({ text, className = "", delay = 0 }: SplitTextProps) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className={"overflow-hidden " + className}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          className="inline-block"
          initial={{ y: 80, opacity: 0, rotateX: -40 }}
          animate={inView ? { y: 0, opacity: 1, rotateX: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: delay + i * 0.03,
            ease: [0.25, 0.1, 0.25, 1],
          }}
        >
          {char === " " ? "\u00A0" : char}
        </motion.span>
      ))}
    </div>
  );
}
