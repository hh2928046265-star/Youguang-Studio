'use client';

import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContent } from "@/lib/content-context";

export default function CreativeAbility() {
  const { content } = useContent();
  const { creativeAbilities } = content;

  return (
    <section className="min-h-[60vh] flex items-center px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full">
        <ScrollReveal>
          <h2 className="font-serif text-4xl gold-shimmer md:text-5xl lg:text-6xl text-ink tracking-tight text-center mb-16 md:mb-20">
            Creative Ability
          </h2>
        </ScrollReveal>

        <div className="flex flex-wrap justify-center gap-6 md:gap-8">
          {creativeAbilities.map((ability, index) => (
            <ScrollReveal key={ability} delay={index * 0.08}>
              <span className="inline-block px-8 py-4 text-lg md:text-xl text-stone font-serif italic tracking-wide border border-sand/60 rounded-full hover:border-gold/40 hover:text-gold transition-all duration-500 cursor-default">
                {ability}
              </span>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  );
}