import React from "react";
import { Upload, Music } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface VideoUploadProps {
  onVideoUpload: (file: File) => void;
  onSwitchToManual: () => void;
  uploadedVideo: File | null;
  videoDescription: string;
  onVideoDescriptionChange: (description: string) => void;
  onGenerate: () => void;
  isGenerating: boolean;
}

export const VideoUpload: React.FC<VideoUploadProps> = ({
  onVideoUpload,
  onSwitchToManual,
  uploadedVideo,
  videoDescription,
  onVideoDescriptionChange,
  onGenerate,
  isGenerating,
}) => {
  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith("video/")) {
        onVideoUpload(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onVideoUpload(file);
    }
  };

  return (
    <div className="space-y-6">
      {!uploadedVideo ? (
        /* Upload Area - No video uploaded yet */
        <>
          <div
            className="border-2 border-dashed border-border/50 rounded-2xl p-8 md:p-12 text-center bg-muted/10 hover:bg-muted/20 transition-all duration-300 cursor-pointer group"
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onClick={() => document.getElementById("video-upload")?.click()}
          >
            <div className="space-y-4">
              <div className="mx-auto w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                <Upload className="w-8 h-8 text-primary" aria-label="Upload icon" />
              </div>
              <div className="space-y-2">
                <h3 className="text-xl md:text-2xl font-semibold text-foreground">
                  Drop your video here or click to upload
                </h3>
                <p className="text-muted-foreground">
                  Supports MP4, MOV, AVI, WebM up to 100MB
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

          {/* Manual Mode Link */}
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToManual}
              className="text-muted-foreground hover:text-foreground transition-colors underline text-sm"
            >
              Or start with text description
            </button>
          </div>
        </>
      ) : (
        /* Video uploaded - Show description form */
        <div className="space-y-6">
          {/* Video Info */}
          <div className="bg-muted/10 rounded-xl p-4 flex items-center gap-4">
            <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center">
              <Upload className="w-6 h-6 text-primary" />
            </div>
            <div className="flex-1">
              <p className="font-medium text-foreground">{uploadedVideo.name}</p>
              <p className="text-sm text-muted-foreground">
                {(uploadedVideo.size / (1024 * 1024)).toFixed(1)} MB
              </p>
            </div>
            <button
              onClick={() => document.getElementById("video-upload")?.click()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors underline"
            >
              Change video
            </button>
            <input
              id="video-upload"
              type="file"
              accept="video/*"
              className="hidden"
              onChange={handleFileSelect}
            />
          </div>

          {/* Video Description Input */}
          <div className="space-y-3">
            <label className="text-base font-medium text-foreground block">
              Briefly describe your video content <span className="text-red-500">*</span>
            </label>
            <Textarea
              value={videoDescription}
              onChange={(e) => onVideoDescriptionChange(e.target.value)}
              placeholder="My Hawaii travel vlog, Sci-fi movie mashup, AI fairy tale story"
              disabled={isGenerating}
              rows={3}
              className="w-full bg-background text-foreground border-2 border-border rounded-xl focus:border-ring hover:border-border/80 transition-all duration-300 resize-none px-4 py-3 focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {/* Generate Button */}
          <div className="flex justify-center">
            <button
              onClick={onGenerate}
              disabled={!videoDescription.trim() || isGenerating}
              className="px-8 py-4 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 hover:from-blue-500 hover:via-purple-600 hover:to-pink-600 text-white font-semibold rounded-xl transition-all duration-200 transform hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-3 text-lg shadow-lg hover:shadow-xl hover:shadow-purple-500/30"
            >
              {isGenerating ? (
                <>
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Generating Soundtrack...</span>
                </>
              ) : (
                <>
                  <Music className="w-5 h-5" />
                  <span>Generate Soundtrack</span>
                </>
              )}
            </button>
          </div>

          {/* Manual Mode Link - Still available after upload */}
          <div className="text-center">
            <button
              type="button"
              onClick={onSwitchToManual}
              className="text-muted-foreground hover:text-foreground transition-colors underline text-sm"
            >
              Or start with text description
            </button>
          </div>
        </div>
      )}
    </div>
  );
};