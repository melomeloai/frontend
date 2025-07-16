export type PlanType = "free" | "pro" | "premium";

export interface Subscription {
  userId: number;
  currentPlan: PlanType;
  currentCredit: number;
  nextResetAt: string;
}
