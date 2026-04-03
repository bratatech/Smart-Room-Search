import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  X, User, MapPin, Phone, Heart, Upload, CheckCircle2, IndianRupee,
  Calendar, Home, FileText, AlertCircle
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { type PaymentAccount } from "@/data/ownerMockCompat";

export interface AllocationDialogProps {
  open: boolean;
  onClose: () => void;
  studentName: string;
  studentPhone: string;
  studentEmail: string;
  paymentAccounts: PaymentAccount[];
  availableRooms: any[];
  onConfirm: (data: AllocationData) => void;
}

export interface AllocationData {
  room: string;
  price: number;
  startDate: string;
  paymentAccountId: string;
  studentAddress: string;
  parentName: string;
  parentPhone: string;
  medicalInfo: string;
  idDocument: File | null;
  notes: string;
}

const AllocationDialog = ({
  open, onClose, studentName, studentPhone, studentEmail, paymentAccounts, availableRooms, onConfirm
}: AllocationDialogProps) => {
  const [step, setStep] = useState(1);
  const [selectedRoom, setSelectedRoom] = useState("");
  const [price, setPrice] = useState("");
  const [startDate, setStartDate] = useState("");
  const [selectedAccount, setSelectedAccount] = useState(paymentAccounts.find(a => a.isPrimary)?.id || "");
  const [studentAddress, setStudentAddress] = useState("");
  const [parentName, setParentName] = useState("");
  const [parentPhone, setParentPhone] = useState("");
  const [medicalInfo, setMedicalInfo] = useState("");
  const [idDocument, setIdDocument] = useState<File | null>(null);
  const [notes, setNotes] = useState("");
  const [showFinalConfirm, setShowFinalConfirm] = useState(false);

  const roomData = availableRooms.find(r => r.id === selectedRoom || r.roomNumber === selectedRoom);
  const handleRoomSelect = (roomId: string) => {
    setSelectedRoom(roomId);
    const room = availableRooms.find(r => r.id === roomId || r.roomNumber === roomId);
    if (room) setPrice(String(room.price));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.[0]) setIdDocument(e.target.files[0]);
  };

  const canProceedStep1 = availableRooms.length > 0 && selectedRoom && price && startDate && selectedAccount;
  // This ensures that even if there are accidental spaces, it still validates
const canProceedStep2 = 
  studentAddress.trim().length > 0 && 
  parentName.trim().length > 0 && 
  parentPhone.trim().length > 0;

  const handleFinalConfirm = () => {
    onConfirm({
      room: selectedRoom,
      price: Number(price),
      startDate,
      paymentAccountId: selectedAccount,
      studentAddress,
      parentName,
      parentPhone,
      medicalInfo,
      idDocument,
      notes,
    });
    setShowFinalConfirm(false);
    onClose();
  };

  if (!open) return null;

  const selectedAccData = paymentAccounts.find(a => a.id === selectedAccount);

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="absolute inset-0 bg-foreground/40 backdrop-blur-sm"
          onClick={onClose}
        />
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.95, y: 20 }}
          className="relative z-10 w-full max-w-2xl max-h-[90vh] overflow-y-auto glass-card rounded-2xl p-6 mx-4"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h2 className="text-lg font-bold text-foreground">Allocate Room</h2>
              <p className="text-sm text-muted-foreground">For {studentName}</p>
            </div>
            <button 
              onClick={onClose} 
              className="p-2 rounded-lg hover:bg-secondary text-muted-foreground"
              aria-label="Close dialog"
            >
              <X size={20} aria-hidden="true" />
            </button>
          </div>

          {/* Steps indicator */}
          <div className="flex items-center gap-2 mb-6">
            {[1, 2, 3].map(s => (
              <div key={s} className="flex items-center gap-2 flex-1">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-colors ${
                  step >= s ? "gradient-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                }`}>{s}</div>
                <span className={`text-xs hidden sm:block ${step >= s ? "text-foreground font-medium" : "text-muted-foreground"}`}>
                  {s === 1 ? "Room & Payment" : s === 2 ? "Student Details" : "Review"}
                </span>
                {s < 3 && <div className={`flex-1 h-0.5 ${step > s ? "bg-primary" : "bg-border"}`} />}
              </div>
            ))}
          </div>

          <AnimatePresence mode="wait">
            {step === 1 && (
              <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-5">
                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <Home size={14} className="text-primary" /> Select Room
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {availableRooms.map(room => (
<button
    key={room.id || room.roomNumber}
    onClick={() => handleRoomSelect(room.id || room.roomNumber)}
    className={`p-3 rounded-xl border text-left transition-all ${
      selectedRoom === (room.id || room.roomNumber)
        ? "border-primary bg-primary/5 ring-2 ring-primary/20"
        : "border-border hover:border-primary/30"
    }`}
  >
    <div className="font-medium text-sm text-foreground">Room {room.roomNumber || room.id}</div>
    <div className="text-xs text-muted-foreground">{room.type} · {room.floor} Floor</div>
    <div className="text-sm font-bold text-primary mt-1">₹{room.price.toLocaleString()}/mo</div>
  </button>
                    ))}
                    {availableRooms.length === 0 && (
  <div className="col-span-full p-8 text-center text-muted-foreground bg-secondary/20 rounded-xl border border-dashed">
    <p className="text-sm font-medium">No vacant rooms available.</p>
    <p className="text-xs">All rooms in this property are currently occupied.</p>
  </div>
)}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <IndianRupee size={14} className="text-primary" /> Monthly Rent
                    </label>
                    <Input value={price} onChange={e => setPrice(e.target.value)} placeholder="₹ Amount" className="rounded-xl" />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <Calendar size={14} className="text-primary" /> Start Date
                    </label>
                    <Input type="date" value={startDate} onChange={e => setStartDate(e.target.value)} className="rounded-xl" />
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
                    <IndianRupee size={14} className="text-primary" /> Receive Rent On
                  </label>
                  {paymentAccounts.length === 0 ? (
                    <p className="text-sm text-muted-foreground bg-secondary rounded-xl p-3">No payment accounts added. Add one in Payments tab.</p>
                  ) : (
                    <div className="space-y-2">
                      {paymentAccounts.map(acc => (
                        <button
                          key={acc.id}
                          onClick={() => setSelectedAccount(acc.id)}
                          className={`w-full p-3 rounded-xl border text-left transition-all flex items-center gap-3 ${
                            selectedAccount === acc.id
                              ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                              : "border-border hover:border-primary/30"
                          }`}
                        >
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center text-xs font-bold ${
                            acc.type === "upi" ? "gradient-primary text-primary-foreground" : "gradient-accent text-accent-foreground"
                          }`}>
                            {acc.type === "upi" ? "UPI" : "Bank"}
                          </div>
                          <div className="flex-1">
                            <div className="text-sm font-medium text-foreground">{acc.label}</div>
                            <div className="text-xs text-muted-foreground">
                              {acc.type === "upi" ? acc.upiId : `${acc.bankName} · ${acc.accountNumber}`}
                            </div>
                          </div>
                          {acc.isPrimary && <Badge className="bg-primary/10 text-primary border-0 text-xs">Primary</Badge>}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                <div className="flex justify-end">
                  <Button onClick={() => setStep(2)} disabled={!canProceedStep1} className="gradient-primary text-primary-foreground rounded-xl px-6">
                    Next: Student Details →
                  </Button>
                </div>
              </motion.div>
            )}

            {step === 2 && (
              <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                    <MapPin size={14} className="text-primary" /> Student Address *
                  </label>
                  <Textarea value={studentAddress} onChange={e => setStudentAddress(e.target.value)} placeholder="Full home address" className="rounded-xl" rows={2} />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                      <User size={14} className="text-primary" /> Parent/Guardian Name *
                    </label>
                    <Input value={parentName} onChange={e => setParentName(e.target.value)} placeholder="Father/Guardian name" className="rounded-xl" />
                  </div>
                 <div>
                  <div>
                  <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                    <Phone size={14} className="text-primary" /> Parent Phone *
                  </label>
                  <Input 
                    value={parentPhone} 
                    onChange={e => setParentPhone(e.target.value)} 
                    placeholder="+91 XXXXX XXXXX" 
                    className="rounded-xl"
                    aria-label="Parent phone number"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-2 block">
                    Room: <span className="font-medium text-foreground">
                      {roomData?.roomNumber || selectedRoom} ({roomData?.type || "N/A"})
                    </span>
                  </label>
                </div>
                </div>

                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                    <Heart size={14} className="text-destructive" /> Medical Information
                  </label>
                  <Textarea value={medicalInfo} onChange={e => setMedicalInfo(e.target.value)} placeholder="Allergies, conditions, emergency contacts..." className="rounded-xl" rows={2} aria-label="Medical information" />
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                    <FileText size={14} className="text-primary" /> Identity Document
                  </label>
                  <label className="flex items-center gap-3 p-4 border-2 border-dashed border-border rounded-xl cursor-pointer hover:border-primary/30 transition-colors">
                    <Upload size={20} className="text-muted-foreground" aria-hidden="true" />
                    <div>
                      <p className="text-sm font-medium text-foreground">{idDocument ? idDocument.name : "Upload Aadhar/ID Card"}</p>
                      <p className="text-xs text-muted-foreground">PDF, JPG, PNG (Max 5MB)</p>
                    </div>
                    <input type="file" className="hidden" accept=".pdf,.jpg,.jpeg,.png" onChange={handleFileChange} />
                  </label>
                </div>

                <div>
                  <label className="text-sm font-medium text-foreground mb-1 flex items-center gap-2">
                    <AlertCircle size={14} className="text-primary" /> Additional Notes
                  </label>
                  <Textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Any extra info about the student..." className="rounded-xl" rows={2} />
                </div>

<div className="flex justify-between">
  <Button variant="outline" onClick={() => setStep(1)} className="rounded-xl">
    ← Back
  </Button>
  <Button 
    onClick={() => setStep(3)} // This MUST be setStep(3)
    disabled={!canProceedStep2} 
    className="gradient-primary text-primary-foreground rounded-xl px-6"
  >
    Next: Review →
  </Button>
</div>
              </motion.div>
            )}

            {step === 3 && (
              <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="space-y-4">
                <div className="glass-card rounded-xl p-4 space-y-3">
                  <h3 className="font-semibold text-foreground text-sm">Room Allocation Summary</h3>
                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div><span className="text-muted-foreground">Student:</span> <span className="font-medium text-foreground">{studentName}</span></div>
                    <div><span className="text-muted-foreground">Phone:</span> <span className="font-medium text-foreground">{studentPhone}</span></div>
                    <div>
  <span className="text-muted-foreground">Room:</span>{" "}
  <span className="font-medium text-foreground">
    {roomData?.roomNumber || selectedRoom} ({roomData?.type || "N/A"})
  </span>
</div>
                    <div><span className="text-muted-foreground">Rent:</span> <span className="font-medium text-primary">₹{Number(price).toLocaleString()}/mo</span></div>
                    <div><span className="text-muted-foreground">Start Date:</span> <span className="font-medium text-foreground">{startDate}</span></div>
                    <div><span className="text-muted-foreground">Payment To:</span> <span className="font-medium text-foreground">{selectedAccData?.label}</span></div>
                  </div>
                </div>

                <div className="glass-card rounded-xl p-4 space-y-2">
                  <h3 className="font-semibold text-foreground text-sm">Student Details</h3>
                  <div className="grid grid-cols-1 gap-2 text-sm">
                    <div><span className="text-muted-foreground">Address:</span> <span className="text-foreground">{studentAddress}</span></div>
                    <div><span className="text-muted-foreground">Parent:</span> <span className="text-foreground">{parentName} ({parentPhone})</span></div>
                    {medicalInfo && <div><span className="text-muted-foreground">Medical:</span> <span className="text-foreground">{medicalInfo}</span></div>}
                    {idDocument && <div><span className="text-muted-foreground">ID Doc:</span> <span className="text-foreground">{idDocument.name}</span></div>}
                    {notes && <div><span className="text-muted-foreground">Notes:</span> <span className="text-foreground">{notes}</span></div>}
                  </div>
                </div>

                <div className="flex justify-between">
                  <Button variant="outline" onClick={() => setStep(2)} className="rounded-xl">← Back</Button>
                  <Button onClick={() => setShowFinalConfirm(true)} className="gradient-primary text-primary-foreground rounded-xl px-6">
                    <CheckCircle2 size={16} className="mr-2" /> Allocate & Confirm
                  </Button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        {/* Final Confirmation Popup */}
        {showFinalConfirm && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="fixed inset-0 z-[60] flex items-center justify-center"
          >
            <div className="absolute inset-0 bg-foreground/60 backdrop-blur-sm" onClick={() => setShowFinalConfirm(false)} />
            <div className="relative z-10 glass-card rounded-2xl p-6 max-w-sm mx-4 text-center">
              <div className="w-16 h-16 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4">
                <CheckCircle2 size={32} className="text-primary-foreground" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">Confirm Allocation?</h3>
              <p className="text-sm text-muted-foreground mb-1">
  Room <strong>{roomData?.roomNumber || selectedRoom}</strong> → <strong>{studentName}</strong>
</p>
              <p className="text-sm text-muted-foreground mb-6">
                ₹{Number(price).toLocaleString()}/mo starting {startDate}
              </p>
              <div className="flex gap-3">
                <Button variant="outline" onClick={() => setShowFinalConfirm(false)} className="flex-1 rounded-xl">Cancel</Button>
                <Button onClick={handleFinalConfirm} className="flex-1 gradient-primary text-primary-foreground rounded-xl">
                  Confirm ✓
                </Button>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </AnimatePresence>
  );
};

export default AllocationDialog;