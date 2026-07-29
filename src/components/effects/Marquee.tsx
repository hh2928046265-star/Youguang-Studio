"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/content-context";
import { useImageUrl } from "@/lib/use-file-url";

// 默认展示图片 — 使用 motionsites 的免费 GIF，有真实内容时会被覆盖
const DEFAULT_IMAGES: string[] = [];

function MarqueeRow({ images, speed = 0.3, direction = 1 }: { images: string[]; speed?: number; direction?: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.closest("section");
    if (!parent) return;

    const onScroll = () => {
      const sectionTop = parent.offsetTop;
      const delta = (window.scrollY - sectionTop + window.innerHeight) * speed;
      setOffset(delta * direction);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [speed, direction]);

  if (!images.length) return null;
  const tripled = [...images, ...images, ...images];

  return (
    <div ref={ref} className="flex gap-3 will-change-transform" style={{ transform: "translateX(" + offset + "px)" }}>
      {tripled.map((src, i) => (
        <div key={i} className="flex-shrink-0 w-[280px] h-[180px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden bg-[#111] border border-white/[0.03]">
          <MarqueeImage src={src} />
        </div>
      ))}
    </div>
  );
}

// 单个图片组件，处理 IndexedDB 文件 ID 解析
function MarqueeImage({ src }: { src: string }) {
  const resolved = useImageUrl(src);
  return <img src={resolved || src} alt="" className="w-full h-full object-cover" loading="lazy" />;
}

export default function Marquee() {
  const { content } = useContent();
  const { marqueeImages } = content;

  // 使用上传的图片，没有则用默认图
  const images = (marqueeImages && marqueeImages.length >= 2) ? marqueeImages : DEFAULT_IMAGES;

  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half);
  const row2 = images.slice(half);

  return (
    <section className="bg-[#0A0A0A] pt-24 pb-10 overflow-hidden relative">
      {/* 顶部渐变过渡 */}
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
      <div className="space-y-3">
        <MarqueeRow images={row1} speed={0.3} direction={1} />
        <MarqueeRow images={row2} speed={0.3} direction={-1} />
      </div>
      {/* 底部渐变过渡 */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
