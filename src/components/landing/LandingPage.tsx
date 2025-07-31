import React from "react";
import { Link } from "react-router-dom";
import { Music, Headphones, User, Bot, Users, Building2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { LANDING_FEATURES, ROUTES } from "@/utils/constants";

interface FeatureCardProps {
  iconName: string;
  title: string;
  description: string;
}

const iconMap: Record<string, React.ComponentType<{ className?: string; 'aria-label'?: string }>> = {
  User,
  Bot,
  Users,
  Building2,
};

const FeatureCard: React.FC<FeatureCardProps> = ({
  iconName,
  title,
  description,
}) => {
  const IconComponent = iconMap[iconName];
  
  return (
    <div className="bg-white/[0.05] backdrop-blur-sm rounded-[10px] p-4 md:p-6 hover:bg-white/[0.08] hover:-translate-y-1 transition-all duration-300 group min-h-[120px] flex flex-col">
      <div className="mb-2 group-hover:scale-110 transition-transform duration-300">
        {IconComponent && (
          <IconComponent 
            className="w-8 h-8 text-primary" 
            aria-label={`${title} feature icon`}
          />
        )}
      </div>
      <h3 className="text-lg font-semibold text-foreground mb-1 flex-shrink-0">{title}</h3>
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
              AI Video Soundtrack
            </span>
            <br />
            <span className="text-foreground">Solutions</span>
          </h1>

          {/* Subtitle */}
          <p className="text-lg md:text-xl text-muted-foreground font-medium">
            Professional AI-powered soundtracks for video creators and production teams
          </p>

          {/* Description */}
          <p className="text-base text-muted-foreground max-w-4xl mx-auto leading-relaxed">
            From independent creators to enterprise teams, our AI delivers custom soundtracks that perfectly match your video content. Trusted by YouTube creators, AI video directors, and production studios worldwide.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-center items-center pt-4">
            <Link to={ROUTES.CREATE} className="w-full md:w-auto">
              <Button
                className="w-full md:w-auto px-8 py-4 md:py-6 text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 rounded-[10px] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 focus:ring-2 focus:ring-purple-400/50 text-white"
              >
                <div className="flex items-center gap-2">
                  <Music className="w-5 h-5" />
                  <span>Try Free Demo</span>
                </div>
              </Button>
            </Link>

            <Link to={ROUTES.LIBRARY} className="w-full md:w-auto">
              <Button
                variant="outline"
                className="w-full md:w-auto px-8 py-4 md:py-6 text-lg md:text-xl font-semibold bg-background/10 border-border/30 hover:bg-background/20 hover:border-border/50 rounded-[10px] transition-all duration-200 transform hover:scale-105 text-foreground hover:text-foreground"
              >
                <div className="flex items-center gap-2">
                  <Headphones className="w-5 h-5" />
                  <span>Sample Gallery</span>
                </div>
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
                iconName={feature.iconName}
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
