import React, { useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { useApi } from "@/hooks/useApi";
import { useSubscription } from "@/hooks/useSubscription";
import { cn } from "@/lib/utils";
import type { BillingCycle, PlanType } from "@/types";
import { PRICING_PLANS } from "@/utils/constants";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

import { PricingCard } from "./PricingCard";

export const PricingTable: React.FC = () => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>("MONTHLY");
  const { subscription } = useSubscription();
  const { subscriptionAPI } = useApi();
  const { openSignIn } = useClerk();

  const handleUpgrade = async (planType: PlanType, cycle: BillingCycle) => {
    try {
      // For free plan, we don't create checkout (it's handled by downgrade in backend)
      if (planType === "FREE") {
        toast.success("Downgrading to free plan...");
        // This would typically require a backend call to cancel subscription
        return;
      }

      const response = await subscriptionAPI.createCheckoutSession({
        planType,
        billingCycle: cycle,
      });

      toast.success("Redirecting to checkout...");
      window.location.href = response.checkoutUrl;
    } catch (error) {
      console.error("Checkout error:", error);
      toast.error("Failed to create checkout session. Please try again.");
    }
  };

  const handleManagePlan = async () => {
    try {
      const response = await subscriptionAPI.getCustomerPortal();
      toast.success("Opening customer portal...");
      window.open(response.portalUrl, "_blank");
    } catch (error) {
      console.error("Portal error:", error);
      toast.error("Failed to open customer portal. Please try again.");
    }
  };

  const handleSignInRequired = () => {
    openSignIn({
      redirectUrl: "/pricing",
    });
  };

  return (
    <div className="space-y-8">
      {/* Billing Cycle Toggle */}
      <div className="flex items-center justify-center space-x-4">
        <Label
          htmlFor="billing-toggle"
          className={cn(
            "text-sm font-medium",
            billingCycle === "MONTHLY"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Monthly
        </Label>
        <Switch
          id="billing-toggle"
          checked={billingCycle === "YEARLY"}
          onCheckedChange={(checked) =>
            setBillingCycle(checked ? "YEARLY" : "MONTHLY")
          }
        />
        <Label
          htmlFor="billing-toggle"
          className={cn(
            "text-sm font-medium",
            billingCycle === "YEARLY"
              ? "text-foreground"
              : "text-muted-foreground"
          )}
        >
          Yearly
        </Label>
        {billingCycle === "YEARLY" && (
          <Badge variant="secondary" className="ml-2">
            Save up to 17%
          </Badge>
        )}
      </div>

      {/* Pricing Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {PRICING_PLANS.map((plan) => (
          <SignedIn key={plan.type}>
            <PricingCard
              plan={plan}
              billingCycle={billingCycle}
              currentPlan={subscription?.planType}
              isLoggedIn={true}
              onUpgrade={handleUpgrade}
              onManagePlan={handleManagePlan}
            />
          </SignedIn>
        ))}

        {PRICING_PLANS.map((plan) => (
          <SignedOut key={`signed-out-${plan.type}`}>
            <PricingCard
              plan={plan}
              billingCycle={billingCycle}
              isLoggedIn={false}
              onUpgrade={() => Promise.resolve()}
              onManagePlan={() => {
                handleSignInRequired();
                return Promise.resolve();
              }}
            />
          </SignedOut>
        ))}
      </div>
    </div>
  );
};
