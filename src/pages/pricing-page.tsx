import { PricingTable } from "@/components/price-table";
import { useSubscription } from "@/hooks/useSubscription";

export default function PricingPage() {
  const { subscription } = useSubscription();

  return (
    <div className="pt-20">
      <PricingTable
        currentPlan={subscription?.currentPlan}
        onUpgrade={(plan) => alert(`Upgrade to ${plan} plan (todo)`)}
      />
    </div>
  );
}
