import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  CreditCard,
  Download,
} from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const rentData = [
  { month: "Jan", full: "January 2026", amount: 3500, status: "Paid", date: "Jan 3", receipt: "/receipts/jan.pdf" },
  { month: "Feb", full: "February 2026", amount: 3500, status: "Paid", date: "Feb 1", receipt: "/receipts/feb.pdf" },
  { month: "Mar", full: "March 2026", amount: 3500, status: "Paid", date: "Mar 1", receipt: "/receipts/mar.pdf" },
  { month: "Apr", full: "April 2026", amount: 3500, status: "Pending", date: "Due Apr 1", receipt: null },
];

const monthsOrder = ["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"];

const RentPage = () => {
  const navigate = useNavigate();
  const [selectedMonth, setSelectedMonth] = useState(rentData[2]);

  const getStatus = (month: string) => {
    const data = rentData.find((m) => m.month === month);
    if (!data) return "empty";
    return data.status;
  };

  return (
    <div className="min-h-screen bg-background">
      
      {/* HEADER */}
      <div className="sticky top-0 z-50 glass-card border-b border-border/50 px-6 h-14 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
        </Button>
        <h1 className="font-semibold text-foreground">My Rent</h1>
      </div>

      {/* MAIN GRID */}
      <div className="container mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">

          {/* ================= LEFT SIDE (UNCHANGED) ================= */}
          <div className="lg:col-span-2">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              
              {/* CURRENT RENT CARD */}
              <div className="glass-card-elevated rounded-2xl p-6 mb-6">
                <p className="text-sm text-muted-foreground mb-1">Current Hostel</p>
                <p className="text-lg font-semibold text-foreground mb-4">
                  Sunrise Student Haven
                </p>

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

              {/* PAYMENT LIST */}
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
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 flex items-center justify-center">
                          <Clock className="text-blue-400" size={20} />
                        </div>
                      )}

                      <div>
                        <p className="font-medium text-foreground text-sm">{r.full}</p>
                        <p className="text-xs text-muted-foreground">{r.date}</p>
                      </div>
                    </div>

                    <div className="flex items-center gap-3">
                      <p className="font-semibold text-foreground">₹{r.amount}</p>

                      {r.status === "Pending" ? (
                        <Button size="sm" className="gradient-primary text-primary-foreground rounded-lg gap-1">
                          <CreditCard size={14} /> Pay Now
                        </Button>
                      ) : (
                        <Badge variant="secondary" className="rounded-full bg-emerald-500 text-white border-0">
                          Paid
                        </Badge>
                      )}
                    </div>
                  </div>
                ))}
              </div>

            </motion.div>
          </div>

          {/* ================= RIGHT SIDE (NEW PANEL) ================= */}
          <div className="space-y-6 sticky top-24 h-fit">

            {/* MONTH GRID */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-4">Overview</h3>

              <div className="grid grid-cols-6 gap-2">
                {monthsOrder.map((m) => {
                  const status = getStatus(m);

                  return (
                    <div
                      key={m}
                      onClick={() => {
                        const data = rentData.find((d) => d.month === m);
                        if (data) setSelectedMonth(data);
                      }}
                      className={`h-10 rounded-lg flex items-center justify-center text-xs cursor-pointer transition-all
                        ${status === "Paid" && "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"}
                        ${status === "Pending" && "bg-blue-500/20 text-blue-400 border border-blue-500/30"}
                        ${status === "empty" && "bg-muted text-muted-foreground"}
                        ${selectedMonth.month === m && "ring-2 ring-primary"}
                      `}
                    >
                      {m}
                    </div>
                  );
                })}
              </div>

              {/* LEGEND */}
              <div className="flex gap-4 mt-4 text-xs">
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-emerald-400 rounded-full" />
                  Paid
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-blue-400 rounded-full" />
                  Pending
                </span>
                <span className="flex items-center gap-1">
                  <div className="w-2.5 h-2.5 bg-red-400 rounded-full" />
                  Due
                </span>
              </div>
            </div>

            {/* INSIGHT */}
            <div className="bg-emerald-500/10 border border-emerald-500/20 rounded-2xl p-4">
              <p className="text-sm text-emerald-400 font-medium">
                👍 On-time payments maintained
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                You're consistent with your rent — keep it up!
              </p>
            </div>

            {/* DETAILS */}
            <div className="glass-card rounded-2xl p-5">
              <h3 className="font-semibold mb-3">{selectedMonth.full}</h3>

              <p className="text-sm">
                Status:{" "}
                <span className={selectedMonth.status === "Paid" ? "text-emerald-400" : "text-blue-400"}>
                  {selectedMonth.status}
                </span>
              </p>

              <p className="text-sm">Amount: ₹{selectedMonth.amount}</p>
              <p className="text-sm">Date: {selectedMonth.date}</p>

              <div className="flex gap-2 mt-4">
                
                {selectedMonth.receipt && (
                  <a href={selectedMonth.receipt} download>
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download size={14} /> Download Receipt
                    </Button>
                  </a>
                )}

                {selectedMonth.status !== "Paid" && (
                  <Button size="sm" className="gradient-primary text-primary-foreground gap-2">
                    <CreditCard size={14} /> Pay
                  </Button>
                )}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default RentPage;