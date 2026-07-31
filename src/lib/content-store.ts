// ============================================================
// 内容存储层 — 三层加载：远程 JSON → localStorage 覆盖 → 默认值
// ============================================================

import {
  siteConfig,
  aboutContent,
  philosophyItems,
  dimensionNodes,
  projects,
  timelineItems,
  creativeAbilities,
  contactInfo,
} from "@/data/content";
import type {
  Project,
  TimelineItem,
  DimensionNode,
  PhilosophyItem,
} from "@/lib/types";

// ---- 类型定义 ----
export interface Collaborations {
  label: string;
  description: string;
}

export interface AboutContentData {
  title: string;
  subtitle: string;
  paragraphs: string[];
  image: string;
}

export interface ContactInfoData {
  title: string;
  collaborations: Collaborations[];
}

export interface SiteConfigData {
  name: string;
  fullName: string;
  creator: string;
  tagline: string;
  navItems: { label: string; href: string }[];
}

export interface SiteContent {
  siteConfig: SiteConfigData;
  aboutContent: AboutContentData;
  philosophyItems: PhilosophyItem[];
  dimensionNodes: DimensionNode[];
  projects: Project[];
  timelineItems: TimelineItem[];
  creativeAbilities: string[];
  contactInfo: ContactInfoData;
  heroBg: string;
  heroVideo: string;
  marqueeImages: string[];
  showreelUrl: string;
}

const STORAGE_KEY = "youguang_content";

// ---- 默认内容 ----
export function getDefaultContent(): SiteContent {
  return {
    siteConfig,
    aboutContent,
    philosophyItems,
    dimensionNodes,
    projects,
    timelineItems,
    creativeAbilities,
    contactInfo,
    heroBg: "/hero-bg.jpg",
    heroVideo: "",
    marqueeImages: [],
    showreelUrl: "",
  };
}

// ---- 读取：localStorage → 默认值 ----
export function loadContent(): SiteContent {
  if (typeof window === "undefined") return getDefaultContent();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return getDefaultContent();
    const saved = JSON.parse(raw) as Partial<SiteContent>;
    return { ...getDefaultContent(), ...saved };
  } catch {
    localStorage.removeItem(STORAGE_KEY);
    return getDefaultContent();
  }
}

// ---- 远程加载：从 /content.json 读取已发布内容 ----
let publishedCache: SiteContent | null = null;
let publishedPromise: Promise<SiteContent> | null = null;

function getBasePath(): string {
  if (typeof window === "undefined") return "";
  if (window.location.hostname.includes("vercel.app")) return "";
  if (window.location.hostname.includes("github.io")) return "/Youguang-Studio";
  return "";
}

export async function loadRemoteContent(basePath: string = ""): Promise<SiteContent> {
  if (typeof window === "undefined") return getDefaultContent();
  if (publishedCache) return publishedCache;
  if (publishedPromise) return publishedPromise;

  var actualPath = basePath || getBasePath();
  publishedPromise = fetch(actualPath + "/content.json?v=" + Date.now())
    .then(res => {
      if (!res.ok) throw new Error("no remote content");
      return res.json();
    })
    .then((remote: Partial<SiteContent>) => {
      publishedCache = { ...getDefaultContent(), ...remote };
      return publishedCache;
    })
    .catch(() => {
      publishedCache = getDefaultContent();
      return publishedCache;
    });

  return publishedPromise;
}

// ---- 合并加载：远程内容 + localStorage 覆盖 ----
export async function loadMergedContent(): Promise<SiteContent> {
  const remote = await loadRemoteContent("");
  return remote;
}


// ---- 预览加载：纯 localStorage（跳过远程），用于发布前预览 ----
export async function loadPreviewContent(): Promise<SiteContent> {
  if (typeof window === "undefined") return getDefaultContent();
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (raw) {
      const local = JSON.parse(raw) as Partial<SiteContent>;
      return { ...getDefaultContent(), ...local };
    }
  } catch {}
  return getDefaultContent();
}

// ---- 写入 ----
export function saveContent(content: Partial<SiteContent>): SiteContent {
  const current = loadContent();
  const merged = { ...current, ...content };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }
  return merged;
}

// ---- 导出当前内容为 JSON 字符串（用于发布）----
export function exportContent(): string {
  const content = loadContent();
  return JSON.stringify(content, null, 2);
}

// ---- 重置 ----
export function resetContent(): SiteContent {
  const defaults = getDefaultContent();
  saveContent(defaults);
  return defaults;
}
