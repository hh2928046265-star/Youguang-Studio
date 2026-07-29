"use client";

import { useRef, useState, useEffect } from "react";
import { motion } from "framer-motion";

interface MagnetProps {
  children: React.ReactNode;
  padding?: number;
  strength?: number;
  className?: string;
}

export default function Magnet({ children, padding = 100, strength = 3, className = "" }: MagnetProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 0, y: 0 });
  const [active, setActive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const handleMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect();
      const distX = e.clientX - (rect.left + rect.width / 2);
      const distY = e.clientY - (rect.top + rect.height / 2);
      const dist = Math.sqrt(distX * distX + distY * distY);

      if (dist < rect.width / 2 + padding) {
        setActive(true);
        setPos({ x: distX / strength, y: distY / strength });
      } else {
        setActive(false);
        setPos({ x: 0, y: 0 });
      }
    };

    const handleLeave = () => {
      setActive(false);
      setPos({ x: 0, y: 0 });
    };

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseleave", handleLeave);
    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [padding, strength]);

  return (
    <motion.div
      ref={ref}
      className={className}
      animate={{ x: pos.x, y: pos.y }}
      transition={{
        type: "spring",
        stiffness: active ? 150 : 50,
        damping: active ? 10 : 20,
        mass: 0.5,
      }}
      style={{ willChange: "transform" }}
    >
      {children}
    </motion.div>
  );
}