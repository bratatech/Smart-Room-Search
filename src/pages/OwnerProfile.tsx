import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  ArrowLeft, User, Mail, Phone, MapPin, Building2, Calendar,
  Save, Edit2, Camera, Shield, FileText, Briefcase
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { ownerProfile, ownerProperties } from "@/data/ownerData";

const OwnerProfile = () => {
  const navigate = useNavigate();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState(ownerProfile);
  const [saved, setSaved] = useState(false);

  const handleSave = () => {
    setIsEditing(false);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const totalRevenue = ownerProperties.reduce((s, p) => s + p.totalRevenue, 0);
  const totalTenants = ownerProperties.reduce((s, p) => s + p.occupiedBeds, 0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b bg-card">
        <div className="max-w-4xl mx-auto px-4 py-4 flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={() => navigate("/owner")} className="rounded-xl">
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="flex-1">
            <h1 className="text-xl font-bold text-foreground">Owner Profile</h1>
            <p className="text-sm text-muted-foreground">Manage your personal & business details</p>
          </div>
          {!isEditing ? (
            <Button onClick={() => setIsEditing(true)} variant="outline" className="rounded-xl gap-2">
              <Edit2 className="w-4 h-4" /> Edit Profile
            </Button>
          ) : (
            <Button onClick={handleSave} className="rounded-xl gap-2">
              <Save className="w-4 h-4" /> Save Changes
            </Button>
          )}
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 py-8 space-y-6">
        {saved && (
          <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 rounded-xl p-3 text-emerald-700 dark:text-emerald-400 text-sm font-medium text-center"
          >
            ✅ Profile saved successfully!
          </motion.div>
        )}

        {/* Profile Header */}
        <Card className="border-0 shadow-sm overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-primary/20 to-primary/5" />
          <CardContent className="relative px-6 pb-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4 -mt-12">
              <div className="relative">
                <Avatar className="w-24 h-24 border-4 border-background shadow-lg">
                  <AvatarFallback className="text-2xl font-bold bg-primary text-primary-foreground">
                    {profile.fullName.split(" ").map(n => n[0]).join("")}
                  </AvatarFallback>
                </Avatar>
                {isEditing && (
                  <button className="absolute bottom-0 right-0 w-8 h-8 bg-primary text-primary-foreground rounded-full flex items-center justify-center shadow-md">
                    <Camera className="w-4 h-4" />
                  </button>
                )}
              </div>
              <div className="flex-1">
                <h2 className="text-2xl font-bold text-foreground">{profile.fullName}</h2>
                <p className="text-muted-foreground">{profile.businessName}</p>
              </div>
              <div className="flex gap-6 text-center">
                <div>
                  <p className="text-xl font-bold text-foreground">{ownerProperties.length}</p>
                  <p className="text-xs text-muted-foreground">Properties</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">{totalTenants}</p>
                  <p className="text-xs text-muted-foreground">Tenants</p>
                </div>
                <div>
                  <p className="text-xl font-bold text-foreground">₹{(totalRevenue / 1000).toFixed(0)}K</p>
                  <p className="text-xs text-muted-foreground">Revenue</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Personal Details */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <User className="w-5 h-5 text-primary" /> Personal Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Full Name</label>
              <Input
                value={profile.fullName}
                onChange={e => setProfile(p => ({ ...p, fullName: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Email</label>
              <Input
                type="email"
                value={profile.email}
                onChange={e => setProfile(p => ({ ...p, email: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Phone</label>
              <Input
                value={profile.phone}
                onChange={e => setProfile(p => ({ ...p, phone: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Alternate Phone</label>
              <Input
                value={profile.alternatePhone || ""}
                onChange={e => setProfile(p => ({ ...p, alternatePhone: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-foreground">Address</label>
              <Input
                value={profile.address}
                onChange={e => setProfile(p => ({ ...p, address: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">City</label>
              <Input
                value={profile.city}
                onChange={e => setProfile(p => ({ ...p, city: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">State</label>
              <Input
                value={profile.state}
                onChange={e => setProfile(p => ({ ...p, state: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Pincode</label>
              <Input
                value={profile.pincode}
                onChange={e => setProfile(p => ({ ...p, pincode: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Identity & Documents */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Shield className="w-5 h-5 text-primary" /> Identity & Documents
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Aadhaar Number</label>
              <Input
                value={profile.aadharNo}
                onChange={e => setProfile(p => ({ ...p, aadharNo: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">PAN Number</label>
              <Input
                value={profile.panNo}
                onChange={e => setProfile(p => ({ ...p, panNo: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">GST Number</label>
              <Input
                value={profile.gstNo || ""}
                onChange={e => setProfile(p => ({ ...p, gstNo: e.target.value }))}
                disabled={!isEditing}
                placeholder="Optional"
                className="rounded-xl"
              />
            </div>
          </CardContent>
        </Card>

        {/* Business Details */}
        <Card className="border-0 shadow-sm">
          <CardHeader>
            <CardTitle className="text-lg flex items-center gap-2">
              <Briefcase className="w-5 h-5 text-primary" /> Business Information
            </CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Business Name</label>
              <Input
                value={profile.businessName || ""}
                onChange={e => setProfile(p => ({ ...p, businessName: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Business Type</label>
              <Input
                value={profile.businessType || ""}
                onChange={e => setProfile(p => ({ ...p, businessType: e.target.value }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-medium text-foreground">Years in Business</label>
              <Input
                type="number"
                value={profile.yearsInBusiness || ""}
                onChange={e => setProfile(p => ({ ...p, yearsInBusiness: parseInt(e.target.value) || 0 }))}
                disabled={!isEditing}
                className="rounded-xl"
              />
            </div>
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-medium text-foreground">Bio</label>
              <Textarea
                value={profile.bio || ""}
                onChange={e => setProfile(p => ({ ...p, bio: e.target.value }))}
                disabled={!isEditing}
                rows={3}
                placeholder="Tell about yourself and your business..."
                className="rounded-xl"
              />
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OwnerProfile;
