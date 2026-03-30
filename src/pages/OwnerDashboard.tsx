import { useState, useRef, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Building2, Users, CreditCard, Plus, Bell, LogOut, Sparkles,
  TrendingUp, Home, IndianRupee, UserCheck, Upload, Phone, ClipboardList,
  Eye, CheckCircle2, XCircle, Calendar, Smartphone, Building, Star, Trash2,
  MapPin
} from "lucide-react";
import AddPaymentAccountDialog from "@/components/AddPaymentAccountDialog";
import AllocationDialog from "@/components/AllocationDialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import {
  tenants, bookingRequests as initialRequests, paymentAccounts as initialAccounts,
  BookingRequest, PaymentAccount
} from "@/data/mockData";

type Tab = "dashboard" | "add" | "tenants" | "payments" | "requests";

// Define libraries outside to prevent unnecessary re-renders
const libraries: ("places")[] = ["places"];

const OwnerDashboard = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const [activeTab, setActiveTab] = useState<Tab>((params.get("tab") as Tab) || "dashboard");
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const [requests, setRequests] = useState<BookingRequest[]>(initialRequests);
  const [accounts, setAccounts] = useState<PaymentAccount[]>(initialAccounts);
  const [showAllocation, setShowAllocation] = useState(false);
  const [selectedRequest, setSelectedRequest] = useState<BookingRequest | null>(null);
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [searchImage, setSearchImage] = useState<File | null>(null);

  // --- MAP STATES ---
  const [markerPosition, setMarkerPosition] = useState({ lat: 12.9716, lng: 77.5946 });
  const [address, setAddress] = useState("");

  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "AIzaSyAqPp2kXmNBxo1B0wE_FLQIe5X43xT2EHM", // <--- REPLACE THIS WITH REAL KEY
    libraries
  });

  // --- MAP HANDLERS ---
  const onMapClick = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const onMarkerDragEnd = (e: google.maps.MapMouseEvent) => {
    if (e.latLng) {
      setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
    }
  };

  const notifications = [
    { id: 1, text: "New booking request received" },
    { id: 2, text: "Rent payment received ₹5,500" },
    { id: 3, text: "Maintenance request for Room 102" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const stats = [
    { label: "Total Properties", value: "3", icon: Home, color: "text-primary" },
    { label: "Occupancy Rate", value: "87%", icon: UserCheck, color: "text-success" },
    { label: "Pending Payments", value: "₹9,000", icon: IndianRupee, color: "text-destructive" },
    { label: "Monthly Revenue", value: "₹52,500", icon: TrendingUp, color: "text-accent" },
  ];

  const sidebarItems: { id: Tab; label: string; icon: typeof LayoutDashboard }[] = [
    { id: "dashboard", label: "Dashboard", icon: LayoutDashboard },
    { id: "requests", label: "Requests", icon: ClipboardList },
    { id: "add", label: "Add Property", icon: Plus },
    { id: "tenants", label: "Tenants", icon: Users },
    { id: "payments", label: "Payments", icon: CreditCard },
  ];

  const pendingRequestsCount = requests.filter(r => r.status === "pending").length;

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setSearchImage(e.target.files[0]);
  };

  const handleAcceptRequest = (req: BookingRequest) => {
    if (req.type === "booking") {
      setSelectedRequest(req);
      setShowAllocation(true);
    } else {
      setRequests(prev => prev.map(r => r.id === req.id ? { ...r, status: "accepted" as const } : r));
    }
  };

  const handleRejectRequest = (reqId: string) => {
    setRequests(prev => prev.map(r => r.id === reqId ? { ...r, status: "rejected" as const } : r));
  };

  const handleAllocationConfirm = () => {
    if (selectedRequest) {
      setRequests(prev => prev.map(r => r.id === selectedRequest.id ? { ...r, status: "accepted" as const } : r));
    }
    setSelectedRequest(null);
  };

  const handleAddAccount = (account: PaymentAccount) => {
    setAccounts(prev => [...prev, account]);
  };

  const handleSetPrimary = (accId: string) => {
    setAccounts(prev => prev.map(a => ({ ...a, isPrimary: a.id === accId })));
  };

  const handleDeleteAccount = (accId: string) => {
    setAccounts(prev => prev.filter(a => a.id !== accId));
  };

  const tabTitles: Record<Tab, string> = {
    dashboard: "Dashboard",
    requests: "Booking Requests",
    add: "Add Property",
    tenants: "Tenants",
    payments: "Payments",
  };
  

  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <div className="hidden lg:flex flex-col w-64 bg-card border-r border-border p-5 fixed h-full">
        <button onClick={() => navigate("/")} className="flex items-center gap-2 font-bold text-xl text-foreground mb-8">
          <Sparkles size={24} className="text-primary" />
          Residential Nexus
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
              {item.id === "requests" && pendingRequestsCount > 0 && (
                <Badge className="ml-auto bg-destructive text-destructive-foreground border-0 text-xs px-1.5 py-0.5">
                  {pendingRequestsCount}
                </Badge>
              )}
            </button>
          ))}
        </nav>
        <Button variant="outline" onClick={() => navigate("/")} className="rounded-xl">
          <LogOut size={16} className="mr-2" /> Log Out
        </Button>
      </div>

      {/* Main */}
      <div className="flex-1 lg:ml-64">
        {/* Top bar */}
        <header className="sticky top-0 z-30 bg-card/80 backdrop-blur-lg border-b border-border px-4 lg:px-8 py-4 flex items-center justify-between">
          <h1 className="text-lg lg:text-xl font-bold text-foreground">{tabTitles[activeTab]}</h1> 
          <div className="flex items-center gap-3"> 
            <div ref={dropdownRef} className="relative">
              <button className="relative p-2 rounded-xl hover:bg-secondary transition-colors" 
                onClick={() => setOpen(!open)}> 
                <Bell size={20} className="text-muted-foreground" /> 
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-destructive" /> 
              </button> 
              {open && ( 
                <div className="absolute right-0 mt-2 w-72 glass-card rounded-xl shadow-lg border border-border overflow-hidden">
                  <div className="p-3 border-b border-border"> 
                    <p className="font-semibold text-sm text-foreground">Notifications</p> 
                  </div>
                  <div className="max-h-60 overflow-y-auto"> 
                    {notifications.map((n) => ( 
                      <div key={n.id} className="px-3 py-2.5 hover:bg-secondary/50 transition-colors border-b border-border last:border-0"> 
                        <p className="text-sm text-foreground">{n.text}</p> 
                      </div> 
                    ))} 
                  </div> 
                </div> 
              )}
            </div> 
            <div className="w-9 h-9 rounded-full gradient-primary flex items-center justify-center text-primary-foreground font-bold text-sm">O</div> 
          </div> 
        </header>

        {/* Mobile nav */}
        <div className="lg:hidden flex gap-2 px-4 py-3 overflow-x-auto border-b border-border">
          {sidebarItems.map((item) => (
            <Button
              key={item.id}
              variant={activeTab === item.id ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveTab(item.id)}
              className={`rounded-xl gap-1 shrink-0 ${activeTab === item.id ? "gradient-primary text-primary-foreground" : ""}`}
            >
              <item.icon size={14} /> {item.label}
              {item.id === "requests" && pendingRequestsCount > 0 && (
                <Badge className="ml-1 bg-destructive text-destructive-foreground border-0 text-[10px] px-1 py-0">{pendingRequestsCount}</Badge>
              )}
            </Button>
          ))}
        </div>

        <main className="p-4 lg:p-8">
          {/* DASHBOARD */}
          {activeTab === "dashboard" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
                {stats.map((s) => (
                  <div key={s.label} className="glass-card rounded-2xl p-5">
                    <div className="flex items-center justify-between mb-3">
                      <s.icon size={22} className={s.color} />
                    </div>
                    <p className="text-2xl font-bold text-foreground">{s.value}</p>
                    <p className="text-xs text-muted-foreground mt-1">{s.label}</p>
                  </div>
                ))}
              </div>
              <h2 className="text-lg font-bold text-foreground mb-4">Recent Activity</h2>
              <div className="glass-card rounded-2xl divide-y divide-border">
                {[
                  { text: "New booking request from Arjun Sharma", time: "2 hours ago" },
                  { text: "Rent payment received from Rahul Kumar — ₹5,500", time: "5 hours ago" },
                  { text: "Maintenance request for Room 102-B", time: "1 day ago" },
                ].map((a, i) => (
                  <div key={i} className="px-5 py-4 flex items-center justify-between">
                    <p className="text-sm text-foreground">{a.text}</p>
                    <span className="text-xs text-muted-foreground shrink-0 ml-4">{a.time}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* REQUESTS */}
          {activeTab === "requests" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {requests.length === 0 && (
                <div className="glass-card rounded-2xl p-12 text-center">
                  <ClipboardList size={48} className="mx-auto text-muted-foreground mb-3" />
                  <p className="text-muted-foreground">No requests yet</p>
                </div>
              )}
              {requests.map((req) => (
                <div key={req.id} className="glass-card rounded-2xl p-5">
                  <div className="flex flex-col sm:flex-row sm:items-start gap-4">
                    <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                      req.type === "visit" ? "bg-accent/10 text-accent" : "gradient-primary text-primary-foreground"
                    }`}>
                      {req.type === "visit" ? <Eye size={22} /> : <Home size={22} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className="font-semibold text-foreground">{req.studentName}</h3>
                        <Badge className={`border-0 text-xs ${
                          req.type === "visit"
                            ? "bg-accent/10 text-accent"
                            : "bg-primary/10 text-primary"
                        }`}>
                          {req.type === "visit" ? "Visit Request" : "Booking Request"}
                        </Badge>
                        <Badge className={`border-0 text-xs ${
                          req.status === "pending" ? "bg-warning/10 text-warning" :
                          req.status === "accepted" ? "bg-success/10 text-success" :
                          "bg-destructive/10 text-destructive"
                        }`}>
                          {req.status}
                        </Badge>
                      </div>
                      <p className="text-sm text-muted-foreground mb-2">{req.message}</p>
                      <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                        <span className="flex items-center gap-1"><Phone size={12} /> {req.phone}</span>
                        <span className="flex items-center gap-1"><Calendar size={12} /> {req.preferredDate}</span>
                        {req.requestedRoom && <span className="flex items-center gap-1"><Home size={12} /> Room {req.requestedRoom}</span>}
                        {req.advanceAmount && <span className="flex items-center gap-1"><IndianRupee size={12} /> Advance ₹{req.advanceAmount.toLocaleString()}</span>}
                      </div>
                    </div>
                    {req.status === "pending" && (
                      <div className="flex gap-2 shrink-0">
                        <Button size="sm" onClick={() => handleAcceptRequest(req)} className="gradient-primary text-primary-foreground rounded-xl gap-1">
                          <CheckCircle2 size={14} /> Accept
                        </Button>
                        <Button size="sm" variant="outline" onClick={() => handleRejectRequest(req.id)} className="rounded-xl gap-1 text-destructive border-destructive/30 hover:bg-destructive/5">
                          <XCircle size={14} /> Reject
                        </Button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </motion.div>
          )}

          {/* ADD PROPERTY */}
          {activeTab === "add" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
              <div className="glass-card rounded-2xl p-6 space-y-5 max-w-2xl">
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Hostel Name</label>
                    <Input placeholder="Enter hostel name" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 block">Monthly Price (₹)</label>
                    <Input type="number" placeholder="₹ 0" className="rounded-xl" />
                  </div>
                </div>
                
                {/* Location Picker */}
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Location</label>
                  <div className="relative mb-3">
                    <Input 
                      placeholder="Search or drag pin on map" 
                      className="rounded-xl pl-10" 
                      value={address}
                      onChange={(e) => setAddress(e.target.value)}
                    />
                    <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" size={18} />
                  </div>
                  
                  {/* Google Map Implementation */}
                  <div className="rounded-xl overflow-hidden border border-border h-[300px] relative">
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={markerPosition}
                        zoom={15}
                        onClick={onMapClick}
                        options={{
                          disableDefaultUI: true,
                          zoomControl: true,
                        }}
                      >
                        <Marker 
                          position={markerPosition} 
                          draggable={true}
                          onDragEnd={(e) => {
                            if(e.latLng) setMarkerPosition({ lat: e.latLng.lat(), lng: e.latLng.lng() });
                          }}
                        />
                      </GoogleMap>
                    ) : (
                      <div className="w-full h-full bg-secondary animate-pulse flex items-center justify-center text-muted-foreground">
                        Loading Map...
                      </div>
                    )}
                    <div className="absolute bottom-3 left-3 bg-card/90 backdrop-blur px-3 py-1.5 rounded-lg border border-border text-[10px] text-muted-foreground">
                      Lat: {markerPosition.lat.toFixed(4)}, Lng: {markerPosition.lng.toFixed(4)}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Upload Images</label>
                  <label className="flex flex-col items-center justify-center text-center gap-2 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/30 transition-colors">
                    <Upload size={20} className="text-muted-foreground" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{searchImage ? searchImage.name : "Upload room photos"}</p>
                      <p className="text-xs text-muted-foreground">JPG, PNG (Max 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept=".jpg,.jpeg,.png" onChange={handleFileChange} />
                  </label>
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Facilities</label>
                  <Textarea placeholder="WiFi, AC, Laundry, Mess..." className="rounded-xl" rows={2} />
                </div>
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 block">Rules</label>
                  <Textarea placeholder="No smoking, Quiet hours..." className="rounded-xl" rows={2} />
                </div>
                <Button className="gradient-primary text-primary-foreground rounded-xl px-8 w-full sm:w-auto">
                  <Building2 size={16} className="mr-2" /> Add Property
                </Button>
              </div>
            </motion.div>
          )}

          {/* TENANTS */}
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
                            <Badge className={`rounded-full border-0 ${
                              t.rentStatus === "Paid"
                                ? "bg-green-500/10 text-green-600"
                                : "bg-destructive/10 text-destructive"
                            }`}>
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

          {/* PAYMENTS */}
          {activeTab === "payments" && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {/* Payment Accounts Section */}
              <div>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="text-base font-bold text-foreground">Your Payment Accounts</h2>
                  <Button size="sm" onClick={() => setShowAddAccount(true)} className="gradient-primary text-primary-foreground rounded-xl gap-1">
                    <Plus size={14} /> Add Account
                  </Button>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                  {accounts.map(acc => (
                    <div key={acc.id} className="glass-card rounded-xl p-4 relative group">
                      <div className="flex items-start gap-3">
                        <div className={`w-11 h-11 rounded-xl flex items-center justify-center text-xs font-bold shrink-0 ${
                          acc.type === "upi" ? "gradient-primary text-primary-foreground" : "gradient-accent text-accent-foreground"
                        }`}>
                          {acc.type === "upi" ? <Smartphone size={20} /> : <Building size={20} />}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center gap-2">
                            <p className="font-medium text-sm text-foreground truncate">{acc.label}</p>
                            {acc.isPrimary && <Star size={14} className="text-warning shrink-0" />}
                          </div>
                          <p className="text-xs text-muted-foreground truncate">
                            {acc.type === "upi" ? acc.upiId : `${acc.bankName} · ${acc.accountNumber}`}
                          </p>
                        </div>
                      </div>
                      <div className="flex gap-2 mt-3">
                        {!acc.isPrimary && (
                          <Button size="sm" variant="outline" onClick={() => handleSetPrimary(acc.id)} className="rounded-lg text-xs flex-1">
                            Set Primary
                          </Button>
                        )}
                        <Button size="sm" variant="outline" onClick={() => handleDeleteAccount(acc.id)} className="rounded-lg text-xs text-destructive border-destructive/30 hover:bg-destructive/5">
                          <Trash2 size={12} />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Payment History */}
              <div>
                <h2 className="text-base font-bold text-foreground mb-3">Tenant Payments</h2>
                <div className="space-y-3">
                  {tenants.map((t) => (
                    <div key={t.id} className="glass-card rounded-xl p-4 flex items-center justify-between">
                      <div>
                        <p className="font-medium text-foreground text-sm">{t.name}</p>
                        <p className="text-xs text-muted-foreground">Room {t.room} · ₹{t.amount.toLocaleString()}/mo</p>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge className={`rounded-full border-0 ${
                          t.rentStatus === "Paid"
                            ? "bg-success/10 text-success"
                            : "bg-destructive/10 text-destructive"
                        }`}>
                          {t.rentStatus}
                        </Badge>
                        {t.rentStatus === "Pending" && (
                          <Button size="sm" variant="outline" className="rounded-lg gap-1">
                            <Bell size={14} /> Remind
                          </Button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </main>
      </div>

      {/* Dialogs */}
      {selectedRequest && (
        <AllocationDialog
          open={showAllocation}
          onClose={() => { setShowAllocation(false); setSelectedRequest(null); }}
          studentName={selectedRequest.studentName}
          studentPhone={selectedRequest.phone}
          studentEmail={selectedRequest.email}
          paymentAccounts={accounts}
          onConfirm={handleAllocationConfirm}
        />
      )}
      <AddPaymentAccountDialog
        open={showAddAccount}
        onClose={() => setShowAddAccount(false)}
        onAdd={handleAddAccount}
      />
    </div>
  );
};

export default OwnerDashboard;