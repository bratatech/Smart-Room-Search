import Navbar from "@/components/Navbar";
import HeroSection from "@/components/landing/HeroSection";
import FeaturesSection from "@/components/landing/FeaturesSection";
import HowItWorksSection from "@/components/landing/HowItWorksSection";
import CTASection from "@/components/landing/CTASection";
import { Sparkles } from "lucide-react";

const Index = () => (
  <div className="min-h-screen bg-background">
    <Navbar />
    <main className="pt-16">
      <HeroSection />
      <FeaturesSection />
      <HowItWorksSection />
      <CTASection />
    </main>
    <footer className="border-t border-border py-8 px-6">
      <div className="container mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-foreground">
            <img src="/iconn.png" alt="HostelAI Logo" className="w-8 h-8 object-contain" />
          Residential Nexus
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Residential Nexus. Built for students, powered by AI.</p>
      </div>
    </footer>
  </div>
);

export default Index;
