import React, { createContext, useContext } from "react";
import { useVideoMetadata } from "@/hooks/useVideoMetadata";
import type { VideoMetadata } from "@/types/video";

interface VideoMetadataContextType {
  metadata: VideoMetadata | null;
  isLoading: boolean;
  handleMetadataLoad: (e: React.SyntheticEvent<HTMLVideoElement>) => void;
  resetMetadata: () => void;
}

const VideoMetadataContext = createContext<VideoMetadataContextType | undefined>(undefined);

export const VideoMetadataProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const videoMetadata = useVideoMetadata();
  
  return (
    <VideoMetadataContext.Provider value={videoMetadata}>
      {children}
    </VideoMetadataContext.Provider>
  );
};

export const useVideoMetadataContext = () => {
  const context = useContext(VideoMetadataContext);
  if (context === undefined) {
    throw new Error('useVideoMetadataContext must be used within a VideoMetadataProvider');
  }
  return context;
};