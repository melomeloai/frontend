import { Sparkles } from "lucide-react";
import React, { useState, useCallback, useEffect } from "react";

import { 
  VideoUpload, 
  ManualMode,
  TaskCenter 
} from "@/components/create";
import { useMockMusicGeneration } from "@/hooks/useMockMusicGeneration";
import { useTaskManager } from "@/hooks/useTaskManager";
import type { MusicGenerationRequest } from "@/types";
import {
  getScenarioKeywords,
  type ScenarioValue,
} from "@/utils/musicCreation";

const TAGS_PER_BATCH = 8;

export const Create: React.FC = () => {
  const [uploadedVideo, setUploadedVideo] = useState<File | null>(null);
  const [videoDescription, setVideoDescription] = useState("");
  const [showManualMode, setShowManualMode] = useState(false);

  // Legacy text mode states
  const [description, setDescription] = useState("");
  const [selectedScenario, setSelectedScenario] =
    useState<ScenarioValue | null>(null);
  const [currentTags, setCurrentTags] = useState<string[]>([]);
  const [showHelpers, setShowHelpers] = useState(false);
  const { isGenerating, generateMusic } = useMockMusicGeneration();
  
  // Task management
  const { 
    tasks, 
    highlightedTaskId, 
    createTask, 
    retryTask, 
    cancelTask, 
    downloadTask 
  } = useTaskManager();

  // Scroll to task center
  const scrollToTaskCenter = useCallback(() => {
    setTimeout(() => {
      const taskCenter = document.getElementById('task-center');
      if (taskCenter) {
        taskCenter.scrollIntoView({ 
          behavior: 'smooth', 
          block: 'start' 
        });
      }
    }, 300);
  }, []);

  const shuffleTags = useCallback(() => {
    const keywords = getScenarioKeywords(selectedScenario, TAGS_PER_BATCH);
    setCurrentTags(keywords);
  }, [selectedScenario]);

  // Initialize with random tags on first load
  useEffect(() => {
    shuffleTags();
  }, [selectedScenario, shuffleTags]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;

    // Create task in Task Center
    createTask(description.trim());

    // Scroll to task center
    scrollToTaskCenter();

    try {
      const request: MusicGenerationRequest = {
        description: description.trim(),
      };
      await generateMusic(request);
    } catch (err) {
      console.error("Failed to generate music:", err);
    }
  };

  // Video upload handler
  const handleVideoUpload = (file: File) => {
    setUploadedVideo(file);
    // Reset description when uploading new video
    setVideoDescription("");
  };

  // Direct generation from video + description  
  const handleVideoGenerate = async () => {
    if (!uploadedVideo || !videoDescription.trim()) return;

    // Create task in Task Center
    createTask(
      videoDescription.trim(),
      uploadedVideo.name,
      uploadedVideo.size
    );

    // Scroll to task center
    scrollToTaskCenter();

    try {
      const request: MusicGenerationRequest = {
        description: `Video soundtrack for: ${videoDescription.trim()}`,
      };
      await generateMusic(request);
    } catch (err) {
      console.error("Failed to generate music:", err);
    }
  };


  // Legacy text mode handlers
  const addTag = (tag: string) => {
    setDescription((prev) => (prev ? `${prev} ${tag}` : tag));
  };


  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-3xl md:text-4xl font-bold text-foreground">
          Generate Perfect Soundtracks for Your Videos
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
          Upload your video and let AI create the perfect background music{" "}
          <Sparkles
            className="inline w-5 h-5 text-primary"
            aria-label="Sparkles decoration"
          />
        </p>
      </div>

      {/* Main Content Area */}
      <div className="space-y-8">
        {!showManualMode ? (
          /* Video Upload Section */
          <VideoUpload
            onVideoUpload={handleVideoUpload}
            onSwitchToManual={() => setShowManualMode(true)}
            uploadedVideo={uploadedVideo}
            videoDescription={videoDescription}
            onVideoDescriptionChange={setVideoDescription}
            onGenerate={handleVideoGenerate}
            isGenerating={isGenerating}
          />
        ) : (
          /* Manual/Text Mode (Legacy) */
          <ManualMode
            description={description}
            onDescriptionChange={setDescription}
            onSubmit={handleSubmit}
            onSwitchToVideo={() => setShowManualMode(false)}
            selectedScenario={selectedScenario}
            onSelectScenario={setSelectedScenario}
            currentTags={currentTags}
            onShuffleTags={shuffleTags}
            onAddTag={addTag}
            showHelpers={showHelpers}
            onToggleHelpers={() => setShowHelpers(!showHelpers)}
            isGenerating={isGenerating}
          />
        )}
      </div>
      
      {/* Task Center */}
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
