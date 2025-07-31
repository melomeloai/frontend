import React from "react";
import { 
  EditIcon, 
  Music, 
  Lightbulb, 
  Target, 
  Tag, 
  Shuffle,
  Briefcase,
  BookOpen,
  Flower2,
  PartyPopper,
  Dumbbell,
  Car,
  Heart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  getAllScenarios,
  getScenarioDescription,
  type ScenarioValue,
} from "@/utils/musicCreation";

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

interface ManualModeProps {
  description: string;
  onDescriptionChange: (description: string) => void;
  onSubmit: (e: React.FormEvent) => void;
  onSwitchToVideo: () => void;
  selectedScenario: ScenarioValue | null;
  onSelectScenario: (scenario: ScenarioValue) => void;
  currentTags: string[];
  onShuffleTags: () => void;
  onAddTag: (tag: string) => void;
  showHelpers: boolean;
  onToggleHelpers: () => void;
  isGenerating: boolean;
}

export const ManualMode: React.FC<ManualModeProps> = ({
  description,
  onDescriptionChange,
  onSubmit,
  onSwitchToVideo,
  selectedScenario,
  onSelectScenario,
  currentTags,
  onShuffleTags,
  onAddTag,
  showHelpers,
  onToggleHelpers,
  isGenerating,
}) => {
  const selectScenario = (scenarioValue: ScenarioValue) => {
    const scenarioText = getScenarioDescription(scenarioValue);
    onDescriptionChange(scenarioText);
    onSelectScenario(scenarioValue);
  };

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="text-center mb-6">
        <div className="inline-flex items-center gap-2 bg-muted/20 rounded-full px-4 py-2">
          <EditIcon className="w-4 h-4" />
          <span className="text-sm font-medium">Manual Mode</span>
          <button
            type="button"
            onClick={onSwitchToVideo}
            className="text-xs text-muted-foreground hover:text-foreground ml-2"
          >
            Switch to Video Mode
          </button>
        </div>
      </div>

      {/* Large Text Input - Primary Focus */}
      <div className="space-y-6">
        <Textarea
          placeholder="Describe your music needs... e.g., energetic electronic music for TikTok short videos, warm jazz for YouTube Vlog, upbeat rhythm for Instagram Reels..."
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
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
              onClick={onToggleHelpers}
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
                      const IconComponent = scenarioIconMap[scenario.iconName];
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
                    onClick={onShuffleTags}
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
                      onClick={() => onAddTag(tag)}
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
  );
};