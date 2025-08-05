import React, { useState } from "react";
import { Play, Pause, RotateCcw, Upload } from "lucide-react";
import type { VideoDisplayProps } from "@/types/video";
import { useVideoMetadataContext } from "@/contexts/VideoMetadataContext";

export const VideoDisplay: React.FC<VideoDisplayProps> = ({
  videoUrl,
  isLoading = false,
  onChangeVideo,
  showControls = true,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const { handleMetadataLoad, resetMetadata } = useVideoMetadataContext();

  const handleClearVideo = () => {
    resetMetadata();
    onChangeVideo?.();
  };

  const togglePlayPause = () => {
    const videoElement = document.getElementById("video-preview") as HTMLVideoElement;
    if (videoElement) {
      if (isPlaying) {
        videoElement.pause();
      } else {
        videoElement.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <div className="bg-muted/10 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground mb-1">Upload video</h3>
        {onChangeVideo && (
          <button
            onClick={handleClearVideo}
            className="text-sm text-muted-foreground hover:text-foreground transition-colors underline flex items-center gap-1"
            disabled={isLoading}
          >
            <RotateCcw className="w-4 h-4" />
            Change video
          </button>
        )}
      </div>

      <div>
        <div className="relative bg-black rounded-lg overflow-hidden shadow-lg min-h-[280px] md:min-h-[360px] flex items-center justify-center">
          {videoUrl && !isLoading ? (
            <video
              id="video-preview"
              src={videoUrl}
              className="w-full h-full object-contain max-h-[280px] md:max-h-[360px]"
              onLoadedMetadata={handleMetadataLoad}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls={showControls}
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/60 text-center space-y-2">
                <Upload className="w-8 h-8 mx-auto" />
                <p className="text-sm">
                  {isLoading ? "Loading video..." : "No video selected"}
                </p>
              </div>
            </div>
          )}

          {!showControls && videoUrl && (
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
              <button
                onClick={togglePlayPause}
                className="pointer-events-auto w-12 h-12 bg-black/50 hover:bg-black/70 rounded-full flex items-center justify-center transition-all duration-200 opacity-0 hover:opacity-100"
              >
                {isPlaying ? (
                  <Pause className="w-6 h-6 text-white" />
                ) : (
                  <Play className="w-6 h-6 text-white ml-1" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};