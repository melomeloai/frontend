import type { PricingPlan } from "@/types";

// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Routes
export const ROUTES = {
  // Public routes
  HOME: "/",
  PRICING: "/pricing",
  LOGIN: "/login",
  
  // Workspace routes
  WORKSPACE: "/workspace",
  WORKSPACE_CREATE: "/workspace/create",
  WORKSPACE_LIBRARY: "/workspace/library",
  WORKSPACE_PLAN: "/workspace/plan",
  
  // Legacy routes (for backwards compatibility)
  CREATE: "/create",
  ACCOUNT: "/account",
  LIBRARY: "/library",
} as const;

// File Upload Limits
export const MAX_VIDEO_FILE_SIZE = 1000 * 1024 * 1024; // in bytes

// Plan Configuration
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    type: "FREE",
    description:
      "Perfect for trying out AI music generation and video soundtracks",
    monthlyPrice: 0,
    yearlyPrice: 0,
    resetCredits: 10,
    resetPeriod: "daily",
    features: [
      { text: "10 credits per day", included: true },
      { text: "Basic AI music and soundtrack generation", included: true },
      { text: "Standard quality output", included: true },
      { text: "Community support", included: true },
      { text: "Advanced features", included: false },
      { text: "Priority generation", included: false },
    ],
  },
  {
    name: "Pro",
    type: "PRO",
    description:
      "Great for content creators and hobbyists on YouTube, TikTok, Instagram",
    monthlyPrice: 9.99,
    yearlyPrice: 99.0,
    resetCredits: 500,
    resetPeriod: "monthly",
    popular: true,
    features: [
      { text: "500 credits per month", included: true },
      {
        text: "Advanced AI music and video soundtrack generation",
        included: true,
      },
      { text: "High quality output", included: true },
      { text: "Priority support", included: true },
      { text: "Purchase additional credits", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Premium",
    type: "PREMIUM",
    description: "For professional content creators and production teams",
    monthlyPrice: 29.99,
    yearlyPrice: 299.0,
    resetCredits: 2000,
    resetPeriod: "monthly",
    features: [
      { text: "2000 credits per month", included: true },
      {
        text: "Premium AI music and professional soundtrack generation",
        included: true,
      },
      { text: "Highest quality output", included: true },
      { text: "Premium support", included: true },
      { text: "Purchase additional credits", included: true },
      { text: "API access", included: true },
    ],
  },
];

// Credit Display Settings
export const CREDIT_REFRESH_INTERVAL = 30000; // 30 seconds

// Toast Messages
export const MESSAGES = {
  CHECKOUT_SUCCESS: "Redirecting to checkout...",
  CHECKOUT_ERROR: "Failed to create checkout session",
  PORTAL_SUCCESS: "Redirecting to customer portal...",
  PORTAL_ERROR: "Failed to open customer portal",
  CREDITS_ERROR: "Failed to load credits",
  SUBSCRIPTION_ERROR: "Failed to load subscription",
} as const;

// Billing Cycles - Updated to match API enum values
export const BILLING_CYCLES = {
  MONTHLY: "MONTHLY" as const,
  YEARLY: "YEARLY" as const,
} as const;

export type BillingCycleType =
  (typeof BILLING_CYCLES)[keyof typeof BILLING_CYCLES];

// Clerk Appearance Configuration
export const CLERK_APPEARANCE = {
  variables: {
    colorBackground: "var(--card)",
    colorDanger: "var(--destructive)",
    colorForeground: "var(--card-foreground)",
    colorInput: "var(--input)",
    colorInputForeground: "var(--card-foreground)",
    colorModalBackdrop: "var(--color-black)",
    colorMuted: "var(--muted)",
    colorMutedForeground: "var(--muted-foreground)",
    colorNeutral: "var(--foreground)",
    colorPrimary: "var(--primary)",
    colorPrimaryForeground: "var(--primary-foreground)",
    colorRing: "var(--ring)",
    fontWeight: {
      normal: "var(--font-weight-normal)",
      medium: "var(--font-weight-medium)",
      semibold: "var(--font-weight-semibold)",
      bold: "var(--font-weight-semibold)",
    },
  },
  elements: {
    input: "bg-transparent dark:bg-input/30",
    cardBox: "shadow-sm border",
    popoverBox: "shadow-sm border",
    button: {
      '&[data-variant="solid"]::after': {
        display: "none",
      },
    },
    providerIcon__apple: "dark:invert",
    providerIcon__github: "dark:invert",
    providerIcon__okx_wallet: "dark:invert",
  },
} as const;
