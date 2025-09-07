import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "@clerk/clerk-react";

import { ROUTES } from "@/utils/constants";

export const AuthRedirect: React.FC = () => {
  const { isLoaded } = useAuth();

  if (!isLoaded) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // Always redirect to home page, which now shows the Create page
  return <Navigate to={ROUTES.HOME} replace />;
};