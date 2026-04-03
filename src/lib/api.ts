/**
 * API Service Module
 * Centralized API calls for the application
 * Configure VITE_API_URL in .env file
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";
const AI_SERVICE_URL = import.meta.env.VITE_AI_SERVICE_URL || "http://localhost:5000";

// ============ STUDENT API ============

export const studentAPI = {
  /**
   * Search hostels by text
   */
  searchHostels: async (query: string, filters?: Record<string, any>) => {
    try {
      const response = await fetch(
        `${API_BASE_URL}/api/hostels/search?q=${query}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(filters),
        }
      );
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Failed to search hostels" });
    }
  },

  /**
   * Search hostels by image
   */
  searchByImage: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `${AI_SERVICE_URL}/api/search-by-image`,
      {
        method: "POST",
        body: formData,
      }
    );
    return response.json();
  },

  /**
   * Get hostel details
   */
  getHostelDetails: async (hostelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hostels/${hostelId}`);
    return response.json();
  },

  /**
   * Get hostel reviews
   */
  getHostelReviews: async (hostelId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/hostels/${hostelId}/reviews`);
    return response.json();
  },

  /**
   * Book a hostel
   */
  bookHostel: async (hostelId: string, bookingData: Record<string, any>) => {
    const response = await fetch(`${API_BASE_URL}/api/bookings`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hostelId, ...bookingData }),
    });
    return response.json();
  },

  /**
   * Get student's rent payments
   */
  getRentPayments: async (studentId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${studentId}/rent`);
    return response.json();
  },

  /**
   * Get student profile
   */
  getProfile: async (studentId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/students/${studentId}`);
    return response.json();
  },
};

// ============ OWNER API ============

export const ownerAPI = {
  /**
   * Get owner's properties
   */
  getProperties: async (ownerId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/owners/${ownerId}/properties`);
    return response.json();
  },

  /**
   * Create new property
   */
  createProperty: async (propertyData: Record<string, any>) => {
    const response = await fetch(`${API_BASE_URL}/api/properties`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(propertyData),
    });
    return response.json();
  },

  /**
   * Update property
   */
  updateProperty: async (propertyId: string, updates: Record<string, any>) => {
    const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return response.json();
  },

  /**
   * Delete property
   */
  deleteProperty: async (propertyId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}`, {
      method: "DELETE",
    });
    return response.json();
  },

  /**
   * Get property rooms
   */
  getPropertyRooms: async (propertyId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/rooms`);
    return response.json();
  },

  /**
   * Get property tenants
   */
  getPropertyTenants: async (propertyId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/properties/${propertyId}/tenants`);
    return response.json();
  },

  /**
   * Add tenant to property
   */
  addTenant: async (propertyId: string, tenantData: Record<string, any>) => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/${propertyId}/tenants`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(tenantData),
      }
    );
    return response.json();
  },

  /**
   * Get booking requests
   */
  getBookingRequests: async (propertyId: string) => {
    const response = await fetch(
      `${API_BASE_URL}/api/properties/${propertyId}/booking-requests`
    );
    return response.json();
  },

  /**
   * Respond to booking request
   */
  respondToBooking: async (
    bookingId: string,
    status: "approved" | "rejected",
    data?: Record<string, any>
  ) => {
    const response = await fetch(`${API_BASE_URL}/api/bookings/${bookingId}/respond`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status, ...data }),
    });
    return response.json();
  },

  /**
   * Get payment accounts
   */
  getPaymentAccounts: async (ownerId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/owners/${ownerId}/payment-accounts`);
    return response.json();
  },

  /**
   * Add payment account
   */
  addPaymentAccount: async (ownerId: string, accountData: Record<string, any>) => {
    const response = await fetch(
      `${API_BASE_URL}/api/owners/${ownerId}/payment-accounts`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(accountData),
      }
    );
    return response.json();
  },

  /**
   * Get owner profile
   */
  getProfile: async (ownerId: string) => {
    const response = await fetch(`${API_BASE_URL}/api/owners/${ownerId}`);
    return response.json();
  },

  /**
   * Update owner profile
   */
  updateProfile: async (ownerId: string, updates: Record<string, any>) => {
    const response = await fetch(`${API_BASE_URL}/api/owners/${ownerId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    });
    return response.json();
  },
};

// ============ AUTH API ============

export const authAPI = {
  /**
   * Student login
   */
  studentLogin: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/student/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Failed to login" });
    }
  },

  /**
   * Student signup
   */
  studentSignup: async (userData: Record<string, any>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/student/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Failed to create account" });
    }
  },

  /**
   * Owner login
   */
  ownerLogin: async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/owner/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Failed to login" });
    }
  },

  /**
   * Owner signup
   */
  ownerSignup: async (userData: Record<string, any>) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/owner/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(userData),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Failed to create account" });
    }
  },

  /**
   * Google OAuth login
   */
  googleLogin: async (googleToken: string, role: "student" | "owner") => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/google/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ googleToken, role }),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Google login failed" });
    }
  },

  /**
   * Logout
   */
  logout: async () => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
        method: "POST",
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      // Logout always succeeds on client side
      return { success: true };
    }
  },

  /**
   * Verify token
   */
  verifyToken: async (token: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/verify`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Token verification failed" });
    }
  },

  /**
   * Refresh token
   */
  refreshToken: async (refreshToken: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/refresh`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ refreshToken }),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Token refresh failed" });
    }
  },

  /**
   * Forgot password
   */
  forgotPassword: async (email: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/forgot-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Failed to send reset link" });
    }
  },

  /**
   * Reset password
   */
  resetPassword: async (token: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/auth/reset-password`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      if (!response.ok) {
        throw new APIError(response.status, await response.json().catch(() => ({})));
      }
      return response.json();
    } catch (error) {
      if (error instanceof APIError) throw error;
      throw new APIError(0, { message: "Failed to reset password" });
    }
  },
};

// ============ PAYMENT API ============

export const paymentAPI = {
  /**
   * Initialize payment
   */
  initializePayment: async (amount: number, description: string) => {
    const response = await fetch(`${API_BASE_URL}/api/payments/initialize`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ amount, description }),
    });
    return response.json();
  },

  /**
   * Verify payment
   */
  verifyPayment: async (paymentId: string, signature: string) => {
    const response = await fetch(`${API_BASE_URL}/api/payments/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ paymentId, signature }),
    });
    return response.json();
  },
};

// ============ AI SERVICES ============

export const aiServices = {
  /**
   * Extract room features from image
   */
  extractRoomFeatures: async (file: File) => {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `${AI_SERVICE_URL}/api/extract-room-features`,
      {
        method: "POST",
        body: formData,
      }
    );
    return response.json();
  },

  /**
   * Get AI recommendations
   */
  getRecommendations: async (userPreferences: Record<string, any>) => {
    const response = await fetch(`${AI_SERVICE_URL}/api/recommendations`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userPreferences),
    });
    return response.json();
  },

  /**
   * Process text to extract intent and preferences
   */
  processUserQuery: async (query: string) => {
    const response = await fetch(`${AI_SERVICE_URL}/api/process-query`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ query }),
    });
    return response.json();
  },
};

// ============ ERROR HANDLING ============

export class APIError extends Error {
  constructor(public status: number, public data: any) {
    super(data?.message || "API Error");
  }
}

/**
 * Utility to safely handle API calls with error handling
 */
async function fetchAPI<T>(
  url: string,
  options?: RequestInit
): Promise<T> {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      const data = await response.json().catch(() => ({}));
      throw new APIError(response.status, data);
    }
    return response.json();
  } catch (error) {
    if (error instanceof APIError) throw error;
    throw new APIError(0, {
      message: error instanceof Error ? error.message : "Network error",
    });
  }
}

/**
 * Utility to handle API responses (legacy, kept for compatibility)
 */
export async function handleAPIResponse(response: Response) {
  if (!response.ok) {
    const data = await response.json().catch(() => ({}));
    throw new APIError(response.status, data);
  }
  return response.json();
}
