import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SampleGallery } from "@/components/landing/SampleGallery";
import { AdvancedModeForm, type MusicGenerationParams } from "@/components/create/AdvancedModeForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export const Create: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const navigate = useNavigate();

  const handleGenerate = async (params?: MusicGenerationParams) => {
    const finalPrompt = params?.prompt || prompt.trim();
    if (!finalPrompt) return;

    setIsGenerating(true);
    try {
      // Generate a temporary project ID (in real app, this would come from API)
      const projectId = `project-${Date.now()}`;

      // Store project data temporarily (in real app, this would be API call)
      const projectData = {
        id: projectId,
        prompt: finalPrompt,
        lyrics: params?.lyricsEnabled ? params.lyrics : undefined,
        duration: params?.durationEnabled ? params.duration : undefined,
        bpm: params?.bpmEnabled ? params.bpm : undefined,
        createdAt: new Date().toISOString(),
        status: "generating"
      };

      // Store in sessionStorage temporarily
      sessionStorage.setItem(`project-${projectId}`, JSON.stringify(projectData));

      // Navigate to project page
      navigate(`/workspace/projects/${projectId}`);
    } catch (error) {
      console.error("Failed to generate music:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-16">
        <h1 className="text-4xl md:text-6xl font-semibold text-foreground">
          Begin your musical journey.
        </h1>
      </div>

      {/* Mode Toggle */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-muted/30 rounded-2xl p-1">
            <button
              onClick={() => setMode("basic")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === "basic"
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Basic
            </button>
            <button
              onClick={() => setMode("advanced")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === "advanced"
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Advanced
            </button>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="max-w-3xl mx-auto">
        {mode === "basic" ? (
          <div className="bg-background rounded-2xl shadow-sm p-3">
            {/* Main Input */}
            <div className="mb-3">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Type your idea, click 'Create' to get a video"
                className="w-full h-14 text-base px-4 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 focus:border-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-8 px-2 rounded-lg hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => handleGenerate()}
                  disabled={!prompt.trim() || isGenerating}
                  className="h-9 px-5 rounded-lg bg-foreground hover:bg-foreground/90 text-background font-medium transition-colors"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <span>Generate Music</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-background rounded-2xl shadow-sm p-6">
            <AdvancedModeForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
        )}
      </div>

      {/* Sample Gallery */}
      <SampleGallery />
    </div>
  );
};