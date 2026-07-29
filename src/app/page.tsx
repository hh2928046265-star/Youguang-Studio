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
      <Galaxy
        hueShift={45}
        saturation={0.25}
        glowIntensity={0.5}
        density={0.7}
        mouseRepulsion={true}
        mouseInteraction={true}
        twinkleIntensity={0.4}
        repulsionStrength={1.5}
        transparent={true}
        className="fixed inset-0 z-0"
      />
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
