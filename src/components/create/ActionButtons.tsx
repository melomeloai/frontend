import React from "react";
import { GenerateButton } from "./GenerateButton";
import { useVideoUpload } from "@/hooks/useVideoUpload";

interface ActionButtonsProps {
  uploadedVideo: File | null;
  videoDescription: string;
  onGenerate: () => void;
  isGenerating: boolean;
  canGenerate: boolean;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  uploadedVideo,
  videoDescription,
  onGenerate,
  isGenerating,
  canGenerate,
}) => {
  const { uploadVideoAndSubmitTask, isUploading } = useVideoUpload();

  const handleGenerate = async () => {
    if (!uploadedVideo || !videoDescription.trim()) {
      return;
    }

    // 调用原有的生成逻辑（触发 loading 状态）
    onGenerate();
    
    // 使用 hook 处理上传和任务提交
    await uploadVideoAndSubmitTask(uploadedVideo, videoDescription);
  };

  return (
    <div className="flex justify-center md:justify-end">
      <GenerateButton
        onGenerate={handleGenerate}
        isGenerating={isGenerating || isUploading}
        disabled={!canGenerate || isUploading}
      />
    </div>
  );
};