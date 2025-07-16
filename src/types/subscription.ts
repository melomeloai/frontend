export type PlanType = "FREE" | "PRO" | "PREMIUM";

export interface Subscription {
  userId: number;
  currentPlan: PlanType;
  currentCredit: number;
  nextResetAt: string;
}
