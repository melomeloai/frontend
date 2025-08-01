import React from "react";
import { File, Clock, Monitor } from "lucide-react";

import { formatFileSize } from "@/utils/fileValidation";

interface VideoFileInfoProps {
  uploadedVideo: File;
  videoDuration?: number;
  videoMetadata?: {
    width: number;
    height: number;
  } | null;
}

export const VideoFileInfo: React.FC<VideoFileInfoProps> = ({
  uploadedVideo,
  videoDuration,
  videoMetadata,
}) => {
  const formatDuration = (seconds: number) => {
    if (!seconds || isNaN(seconds)) return "0:00";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, "0")}`;
  };

  const formatResolution = (
    metadata: { width: number; height: number } | null
  ) => {
    if (!metadata) return "Loading...";
    return `${metadata.width}×${metadata.height}`;
  };

  return (
    <div className="bg-muted/10 rounded-xl p-4 space-y-4">
      <div className="flex items-center gap-2">
        <File className="w-4 h-4 text-muted-foreground" />
        <h4 className="font-medium text-foreground">File Information</h4>
      </div>
      
      <div className="space-y-3">
        {/* First row: File Name and Size */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              File Name
            </p>
            <p className="font-medium text-foreground text-sm break-all">
              {uploadedVideo.name}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Size
            </p>
            <p className="font-medium text-foreground text-sm">
              {formatFileSize(uploadedVideo.size)}
            </p>
          </div>
        </div>

        {/* Second row: Duration and Resolution */}
        <div className="grid grid-cols-2 gap-3">
          {videoDuration && videoDuration > 0 && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" />
                Duration
              </p>
              <p className="font-medium text-foreground text-sm">
                {formatDuration(videoDuration)}
              </p>
            </div>
          )}
          {videoMetadata && (
            <div>
              <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
                <Monitor className="w-3 h-3" />
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
  );
};