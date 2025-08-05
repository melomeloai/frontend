import React from "react";
import { VideoUploadContainer } from "./VideoUploadContainer";

interface VideoUploadProps {
  onVideoUpload: (file: File) => void;
  uploadedVideo: File | null;
  videoUrl: string;
  videoDescription: string;
  onVideoDescriptionChange: (description: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onClearVideo: () => void;
}

export const VideoUpload: React.FC<VideoUploadProps> = (props) => {
  return <VideoUploadContainer {...props} />;
};
