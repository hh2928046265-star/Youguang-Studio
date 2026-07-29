'use client';

import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useContent } from "@/lib/content-context";

export default function Navigation() {
  const { content } = useContent();
  const { siteConfig } = content;
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 80);
  });

  return (
    <>
      <motion.nav
        className="fixed top-0 left-0 right-0 z-50 px-4 sm:px-6 md:px-10 pt-4 sm:pt-6"
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, delay: 0, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="flex items-center justify-between gap-3 sm:gap-4">
          <div className={"flex items-center gap-2 sm:gap-3 rounded-full pl-4 sm:pl-5 pr-5 sm:pr-7 py-2.5 sm:py-3 transition-all duration-500 " + (scrolled ? "bg-neutral-900/90 backdrop-blur-xl" : "bg-neutral-900/60 backdrop-blur-sm")}>
            <span className="text-gold font-serif text-base sm:text-lg tracking-tight">游</span>
            <span className="text-white text-xs sm:text-sm font-light tracking-wider">{siteConfig.name}</span>
          </div>

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

          {/* 移动端汉堡按钮 */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex items-center justify-center w-10 h-10 rounded-full bg-neutral-900/80 backdrop-blur-sm text-white"
          >
            <motion.div className="flex flex-col gap-1.5" animate={menuOpen ? "open" : "closed"}>
              <motion.span
                className="block w-5 h-px bg-white origin-center"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: 45, y: 5 } }}
              />
              <motion.span
                className="block w-5 h-px bg-white"
                variants={{ closed: { opacity: 1 }, open: { opacity: 0 } }}
              />
              <motion.span
                className="block w-5 h-px bg-white origin-center"
                variants={{ closed: { rotate: 0, y: 0 }, open: { rotate: -45, y: -5 } }}
              />
            </motion.div>
          </button>

          <a
            href="#contact"
            className="hidden sm:inline-block bg-white text-black text-xs sm:text-sm font-normal rounded-full px-4 sm:px-6 py-2.5 sm:py-3 hover:bg-neutral-200 transition-colors"
          >
            Contact
          </a>
        </div>
      </motion.nav>

      {/* 移动端菜单 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-40 md:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <div className="absolute inset-0 bg-black/90 backdrop-blur-xl" onClick={() => setMenuOpen(false)} />
            <motion.div
              className="relative z-10 flex flex-col items-center justify-center h-full gap-8"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              transition={{ duration: 0.3 }}
            >
              {siteConfig.navItems.map((item, i) => (
                <motion.a
                  key={item.href}
                  href={item.href}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-serif text-white/80 hover:text-gold transition-colors tracking-wider"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  {item.label}
                </motion.a>
              ))}
              <motion.a
                href="#contact"
                onClick={() => setMenuOpen(false)}
                className="mt-4 px-8 py-3 bg-white text-black text-sm rounded-full"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
              >
                Contact
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
