import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import { ROUTES } from "@/utils/constants";

export const AuthRedirect: React.FC = () => {
  const { isSignedIn, isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (isSignedIn) {
    return <Navigate to={ROUTES.WORKSPACE_CREATE} replace />;
  }

  return <Navigate to={ROUTES.HOME} replace />;
};