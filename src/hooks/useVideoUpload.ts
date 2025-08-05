import { useState, useCallback } from "react";
import { toast } from "sonner";
import { useAuth } from "@clerk/clerk-react";
import { createAuthenticatedAPI } from "@/services/api";
import type { FileUploadRequest, MusicGenerationRequest, TaskResponse } from "@/types";

export const useVideoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { getToken } = useAuth();

  const uploadVideoAndSubmitTask = useCallback(
    async (file: File, description: string): Promise<TaskResponse | null> => {
      if (!file || !description.trim()) {
        toast.error("Please provide both video file and description");
        return null;
      }

      setIsUploading(true);
      
      try {
        const api = createAuthenticatedAPI(getToken);

        // 1. 获取上传 URL
        toast.info("📤 Getting upload URL...", { duration: 3000 });
        
        const uploadRequest: FileUploadRequest = {
          fileName: file.name,
          contentType: file.type,
          fileSize: file.size,
          fileType: "VIDEO",
        };

        const uploadResponse = await api.fileAPI.getUploadUrl(uploadRequest);

        if (uploadResponse.requestStatus.error) {
          throw new Error(
            uploadResponse.requestStatus.errorMessage || "Failed to get upload URL"
          );
        }

        if (!uploadResponse.uploadUrl || !uploadResponse.fileKey) {
          throw new Error("Upload URL or file key not provided");
        }

        // 2. 上传文件到 S3
        toast.info("⬆️ Uploading video to cloud...", { duration: 5000 });
        await api.fileAPI.uploadToS3(uploadResponse.uploadUrl, file);

        console.log("🎉 Video uploaded successfully! File key:", uploadResponse.fileKey);
        toast.success(`✅ Video uploaded! File key: ${uploadResponse.fileKey}`, { 
          duration: 5000 
        });

        // 3. 提交音乐生成任务
        toast.info("🎵 Creating soundtrack generation task...", { duration: 3000 });
        
        const taskRequest: MusicGenerationRequest = {
          taskType: "VIDEO_SOUNDTRACK",
          prompt: description,
          videoSource: uploadResponse.fileKey,
          videoSourceType: "FILE_KEY",
          duration: 30, // 默认30秒
        };

        const taskResponse = await api.taskAPI.submitTask(taskRequest);

        if (taskResponse.requestStatus.error) {
          throw new Error(
            taskResponse.requestStatus.errorMessage || "Task submission failed"
          );
        }

        console.log("🎵 Task submitted successfully!", {
          taskId: taskResponse.taskId,
          status: taskResponse.status,
          taskType: taskResponse.taskType,
          fileKey: uploadResponse.fileKey,
          response: taskResponse,
        });

        toast.success(
          `🚀 Soundtrack generation started! Task ID: ${taskResponse.taskId}`,
          {
            duration: 8000,
            action: {
              label: "Copy ID",
              onClick: () => navigator.clipboard.writeText(taskResponse.taskId || ""),
            },
          }
        );

        return taskResponse;
      } catch (error) {
        console.error("❌ Upload/Task submission failed:", error);
        const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
        toast.error(`💥 Failed to process request: ${errorMessage}`, { 
          duration: 6000 
        });
        return null;
      } finally {
        setIsUploading(false);
      }
    },
    [getToken]
  );

  return {
    uploadVideoAndSubmitTask,
    isUploading,
  };
};