"use client";

import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Ripple {
  id: number;
  x: number;
  y: number;
}

let globalId = 0;

export default function ClickRipple() {
  const [ripples, setRipples] = useState<Ripple[]>([]);

  const addRipple = useCallback((e: MouseEvent) => {
    const newRipple = { id: ++globalId, x: e.clientX, y: e.clientY };
    setRipples(prev => [...prev.slice(-8), newRipple]);
  }, []);

  useEffect(() => {
    window.addEventListener("click", addRipple);
    return () => window.removeEventListener("click", addRipple);
  }, [addRipple]);

  return (
    <div className="ripple-container">
      <AnimatePresence>
        {ripples.map(r => (
          <motion.div
            key={r.id}
            className="absolute rounded-full border border-gold/40"
            style={{ left: r.x, top: r.y }}
            initial={{ width: 0, height: 0, x: 0, y: 0, opacity: 0.6 }}
            animate={{ width: 300, height: 300, x: -150, y: -150, opacity: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
          />
        ))}
      </AnimatePresence>
    </div>
  );
}
