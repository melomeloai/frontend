import React from "react";
import { FileText, Video } from "lucide-react";

import { FeatureCard } from "./FeatureCard";

interface AdvancedFeature {
  id: string;
  title: string;
  description: string;
  iconName: string;
  badge?: {
    text: string;
    variant: "recommended" | "free" | "advanced";
  };
  isEnabled: boolean;
  showComingSoon?: boolean;
}

// Icon mapping for advanced features
const featureIconMap: Record<string, React.ComponentType<{ className?: string; 'aria-label'?: string }>> = {
  FileText,
  Video,
};

interface AdvancedFeaturesProps {
  className?: string;
}

const advancedFeatures: AdvancedFeature[] = [
  {
    id: "text-to-music",
    title: "Text-to-Music Generation",
    description:
      "Describe your music in words and get instant professional-quality tracks. Perfect for low-cost content creation.",
    iconName: "FileText",
    badge: { text: "Core Feature", variant: "recommended" },
    isEnabled: true,
  },
  {
    id: "video-soundtrack",
    title: "Video AI Soundtrack",
    description:
      "Upload your video and get AI-generated soundtracks tailored for YouTube, TikTok, and Instagram content.",
    iconName: "Video",
    badge: { text: "For Creators", variant: "advanced" },
    isEnabled: false,
    showComingSoon: true,
  },
];

export const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({
  className = "",
}) => {
  return (
    <div className="space-y-4">
      <h2 className="text-xl md:text-2xl font-semibold text-foreground text-center">
        Service Modes & Features
      </h2>
      <p className="text-center text-sm text-muted-foreground mb-4">
        Two powerful modes for all your music creation needs
      </p>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {advancedFeatures.map((feature) => {
          const IconComponent = featureIconMap[feature.iconName];
          return (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={
                IconComponent ? (
                  <IconComponent 
                    className="w-12 h-12 mx-auto" 
                    aria-label={`${feature.title} feature icon`}
                  />
                ) : (
                  <span>{feature.iconName}</span>
                )
              }
              badge={feature.badge}
              isEnabled={feature.isEnabled}
              showComingSoon={feature.showComingSoon}
            />
          );
        })}
      </div>
    </div>
  );
};
