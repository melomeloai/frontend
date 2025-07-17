import { PricingTable } from "@/components/price-table";
import { useSubscription } from "@/hooks/useSubscription";
import { API_BASE_URL, ApiError, type ApiResponse } from "@/lib/api";
import { useAuth, useClerk } from "@clerk/clerk-react";

export default function PricingPage() {
  const { openSignIn } = useClerk();
  const { subscription } = useSubscription();
  const { getToken } = useAuth();

  async function handleSubscribe() {
    // Handle subscription logic here for unauthenticated users
    openSignIn({ forceRedirectUrl: "/pricing" });
  }

  async function handlePlanChange(plan: string) {
    // Handle plan change logic here
    try {
      const token = await getToken();

      const res = await fetch(`${API_BASE_URL}/subscriptions/checkout`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          planType: plan,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new ApiError(errorData.code, errorData.message);
      }

      const json: ApiResponse<string> = await res.json();
      if (!json.success) {
        console.error("Failed to create checkout session:", json.message);
        alert("Failed to upgrade plan. Please try again later.");
        return;
      }

      const stripeSessionUrl = json.data;
      // Redirect to Stripe checkout session
      window.location.href = stripeSessionUrl;
    } catch (error) {}
  }

  return (
    <div className="pt-20">
      <PricingTable
        currentPlan={subscription?.currentPlan}
        onPlanSubscribe={handleSubscribe}
        onPlanChange={handlePlanChange}
      />
    </div>
  );
}
