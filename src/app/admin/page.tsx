"use client";

import * as React from "react";
import { useState, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useContent } from "@/lib/content-context";
import { storeFile, getFile } from "@/lib/file-store";
import type { SiteContent } from "@/lib/content-store";

const ADMIN_USER = "周游";
const ADMIN_PASS = "Dre.1117";

// ============================================================
// 登录页面
// ============================================================
function AdminLogin({ onLogin }: { onLogin: (success: boolean) => void }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    await new Promise((r) => setTimeout(r, 800));
    if (username === ADMIN_USER && password === ADMIN_PASS) {
      sessionStorage.setItem("youguang_auth", "true");
      onLogin(true);
    } else {
      setError("身份验证失败，请检查用户名和密码");
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-ivory flex items-center justify-center px-4">
      <motion.div
        className="w-full max-w-md"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        <div className="text-center mb-12">
          <div className="w-4 h-4 rounded-full bg-gold mx-auto mb-6" />
          <h1 className="font-serif text-3xl tracking-wide text-ink mb-2">
            游光 Studio
          </h1>
          <p className="text-xs text-stone-light tracking-[0.2em] uppercase">
            创作控制台
          </p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-xs text-stone-light tracking-[0.2em] uppercase mb-3 font-light">
              用户名
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="输入用户名"
              autoFocus
              className="w-full px-5 py-4 bg-white/50 border border-sand rounded-xl text-sm text-ink font-light placeholder:text-stone-light/60 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          <div>
            <label className="block text-xs text-stone-light tracking-[0.2em] uppercase mb-3 font-light">
              密码
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="输入密码"
              className="w-full px-5 py-4 bg-white/50 border border-sand rounded-xl text-sm text-ink font-light placeholder:text-stone-light/60 focus:outline-none focus:border-gold/50 transition-colors"
            />
          </div>
          {error && (
            <motion.p
              className="text-xs text-red-500/80 text-center font-light"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            >
              {error}
            </motion.p>
          )}
          <button
            type="submit"
            disabled={loading || !username || !password}
            className="w-full py-4 bg-ink text-ivory text-sm tracking-[0.2em] rounded-xl hover:bg-ink/90 transition-colors duration-300 disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {loading ? "验证中..." : "进入控制台"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

// ============================================================
// 类型 & 常量
// ============================================================
type EditSection =
  | "media"
  | "about"
  | "vision"
  | "projects"
  | "contact"
  | "site"
  | "publish"
  | null;

interface ImageSlot {
  id: string;
  label: string;
  desc: string;
  contentKey: keyof SiteContent;
  nestedKey?: string;
}

const imageSlots: ImageSlot[] = [
  {
    id: "hero-bg",
    label: "Hero 背景图",
    desc: "全屏主视觉背景，建议 1920×1280",
    contentKey: "heroBg",
  },
  {
    id: "about-portrait",
    label: "个人肖像",
    desc: "4:5 比例，建议 800×1000",
    contentKey: "aboutContent",
    nestedKey: "image",
  },
  {
    id: "visionloop",
    label: "VisionLoop",
    desc: "动态视觉 · 16:9",
    contentKey: "projects",
  },
  {
    id: "photoloop",
    label: "PhotoLoop",
    desc: "静态视觉 · 16:9",
    contentKey: "projects",
  },
  {
    id: "lumind",
    label: "Lumind",
    desc: "内容表达 · 16:9",
    contentKey: "projects",
  },
  {
    id: "miguang",
    label: "觅光摄影助手",
    desc: "知识成长 · 16:9",
    contentKey: "projects",
  },
  {
    id: "shanhai",
    label: "山海风物志",
    desc: "视觉传播 · 16:9",
    contentKey: "projects",
  },
  {
    id: "visionloop-video",
    label: "VisionLoop 宣传视频",
    desc: "动态视觉 · 视频 MP4",
    contentKey: "projects",
    nestedKey: "video",
  },
  {
    id: "photoloop-video",
    label: "PhotoLoop 宣传视频",
    desc: "静态视觉 · 视频 MP4",
    contentKey: "projects",
    nestedKey: "video",
  },
  {
    id: "lumind-video",
    label: "Lumind 宣传视频",
    desc: "内容表达 · 视频 MP4",
    contentKey: "projects",
    nestedKey: "video",
  },
  {
    id: "miguang-video",
    label: "觅光摄影助手 宣传视频",
    desc: "知识成长 · 视频 MP4",
    contentKey: "projects",
    nestedKey: "video",
  },
  {
    id: "shanhai-video",
    label: "山海风物志 宣传视频",
    desc: "视觉传播 · 视频 MP4",
    contentKey: "projects",
    nestedKey: "video",
  },
];

// ============================================================
// 主入口
// ============================================================
export default function AdminPage() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [activeSection, setActiveSection] = useState<EditSection>(null);

  // 检查是否已登录
  React.useEffect(() => {
    if (typeof window !== "undefined") {
      const auth = sessionStorage.getItem("youguang_auth");
      if (auth === "true") setLoggedIn(true);
    }
  }, []);

  if (!loggedIn) {
    return <AdminLogin onLogin={(ok) => setLoggedIn(ok)} />;
  }

  return (
    <div className="min-h-screen bg-ivory">
      {/* 顶部导航 */}
      <nav className="sticky top-0 z-50 bg-ivory/80 backdrop-blur-xl border-b border-sand/50 px-8 py-4 flex items-center justify-between">
        <a
          href="/"
          className="font-serif text-lg tracking-wide text-ink hover:text-gold transition-colors"
        >
          游光 Studio
        </a>
        <div className="flex items-center gap-1">
          {([
            { key: "site", label: "网站信息" },
            { key: "media", label: "媒体管理" },
            { key: "about", label: "关于我" },
            { key: "vision", label: "五维体系" },
            { key: "projects", label: "项目内容" },
            { key: "contact", label: "联系方式" },
          ] as const).map((tab) => (
            <button
              key={tab.key}
              onClick={() =>
                setActiveSection(activeSection === tab.key ? null : tab.key)
              }
              className={`px-4 py-2 text-xs tracking-wider rounded-lg transition-all duration-300 ${
                activeSection === tab.key
                  ? "bg-ink text-ivory"
                  : "text-stone hover:text-ink hover:bg-sand/30"
              }`}
            >
              {tab.label}
            </button>
          ))}
          <a
            href="/"
            className="ml-4 px-4 py-2 text-xs tracking-wider text-nature hover:text-nature/70 border border-nature/30 rounded-lg transition-colors"
          >
            预览前台 →
          </a>
          <button
            onClick={() => setActiveSection(activeSection === "publish" ? null : "publish")}
            className={`px-4 py-2 text-xs tracking-wider rounded-lg transition-all duration-300 border ${
              activeSection === "publish"
                ? "bg-gold text-ivory border-gold"
                : "text-gold hover:bg-gold/10 border-gold/30"
            }`}
          >
            发布到网站
          </button>
        </div>
      </nav>

      {/* 内容区域 */}
      <div className="max-w-4xl mx-auto px-8 py-12">
        <AnimatePresence mode="wait">
          {activeSection === "site" && (
            <SiteEditor key="site" onClose={() => setActiveSection(null)} />
          )}
          {activeSection === "media" && (
            <MediaManager key="media" onClose={() => setActiveSection(null)} />
          )}
          {activeSection === "about" && (
            <AboutEditor key="about" onClose={() => setActiveSection(null)} />
          )}
          {activeSection === "vision" && (
            <VisionEditor key="vision" onClose={() => setActiveSection(null)} />
          )}
          {activeSection === "projects" && (
            <ProjectsEditor
              key="projects"
              onClose={() => setActiveSection(null)}
            />
          )}
          {activeSection === "contact" && (
            <ContactEditor
              key="contact"
              onClose={() => setActiveSection(null)}
            />
          )}
          {activeSection === "publish" && (
            <PublishPanel key="publish" onClose={() => setActiveSection(null)} />
          )}
        </AnimatePresence>

        {!activeSection && (
          <motion.div
            className="text-center py-32"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <p className="text-stone-light text-sm font-light tracking-wider">
              选择一个编辑模块开始管理内容
            </p>
            <p className="text-stone-light/50 text-xs mt-4 font-light">
              所有修改自动保存到浏览器本地存储，前台即时更新
            </p>
          </motion.div>
        )}
      </div>
    </div>
  );
}

// ============================================================
// 网站信息编辑器
// ============================================================
function SiteEditor({ onClose }: { onClose: () => void }) {
  const { content, updateContent } = useContent();
  const [siteConfig, setSiteConfig] = useState(
    JSON.parse(JSON.stringify(content.siteConfig))
  );

  const handleSave = () => {
    updateContent({ siteConfig });
  };

  return (
    <EditorShell title="网站信息" onClose={onClose}>
      <div className="space-y-6">
        <Field
          label="品牌名称"
          value={siteConfig.name}
          onChange={(v) => setSiteConfig({ ...siteConfig, name: v })}
        />
        <Field
          label="英文全名"
          value={siteConfig.fullName}
          onChange={(v) => setSiteConfig({ ...siteConfig, fullName: v })}
        />
        <Field
          label="创作者"
          value={siteConfig.creator}
          onChange={(v) => setSiteConfig({ ...siteConfig, creator: v })}
        />
        <Field
          label="标语"
          value={siteConfig.tagline}
          onChange={(v) => setSiteConfig({ ...siteConfig, tagline: v })}
        />
        <SaveButton onClick={handleSave} />
      </div>
    </EditorShell>
  );
}

// ============================================================
// 媒体管理器
// ============================================================
function MediaManager({ onClose }: { onClose: () => void }) {
  const { content, updateContent } = useContent();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState<string | null>(null);
  const [message, setMessage] = useState("");

  const handleUpload = useCallback(
    async (slot: ImageSlot, file: File) => {
      setUploading(slot.id);
      setMessage("");

      try {
        const fileId = await storeFile(file);

        if (slot.contentKey === "heroBg") {
          updateContent({ heroBg: fileId });
        } else if (
          slot.contentKey === "aboutContent" && slot.nestedKey
        ) {
          updateContent({
            aboutContent: { ...content.aboutContent, [slot.nestedKey]: fileId },
          });
        } else if (slot.contentKey === "projects") {
          const updatedProjects = content.projects.map((p) =>
            p.id === slot.id.replace("-video", "") ? { ...p, [slot.nestedKey || "image"]: fileId } : p
          );
          updateContent({ projects: updatedProjects });
        }
        setMessage(`\u2705 ${slot.label} \u4e0a\u4f20\u6210\u529f`);
      } catch {
        setMessage("\u274c \u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5");
      }
      setUploading(null);
    },
    [content, updateContent]
  );

  const handleVideoUpload = useCallback(
    async (file: File) => {
      setUploading("video");
      setMessage("");

      try {
        const fileId = await storeFile(file);
        updateContent({ showreelUrl: fileId });
        setMessage("\u2705 Showreel \u89c6\u9891\u4e0a\u4f20\u6210\u529f");
      } catch {
        setMessage("\u274c \u4e0a\u4f20\u5931\u8d25\uff0c\u8bf7\u91cd\u8bd5");
      }
      setUploading(null);
    },
    [updateContent]
  );

  return (
    <EditorShell title="媒体管理" onClose={onClose}>
      <input
        ref={fileInputRef}
        type="file"
        className="hidden"
        accept="image/jpeg,image/png,image/webp,image/avif,video/mp4,video/webm,video/quicktime"
        onChange={(e) => {
          const file = e.target.files?.[0];
          const slotId = e.target.dataset.slot;
          if (file && slotId) {
            const slot = imageSlots.find((s) => s.id === slotId);
            if (slot) handleUpload(slot, file);
          }
          e.target.value = "";
        }}
      />
      <input
        type="file"
        id="video-input"
        className="hidden"
        accept="video/mp4,video/webm,video/mov"
        onChange={(e) => {
          const file = e.target.files?.[0];
          if (file) handleVideoUpload(file);
          e.target.value = "";
        }}
      />

      {message && (
        <motion.p
          className="text-sm text-center mb-6 font-light"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {message}
        </motion.p>
      )}

      {/* 图片上传区域 */}
      <div className="space-y-4 mb-10">
        <p className="text-xs text-stone-light tracking-wider uppercase mb-4">
          图片素材
        </p>
        {imageSlots.filter(slot => slot.nestedKey !== "video").map((slot) => {
          const currentPath =
            slot.contentKey === "heroBg"
              ? content.heroBg
              : slot.contentKey === "aboutContent"
              ? content.aboutContent.image
              : content.projects.find((p) => p.id === slot.id)?.image || "";
          return (
            <div
              key={slot.id}
              className="flex items-center gap-4 p-4 border border-sand/50 rounded-xl"
            >
              <div className="w-16 h-10 rounded-lg overflow-hidden bg-sand/50 flex-shrink-0">
                {currentPath ? (
                  <img
                    src={currentPath}
                    alt={slot.label}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-stone-light text-xs">
                    无
                  </div>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-serif text-ink">{slot.label}</p>
                <p className="text-xs text-stone-light truncate">
                  {slot.desc}
                </p>
              </div>
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.dataset.slot = slot.id;
                    fileInputRef.current.click();
                  }
                }}
                disabled={uploading === slot.id}
                className="px-4 py-2 text-xs tracking-wider border border-sand rounded-lg text-stone hover:text-ink hover:border-ink transition-colors disabled:opacity-50 flex-shrink-0"
              >
                {uploading === slot.id ? "上传中..." : "上传"}
              </button>
            </div>
          );
        })}
      </div>

      {/* 视频上传 */}
      <div className="space-y-4">
        <p className="text-xs text-stone-light tracking-wider uppercase mb-4">
          项目宣传视频
        </p>
        {imageSlots.filter(slot => slot.nestedKey === "video").map((slot) => {
          const currentPath = content.projects.find((p) => p.id === slot.id.replace("-video", ""))?.video || "";
          return (
            <div
              key={slot.id}
              className="flex items-center gap-4 p-4 border border-sand/50 rounded-xl mb-3"
            >
              <div className="w-16 h-10 rounded-lg overflow-hidden bg-ink flex-shrink-0 flex items-center justify-center">
                {currentPath ? (
                  <video src={currentPath} className="w-full h-full object-cover" muted />
                ) : (
                  <span className="text-ivory/50 text-xs">无</span>
                )}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-serif text-ink">{slot.label}</p>
                <p className="text-xs text-stone-light truncate">{slot.desc}</p>
              </div>
              <button
                onClick={() => {
                  if (fileInputRef.current) {
                    fileInputRef.current.dataset.slot = slot.id;
                    fileInputRef.current.click();
                  }
                }}
                disabled={uploading === slot.id}
                className="px-4 py-2 text-xs tracking-wider border border-sand rounded-lg text-stone hover:text-ink hover:border-ink transition-colors disabled:opacity-50 flex-shrink-0"
              >
                {uploading === slot.id ? "上传中..." : "上传"}
              </button>
            </div>
          );
        })}

        <p className="text-xs text-stone-light tracking-wider uppercase mb-4">
          视频素材
        </p>
        <div className="flex items-center gap-4 p-4 border border-sand/50 rounded-xl">
          <div className="w-16 h-10 rounded-lg overflow-hidden bg-ink flex-shrink-0 flex items-center justify-center">
            {content.showreelUrl ? (
              <video
                src={content.showreelUrl}
                className="w-full h-full object-cover"
                muted
              />
            ) : (
              <span className="text-ivory/50 text-xs">无</span>
            )}
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-serif text-ink">Showreel</p>
            <p className="text-xs text-stone-light truncate">
              电影质感展示视频 · MP4/WebM ≤200MB
            </p>
          </div>
          <button
            onClick={() =>
              (
                document.getElementById("video-input") as HTMLInputElement
              )?.click()
            }
            disabled={uploading === "video"}
            className="px-4 py-2 text-xs tracking-wider border border-sand rounded-lg text-stone hover:text-ink hover:border-ink transition-colors disabled:opacity-50 flex-shrink-0"
          >
            {uploading === "video" ? "上传中..." : "上传"}
          </button>
        </div>
      </div>
    </EditorShell>
  );
}

// ============================================================
// 关于我编辑器
// ============================================================
function AboutEditor({ onClose }: { onClose: () => void }) {
  const { content, updateContent } = useContent();
  const [about, setAbout] = useState(
    JSON.parse(JSON.stringify(content.aboutContent))
  );

  const handleSave = () => {
    updateContent({ aboutContent: about });
  };

  return (
    <EditorShell title="关于我" onClose={onClose}>
      <div className="space-y-6">
        <Field
          label="标题"
          value={about.title}
          onChange={(v) => setAbout({ ...about, title: v })}
        />
        <Field
          label="英文名"
          value={about.subtitle}
          onChange={(v) => setAbout({ ...about, subtitle: v })}
        />
        <div className="space-y-4">
          <label className="block text-xs text-stone-light tracking-[0.2em] uppercase font-light">
            个人故事
          </label>
          {about.paragraphs.map((p: string, i: number) => (
            <textarea
              key={i}
              value={p}
              onChange={(e) => {
                const next = [...about.paragraphs];
                next[i] = e.target.value;
                setAbout({ ...about, paragraphs: next });
              }}
              rows={3}
              className="w-full px-4 py-3 bg-white/30 border border-transparent rounded-lg text-sm text-stone font-light resize-none focus:outline-none focus:border-sand transition-colors"
            />
          ))}
        </div>
        <SaveButton onClick={handleSave} />
      </div>
    </EditorShell>
  );
}

// ============================================================
// 五维体系编辑器
// ============================================================
function VisionEditor({ onClose }: { onClose: () => void }) {
  const { content, updateContent } = useContent();
  const [nodes, setNodes] = useState(
    JSON.parse(JSON.stringify(content.dimensionNodes))
  );

  const handleSave = () => {
    updateContent({ dimensionNodes: nodes });
  };

  return (
    <EditorShell title="五维创造体系" onClose={onClose}>
      <div className="space-y-5">
        <p className="text-sm text-stone-light font-light mb-4">
          编辑五个节点信息
        </p>
        {nodes.map(
          (
            node: { id: string; name: string; subtitle: string; href: string },
            i: number
          ) => (
            <div
              key={node.id}
              className="flex items-center gap-3 p-4 border border-sand/50 rounded-xl"
            >
              <span className="text-xs text-stone-light w-16 flex-shrink-0">
                {node.id}
              </span>
              <input
                value={node.name}
                onChange={(e) => {
                  const next = [...nodes];
                  next[i] = { ...next[i], name: e.target.value };
                  setNodes(next);
                }}
                className="flex-1 px-3 py-2 bg-white/30 border border-transparent rounded-lg text-sm text-ink font-serif focus:outline-none focus:border-sand transition-colors"
              />
              <input
                value={node.subtitle}
                onChange={(e) => {
                  const next = [...nodes];
                  next[i] = { ...next[i], subtitle: e.target.value };
                  setNodes(next);
                }}
                className="w-24 px-3 py-2 bg-white/30 border border-transparent rounded-lg text-sm text-stone font-light focus:outline-none focus:border-sand transition-colors"
              />
              <input
                value={node.href}
                onChange={(e) => {
                  const next = [...nodes];
                  next[i] = { ...next[i], href: e.target.value };
                  setNodes(next);
                }}
                className="w-32 px-3 py-2 bg-white/30 border border-transparent rounded-lg text-xs text-stone font-light focus:outline-none focus:border-sand transition-colors"
                placeholder="链接..."
              />
            </div>
          )
        )}
        <SaveButton onClick={handleSave} />
      </div>
    </EditorShell>
  );
}

// ============================================================
// 项目内容编辑器
// ============================================================
function ProjectsEditor({ onClose }: { onClose: () => void }) {
  const { content, updateContent } = useContent();
  const [projects, setProjects] = useState(
    JSON.parse(JSON.stringify(content.projects))
  );

  const handleSave = () => {
    updateContent({ projects });
  };

  return (
    <EditorShell title="项目内容" onClose={onClose}>
      <div className="space-y-8">
        <p className="text-sm text-stone-light font-light">
          编辑项目文字信息与视频路径（上传图片/视频请到「媒体管理」）
        </p>
        {projects.map(
          (
            proj: {
              id: string;
              number: string;
              name: string;
              subtitle: string;
              description: string;
              category: string;
              video?: string;
            },
            i: number
          ) => (
            <div
              key={proj.id}
              className="space-y-3 p-5 border border-sand/50 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-3">
                <span className="text-xs text-stone-light">
                  {proj.number}
                </span>
                <span className="font-serif text-lg text-ink">
                  {proj.name}
                </span>
                <span className="text-xs text-stone-light">
                  {proj.category}
                </span>
              </div>
              <Field
                label="项目标语"
                value={proj.subtitle}
                onChange={(v) => {
                  const next = [...projects];
                  next[i] = { ...next[i], subtitle: v };
                  setProjects(next);
                }}
              />
              <div>
                <label className="block text-xs text-stone-light tracking-wider uppercase mb-2 font-light">
                  项目描述
                </label>
                <textarea
                  value={proj.description}
                  onChange={(e) => {
                    const next = [...projects];
                    next[i] = { ...next[i], description: e.target.value };
                    setProjects(next);
                  }}
                  rows={3}
                  className="w-full px-4 py-2 bg-white/30 border border-transparent rounded-lg text-sm text-stone font-light resize-none focus:outline-none focus:border-sand transition-colors"
                />
              </div>
            </div>
          )
        )}
        <SaveButton onClick={handleSave} />
      </div>
    </EditorShell>
  );
}

// ============================================================
// 联系方式编辑器
// ============================================================
function ContactEditor({ onClose }: { onClose: () => void }) {
  const { content, updateContent } = useContent();
  const [contact, setContact] = useState(
    JSON.parse(JSON.stringify(content.contactInfo))
  );

  const handleSave = () => {
    updateContent({ contactInfo: contact });
  };

  return (
    <EditorShell title="联系方式" onClose={onClose}>
      <div className="space-y-6">
        <Field
          label="标题"
          value={contact.title}
          onChange={(v) => setContact({ ...contact, title: v })}
        />
        <div className="space-y-4">
          <label className="block text-xs text-stone-light tracking-[0.2em] uppercase font-light">
            合作方向
          </label>
          {contact.collaborations.map(
            (
              item: { label: string; description: string },
              i: number
            ) => (
              <div key={item.label} className="flex gap-3">
                <input
                  value={item.label}
                  onChange={(e) => {
                    const next = [...contact.collaborations];
                    next[i] = { ...next[i], label: e.target.value };
                    setContact({ ...contact, collaborations: next });
                  }}
                  className="flex-1 px-4 py-2 bg-white/50 border border-sand rounded-lg text-sm text-ink font-light focus:outline-none focus:border-gold/50 transition-colors"
                />
                <input
                  value={item.description}
                  onChange={(e) => {
                    const next = [...contact.collaborations];
                    next[i] = { ...next[i], description: e.target.value };
                    setContact({ ...contact, collaborations: next });
                  }}
                  className="flex-1 px-4 py-2 bg-white/30 border border-transparent rounded-lg text-sm text-stone font-light focus:outline-none focus:border-sand transition-colors"
                />
              </div>
            )
          )}
        </div>
        <SaveButton onClick={handleSave} />
      </div>
    </EditorShell>
  );
}

// ============================================================
// 通用组件
// ============================================================
function EditorShell({
  title,
  children,
  onClose,
}: {
  title: string;
  children: React.ReactNode;
  onClose: () => void;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex items-center justify-between mb-8">
        <h2 className="font-serif text-2xl tracking-wide text-ink">
          {title}
        </h2>
        <button
          onClick={onClose}
          className="text-sm text-stone-light hover:text-ink transition-colors"
        >
          ← 返回
        </button>
      </div>
      {children}
    </motion.div>
  );
}

function Field({
  label,
  value,
  onChange,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs text-stone-light tracking-[0.2em] uppercase mb-3 font-light">
        {label}
      </label>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-5 py-3 bg-white/50 border border-sand rounded-xl text-sm text-ink font-light focus:outline-none focus:border-gold/50 transition-colors"
      />
    </div>
  );
}

function SaveButton({ onClick }: { onClick: () => void }) {
  const [saved, setSaved] = useState(false);

  const handleClick = () => {
    onClick();
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <motion.button
      onClick={handleClick}
      className={`px-8 py-3 rounded-xl text-sm tracking-wider transition-all duration-300 ${
        saved
          ? "bg-nature text-ivory"
          : "bg-ink text-ivory hover:bg-ink/85"
      }`}
      whileTap={{ scale: 0.97 }}
    >
      {saved ? "✓ 已保存" : "保存修改"}
    </motion.button>
  );
}

// ============================================================
// 发布到网站面板
// ============================================================
// 将 IndexedDB 文件上传到 GitHub 并替换为路径
async function embedFilesInContent(obj: any, token: string): Promise<void> {
  const fileIdPattern = /^[a-f0-9-]{36}____/;
  const uploaded = new Map<string, string>(); // id -> path 缓存

  async function uploadToGitHub(id: string, file: File): Promise<string> {
    const safeName = id.replace(/[^a-zA-Z0-9._-]/g, "_");
    const path = "out/uploads/" + safeName;
    
    // 转 base64
    const dataUrl = await new Promise<string>((resolve) => {
      const reader = new FileReader();
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = () => resolve("");
      reader.readAsDataURL(file);
    });
    if (!dataUrl) return id;
    
    const base64Content = dataUrl.split(",")[1];
    
    // 检查文件是否已存在
    let sha = "";
    try {
      const getRes = await fetch(
        "https://api.github.com/repos/hh2928046265-star/Youguang-Studio/contents/" + path,
        { headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json" } }
      );
      if (getRes.ok) {
        const data = await getRes.json();
        sha = data.sha;
      }
    } catch {}
    
    // 上传文件
    const body: any = { message: "上传媒体文件", content: base64Content, branch: "main" };
    if (sha) body.sha = sha;
    
    await fetch(
      "https://api.github.com/repos/hh2928046265-star/Youguang-Studio/contents/" + path,
      {
        method: "PUT",
        headers: { Authorization: "Bearer " + token, Accept: "application/vnd.github+json", "Content-Type": "application/json" },
        body: JSON.stringify(body),
      }
    );
    
    return "/Youguang-Studio/uploads/" + safeName;
  }

  async function processValue(val: any): Promise<any> {
    if (typeof val === "string" && fileIdPattern.test(val) && !val.startsWith("data:") && !val.startsWith("/")) {
      if (uploaded.has(val)) return uploaded.get(val);
      try {
        const file = await getFile(val);
        if (file) {
          const path = await uploadToGitHub(val, file);
          uploaded.set(val, path);
          return path;
        }
      } catch {}
    }
    return val;
  }

  async function walk(o: any): Promise<void> {
    if (!o || typeof o !== "object") return;
    if (Array.isArray(o)) {
      for (let i = 0; i < o.length; i++) {
        if (typeof o[i] === "string") {
          o[i] = await processValue(o[i]);
        } else if (typeof o[i] === "object") {
          await walk(o[i]);
        }
      }
    } else {
      for (const key of Object.keys(o)) {
        if (typeof o[key] === "string") {
          o[key] = await processValue(o[key]);
        } else if (typeof o[key] === "object") {
          await walk(o[key]);
        }
      }
    }
  }

  await walk(obj);
}

function PublishPanel({ onClose }: { onClose: () => void }) {
  const { content } = useContent();
  const [token, setToken] = React.useState("");
  const [status, setStatus] = React.useState("idle");
  const [statusMsg, setStatusMsg] = React.useState("");

  React.useEffect(() => {
    const saved = localStorage.getItem("youguang_gh_token");
    if (saved) setToken(saved);
  }, []);

  const handlePublish = async () => {
    if (!token.trim()) {
      setStatus("error");
      setStatusMsg("请先输入 GitHub Token");
      return;
    }
    localStorage.setItem("youguang_gh_token", token.trim());
    setStatus("publishing");
    setStatusMsg("正在发布...");

    try {
      // 直接从 localStorage 读取最新内容
      const stored = localStorage.getItem("youguang_content");
      const publishContent = stored ? { ...JSON.parse(stored) } : content;

      // 将 IndexedDB 文件 ID 替换为 base64 data URL，让图片能跨设备显示
      setStatusMsg("正在处理图片...");
      await embedFilesInContent(publishContent, token.trim());
      const jsonStr = JSON.stringify(publishContent, null, 2);
      const base64 = btoa(unescape(encodeURIComponent(jsonStr)));

      let sha = "";
      try {
        const getRes = await fetch(
          "https://api.github.com/repos/hh2928046265-star/Youguang-Studio/contents/out/content.json",
          { headers: { Authorization: "Bearer " + token.trim(), Accept: "application/vnd.github+json" } }
        );
        if (getRes.ok) {
          const data = await getRes.json();
          sha = data.sha;
        }
      } catch {}

      const body: { message: string; content: string; branch: string; sha?: string } = { message: "发布内容更新", content: base64, branch: "main" };
      if (sha) body["sha"] = sha;

      const putRes = await fetch(
        "https://api.github.com/repos/hh2928046265-star/Youguang-Studio/contents/out/content.json",
        {
          method: "PUT",
          headers: { Authorization: "Bearer " + token.trim(), Accept: "application/vnd.github+json", "Content-Type": "application/json" },
          body: JSON.stringify(body),
        }
      );

      if (putRes.ok) {
        setStatus("success");
        setStatusMsg("发布成功！网站将在约 2 分钟后更新。");
      } else {
        const err = await putRes.json();
        setStatus("error");
        setStatusMsg("发布失败：" + (err.message || "未知错误"));
      }
    } catch (e: unknown) {
      setStatus("error");
      setStatusMsg("发布失败：" + ((e as Error).message || "网络错误"));
    }
  };

  return (
    <EditorShell title="发布到网站" onClose={onClose}>
      <div className="space-y-8">
        <div className="p-6 bg-white/40 rounded-2xl border border-sand/50">
          <p className="text-sm text-stone leading-relaxed mb-4">
            将当前所有内容发布到线上网站。
            发布后，<strong>所有设备</strong>都会看到最新内容。
          </p>
          <p className="text-xs text-stone-light">
            发布流程：保存内容到 GitHub → 自动构建部署 → 约 2 分钟后生效
          </p>
        </div>

        <div>
          <label className="block text-xs text-stone-light tracking-[0.2em] uppercase mb-3 font-light">
            GitHub Personal Access Token
          </label>
          <input
            type="password"
            value={token}
            onChange={(e) => setToken(e.target.value)}
            placeholder="输入 GitHub Token（需 repo 权限）"
            className="w-full px-5 py-3 bg-white/50 border border-sand rounded-xl text-sm text-ink font-light focus:outline-none focus:border-gold/50 transition-colors"
          />
          <p className="mt-2 text-xs text-stone-light/70">
            如何获取？{" "}
            <a href="https://github.com/settings/tokens" target="_blank" className="text-nature underline" rel="noreferrer">
              打开 GitHub Token 页面
            </a>
            ，Generate new token (classic)，勾选 <strong>repo</strong>，生成后粘贴到这里。
          </p>
        </div>

        {status !== "idle" && (
          <div className={"p-4 rounded-xl text-sm " + (
            status === "publishing" ? "bg-gold/10 text-gold" :
            status === "success" ? "bg-nature/10 text-nature" :
            "bg-red-500/10 text-red-500"
          )}>
            {statusMsg}
          </div>
        )}

        <a
          href="/Youguang-Studio/?preview"
          target="_blank"
          rel="noreferrer"
          className="w-full py-3 border border-gold/40 text-gold text-sm tracking-[0.2em] rounded-xl hover:bg-gold/10 transition-all duration-300 block text-center mb-3"
        >
          预览即将发布的内容 →
        </a>

        <button
          onClick={handlePublish}
          disabled={status === "publishing"}
          className="w-full py-4 bg-gold text-ivory text-sm tracking-[0.2em] rounded-xl hover:bg-gold/90 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "publishing" ? "发布中..." : "发布到网站"}
        </button>
      </div>
    </EditorShell>
  );
}
