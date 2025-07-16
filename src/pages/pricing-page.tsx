import { PricingTable } from "@/components/price-table";
import { useSubscription } from "@/hooks/useSubscription";
import { useClerk } from "@clerk/clerk-react";

export default function PricingPage() {
  const { openSignIn } = useClerk();
  const { subscription } = useSubscription();

  return (
    <div className="pt-20">
      <PricingTable
        currentPlan={subscription?.currentPlan}
        onPlanSubscribe={() => openSignIn({ forceRedirectUrl: "/pricing" })}
        onPlanChange={(plan) => alert(`Upgrade to ${plan} plan (todo)`)}
      />
    </div>
  );
}
