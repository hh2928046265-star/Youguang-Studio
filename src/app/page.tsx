import { Navigation, Footer } from "@/components/layout";
import {
  VignetteOverlay,
  ParallaxWrapper,
  LineDraw,
} from "@/components/ui";
import Marquee from "@/components/effects/Marquee";
import Galaxy from "@/components/effects/Galaxy";
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
        <Galaxy
          hueShift={45}
          saturation={0.3}
          glowIntensity={2.0}
          density={1.3}
          mouseRepulsion={true}
          mouseInteraction={true}
          twinkleIntensity={0.5}
          repulsionStrength={1.5}
          speed={0.7}
          transparent={true}
        />
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
