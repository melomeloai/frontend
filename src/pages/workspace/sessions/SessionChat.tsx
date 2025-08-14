import { Send } from "lucide-react";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { Message } from "@/components/chat/Message";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { createAuthenticatedAPI } from "@/services/api";
import type { MessageDto, SessionResponse, SongDto } from "@/types";
import { useAuth } from "@clerk/clerk-react";

export const SessionChat: React.FC = () => {
  const { sessionId } = useParams<{ sessionId: string }>();
  const { getToken } = useAuth();
  const [session, setSession] = useState<SessionResponse | null>(null);
  const [messages, setMessages] = useState<MessageDto[]>([]);
  const [songs, setSongs] = useState<SongDto[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);

  const api = createAuthenticatedAPI(getToken);

  // Load session data
  useEffect(() => {
    const loadSession = async () => {
      if (!sessionId) return;

      try {
        const response = await api.sessionAPI.getSession(sessionId);
        setSession(response);
        setMessages(response.messages || []);
        setSongs(response.songs || []);
      } catch (error) {
        console.error("Failed to load session:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadSession();
  }, [sessionId]);

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !sessionId || isSending) return;

    setIsSending(true);
    try {
      const response = await api.sessionAPI.sendMessage(sessionId, {
        content: newMessage.trim(),
      });

      // Update messages and songs with the new ones from the response
      setMessages((prev) => [...prev, ...response.messageUpdates]);
      setSongs((prev) => [...prev, ...response.songUpdates]);
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    } finally {
      setIsSending(false);
    }
  };

  if (isLoading) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="w-8 h-8 border-2 border-primary border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!session) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <p className="text-muted-foreground">Session not found</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {/* Chat Header */}
      <div className="border-b border-border p-4">
        <h1 className="text-xl font-semibold">Music Chat Session</h1>
        <p className="text-sm text-muted-foreground">
          Created {new Date(session.createdAt || "").toLocaleDateString()}
        </p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.length === 0 ? (
          <div className="flex items-center justify-center h-full">
            <p className="text-muted-foreground">No messages yet</p>
          </div>
        ) : (
          messages.map((message) => (
            <Message
              key={message.messageId}
              message={message}
              songs={songs}
            />
          ))
        )}
      </div>

      {/* Message Input */}
      <div className="border-t border-border p-4">
        <div className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1"
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSendMessage();
              }
            }}
            disabled={isSending}
          />
          <Button
            onClick={handleSendMessage}
            disabled={!newMessage.trim() || isSending}
            size="icon"
          >
            {isSending ? (
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};