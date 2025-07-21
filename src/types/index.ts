// User and Authentication Types
export interface User {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

// Credit System Types
export interface CreditInfo {
  permanentCredits: number;
  renewableCredits: number; // Note: API uses "renewableCredits" instead of "resetCredits"
  nextResetTime: string; // ISO datetime string
}

// Subscription Types
export type PlanType = "FREE" | "PRO" | "PREMIUM";

export interface SubscriptionInfo {
  planType: string;
  billingCycle: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
}

// API Response Types - Based on actual API responses
export interface UserResponse {
  id: number;
  email: string;
  name: string;
  createdAt: string;
}

export interface CreditInfoResponse {
  permanentCredits: number;
  renewableCredits: number;
  nextResetTime: string;
}

export interface SubscriptionInfoResponse {
  planType: string;
  billingCycle: string;
  status: string;
  cancelAtPeriodEnd: boolean;
  currentPeriodStart?: string;
  currentPeriodEnd?: string;
}

// Pricing Types
export interface PlanFeature {
  text: string;
  included: boolean;
}

export interface PricingPlan {
  name: string;
  type: PlanType;
  description: string;
  monthlyPrice: number;
  yearlyPrice: number;
  resetCredits: number;
  resetPeriod: "daily" | "monthly";
  features: PlanFeature[];
  popular?: boolean;
}

// Stripe Types - Updated based on actual API
export interface UpgradeRequest {
  planType: PlanType;
  billingCycle: string; // API uses string instead of 'monthly' | 'yearly'
}

export interface CheckoutSessionResponse {
  checkoutUrl: string; // API uses "checkoutUrl" instead of "sessionUrl"
}

export interface CustomerPortalResponse {
  portalUrl: string;
}
