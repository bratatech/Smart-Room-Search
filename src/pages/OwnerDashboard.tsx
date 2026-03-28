import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Building2, Users, CreditCard, Plus, Bell, LogOut, Sparkles,
  TrendingUp, Home, IndianRupee, UserCheck, Upload, Phone
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { tenants } from "@/data/mockData";

type Tab = "dashboard" | "add" | "tenants" | "payments";

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState<Tab>((params.get("tab") as Tab) || "dashboard");

  const stats = [
    { label: "Total Properties", value: "3", icon: Home, color: "text-primary" },
    { label: "Occupancy Rate", value: "87%", icon: UserCheck, color: "text-emerald-500" },
    { label: "Pending Payments", value: "₹9,000", icon: IndianRupee, color: "text-destructive" },
    { label: "Monthly Revenue", value: "₹52,500", icon: TrendingUp, color: "text-accent" },
  ];

  const sidebarItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "add", label: "Add Property", icon: Plus },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  return (
    <div className="min-h-screen bg-background flex">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col border-r border-border bg-card p-6">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 font-bold text-xl text-foreground mb-8">
          <div className="w-8 h-8 rounded-lg gradient-primary flex items-center justify-center">
            <Sparkles className="text-primary-foreground" size={18} />
          </div>
          HostelAI
        </button>

        <nav className="flex-1 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm transition-all ${
                activeTab === item.id
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:bg-secondary"
              }`}
            >
              <item.icon size={18} />
              {item.label}
            </button>
          ))}
        </nav>

        <Button variant="ghost" className="justify-start gap-2 text-muted-foreground mt-auto" onClick={() => navigate("/")}>
          <LogOut size={18} /> Log Out
        </Button>
      </aside>

      {/* Main */}
      <div className="flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-50 glass-card border-b border-border/50 px-6 h-14 flex items-center justify-between">
          <h1 className="font-semibold text-foreground capitalize">{activeTab === "add" ? "Add Property" : activeTab}</h1>
          <div className="flex items-center gap-3">
            <Button variant="ghost" size="icon"><Bell size={18} /></Button>
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center">
              <span className="text-primary-foreground text-sm font-semibold">O</span>
            </div>
          </div>
        </header>

        {/* Mobile nav */}
        <div className="md:hidden flex gap-2 p-4 overflow-x-auto border-b border-border">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              size="sm"
              variant={activeTab === item.id ? "default" : "outline"}
              onClick={() => setActiveTab(item.id)}
              className={`rounded-xl gap-1 shrink-0 ${activeTab === item.id ? "gradient-primary text-primary-foreground" : ""}`}
            >
              <item.icon size={14} /> {item.label}
            </Button>
          ))}
        </div>

        <main className="p-6">
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="glass-card rounded-2xl p-5 hover-lift">
                    <div className="flex items-center justify-between mb-3">
                      <s.icon className={s.color} size={22} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-sm text-muted-foreground">{s.label}</p>
                  </div>
                ))}
              </div>

              <h2 className="font-semibold text-foreground mb-4">Recent Activity</h2>
              <div className="glass-card rounded-2xl p-5 space-y-4">
                {[
                  { text: "New booking request from Arjun Sharma", time: "2 hours ago" },
                  { text: "Rent payment received from Rahul Kumar — ₹5,500", time: "5 hours ago" },
                  { text: "Maintenance request for Room 102-B", time: "1 day ago" },
                ].map((a) => (
                  <div key={a.text} className="flex items-center justify-between py-2 border-b border-border last:border-0">
                    <p className="text-sm text-foreground">{a.text}</p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-4">{a.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {activeTab === "add" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl">
              <div className="glass-card rounded-2xl p-6 space-y-5">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Hostel Name</label>
                    <Input placeholder="e.g., Sunrise Student Haven" className="rounded-xl bg-secondary border-0" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1.5 block">Monthly Price (₹)</label>
                    <Input type="number" placeholder="3500" className="rounded-xl bg-secondary border-0" />
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Location</label>
                  <Input placeholder="e.g., Koramangala, Bangalore" className="rounded-xl bg-secondary border-0" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Upload Images</label>
                  <div className="border-2 border-dashed border-border rounded-xl p-8 text-center cursor-pointer hover:border-primary/40 transition-colors">
                    <Upload className="mx-auto text-muted-foreground mb-2" size={24} />
                    <p className="text-sm text-muted-foreground">Drag & drop images or click to browse</p>
                  </div>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Facilities</label>
                  <Input placeholder="Wi-Fi, AC, Gym, Meals..." className="rounded-xl bg-secondary border-0" />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1.5 block">Rules</label>
                  <Textarea placeholder="No smoking, gate closes at 11 PM..." className="rounded-xl bg-secondary border-0 min-h-[80px]" />
                </div>
                <Button className="gradient-primary text-primary-foreground rounded-xl px-8">
                  <Building2 size={16} className="mr-2" /> Add Property
                </Button>
              </div>
            </motion.div>
          )}

          {activeTab === "tenants" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="glass-card rounded-2xl overflow-hidden">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-border">
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Name</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Room</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Rent Status</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Amount</th>
                        <th className="text-left p-4 text-sm font-medium text-muted-foreground">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {tenants.map((t) => (
                        <tr key={t.id} className="border-b border-border last:border-0 hover:bg-secondary/50 transition-colors">
                          <td className="p-4 text-sm text-foreground font-medium">{t.name}</td>
                          <td className="p-4 text-sm text-muted-foreground">{t.room}</td>
                          <td className="p-4">
                            <Badge
                              className={`rounded-full border-0 ${
                                t.rentStatus === "Paid"
                                  ? "bg-emerald-500/10 text-emerald-600"
                                  : "bg-destructive/10 text-destructive"
                              }`}
                            >
                              {t.rentStatus}
                            </Badge>
                          </td>
                          <td className="p-4 text-sm text-foreground">₹{t.amount.toLocaleString()}</td>
                          <td className="p-4">
                            <Button size="sm" variant="outline" className="rounded-lg gap-1">
                              <Phone size={14} /> Contact
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </motion.div>
          )}

          {activeTab === "payments" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="space-y-3">
                {tenants.map((t) => (
                  <div key={t.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                    <div>
                      <p className="font-medium text-foreground text-sm">{t.name}</p>
                      <p className="text-xs text-muted-foreground">Room {t.room} · ₹{t.amount.toLocaleString()}/mo</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <Badge
                        className={`rounded-full border-0 ${
                          t.rentStatus === "Paid"
                            ? "bg-emerald-500/10 text-emerald-600"
                            : "bg-destructive/10 text-destructive"
                        }`}
                      >
                        {t.rentStatus}
                      </Badge>
                      {t.rentStatus === "Pending" && (
                        <Button size="sm" variant="outline" className="rounded-lg gap-1">
                          <Bell size={14} /> Send Reminder
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}
        </main>
      </div>
    </div>
  );
};

export default OwnerDashboard;
