export interface VideoMetadata {
  width: number;
  height: number;
  duration: number;
}

export interface VideoFile {
  file: File;
  url: string;
  metadata?: VideoMetadata;
}

export interface VideoUploadState {
  uploadedVideo: File | null;
  videoUrl: string;
  videoDescription: string;
  videoDuration: number;
  videoMetadata: VideoMetadata | null;
  isGenerating: boolean;
}

export interface VideoUploadActions {
  onVideoUpload: (file: File) => void;
  onVideoDescriptionChange: (description: string) => void;
  onClearVideo: () => void;
  onGenerate: () => void;
}

export interface VideoDisplayProps {
  videoUrl: string;
  isLoading?: boolean;
  onChangeVideo?: () => void;
  showControls?: boolean;
}

export interface VideoUploadZoneProps {
  onVideoUpload: (file: File) => void;
  isDisabled?: boolean;
}