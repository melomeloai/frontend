import useSWR from "swr";

import { useAuth } from "@clerk/clerk-react";

export interface ApiResponse<T> {
  success: boolean;
  data: T;
  message?: string;
  code: number;
}

export class ApiError extends Error {
  public readonly code: number;
  public readonly message: string;

  constructor(code: number, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

if (!API_BASE_URL) {
  throw new Error("Missing API base URL");
}

export function useClerkSWR<T>(url: string) {
  const { isSignedIn, getToken } = useAuth();

  const fetcher = async (input: RequestInfo, init?: RequestInit) => {
    const token = await getToken();
    const res = await fetch(input, {
      ...init,
      headers: {
        ...(init?.headers || {}),
        Authorization: `Bearer ${token}`,
      },
    });
    const json: ApiResponse<T> = await res.json();
    if (!json.success) {
      throw new ApiError(json.code, json.message ?? "Unknown error");
    }
    return json.data;
  };

  return useSWR<T>(isSignedIn ? url : null, fetcher);
}
