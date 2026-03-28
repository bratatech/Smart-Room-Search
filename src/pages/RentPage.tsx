import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Clock, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const rentData = [
  { month: "March 2026", amount: 3500, status: "Paid" as const, date: "Mar 1" },
  { month: "February 2026", amount: 3500, status: "Paid" as const, date: "Feb 1" },
  { month: "January 2026", amount: 3500, status: "Paid" as const, date: "Jan 3" },
  { month: "April 2026", amount: 3500, status: "Pending" as const, date: "Due Apr 1" },
];

const RentPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="sticky top-0 z-50 glass-card border-b border-border/50 px-6 h-14 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft size={20} /></Button>
        <h1 className="font-semibold text-foreground">My Rent</h1>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="glass-card-elevated rounded-2xl p-6 mb-6">
            <p className="text-sm text-muted-foreground mb-1">Current Hostel</p>
            <p className="text-lg font-semibold text-foreground mb-4">Sunrise Student Haven</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Monthly Rent</p>
                <p className="text-2xl font-bold text-foreground">₹3,500</p>
              </div>
              <Badge className="bg-destructive/10 text-destructive border-0 rounded-full px-4 py-1">
                <Clock size={14} className="mr-1" /> 1 Pending
              </Badge>
            </div>
          </div>

          <h2 className="font-semibold text-foreground mb-4">Payment History</h2>
          <div className="space-y-3">
            {rentData.map((r) => (
              <div key={r.month} className="glass-card rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  {r.status === "Paid" ? (
                    <div className="w-10 h-10 rounded-full bg-emerald-500/10 flex items-center justify-center">
                      <CheckCircle2 className="text-emerald-500" size={20} />
                    </div>
                  ) : (
                    <div className="w-10 h-10 rounded-full bg-destructive/10 flex items-center justify-center">
                      <Clock className="text-destructive" size={20} />
                    </div>
                  )}
                  <div>
                    <p className="font-medium text-foreground text-sm">{r.month}</p>
                    <p className="text-xs text-muted-foreground">{r.date}</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <p className="font-semibold text-foreground">₹{r.amount.toLocaleString()}</p>
                  {r.status === "Pending" ? (
                    <Button size="sm" className="gradient-primary text-primary-foreground rounded-lg gap-1">
                      <CreditCard size={14} /> Pay Now
                    </Button>
                  ) : (
                    <Badge variant="secondary" className="rounded-full">Paid</Badge>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RentPage;
