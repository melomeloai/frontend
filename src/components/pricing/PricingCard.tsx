import { Check, Crown, X } from "lucide-react";
import React, { useState } from "react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { BillingCycle, PlanType, PricingPlan } from "@/types";

interface PricingCardProps {
  plan: PricingPlan;
  billingCycle: BillingCycle;
  currentPlan?: string;
  isLoggedIn: boolean;
  onUpgrade: (planType: PlanType, billingCycle: BillingCycle) => Promise<void>;
  onManagePlan: () => Promise<void>;
}

export const PricingCard: React.FC<PricingCardProps> = ({
  plan,
  billingCycle,
  currentPlan,
  isLoggedIn,
  onUpgrade,
  onManagePlan,
}) => {
  const [isLoading, setIsLoading] = useState(false);

  const isCurrentPlan = currentPlan === plan.type;
  const isCurrentOnFreePlan = currentPlan === "FREE";
  const isFree = plan.type === "FREE";
  const price =
    billingCycle === "YEARLY" ? plan.yearlyPrice : plan.monthlyPrice;
  const yearlyDiscount =
    plan.monthlyPrice > 0
      ? Math.round((1 - plan.yearlyPrice / 12 / plan.monthlyPrice) * 100)
      : 0;

  const getButtonText = () => {
    if (!isLoggedIn) {
      return isFree ? "Get Started" : "Sign Up to Subscribe";
    }

    if (isCurrentPlan) {
      return isFree ? "Current Plan" : "Manage Plan";
    }

    if (isFree) {
      return "Downgrade to Free";
    }

    return `Upgrade to ${plan.name}`;
  };

  const getButtonVariant = () => {
    if (isCurrentPlan) {
      return "outline" as const;
    }
    return plan.popular ? "default" : ("outline" as const);
  };

  const isButtonDisabled = () => {
    if (!isLoggedIn && isFree) return false;
    if (!isLoggedIn) return false;
    if (isCurrentPlan && isFree) return true;
    return isLoading;
  };

  const handleClick = async () => {
    if (!isLoggedIn) {
      // For non-logged-in users, clicking will trigger sign in
      await onManagePlan();
      return;
    }

    if (isCurrentOnFreePlan) {
      // If currently on free plan, open checkout for upgrade
      setIsLoading(true);
      try {
        await onUpgrade(plan.type, billingCycle);
      } finally {
        setIsLoading(false);
      }
      return;
    }

    // If currently on a paid plan, open manage plan
    setIsLoading(true);
    try {
      await onManagePlan();
    } finally {
      setIsLoading(false);
    }
    return;
  };

  return (
    <Card
      className={cn(
        "relative flex flex-col h-full",
        plan.popular && "border-primary shadow-lg scale-105",
        isCurrentPlan && "bg-muted/50"
      )}
    >
      {plan.popular && (
        <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
          <Badge className="bg-primary text-primary-foreground px-3 py-1">
            <Crown className="w-3 h-3 mr-1" />
            Most Popular
          </Badge>
        </div>
      )}

      <CardHeader className="text-center pb-2 p-6">
        <CardTitle className="text-2xl">{plan.name}</CardTitle>
        <CardDescription className="text-sm">
          {plan.description}
        </CardDescription>

        <div className="mt-4">
          <div className="flex items-baseline justify-center">
            <span className="text-2xl md:text-3xl font-bold">${price}</span>
            {!isFree && (
              <span className="text-muted-foreground ml-1 text-sm">
                /{billingCycle === "YEARLY" ? "year" : "month"}
              </span>
            )}
          </div>

          {billingCycle === "YEARLY" && yearlyDiscount > 0 && (
            <p className="text-sm text-green-600 mt-1">
              Save {yearlyDiscount}% with yearly billing
            </p>
          )}

          <p className="text-sm text-muted-foreground mt-2">
            {plan.resetCredits} credits per{" "}
            {plan.resetPeriod === "daily" ? "day" : "month"}
          </p>
        </div>
      </CardHeader>

      <CardContent className="flex-grow p-6 pt-2">
        <ul className="space-y-3">
          {plan.features.map((feature, index) => (
            <li key={index} className="flex items-start">
              {feature.included ? (
                <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
              ) : (
                <X className="w-5 h-5 text-muted-foreground mr-3 mt-0.5 flex-shrink-0" />
              )}
              <span
                className={cn(
                  "text-sm leading-relaxed",
                  feature.included
                    ? "text-foreground"
                    : "text-muted-foreground line-through"
                )}
              >
                {feature.text}
              </span>
            </li>
          ))}
        </ul>
      </CardContent>

      <CardFooter className="p-6 pt-0">
        <Button
          className="w-full h-11 text-base"
          variant={getButtonVariant()}
          disabled={isButtonDisabled()}
          onClick={handleClick}
        >
          {isLoading ? "Loading..." : getButtonText()}
        </Button>
      </CardFooter>
    </Card>
  );
};
