import React, { useState, useCallback, useEffect } from "react";

import { VideoUpload, TaskCenter } from "@/components/create";
import { useMockMusicGeneration } from "@/hooks/useMockMusicGeneration";
import { useTaskManager } from "@/hooks/useTaskManager";
import type { MusicGenerationRequest } from "@/types";

export const Create: React.FC = () => {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoUrl, setVideoUrl] = useState<string>("");
  const [videoDescription, setVideoDescription] = useState("");
  const { isGenerating, generateMusic } = useMockMusicGeneration();

  // Task management
  const {
    tasks,
    highlightedTaskId,
    createTask,
    retryTask,
    cancelTask,
    downloadTask,
  } = useTaskManager();

  // Scroll to task center
  const scrollToTaskCenter = useCallback(() => {
    setTimeout(() => {
      const taskCenter = document.getElementById("task-center");
      if (taskCenter) {
        taskCenter.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    }, 300);
  }, []);


  // Clean up video URL on component unmount
  useEffect(() => {
    return () => {
      if (videoUrl) {
        URL.revokeObjectURL(videoUrl);
      }
    };
  }, [videoUrl]);


  // Video upload handler
  const handleVideoUpload = (file: File) => {
    // Clean up previous video URL if exists
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    // Create new video URL for preview
    const url = URL.createObjectURL(file);
    setVideoUrl(url);
    setUploadedVideo(file);

    // Reset description when uploading new video
    setVideoDescription("");
  };

  // Clear video handler
  const handleClearVideo = () => {
    // Clean up video URL
    if (videoUrl) {
      URL.revokeObjectURL(videoUrl);
    }

    // Reset all video-related state
    setVideoUrl("");
    setUploadedVideo(null);
    setVideoDescription("");
  };

  // Direct generation from video + description
  const handleVideoGenerate = async () => {
    if (!uploadedVideo || !videoDescription.trim()) return;

    // Create task in Task Center
    createTask(videoDescription.trim(), uploadedVideo.name, uploadedVideo.size);

    // Scroll to task center
    scrollToTaskCenter();

    try {
      const request: MusicGenerationRequest = {
        taskType: "VIDEO_SOUNDTRACK",
        prompt: `Video soundtrack for: ${videoDescription.trim()}`,
      };
      await generateMusic(request);
    } catch (err) {
      console.error("Failed to generate music:", err);
    }
  };


  return (
    <div className="space-y-8">
      {/* Header - Left aligned */}
      <div>
        <h1 className="text-3xl md:text-4xl font-bold text-foreground text-left">
          Create Your Soundtrack
        </h1>
      </div>

      {/* Main Content Area - Full width minus margins */}
      <VideoUpload
        onVideoUpload={handleVideoUpload}
        uploadedVideo={uploadedVideo}
        videoUrl={videoUrl}
        videoDescription={videoDescription}
        onVideoDescriptionChange={setVideoDescription}
        onGenerate={handleVideoGenerate}
        isGenerating={isGenerating}
        onClearVideo={handleClearVideo}
      />

      {/* Task Center - Full width */}
      <TaskCenter
        tasks={tasks}
        highlightedTaskId={highlightedTaskId}
        onDownload={downloadTask}
        onRetry={retryTask}
        onCancel={cancelTask}
      />
    </div>
  );
};
