'use client';

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";
import { useContent } from "@/lib/content-context";

export default function Navigation() {
  const { content } = useContent();
  const { siteConfig } = content;
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <motion.nav
      className={`fixed top-0 left-0 right-0 z-50 px-8 md:px-16 py-6 flex items-center justify-between transition-all duration-500 ${
        scrolled
          ? "bg-ivory/70 backdrop-blur-xl border-b border-sand/50"
          : "bg-transparent"
      }`}
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <a href="#" className="text-base font-serif italic tracking-wide text-ink hover:text-gold transition-colors duration-300">
        {siteConfig.name}
      </a>
      <div className="hidden md:flex items-center gap-8">
        {siteConfig.navItems.map((item) => (
          <a
            key={item.href}
            href={item.href}
            className="text-sm font-light tracking-wider text-stone hover:text-ink transition-colors duration-300"
          >
            {item.label}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}