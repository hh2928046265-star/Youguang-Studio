'use client';

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContent } from "@/lib/content-context";
import { useImageUrl } from "@/lib/use-file-url";
import { AnimatedChars } from "@/components/effects/AnimatedText";
import SplitText from "@/components/effects/SplitText";
import CornerDecorations from "@/components/effects/CornerDecorations";

export default function About() {
  const { content } = useContent();
  const { aboutContent: aboutContentRaw } = content;
  const aboutContentImage = useImageUrl(aboutContentRaw.image);
  const aboutContent = { ...aboutContentRaw, image: aboutContentImage };
  const sectionRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const titleY = useTransform(scrollYProgress, [0, 1], [-30, 30]);
  const contentY = useTransform(scrollYProgress, [0, 1], [30, -30]);

  return (
    <section ref={sectionRef} id="about" className="relative min-h-screen flex items-center px-8 md:px-16 py-24 md:py-32 paper-texture">
      <CornerDecorations />
      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-16 md:gap-24">
        <motion.div style={{ y: titleY }}>
          <ScrollReveal>
            <div>
              <SplitText text={aboutContent.title} className="font-serif text-5xl gold-shimmer sm:text-6xl md:text-7xl lg:text-[100px] text-ink leading-[0.95] tracking-tight" />
              <p className="mt-6 text-lg md:text-xl text-stone font-serif italic tracking-wide">
                {aboutContent.subtitle}
              </p>
              <div className="w-12 h-px bg-gold mt-8" />
            </div>
          </ScrollReveal>
        </motion.div>

        <motion.div className="space-y-10" style={{ y: contentY }}>
          <ScrollReveal delay={0.15}>
            <div className="space-y-6">
              {aboutContent.paragraphs.map((p, i) => (
                <AnimatedChars
                  key={i}
                  text={p}
                  className="text-base md:text-lg text-stone leading-relaxed font-light"
                />
              ))}
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.3}>
            <div className="gallery-frame w-48 h-60 md:w-56 md:h-72">
              <div className="w-full h-full rounded-[16px] overflow-hidden">
                <div
                  className="w-full h-full bg-cover bg-center grayscale-[20%]"
                  style={{ backgroundImage: "url('" + aboutContent.image + "')" }}
                />
              </div>
            </div>
          </ScrollReveal>
        </motion.div>
      </div>
    </section>
  );
}
