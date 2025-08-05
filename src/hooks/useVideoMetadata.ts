import { useState, useCallback } from "react";
import type { VideoMetadata } from "@/types/video";
import { getVideoMetadata } from "@/utils/videoHelpers";

export const useVideoMetadata = () => {
  const [metadata, setMetadata] = useState<VideoMetadata | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleMetadataLoad = useCallback((e: React.SyntheticEvent<HTMLVideoElement>) => {
    setIsLoading(true);
    try {
      const videoElement = e.currentTarget;
      const videoMetadata = getVideoMetadata(videoElement);
      setMetadata(videoMetadata);
    } catch (error) {
      console.error("Failed to load video metadata:", error);
      setMetadata(null);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const resetMetadata = useCallback(() => {
    setMetadata(null);
    setIsLoading(false);
  }, []);

  return {
    metadata,
    isLoading,
    handleMetadataLoad,
    resetMetadata,
  };
};