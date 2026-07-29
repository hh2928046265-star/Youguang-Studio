import { Navigation, Footer } from "@/components/layout";
import {
  VignetteOverlay,
  ParallaxWrapper,
  LineDraw,
} from "@/components/ui";
import Marquee from "@/components/effects/Marquee";
import CanvasAmbiance from "@/components/effects/CanvasAmbiance";
import { ScrollBgGradient, ScrollBgScript } from "@/components/effects/AdvancedEffects";
import {
  Hero,
  About,
  Philosophy,
  FiveDimensions,
  ProjectDetail,
  CreativeAbility,
  Timeline,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <CanvasAmbiance />
      <ScrollBgGradient />
      <ScrollBgScript />
      <VignetteOverlay />
      <Navigation />
      <main>
        <Hero />
        <Marquee />
        <LineDraw />
        <ParallaxWrapper><About /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><Philosophy /></ParallaxWrapper>
        <LineDraw />
        <FiveDimensions />
        <LineDraw />
        <ProjectDetail />
        <LineDraw />
        <CreativeAbility />
        <LineDraw />
        <Timeline />
        <LineDraw />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
