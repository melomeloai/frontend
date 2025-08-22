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
  frozenCredits: number;
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
  frozenCredits: number;
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
export type BillingCycle = "MONTHLY" | "YEARLY";

export interface UpgradeRequest {
  planType: PlanType;
  billingCycle: BillingCycle; // Now using enum values MONTHLY/YEARLY
}

export interface CheckoutSessionResponse {
  checkoutUrl: string; // API uses "checkoutUrl" instead of "sessionUrl"
}

export interface CustomerPortalResponse {
  portalUrl: string;
}

// File Upload Types
export interface FileUploadRequest {
  fileName: string;
  contentType: string;
  fileSize: number;
  fileType: "VIDEO" | "AUDIO";
}

export interface FileUploadResponse {
  requestStatus: RequestStatus;
  uploadUrl?: string;
  fileKey?: string;
}

// Request Status Type
export interface RequestStatus {
  requestId?: string;
  error?: string;
  errorMessage?: string;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Session Management Types
export type MessageSender = "USER" | "ASSISTANT";
export type SongStatus = "GENERATING" | "COMPLETED" | "FAILED" | "EDITING";

export interface MessageDto {
  messageId: string;
  parentMessageId?: string;
  content: string;
  sender: MessageSender;
  timestamp: string;
  songId?: string;
  metadata?: Record<string, any>;
}

export interface SongDto {
  songId: string;
  title: string;
  tags: string[];
  audioUrl: string;
  duration: number;
  status: SongStatus;
  generationParams?: Record<string, any>;
  createdAt: string;
  completedAt?: string;
}

export interface SessionSummaryDto {
  sessionId: string;
  createdAt: string;
  updatedAt: string;
}

export interface SessionResponse {
  requestStatus: RequestStatus;
  sessionId?: string;
  userId?: string;
  createdAt?: string;
  updatedAt?: string;
  messages?: MessageDto[];
  songs?: SongDto[];
}

export interface SessionListResponse {
  requestStatus: RequestStatus;
  sessions?: SessionSummaryDto[];
  pagination?: PaginationInfo;
}

export interface SendMessageRequest {
  parentMessageId?: string;
  content: string;
}

export interface SessionUpdateResponse {
  messageUpdates: MessageDto[];
  songUpdates: SongDto[];
}
