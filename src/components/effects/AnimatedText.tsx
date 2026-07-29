"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

interface AnimatedTextProps {
  text: string;
  className?: string;
}

function AnimatedChar({ scrollYProgress, start, end, char }: {
  scrollYProgress: any;
  start: number;
  end: number;
  char: string;
}) {
  const opacity = useTransform(scrollYProgress, [start, end], [0.15, 1]);
  return (
    <motion.span style={{ opacity }} className="inline">
      {char === " " ? "\u00A0" : char}
    </motion.span>
  );
}

export function AnimatedChars({ text, className = "" }: AnimatedTextProps) {
  const ref = useRef<HTMLParagraphElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.8", "end 0.2"],
  });

  const chars = text.split("");

  return (
    <p ref={ref} className={"relative " + className}>
      <span className="opacity-0">{text}</span>
      <span className="absolute inset-0">
        {chars.map((char, i) => (
          <AnimatedChar
            key={i}
            scrollYProgress={scrollYProgress}
            start={i / chars.length}
            end={(i + 1) / chars.length}
            char={char}
          />
        ))}
      </span>
    </p>
  );
}
