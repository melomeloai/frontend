import React from "react";

import { PricingTable } from "@/components/pricing/PricingTable";
import { SubscriptionStatus } from "@/components/pricing/SubscriptionStatus";

export const Plan: React.FC = () => {
  return (
    <div className="max-w-6xl mx-auto space-y-8">
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
          Plan & Billing
        </h1>
        <p className="text-lg text-muted-foreground">
          Manage your subscription and billing information
        </p>
      </div>

      <SubscriptionStatus />
      <PricingTable />
    </div>
  );
};