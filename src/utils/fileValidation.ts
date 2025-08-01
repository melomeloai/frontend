import { MAX_VIDEO_FILE_SIZE } from "./constants";

export interface FileValidationResult {
  isValid: boolean;
  error?: string;
}

/**
 * Validates video file type and size
 */
export const validateVideoFile = (file: File): FileValidationResult => {
  // Check file type
  if (!file.type.startsWith("video/")) {
    return {
      isValid: false,
      error: "Please select a valid video file (MP4, MOV, AVI, WebM, etc.)",
    };
  }

  // Check file size
  if (file.size > MAX_VIDEO_FILE_SIZE) {
    const maxSizeMB = Math.round(MAX_VIDEO_FILE_SIZE / (1024 * 1024));
    const fileSizeMB = Math.round(file.size / (1024 * 1024));
    return {
      isValid: false,
      error: `File size (${fileSizeMB}MB) exceeds the maximum limit of ${maxSizeMB}MB. Please choose a smaller file.`,
    };
  }

  return { isValid: true };
};

/**
 * Formats file size in human readable format
 */
export const formatFileSize = (bytes: number): string => {
  if (bytes === 0) return "0B";

  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return `${parseFloat((bytes / Math.pow(k, i)).toFixed(1))}${sizes[i]}`;
};

/**
 * Gets the maximum file size limit in human readable format
 */
export const getMaxFileSizeText = (): string => {
  return formatFileSize(MAX_VIDEO_FILE_SIZE);
};
