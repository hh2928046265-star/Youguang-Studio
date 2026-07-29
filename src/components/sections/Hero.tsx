"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/content-context";
import { useVideoUrl, useImageUrl } from "@/lib/use-file-url";
import CountUp from "@/components/effects/CountUp";
import { Parallax3D, FloatAnimation } from "@/components/effects/AdvancedEffects";

export default function Hero() {
  const { content } = useContent();
  const { siteConfig, heroBg: heroBgRaw, heroVideo } = content;
  const heroImage = useImageUrl(heroBgRaw);
  const heroVideoUrl = useVideoUrl(heroVideo || "");

  const hasVideo = heroVideoUrl && heroVideoUrl.startsWith("data:") === false;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay loop muted playsInline
          src={heroVideoUrl}
        />
      ) : (
        <Parallax3D speed={0.03}>
          <div
            className="absolute inset-0 bg-cover bg-center scale-110"
            style={heroImage ? { backgroundImage: "url('" + heroImage + "')" } : {}}
          />
        </Parallax3D>
      )}

      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/90 z-[1]" />

      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-4 sm:px-6">
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="font-serif text-[24vw] sm:text-[18vw] md:text-[16vw] lg:text-[14vw] text-ink tracking-tighter leading-[0.85] gold-shimmer"
            style={{ letterSpacing: "-0.04em", fontWeight: 300 }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {siteConfig.name.replace("Studio", "")}
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-[8vw] sm:text-[5vw] md:text-[4vw] font-serif italic text-gold tracking-wide -mt-1 sm:-mt-2 md:-mt-4 mb-4 sm:mb-6"
          style={{ fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Studio
        </motion.p>

        {/* 手机端简化描述 */}
        <motion.p
          className="text-xs sm:text-sm md:text-base text-stone font-light tracking-[0.15em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          <span className="sm:hidden">{siteConfig.tagline}</span>
          <span className="hidden sm:inline">{siteConfig.fullName} · {siteConfig.tagline}</span>
        </motion.p>
      </div>

      <FloatAnimation amplitude={10} period={5}>
        <motion.div
          className="hidden md:block absolute right-8 md:right-16 top-[22%] z-10"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.5 }}
        >
          <CountUp target={5} prefix="+" suffix="路" className="text-4xl md:text-5xl font-serif text-ink font-light tracking-tight block" />
          <p className="text-xs text-stone-light mt-1 text-right tracking-[0.2em] uppercase">五维创造</p>
        </motion.div>
      </FloatAnimation>

      <FloatAnimation amplitude={8} period={6}>
        <motion.div
          className="hidden md:block absolute left-8 md:left-16 bottom-28 md:bottom-32 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.7 }}
        >
          <CountUp target={5} className="text-4xl md:text-5xl font-serif text-ink font-light tracking-tight block" />
          <p className="text-xs text-stone-light mt-1 tracking-[0.2em] uppercase">视觉项目</p>
        </motion.div>
      </FloatAnimation>

      <FloatAnimation amplitude={9} period={4.5}>
        <motion.div
          className="hidden md:block absolute right-8 md:right-16 bottom-28 md:bottom-32 z-10"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.9 }}
        >
          <CountUp target={2026} className="text-4xl md:text-5xl font-serif text-ink font-light tracking-tight block" />
          <p className="text-xs text-stone-light mt-1 text-right tracking-[0.2em] uppercase">起航</p>
        </motion.div>
      </FloatAnimation>

      <motion.a
        href="#about"
        className="absolute bottom-6 sm:bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-2 sm:gap-3 text-gold/50 hover:text-gold transition-colors duration-500 group z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <span className="text-xs sm:text-sm font-light tracking-[0.25em] uppercase">↓</span>
      </motion.a>

      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32 sm:h-48 bg-gradient-to-b from-transparent to-black z-[2]" />
    </section>
  );
}
