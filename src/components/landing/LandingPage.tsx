import { CreditCard, Music } from "lucide-react";
import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/utils/constants";

import { SampleGallery } from "./SampleGallery";
import { ScrollIndicator } from "./ScrollIndicator";

export const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen overflow-x-hidden">
      {/* Hero Section */}
      <div className="min-h-[75vh] flex items-center py-12">
        <div className="max-w-4xl space-y-8">
            {/* Main Title */}
            <h1 className="text-4xl md:text-6xl font-bold leading-tight text-left">
              <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
                AI Video Soundtrack
              </span>
              <br />
              <span className="text-foreground">Solutions</span>
            </h1>

            {/* Description */}
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl leading-relaxed text-left">
              Generate custom, copyright-free soundtracks for any video project - from content creators to production studios
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col md:flex-row gap-4 pt-4">
              <Link to={ROUTES.CREATE}>
                <Button className="w-full md:w-auto px-8 py-4 md:py-6 text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 rounded-[10px] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 focus:ring-2 focus:ring-purple-400/50 text-white">
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    <span>Try Free Demo</span>
                  </div>
                </Button>
              </Link>

              <Link to={ROUTES.PRICING}>
                <Button
                  variant="outline"
                  className="w-full md:w-auto px-8 py-4 md:py-6 text-lg md:text-xl font-semibold bg-background/10 border-border/30 hover:bg-background/20 hover:border-border/50 rounded-[10px] transition-all duration-200 transform hover:scale-105 text-foreground hover:text-foreground"
                >
                  <div className="flex items-center gap-2">
                    <CreditCard className="w-5 h-5" />
                    <span>View Pricing</span>
                  </div>
                </Button>
              </Link>
            </div>
          </div>
        </div>

      {/* Scroll Indicator */}
      <div className="pb-8">
        <ScrollIndicator />
      </div>

      {/* Sample Gallery Section */}
      <div id="sample-gallery">
        <SampleGallery />
      </div>
    </div>
  );
};
