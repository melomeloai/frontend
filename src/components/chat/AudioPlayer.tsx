import { Download, Pause, Play } from "lucide-react";
import React, { useRef, useState } from "react";

import { Button } from "@/components/ui/button";
import type { SongDto } from "@/types";

interface AudioPlayerProps {
  song: SongDto;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({ song }) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);

  const handlePlayPause = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
  };

  const handleTimeUpdate = () => {
    if (!audioRef.current) return;
    setCurrentTime(audioRef.current.currentTime);
  };

  const handleLoadedMetadata = () => {
    if (!audioRef.current) return;
    setDuration(audioRef.current.duration);
  };

  const handleEnded = () => {
    setIsPlaying(false);
    setCurrentTime(0);
  };

  const handleDownload = () => {
    if (song.downloadUrl) {
      const link = document.createElement("a");
      link.href = song.downloadUrl;
      link.download = `${song.title}.mp3`;
      link.click();
    }
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="bg-card rounded-lg border p-4 space-y-3">
      {/* Song Info */}
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-medium text-sm">{song.title}</h4>
          <p className="text-xs text-muted-foreground">
            Status: {song.status.toLowerCase()}
          </p>
        </div>
        {song.downloadUrl && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDownload}
            className="h-8 w-8 p-0"
          >
            <Download className="h-4 w-4" />
          </Button>
        )}
      </div>

      {/* Audio Controls */}
      {song.downloadUrl && song.status === "COMPLETED" && (
        <>
          <audio
            ref={audioRef}
            src={song.downloadUrl}
            onTimeUpdate={handleTimeUpdate}
            onLoadedMetadata={handleLoadedMetadata}
            onEnded={handleEnded}
            preload="metadata"
          />

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="w-full bg-muted rounded-full h-1">
              <div
                className="bg-primary h-1 rounded-full transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>{formatTime(currentTime)}</span>
              <span>{formatTime(duration)}</span>
            </div>
          </div>

          {/* Play Button */}
          <div className="flex items-center justify-center">
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePlayPause}
              className="h-10 w-10 rounded-full"
            >
              {isPlaying ? (
                <Pause className="h-5 w-5" />
              ) : (
                <Play className="h-5 w-5" />
              )}
            </Button>
          </div>
        </>
      )}

      {/* Tags */}
      {song.tags && song.tags.length > 0 && (
        <div className="flex flex-wrap gap-1">
          {song.tags.map((tag, index) => (
            <span
              key={index}
              className="px-2 py-1 bg-muted rounded text-xs text-muted-foreground"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};