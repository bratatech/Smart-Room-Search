/**
 * Application Constants
 * Centralized configuration values used throughout the app
 */

// ============ LOCATION ============
export const DEFAULT_LOCATION = {
  lat: 12.9716,
  lng: 77.5946,
  name: "Bangalore"
};

// ============ PRICING ============
export const DEFAULT_PRICE_RANGE = [6000]; // in rupees
export const MIN_PRICE = 1000;
export const MAX_PRICE = 10000;
export const PRICE_STEP = 500;

// ============ FILE UPLOADS ============
export const MAX_IMAGE_SIZE_MB = 5;
export const MAX_IMAGES_COUNT = 10;
export const ALLOWED_IMAGE_TYPES = ["image/jpeg", "image/png", "application/pdf"];
export const ALLOWED_IMAGE_EXTENSIONS = ".pdf,.jpg,.jpeg,.png";

// ============ AMENITIES ============
export const AMENITY_OPTIONS = [
  "Wi-Fi",
  "AC",
  "Laundry",
  "Study Room",
  "Gym",
  "Power Backup",
  "Parking",
  "Kitchen Access",
  "Meals",
  "Hot Water",
  "CCTV",
  "Gaming Room",
  "Rooftop",
  "Library",
  "Co-working Space",
  "Swimming Pool"
];

// ============ FACILITIES FILTERS ============
export const FACILITY_FILTERS = ["Wi-Fi", "AC", "Meals", "Gym"];

// ============ LOCATIONS FOR FILTERING ============
export const LOCATION_OPTIONS = [
  "All Locations",
  "Koramangala",
  "HSR Layout",
  "BTM Layout",
  "Whitefield",
  "Indiranagar"
];

// ============ COLORS ============
export const PRIMARY_COLOR = "#7c3aed"; // Violet
export const THEME_COLORS = {
  primary: "#7c3aed",
  success: "#10b981",
  warning: "#f59e0b",
  destructive: "#ef4444"
};

// ============ PAGINATION ============
export const ITEMS_PER_PAGE = 10;

// ============ ROOM TYPES ============
export const ROOM_TYPES = {
  single: "Single",
  double: "Double",
  triple: "Triple",
  dorm: "Dorm"
};

// ============ PROPERTY TYPES ============
export const PROPERTY_TYPES = ["hostel", "pg", "apartment"] as const;

// ============ BOOKING STATUS ============
export const BOOKING_STATUS = {
  pending: "Pending",
  approved: "Approved",
  rejected: "Rejected",
  completed: "Completed"
};

// ============ PAYMENT STATUS ============
export const PAYMENT_STATUS = {
  pending: "Pending",
  paid: "Paid",
  overdue: "Overdue"
};

// ============ VALIDATION RULES ============
export const VALIDATION = {
  minNameLength: 2,
  maxNameLength: 50,
  emailRegex: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
  phoneRegex: /^[+]?[(]?[0-9]{1,4}[)]?[-\s.]?[(]?[0-9]{1,4}[)]?[-\s.]?[0-9]{1,9}$/,
  pincodeLength: 6,
  minRoomCount: 1,
  maxRoomCount: 999,
  minPrice: 100,
  maxPrice: 1000000
};

// ============ ANIMATION DURATION ============
export const ANIMATION = {
  default: 0.3,
  slow: 0.5,
  fast: 0.15
};

// ============ DATE FORMATS ============
export const DATE_FORMAT = "dd MMM yyyy";
export const DATE_TIME_FORMAT = "dd MMM yyyy HH:mm";

// ============ NOTIFICATION DURATION ============
export const TOAST_DURATION = 3000; // milliseconds

// ============ API TIMEOUTS ============
export const API_TIMEOUT = 30000; // milliseconds
export const RETRY_ATTEMPTS = 3;

// ============ LOCAL STORAGE KEYS ============
export const STORAGE_KEYS = {
  theme: "theme",
  authToken: "auth_token",
  userRole: "user_role",
  userId: "user_id",
  userPreferences: "user_preferences"
};
