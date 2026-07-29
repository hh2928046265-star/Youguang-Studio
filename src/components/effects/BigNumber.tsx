"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BigNumberProps {
  number: string;
  className?: string;
}

export default function BigNumber({ number, className = "" }: BigNumberProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.span
      ref={ref}
      className={"font-serif text-[14vw] md:text-[10vw] text-gold/10 leading-none select-none " + className}
      initial={{ opacity: 0, scale: 0.8 }}
      animate={inView ? { opacity: 1, scale: 1 } : {}}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {number}
    </motion.span>
  );
}
