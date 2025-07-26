import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { LANDING_FEATURES, ROUTES } from "@/utils/constants";

interface FeatureCardProps {
  icon: string;
  title: string;
  description: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({
  icon,
  title,
  description,
}) => {
  return (
    <div className="bg-white/[0.05] backdrop-blur-sm rounded-[10px] p-4 md:p-6 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 group min-h-[120px] flex flex-col">
      <div className="text-2xl mb-2 group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-base font-semibold text-foreground mb-1 flex-shrink-0">{title}</h3>
      <p className="text-sm text-muted-foreground leading-relaxed flex-1">
        {description}
      </p>
    </div>
  );
};

export const LandingPage: React.FC = () => {

  return (
    <div className="min-h-[calc(100vh-64px)] flex flex-col justify-center py-12 md:py-24 overflow-x-hidden">
      {/* Hero Section */}
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Main Title */}
          <h1 className="text-4xl md:text-6xl font-bold leading-tight">
            <span className="bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Turn Your Ideas
            </span>
            <br />
            <span className="text-foreground">Into Music</span>
          </h1>

          {/* Subtitle */}
          <p className="text-base md:text-xl text-muted-foreground font-medium">
            AI-powered music generation in seconds
          </p>

          {/* Description */}
          <p className="text-sm md:text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From workout beats to coffee shop vibes, describe your moment and
            we'll create the perfect soundtrack
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
            <Link to={ROUTES.CREATE} className="w-full md:w-auto">
              <Button
                className="w-full md:w-auto px-8 py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-[10px] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 focus:ring-2 focus:ring-blue-400/50 text-white"
              >
                🎵 Start Creating
              </Button>
            </Link>

            <Link to={ROUTES.LIBRARY} className="w-full md:w-auto">
              <Button
                variant="outline"
                className="w-full md:w-auto px-8 py-4 text-base md:text-lg font-semibold bg-white/[0.1] border-white/20 hover:bg-white/[0.15] hover:border-white/30 rounded-[10px] transition-all duration-200 transform hover:scale-105 text-white hover:text-white"
              >
                🎧 Explore Library
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="mt-12 flex-shrink-0">
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {LANDING_FEATURES.map((feature, index) => (
              <FeatureCard
                key={index}
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
