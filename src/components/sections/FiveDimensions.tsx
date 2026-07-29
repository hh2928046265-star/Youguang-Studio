'use client';

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useContent } from "@/lib/content-context";

const nodeColors = [
  "#9AAD94",
  "#D4B978",
  "#A8A49E",
  "#BBA89A",
  "#8CAAA0",
];

export default function FiveDimensions() {
  const { content } = useContent();
  const { dimensionNodes } = content;
  const containerRef = useRef<HTMLDivElement>(null);
  const [hoveredNode, setHoveredNode] = useState<string | null>(null);

  const centerX = 50;
  const centerY = 50;

  return (
    <section id="works" className="min-h-screen flex items-center px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full">
        <div className="text-center mb-16 md:mb-24">
          <motion.p
            className="text-xs md:text-sm text-stone-light tracking-[0.3em] uppercase mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            Creator Ecosystem
          </motion.p>
          <motion.h2
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-ink tracking-tight gold-shimmer"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            五维创造体系
          </motion.h2>
        </div>

        <div ref={containerRef} className="relative w-full" style={{ paddingBottom: "70%" }}>
          <div className="absolute inset-0">
            {/* 连接线 — 最低层 */}
            <svg className="absolute inset-0 w-full h-full z-0" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {dimensionNodes.map((node) => (
                <motion.line
                  key={"line-" + node.id}
                  x1={centerX} y1={centerY}
                  x2={node.x} y2={node.y}
                  stroke="#B99A5B"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.35 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                />
              ))}
            </svg>

            {/* 中心节点 — z-20 */}
            <motion.div
              className="absolute transform -translate-x-1/2 -translate-y-1/2 z-20"
              style={{ left: centerX + "%", top: centerY + "%" }}
              initial={{ scale: 0, opacity: 0 }}
              whileInView={{ scale: 1, opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-gold flex items-center justify-center shadow-2xl shadow-gold/20">
                <span className="text-black font-serif text-sm md:text-base tracking-wider">周游</span>
              </div>
            </motion.div>

            {/* 卫星节点 — z-10，加背景遮挡线 */}
            {dimensionNodes.map((node, index) => {
              const color = nodeColors[index] || "#D4B978";
              return (
                <motion.a
                  key={node.id}
                  href={node.href}
                  className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer z-10"
                  style={{ left: node.x + "%", top: node.y + "%" }}
                  initial={{ scale: 0, opacity: 0 }}
                  whileInView={{ scale: 1, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.6,
                    delay: 0.5 + index * 0.12,
                    ease: [0.25, 0.1, 0.25, 1],
                  }}
                  onMouseEnter={() => setHoveredNode(node.id)}
                  onMouseLeave={() => setHoveredNode(null)}
                  animate={{ y: hoveredNode === node.id ? -6 : 0, scale: hoveredNode === node.id ? 1.05 : 1 }}
                >
                  <div
                    className="relative px-5 py-3 md:px-6 md:py-4 rounded-2xl border transition-all duration-500"
                    style={{
                      backgroundColor: "#0A0A0A",
                      borderColor: color,
                      borderWidth: "1px",
                    }}
                  >
                    <p className="text-sm md:text-base font-serif tracking-wide whitespace-nowrap transition-colors duration-500"
                      style={{ color: hoveredNode === node.id ? color : color }}>
                      {node.name}
                    </p>
                    <p className="text-xs mt-1 tracking-wider transition-colors duration-500"
                      style={{ color: color, opacity: hoveredNode === node.id ? 0.9 : 0.5 }}>
                      {node.subtitle}
                    </p>
                  </div>
                </motion.a>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
