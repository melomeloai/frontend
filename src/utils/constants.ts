import type { PricingPlan } from "@/types";

// API Base URL
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:8080/api";

// Routes
export const ROUTES = {
  HOME: "/",
  CREATE: "/create",
  PRICING: "/pricing",
  ACCOUNT: "/account",
  LIBRARY: "/library",
} as const;

// Landing Page Features
export const LANDING_FEATURES = [
  {
    iconName: "FileText",
    title: "Text to Music",
    description:
      "Simply describe your needs and AI generates professional-quality music. Low-cost, high-efficiency creative experience",
  },
  {
    iconName: "Video",
    title: "Video AI Soundtrack",
    description:
      "Specialized intelligent soundtrack services for YouTube, TikTok, and Instagram short video creators",
  },
  {
    iconName: "Users",
    title: "For All Creators",
    description:
      "Serving individual creators and professional production teams, meeting content creation needs of all scales",
  },
  {
    iconName: "Zap",
    title: "Ultra-Fast Generation",
    description:
      "Generate professional-grade audio in 30 seconds, support multiple export formats, instantly meet creative needs",
  },
];

// Plan Configuration
export const PRICING_PLANS: PricingPlan[] = [
  {
    name: "Free",
    type: "FREE",
    description: "Perfect for trying out AI music generation and video soundtracks",
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
    description: "Great for content creators and hobbyists on YouTube, TikTok, Instagram",
    monthlyPrice: 9.99,
    yearlyPrice: 99.0,
    resetCredits: 500,
    resetPeriod: "monthly",
    popular: true,
    features: [
      { text: "500 credits per month", included: true },
      { text: "Advanced AI music and video soundtrack generation", included: true },
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
      { text: "Premium AI music and professional soundtrack generation", included: true },
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
