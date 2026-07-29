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
      className="fixed top-0 left-0 right-0 z-50 px-6 md:px-10 pt-6"
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <div className="flex items-center justify-between gap-4">
        {/* 左：品牌胶囊 */}
        <div className={"flex items-center gap-3 rounded-full pl-5 pr-7 py-3 transition-all duration-500 " + (scrolled ? "bg-neutral-900/90 backdrop-blur-xl" : "bg-neutral-900/60 backdrop-blur-sm")}>
          <span className="text-gold font-serif text-lg tracking-tight">游</span>
          <span className="text-white text-sm font-light tracking-wider">{siteConfig.name}</span>
        </div>

        {/* 中：导航链接胶囊 */}
        <div className="hidden md:flex items-center gap-1 bg-neutral-900/60 backdrop-blur-sm rounded-full px-3 py-2">
          {siteConfig.navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="text-neutral-300 hover:text-white transition-colors text-sm px-5 py-2 rounded-full"
            >
              {item.label}
            </a>
          ))}
        </div>

        {/* 右：Contact 按钮 */}
        <a
          href="#contact"
          className="bg-white text-black text-sm font-normal rounded-full px-6 py-3 hover:bg-neutral-200 transition-colors"
        >
          Contact
        </a>
      </div>
    </motion.nav>
  );
}
