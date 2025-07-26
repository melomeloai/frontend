import React, { useState } from "react";

import { CreationOptions, QuickStartWizard, FreeCreationStudio } from "@/components/music/creation";
import { useMockMusicGeneration } from "@/hooks/useMockMusicGeneration";
import type { MusicGenerationRequest } from "@/types";

type CreationMode = "selection" | "guided" | "free";

export const Create: React.FC = () => {
  const [mode, setMode] = useState<CreationMode>("selection");
  const [isTransitioning, setIsTransitioning] = useState(false);
  const { generateMusic } = useMockMusicGeneration();

  const handleGuidedCreationComplete = async (
    request: MusicGenerationRequest
  ) => {
    try {
      // Start generation and immediately return to main page
      generateMusic(request);
      handleModeChange("selection");
    } catch (err) {
      console.error("Failed to generate music:", err);
    }
  };

  const handleModeChange = (newMode: CreationMode) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setMode(newMode);
      setIsTransitioning(false);
    }, 150);
  };

  const handleOptionSelect = (optionId: string) => {
    switch (optionId) {
      case "guided":
        handleModeChange("guided");
        break;
      case "free":
        handleModeChange("free");
        break;
      default:
        // For disabled options, do nothing
        break;
    }
  };

  const renderModeSelection = () => (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      {/* Header */}
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
          Start Creating Your Music
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Choose your creation method and begin your musical journey ✨
        </p>
      </div>

      {/* Creation Options */}
      <CreationOptions onOptionSelect={handleOptionSelect} />
    </div>
  );

  const renderContent = () => {
    switch (mode) {
      case "guided":
        return (
          <QuickStartWizard
            onComplete={handleGuidedCreationComplete}
            onBack={() => handleModeChange("selection")}
          />
        );
      case "free":
        return (
          <FreeCreationStudio
            onBack={() => handleModeChange("selection")}
            onComplete={async (request: MusicGenerationRequest) => {
              generateMusic(request);
              handleModeChange("selection");
            }}
          />
        );
      default:
        return renderModeSelection();
    }
  };

  return (
    <div
      className={`transition-all duration-300 ${
        isTransitioning ? "opacity-0 scale-95" : "opacity-100 scale-100"
      }`}
    >
      {renderContent()}
    </div>
  );
};
