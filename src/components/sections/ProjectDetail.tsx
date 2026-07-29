"use client";

import { useRef, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import ScrollReveal from "@/components/ui/ScrollReveal";
import SectionDivider from "@/components/ui/SectionDivider";
import { useContent } from "@/lib/content-context";
import { useImageUrl, useVideoUrl } from "@/lib/use-file-url";
import TiltCard from "@/components/effects/TiltCard";
import ParallaxReveal from "@/components/effects/ParallaxReveal";
import BigNumber from "@/components/effects/BigNumber";
import { ShineSweep, ImageZoom, DynamicLight, BorderGlow } from "@/components/effects/InteractiveEffects";

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

  const targetScale = 1 - (total - 1 - index) * SCALE_STEP;
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1, 1, targetScale]);
  const opacity = useTransform(scrollYProgress, [0.6, 0.9], [1, 0.3]);
  const borderRadius = useTransform(scrollYProgress, [0, 0.5], [24, 40]);
  const topOffset = index * 28;

  return (
    <div
      ref={containerRef}
      className="h-[80vh] md:h-[85vh] sticky top-16 md:top-24 md:top-32 flex items-center justify-center"
    >
      <BorderGlow>
      <motion.div
        className="relative w-full max-w-5xl mx-auto overflow-hidden border border-gold/20 bg-[#0C0C0C]"
        style={{
          scale,
          opacity,
          borderRadius,
          top: topOffset + "px",
          willChange: "transform",
        }}
      >
        <div className="absolute top-6 left-6 md:top-8 md:left-8 z-10">
          <BigNumber number={String(index + 1).padStart(2, "0")} />
        </div>

        <div className="relative z-10 p-6 md:p-8 lg:p-12 pt-14 md:pt-20 lg:pt-24">
          <span className="text-[10px] sm:text-xs tracking-[0.3em] uppercase text-stone-light">
            {project.number} · {project.category}
          </span>

          <h3 className="font-serif text-2xl sm:text-3xl md:text-5xl lg:text-7xl text-ink leading-[0.9] tracking-tight mt-3 mb-2 gold-heading">
            {project.name}
          </h3>

          <p className="text-sm md:text-lg lg:text-xl text-stone font-serif italic mb-3 md:mb-6">
            {project.subtitle}
          </p>

          <p className="text-[10px] md:text-sm lg:text-base text-stone-light leading-relaxed font-light max-w-xl mb-4 md:mb-6 line-clamp-3 md:line-clamp-none">
            {project.description}
          </p>

          <div className="mt-4 md:mt-10">
            <ParallaxReveal>
            <DynamicLight>
            {videoUrl && videoUrl.startsWith("data:") ? (
              <ShineSweep>
              <ImageZoom>
              <TiltCard className="relative aspect-[16/9] rounded-2xl md:rounded-[28px] overflow-hidden bg-black" maxTilt={5}>
                <VideoPlayer src={videoUrl} poster={imageUrl} />
              </TiltCard>
              </ImageZoom>
              </ShineSweep>
            ) : (
              <ShineSweep>
              <ImageZoom>
              <TiltCard className="relative aspect-[16/9] rounded-2xl md:rounded-[28px] overflow-hidden bg-[#111]" maxTilt={5}>
                {imageUrl && (
                  <img
                    src={imageUrl}
                    alt={project.name}
                    className="absolute inset-0 w-full h-full object-cover"
                    loading="lazy"
                  />
                )}
              </TiltCard>
              </ImageZoom>
              </ShineSweep>
            )}
            </DynamicLight>
          </ParallaxReveal>
          </div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0C0C0C] to-transparent pointer-events-none z-[2]" />
      </motion.div>
      </BorderGlow>
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
        <div className="relative z-20">
          <ScrollReveal>
            <div className="text-center pt-16 md:pt-20 pb-10 md:pb-16">
              <p className="text-xs tracking-[0.3em] uppercase text-stone-light mb-4">
                Featured Works
              </p>
              <h2 className="font-serif text-3xl sm:text-5xl md:text-7xl text-ink tracking-tight gold-heading">
                作品集
              </h2>
            </div>
          </ScrollReveal>
        </div>

        <div className="relative z-0">
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
    </div>
  );
}
