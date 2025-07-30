import { useEffect, useRef } from "react";

import { createAuthenticatedAPI } from "@/services/api";
import { useAuth, useUser } from "@clerk/clerk-react";

export const AuthCallback: React.FC = () => {
  const { isSignedIn, getToken } = useAuth();
  const { user } = useUser();
  const hasCalledLogin = useRef(false);
  const previousSignedInState = useRef(isSignedIn);

  useEffect(() => {
    const callLoginEndpoint = async () => {
      // Only call if user just signed in (transition from false to true)
      if (
        isSignedIn &&
        !previousSignedInState.current &&
        !hasCalledLogin.current &&
        user
      ) {
        hasCalledLogin.current = true;
        const api = createAuthenticatedAPI(getToken);

        // Call the backend login endpoint
        await api.authAPI.loginCallback();
      }

      // Update the previous state
      previousSignedInState.current = isSignedIn;
    };

    callLoginEndpoint();
  }, [isSignedIn, user, getToken]);

  // Reset the flag when user signs out
  useEffect(() => {
    if (!isSignedIn) {
      hasCalledLogin.current = false;
    }
  }, [isSignedIn]);

  return null; // This component doesn't render anything
};
