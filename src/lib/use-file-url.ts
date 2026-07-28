"use client";

import { useState, useEffect } from "react";
import { getFileUrl } from "./file-store";

// 缓存已解析的 URL，避免重复创建 ObjectURL
const urlCache = new Map<string, string>();

export function useFileUrl(ref: string | undefined | null): string {
  const [url, setUrl] = useState(ref || "");

  useEffect(() => {
    if (!ref || typeof ref !== "string") {
      setUrl("");
      return;
    }

    // 如果已经是 data: 或 / 开头的 URL，直接使用
    if (ref.startsWith("data:") || ref.startsWith("/") || ref.startsWith("blob:")) {
      setUrl(ref);
      return;
    }

    // 检查缓存
    if (urlCache.has(ref)) {
      setUrl(urlCache.get(ref)!);
      return;
    }

    let cancelled = false;
    getFileUrl(ref).then((resolved) => {
      if (!cancelled && resolved) {
        urlCache.set(ref, resolved);
        setUrl(resolved);
      }
    });

    return () => { cancelled = true; };
  }, [ref]);

  return url;
}

// 视频专用 hook，获取视频元素需要的 blob URL
export function useVideoUrl(ref: string | undefined | null): string {
  return useFileUrl(ref);
}

// 图片专用 hook，获取图片 src
export function useImageUrl(ref: string | undefined | null): string {
  return useFileUrl(ref);
}
