import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, MapPin, Star, Wifi, Wind, Dumbbell, BookOpen, Sparkles, Shield, CalendarCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { hostels } from "@/data/mockData";

const facilityIcons: Record<string, typeof Wifi> = {
  "Wi-Fi": Wifi, "High-Speed Wi-Fi": Wifi, "AC": Wind, "Gym": Dumbbell,
  "Study Room": BookOpen, "Library": BookOpen, "Co-working Space": BookOpen,
};

const HostelDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [bookingOpen, setBookingOpen] = useState(false);
  const hostel = hostels.find((h) => h.id === id);

  if (!hostel) return <div className="p-8 text-center text-muted-foreground">Hostel not found.</div>;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-50 glass-card border-b border-border/50 px-6 h-14 flex items-center gap-4">
        <Button variant="ghost" size="icon" onClick={() => navigate(-1)}><ArrowLeft size={20} /></Button>
        <h1 className="font-semibold text-foreground">{hostel.name}</h1>
      </div>

      <div className="container mx-auto px-6 py-8 max-w-4xl">
        {/* Image */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-2xl overflow-hidden h-72 md:h-96 mb-8">
          <img src={hostel.image} alt={hostel.name} className="w-full h-full object-cover" />
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          <div className="md:col-span-2 space-y-8">
            {/* Title */}
            <div>
              <div className="flex items-center gap-3 mb-2">
                <h1 className="text-3xl font-bold text-foreground">{hostel.name}</h1>
                <Badge className="gradient-primary text-primary-foreground rounded-full">{hostel.matchPercent}% match</Badge>
              </div>
              <div className="flex items-center gap-4 text-muted-foreground">
                <span className="flex items-center gap-1"><MapPin size={16} />{hostel.location}</span>
                <span className="flex items-center gap-1"><Star size={16} className="text-amber-400 fill-amber-400" />{hostel.rating}</span>
              </div>
            </div>

            {/* AI Explanation */}
            <div className="bg-primary/5 rounded-2xl p-5 border border-primary/10">
              <div className="flex items-center gap-2 mb-2">
                <Sparkles className="text-primary" size={18} />
                <span className="font-semibold text-foreground text-sm">Why this hostel?</span>
              </div>
              <p className="text-sm text-muted-foreground">{hostel.whyRecommended}</p>
            </div>

            {/* Facilities */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Facilities</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {hostel.facilities.map((f) => {
                  const Icon = facilityIcons[f] || Shield;
                  return (
                    <div key={f} className="flex items-center gap-3 glass-card rounded-xl p-3">
                      <Icon className="text-primary" size={18} />
                      <span className="text-sm text-foreground">{f}</span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Rules */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">House Rules</h3>
              <ul className="space-y-2">
                {hostel.rules.map((r) => (
                  <li key={r} className="flex items-center gap-2 text-sm text-muted-foreground">
                    <Shield className="text-destructive shrink-0" size={14} /> {r}
                  </li>
                ))}
              </ul>
            </div>

            {/* Reviews */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">Reviews</h3>
              <div className="space-y-4">
                {hostel.reviews.map((r) => (
                  <div key={r.name} className="glass-card rounded-xl p-4">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-foreground text-sm">{r.name}</span>
                      <div className="flex items-center gap-1">
                        <Star className="text-amber-400 fill-amber-400" size={14} />
                        <span className="text-sm text-foreground">{r.rating}</span>
                      </div>
                    </div>
                    <p className="text-sm text-muted-foreground">{r.comment}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar - Price & Actions */}
          <div className="space-y-4">
            <div className="glass-card-elevated rounded-2xl p-6 sticky top-20">
              <p className="text-3xl font-bold text-foreground mb-1">₹{hostel.price.toLocaleString()}<span className="text-base font-normal text-muted-foreground">/month</span></p>
              <p className="text-sm text-muted-foreground mb-6">Includes meals & utilities</p>

              <Dialog open={bookingOpen} onOpenChange={setBookingOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full gradient-primary text-primary-foreground rounded-xl h-11 mb-3">
                    Book Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="rounded-2xl">
                  <DialogHeader>
                    <DialogTitle>Book {hostel.name}</DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4 pt-4">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Move-in Date</label>
                      <Input type="date" className="rounded-xl" />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-1 block">Duration (months)</label>
                      <Input type="number" defaultValue={6} min={1} className="rounded-xl" />
                    </div>
                    <div className="bg-secondary rounded-xl p-4">
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Monthly Rent</span>
                        <span className="text-foreground font-medium">₹{hostel.price.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-sm mb-1">
                        <span className="text-muted-foreground">Security Deposit</span>
                        <span className="text-foreground font-medium">₹{(hostel.price * 2).toLocaleString()}</span>
                      </div>
                      <div className="border-t border-border mt-2 pt-2 flex justify-between text-sm font-semibold">
                        <span className="text-foreground">Total Due</span>
                        <span className="text-foreground">₹{(hostel.price * 3).toLocaleString()}</span>
                      </div>
                    </div>
                    <Button className="w-full gradient-primary text-primary-foreground rounded-xl" onClick={() => setBookingOpen(false)}>
                      Confirm Booking
                    </Button>
                  </div>
                </DialogContent>
              </Dialog>

              <Button variant="outline" className="w-full rounded-xl h-11 gap-2">
                <CalendarCheck size={16} /> Schedule Visit
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelDetail;
