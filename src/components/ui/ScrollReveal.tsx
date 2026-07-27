"use client";

import { motion, useInView } from "framer-motion";
import { useRef, ReactNode } from "react";

interface ScrollRevealProps {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "down" | "left" | "right";
  duration?: number;
  viewfinder?: boolean;
  clip?: "circle" | "top" | "bottom" | "left" | "right";
}

const directionOffset: Record<string, { x?: number; y?: number }> = {
  up: { y: 60 },
  down: { y: -60 },
  left: { x: 60 },
  right: { x: -60 },
};

const clipInitial: Record<string, string> = {
  circle: "circle(0% at 50% 50%)",
  top: "inset(0 0 100% 0)",
  bottom: "inset(100% 0 0 0)",
  left: "inset(0 100% 0 0)",
  right: "inset(0 0 0 100%)",
};

export default function ScrollReveal({
  children,
  className = "",
  delay = 0,
  direction = "up",
  duration = 0.8,
  viewfinder = false,
  clip,
}: ScrollRevealProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const offset = directionOffset[direction];

  const clipStyle = clip
    ? { clipPath: clipInitial[clip], WebkitClipPath: clipInitial[clip] }
    : {};

  const clipAnimate = clip
    ? { clipPath: "inset(0 0 0 0)", WebkitClipPath: "inset(0 0 0 0)" }
    : {};

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{
        opacity: 0,
        filter: viewfinder ? "brightness(0.3) blur(2px)" : "brightness(0.6)",
        ...offset,
        ...clipStyle,
      }}
      animate={
        isInView
          ? {
              opacity: 1,
              filter: "brightness(1) blur(0px)",
              x: 0,
              y: 0,
              ...clipAnimate,
            }
          : {}
      }
      transition={{
        duration,
        delay,
        ease: [0.25, 0.1, 0.25, 1],
      }}
    >
      {children}
    </motion.div>
  );
}
