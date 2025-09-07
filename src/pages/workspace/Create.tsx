import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import { SampleGallery } from "@/components/landing/SampleGallery";
import { AdvancedModeForm, type MusicGenerationParams } from "@/components/create/AdvancedModeForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAuthenticatedAPI } from "@/services/api";
import { useAuth } from "@clerk/clerk-react";

export const Create: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<"basic" | "advanced">("basic");
  const navigate = useNavigate();
  const { getToken } = useAuth();

  const handleGenerate = async (params?: MusicGenerationParams) => {
    const finalPrompt = params?.prompt || prompt.trim();
    if (!finalPrompt) return;

    setIsGenerating(true);
    try {
      const api = createAuthenticatedAPI(getToken);

      // 1. Create new session
      const sessionResponse = await api.sessionAPI.createSession();

      if (!sessionResponse.sessionId) {
        throw new Error("Failed to create session");
      }

      // 2. Build the message content with advanced params if provided
      let messageContent = finalPrompt;
      if (params) {
        const advancedParams = [];
        if (params.lyricsEnabled && params.lyrics) {
          advancedParams.push(`Lyrics: ${params.lyrics}`);
        }
        if (params.durationEnabled && params.duration) {
          advancedParams.push(`Duration: ${params.duration} seconds`);
        }
        if (params.bpmEnabled && params.bpm) {
          advancedParams.push(`BPM: ${params.bpm}`);
        }
        if (advancedParams.length > 0) {
          messageContent = `${finalPrompt}\n\nAdvanced parameters:\n${advancedParams.join("\n")}`;
        }
      }

      // 3. Send the user message to the session
      await api.sessionAPI.sendMessage(sessionResponse.sessionId, {
        content: messageContent,
      });

      // 4. Navigate to the session chat page
      navigate(`/workspace/sessions/${sessionResponse.sessionId}`);
    } catch (error) {
      console.error("Failed to generate music:", error);
      setIsGenerating(false);
    }
  };

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <div className="text-center space-y-6 pt-8">
        <h1 className="text-4xl md:text-6xl font-bold text-foreground">
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
      <div className="max-w-4xl mx-auto">
        {mode === "basic" ? (
          <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-4">
            {/* Main Input */}
            <div className="mb-4">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your song..."
                className="w-full h-16 text-lg px-6 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60"
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
                  className="h-10 px-3 rounded-xl hover:bg-muted"
                >
                  <Plus className="h-4 w-4" />
                </Button>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => handleGenerate()}
                  disabled={!prompt.trim() || isGenerating}
                  className="h-10 px-6 rounded-xl bg-muted hover:bg-muted/80 text-foreground font-medium transition-colors"
                >
                  {isGenerating ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
                      <span>Generating...</span>
                    </div>
                  ) : (
                    <span>Generate</span>
                  )}
                </Button>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-background/50 backdrop-blur-sm rounded-3xl border border-border/50 p-8">
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