"use client";

import { motion } from "framer-motion";
import { useContent } from "@/lib/content-context";
import { useVideoUrl, useImageUrl } from "@/lib/use-file-url";
import CountUp from "@/components/effects/CountUp";

export default function Hero() {
  const { content } = useContent();
  const { siteConfig, heroBg: heroBgRaw, heroVideo } = content;
  const heroImage = useImageUrl(heroBgRaw);
  const heroVideoUrl = useVideoUrl(heroVideo || "");

  const hasVideo = heroVideoUrl && heroVideoUrl.startsWith("data:") === false;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 背景视频或图片 */}
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay loop muted playsInline
          src={heroVideoUrl}
        />
      ) : (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={heroImage ? { backgroundImage: "url('" + heroImage + "')" } : {}}
        />
      )}

      {/* 叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/45 to-black/90 z-[1]" />

      {/* 内容 */}
      <div className="relative z-10 h-full w-full flex flex-col items-center justify-center text-center px-6">
        {/* 主标题 */}
        <motion.div
          className="overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <motion.h1
            className="font-serif text-[20vw] md:text-[16vw] lg:text-[14vw] text-ink tracking-tighter leading-[0.85] gold-shimmer"
            style={{ letterSpacing: "-0.04em", fontWeight: 300 }}
            initial={{ y: 80, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {siteConfig.name.replace("Studio", "")}
          </motion.h1>
        </motion.div>

        {/* Studio 副标题 */}
        <motion.p
          className="text-[6vw] md:text-[5vw] lg:text-[4vw] font-serif italic text-gold tracking-wide -mt-2 md:-mt-4 mb-6"
          style={{ fontWeight: 300 }}
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Studio
        </motion.p>

        {/* 描述 */}
        <motion.p
          className="text-sm md:text-base text-stone font-light tracking-[0.15em] max-w-md"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {siteConfig.fullName} · {siteConfig.tagline}
        </motion.p>
      </div>

      {/* 右上统计 */}
      <motion.div
        className="absolute right-8 md:right-16 top-[22%] z-10"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.5 }}
      >
        <div className="flex items-center gap-3 justify-end">
          <div className="hidden md:block h-px w-20 bg-gold/50 rotate-[20deg]" />
          <CountUp target={5} prefix="+" suffix="路" className="text-3xl md:text-4xl font-serif text-ink font-light tracking-tight" />
        </div>
        <p className="text-xs text-stone-light mt-1 text-right tracking-[0.2em] uppercase">五维创造</p>
      </motion.div>

      {/* 左下统计 */}
      <motion.div
        className="absolute left-8 md:left-16 bottom-28 md:bottom-32 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.7 }}
      >
        <div className="flex items-center gap-3">
          <CountUp target={5} className="text-3xl md:text-4xl font-serif text-ink font-light tracking-tight" />
          <div className="hidden md:block h-px w-20 bg-gold/50 rotate-[-20deg]" />
        </div>
        <p className="text-xs text-stone-light mt-1 tracking-[0.2em] uppercase">视觉项目</p>
      </motion.div>

      {/* 右下统计 */}
      <motion.div
        className="absolute right-8 md:right-16 bottom-28 md:bottom-32 z-10"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1.9 }}
      >
        <div className="flex items-center gap-3 justify-end">
          <div className="hidden md:block h-px w-20 bg-gold/50 rotate-[-20deg]" />
          <CountUp target={2026} className="text-3xl md:text-4xl font-serif text-ink font-light tracking-tight" />
        </div>
        <p className="text-xs text-stone-light mt-1 text-right tracking-[0.2em] uppercase">起航</p>
      </motion.div>

      {/* 底部滚动 */}
      <motion.a
        href="#about"
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-gold/50 hover:text-gold transition-colors duration-500 group z-10"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 2.2 }}
      >
        <span className="text-sm font-light tracking-[0.25em] uppercase">Explore Works</span>
        <motion.span
          className="inline-block text-lg"
          animate={{ x: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          →
        </motion.span>
      </motion.a>

      {/* 底部渐变 */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black z-[2]" />
    </section>
  );
}