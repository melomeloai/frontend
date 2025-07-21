import { useMemo } from "react";

import { createAuthenticatedAPI } from "@/services/api";
import { useAuth } from "@clerk/clerk-react";

export const useApi = () => {
  const { getToken } = useAuth();

  const api = useMemo(() => {
    return createAuthenticatedAPI(getToken);
  }, [getToken]);

  return api;
};
