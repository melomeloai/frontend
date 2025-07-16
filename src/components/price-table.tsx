import clsx from "clsx";
import { Check } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { PlanType } from "@/types/subscription";
import { SignedIn, SignedOut, useClerk } from "@clerk/clerk-react";

interface PricingTableProps {
  currentPlan?: PlanType; // optional to support unauthenticated users
  onPlanSubscribe: () => void; // callback for unauthenticated users
  onPlanChange: (plan: PlanType) => void;
}

type Plan = {
  id: PlanType;
  title: string;
  price: string;
  features: string[];
  highlight: boolean;
  label?: string; // optional label for highlighted plans
  order: number; // used for sorting
};

const plans: Plan[] = [
  {
    id: "FREE" as const,
    title: "Free Plan",
    price: "$0/mo",
    features: ["10 credits/day", "Basic model access"],
    highlight: false,
    order: 1,
  },
  {
    id: "PRO" as const,
    title: "Pro Plan",
    price: "$9.99/mo",
    features: ["500 credits/mo", "Priority generation", "Email support"],
    highlight: true,
    label: "Most Popular",
    order: 2,
  },
  {
    id: "PREMIUM" as const,
    title: "Premium Plan",
    price: "$29.99/mo",
    features: ["2000 credits/mo", "Fastest queue", "Dedicated support"],
    highlight: false,
    order: 3,
  },
];

export function PricingTable({
  currentPlan,
  onPlanSubscribe,
  onPlanChange,
}: PricingTableProps) {
  const { openSignIn } = useClerk();
  const planIdMap: Record<PlanType, Plan> = plans.reduce((acc, plan) => {
    acc[plan.id] = plan;
    return acc;
  }, {} as Record<PlanType, Plan>);

  return (
    <section className="min-h-screen py-20 px-4">
      <h2 className="text-4xl font-bold text-center mb-12">Choose Your Plan</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {plans.map((plan) => (
          <Card
            key={plan.id}
            className={clsx(
              "border flex flex-col justify-between",
              plan.highlight && "border-blue-600"
            )}
          >
            <div>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle>{plan.title}</CardTitle>
                  {plan.label && (
                    <span className="text-xs bg-blue-100 text-blue-600 px-2 py-1 rounded">
                      {plan.label}
                    </span>
                  )}
                </div>
                <div className="font-semibold mb-2">{plan.price}</div>

                <SignedOut>
                  <Button
                    className="w-full mt-2"
                    // open sign-in with redirect to pricing page
                    onClick={onPlanSubscribe}
                  >
                    Subscribe
                  </Button>
                </SignedOut>

                <SignedIn>
                  {plan.id === currentPlan ? (
                    <Button variant="outline" disabled className="w-full mt-2">
                      Current Plan
                    </Button>
                  ) : (
                    <Button
                      className="w-full mt-2"
                      onClick={() => onPlanChange(plan.id)}
                    >
                      {planIdMap[plan.id].order < planIdMap[currentPlan!]?.order
                        ? "Downgrade"
                        : "Upgrade"}
                    </Button>
                  )}
                </SignedIn>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2 mt-4">
                  {plan.features.map((feature) => (
                    <li
                      key={feature}
                      className="flex items-center gap-2 text-sm"
                    >
                      <Check className="w-4 h-4 text-green-500" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
