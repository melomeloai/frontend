import { useCallback, useEffect, useState } from "react";

import type { SubscriptionInfoResponse } from "@/types";

import { useApi } from "./useApi";

export const useSubscription = () => {
  const [subscription, setSubscription] =
    useState<SubscriptionInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { subscriptionAPI } = useApi();

  const fetchSubscription = useCallback(async () => {
    try {
      setError(null);
      const response = await subscriptionAPI.getSubscriptionInfo();
      setSubscription(response);
    } catch (err) {
      setError("Failed to load subscription");
      console.error("Subscription fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [subscriptionAPI]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    fetchSubscription();
  }, [fetchSubscription]);

  useEffect(() => {
    fetchSubscription();
  }, [fetchSubscription]);

  return {
    subscription,
    isLoading,
    error,
    refetch,
  };
};
