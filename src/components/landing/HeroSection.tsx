import { motion } from "framer-motion";
import { Search, Building2, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <section className="relative min-h-[90vh] flex items-center overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute top-20 right-10 w-72 h-72 rounded-full bg-primary/5 blur-3xl animate-float" />
      <div className="absolute bottom-20 left-10 w-96 h-96 rounded-full bg-accent/5 blur-3xl animate-float" style={{ animationDelay: "3s" }} />

      <div className="container mx-auto px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              AI-Powered Discovery
            </div>

            <h1 className="text-5xl lg:text-6xl font-bold leading-tight mb-6 text-foreground">
              Find Your Perfect Student Hostel —{" "}
              <span className="gradient-text">Smarter with AI</span>
            </h1>

            <p className="text-lg text-muted-foreground mb-8 max-w-lg">
              Search by preferences, not just price. Discover spaces that match your lifestyle.
            </p>

            <div className="glass-card rounded-2xl p-2 mb-8 max-w-xl">
              <div className="flex items-center gap-2">
                <Search className="ml-3 text-muted-foreground" size={20} />
                <Input
                  placeholder='Try: Quiet hostel under ₹4000 with good food'
                  className="border-0 bg-transparent shadow-none focus-visible:ring-0 text-base"
                />
                <Button onClick={() => navigate("/student")} className="gradient-primary rounded-xl px-6 text-primary-foreground">
                  Search
                </Button>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <Button onClick={() => navigate("/student")} size="lg" className="gradient-primary rounded-xl text-primary-foreground gap-2">
                Find Hostels <ArrowRight size={18} />
              </Button>
              <Button onClick={() => navigate("/owner")} size="lg" variant="outline" className="rounded-xl gap-2">
                <Building2 size={18} /> List Your Property
              </Button>
            </div>
          </motion.div>

          {/* Right - Floating Cards */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.7, delay: 0.3 }}
            className="hidden lg:block relative"
          >
            {[
              { name: "Sunrise Student Haven", price: "₹3,500/mo", match: "95%", y: 0, rotate: -2 },
              { name: "Urban Nest Co-Living", price: "₹5,500/mo", match: "88%", y: 20, rotate: 2 },
              { name: "TechHub Residency", price: "₹4,500/mo", match: "91%", y: 40, rotate: -1 },
            ].map((card, i) => (
              <motion.div
                key={card.name}
                className="glass-card-elevated rounded-2xl p-5 mb-4"
                animate={{ y: [card.y, card.y - 8, card.y] }}
                transition={{ duration: 4 + i, repeat: Infinity, ease: "easeInOut" }}
                style={{ transform: `rotate(${card.rotate}deg)` }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-foreground">{card.name}</p>
                    <p className="text-sm text-muted-foreground">{card.price}</p>
                  </div>
                  <div className="gradient-primary text-primary-foreground text-sm font-bold px-3 py-1 rounded-full">
                    {card.match} match
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
