'use client';

import ScrollReveal from "@/components/ui/ScrollReveal";
import { useContent } from "@/lib/content-context";

export default function Contact() {
  const { content } = useContent();
  const { contactInfo } = content;

  return (
    <section id="contact" className="min-h-screen flex items-center px-8 md:px-16 py-24 md:py-32">
      <div className="max-w-7xl mx-auto w-full">
        {/* Main CTA */}
        <ScrollReveal>
          <h2 className="font-serif text-5xl sm:text-6xl md:text-7xl lg:text-[100px] text-ink leading-[0.95] tracking-tight text-center">
            {contactInfo.title}
          </h2>
        </ScrollReveal>

        {/* Collaborations */}
        <div className="mt-20 md:mt-28 max-w-3xl mx-auto">
          <ScrollReveal delay={0.15}>
            <p className="text-center text-sm text-stone-light tracking-[0.2em] uppercase mb-12">
              合作方向
            </p>
          </ScrollReveal>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8 md:gap-12">
            {contactInfo.collaborations.map((item, index) => (
              <ScrollReveal key={item.label} delay={0.2 + index * 0.1}>
                <div className="text-center p-8 rounded-2xl border border-sand/50 hover:border-gold/30 transition-all duration-500 group cursor-default">
                  <h4 className="font-serif text-xl md:text-2xl text-ink tracking-wide group-hover:text-gold transition-colors duration-500">
                    {item.label}
                  </h4>
                  <p className="mt-3 text-sm text-stone font-light">
                    {item.description}
                  </p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        {/* Email */}
        <ScrollReveal delay={0.6}>
          <div className="mt-20 text-center">
            <a
              href="mailto:hello@youguang.studio"
              className="inline-flex items-center gap-3 text-stone hover:text-ink transition-colors duration-500 group"
            >
              <span className="text-lg font-serif italic">hello@youguang.studio</span>
              <span className="text-gold group-hover:translate-x-1 transition-transform duration-300">→</span>
            </a>
          </div>
        </ScrollReveal>
      </div>
    </section>
  );
}