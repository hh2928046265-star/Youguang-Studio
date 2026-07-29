"use client";

import { useEffect, useRef, useState } from "react";

interface MarqueeProps {
  images: string[];
  speed?: number;
  className?: string;
}

export function MarqueeRow({ images, speed = 0.3, direction = 1 }: MarqueeProps & { direction?: number }) {
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

  const tripled = [...images, ...images, ...images];

  return (
    <div ref={ref} className="flex gap-3 will-change-transform" style={{ transform: "translateX(" + offset + "px)" }}>
      {tripled.map((src, i) => (
        <div key={i} className="flex-shrink-0 w-[320px] h-[200px] md:w-[420px] md:h-[270px] rounded-2xl overflow-hidden">
          <img src={src} alt="" className="w-full h-full object-cover" loading="lazy" />
        </div>
      ))}
    </div>
  );
}

export default function Marquee({ images1, images2 }: { images1: string[]; images2: string[] }) {
  return (
    <section className="bg-[#0A0A0A] pt-24 pb-10 overflow-hidden">
      <div className="space-y-3">
        <MarqueeRow images={images1} speed={0.3} direction={1} />
        <MarqueeRow images={images2} speed={0.3} direction={-1} />
      </div>
    </section>
  );
}
