import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Sparkles, Mail, Lock, User, Phone, MapPin, CreditCard, Eye, EyeOff, AlertCircle, CheckCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { authAPI, APIError } from "@/lib/api";
import { VALIDATION, STORAGE_KEYS } from "@/lib/constants";

const AuthPage = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const defaultRole = searchParams.get("role") || "student";
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState(defaultRole);

  // Store auth data in localStorage (mock auth for now)
  const storeAuth = (token: string, userId: string, userRole: string, userData: any) => {
    localStorage.setItem(STORAGE_KEYS.authToken, token);
    localStorage.setItem(STORAGE_KEYS.userId, userId);
    localStorage.setItem(STORAGE_KEYS.userRole, userRole);
    localStorage.setItem("userData", JSON.stringify(userData));
  };

  const handleGoogleLogin = async () => {
    try {
      setLoading(true);
      // Google login - would call backend with auth token
      // For now, mock with demo data
      const mockUser = {
        id: `google_${Date.now()}`,
        email: "user@gmail.com",
        name: "Google User",
        avatar: "https://via.placeholder.com/40"
      };
      
      storeAuth(`token_${Date.now()}`, mockUser.id, role, mockUser);
      navigate(role === "student" ? "/student" : "/owner");
    } catch (error) {
      console.error("Google login failed:", error);
    } finally {
      setLoading(false);
    }
  };

  const AuthForm = ({ formRole }: { formRole: string }) => {
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [aadharNo, setAadharNo] = useState("");
    const [panNo, setPanNo] = useState("");
    const [phoneNo, setPhoneNo] = useState("");
    const [address, setAddress] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [success, setSuccess] = useState("");
    const [formLoading, setFormLoading] = useState(false);

    const validateForm = (): boolean => {
      const newErrors: Record<string, string> = {};

      if (!email) {
        newErrors.email = "Email is required";
      } else if (!VALIDATION.emailRegex.test(email)) {
        newErrors.email = "Invalid email format";
      }

      if (!password) {
        newErrors.password = "Password is required";
      } else if (password.length < 6) {
        newErrors.password = "Password must be at least 6 characters";
      }

      if (!isLogin) {
        if (!fullName) {
          newErrors.fullName = "Full name is required";
        } else if (fullName.length < VALIDATION.minNameLength) {
          newErrors.fullName = "Name too short";
        }

        if (confirmPassword !== password) {
          newErrors.confirmPassword = "Passwords do not match";
        }

        if (!phoneNo) {
          newErrors.phoneNo = "Phone number is required";
        } else if (!VALIDATION.phoneRegex.test(phoneNo)) {
          newErrors.phoneNo = "Invalid phone number";
        }

        if (formRole === "student" && !aadharNo) {
          newErrors.aadharNo = "Aadhar number is required";
        } else if (formRole === "student" && aadharNo.length !== 12) {
          newErrors.aadharNo = "Aadhar must be 12 digits";
        }

        if (!address) {
          newErrors.address = "Address is required";
        }
      }

      setErrors(newErrors);
      return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      setSuccess("");

      if (!validateForm()) {
        return;
      }

      setFormLoading(true);
      try {
        let response;

        if (isLogin) {
          // Login
          if (formRole === "student") {
            response = await authAPI.studentLogin(email, password);
          } else {
            response = await authAPI.ownerLogin(email, password);
          }
        } else {
          // Signup
          const userData = {
            email,
            password,
            name: fullName,
            phone: phoneNo,
            address,
            aadhar: formRole === "student" ? aadharNo : undefined,
            pan: formRole === "student" ? panNo : undefined,
          };

          if (formRole === "student") {
            response = await authAPI.studentSignup(userData);
          } else {
            response = await authAPI.ownerSignup(userData);
          }
        }

        // Mock success response (backend will provide real token)
        const mockToken = `token_${Date.now()}`;
        const mockUserId = `user_${Date.now()}`;

        if (response && response.token) {
          storeAuth(response.token, response.userId, formRole, response.user);
        } else {
          // Fallback for demo
          storeAuth(mockToken, mockUserId, formRole, {
            email,
            name: fullName || email.split("@")[0],
            role: formRole
          });
        }

        setSuccess(isLogin ? "Login successful! Redirecting..." : "Account created! Redirecting...");
        
        setTimeout(() => {
          navigate(formRole === "student" ? "/student" : "/owner");
        }, 1500);

      } catch (error) {
        let errorMessage = "An error occurred";
        
        if (error instanceof APIError) {
          errorMessage = error.message || `Error: ${error.status}`;
        } else if (error instanceof Error) {
          errorMessage = error.message;
        }

        // For demo without backend, still allow login
        if (errorMessage.includes("Failed to") || errorMessage.includes("Cannot")) {
          const mockToken = `token_${Date.now()}`;
          const mockUserId = `user_${Date.now()}`;
          storeAuth(mockToken, mockUserId, formRole, {
            email,
            name: fullName || email.split("@")[0],
            role: formRole
          });
          setSuccess(isLogin ? "Login successful! Redirecting..." : "Account created! Redirecting...");
          
          setTimeout(() => {
            navigate(formRole === "student" ? "/student" : "/owner");
          }, 1500);
        } else {
          setErrors({ submit: errorMessage });
        }
      } finally {
        setFormLoading(false);
      }
    };

    return (
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Error Messages */}
        {errors.submit && (
          <div className="flex gap-2 p-3 bg-destructive/10 border border-destructive/30 rounded-lg text-destructive text-sm">
            <AlertCircle size={18} className="flex-shrink-0 mt-0.5" />
            <span>{errors.submit}</span>
          </div>
        )}

        {/* Success Message */}
        {success && (
          <div className="flex gap-2 p-3 bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-lg text-emerald-700 dark:text-emerald-300 text-sm">
            <CheckCircle size={18} className="flex-shrink-0 mt-0.5" />
            <span>{success}</span>
          </div>
        )}

        {/* Signup Fields */}
        {!isLogin && (
          <>
            {/* Full Name */}
            <div className="relative">
              <User className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input 
                placeholder="Full Name" 
                className={`pl-10 rounded-xl bg-secondary border-0 ${errors.fullName ? "ring-2 ring-destructive" : ""}`}
                value={fullName}
                onChange={(e) => {
                  setFullName(e.target.value);
                  if (errors.fullName) setErrors({ ...errors, fullName: "" });
                }}
                required
                aria-label="Full name"
              />
              {errors.fullName && <p className="text-xs text-destructive mt-1">{errors.fullName}</p>}
            </div>

            {/* Phone Number */}
            <div className="relative">
              <Phone className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input 
                placeholder="Phone Number" 
                className={`pl-10 rounded-xl bg-secondary border-0 ${errors.phoneNo ? "ring-2 ring-destructive" : ""}`}
                value={phoneNo}
                onChange={(e) => {
                  setPhoneNo(e.target.value);
                  if (errors.phoneNo) setErrors({ ...errors, phoneNo: "" });
                }}
                required
                aria-label="Phone number"
              />
              {errors.phoneNo && <p className="text-xs text-destructive mt-1">{errors.phoneNo}</p>}
            </div>

            {/* Address */}
            <div className="relative">
              <MapPin className="absolute left-3 top-3 text-muted-foreground" size={18} />
              <Input 
                placeholder="Address" 
                className={`pl-10 rounded-xl bg-secondary border-0 ${errors.address ? "ring-2 ring-destructive" : ""}`}
                value={address}
                onChange={(e) => {
                  setAddress(e.target.value);
                  if (errors.address) setErrors({ ...errors, address: "" });
                }}
                required
                aria-label="Address"
              />
              {errors.address && <p className="text-xs text-destructive mt-1">{errors.address}</p>}
            </div>

            {/* Student-specific Fields */}
            {formRole === "student" && (
              <>
                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="Aadhar Number (12 digits)" 
                    className={`pl-10 rounded-xl bg-secondary border-0 ${errors.aadharNo ? "ring-2 ring-destructive" : ""}`}
                    value={aadharNo}
                    onChange={(e) => {
                      setAadharNo(e.target.value.replace(/\D/g, ""));
                      if (errors.aadharNo) setErrors({ ...errors, aadharNo: "" });
                    }}
                    maxLength={12}
                    required
                    aria-label="Aadhar number"
                  />
                  {errors.aadharNo && <p className="text-xs text-destructive mt-1">{errors.aadharNo}</p>}
                </div>

                <div className="relative">
                  <CreditCard className="absolute left-3 top-3 text-muted-foreground" size={18} />
                  <Input 
                    placeholder="PAN Number (optional)" 
                    className="pl-10 rounded-xl bg-secondary border-0"
                    value={panNo}
                    onChange={(e) => setPanNo(e.target.value.toUpperCase())}
                    maxLength={10}
                    aria-label="PAN number"
                  />
                </div>
              </>
            )}
          </>
        )}

        {/* Email */}
        <div className="relative">
          <Mail className="absolute left-3 top-3 text-muted-foreground" size={18} />
          <Input 
            type="email" 
            placeholder="Email" 
            className={`pl-10 rounded-xl bg-secondary border-0 ${errors.email ? "ring-2 ring-destructive" : ""}`}
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (errors.email) setErrors({ ...errors, email: "" });
            }}
            required
            aria-label="Email address"
          />
          {errors.email && <p className="text-xs text-destructive mt-1">{errors.email}</p>}
        </div>

        {/* Password */}
        <div className="relative">
          <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
          <Input 
            type={showPassword ? "text" : "password"} 
            placeholder="Password" 
            className={`pl-10 pr-10 rounded-xl bg-secondary border-0 ${errors.password ? "ring-2 ring-destructive" : ""}`}
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (errors.password) setErrors({ ...errors, password: "" });
            }}
            required
            aria-label="Password"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
            aria-label={showPassword ? "Hide password" : "Show password"}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
          {errors.password && <p className="text-xs text-destructive mt-1">{errors.password}</p>}
        </div>

        {/* Confirm Password (Signup only) */}
        {!isLogin && (
          <div className="relative">
            <Lock className="absolute left-3 top-3 text-muted-foreground" size={18} />
            <Input 
              type={showConfirmPassword ? "text" : "password"} 
              placeholder="Confirm Password" 
              className={`pl-10 pr-10 rounded-xl bg-secondary border-0 ${errors.confirmPassword ? "ring-2 ring-destructive" : ""}`}
              value={confirmPassword}
              onChange={(e) => {
                setConfirmPassword(e.target.value);
                if (errors.confirmPassword) setErrors({ ...errors, confirmPassword: "" });
              }}
              required
              aria-label="Confirm password"
            />
            <button
              type="button"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              className="absolute right-3 top-3 text-muted-foreground hover:text-foreground transition-colors"
              aria-label={showConfirmPassword ? "Hide password" : "Show password"}
            >
              {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
            {errors.confirmPassword && <p className="text-xs text-destructive mt-1">{errors.confirmPassword}</p>}
          </div>
        )}

        {/* Submit Button */}
        <Button 
          type="submit" 
          className="w-full gradient-primary text-primary-foreground rounded-xl h-11 font-medium"
          disabled={formLoading || !!success}
        >
          {formLoading ? (
            <span className="flex items-center gap-2">
              <span className="inline-block w-4 h-4 border-2 border-current border-r-transparent rounded-full animate-spin" />
              {isLogin ? "Logging in..." : "Creating account..."}
            </span>
          ) : (
            isLogin ? "Log In" : "Sign Up"
          )}
        </Button>

        {/* Divider */}
        <div className="relative my-4">
          <div className="absolute inset-0 flex items-center">
            <span className="w-full border-t border-border" />
          </div>
          <div className="relative flex justify-center text-xs">
            <span className="bg-card px-2 text-muted-foreground">or</span>
          </div>
        </div>

        {/* Google Login Button */}
        <Button 
          type="button" 
          variant="outline" 
          className="w-full rounded-xl h-11 gap-2 font-medium"
          onClick={handleGoogleLogin}
          disabled={loading}
        >
          <svg className="w-5 h-5" viewBox="0 0 24 24" aria-hidden="true">
            <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" fill="#4285F4"/>
            <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
            <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
            <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
          </svg>
          Continue with Google
        </Button>

        {/* Toggle Auth Mode */}
        <p className="text-center text-sm text-muted-foreground">
          {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
          <button 
            type="button" 
            onClick={() => {
              setIsLogin(!isLogin);
              setErrors({});
              setSuccess("");
            }} 
            className="text-primary font-medium hover:underline transition-colors"
          >
            {isLogin ? "Sign Up" : "Log In"}
          </button>
        </p>
      </form>
    );
  };

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
          <div className="w-20 h-20 flex items-center justify-center mx-auto mb-6">
            <img src="/iconn.png" alt="Residential Nexus Logo" className="w-[68px] h-[68px] object-contain" />
          </div>
          <h2 className="text-4xl font-bold text-primary-foreground mb-4">Welcome to Residential Nexus</h2>
          <p className="text-primary-foreground/80 text-lg max-w-md">
            Your AI-powered companion for finding the perfect student accommodation.
          </p>
          <div className="mt-12 space-y-4 text-left">
            <div className="flex gap-3 text-primary-foreground/90">
              <Sparkles size={20} className="flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Smart Matching</p>
                <p className="text-sm text-primary-foreground/75">AI finds your perfect room</p>
              </div>
            </div>
            <div className="flex gap-3 text-primary-foreground/90">
              <Sparkles size={20} className="flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">Easy Booking</p>
                <p className="text-sm text-primary-foreground/75">Simple and transparent process</p>
              </div>
            </div>
            <div className="flex gap-3 text-primary-foreground/90">
              <Sparkles size={20} className="flex-shrink-0 mt-1" />
              <div>
                <p className="font-semibold">24/7 Support</p>
                <p className="text-sm text-primary-foreground/75">Always here to help</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Right - Form */}
      <div className="flex items-center justify-center p-8 bg-background">
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          className="w-full max-w-md"
        >
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {isLogin ? "Welcome Back" : "Create Account"}
          </h1>
          <p className="text-muted-foreground mb-8">
            {isLogin ? "Log in to continue your journey" : "Get started with Residential Nexus"}
          </p>

          <Tabs value={role} onValueChange={setRole} className="w-full">
            <TabsList className="w-full mb-6 bg-secondary rounded-xl p-1 grid grid-cols-2">
              <TabsTrigger 
                value="student" 
                className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
              >
                Student
              </TabsTrigger>
              <TabsTrigger 
                value="owner" 
                className="flex-1 rounded-lg data-[state=active]:bg-card data-[state=active]:shadow-sm transition-all"
              >
                Owner
              </TabsTrigger>
            </TabsList>
            <TabsContent value="student"><AuthForm formRole="student" /></TabsContent>
            <TabsContent value="owner"><AuthForm formRole="owner" /></TabsContent>
          </Tabs>

          {/* Footer */}
          <div className="mt-8 pt-6 border-t border-border text-center text-xs text-muted-foreground">
            <p>By signing up, you agree to our Terms of Service and Privacy Policy</p>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default AuthPage;
