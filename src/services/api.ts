import axios, { type AxiosResponse } from "axios";

import type {
  CheckoutSessionResponse,
  CreditInfoResponse,
  CustomerPortalResponse,
  FileUploadRequest,
  FileUploadResponse,
  SendMessageRequest,
  SessionListResponse,
  SessionResponse,
  SessionUpdateResponse,
  SubscriptionInfoResponse,
  UpgradeRequest,
} from "@/types";
import { API_BASE_URL } from "@/utils/constants";

// Helper function to convert snake_case to camelCase recursively
function snakeToCamelCase(obj: any): any {
  if (obj === null || typeof obj !== "object") {
    return obj;
  }

  if (Array.isArray(obj)) {
    return obj.map(snakeToCamelCase);
  }

  const camelCaseObj: any = {};
  for (const [key, value] of Object.entries(obj)) {
    const camelCaseKey = key.replace(/_([a-z])/g, (_, letter) =>
      letter.toUpperCase()
    );
    camelCaseObj[camelCaseKey] = snakeToCamelCase(value);
  }

  return camelCaseObj;
}

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
});

// Response interceptor for error handling and key transformation
api.interceptors.response.use(
  (response: AxiosResponse) => {
    // Transform snake_case keys to camelCase
    if (response.data) {
      response.data = snakeToCamelCase(response.data);
    }
    return response;
  },
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
    (response: AxiosResponse) => {
      // Transform snake_case keys to camelCase
      if (response.data) {
        response.data = snakeToCamelCase(response.data);
      }
      return response;
    },
    (error) => {
      console.error("API Error:", error);
      return Promise.reject(error);
    }
  );

  return {
    // Auth API
    authAPI: {
      // POST /api/auth/login-callback - Login callback after Clerk authentication
      loginCallback: async (): Promise<void> => {
        await authenticatedApi.post("/auth/login-callback");
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

    // File Upload API
    fileAPI: {
      // POST /api/files/upload-url
      getUploadUrl: async (
        request: FileUploadRequest
      ): Promise<FileUploadResponse> => {
        const response = await authenticatedApi.post(
          "/files/upload-url",
          request
        );
        return response.data;
      },

      // Upload file to S3 (no auth needed, uses presigned URL)
      uploadToS3: async (uploadUrl: string, file: File): Promise<void> => {
        await axios.put(uploadUrl, file, {
          headers: {
            "Content-Type": file.type,
            "Content-Length": file.size.toString(),
          },
        });
      },
    },

    // Session API
    sessionAPI: {
      // GET /api/sessions - List user sessions with pagination
      listUserSessions: async (
        page = 0,
        pageSize = 10
      ): Promise<SessionListResponse> => {
        const response = await authenticatedApi.get("/sessions", {
          params: { page, pageSize },
        });
        return response.data;
      },

      // POST /api/sessions - Create new session
      createSession: async (): Promise<SessionResponse> => {
        const response = await authenticatedApi.post("/sessions");
        return response.data;
      },

      // GET /api/sessions/:sessionId - Get session details with all messages
      getSession: async (sessionId: string): Promise<SessionResponse> => {
        const response = await authenticatedApi.get(`/sessions/${sessionId}`);
        return response.data;
      },

      // POST /api/sessions/:sessionId - Send message to AI chatbot in session
      sendMessage: async (
        sessionId: string,
        request: SendMessageRequest
      ): Promise<SessionUpdateResponse> => {
        const response = await authenticatedApi.post(
          `/sessions/${sessionId}`,
          request
        );
        return response.data;
      },
    },
  };
};
