"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView } from "framer-motion";

// 滚动入场：子元素逐个淡入上滑
export function StaggerReveal({ children, className = "", staggerDelay = 0.08 }: { children: ReactNode; className?: string; staggerDelay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className={className}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
      variants={{
        hidden: {},
        visible: { transition: { staggerChildren: staggerDelay } },
      }}
    >
      {children}
    </motion.div>
  );
}

// 单个子元素：淡入+上滑
export function RevealItem({ children, className = "", delay = 0 }: { children: ReactNode; className?: string; delay?: number }) {
  return (
    <motion.div
      className={className}
      variants={{
        hidden: { opacity: 0, y: 40 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.7, delay, ease: [0.25, 0.1, 0.25, 1] } },
      }}
    >
      {children}
    </motion.div>
  );
}

// 滚动视差：图片随滚动微移
export function ScrollParallax({ children, speed = 0.15 }: { children: ReactNode; speed?: number }) {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div ref={ref} className="relative overflow-hidden">
      <motion.div
        className="w-full"
        style={{ y: 0 }}
        whileInView={{
          y: [-30 * speed, 30 * speed],
        }}
        transition={{
          y: {
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse",
            ease: "easeInOut",
          },
        }}
        viewport={{ once: false }}
      >
        {children}
      </motion.div>
    </div>
  );
}

// 金色装饰线：入场绘制
export function GoldLine({ className = "" }: { className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div ref={ref} className={"mx-auto " + className}>
      <motion.div
        className="h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent"
        initial={{ scaleX: 0, opacity: 0 }}
        animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
        transition={{ duration: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
        style={{ originX: 0 }}
      />
    </div>
  );
}

// 脉冲点：浮动滚动指示器
export function PulseDot({ className = "" }: { className?: string }) {
  return (
    <div className={"flex flex-col items-center gap-2 " + className}>
      <motion.div
        className="w-1.5 h-1.5 rounded-full bg-gold/60"
        animate={{ opacity: [0.3, 1, 0.3], scale: [0.8, 1.2, 0.8] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="w-1 h-1 rounded-full bg-gold/40"
        animate={{ opacity: [0.2, 0.8, 0.2] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
      />
      <motion.div
        className="w-0.5 h-0.5 rounded-full bg-gold/30"
        animate={{ opacity: [0.1, 0.6, 0.1] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
      />
    </div>
  );
}
