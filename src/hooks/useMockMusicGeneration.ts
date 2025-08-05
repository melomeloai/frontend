import { useCallback, useState } from "react";
import { toast } from "sonner";
import type { MusicGenerationRequest } from "@/types";

export const useMockMusicGeneration = () => {
  const [isGenerating, setIsGenerating] = useState(false);

  const generateMusic = useCallback(async (request: MusicGenerationRequest) => {
    try {
      setIsGenerating(true);
      
      // Show initial toast
      const generatingToast = toast.loading("🎵 Starting music and soundtrack generation...", {
        description: request.prompt || "Creating your custom music or video soundtrack",
        duration: Infinity,
      });

      // Simulate generation steps with different messages
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.loading("🎼 Composing melody...", {
        id: generatingToast,
        description: "Analyzing your requirements and crafting the perfect sound",
        duration: Infinity,
      });

      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast.loading("🎹 Adding instruments...", {
        id: generatingToast,
        description: "Layering harmonies and selecting instruments",
        duration: Infinity,
      });

      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.loading("✨ Applying final touches...", {
        id: generatingToast,
        description: "Polishing and mastering your track",
        duration: Infinity,
      });

      await new Promise(resolve => setTimeout(resolve, 1000));

      // Show success toast
      toast.success("🎉 Music generated successfully!", {
        id: generatingToast,
        description: "Your custom track is ready! (Backend integration coming soon)",
        duration: 5000,
        action: {
          label: "Great!",
          onClick: () => toast.dismiss(generatingToast),
        },
      });

      // Show additional info about the mock
      setTimeout(() => {
        toast.info("🚧 Demo Mode", {
          description: "This is a preview of the music and soundtrack generation flow. Real audio generation will be available once the backend is ready.",
          duration: 8000,
        });
      }, 1000);

    } catch (err) {
      toast.error("❌ Generation failed", {
        description: "Something went wrong. Please try again.",
        duration: 4000,
      });
      throw err;
    } finally {
      setIsGenerating(false);
    }
  }, []);

  const reset = useCallback(() => {
    setIsGenerating(false);
    toast.dismiss();
  }, []);

  return {
    generateMusic,
    isGenerating,
    reset,
    // These are null/empty since we're mocking
    currentTask: null,
    error: null,
  };
};