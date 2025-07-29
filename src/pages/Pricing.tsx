import React from "react";

import { PricingTable } from "@/components/pricing/PricingTable";
import { SubscriptionStatus } from "@/components/pricing/SubscriptionStatus";
import { SignedIn, SignedOut } from "@clerk/clerk-react";

export const Pricing: React.FC = () => {
  return (
    <div className="space-y-12">
      {/* Header Section */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">Choose Your Plan</h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Choose the perfect plan for your content creation needs. From individual creators to professional teams, we have solutions for YouTube, TikTok, and Instagram creators.
        </p>
      </div>

      {/* Current Subscription Status (Only for logged in users) */}
      <SignedIn>
        <div className="max-w-2xl mx-auto">
          <h2 className="text-xl md:text-2xl font-semibold mb-6 text-center">
            Your Subscription
          </h2>
          <SubscriptionStatus />
        </div>
      </SignedIn>

      {/* Pricing Table */}
      <div>
        <SignedOut>
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Get Started Today</h2>
            <p className="text-base text-muted-foreground">
              Sign in to subscribe and start creating professional soundtracks for your videos
            </p>
          </div>
        </SignedOut>

        <SignedIn>
          <div className="text-center mb-8">
            <h2 className="text-xl md:text-2xl font-semibold mb-4">Available Plans</h2>
            <p className="text-base text-muted-foreground">
              Upgrade, downgrade, or modify your plan anytime
            </p>
          </div>
        </SignedIn>

        <PricingTable />
      </div>

      {/* FAQ or Additional Info Section */}
      <div className="bg-card border border-border rounded-lg p-6 max-w-4xl mx-auto">
        <h3 className="text-xl md:text-2xl font-semibold mb-4 text-card-foreground">
          Frequently Asked Questions
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base font-medium mb-2 text-card-foreground">
              What are credits?
            </h4>
            <p className="text-base text-muted-foreground leading-relaxed">
              Credits are used for AI music generation and video soundtrack creation. Different generation tasks may consume different amounts of credits.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium mb-2 text-card-foreground">
              Can I change my plan anytime?
            </h4>
            <p className="text-base text-muted-foreground leading-relaxed">
              Yes! You can upgrade, downgrade, or cancel your subscription at
              any time. Changes are prorated automatically.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium mb-2 text-card-foreground">
              What happens to unused credits?
            </h4>
            <p className="text-base text-muted-foreground leading-relaxed">
              Renewable credits reset at the start of each billing period.
              Permanent credits never expire.
            </p>
          </div>
          <div>
            <h4 className="text-base font-medium mb-2 text-card-foreground">
              Can I purchase additional credits?
            </h4>
            <p className="text-base text-muted-foreground leading-relaxed">
              Pro and Premium users can purchase additional permanent credits
              that never expire.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
