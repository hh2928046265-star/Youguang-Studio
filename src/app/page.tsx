import { Navigation, Footer } from "@/components/layout";
import { LightSweep, VignetteOverlay, ParallaxWrapper, LineDraw, CenterProximity } from "@/components/ui";
import Marquee from "@/components/effects/Marquee";
import GoldParticles from "@/components/effects/GoldParticles";
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

const marquee1 = ["https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600","https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=600","https://images.unsplash.com/photo-1518173946687-a1e4e3e6a4b0?w=600","https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=600","https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600","https://images.unsplash.com/photo-1426604966848-d7adac402bff?w=600",];
const marquee2 = ["https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=600","https://images.unsplash.com/photo-1505144808419-1957a94ca61e?w=600","https://images.unsplash.com/photo-1433086966358-54859d0ed716?w=600","https://images.unsplash.com/photo-1465059407612-0c52e87e9c45?w=600","https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600",];

export default function Home() {
  return (
    <>
      <GoldParticles />
      <LightSweep />
      <VignetteOverlay />
      <Navigation />
      <main>
        <Hero />
        <Marquee images1={marquee1} images2={marquee2} />
        <LineDraw />
        <ParallaxWrapper><About /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><Philosophy /></ParallaxWrapper>
        <LineDraw />
        <ParallaxWrapper><FiveDimensions /></ParallaxWrapper>
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
