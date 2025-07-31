export interface GenerationTask {
  id: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  videoDescription: string;
  videoFileName?: string;
  videoFileSize?: number;
  createdAt: Date;
  updatedAt: Date;
  progress?: number; // 0-100
  duration?: number; // estimated or actual duration in seconds
  resultUrl?: string; // URL to the generated music file
  errorMessage?: string;
}

export interface TaskProgress {
  stage: 'analyzing' | 'generating' | 'finalizing';
  progress: number;
  message: string;
}