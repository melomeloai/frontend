import React from "react";
import { Link } from "react-router-dom";

import { UserMenu } from "@/components/auth/UserMenu";
import { CreditDisplay } from "@/components/credits/CreditDisplay";
import { ROUTES } from "@/utils/constants";
import { SignInButton, SignedIn, SignedOut } from "@clerk/clerk-react";

import { Navigation } from "./Navigation";

export const Header: React.FC = () => {
  return (
    <header className="bg-background border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link
              to={ROUTES.HOME}
              className="text-xl font-bold text-foreground bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent"
            >
              Melomelo.AI
            </Link>
          </div>

          {/* Navigation */}
          <Navigation />

          {/* Right side - Credits, Auth */}
          <div className="flex items-center space-x-4">
            <SignedIn>
              <CreditDisplay />
              <UserMenu />
            </SignedIn>

            <SignedOut>
              <SignInButton mode="modal">
                <button className="bg-primary text-primary-foreground px-4 py-2 rounded-md text-sm font-medium hover:bg-primary/90 transition-colors">
                  Sign In
                </button>
              </SignInButton>
            </SignedOut>
          </div>
        </div>
      </div>
    </header>
  );
};
