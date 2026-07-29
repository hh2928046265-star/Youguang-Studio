"use client";

import { useEffect, useRef, useState } from "react";
import { useContent } from "@/lib/content-context";
import { useImageUrl } from "@/lib/use-file-url";

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
        <div key={i} className="flex-shrink-0 w-[280px] h-[180px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden bg-[#111]">
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee() {
  const { content } = useContent();
  const { marqueeImages } = content;

  if (!marqueeImages || marqueeImages.length < 2) return null;

  const half = Math.ceil(marqueeImages.length / 2);
  const row1 = marqueeImages.slice(0, half);
  const row2 = marqueeImages.slice(half);

  return (
    <section className="bg-[#0A0A0A] pt-24 pb-10 overflow-hidden">
      <div className="space-y-3">
        <MarqueeRow images={row1} speed={0.3} direction={1} />
        <MarqueeRow images={row2} speed={0.3} direction={-1} />
      </div>
    </section>
  );
}
