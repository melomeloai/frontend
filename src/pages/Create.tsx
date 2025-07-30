import {
  Shuffle,
  Music,
  Lightbulb,
  Target,
  Tag,
  Briefcase,
  BookOpen,
  Flower2,
  PartyPopper,
  Dumbbell,
  Car,
  Heart,
  Sparkles,
} from "lucide-react";
import React, { useState } from "react";

import { AdvancedFeatures } from "@/components/music/creation/AdvancedFeatures";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMockMusicGeneration } from "@/hooks/useMockMusicGeneration";
import type { MusicGenerationRequest } from "@/types";
import {
  getAllScenarios,
  getScenarioDescription,
  getScenarioKeywords,
  type ScenarioValue,
} from "@/utils/musicCreation";

const TAGS_PER_BATCH = 8;

// Icon mapping for scenario icons
const scenarioIconMap: Record<
  string,
  React.ComponentType<{ className?: string; "aria-label"?: string }>
> = {
  Briefcase,
  BookOpen,
  Flower2,
  PartyPopper,
  Dumbbell,
  Car,
  Heart,
};

export const Create: React.FC = () => {
  const [description, setDescription] = useState("");
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioValue | null>(null);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [showHelpers, setShowHelpers] = useState(false);
  const { isGenerating, generateMusic } = useMockMusicGeneration();

  // Initialize with random tags on first load
  React.useEffect(() => {
    shuffleTags();
  }, [selectedScenario]);

  const shuffleTags = () => {
    const keywords = getScenarioKeywords(selectedScenario, TAGS_PER_BATCH);
    setCurrentTags(keywords);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    try {
      const request: MusicGenerationRequest = {
        description: description.trim(),
      };
      await generateMusic(request);
    } catch (err) {
      console.error("Failed to generate music:", err);
    }
  };

  const addTag = (tag: string) => {
    setDescription((prev) => (prev ? `${prev} ${tag}` : tag));
  };

  const selectScenario = (scenarioValue: ScenarioValue) => {
    const scenarioText = getScenarioDescription(scenarioValue);
    setDescription(scenarioText);
    setSelectedScenario(scenarioValue);
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Create Your Music
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Create professional soundtracks for short videos or generate perfect
          music through text descriptions{" "}
          <Sparkles
            className="inline w-5 h-5"
            aria-label="Sparkles decoration"
          />
        </p>
      </div>

      {/* Main Input Area */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Large Text Input - Primary Focus */}
        <div className="space-y-6">
          <Textarea
            placeholder="Describe your music needs... e.g., energetic electronic music for TikTok short videos, warm jazz for YouTube Vlog, upbeat rhythm for Instagram Reels..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isGenerating}
            rows={6}
            className="w-full bg-background text-foreground border-2 border-border rounded-[20px] focus:border-ring hover:border-border/80 transition-all duration-300 resize-none px-6 py-4 md:px-8 md:py-6 focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground text-lg md:text-xl focus:outline-none shadow-lg focus:shadow-xl leading-relaxed"
          />

          {/* Action Bar - Generate and Inspiration Side by Side */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 items-start">
            {/* Generate Button */}
            <div className="flex justify-center lg:justify-end">
              <Button
                type="submit"
                disabled={!description.trim() || isGenerating}
                className="w-full lg:w-auto px-8 py-3 md:px-12 md:py-6 text-lg md:text-xl font-semibold bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 rounded-[15px] transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed text-white"
              >
                {isGenerating ? (
                  <div className="flex items-center gap-3">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>Creating Music...</span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Music className="w-5 h-5" />
                    <span>Generate Now</span>
                  </div>
                )}
              </Button>
            </div>

            {/* Inspiration Toggle */}
            <div className="flex justify-center lg:justify-start">
              <Button
                type="button"
                onClick={() => setShowHelpers(!showHelpers)}
                disabled={isGenerating}
                className="w-full lg:w-auto px-8 py-3 md:px-12 md:py-6 text-lg md:text-xl font-semibold bg-muted/20 hover:bg-muted/30 text-muted-foreground hover:text-foreground border border-border hover:border-border/80 rounded-[15px] transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-ring/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <span className="flex items-center gap-3">
                  <Lightbulb className="w-5 h-5" />
                  <span>Need inspiration?</span>
                </span>
              </Button>
            </div>
          </div>
        </div>

        {/* Expandable Inspiration Content */}
        {showHelpers && (
          <div className="bg-muted/10 border border-border/30 rounded-xl overflow-hidden animate-in slide-in-from-top-2 duration-300">
            <div className="px-6 py-6 space-y-6">
              {/* Templates Section */}
              <div className="space-y-4">
                <div className="flex items-center justify-center gap-3">
                  <Label className="text-base font-medium text-foreground">
                    <div className="flex items-center gap-2">
                      <Target className="w-4 h-4" />
                      <span>Choose your scenario</span>
                    </div>
                  </Label>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  {getAllScenarios().map((scenario) => (
                    <Button
                      key={scenario.value}
                      type="button"
                      variant="outline"
                      size="sm"
                      onClick={() => selectScenario(scenario.value)}
                      disabled={isGenerating}
                      className={`px-4 py-3 rounded-xl border transition-all duration-200 text-sm flex items-center gap-2 min-h-[44px] flex-shrink-0 hover:scale-105 ${
                        selectedScenario === scenario.value
                          ? "bg-muted/30 border-muted-foreground/50 text-foreground shadow-lg"
                          : "bg-white/[0.05] border-border hover:bg-muted/20 hover:border-muted-foreground/30 text-foreground hover:text-foreground hover:shadow-lg"
                      }`}
                    >
                      {(() => {
                        const IconComponent =
                          scenarioIconMap[scenario.iconName];
                        return IconComponent ? (
                          <IconComponent
                            className="w-5 h-5"
                            aria-label={`${scenario.label} scenario icon`}
                          />
                        ) : (
                          <span className="text-base">{scenario.iconName}</span>
                        );
                      })()}
                      <span className="font-medium">{scenario.label}</span>
                    </Button>
                  ))}
                </div>
              </div>

              {/* Keywords Section - Only show after scenario selection */}
              {selectedScenario && (
                <div className="space-y-4 border-t border-border/20 pt-6 animate-in fade-in-0 slide-in-from-top-2 duration-500">
                  <div className="flex items-center justify-center gap-3">
                    <Label className="text-base font-medium text-foreground">
                      <div className="flex items-center gap-2">
                        <Tag className="w-4 h-4" />
                        <span>Add keywords to refine your style</span>
                      </div>
                    </Label>
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={shuffleTags}
                      disabled={isGenerating}
                      className="text-sm text-muted-foreground hover:text-foreground px-3 py-2 h-auto flex items-center gap-2 rounded-lg hover:bg-white/[0.05] transition-all duration-200"
                    >
                      <Shuffle className="w-4 h-4" />
                      <span>Shuffle</span>
                    </Button>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {currentTags.map((tag) => (
                      <Button
                        key={tag}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addTag(tag)}
                        disabled={isGenerating}
                        className="px-3 py-2 rounded-lg bg-muted/20 border-border/50 hover:bg-muted/30 hover:border-muted-foreground/30 text-muted-foreground hover:text-foreground transition-all duration-200 text-sm hover:scale-105"
                      >
                        {tag}
                      </Button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </form>

      {/* Advanced Features Preview */}
      <AdvancedFeatures />
    </div>
  );
};
