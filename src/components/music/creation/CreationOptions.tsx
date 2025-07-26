import React from "react";
import { CreationCard } from "./CreationCard";

interface CreationOption {
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

interface CreationOptionsProps {
  onOptionSelect: (optionId: string) => void;
  className?: string;
}

const creationOptions: CreationOption[] = [
  {
    id: "guided",
    title: "Quick Start",
    description: "Answer a few simple questions and we'll create the perfect music for you. The fastest way to get started with AI music generation.",
    icon: "🎯",
    badge: { text: "Recommended", variant: "recommended" },
    isEnabled: true,
  },
  {
    id: "free",
    title: "Free Description Creation",
    description: "Directly describe the music style, mood, and scene you want. Perfect for creators with clear ideas.",
    icon: "✨",
    badge: { text: "Free Creation", variant: "free" },
    isEnabled: true,
  },
  {
    id: "editor",
    title: "Music Editor",
    description: "Advanced editing tools to fine-tune your music. Adjust tempo, add effects, and create professional arrangements.",
    icon: "🎼",
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

export const CreationOptions: React.FC<CreationOptionsProps> = ({
  onOptionSelect,
  className = "",
}) => {
  return (
    <div className={`grid grid-cols-1 md:grid-cols-2 gap-6 mx-auto ${className}`}>
      {creationOptions.map((option) => (
        <CreationCard
          key={option.id}
          title={option.title}
          description={option.description}
          icon={option.icon}
          badge={option.badge}
          isEnabled={option.isEnabled}
          showComingSoon={option.showComingSoon}
          onClick={() => option.isEnabled && onOptionSelect(option.id)}
        />
      ))}
    </div>
  );
};