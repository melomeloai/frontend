import React, { useCallback } from "react";

import { VideoMetadataProvider } from "@/contexts/VideoMetadataContext";

import { ActionButtons } from "./ActionButtons";
import { DescriptionInput } from "./DescriptionInput";
import { VideoDisplay } from "./VideoDisplay";
import { VideoFileInfo } from "./VideoFileInfo";
import { VideoUploadZone } from "./VideoUploadZone";

interface VideoUploadContainerProps {
  onVideoUpload: (file: File) => void;
  uploadedVideo: File | null;
  videoUrl: string;
  videoDescription: string;
  onVideoDescriptionChange: (description: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
  onClearVideo: () => void;
}

export const VideoUploadContainer: React.FC<VideoUploadContainerProps> = ({
  onVideoUpload,
  uploadedVideo,
  videoUrl,
  videoDescription,
  onVideoDescriptionChange,
  onGenerate,
  isGenerating,
  onClearVideo,
}) => {
  const handleClearVideo = useCallback(() => {
    onClearVideo();
  }, [onClearVideo]);

  const canGenerate = Boolean(
    uploadedVideo && videoDescription.trim() && !isGenerating
  );

  return (
    <VideoMetadataProvider>
      <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Upload Area */}
        <div className="col-span-1 md:col-span-2">
          {!uploadedVideo ? (
            <VideoUploadZone
              onVideoUpload={onVideoUpload}
              isDisabled={isGenerating}
            />
          ) : (
            <VideoDisplay
              videoUrl={videoUrl}
              onChangeVideo={handleClearVideo}
            />
          )}
        </div>

        {/* Right: Controls */}
        <div className="space-y-4 flex flex-col">
          <DescriptionInput
            value={videoDescription}
            onChange={onVideoDescriptionChange}
            isGenerating={isGenerating}
          />

          <VideoFileInfo
            uploadedVideo={uploadedVideo}
          />

          <div className="flex-1" />

          <ActionButtons
            uploadedVideo={uploadedVideo}
            videoDescription={videoDescription}
            onGenerate={onGenerate}
            isGenerating={isGenerating}
            canGenerate={canGenerate}
          />
        </div>
      </div>
    </div>
    </VideoMetadataProvider>
  );
};
