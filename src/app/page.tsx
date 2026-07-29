import { Navigation, Footer } from "@/components/layout";
import { LightSweep, VignetteOverlay, ParallaxWrapper, LineDraw, CenterProximity } from "@/components/ui";
import GoldParticles from "@/components/effects/GoldParticles";
import {
  Hero,
  About,
  Philosophy,
  FiveDimensions,
  ProjectDetail,
  VideoShowcase,
  CreativeAbility,
  Timeline,
  Contact,
} from "@/components/sections";

export default function Home() {
  return (
    <>
      <GoldParticles />
      <LightSweep />
      <VignetteOverlay />
      <Navigation />
      <main>
        <Hero />
        <LineDraw />
        <ParallaxWrapper><About /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><Philosophy /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><FiveDimensions /></ParallaxWrapper>
        <LineDraw />
        <ProjectDetail />
        <LineDraw />
        <CenterProximity>
          <VideoShowcase />
        </CenterProximity>
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
