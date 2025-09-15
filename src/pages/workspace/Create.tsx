import { Plus } from "lucide-react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, RedirectToSignIn } from "@clerk/clerk-react";
import { ROUTES } from "@/utils/constants";

import { SampleGallery } from "@/components/landing/SampleGallery";
import { AdvancedModeForm, type MusicGenerationParams } from "@/components/create/AdvancedModeForm";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

export const Create: React.FC = () => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [mode, setMode] = useState<"simple" | "custom" | "edit">("simple");
  const [showSignIn, setShowSignIn] = useState(false);
  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  const handleGenerate = async (params?: MusicGenerationParams) => {
    if (!isSignedIn) {
      setShowSignIn(true);
      return;
    }

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

  const handleEditRemixClick = () => {
    if (!isSignedIn) {
      setShowSignIn(true);
      return;
    }
    navigate(ROUTES.WORKSPACE_EDIT_REMIX);
  };

  return (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="text-center space-y-4 pt-8">
        <h1 className="main-slogan flex flex-wrap items-center justify-center gap-4">
          <span className="function-text">Create and Remix Music with</span>
          <img 
            src="/melofm_logo_cropped.jpg" 
            alt="melofm"
            className="h-10 md:h-12 lg:h-14 object-contain"
          />
        </h1>
      </div>

      {/* Mode Toggle */}
      <div className="max-w-4xl mx-auto mb-4">
        <div className="flex justify-center">
          <div className="inline-flex items-center bg-muted/30 rounded-2xl p-1">
            <button
              onClick={() => setMode("simple")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === "simple"
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Simple
            </button>
            <button
              onClick={() => setMode("custom")}
              className={`px-6 py-2 rounded-xl text-sm font-medium transition-all ${
                mode === "custom"
                  ? "bg-muted text-foreground shadow-sm"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              Custom
            </button>
            <button
              onClick={handleEditRemixClick}
              className="px-6 py-2 rounded-xl text-sm font-medium transition-all text-muted-foreground hover:text-foreground"
            >
              Edit & Remix
            </button>
          </div>
        </div>
      </div>

      {/* Input Section */}
      <div className="max-w-4xl mx-auto">
        {mode === "simple" ? (
          <div className="bg-background rounded-2xl shadow-lg border border-border/60 p-4">
            {/* Main Input */}
            <div className="mb-4">
              <Input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Describe your music, e.g.folk, pop"
                className="w-full h-16 text-base px-4 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 focus:border-0 shadow-none focus-visible:border-0"
                onKeyDown={(e) => {
                  if (e.key === "Enter" && !e.shiftKey) {
                    e.preventDefault();
                    handleGenerate();
                  }
                }}
              />
            </div>

            {/* Bottom Controls */}
            <div className="flex items-center justify-between -mt-1">
              {/* Left Controls */}
              <div className="flex items-center gap-3">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 px-2 rounded-lg hover:bg-muted"
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-auto min-w-0 p-1">
                    <DropdownMenuItem className="flex items-center justify-center cursor-pointer p-2 rounded-md hover:bg-muted/50">
                      <img 
                        src="/upload_audio.png" 
                        alt="Upload Audio" 
                        className="w-6 h-6"
                      />
                    </DropdownMenuItem>
                    <DropdownMenuItem className="flex items-center justify-center cursor-pointer p-2 rounded-md hover:bg-muted/50">
                      <img 
                        src="/upload_video.png" 
                        alt="Upload Video" 
                        className="w-6 h-6"
                      />
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
          <div className="bg-background rounded-2xl shadow-lg border border-border/60 p-6">
            <AdvancedModeForm
              onGenerate={handleGenerate}
              isGenerating={isGenerating}
            />
          </div>
        )}
      </div>

      {/* Sample Gallery */}
      <SampleGallery />

      {/* Sign In Modal */}
      {showSignIn && <RedirectToSignIn />}
    </div>
  );
};