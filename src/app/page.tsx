import { Navigation, Footer } from "@/components/layout";
import {
  VignetteOverlay,
  ParallaxWrapper,
  LineDraw,
  SplashScreen,
} from "@/components/ui";
import Marquee from "@/components/effects/Marquee";
import GoldParticles from "@/components/effects/GoldParticles";
import CursorGlow from "@/components/effects/CursorGlow";
import GrainOverlay from "@/components/effects/GrainOverlay";
import ScrollProgress from "@/components/effects/ScrollProgress";
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
      <SplashScreen />
      <CursorGlow />
      <GrainOverlay />
      <GoldParticles />
      <ScrollProgress />
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
