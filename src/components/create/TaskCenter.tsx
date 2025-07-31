import React from "react";
import { ListTodo, Clock } from "lucide-react";
import type { GenerationTask } from "@/types/task";
import { TaskCard } from "./TaskCard";

interface TaskCenterProps {
  tasks: GenerationTask[];
  onDownload?: (taskId: string) => void;
  onRetry?: (taskId: string) => void;
  onCancel?: (taskId: string) => void;
  highlightedTaskId?: string | null;
}

export const TaskCenter: React.FC<TaskCenterProps> = ({
  tasks,
  onDownload,
  onRetry,
  onCancel,
  highlightedTaskId,
}) => {
  const activeTasks = tasks.filter(task => task.status === 'pending' || task.status === 'processing');
  const completedTasks = tasks.filter(task => task.status === 'completed');
  const failedTasks = tasks.filter(task => task.status === 'failed');

  return (
    <div className="space-y-6" id="task-center">
      {/* Header */}
      <div className="text-center space-y-2">
        <div className="flex items-center justify-center gap-3">
          <ListTodo className="w-6 h-6 text-primary" />
          <h2 className="text-2xl md:text-3xl font-bold text-foreground">
            Task Center
          </h2>
        </div>
        <p className="text-muted-foreground">
          Track your music generation progress and manage your soundtracks
        </p>
      </div>

      {/* Stats */}
      {tasks.length > 0 && (
        <div className="grid grid-cols-3 gap-4 md:gap-6">
          <div className="text-center p-4 bg-blue-500/10 border border-blue-200/20 rounded-xl">
            <div className="text-2xl font-bold text-blue-600">{activeTasks.length}</div>
            <div className="text-sm text-blue-600/80">Active</div>
          </div>
          <div className="text-center p-4 bg-green-500/10 border border-green-200/20 rounded-xl">
            <div className="text-2xl font-bold text-green-600">{completedTasks.length}</div>
            <div className="text-sm text-green-600/80">Completed</div>
          </div>
          <div className="text-center p-4 bg-red-500/10 border border-red-200/20 rounded-xl">
            <div className="text-2xl font-bold text-red-600">{failedTasks.length}</div>
            <div className="text-sm text-red-600/80">Failed</div>
          </div>
        </div>
      )}

      {/* Task List */}
      {tasks.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 bg-muted/20 rounded-full flex items-center justify-center mx-auto mb-4">
            <Clock className="w-8 h-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-2">No tasks yet</h3>
          <p className="text-muted-foreground">
            Upload a video and generate your first soundtrack to see tasks here
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* Active Tasks */}
          {activeTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse" />
                Active Tasks ({activeTasks.length})
              </h3>
              <div className="grid gap-4">
                {activeTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDownload={onDownload}
                    onRetry={onRetry}
                    onCancel={onCancel}
                    isHighlighted={task.id === highlightedTaskId}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Completed Tasks */}
          {completedTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="w-3 h-3 bg-green-500 rounded-full" />
                Completed ({completedTasks.length})
              </h3>
              <div className="grid gap-4">
                {completedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDownload={onDownload}
                    onRetry={onRetry}
                    onCancel={onCancel}
                    isHighlighted={task.id === highlightedTaskId}
                  />
                ))}
              </div>
            </div>
          )}

          {/* Failed Tasks */}
          {failedTasks.length > 0 && (
            <div className="space-y-3">
              <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                <div className="w-3 h-3 bg-red-500 rounded-full" />
                Failed ({failedTasks.length})
              </h3>
              <div className="grid gap-4">
                {failedTasks.map((task) => (
                  <TaskCard
                    key={task.id}
                    task={task}
                    onDownload={onDownload}
                    onRetry={onRetry}
                    onCancel={onCancel}
                    isHighlighted={task.id === highlightedTaskId}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};