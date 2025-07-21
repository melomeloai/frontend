import { useCallback, useEffect, useState } from "react";

import type { CreditInfoResponse } from "@/types";
import { CREDIT_REFRESH_INTERVAL } from "@/utils/constants";

import { useApi } from "./useApi";

export const useCredits = () => {
  const [credits, setCredits] = useState<CreditInfoResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { creditsAPI } = useApi();

  const fetchCredits = useCallback(async () => {
    try {
      setError(null);
      const response = await creditsAPI.getCreditInfo();
      setCredits(response);
    } catch (err) {
      setError("Failed to load credits");
      console.error("Credits fetch error:", err);
    } finally {
      setIsLoading(false);
    }
  }, [creditsAPI]);

  const refetch = useCallback(() => {
    setIsLoading(true);
    fetchCredits();
  }, [fetchCredits]);

  useEffect(() => {
    fetchCredits();

    // Set up periodic refresh
    const interval = setInterval(fetchCredits, CREDIT_REFRESH_INTERVAL);

    return () => clearInterval(interval);
  }, [fetchCredits]);

  return {
    credits,
    isLoading,
    error,
    refetch,
  };
};
