import { API_BASE_URL, useClerkSWR } from "@/lib/api";
import type { Subscription } from "@/types/subscription";

export function useSubscription() {
  const { data, error, isLoading } = useClerkSWR<Subscription>(
    API_BASE_URL + "/users/me/subscription"
  );
  return {
    subscription: data,
    error,
    isLoading,
  };
}
