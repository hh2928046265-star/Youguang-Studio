'use client';

import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { useContent } from "@/lib/content-context";
import Magnet from "@/components/effects/Magnet";

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
        {/* Section Title */}
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
            className="font-serif text-4xl md:text-6xl lg:text-7xl text-ink tracking-tight"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            五维创造体系
          </motion.h2>
        </div>

        {/* Star Map */}
        <div
          ref={containerRef}
          className="relative w-full"
          style={{ paddingBottom: "75%" }}
        >
          <div className="absolute inset-0">
            {/* Connecting Lines */}
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid meet">
              {dimensionNodes.map((node) => (
                <motion.line
                  key={`line-${node.id}`}
                  x1={centerX}
                  y1={centerY}
                  x2={node.x}
                  y2={node.y}
                  stroke="#E8E3D8"
                  strokeWidth="0.3"
                  initial={{ pathLength: 0, opacity: 0 }}
                  whileInView={{ pathLength: 1, opacity: 0.6 }}
                  viewport={{ once: true }}
                  transition={{ duration: 2, delay: 0.3, ease: "easeInOut" }}
                />
              ))}
            </svg>

            {/* Center Node */}
            <motion.div
              className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
              style={{ left: `${centerX}%`, top: `${centerY}%` }}
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            >
              <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-ink flex items-center justify-center shadow-2xl shadow-ink/20">
                <span className="text-ivory font-serif text-sm md:text-base tracking-wider">周游</span>
              </div>
            </motion.div>

            {/* Satellite Nodes */}
            {dimensionNodes.map((node, index) => (
              <motion.a
                key={node.id}
                href={node.href}
                className="absolute z-10 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `${node.x}%`,
                  top: `${node.y}%`,
                }}
                initial={{ scale: 0, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                viewport={{ once: true }}
                transition={{
                  duration: 0.6,
                  delay: 0.5 + index * 0.1,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
                onMouseEnter={() => setHoveredNode(node.id)}
                onMouseLeave={() => setHoveredNode(null)}
                animate={{
                  y: hoveredNode === node.id ? -4 : 0,
                }}
              >
                <div
                  className="relative px-5 py-3 md:px-6 md:py-4 rounded-2xl border transition-all duration-500"
                  style={{
                    backgroundColor: hoveredNode === node.id ? node.color : "transparent",
                    borderColor: node.color,
                    borderWidth: "1px",
                  }}
                >
                  <p
                    className="text-sm md:text-base font-serif tracking-wide whitespace-nowrap transition-colors duration-500"
                    style={{
                      color: hoveredNode === node.id ? "#FAF7F2" : node.color,
                    }}
                  >
                    {node.name}
                  </p>
                  <p
                    className="text-xs mt-1 tracking-wider transition-colors duration-500"
                    style={{
                      color: hoveredNode === node.id ? "rgba(250,247,242,0.7)" : node.color,
                      opacity: 0.7,
                    }}
                  >
                    {node.subtitle}
                  </p>
                </div>
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}