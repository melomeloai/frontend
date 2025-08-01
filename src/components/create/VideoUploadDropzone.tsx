import React from "react";
import { Upload, AlertCircle } from "lucide-react";
import { toast } from "sonner";

import { validateVideoFile, getMaxFileSizeText } from "@/utils/fileValidation";

interface VideoUploadDropzoneProps {
  onVideoUpload: (file: File) => void;
}

export const VideoUploadDropzone: React.FC<VideoUploadDropzoneProps> = ({
  onVideoUpload,
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      const validation = validateVideoFile(file);
      
      if (validation.isValid) {
        onVideoUpload(file);
      } else {
        toast.error(validation.error, {
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          style: {
            border: '1px solid #ef4444',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
          },
          duration: 5000,
        });
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const validation = validateVideoFile(file);
      
      if (validation.isValid) {
        onVideoUpload(file);
      } else {
        toast.error(validation.error, {
          icon: <AlertCircle className="w-5 h-5 text-red-500" />,
          style: {
            border: '1px solid #ef4444',
            backgroundColor: '#fef2f2',
            color: '#dc2626',
          },
          duration: 5000,
        });
      }
    }
  };

  return (
    <div className="bg-muted/10 rounded-xl space-y-4">
      <div>
        <h3 className="font-semibold text-foreground mb-1">
          Upload video
        </h3>
      </div>
      
      <div>
        <div
          className="border-2 border-dashed border-border/50 rounded-2xl p-8 md:p-12 text-center bg-background/50 hover:bg-background/80 transition-all duration-300 cursor-pointer group min-h-[280px] md:min-h-[360px] flex items-center justify-center"
          onDrop={handleDrop}
          onDragOver={handleDragOver}
          onClick={() => document.getElementById("video-upload")?.click()}
        >
          <div className="space-y-4">
          <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
            <Upload
              className="w-8 h-8 text-primary"
              aria-label="Upload icon"
            />
          </div>
          <div className="space-y-2">
            <h3 className="text-xl md:text-2xl font-semibold text-foreground">
              Drop your video here or click to upload
            </h3>
            <p className="text-muted-foreground">
              Supports MP4, MOV, AVI, WebM up to {getMaxFileSizeText()}
            </p>
          </div>
          <input
            id="video-upload"
            type="file"
            accept="video/*"
            className="hidden"
            onChange={handleFileSelect}
          />
          </div>
        </div>
      </div>
    </div>
  );
};