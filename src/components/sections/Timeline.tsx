"use client";

import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContent } from "@/lib/content-context";

export default function Timeline() {
  const { content } = useContent();
  const { timelineItems } = content;

  return (
    <section className="min-h-screen flex items-center px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-5xl mx-auto w-full">
        <ScrollReveal>
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-ink gold-shimmer tracking-tight text-center mb-20 md:mb-28">
            Journey
          </h2>
        </ScrollReveal>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-0 md:left-1/2 top-0 bottom-0 w-px bg-stone-light/30" />

          <div className="space-y-24 md:space-y-32">
            {timelineItems.map((item, index) => (
              <ScrollReveal
                key={`${item.title}-${index}`}
                delay={index * 0.1}
                direction={index % 2 === 0 ? "left" : "right"}
              >
                <div
                  className={`relative flex flex-col md:flex-row items-start gap-6 md:gap-16 ${
                    index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                  }`}
                >
                  {/* Dot on line */}
                  <div className="absolute left-0 md:left-1/2 top-4 w-2.5 h-2.5 rounded-full bg-gold transform -translate-x-1/2 z-10 shadow-sm" />

                  {/* Year - premium editorial style */}
                  <div
                    className={`md:w-1/2 flex ${
                      index % 2 === 0
                        ? "md:justify-end md:pr-14"
                        : "md:justify-start md:pl-14"
                    }`}
                  >
                    <span className="font-serif italic text-5xl sm:text-6xl md:text-7xl lg:text-8xl text-gold/25 tracking-tighter leading-none select-none">
                      {item.year}
                    </span>
                  </div>

                  {/* Content */}
                  <div
                    className={`md:w-1/2 pl-8 md:pl-0 ${
                      index % 2 === 0 ? "md:pl-14" : "md:pr-14"
                    }`}
                  >
                    <h4 className="font-serif text-xl md:text-2xl text-ink tracking-wide">
                      {item.title}
                    </h4>
                    <p className="mt-3 text-sm md:text-base text-stone font-light leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.6}>
          <p className="mt-24 text-center text-sm text-stone-light font-light italic tracking-wider">
            每一步，都是光影的延续
          </p>
        </ScrollReveal>
      </div>
    </section>
  );
}