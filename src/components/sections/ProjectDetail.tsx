"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import GalleryLabel from "@/components/ui/GalleryLabel";
import SectionDivider from "@/components/ui/SectionDivider";
import { useContent } from "@/lib/content-context";
import { useImageUrl, useVideoUrl } from "@/lib/use-file-url";



function VideoPlayer({ src, poster }: { src: string; poster: string }) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const video = videoRef.current;
    const container = containerRef.current;
    if (!video || !container) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video.play().catch(() => {});
        } else {
          video.pause();
        }
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

function ProjectItem({ project }: { project: any; index: number }) {
  const imageUrl = useImageUrl(project.image);
  const videoUrl = useVideoUrl(project.video);
  const resolvedProject = { ...project, image: imageUrl, video: videoUrl };

  return (
    <motion.section
      id={`project-${resolvedProject.id}`}
      className="min-h-screen flex items-center px-8 md:px-16 py-32 md:py-40"
    >
      <div className="max-w-7xl mx-auto w-full">
        <div className="mb-20 md:mb-28">
          <ScrollReveal>
            <p className="text-xs md:text-sm text-stone-light tracking-[0.3em] uppercase mb-4">
              {resolvedProject.number} · {resolvedProject.category}
            </p>
          </ScrollReveal>
          <ScrollReveal delay={0.1}>
            <h3 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[80px] text-ink leading-[0.95] tracking-tight gold-shimmer">
              {resolvedProject.name}
            </h3>
          </ScrollReveal>
          <ScrollReveal delay={0.15}>
            <p className="mt-4 text-lg md:text-xl text-stone font-serif italic tracking-wide">
              {resolvedProject.subtitle}
            </p>
          </ScrollReveal>
        </div>

        <ScrollReveal delay={0.2} viewfinder>
          <div className="relative">
            {resolvedProject.video ? (
              <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl shadow-ink/10 bg-black">
                <VideoPlayer src={resolvedProject.video} poster={resolvedProject.image} />
              </div>
            ) : (
              <div className="relative aspect-[16/9] rounded-[32px] overflow-hidden shadow-2xl shadow-ink/10">
                <img
                  src={resolvedProject.image}
                  alt={resolvedProject.name}
                  className="absolute inset-0 w-full h-full object-cover hover-zoom"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-ink/5 to-transparent pointer-events-none" />
              </div>
            )}

            <div className="mt-4 md:absolute md:bottom-8 md:-right-4 md:mt-0">
              <GalleryLabel
                title={resolvedProject.name}
                subtitle={resolvedProject.subtitle}
                year="2026"
                medium={resolvedProject.category}
              />
            </div>
          </div>
        </ScrollReveal>

        <ScrollReveal delay={0.3}>
          <p className="mt-8 md:mt-12 text-base md:text-lg text-stone leading-relaxed font-light max-w-2xl">
            {resolvedProject.description}
          </p>
        </ScrollReveal>
      </div>
    </motion.section>
  );
}

export default function ProjectDetail() {
  const { content } = useContent();
  const { projects } = content;

  return (
    <div>
      <SectionDivider />
      {projects.map((project, index) => (
        <ProjectItem key={project.id} project={project} index={index} />
      ))}
    </div>
  );
}
