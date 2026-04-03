// Compatibility mock data for use in Lovable project
// In the actual GitHub repo, these come from @/data/mockData

export interface BookingRequest {
  id: string;
  studentName: string;
  phone: string;
  email: string;
  type: "visit" | "booking";
  requestedRoom?: string;
  preferredDate: string;
  message?: string;
  status: "pending" | "accepted" | "rejected";
  advanceAmount?: number;
  createdAt: string;
}

export interface PaymentAccount {
  id: string;
  type: "upi" | "bank";
  label: string;
  upiId?: string;
  bankName?: string;
  accountNumber?: string;
  ifsc?: string;
  holderName?: string;
  isPrimary: boolean;
}

export const bookingRequests: BookingRequest[] = [
  {
    id: "r1",
    studentName: "Amit Verma",
    phone: "+91 99887 76655",
    email: "amit.verma@email.com",
    type: "visit",
    preferredDate: "2024-04-15",
    message: "I want to visit the hostel and see the rooms available.",
    status: "pending",
    createdAt: "2024-04-12T10:30:00",
  },
  {
    id: "r2",
    studentName: "Neha Gupta",
    phone: "+91 88776 65544",
    email: "neha.g@email.com",
    type: "booking",
    requestedRoom: "204-A",
    preferredDate: "2024-05-01",
    message: "Looking for a single room with attached washroom. Ready to pay advance.",
    status: "pending",
    advanceAmount: 3000,
    createdAt: "2024-04-11T14:00:00",
  },
  {
    id: "r3",
    studentName: "Rohan Mehta",
    phone: "+91 77665 54433",
    email: "rohan.m@email.com",
    type: "booking",
    requestedRoom: "105-B",
    preferredDate: "2024-04-20",
    message: "Need a shared room for 6 months.",
    status: "pending",
    advanceAmount: 2500,
    createdAt: "2024-04-10T09:15:00",
  },
];

export const paymentAccounts: PaymentAccount[] = [
  {
    id: "pa1",
    type: "upi",
    label: "Personal GPay",
    upiId: "owner@okicici",
    isPrimary: true,
  },
  {
    id: "pa2",
    type: "bank",
    label: "Business Account",
    bankName: "State Bank of India",
    accountNumber: "XXXX XXXX 4532",
    ifsc: "SBIN0001234",
    holderName: "Residential Nexus Pvt Ltd",
    isPrimary: false,
  },
];
