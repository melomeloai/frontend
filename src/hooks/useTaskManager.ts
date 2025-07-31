import { useState, useCallback } from "react";
import type { GenerationTask } from "@/types/task";

// Mock initial tasks for demonstration
const createMockTasks = (): GenerationTask[] => [
  {
    id: 'demo-completed-1',
    status: 'completed',
    videoDescription: 'Energetic travel vlog from Hawaii beaches',
    videoFileName: 'hawaii-adventure.mp4',
    videoFileSize: 45 * 1024 * 1024, // 45MB
    createdAt: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 12), // 12 minutes ago
    progress: 100,
    duration: 23,
    resultUrl: '/api/download/hawaii-soundtrack.mp3',
  },
  {
    id: 'demo-processing-1',
    status: 'processing',
    videoDescription: 'Sci-fi movie mashup with epic battle scenes',
    videoFileName: 'scifi-mashup.mov',
    videoFileSize: 72 * 1024 * 1024, // 72MB
    createdAt: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 10), // 10 seconds ago
    progress: 67,
  },
  {
    id: 'demo-failed-1',
    status: 'failed',
    videoDescription: 'AI fairy tale story with magical elements',
    videoFileName: 'fairy-tale.mp4',
    videoFileSize: 28 * 1024 * 1024, // 28MB
    createdAt: new Date(Date.now() - 1000 * 60 * 8), // 8 minutes ago
    updatedAt: new Date(Date.now() - 1000 * 60 * 7), // 7 minutes ago
    errorMessage: 'Audio generation service temporarily unavailable',
  },
];

export const useTaskManager = () => {
  const [tasks, setTasks] = useState<GenerationTask[]>(createMockTasks);
  const [highlightedTaskId, setHighlightedTaskId] = useState<string | null>(null);

  const createTask = useCallback((videoDescription: string, videoFileName?: string, videoFileSize?: number): GenerationTask => {
    const taskId = `task-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    
    const newTask: GenerationTask = {
      id: taskId,
      status: 'pending',
      videoDescription,
      videoFileName,
      videoFileSize,
      createdAt: new Date(),
      updatedAt: new Date(),
      progress: 0,
    };

    setTasks(prev => [newTask, ...prev]);
    setHighlightedTaskId(taskId);

    // Remove highlight after animation
    setTimeout(() => {
      setHighlightedTaskId(null);
    }, 3000);

    // Mock task progression
    simulateTaskProgress(taskId);

    return newTask;
  }, []);

  const simulateTaskProgress = useCallback((taskId: string) => {
    // Start processing after a short delay
    setTimeout(() => {
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'processing', progress: 10, updatedAt: new Date() }
          : task
      ));

      // Progress updates
      const progressSteps = [25, 50, 75, 90];
      progressSteps.forEach((progress, index) => {
        setTimeout(() => {
          setTasks(prev => prev.map(task => 
            task.id === taskId 
              ? { ...task, progress, updatedAt: new Date() }
              : task
          ));
        }, (index + 1) * 1000);
      });

      // Complete or fail randomly
      setTimeout(() => {
        const isSuccess = Math.random() > 0.2; // 80% success rate
        
        if (isSuccess) {
          setTasks(prev => prev.map(task => 
            task.id === taskId 
              ? { 
                  ...task, 
                  status: 'completed', 
                  progress: 100,
                  duration: Math.floor(Math.random() * 30) + 15, // 15-45 seconds
                  resultUrl: `/api/download/music-${taskId}.mp3`,
                  updatedAt: new Date()
                }
              : task
          ));
        } else {
          const errorMessages = [
            "Failed to analyze video content",
            "Audio generation service temporarily unavailable",
            "File format not supported",
            "Processing timeout occurred"
          ];
          
          setTasks(prev => prev.map(task => 
            task.id === taskId 
              ? { 
                  ...task, 
                  status: 'failed',
                  errorMessage: errorMessages[Math.floor(Math.random() * errorMessages.length)],
                  updatedAt: new Date()
                }
              : task
          ));
        }
      }, 6000);
    }, 500);
  }, []);

  const retryTask = useCallback((taskId: string) => {
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'pending', progress: 0, errorMessage: undefined, updatedAt: new Date() }
        : task
    ));
    simulateTaskProgress(taskId);
  }, [simulateTaskProgress]);

  const cancelTask = useCallback((taskId: string) => {
    setTasks(prev => prev.filter(task => task.id !== taskId));
  }, []);

  const downloadTask = useCallback((taskId: string) => {
    const task = tasks.find(t => t.id === taskId);
    if (task?.resultUrl) {
      // Mock download - in real app would trigger actual download
      console.log(`Downloading: ${task.resultUrl}`);
      // You can implement actual download logic here
      const link = document.createElement('a');
      link.href = task.resultUrl;
      link.download = `soundtrack-${task.videoDescription.slice(0, 20)}.mp3`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [tasks]);

  return {
    tasks,
    highlightedTaskId,
    createTask,
    retryTask,
    cancelTask,
    downloadTask,
  };
};