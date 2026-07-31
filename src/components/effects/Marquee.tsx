"use client";

import { useContent } from "@/lib/content-context";
import { useImageUrl } from "@/lib/use-file-url";

const DEFAULT_IMAGES: string[] = [];

function MarqueeRow({ images, direction = "left", duration = 30 }: { images: string[]; direction?: "left" | "right"; duration?: number }) {
  if (!images.length) return null;
  const doubled = [...images, ...images];

  return (
    <div
      className={"flex gap-3 w-max will-change-transform " + (direction === "left" ? "animate-marquee-left" : "animate-marquee-right")}
      style={{ "--marquee-dur": duration + "s" } as React.CSSProperties}
    >
      {doubled.map((src, i) => (
        <div key={i} className="flex-shrink-0 w-[280px] h-[180px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden bg-[#111] border border-white/[0.03]">
          <MarqueeImage src={src} />
        </div>
      ))}
    </div>
  );
}

function MarqueeImage({ src }: { src: string }) {
  const resolved = useImageUrl(src);
  return <img src={resolved || src} alt="" className="w-full h-full object-cover" loading="lazy" />;
}

export default function Marquee() {
  const { content } = useContent();
  const { marqueeImages } = content;

  const images = (marqueeImages && marqueeImages.length >= 2) ? marqueeImages : DEFAULT_IMAGES;
  const half = Math.ceil(images.length / 2);
  const row1 = images.slice(0, half);
  const row2 = images.slice(half);

  return (
    <section className="bg-[#0A0A0A] pt-24 pb-10 overflow-hidden relative">
      <div className="absolute top-0 left-0 right-0 h-16 bg-gradient-to-b from-black/80 to-transparent z-10 pointer-events-none" />
      <div className="space-y-3">
        <MarqueeRow images={row1} direction="left" duration={30} />
        <MarqueeRow images={row2} direction="right" duration={28} />
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/80 to-transparent z-10 pointer-events-none" />
    </section>
  );
}
