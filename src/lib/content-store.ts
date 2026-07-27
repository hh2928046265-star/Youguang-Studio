// ============================================================
// 内容存储层 — 单例 localStorage 读写
// 参考: nextjs-artist-portfolio 的 useDatabase hook 模式
//       nextjs-cinematic-portfolio 的 content.js 模式
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

// ---- 写入 ----
export function saveContent(content: Partial<SiteContent>): SiteContent {
  const current = loadContent();
  const merged = { ...current, ...content };
  if (typeof window !== "undefined") {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(merged));
  }
  return merged;
}

// ---- 重置 ----
export function resetContent(): SiteContent {
  const defaults = getDefaultContent();
  saveContent(defaults);
  return defaults;
}