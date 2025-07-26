import axios, { type AxiosResponse } from "axios";

import type {
  CheckoutSessionResponse,
  CreditInfoResponse,
  CustomerPortalResponse,
  MusicGenerationRequest,
  MusicGenerationResponse,
  MusicTaskResponse,
  SubscriptionInfoResponse,
  UpgradeRequest,
  UserResponse,
} from "@/types";
import { API_BASE_URL } from "@/utils/constants";

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Response interceptor for error handling
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    console.error("API Error:", error);
    return Promise.reject(error);
  }
);

// Helper function to create authenticated API calls
export const createAuthenticatedAPI = (
  getToken: () => Promise<string | null>
) => {
  const authenticatedApi = axios.create({
    baseURL: API_BASE_URL,
    timeout: 10000,
  });

  authenticatedApi.interceptors.request.use(
    async (config) => {
      try {
        const token = await getToken();
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
      } catch (error) {
        console.error("Failed to get auth token:", error);
      }
      return config;
    },
    (error) => Promise.reject(error)
  );

  authenticatedApi.interceptors.response.use(
    (response: AxiosResponse) => response,
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return {
    // User API - GET /api/users
    userAPI: {
      getUserInfo: async (): Promise<UserResponse> => {
        const response = await authenticatedApi.get("/users");
        return response.data;
      },
    },

    // Credits API - GET /api/credits
    creditsAPI: {
      getCreditInfo: async (): Promise<CreditInfoResponse> => {
        const response = await authenticatedApi.get("/credits");
        return response.data;
      },
    },

    // Subscription API
    subscriptionAPI: {
      // GET /api/subscriptions
      getSubscriptionInfo: async (): Promise<SubscriptionInfoResponse> => {
        const response = await authenticatedApi.get("/subscriptions");
        return response.data;
      },

      // POST /api/subscriptions/checkout
      createCheckoutSession: async (
        request: UpgradeRequest
      ): Promise<CheckoutSessionResponse> => {
        const response = await authenticatedApi.post(
          "/subscriptions/checkout",
          request
        );
        return response.data;
      },

      // POST /api/subscriptions/portal
      getCustomerPortal: async (): Promise<CustomerPortalResponse> => {
        const response = await authenticatedApi.post("/subscriptions/portal");
        return response.data;
      },
    },

    // Music Generation API
    musicAPI: {
      // POST /api/music/generate
      generateMusic: async (
        request: MusicGenerationRequest
      ): Promise<MusicGenerationResponse> => {
        const response = await authenticatedApi.post(
          "/music/generate",
          request
        );
        return response.data;
      },

      // GET /api/music/tasks/:taskId
      getTask: async (taskId: string): Promise<MusicTaskResponse> => {
        const response = await authenticatedApi.get(`/music/tasks/${taskId}`);
        return response.data;
      },
    },
  };
};

// For backward compatibility, export individual APIs (will be deprecated)
export const userAPI = {
  getUserInfo: async (): Promise<UserResponse> => {
    const response = await api.get("/users");
    return response.data;
  },
};

export const creditsAPI = {
  getCreditInfo: async (): Promise<CreditInfoResponse> => {
    const response = await api.get("/credits");
    return response.data;
  },
};

export const subscriptionAPI = {
  getSubscriptionInfo: async (): Promise<SubscriptionInfoResponse> => {
    const response = await api.get("/subscriptions");
    return response.data;
  },

  createCheckoutSession: async (
    request: UpgradeRequest
  ): Promise<CheckoutSessionResponse> => {
    const response = await api.post("/subscriptions/checkout", request);
    return response.data;
  },

  getCustomerPortal: async (): Promise<CustomerPortalResponse> => {
    const response = await api.post("/subscriptions/portal");
    return response.data;
  },
};

// Music API - Commented out until backend is ready
// export const musicAPI = {
//   generateMusic: async (
//     request: MusicGenerationRequest
//   ): Promise<MusicGenerationResponse> => {
//     const response = await api.post("/music/generate", request);
//     return response.data;
//   },

//   getTask: async (taskId: string): Promise<MusicTaskResponse> => {
//     const response = await api.get(`/music/tasks/${taskId}`);
//     return response.data;
//   },
// };
