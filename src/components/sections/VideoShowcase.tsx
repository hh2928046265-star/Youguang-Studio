'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { useContent } from "@/lib/content-context";
import { useVideoUrl } from "@/lib/use-file-url";

export default function VideoShowcase() {
  const { content } = useContent();
  const { showreelUrl: showreelUrlRaw } = content;
  const showreelUrl = useVideoUrl(showreelUrlRaw);
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasVideo = !!showreelUrl;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.95, 1, 0.95]);

  // 进入视口自动播放
  useEffect(() => {
    if (!hasVideo || !containerRef.current) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && videoRef.current) {
          videoRef.current.play().catch(() => {});
          setIsPlaying(true);
        } else if (videoRef.current) {
          videoRef.current.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(containerRef.current);
    return () => observer.disconnect();
  }, [hasVideo]);

  const togglePlay = useCallback(() => {
    if (!videoRef.current) return;
    if (isPlaying) {
      videoRef.current.pause();
      setIsPlaying(false);
    } else {
      videoRef.current.play().catch(() => {});
      setIsPlaying(true);
    }
  }, [isPlaying]);

  return (
    <section ref={containerRef} className="min-h-screen flex items-center justify-center px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-6xl mx-auto w-full">
        <motion.div className="relative" style={{ scale }}>
          {/* Video Container */}
          <div className="relative aspect-video rounded-[32px] overflow-hidden bg-ink shadow-2xl shadow-ink/20">
            {hasVideo ? (
              <>
                <video
                  ref={videoRef}
                  src={showreelUrl}
                  className="absolute inset-0 w-full h-full object-cover"
                  muted
                  loop
                  playsInline
                  preload="metadata"
                />
                {/* 播放/暂停按钮 */}
                <button
                  onClick={togglePlay}
                  className="absolute inset-0 flex items-center justify-center bg-ink/0 hover:bg-ink/20 transition-colors group"
                >
                  <motion.div
                    className={"w-20 h-20 md:w-28 md:h-28 rounded-full border border-ivory/30 flex items-center justify-center transition-all duration-500 " +
                      (isPlaying ? "opacity-0 group-hover:opacity-100" : "opacity-100")}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {isPlaying ? (
                      <svg className="w-8 h-8 text-ivory/70" fill="currentColor" viewBox="0 0 24 24">
                        <rect x="6" y="4" width="4" height="16" rx="1" />
                        <rect x="14" y="4" width="4" height="16" rx="1" />
                      </svg>
                    ) : (
                      <motion.div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[24px] border-l-ivory/70 group-hover:border-l-ivory ml-1 transition-colors duration-500" />
                    )}
                  </motion.div>
                </button>
              </>
            ) : (
              /* 占位 */
              <div className="absolute inset-0 bg-gradient-to-br from-ink to-ink-light flex items-center justify-center">
                <div className="text-center">
                  <motion.button
                    className="w-20 h-20 md:w-28 md:h-28 rounded-full border border-ivory/30 flex items-center justify-center group hover:border-ivory/60 transition-all duration-500"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <motion.div className="w-0 h-0 border-t-[16px] border-t-transparent border-b-[16px] border-b-transparent border-l-[24px] border-l-ivory/70 group-hover:border-l-ivory ml-1 transition-colors duration-500" />
                  </motion.button>
                  <p className="mt-6 text-ivory/40 text-xs md:text-sm font-light tracking-[0.3em] uppercase">
                    Watch Showreel
                  </p>
                </div>
              </div>
            )}
          </div>

          <div className="mt-8 text-center">
            <p className="text-stone-light text-sm font-light tracking-wider">
              动态视觉 · 电影质感 · AI与人类的共同创作
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}