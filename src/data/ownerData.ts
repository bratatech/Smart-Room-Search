// Owner's properties/hostels data
export interface OwnerProperty {
  id: string;
  name: string;
  type: "hostel" | "pg" | "apartment";
  location: string;
  address: string;
  totalRooms: number;
  occupiedRooms: number;
  totalBeds: number;
  occupiedBeds: number;
  monthlyRent: number;
  totalRevenue: number;
  dueAmount: number;
  image: string;
  rating: number;
  createdAt: string;
  lat: number;
  lng: number;
  amenities: string[];
  contactPhone: string;
  contactEmail: string;
}

export interface PropertyRoom {
  id: string;
  propertyId: string;
  roomNumber: string;
  floor: string;
  type: "Single" | "Double" | "Triple" | "Shared (2-bed)" | "Shared (4-bed)" | "Single (Attached Bath)";
  capacity: number;
  currentOccupancy: number;
  price: number;
  status: "available" | "occupied" | "maintenance";
  amenities: string[];
}

export interface PropertyTenant {
  id: string;
  propertyId: string;
  name: string;
  phone: string;
  email: string;
  room: string;
  joinDate: string;
  rentAmount: number;
  rentStatus: "Paid" | "Pending" | "Overdue";
  avatar?: string;
  aadharNo?: string;
  emergencyContact?: string;
}

export interface OwnerProfileData {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  alternatePhone?: string;
  address: string;
  city: string;
  state: string;
  pincode: string;
  aadharNo: string;
  panNo: string;
  gstNo?: string;
  profileImage?: string;
  businessName?: string;
  businessType?: string;
  yearsInBusiness?: number;
  bio?: string;
}

// Mock data
export const ownerProfile: OwnerProfileData = {
  id: "owner-1",
  fullName: "Rajesh Kumar",
  email: "rajesh.kumar@email.com",
  phone: "+91 98765 43210",
  alternatePhone: "+91 87654 32109",
  address: "42, MG Road, Koramangala",
  city: "Bangalore",
  state: "Karnataka",
  pincode: "560034",
  aadharNo: "XXXX XXXX 5678",
  panNo: "ABCPK1234F",
  gstNo: "29ABCPK1234F1Z5",
  businessName: "Residential Nexus Pvt Ltd",
  businessType: "Hostel & PG Management",
  yearsInBusiness: 8,
  bio: "Experienced property manager specializing in student hostels and PG accommodations across Bangalore. Committed to providing safe, comfortable, and affordable living spaces.",
};

export const ownerProperties: OwnerProperty[] = [
  {
    id: "prop-1",
    name: "Sunrise Student Haven",
    type: "hostel",
    location: "Koramangala, Bangalore",
    address: "42, 5th Block, Koramangala, Bangalore - 560034",
    totalRooms: 20,
    occupiedRooms: 17,
    totalBeds: 40,
    occupiedBeds: 35,
    monthlyRent: 3500,
    totalRevenue: 122500,
    dueAmount: 10500,
    image: "https://images.unsplash.com/photo-1555854877-bab0e564b8d5?w=600&h=400&fit=crop",
    rating: 4.5,
    createdAt: "2023-01-15",
    lat: 12.9352,
    lng: 77.6245,
    amenities: ["Wi-Fi", "AC", "Laundry", "Study Room", "Gym", "Power Backup"],
    contactPhone: "+91 98765 43210",
    contactEmail: "sunrise@residentialnexus.com",
  },
  {
    id: "prop-2",
    name: "Urban Nest Co-Living",
    type: "pg",
    location: "HSR Layout, Bangalore",
    address: "15, Sector 2, HSR Layout, Bangalore - 560102",
    totalRooms: 15,
    occupiedRooms: 14,
    totalBeds: 30,
    occupiedBeds: 27,
    monthlyRent: 5500,
    totalRevenue: 148500,
    dueAmount: 5500,
    image: "https://images.unsplash.com/photo-1522708323590-d24dbb6b0267?w=600&h=400&fit=crop",
    rating: 4.8,
    createdAt: "2023-06-20",
    lat: 12.9121,
    lng: 77.6446,
    amenities: ["Wi-Fi", "AC", "Gaming Room", "Rooftop", "Laundry", "Parking"],
    contactPhone: "+91 98765 43211",
    contactEmail: "urbannest@residentialnexus.com",
  },
  {
    id: "prop-3",
    name: "GreenView PG",
    type: "pg",
    location: "BTM Layout, Bangalore",
    address: "8, 2nd Stage, BTM Layout, Bangalore - 560076",
    totalRooms: 12,
    occupiedRooms: 10,
    totalBeds: 24,
    occupiedBeds: 18,
    monthlyRent: 3000,
    totalRevenue: 54000,
    dueAmount: 9000,
    image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?w=600&h=400&fit=crop",
    rating: 4.2,
    createdAt: "2024-02-10",
    lat: 12.9165,
    lng: 77.6101,
    amenities: ["Wi-Fi", "Meals", "Hot Water", "Power Backup"],
    contactPhone: "+91 98765 43212",
    contactEmail: "greenview@residentialnexus.com",
  },
];

export const propertyRooms: PropertyRoom[] = [
  // Sunrise Student Haven rooms
  { id: "r1", propertyId: "prop-1", roomNumber: "101-A", floor: "1st", type: "Single", capacity: 1, currentOccupancy: 1, price: 3500, status: "occupied", amenities: ["Wi-Fi", "AC", "Attached Bath"] },
  { id: "r2", propertyId: "prop-1", roomNumber: "102-B", floor: "1st", type: "Shared (2-bed)", capacity: 2, currentOccupancy: 2, price: 3500, status: "occupied", amenities: ["Wi-Fi", "AC"] },
  { id: "r3", propertyId: "prop-1", roomNumber: "103-A", floor: "1st", type: "Single", capacity: 1, currentOccupancy: 1, price: 3500, status: "occupied", amenities: ["Wi-Fi", "Fan"] },
  { id: "r4", propertyId: "prop-1", roomNumber: "104-A", floor: "1st", type: "Single", capacity: 1, currentOccupancy: 0, price: 5500, status: "available", amenities: ["Wi-Fi", "AC", "Attached Bath"] },
  { id: "r5", propertyId: "prop-1", roomNumber: "201-A", floor: "2nd", type: "Double", capacity: 2, currentOccupancy: 2, price: 5500, status: "occupied", amenities: ["Wi-Fi", "AC", "Balcony"] },
  { id: "r6", propertyId: "prop-1", roomNumber: "202-B", floor: "2nd", type: "Shared (2-bed)", capacity: 2, currentOccupancy: 1, price: 4000, status: "occupied", amenities: ["Wi-Fi", "AC"] },
  { id: "r7", propertyId: "prop-1", roomNumber: "301-A", floor: "3rd", type: "Single", capacity: 1, currentOccupancy: 0, price: 5500, status: "available", amenities: ["Wi-Fi", "AC", "Terrace Access"] },
  // Urban Nest rooms
  { id: "r8", propertyId: "prop-2", roomNumber: "101", floor: "1st", type: "Single (Attached Bath)", capacity: 1, currentOccupancy: 1, price: 7000, status: "occupied", amenities: ["Wi-Fi", "AC", "Attached Bath", "Wardrobe"] },
  { id: "r9", propertyId: "prop-2", roomNumber: "102", floor: "1st", type: "Double", capacity: 2, currentOccupancy: 2, price: 5500, status: "occupied", amenities: ["Wi-Fi", "AC", "Wardrobe"] },
  { id: "r10", propertyId: "prop-2", roomNumber: "201", floor: "2nd", type: "Single", capacity: 1, currentOccupancy: 1, price: 5500, status: "occupied", amenities: ["Wi-Fi", "AC"] },
  { id: "r11", propertyId: "prop-2", roomNumber: "202", floor: "2nd", type: "Triple", capacity: 3, currentOccupancy: 3, price: 4000, status: "occupied", amenities: ["Wi-Fi", "Fan"] },
  // GreenView rooms
  { id: "r12", propertyId: "prop-3", roomNumber: "G1", floor: "Ground", type: "Double", capacity: 2, currentOccupancy: 2, price: 3000, status: "occupied", amenities: ["Wi-Fi", "Fan", "Kitchen Access"] },
  { id: "r13", propertyId: "prop-3", roomNumber: "G2", floor: "Ground", type: "Shared (4-bed)", capacity: 4, currentOccupancy: 3, price: 2500, status: "occupied", amenities: ["Wi-Fi", "Fan"] },
  { id: "r14", propertyId: "prop-3", roomNumber: "F1", floor: "1st", type: "Single", capacity: 1, currentOccupancy: 0, price: 3500, status: "available", amenities: ["Wi-Fi", "AC"] },
  { id: "r15", propertyId: "prop-3", roomNumber: "F2", floor: "1st", type: "Double", capacity: 2, currentOccupancy: 2, price: 3000, status: "occupied", amenities: ["Wi-Fi", "Fan"] },
];

export const propertyTenants: PropertyTenant[] = [
  { id: "t1", propertyId: "prop-1", name: "Arjun Sharma", phone: "+91 98765 43210", email: "arjun@email.com", room: "101-A", joinDate: "2024-01-15", rentAmount: 3500, rentStatus: "Paid" },
  { id: "t2", propertyId: "prop-1", name: "Priya Menon", phone: "+91 87654 32109", email: "priya@email.com", room: "102-B", joinDate: "2024-02-01", rentAmount: 3500, rentStatus: "Pending" },
  { id: "t3", propertyId: "prop-1", name: "Rahul Kumar", phone: "+91 76543 21098", email: "rahul@email.com", room: "201-A", joinDate: "2023-08-10", rentAmount: 5500, rentStatus: "Paid" },
  { id: "t4", propertyId: "prop-1", name: "Sneha Reddy", phone: "+91 65432 10987", email: "sneha@email.com", room: "202-B", joinDate: "2024-03-05", rentAmount: 5500, rentStatus: "Pending" },
  { id: "t5", propertyId: "prop-1", name: "Deepa Tiwari", phone: "+91 54321 09876", email: "deepa@email.com", room: "103-A", joinDate: "2023-11-20", rentAmount: 3000, rentStatus: "Paid" },
  { id: "t6", propertyId: "prop-2", name: "Vikram Patel", phone: "+91 99887 76655", email: "vikram@email.com", room: "101", joinDate: "2024-01-01", rentAmount: 7000, rentStatus: "Paid" },
  { id: "t7", propertyId: "prop-2", name: "Anita Gupta", phone: "+91 88776 65544", email: "anita@email.com", room: "102", joinDate: "2024-02-15", rentAmount: 5500, rentStatus: "Paid" },
  { id: "t8", propertyId: "prop-2", name: "Karan Desai", phone: "+91 77665 54433", email: "karan@email.com", room: "201", joinDate: "2024-03-01", rentAmount: 5500, rentStatus: "Pending" },
  { id: "t9", propertyId: "prop-3", name: "Meera Singh", phone: "+91 66554 43322", email: "meera@email.com", room: "G1", joinDate: "2024-01-10", rentAmount: 3000, rentStatus: "Paid" },
  { id: "t10", propertyId: "prop-3", name: "Ravi Shankar", phone: "+91 55443 32211", email: "ravi@email.com", room: "G2", joinDate: "2024-02-20", rentAmount: 2500, rentStatus: "Overdue" },
  { id: "t11", propertyId: "prop-3", name: "Pooja Nair", phone: "+91 44332 21100", email: "pooja@email.com", room: "F2", joinDate: "2024-03-15", rentAmount: 3000, rentStatus: "Paid" },
];
