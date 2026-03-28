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
          <div className="w-6 h-6 rounded-md gradient-primary flex items-center justify-center">
            <Sparkles className="text-primary-foreground" size={14} />
          </div>
          Residential Nexus
        </div>
        <p className="text-sm text-muted-foreground">© 2026 Residential Nexus. Built for students, powered by AI.</p>
      </div>
    </footer>
  </div>
);

export default Index;
