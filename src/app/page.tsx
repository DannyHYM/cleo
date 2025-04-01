import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import FeatureShowcase from "@/components/sections/FeatureShowcase";
import TechnicalSpecs from "@/components/sections/TechnicalSpecs";
import UseCases from "@/components/sections/UseCases";
import Testimonials from "@/components/sections/Testimonials";
import FounderStory from "@/components/sections/FounderStory";
import FinalCTA from "@/components/sections/FinalCTA";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      {/* <Header /> */}
      <Hero />
      <FeatureShowcase />
      <TechnicalSpecs />
      <UseCases />
      <Testimonials />
      <FounderStory />
      <FinalCTA />
      <Footer />
    </main>
  );
}
