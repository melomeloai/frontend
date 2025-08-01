import React from "react";
import { Link } from "react-router-dom";

import { UserMenu } from "@/components/auth/UserMenu";
import { CreditDisplay } from "@/components/credits/CreditDisplay";
import { ROUTES } from "@/utils/constants";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";

import { MobileNavigation } from "./MobileNavigation";
import { Navigation } from "./Navigation";

export const Header: React.FC = () => {
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

          {/* Desktop Navigation */}
          <Navigation />

          {/* Right side - Credits, Auth, Mobile Menu */}
          <div className="flex items-center gap-4 min-w-[120px] md:min-w-[200px] justify-end">
            <SignedIn>
              <div className="hidden md:block">
                <CreditDisplay />
              </div>
              <UserMenu />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>

            {/* Mobile Navigation */}
            <MobileNavigation />
          </div>
        </div>
      </div>
    </header>
  );
};
