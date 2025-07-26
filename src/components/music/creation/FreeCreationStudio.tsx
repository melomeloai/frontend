import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useMockMusicGeneration } from "@/hooks/useMockMusicGeneration";
import type { MusicGenerationRequest } from "@/types";

interface FreeCreationStudioProps {
  onBack: () => void;
  onComplete?: (request: MusicGenerationRequest) => void;
}

const EXAMPLE_DESCRIPTIONS = [
  "Upbeat jazz for coffee shop vibes",
  "Ambient sounds for focused studying",
  "Energetic beats for workout sessions",
  "Peaceful piano for meditation",
];

const QUICK_TAGS = [
  { label: "upbeat", emoji: "😌" },
  { label: "energetic", emoji: "⚡" },
  { label: "jazz", emoji: "🎷" },
  { label: "electronic", emoji: "🎛️" },
  { label: "piano", emoji: "🎹" },
  { label: "workout", emoji: "💪" },
  { label: "study", emoji: "📚" },
  { label: "coffee shop", emoji: "☕" },
];

export const FreeCreationStudio: React.FC<FreeCreationStudioProps> = ({
  onBack,
  onComplete,
}) => {
  const [description, setDescription] = useState("");
  const [showHelp, setShowHelp] = useState(false);

  const { isGenerating, generateMusic } = useMockMusicGeneration();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!description.trim()) return;

    try {
      const request: MusicGenerationRequest = {
        description: description.trim(),
      };

      if (onComplete) {
        onComplete(request);
      } else {
        await generateMusic(request);
      }
    } catch (err) {
      console.error("Failed to generate music:", err);
    }
  };

  const insertTag = (text: string) => {
    const textarea = document.querySelector("textarea");
    if (textarea) {
      const start = textarea.selectionStart;
      const end = textarea.selectionEnd;
      const newText =
        description.substring(0, start) + text + description.substring(end);
      setDescription(newText);

      // Restore cursor position
      setTimeout(() => {
        textarea.focus();
        textarea.setSelectionRange(start + text.length, start + text.length);
      }, 0);
    } else {
      setDescription((prev) => prev + (prev ? " " : "") + text);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
          Free Creation Studio
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Describe your perfect music and let AI bring it to life ✨
        </p>
      </div>

      {/* Main Input Section - Prominent */}
      <div className="bg-white/[0.05] backdrop-blur-sm rounded-[20px] p-6 md:p-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Main Description Input - Hero Element */}
          <div className="space-y-4">
            <Label className="text-lg md:text-xl font-semibold text-foreground block text-center">
              What music do you want to create?
            </Label>
            <Textarea
              placeholder="Describe your music..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              disabled={isGenerating}
              rows={4}
              className="w-full bg-background text-foreground border-2 border-border rounded-[15px] focus:border-ring hover:border-border/80 transition-all duration-200 resize-none px-6 py-4 focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground text-lg focus:outline-none shadow-lg focus:shadow-xl"
            />

            {/* Help Section - Collapsible */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => setShowHelp(!showHelp)}
                className="text-sm text-muted-foreground hover:text-foreground transition-colors"
              >
                💡 Need help? {showHelp ? "Hide tips" : "Show tips"}
              </button>
            </div>

            {showHelp && (
              <div className="bg-muted/50 rounded-[12px] p-4 space-y-4 border border-border">
                <p className="text-sm text-muted-foreground">
                  Be specific about mood, style, and purpose. For example:
                  "peaceful piano for meditation" or "upbeat electronic for
                  workouts"
                </p>

                {/* Example Descriptions */}
                <div className="space-y-3">
                  <p className="text-sm font-medium text-foreground">
                    Quick examples:
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {EXAMPLE_DESCRIPTIONS.map((example, index) => (
                      <button
                        key={index}
                        type="button"
                        className="text-left p-3 rounded-[8px] bg-muted/30 hover:bg-muted/50 border border-border hover:border-border/80 transition-all duration-200"
                        onClick={() => {
                          setDescription(example);
                          setShowHelp(false);
                        }}
                      >
                        <p className="text-sm text-muted-foreground">{example}</p>
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Quick Tags - Simplified */}
          <div className="space-y-3">
            <Label className="text-sm font-medium text-foreground/80 block text-center">
              Quick add:
            </Label>
            <div className="flex flex-wrap justify-center gap-2">
              {QUICK_TAGS.map((tag) => (
                <Button
                  key={tag.label}
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => insertTag(tag.label)}
                  disabled={isGenerating}
                  className="px-3 py-1 rounded-full bg-muted/30 border-border hover:bg-muted/50 hover:border-border/80 text-muted-foreground hover:text-foreground transition-all duration-200 text-sm"
                >
                  <span className="mr-1">{tag.emoji}</span>
                  {tag.label}
                </Button>
              ))}
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center pt-4">
            <Button
              type="button"
              variant="ghost"
              onClick={onBack}
              className="text-muted-foreground hover:text-foreground"
            >
              ← Back to Selection
            </Button>

            <Button
              type="submit"
              disabled={!description.trim() || isGenerating}
              className="w-full md:w-auto px-8 py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 rounded-[15px] transition-all duration-200 transform hover:scale-[1.02] disabled:transform-none disabled:hover:scale-100 shadow-lg hover:shadow-xl hover:shadow-purple-500/30 focus:ring-2 focus:ring-purple-400/50 focus:ring-offset-2 focus:ring-offset-transparent disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isGenerating ? (
                <div className="flex items-center gap-3">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  <span>Creating Music...</span>
                </div>
              ) : (
                "🎵 Create My Music"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};
