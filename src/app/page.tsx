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
      <div className="fixed inset-0 z-0">
        <ResponsiveGalaxy />
      </div>
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
