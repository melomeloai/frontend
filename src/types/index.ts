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

// Music Generation Types - Updated to match API spec
export type TaskType = "TEXT_TO_MUSIC" | "MUSIC_EDITING" | "VIDEO_SOUNDTRACK";
export type AudioSourceType = "URL" | "FILE_KEY";
export type VideoSourceType = "URL" | "FILE_KEY";
export type TaskStatus = "PENDING" | "IN_PROGRESS" | "COMPLETED" | "FAILED";
export type TriggerSource = "UI" | "API";

export interface MusicGenerationRequest {
  taskType: TaskType;
  prompt?: string;
  duration?: number;
  audioSource?: string;
  audioSourceType?: AudioSourceType;
  videoSource?: string;
  videoSourceType?: VideoSourceType;
  parameters?: string;
}

export interface TaskResponse {
  requestStatus: RequestStatus;
  taskId?: string;
  taskType?: TaskType;
  status?: TaskStatus;
  triggerSource?: TriggerSource;
  prompt?: string;
  duration?: number;
  audioSource?: string;
  audioSourceType?: AudioSourceType;
  videoSource?: string;
  videoSourceType?: VideoSourceType;
  resultAudioUrl?: string;
  errorMessage?: string;
  progress?: number;
  creditsConsumed?: number;
  createdAt?: string;
  updatedAt?: string;
  completedAt?: string;
}

export interface TaskListResponse {
  requestStatus: RequestStatus;
  tasks?: TaskResponse[];
  pagination?: PaginationInfo;
}

export interface PaginationInfo {
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

// Legacy types for backward compatibility
export interface MusicGenerationResponse {
  taskId: string;
}

export interface MusicTask {
  taskId: string;
  status: TaskStatus;
  progress?: number;
  result?: {
    audioUrl: string;
    title: string;
    duration: number;
  };
  error?: string;
  createdAt: string;
  completedAt?: string;
}

export interface MusicTaskResponse {
  taskId: string;
  status: TaskStatus;
  progress?: number;
  result?: {
    audioUrl: string;
    title: string;
    duration: number;
  };
  error?: string;
  createdAt: string;
  completedAt?: string;
}

// Re-export task types
export * from "./task";
