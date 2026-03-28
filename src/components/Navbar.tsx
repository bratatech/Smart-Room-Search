import { Link } from "react-router-dom";
import { Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";

const Navbar = () => (
  <nav className="fixed top-0 left-0 right-0 z-50 glass-card border-b border-border/50">
    <div className="container mx-auto px-6 h-16 flex items-center justify-between">
      <Link to="/" className="flex items-center gap-2 font-bold text-xl text-foreground">
          <img src="/iconn.png" alt="HostelAI Logo" className="w-8 h-8 object-contain" />
          HostelAI
      </Link>

      <div className="hidden md:flex items-center gap-6">
        <Link to="/" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Home</Link>
        <Link to="/student" className="text-sm text-muted-foreground hover:text-foreground transition-colors">Explore</Link>
        <Link to="/owner" className="text-sm text-muted-foreground hover:text-foreground transition-colors">For Owners</Link>
      </div>

      <div className="flex items-center gap-3">
        <Button variant="ghost" size="sm" asChild>
          <Link to="/auth?role=student">Log In</Link>
        </Button>
        <Button size="sm" className="gradient-primary text-primary-foreground rounded-lg" asChild>
          <Link to="/auth?role=student">Sign Up</Link>
        </Button>
      </div>
    </div>
  </nav>
);

export default Navbar;
