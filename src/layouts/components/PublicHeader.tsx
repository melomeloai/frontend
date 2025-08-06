import React from "react";
import { Link } from "react-router-dom";

import { ROUTES } from "@/utils/constants";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";

export const PublicHeader: React.FC = () => {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 md:px-12">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center flex-shrink-0">
            <Link
              to={ROUTES.HOME}
              className="text-lg md:text-xl font-bold text-foreground flex items-center"
            >
              MeloReels.AI
            </Link>
          </div>

          {/* Right side - Pricing and Auth only */}
          <div className="flex items-center gap-4">
            <Link
              to={ROUTES.PRICING}
              className="text-base font-medium text-muted-foreground hover:text-primary transition-colors"
            >
              Pricing
            </Link>

            <SignedOut>
              <SignInButton
                mode="modal"
                forceRedirectUrl={ROUTES.WORKSPACE_CREATE}
              >
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            <SignedIn>
              <Link
                to="/workspace"
                className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors"
              >
                Go to Workspace
              </Link>
            </SignedIn>
          </div>
        </div>
      </div>
    </header>
  );
};
