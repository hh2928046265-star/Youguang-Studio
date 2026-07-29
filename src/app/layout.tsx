import type { Metadata } from "next";
import { Inter, Cormorant_Garamond, Noto_Serif_SC } from "next/font/google";
import "./globals.css";
import Providers from "@/components/providers/Providers";
import { SplashScreen, Cursor, ClickRipple } from "@/components/ui";
import CursorGlow from "@/components/effects/CursorGlow";
import GrainOverlay from "@/components/effects/GrainOverlay";
import ScrollProgress from "@/components/effects/ScrollProgress";
import GoldParticles from "@/components/effects/GoldParticles";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  display: "swap",
});

const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const notoSerifSC = Noto_Serif_SC({
  variable: "--font-serif-sc",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "游光 Studio | Zhou You Visual Creation",
  description: "AI时代数字视觉创作者 — 周游的个人视觉创作展厅",
  keywords: ["视觉创作", "摄影", "AI创作", "数字艺术", "周游", "游光"],
  openGraph: {
    title: "游光 Studio | Zhou You Visual Creation",
    description: "AI时代数字视觉创作者 — 周游的个人视觉创作展厅",
    type: "website",
    locale: "zh_CN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="zh-CN" className="scroll-smooth">
      <body
        className={`${inter.variable} ${cormorantGaramond.variable} ${notoSerifSC.variable} min-h-screen bg-ivory bg-breathe text-ink antialiased`}
      >
        <Providers>
          <SplashScreen />
          <Cursor />
          <CursorGlow />
          <GrainOverlay />
          <ScrollProgress />
          <ClickRipple />
          {children}
        </Providers>
      </body>
    </html>
  );
}
