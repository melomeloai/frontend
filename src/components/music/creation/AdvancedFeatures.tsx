import React from "react";
import { FeatureCard } from "./FeatureCard";

interface AdvancedFeature {
  id: string;
  title: string;
  description: string;
  icon: string;
  badge?: {
    text: string;
    variant: "recommended" | "free" | "advanced";
  };
  isEnabled: boolean;
  showComingSoon?: boolean;
}

interface AdvancedFeaturesProps {
  className?: string;
}

const advancedFeatures: AdvancedFeature[] = [
  {
    id: "editor",
    title: "Music Editor",
    description: "Advanced editing tools to fine-tune your music. Adjust tempo, add effects, and create professional arrangements.",
    icon: "🎛️",
    badge: { text: "Advanced", variant: "advanced" },
    isEnabled: false,
    showComingSoon: true,
  },
  {
    id: "video",
    title: "Video Soundtrack",
    description: "AI-powered soundtrack generation that perfectly matches your video content and timing for professional results.",
    icon: "🎬",
    badge: { text: "Advanced", variant: "advanced" },
    isEnabled: false,
    showComingSoon: true,
  },
];

export const AdvancedFeatures: React.FC<AdvancedFeaturesProps> = ({
  className = "",
}) => {
  return (
    <div className="space-y-4">
      <h3 className="text-lg md:text-xl font-semibold text-foreground text-center">
        Coming Soon
      </h3>
      <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 ${className}`}>
        {advancedFeatures.map((feature) => (
          <FeatureCard
            key={feature.id}
            title={feature.title}
            description={feature.description}
            icon={feature.icon}
            badge={feature.badge}
            isEnabled={feature.isEnabled}
            showComingSoon={feature.showComingSoon}
          />
        ))}
      </div>
    </div>
  );
};