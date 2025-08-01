import { Pause, Play, RotateCcw, Upload } from "lucide-react";
import React, { useState } from "react";

interface VideoPlayerProps {
  videoUrl: string;
  onChangeVideo: () => void;
  onVideoMetadata?: (
    duration: number,
    metadata: { width: number; height: number }
  ) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  videoUrl,
  onChangeVideo,
  onVideoMetadata,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    const duration = video.duration;
    const metadata = {
      width: video.videoWidth,
      height: video.videoHeight,
    };

    if (onVideoMetadata) {
      onVideoMetadata(duration, metadata);
    }
  };

  const togglePlayPause = () => {
    const videoElement = document.getElementById(
      "video-preview"
    ) as HTMLVideoElement;
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
        <button
          onClick={onChangeVideo}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          Change video
        </button>
      </div>

      <div>
        <div className="relative bg-black rounded-lg overflow-hidden shadow-lg min-h-[280px] md:min-h-[360px] flex items-center justify-center">
          {videoUrl ? (
            <video
              id="video-preview"
              src={videoUrl}
              className="w-full h-full object-contain max-h-[280px] md:max-h-[360px]"
              onLoadedMetadata={handleVideoMetadata}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
              controls
              preload="metadata"
            >
              Your browser does not support the video tag.
            </video>
          ) : (
            <div className="w-full h-full flex items-center justify-center">
              <div className="text-white/60 text-center space-y-2">
                <Upload className="w-8 h-8 mx-auto" />
                <p className="text-sm">Loading video...</p>
              </div>
            </div>
          )}

          {/* Custom Play Button Overlay (optional) */}
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
        </div>
      </div>
    </div>
  );
};
