"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <div ref={ref} className="flex justify-center py-16">
      <motion.div
        className="w-16 h-px"
        style={{ background: "linear-gradient(90deg, transparent, #B99A5B, transparent)" }}
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
      />
    </div>
  );
}
