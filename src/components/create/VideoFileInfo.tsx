import { Clock, File, Monitor } from "lucide-react";
import React from "react";

import { formatFileSize, formatDuration, formatResolution } from "@/utils/videoHelpers";
import { useVideoMetadataContext } from "@/contexts/VideoMetadataContext";

interface VideoFileInfoProps {
  uploadedVideo?: File | null;
}

export const VideoFileInfo: React.FC<VideoFileInfoProps> = ({
  uploadedVideo,
}) => {
  const hasVideo = Boolean(uploadedVideo);
  const textColorClass = hasVideo ? "text-foreground" : "text-muted-foreground";
  const { metadata: videoMetadata } = useVideoMetadataContext();

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
            <p className={`font-medium ${textColorClass} text-sm break-all`}>
              {hasVideo ? uploadedVideo!.name : "No file selected"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider">
              Size
            </p>
            <p className={`font-medium ${textColorClass} text-sm`}>
              {hasVideo ? formatFileSize(uploadedVideo!.size) : "-"}
            </p>
          </div>
        </div>

        {/* Second row: Duration and Resolution */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Clock className="w-3 h-3" />
              Duration
            </p>
            <p className={`font-medium ${textColorClass} text-sm`}>
              {hasVideo && videoMetadata?.duration
                ? formatDuration(videoMetadata.duration)
                : "-"}
            </p>
          </div>
          <div>
            <p className="text-xs text-muted-foreground uppercase tracking-wider flex items-center gap-1">
              <Monitor className="w-3 h-3" />
              Resolution
            </p>
            <p className={`font-medium ${textColorClass} text-sm`}>
              {hasVideo ? formatResolution(videoMetadata ?? null) : "-"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};