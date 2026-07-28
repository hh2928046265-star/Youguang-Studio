"use client";

import { useState } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { useContent } from "@/lib/content-context";
import { useImageUrl } from "@/lib/use-file-url";

export default function Hero() {
  const { content } = useContent();
  const { siteConfig, heroBg: heroBgRaw } = content;
  const heroBg = useImageUrl(heroBgRaw);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);
  const springX = useSpring(mouseX, { stiffness: 40, damping: 30 });
  const springY = useSpring(mouseY, { stiffness: 40, damping: 30 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 24;
    const y = (e.clientY / window.innerHeight - 0.5) * 24;
    mouseX.set(x);
    mouseY.set(y);
  };

  return (
    <section
      className="relative h-screen w-full overflow-hidden hero-reflection"
      onMouseMove={handleMouseMove}
    >
      {/* Premium Gallery Atmosphere Background */}
      <motion.div
        className="absolute inset-0 z-0"
        style={{ x: springX, y: springY, scale: 1.1 }}
        initial={{ scale: 1.1 }}
        animate={{ scale: 1.1 }}
        transition={{ duration: 8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {/* Base: deep warm black */}
        <div className="absolute inset-0 bg-[#1a1815]" />

        {/* Custom image overlay if exists */}
        {heroBg && heroBg !== "/hero-bg.jpg" && (
          <div
            className="absolute inset-0 bg-cover bg-center opacity-40 mix-blend-overlay"
            style={{ backgroundImage: `url('${heroBg}')` }}
          />
        )}

        {/* Radial glow — gallery spotlight */}
        <div
          className="absolute inset-0"
          style={{
            background: "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(185,154,91,0.12) 0%, transparent 60%), radial-gradient(ellipse 50% 40% at 50% 45%, rgba(232,227,216,0.06) 0%, transparent 50%)",
          }}
        />

        {/* Subtle geometric lines — gallery architecture */}
        <div className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: "linear-gradient(rgba(185,154,91,0.5) 1px, transparent 1px), linear-gradient(90deg, rgba(185,154,91,0.5) 1px, transparent 1px)",
            backgroundSize: "120px 120px",
          }}
        />

        {/* Top vignette fade */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#1a1815] via-transparent to-[#1a1815]/80" />

        {/* Bottom mirror reflection gradient */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-ivory/40 via-ivory/10 to-transparent z-[6]" />
      </motion.div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-8">
        <motion.div
          className="overflow-hidden mb-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="font-serif text-6xl sm:text-7xl md:text-9xl lg:text-[160px] text-ivory tracking-tight leading-none"
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {siteConfig.name}
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-sm sm:text-base md:text-lg text-ivory/80 font-light tracking-[0.3em] uppercase mb-3"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {siteConfig.fullName}
        </motion.p>

        <motion.p
          className="text-xs sm:text-sm text-ivory/60 font-light tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {siteConfig.tagline}
        </motion.p>

        <motion.a
          href="#about"
          className="absolute bottom-12 flex items-center gap-3 text-ivory/70 hover:text-ivory transition-colors duration-500 group"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <span className="text-sm font-light tracking-[0.2em]">Explore Works</span>
          <motion.span
            className="inline-block text-lg"
            animate={{ x: [0, 8, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          >
            →
          </motion.span>
        </motion.a>
      </div>
    </section>
  );
}
