import type { PricingPlan } from "@/types";

// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Plan Configuration
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    type: "FREE",
    description: "Perfect for trying out our AI music generation",
    monthlyPrice: 0,
    yearlyPrice: 0,
    resetCredits: 10,
    resetPeriod: "daily",
    features: [
      { text: "10 credits per day", included: true },
      { text: "Basic AI music generation", included: true },
      { text: "Standard quality output", included: true },
      { text: "Community support", included: true },
      { text: "Advanced features", included: false },
      { text: "Priority generation", included: false },
    ],
  },
  {
    name: "Pro",
    type: "PRO",
    description: "Great for regular creators and hobbyists",
    monthlyPrice: 9.99,
    yearlyPrice: 99.99,
    resetCredits: 500,
    resetPeriod: "monthly",
    popular: true,
    features: [
      { text: "500 credits per month", included: true },
      { text: "Advanced AI music generation", included: true },
      { text: "High quality output", included: true },
      { text: "Priority support", included: true },
      { text: "Purchase additional credits", included: true },
      { text: "API access", included: false },
    ],
  },
  {
    name: "Premium",
    type: "PREMIUM",
    description: "For professional creators and businesses",
    monthlyPrice: 29.99,
    yearlyPrice: 299.99,
    resetCredits: 2000,
    resetPeriod: "monthly",
    features: [
      { text: "2000 credits per month", included: true },
      { text: "Premium AI music generation", included: true },
      { text: "Highest quality output", included: true },
      { text: "Premium support", included: true },
      { text: "Purchase additional credits", included: true },
      { text: "API access", included: true },
    ],
  },
];

// Routes
export const ROUTES = {
  HOME: "/",
  PRICING: "/pricing",
  LIBRARY: "/library",
} as const;

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
