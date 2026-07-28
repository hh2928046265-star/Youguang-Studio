"use client";

// ============================================================
// 内容上下文 — React Context 状态分发层
// 三层加载：远程 JSON → localStorage 覆盖 → 默认值
// ============================================================

import * as React from "react";
import { createContext, useContext, useState, useCallback } from "react";
import {
  loadContent,
  saveContent,
  resetContent,
  getDefaultContent,
  loadMergedContent,
  loadPreviewContent,
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

  // 客户端挂载后：先拉远程 JSON，再合并 localStorage
  React.useEffect(() => {
    const isPreview = typeof window !== "undefined" && new URLSearchParams(window.location.search).has("preview");
    const loader = isPreview ? loadPreviewContent() : loadMergedContent();
    loader.then(merged => {
      setContent(merged);
      setIsLoaded(true);
    });
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
