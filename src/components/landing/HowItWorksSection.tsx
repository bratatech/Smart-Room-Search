import { motion } from "framer-motion";
import { Search, Sparkles, CalendarCheck } from "lucide-react";
import { LucideIcon } from "lucide-react";

type Step = {
  icon: LucideIcon | string;
  type: "icon" | "image";
  title: string;
  description: string;
};

const steps: Step[] = [
  {
    icon: Search,
    type: "icon",
    title: "Search or Upload",
    description: "Use natural language or upload a room photo",
  },
  {
    icon: Sparkles,
    type: "icon",
    title: "AI Curates",
    description: "Get personalized hostel recommendations",
  },
  {
    icon: CalendarCheck,
    type: "icon",
    title: "Book or Visit",
    description: "Book online or schedule an in-person visit",
  },
  {
    icon: "/iconn.png",
    type: "image",
    title: "Manage Your Stay",
    description: "Track rent, payments, and more",
  },
];

const HowItWorksSection = () => {
  return (
    <section className="py-24 px-6" style={{ background: "var(--gradient-hero)" }}>
      <div className="container mx-auto">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-4">
            How It Works
          </h2>
          <p className="text-muted-foreground text-lg">
            Four simple steps to your new home
          </p>
        </motion.div>

        <div className="grid md:grid-cols-4 gap-8 relative">
          
          <div className="hidden md:block absolute top-12 left-[12%] right-[12%] h-0.5 bg-gradient-to-r from-primary/20 via-accent/30 to-primary/20" />

          {steps.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="text-center relative"
            >
              
              <div className="w-24 h-24 rounded-full glass-card-elevated mx-auto mb-6 flex items-center justify-center relative">
                
                {s.type === "image" ? (
                  <img src={s.icon as string} alt="logo" className="w-10 h-10 object-contain" />
                ) : (
                  (() => {
                    const Icon = s.icon as LucideIcon;
                    return <Icon className="text-primary" size={32} />;
                  })()
                )}

                <span className="absolute -top-2 -right-2 w-8 h-8 rounded-full gradient-primary text-primary-foreground text-sm font-bold flex items-center justify-center">
                  {i + 1}
                </span>
              </div>

              <h3 className="font-semibold text-foreground text-lg mb-2">
                {s.title}
              </h3>
              <p className="text-muted-foreground text-sm">
                {s.description}
              </p>

            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorksSection;