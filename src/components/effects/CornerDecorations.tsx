"use client";

import { motion } from "framer-motion";

export default function CornerDecorations() {
  const corners = [
    { pos: "top-12 left-12", emoji: "✦", size: "text-2xl md:text-3xl", delay: 0 },
    { pos: "top-16 right-16", emoji: "◈", size: "text-xl md:text-2xl", delay: 0.2 },
    { pos: "bottom-20 left-20", emoji: "◆", size: "text-2xl md:text-3xl", delay: 0.4 },
    { pos: "bottom-16 right-12", emoji: "◇", size: "text-xl md:text-2xl", delay: 0.6 },
  ];

  return (
    <>
      {corners.map((c, i) => (
        <motion.div
          key={i}
          className={"absolute " + c.pos + " " + c.size + " text-gold/20 pointer-events-none z-[1]"}
          initial={{ opacity: 0, rotate: -20 }}
          animate={{ opacity: 1, rotate: 0 }}
          transition={{ duration: 1, delay: c.delay, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {c.emoji}
        </motion.div>
      ))}
    </>
  );
}
