import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, Phone, MapPin, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultRole = searchParams.get("role") || "student";
  const [isLogin, setIsLogin] = useState(true);

  const handleSubmit = (e: React.FormEvent, role: string) => {
    e.preventDefault();
    navigate(role === "student" ? "/student" : "/owner");
  };

  const AuthForm = ({ role }: { role: string }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [aadharNo, setAadharNo] = useState("");
    const [panNo, setPanNo] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");

    return (
    <form onSubmit={(e) => handleSubmit(e, role)} className="space-y-4">
      {!isLogin && (
        <>
          <div className="relative">
            <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input 
              placeholder="Full Name" 
              className="pl-10 rounded-xl bg-secondary border-0" 
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
          </div>
          {role === "student" && (
            <>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Aadhar Number" 
                  className="pl-10 rounded-xl bg-secondary border-0" 
                  value={aadharNo}
                  onChange={(e) => setAadharNo(e.target.value)}
                  required
                />
              </div>
              <div className="relative">
                <CreditCard className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input 
                  placeholder="PAN Number" 
                  className="pl-10 rounded-xl bg-secondary border-0" 
                  value={panNo}
                  onChange={(e) => setPanNo(e.target.value)}
                />
              </div>
              <div className="relative">
                <Phone className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Phone Number" 
                  className="pl-10 rounded-xl bg-secondary border-0" 
                  value={phoneNo}
                  onChange={(e) => setPhoneNo(e.target.value)}
                />
              </div>
              <div className="relative">
                <MapPin className="absolute left-3 top-3 text-muted-foreground" size={18} />
                <Input 
                  placeholder="Address" 
                  className="pl-10 rounded-xl bg-secondary border-0" 
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                />
              </div>
            </>
          )}
        </>
      )}
      <div className="relative">
        <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
        <Input 
          type="email" 
          placeholder="Email" 
          className="pl-10 rounded-xl bg-secondary border-0" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <div className="relative">
        <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
        <Input 
          type="password" 
          placeholder="Password" 
          className="pl-10 rounded-xl bg-secondary border-0" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <Button type="submit" className="w-full gradient-primary text-primary-foreground rounded-xl h-11">
        {isLogin ? "Log In" : "Sign Up"}
      </Button>

      <div className="relative my-4">
        <div className="absolute inset-0 flex items-center"><span className="w-full border-t border-border" /></div>
        <div className="relative flex justify-center text-xs"><span className="bg-card px-2 text-muted-foreground">or</span></div>
      </div>

      <Button type="button" variant="outline" className="w-full rounded-xl h-11 gap-2">
        <svg className="w-5 h-5" viewBox="0 0 24 24"><path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/><path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/><path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/><path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/></svg>
        Continue with Google
      </Button>

      <p className="text-center text-sm text-muted-foreground">
        {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
        <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-primary font-medium hover:underline">
          {isLogin ? "Sign Up" : "Log In"}
        </button>
      </p>
    </form>
  );

  return (
    <div className="min-h-screen grid lg:grid-cols-2">
      {/* Left - Illustration */}
      <div className="hidden lg:flex items-center justify-center gradient-primary relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,hsl(280_60%_55%/0.4),transparent)]" />
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center relative z-10 p-12"
        >
          <div className="w-20 h-20 rounded-2xl bg-primary-foreground/20 flex items-center justify-center mx-auto mb-6">
            <img src="/iconn.png" alt="HostelAI Logo" className="w-[68px] h-[68px] object-contain" />
            
          </div>
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Welcome to Resedential Nexus</h2>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Your AI-powered companion for finding the perfect student accommodation.
          </p>
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="flex items-center justify-center p-8">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin ? "Log in to continue your journey" : "Get started with HostelAI"}
          </p>

          <Tabs defaultValue={defaultRole}>
            <TabsList className="w-full mb-6 bg-secondary rounded-xl p-1">
              <TabsTrigger value="student" className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">Student</TabsTrigger>
              <TabsTrigger value="owner" className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm">Owner</TabsTrigger>
            </TabsList>
            <TabsContent value="student"><AuthForm role="student" /></TabsContent>
            <TabsContent value="owner"><AuthForm role="owner" /></TabsContent>
          </Tabs>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
