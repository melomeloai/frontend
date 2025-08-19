import { useCallback, useState } from "react";
import { toast } from "sonner";

import { createAuthenticatedAPI } from "@/services/api";
import type { FileUploadRequest } from "@/types";
import { useAuth } from "@clerk/clerk-react";

export const useVideoUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const { getToken } = useAuth();

  const uploadVideoAndSubmitTask = useCallback(
    async (file: File, description: string): Promise<void> => {
      if (!file || !description.trim()) {
        toast.error("Please provide both video file and description");
        return;
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
            uploadResponse.requestStatus.errorMessage ||
              "Failed to get upload URL"
          );
        }

        if (!uploadResponse.uploadUrl || !uploadResponse.fileKey) {
          throw new Error("Upload URL or file key not provided");
        }

        // 2. 上传文件到 S3
        toast.info("⬆️ Uploading video to cloud...", { duration: 5000 });
        await api.fileAPI.uploadToS3(uploadResponse.uploadUrl, file);

        console.log(
          "🎉 Video uploaded successfully! File key:",
          uploadResponse.fileKey
        );
        toast.success(
          `✅ Video uploaded! File key: ${uploadResponse.fileKey}`,
          {
            duration: 5000,
          }
        );

        // 3. 提交音乐生成任务
        toast.info("🎵 Creating soundtrack generation task...", {
          duration: 3000,
        });
      } catch (error) {
        console.error("❌ Upload/Task submission failed:", error);
        const errorMessage =
          error instanceof Error ? error.message : "Unknown error occurred";
        toast.error(`💥 Failed to process request: ${errorMessage}`, {
          duration: 6000,
        });
        return;
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
