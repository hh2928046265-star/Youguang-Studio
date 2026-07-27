'use client';

import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContent } from "@/lib/content-context";

export default function Philosophy() {
  const { content } = useContent();
  const { philosophyItems } = content;

  return (
    <section id="vision" className="min-h-screen flex flex-col justify-center px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full space-y-32 md:space-y-48">
        {philosophyItems.map((item, index) => (
          <ScrollReveal key={item.number} delay={index * 0.1}>
            <div className="relative">
              {/* Number */}
              <span className="absolute -top-8 md:-top-12 left-0 font-serif text-[120px] md:text-[180px] text-sand/60 leading-none select-none pointer-events-none">
                {item.number}
              </span>
              {/* Content */}
              <div className="relative pt-8 md:pt-12 pl-4 md:pl-8">
                <h3 className="font-serif gold-shimmer text-4xl sm:text-5xl md:text-7xl lg:text-[96px] text-ink leading-none tracking-tight">
                  {item.title}
                </h3>
                <p className="mt-4 md:mt-6 text-lg md:text-2xl text-stone font-serif italic tracking-wide">
                  {item.subtitle}
                </p>
              </div>
            </div>
          </ScrollReveal>
        ))}
      </div>
    </section>
  );
}