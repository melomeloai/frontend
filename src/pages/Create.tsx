import { ChevronDown, ChevronUp, Shuffle } from "lucide-react";
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
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
          Create Your Music
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Tell us what you have in mind and we'll compose it for you ✨
        </p>
      </div>

      {/* Main Input Area */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Large Text Input - Primary Focus */}
        <div className="space-y-6">
          <Textarea
            placeholder="Describe your music... e.g., upbeat jazz for coffee shop, peaceful piano for meditation, energetic beats for workout..."
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            disabled={isGenerating}
            rows={6}
            className="w-full bg-background text-foreground border-2 border-border rounded-[20px] focus:border-ring hover:border-border/80 transition-all duration-300 resize-none px-8 py-6 focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground text-xl md:text-2xl focus:outline-none shadow-lg focus:shadow-xl leading-relaxed"
          />

          {/* Generate Button - Prominently Placed */}
          <div className="flex justify-center">
            <Button
              type="submit"
              disabled={!description.trim() || isGenerating}
              className="w-full md:w-auto px-12 py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-[15px] transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Music...</span>
                </div>
              ) : (
                "🎵 Generate Now"
              )}
            </Button>
          </div>
        </div>

        {/* Progressive Disclosure - Combined Templates & Keywords */}
        <div className="border-t border-border/50 pt-6">
          <div className="bg-gradient-to-br from-purple-500/10 to-pink-500/10 border border-purple-500/20 rounded-xl overflow-hidden">
            <Button
              type="button"
              variant="ghost"
              onClick={() => setShowHelpers(!showHelpers)}
              disabled={isGenerating}
              className="w-full flex items-center justify-center gap-3 py-5 text-base font-semibold text-foreground hover:text-foreground transition-all duration-200 hover:bg-white/[0.05] group border-none"
            >
              {showHelpers ? (
                <ChevronUp className="w-5 h-5 group-hover:scale-110 transition-transform" />
              ) : (
                <ChevronDown className="w-5 h-5 group-hover:scale-110 transition-transform" />
              )}
              Need inspiration?
            </Button>

            {showHelpers && (
              <div className="px-6 py-6 bg-white/[0.02] space-y-6 animate-in slide-in-from-top-2 duration-300 border-t border-white/[0.05]">
                {/* Templates Section */}
                <div className="space-y-4">
                  <div className="text-center">
                    <Label className="text-sm font-medium text-foreground/80">
                      🎯 Choose your scenario
                    </Label>
                  </div>
                  <div className="flex flex-wrap justify-center gap-2">
                    {getAllScenarios().map((scenario) => (
                      <Button
                        key={scenario.value}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => selectScenario(scenario.value)}
                        disabled={isGenerating}
                        className={`px-3 py-2 rounded-full border transition-all duration-200 text-xs sm:text-sm flex items-center gap-1 min-h-[36px] flex-shrink-0 ${
                          selectedScenario === scenario.value
                            ? "bg-purple-500/20 border-purple-500/50 text-purple-300"
                            : "bg-white/[0.05] border-border hover:bg-white/[0.1] hover:border-border/80 text-foreground hover:text-foreground"
                        }`}
                      >
                        <span className="text-sm">{scenario.icon}</span>
                        <span>{scenario.label}</span>
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Keywords Section - Only show after scenario selection */}
                {selectedScenario && (
                  <div className="space-y-4 border-t border-border/30 animate-in fade-in-0 slide-in-from-top-2 duration-500">
                    <div className="flex items-center justify-center gap-3">
                      <Label className="text-sm font-medium text-foreground/80">
                        🏷️ Add keywords to refine your style
                      </Label>
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={shuffleTags}
                        disabled={isGenerating}
                        className="text-xs text-muted-foreground hover:text-foreground px-2 py-1 h-auto flex items-center gap-1"
                      >
                        <Shuffle className="w-3 h-3" />
                        Shuffle
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
                          className="px-3 py-1 rounded-full bg-muted/20 border-border/50 hover:bg-muted/40 hover:border-border/70 text-muted-foreground hover:text-foreground transition-all duration-200 text-xs"
                        >
                          {tag}
                        </Button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </form>

      {/* Advanced Features Preview */}
      <AdvancedFeatures />
    </div>
  );
};
