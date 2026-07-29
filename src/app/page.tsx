import { Navigation, Footer } from "@/components/layout";
import {
  VignetteOverlay,
  ParallaxWrapper,
  LineDraw,
} from "@/components/ui";
import Marquee from "@/components/effects/Marquee";
import ResponsiveGalaxy from "@/components/effects/ResponsiveGalaxy";
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
      <div className="fixed inset-0 z-0 pointer-events-none">
        <ResponsiveGalaxy />
      </div>
      <VignetteOverlay />
      <Navigation />
      <main className="relative z-[1]">
        <Hero />
        <Marquee />
        <LineDraw />
        <ParallaxWrapper><About /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><Philosophy /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><FiveDimensions /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><ProjectDetail /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><CreativeAbility /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><Timeline /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><Contact /></ParallaxWrapper>
      </main>
      <Footer />
    </>
  );
}
