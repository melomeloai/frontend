import type { VideoMetadata } from "@/types/video";

export const formatDuration = (seconds: number): string => {
  if (!seconds || isNaN(seconds)) return "0:00";
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, "0")}`;
};

export const formatResolution = (metadata: VideoMetadata | null): string => {
  if (!metadata) return "Loading...";
  return `${metadata.width}×${metadata.height}`;
};

export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0 B";
  
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  
  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))} ${sizes[i]}`;
};

export const createVideoObjectURL = (file: File): string => {
  return URL.createObjectURL(file);
};

export const revokeVideoObjectURL = (url: string): void => {
  URL.revokeObjectURL(url);
};

export const getVideoMetadata = (videoElement: HTMLVideoElement): VideoMetadata => {
  return {
    width: videoElement.videoWidth,
    height: videoElement.videoHeight,
    duration: videoElement.duration,
  };
};