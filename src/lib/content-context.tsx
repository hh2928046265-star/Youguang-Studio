"use client";

// ============================================================
// 内容上下文 — React Context 状态分发层
// 参考: nextjs-artist-portfolio 的 useDatabase hook 模式
//       Aiyu portfolio 的 CMS Context 模式
// ============================================================

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import {
  loadContent,
  saveContent,
  resetContent,
  getDefaultContent,
} from "@/lib/content-store";
import type { SiteContent } from "@/lib/content-store";

interface ContentContextValue {
  content: SiteContent;
  updateContent: (patch: Partial<SiteContent>) => void;
  resetToDefaults: () => void;
  isLoaded: boolean;
}

const ContentContext = createContext<ContentContextValue | null>(null);

export function ContentProvider({ children }: { children: React.ReactNode }) {
  const [content, setContent] = useState<SiteContent>(getDefaultContent);
  const [isLoaded, setIsLoaded] = useState(false);

  // 客户端挂载后从 localStorage 加载
  React.useEffect(() => {
    const loaded = loadContent();
    setContent(loaded);
    setIsLoaded(true);
  }, []);

  const updateContent = useCallback((patch: Partial<SiteContent>) => {
    const merged = saveContent(patch);
    setContent(merged);
  }, []);

  const resetToDefaults = useCallback(() => {
    const defaults = resetContent();
    setContent(defaults);
  }, []);

  return (
    <ContentContext.Provider
      value={{ content, updateContent, resetToDefaults, isLoaded }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export function useContent(): ContentContextValue {
  const ctx = useContext(ContentContext);
  if (!ctx) {
    throw new Error("useContent must be used within <ContentProvider>");
  }
  return ctx;
}