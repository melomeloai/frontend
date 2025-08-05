import { useState, useCallback } from "react";
import { useAuth } from "@clerk/clerk-react";
import { createAuthenticatedAPI } from "@/services/api";
import type { TaskResponse, TaskListResponse, MusicGenerationRequest } from "@/types";

/**
 * Hook for managing task-related API calls
 * Provides methods to submit, retrieve, and manage tasks
 */
export const useTaskAPI = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { getToken } = useAuth();

  const submitTask = useCallback(
    async (request: MusicGenerationRequest): Promise<TaskResponse | null> => {
      setIsLoading(true);
      try {
        const api = createAuthenticatedAPI(getToken);
        const response = await api.taskAPI.submitTask(request);
        
        if (response.requestStatus.error) {
          throw new Error(response.requestStatus.errorMessage || "Task submission failed");
        }
        
        return response;
      } catch (error) {
        console.error("Failed to submit task:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getToken]
  );

  const getTasks = useCallback(
    async (page = 1, pageSize = 10): Promise<TaskListResponse | null> => {
      setIsLoading(true);
      try {
        const api = createAuthenticatedAPI(getToken);
        const response = await api.taskAPI.getTasks(page, pageSize);
        
        if (response.requestStatus.error) {
          throw new Error(response.requestStatus.errorMessage || "Failed to fetch tasks");
        }
        
        return response;
      } catch (error) {
        console.error("Failed to fetch tasks:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getToken]
  );

  const getTask = useCallback(
    async (taskId: string): Promise<TaskResponse | null> => {
      setIsLoading(true);
      try {
        const api = createAuthenticatedAPI(getToken);
        const response = await api.taskAPI.getTask(taskId);
        
        if (response.requestStatus.error) {
          throw new Error(response.requestStatus.errorMessage || "Failed to fetch task");
        }
        
        return response;
      } catch (error) {
        console.error("Failed to fetch task:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getToken]
  );

  const retryTask = useCallback(
    async (taskId: string): Promise<TaskResponse | null> => {
      setIsLoading(true);
      try {
        const api = createAuthenticatedAPI(getToken);
        const response = await api.taskAPI.retryTask(taskId);
        
        if (response.requestStatus.error) {
          throw new Error(response.requestStatus.errorMessage || "Failed to retry task");
        }
        
        return response;
      } catch (error) {
        console.error("Failed to retry task:", error);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    [getToken]
  );

  return {
    submitTask,
    getTasks,
    getTask,
    retryTask,
    isLoading,
  };
};