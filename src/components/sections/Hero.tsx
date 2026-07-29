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
      {/* 背景视频 */}
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay loop muted playsInline
          src={heroVideoUrl}
        />
      ) : heroImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center scale-105"
          style={{ backgroundImage: "url('" + heroImage + "')" }}
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* 暗色叠加层 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/75 via-black/45 to-black/85 z-[1]" />

      {/* 三层巨大错位标题 */}
      <div className="relative z-10 h-full w-full">
        {/* 第一行 - 左上 */}
        <motion.h1
          className="hero-title absolute text-gold font-serif font-light text-[18vw] md:text-[16vw] leading-[0.85] left-6 md:left-12 top-[16%]"
          style={{ letterSpacing: "-0.04em", lineHeight: 0.95 }}
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
        >
          游光
        </motion.h1>

        {/* 第二行 - 右中 */}
        <motion.h1
          className="hero-title absolute text-ink font-serif font-light text-[18vw] md:text-[16vw] leading-[0.85] right-6 md:right-12 top-[35%]"
          style={{ letterSpacing: "-0.04em", lineHeight: 0.95 }}
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 1.2, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
        >
          Studio
        </motion.h1>

        {/* 第三行 - 中下 */}
        <motion.h1
          className="hero-title absolute text-gold font-serif font-light text-[18vw] md:text-[16vw] leading-[0.85] left-[20%] md:left-[30%] top-[55%]"
          style={{ letterSpacing: "-0.04em", lineHeight: 0.95 }}
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
        >
          创造
        </motion.h1>

        {/* 描叙文字 */}
        <motion.p
          className="absolute left-6 md:left-12 top-[44%] max-w-[260px] text-[15px] leading-snug text-stone font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1.2 }}
        >
          {siteConfig.tagline}，用视觉语言重塑AI时代的创作者身份
        </motion.p>

        {/* 右上统计 */}
        <motion.div
          className="absolute right-6 md:right-24 top-[16%]"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
        >
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-gold/40 rotate-[20deg]" />
            <CountUp target={5} suffix="路" className="text-4xl md:text-5xl font-serif text-ink font-light tracking-tight" />
          </div>
          <p className="text-xs md:text-sm text-stone-light mt-1 text-right tracking-wider">五维创造体系</p>
        </motion.div>

        {/* 左下统计 */}
        <motion.div
          className="absolute left-6 md:left-20 bottom-20 md:bottom-24"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.6 }}
        >
          <div className="flex items-center gap-3">
            <CountUp target={5} className="text-4xl md:text-5xl font-serif text-ink font-light tracking-tight" />
            <div className="hidden md:block h-px w-24 bg-gold/40 rotate-[-20deg]" />
          </div>
          <p className="text-xs md:text-sm text-stone-light mt-1 tracking-wider">视觉创作项目</p>
        </motion.div>

        {/* 右下统计 */}
        <motion.div
          className="absolute right-6 md:right-20 bottom-16 md:bottom-20"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.8 }}
        >
          <div className="flex items-center gap-3 justify-end">
            <div className="hidden md:block h-px w-24 bg-gold/40 rotate-[-20deg]" />
            <CountUp target={2026} className="text-4xl md:text-5xl font-serif text-ink font-light tracking-tight" />
          </div>
          <p className="text-xs md:text-sm text-stone-light mt-1 text-right tracking-wider">起航之年</p>
        </motion.div>

        {/* 底部滚动 */}
        <motion.a
          href="#about"
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex items-center gap-3 text-gold/60 hover:text-gold transition-colors duration-500 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.2 }}
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

      {/* 底部渐变 */}
      <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-b from-transparent to-black z-[3]" />
    </section>
  );
}