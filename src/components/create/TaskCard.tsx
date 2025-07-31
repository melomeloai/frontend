import React from "react";
import { 
  Clock, 
  Download, 
  RefreshCw, 
  X, 
  CheckCircle, 
  AlertCircle, 
  Loader2,
  FileVideo,
  Music
} from "lucide-react";
import type { GenerationTask } from "@/types/task";

interface TaskCardProps {
  task: GenerationTask;
  onDownload?: (taskId: string) => void;
  onRetry?: (taskId: string) => void;
  onCancel?: (taskId: string) => void;
  isHighlighted?: boolean;
}

export const TaskCard: React.FC<TaskCardProps> = ({
  task,
  onDownload,
  onRetry,
  onCancel,
  isHighlighted = false,
}) => {
  const getStatusIcon = () => {
    switch (task.status) {
      case 'pending':
        return <Clock className="w-5 h-5 text-yellow-500" />;
      case 'processing': 
        return <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />;
      case 'completed':
        return <CheckCircle className="w-5 h-5 text-green-500" />;
      case 'failed':
        return <AlertCircle className="w-5 h-5 text-red-500" />;
      default:
        return null;
    }
  };

  const getStatusText = () => {
    switch (task.status) {
      case 'pending':
        return 'Queued';
      case 'processing':
        return 'Generating...';
      case 'completed':
        return 'Completed';
      case 'failed':
        return 'Failed';
      default:
        return '';
    }
  };

  const getStatusColor = () => {
    switch (task.status) {
      case 'pending':
        return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'processing':
        return 'text-blue-600 bg-blue-50 border-blue-200';
      case 'completed':
        return 'text-green-600 bg-green-50 border-green-200';
      case 'failed':
        return 'text-red-600 bg-red-50 border-red-200';
      default:
        return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const formatFileSize = (bytes: number) => {
    return (bytes / (1024 * 1024)).toFixed(1) + ' MB';
  };

  return (
    <div 
      className={`bg-white/[0.05] backdrop-blur-sm rounded-xl border border-border/50 p-4 md:p-6 transition-all duration-300 hover:border-border/80 hover:bg-white/[0.08] ${
        isHighlighted ? 'animate-pulse shadow-lg shadow-primary/20 border-primary/50' : ''
      }`}
    >
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div className="flex items-center gap-3">
          {getStatusIcon()}
          <div>
            <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor()}`}>
              {getStatusText()}
            </div>
            <p className="text-xs text-muted-foreground mt-1">
              Created at {formatTime(task.createdAt)}
            </p>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex items-center gap-2">
          {task.status === 'completed' && task.resultUrl && (
            <button
              onClick={() => onDownload?.(task.id)}
              className="p-2 rounded-lg bg-green-500/10 hover:bg-green-500/20 text-green-600 transition-colors"
              title="Download"
            >
              <Download className="w-4 h-4" />
            </button>
          )}
          
          {task.status === 'failed' && (
            <button
              onClick={() => onRetry?.(task.id)}
              className="p-2 rounded-lg bg-blue-500/10 hover:bg-blue-500/20 text-blue-600 transition-colors"
              title="Retry"
            >
              <RefreshCw className="w-4 h-4" />
            </button>
          )}
          
          {(task.status === 'pending' || task.status === 'processing') && (
            <button
              onClick={() => onCancel?.(task.id)}
              className="p-2 rounded-lg bg-red-500/10 hover:bg-red-500/20 text-red-600 transition-colors"
              title="Cancel"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="space-y-3">
        {/* Video Description */}
        <div>
          <h4 className="font-medium text-foreground mb-1">Description</h4>
          <p className="text-sm text-muted-foreground">{task.videoDescription}</p>
        </div>

        {/* Video File Info */}
        {task.videoFileName && (
          <div className="flex items-center gap-3 p-3 bg-muted/10 rounded-lg">
            <FileVideo className="w-5 h-5 text-muted-foreground" />
            <div className="flex-1">
              <p className="text-sm font-medium text-foreground">{task.videoFileName}</p>
              {task.videoFileSize && (
                <p className="text-xs text-muted-foreground">
                  {formatFileSize(task.videoFileSize)}
                </p>
              )}
            </div>
          </div>
        )}

        {/* Progress Bar */}
        {task.status === 'processing' && task.progress !== undefined && (
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <span className="text-xs text-muted-foreground">Progress</span>
              <span className="text-xs text-muted-foreground">{task.progress}%</span>
            </div>
            <div className="w-full bg-muted/20 rounded-full h-2">
              <div 
                className="bg-gradient-to-r from-blue-400 to-purple-500 h-2 rounded-full transition-all duration-500"
                style={{ width: `${task.progress}%` }}
              />
            </div>
          </div>
        )}

        {/* Result Info */}
        {task.status === 'completed' && task.duration && (
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Music className="w-4 h-4" />
            <span>Generated in {task.duration}s</span>
          </div>
        )}

        {/* Error Message */}
        {task.status === 'failed' && task.errorMessage && (
          <div className="p-3 bg-red-500/10 border border-red-200/20 rounded-lg">
            <p className="text-sm text-red-600">{task.errorMessage}</p>
          </div>
        )}
      </div>
    </div>
  );
};