export interface Hostel {
  id: string;
  name: string;
  price: number;
  location: string;
  image: string;
  rating: number;
  matchPercent: number;
  tags: string[];
  whyRecommended: string;
  facilities: string[];
  rules: string[];
  reviews: { name: string; rating: number; comment: string }[];
}

export const hostels: Hostel[] = [
  {
    id: "1",
    name: "Sunrise Student Haven",
    price: 3500,
    location: "Koramangala, Bangalore",
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
    rating: 4.5,
    matchPercent: 95,
    tags: ["Study-friendly", "Budget", "Quiet Zone"],
    whyRecommended: "Matches your preference for quiet environment, good Wi-Fi, and proximity to campus.",
    facilities: ["Wi-Fi", "AC", "Laundry", "Study Room", "Gym", "Power Backup"],
    rules: ["No smoking", "Gate closes at 11 PM", "Visitors allowed till 8 PM"],
    reviews: [
      { name: "Arjun S.", rating: 5, comment: "Best hostel for students. Peaceful and clean." },
      { name: "Priya M.", rating: 4, comment: "Good food and friendly staff." },
    ],
  },
  {
    id: "2",
    name: "Urban Nest Co-Living",
    price: 5500,
    location: "HSR Layout, Bangalore",
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    rating: 4.8,
    matchPercent: 88,
    tags: ["Social", "Premium", "Spacious"],
    whyRecommended: "Great social atmosphere with modern amenities and spacious rooms.",
    facilities: ["Wi-Fi", "AC", "Gaming Room", "Rooftop", "Laundry", "Parking"],
    rules: ["No pets", "Quiet hours 10 PM - 7 AM"],
    reviews: [
      { name: "Rahul K.", rating: 5, comment: "Amazing community vibes!" },
      { name: "Sneha R.", rating: 4, comment: "Modern and well-maintained." },
    ],
  },
  {
    id: "3",
    name: "GreenView PG",
    price: 3000,
    location: "BTM Layout, Bangalore",
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    rating: 4.2,
    matchPercent: 82,
    tags: ["Budget", "Near Metro", "Vegetarian Food"],
    whyRecommended: "Most affordable option with good vegetarian food near metro station.",
    facilities: ["Wi-Fi", "Meals", "Hot Water", "Power Backup"],
    rules: ["Vegetarian only", "No alcohol", "Gate closes at 10:30 PM"],
    reviews: [
      { name: "Deepa T.", rating: 4, comment: "Homely food and clean rooms." },
    ],
  },
  {
    id: "4",
    name: "TechHub Residency",
    price: 4500,
    location: "Whitefield, Bangalore",
    image: "https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=600&h=400&fit=crop",
    rating: 4.6,
    matchPercent: 91,
    tags: ["Study-friendly", "High-Speed Wi-Fi", "AC"],
    whyRecommended: "Perfect for tech students with dedicated workspaces and high-speed internet.",
    facilities: ["High-Speed Wi-Fi", "AC", "Co-working Space", "Library", "Gym"],
    rules: ["No loud music after 9 PM", "ID required for check-in"],
    reviews: [
      { name: "Vikram P.", rating: 5, comment: "Best for working professionals and students." },
      { name: "Anita G.", rating: 4, comment: "Clean and professional environment." },
    ],
  },
  {
    id: "5",
    name: "Comfort Stay PG",
    price: 3800,
    location: "Indiranagar, Bangalore",
    image: "https://images.unsplash.com/photo-1536376072261-38c75010e6c9?w=600&h=400&fit=crop",
    rating: 4.3,
    matchPercent: 79,
    tags: ["Central Location", "Furnished", "Social"],
    whyRecommended: "Located in the heart of the city with great nightlife and food options nearby.",
    facilities: ["Wi-Fi", "Furnished Rooms", "Kitchen Access", "Parking"],
    rules: ["Couples allowed", "No smoking indoors"],
    reviews: [
      { name: "Karan D.", rating: 4, comment: "Great location, easy commute." },
    ],
  },
  {
    id: "6",
    name: "Scholar's Den",
    price: 2800,
    location: "Electronic City, Bangalore",
    image: "https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=600&h=400&fit=crop",
    rating: 4.1,
    matchPercent: 76,
    tags: ["Budget", "Study-friendly", "Quiet Zone"],
    whyRecommended: "Ultra-affordable with dedicated study areas, ideal for exam preparation.",
    facilities: ["Wi-Fi", "Study Hall", "Meals", "Laundry"],
    rules: ["Silent hours 9 PM - 7 AM", "No guests overnight"],
    reviews: [
      { name: "Meera S.", rating: 4, comment: "Perfect for focused studying." },
    ],
  },
];

export interface Tenant {
  id: string;
  name: string;
  room: string;
  rentStatus: "Paid" | "Pending";
  contact: string;
  amount: number;
}

export const tenants: Tenant[] = [
  { id: "1", name: "Arjun Sharma", room: "101-A", rentStatus: "Paid", contact: "+91 98765 43210", amount: 3500 },
  { id: "2", name: "Priya Menon", room: "102-B", rentStatus: "Pending", contact: "+91 87654 32109", amount: 3500 },
  { id: "3", name: "Rahul Kumar", room: "201-A", rentStatus: "Paid", contact: "+91 76543 21098", amount: 5500 },
  { id: "4", name: "Sneha Reddy", room: "202-B", rentStatus: "Pending", contact: "+91 65432 10987", amount: 5500 },
  { id: "5", name: "Deepa Tiwari", room: "103-A", rentStatus: "Paid", contact: "+91 54321 09876", amount: 3000 },
];
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

export const availableRooms = [
  { id: "104-A", type: "Single", price: 5500, floor: "1st" },
  { id: "204-A", type: "Single (Attached Bath)", price: 7000, floor: "2nd" },
  { id: "105-B", type: "Shared (2-bed)", price: 4000, floor: "1st" },
  { id: "301-A", type: "Single", price: 5500, floor: "3rd" },
  { id: "302-B", type: "Shared (3-bed)", price: 3500, floor: "3rd" },
];
