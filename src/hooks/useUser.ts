import { API_BASE_URL, useClerkSWR } from "@/lib/api";
import type { User } from "@/types/user";

export function useUser() {
  const { data, error, isLoading } = useClerkSWR<User>(
    API_BASE_URL + "/users/me"
  );
  return {
    user: data,
    error,
    isLoading,
  };
}
