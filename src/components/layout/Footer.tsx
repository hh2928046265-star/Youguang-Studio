'use client';

import { useContent } from "@/lib/content-context";

export default function Footer() {
  const { content } = useContent();
  const { siteConfig } = content;

  return (
    <footer className="px-8 md:px-16 py-12 border-t border-sand/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <p className="text-sm font-serif italic text-stone tracking-wide">
          {siteConfig.name}
        </p>
        <div className="flex items-center gap-6">
          <p className="text-xs text-stone-light tracking-wider font-light">
            {siteConfig.creator}
          </p>
          <span className="text-stone-light">·</span>
          <p className="text-xs text-stone-light tracking-wider font-light">
            2026
          </p>
          <span className="text-stone-light">·</span>
          <a
            href="/admin"
            className="text-xs text-stone-light hover:text-gold tracking-wider font-light transition-colors duration-300"
          >
            控制台
          </a>
        </div>
      </div>
    </footer>
  );
}