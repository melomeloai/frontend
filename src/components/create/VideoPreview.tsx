import React, { useState } from "react";
import { Upload, Play, Pause, RotateCcw } from "lucide-react";

interface VideoPreviewProps {
  videoUrl: string;
  uploadedVideo: File;
  onChangeVideo: () => void;
}

export const VideoPreview: React.FC<VideoPreviewProps> = ({
  videoUrl,
  uploadedVideo,
  onChangeVideo,
}) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  const [videoMetadata, setVideoMetadata] = useState<{
    width: number;
    height: number;
  } | null>(null);

  const handleVideoMetadata = (e: React.SyntheticEvent<HTMLVideoElement>) => {
    const video = e.currentTarget;
    setVideoDuration(video.duration);
    setVideoMetadata({
      width: video.videoWidth,
      height: video.videoHeight,
    });
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

  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatResolution = (
    metadata: { width: number; height: number } | null
  ) => {
    if (!metadata) return "";
    return `${metadata.width}×${metadata.height}`;
  };

  return (
    <div className="bg-muted/10 rounded-xl space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Video Preview</h3>
        <button
          onClick={onChangeVideo}
          className="text-sm text-muted-foreground hover:text-foreground transition-colors underline flex items-center gap-1"
        >
          <RotateCcw className="w-4 h-4" />
          Change video
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Video Player */}
        <div className="lg:col-span-2">
          <div className="relative bg-black rounded-lg overflow-hidden aspect-video shadow-lg">
            {videoUrl ? (
              <video
                id="video-preview"
                src={videoUrl}
                className="w-full h-full object-contain"
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

        {/* Video Info Panel */}
        <div className="space-y-3">
          <div className="bg-background/50 rounded-lg p-4 space-y-3">
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider">
                File Name
              </p>
              <p className="font-medium text-foreground text-sm break-all">
                {uploadedVideo.name}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Size
                </p>
                <p className="font-medium text-foreground text-sm">
                  {(uploadedVideo.size / (1024 * 1024)).toFixed(1)} MB
                </p>
              </div>

              {videoDuration > 0 && (
                <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wider">
                    Duration
                  </p>
                  <p className="font-medium text-foreground text-sm">
                    {formatDuration(videoDuration)}
                  </p>
                </div>
              )}
            </div>

            {videoMetadata && (
              <div>
                <p className="text-xs text-muted-foreground uppercase tracking-wider">
                  Resolution
                </p>
                <p className="font-medium text-foreground text-sm">
                  {formatResolution(videoMetadata)}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};