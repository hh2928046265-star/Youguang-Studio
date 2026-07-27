"use client";

import { useEffect, useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

export default function Cursor() {
  const [mounted, setMounted] = useState(false);
  const [hovering, setHovering] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);
  const springX = useSpring(cursorX, { stiffness: 200, damping: 30 });
  const springY = useSpring(cursorY, { stiffness: 200, damping: 30 });

  useEffect(() => {
    setMounted(true);
    document.body.classList.add("custom-cursor");

    const move = (e: MouseEvent) => { cursorX.set(e.clientX); cursorY.set(e.clientY); };
    const over = () => setHovering(true);
    const out = () => setHovering(false);

    window.addEventListener("mousemove", move);

    const links = document.querySelectorAll("a, button, [data-cursor-hover]");
    links.forEach(l => { l.addEventListener("mouseenter", over); l.addEventListener("mouseleave", out); });

    return () => {
      document.body.classList.remove("custom-cursor");
      window.removeEventListener("mousemove", move);
    };
  }, [cursorX, cursorY]);

  if (!mounted) return null;

  return (
    <>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10000] mix-blend-difference"
        style={{ x: springX, y: springY }}
      >
        <motion.div
          animate={{ scale: hovering ? 2.5 : 1, opacity: hovering ? 0.5 : 1 }}
          transition={{ duration: 0.2 }}
          className="w-5 h-5 -ml-2.5 -mt-2.5 rounded-full border border-white"
        />
      </motion.div>
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[10001]"
        style={{ x: cursorX, y: cursorY }}
      >
        <motion.div
          animate={{ scale: hovering ? 0 : 1 }}
          transition={{ duration: 0.15 }}
          className="w-1.5 h-1.5 -ml-[3px] -mt-[3px] rounded-full bg-gold"
        />
      </motion.div>
    </>
  );
}
