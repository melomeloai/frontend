import React from "react";

import { AudioPlayer } from "./AudioPlayer";
import type { MessageDto, SongDto } from "@/types";

interface MessageProps {
  message: MessageDto;
  songs?: SongDto[]; // Songs from the session to find the song by ID
}

export const Message: React.FC<MessageProps> = ({ message, songs = [] }) => {
  // Find the song associated with this message
  const associatedSong = message.songId 
    ? songs.find(song => song.songId === message.songId)
    : null;

  return (
    <div
      className={`flex ${
        message.sender === "USER" ? "justify-end" : "justify-start"
      }`}
    >
      <div
        className={`max-w-[70%] space-y-3 ${
          message.sender === "USER" ? "flex flex-col items-end" : ""
        }`}
      >
        {/* Message Content */}
        <div
          className={`rounded-2xl px-4 py-3 ${
            message.sender === "USER"
              ? "bg-primary text-primary-foreground"
              : "bg-muted"
          }`}
        >
          <p className="text-sm whitespace-pre-wrap">{message.content}</p>
          <p className="text-xs opacity-70 mt-1">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>

        {/* Audio Player - Only show for assistant messages with songs */}
        {message.sender === "ASSISTANT" && associatedSong && (
          <div className="w-full">
            <AudioPlayer song={associatedSong} />
          </div>
        )}
      </div>
    </div>
  );
};