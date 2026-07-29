"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { useContent } from "@/lib/content-context";
import { useImageUrl, useVideoUrl } from "@/lib/use-file-url";
import TiltCard from "@/components/effects/TiltCard";
import SplitText from "@/components/effects/SplitText";
import ParallaxReveal from "@/components/effects/ParallaxReveal";

const TOTAL_CARDS = 5;
const SCALE_STEP = 0.03;

function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) video.play().catch(() => {});
        else video.pause();
      },
      { threshold: 0.3 }
    );
    observer.observe(container);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={containerRef} className="absolute inset-0">
      <video
        ref={videoRef}
        src={src}
        className="w-full h-full object-cover"
        poster={poster}
        preload="auto"
        loop
        muted
        playsInline
      />
    </div>
  );
}

function StackedCard({ project, index, total }: { project: any; index: number; total: number }) {
  const imageUrl = useImageUrl(project.image);
  const videoUrl = useVideoUrl(project.video);
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"],
  });

  const scale = useTransform(
    scrollYProgress,
    [0, 0.5, 1],
    [1, 1, 1 - (total - index) * SCALE_STEP]
  );

  const opacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0.3]);

  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [40, 60]);

  return (
    <div ref={containerRef} className="h-[85vh] sticky top-24 md:top-32 flex items-center justify-center">
      <motion.div
        className="relative w-full max-w-5xl mx-auto overflow-hidden border border-gold/20 bg-[#0C0C0C]"
        style={{
          scale,
          opacity,
          borderRadius,
          top: `${index * 28}px`,
          willChange: "transform",
        }}
      >
        {/* 编号 */}
        <div className="absolute top-8 left-8 z-10">
          <span className="font-serif text-[10vw] md:text-[8vw] text-gold/15 leading-none select-none">
            {String(index + 1).padStart(2, "0")}
          </span>
        </div>

        {/* 内容区 */}
        <div className="relative z-10 p-8 md:p-12 pt-20 md:pt-24">
          <div className="flex items-center gap-4 mb-6">
            <span className="text-xs tracking-[0.3em] uppercase text-stone-light">
              {project.number} 路 • {project.category}
            </span>
          </div>
          <SplitText text={project.name} className="font-serif text-4xl sm:text-5xl md:text-6xl lg:text-7xl text-ink leading-[0.9] tracking-tight mb-4 gold-shimmer" />
          <SplitText text={project.subtitle} className="text-lg md:text-xl text-stone font-serif italic mb-8" delay={0.3} />
          <p className="text-sm md:text-base text-stone-light leading-relaxed font-light max-w-xl">
            {project.description}
          </p>

          {/* 媒体展示 */}
          <div className="mt-10">
            <ParallaxReveal>
            {videoUrl && videoUrl.startsWith("data:") ? (
              <TiltCard className="relative aspect-[16/9] rounded-[28px] overflow-hidden bg-black" maxTilt={5}>
                <VideoPlayer src={videoUrl} poster={imageUrl} />
              </TiltCard>
            ) : (
              <TiltCard className="relative aspect-[16/9] rounded-[28px] overflow-hidden bg-[#111]" maxTilt={5}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </TiltCard>
            )}
          </ParallaxReveal>
          </div>
        </div>

        {/* 底部渐变过渡 */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-[2]" />
      </motion.div>
    </div>
  );
}

export default function ProjectDetail() {
  const { content } = useContent();
  const { projects } = content;

  return (
    <div className="bg-[#0A0A0A]">
      <SectionDivider />
      <div className="relative pb-20">
        <ScrollReveal>
          <div className="text-center pt-20 pb-10">
            <p className="text-xs tracking-[0.3em] uppercase text-stone-light mb-4">
              Featured Works
            </p>
            <h2 className="font-serif text-5xl md:text-7xl text-ink tracking-tight gold-shimmer">
              作品集
            </h2>
          </div>
        </ScrollReveal>

        {projects.map((project, index) => (
          <StackedCard
            key={project.id}
            project={project}
            index={index}
            total={projects.length}
          />
        ))}
      </div>
    </div>
  );
}