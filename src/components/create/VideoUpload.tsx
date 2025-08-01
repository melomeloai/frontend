import React, { useState } from "react";

import { GenerateButton } from "./GenerateButton";
import { VideoDescriptionInput } from "./VideoDescriptionInput";
import { VideoFileInfo } from "./VideoFileInfo";
import { VideoPlayer } from "./VideoPlayer";
import { VideoUploadDropzone } from "./VideoUploadDropzone";

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

export const VideoUpload: React.FC<VideoUploadProps> = ({
  onVideoUpload,
  uploadedVideo,
  videoUrl,
  videoDescription,
  onVideoDescriptionChange,
  onGenerate,
  isGenerating,
  onClearVideo,
}) => {
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoMetadata, setVideoMetadata] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleChangeVideo = () => {
    onClearVideo();
    setVideoDuration(0);
    setVideoMetadata(null);
  };

  const handleVideoMetadata = (
    duration: number,
    metadata: { width: number; height: number }
  ) => {
    setVideoDuration(duration);
    setVideoMetadata(metadata);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Left: Upload Area */}
        <div className="col-span-1 md:col-span-2">
          {!uploadedVideo ? (
            <VideoUploadDropzone onVideoUpload={onVideoUpload} />
          ) : (
            <VideoPlayer
              videoUrl={videoUrl}
              onChangeVideo={handleChangeVideo}
              onVideoMetadata={handleVideoMetadata}
            />
          )}
        </div>

        {/* Right: Description Input */}
        <div className="space-y-4 flex flex-col">
          <VideoDescriptionInput
            value={videoDescription}
            onChange={onVideoDescriptionChange}
            isGenerating={isGenerating}
          />
          <VideoFileInfo
            uploadedVideo={uploadedVideo}
            videoDuration={videoDuration}
            videoMetadata={videoMetadata}
          />
          <div className="flex-1" />
          <div className="flex justify-center md:justify-end">
            <GenerateButton
              onGenerate={onGenerate}
              isGenerating={isGenerating}
              disabled={!videoDescription.trim()}
            />
          </div>
        </div>
      </div>
    </div>
  );
};
