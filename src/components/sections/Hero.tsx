"use client";

import { useContent } from "@/lib/content-context";
import { useVideoUrl, useImageUrl } from "@/lib/use-file-url";
import { motion } from "framer-motion";

export default function Hero() {
  const { content } = useContent();
  const { siteConfig, heroBg: heroBgRaw, heroVideo } = content;
  const heroImage = useImageUrl(heroBgRaw);
  const heroVideoUrl = useVideoUrl(heroVideo || "");

  // 检测是否为真实视频 URL（非 IndexedDB id）
  const hasVideo = heroVideoUrl && heroVideoUrl.startsWith("data:") === false;

  return (
    <section className="relative h-screen w-full overflow-hidden bg-black">
      {/* 背景视频 */}
      {hasVideo ? (
        <video
          className="absolute inset-0 w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src={heroVideoUrl}
        />
      ) : heroImage ? (
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('${heroImage}')` }}
        />
      ) : (
        <div className="absolute inset-0 bg-black" />
      )}

      {/* 暗色叠加 */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black/80 z-[1]" />

      {/* 金色粒子纹理 */}
      <div
        className="absolute inset-0 z-[2] opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle at 30% 40%, #B99A5B 1px, transparent 1px), radial-gradient(circle at 70% 60%, #D4B978 1px, transparent 1px)",
          backgroundSize: "80px 80px, 120px 120px",
        }}
      />

      {/* 文字内容 */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center px-6">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <motion.h1
            className="font-serif text-7xl sm:text-8xl md:text-[10rem] lg:text-[12rem] tracking-tight leading-[0.85] mb-4 gold-shimmer"
            style={{ fontWeight: 300 }}
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 1.4, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
          >
            {siteConfig.name}
          </motion.h1>
        </motion.div>

        <motion.p
          className="text-sm md:text-base text-stone font-light tracking-[0.3em] uppercase mb-2"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
        >
          {siteConfig.fullName}
        </motion.p>

        <motion.p
          className="text-xs md:text-sm text-stone-light font-light tracking-[0.2em]"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.3 }}
        >
          {siteConfig.tagline}
        </motion.p>

        {/* 底部滚动提示 */}
        <motion.a
          href="#about"
          className="absolute bottom-10 flex items-center gap-3 text-gold/60 hover:text-gold transition-colors duration-500 group"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 2.0 }}
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