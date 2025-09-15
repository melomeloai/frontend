import React, { useState, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Play,
  Pause,
  Download,
  Share2,
  ThumbsUp,
  ThumbsDown,
  SkipBack,
  SkipForward,
  History
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface ProjectData {
  id: string;
  title: string;
  prompt: string;
  lyrics?: string;
  audioUrl?: string;
  duration?: string;
  createdAt: string;
  status: "generating" | "completed" | "failed";
  styles?: string[];
}

export const Project: React.FC = () => {
  const { projectId } = useParams<{ projectId: string }>();
  const navigate = useNavigate();
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(114); // 1:54 in seconds
  const [audioError, setAudioError] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  // Get project data from sessionStorage or use default
  const getProjectData = (): ProjectData => {
    if (projectId) {
      const stored = sessionStorage.getItem(`project-${projectId}`);
      if (stored) {
        const data = JSON.parse(stored);
        return {
          ...data,
          title: "Wangniu Anthem",
          createdAt: "11 hours ago",
          status: data.status || "generating",
          styles: ["electropop", "modern production", "upbeat", "Chinese traditional instruments", "catchy hooks", "energetic"]
        };
      }
    }

    // Fallback data
    return {
      id: projectId || "1",
      title: "Wangniu Anthem",
      prompt: "Create an energetic anthem celebrating Wangniu with modern production and traditional Chinese instruments",
      lyrics: `Intro
(Welcome to the legend of Wangniu...)

Verse 1
Rising in the dust of dawn, wings across the sky
Wangniu's heartbeat quickens—flames in his eye
Through the storm and thunder, hear the battle cry

Pre-Chorus
Stand tall, stand proud
Break free from the crowd
The legend lives on

Chorus
Wangniu! Wangniu!
Flying high above the clouds so blue
Wangniu! Wangniu!
Ancient power breaking through

Verse 2
Mountains echo stories of the brave and bold
Wangniu's spirit burning, never growing old
Destiny is calling, let the tale unfold

Bridge
From the ashes rising
To the stars ascending
Never compromising
Legend never ending

Final Chorus
Wangniu! Wangniu!
Flying high above the clouds so blue
Wangniu! Wangniu!
Ancient power breaking through
Wangniu! Wangniu!
Forever strong, forever true

Outro
(The legend of Wangniu lives on...)`,
      audioUrl: "/test.mp3",
      duration: "1:54",
      createdAt: "11 hours ago",
      status: "completed"
    };
  };

  const [projectData, setProjectData] = useState<ProjectData>(getProjectData());

  // Simulate music generation completion after 5 seconds
  useEffect(() => {
    if (projectData.status === "generating") {
      const timer = setTimeout(() => {
        const updatedData = { ...projectData, status: "completed" as const };
        setProjectData(updatedData);
        if (projectId) {
          sessionStorage.setItem(`project-${projectId}`, JSON.stringify(updatedData));
        }
      }, 5000);
      
      return () => clearTimeout(timer);
    }
  }, [projectData.status, projectId]);

  const handlePlayPause = () => {
    if (audioError) {
      // Simulate playback when no audio file
      setIsPlaying(!isPlaying);
      if (!isPlaying) {
        const interval = setInterval(() => {
          setCurrentTime(prev => {
            if (prev >= duration) {
              clearInterval(interval);
              setIsPlaying(false);
              return 0;
            }
            return prev + 0.1;
          });
        }, 100);
        (window as any).playbackInterval = interval;
      } else {
        if ((window as any).playbackInterval) {
          clearInterval((window as any).playbackInterval);
        }
      }
    } else if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.log("Audio playback failed:", error);
          setAudioError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleSeek = (event: React.MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const percentage = x / rect.width;
    const newTime = percentage * duration;
    
    if (audioRef.current && !audioError) {
      audioRef.current.currentTime = newTime;
    }
    setCurrentTime(newTime);
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };


  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Header */}
      <div className="border-b border-border bg-background px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleGoBack}
              className="h-8 w-8"
            >
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <h1 className="text-xl font-semibold">{projectData.title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" className="gap-2">
              <History className="h-4 w-4" />
              History
            </Button>
            <div className="text-sm text-muted-foreground">
              {projectData.createdAt}
            </div>
            <div className="text-sm">wangniu</div>
          </div>
        </div>
      </div>

      <div className="flex flex-1 overflow-hidden">
        {/* Center Content */}
        <div className="flex-1 p-6 flex flex-col">
          {/* Music Description */}
          <div className="mb-6">
            <div className="text-sm text-muted-foreground mb-2">
              <span className="font-medium">Music description:</span> {projectData.prompt}
            </div>
          </div>

          {/* Lyrics Section - Scrollable */}
          <div className="space-y-4 overflow-y-auto" style={{maxHeight: 'calc(100vh - 600px)'}}>
            <h3 className="font-medium">Intro</h3>
            <p className="text-sm text-muted-foreground">(Welcome to the legend of Wangniu...)</p>
            
            <h3 className="font-medium">Verse 1</h3>
            <div className="text-sm space-y-1">
              <p>Rising in the dust of dawn, wings across the sky</p>
              <p>Wangniu's heartbeat quickens—flames in his eye</p>
              <p>Through the storm and thunder, hear the battle cry</p>
            </div>

            <h3 className="font-medium">Pre-Chorus</h3>
            <div className="text-sm space-y-1">
              <p>Stand tall, stand proud</p>
              <p>Break free from the crowd</p>
              <p>The legend lives on</p>
            </div>

            <h3 className="font-medium">Chorus</h3>
            <div className="text-sm space-y-1">
              <p>Wangniu! Wangniu!</p>
              <p>Flying high above the clouds so blue</p>
              <p>Wangniu! Wangniu!</p>
              <p>Ancient power breaking through</p>
            </div>

            <h3 className="font-medium">Verse 2</h3>
            <div className="text-sm space-y-1">
              <p>Mountains echo stories of the brave and bold</p>
              <p>Wangniu's spirit burning, never growing old</p>
              <p>Destiny is calling, let the tale unfold</p>
            </div>

            <h3 className="font-medium">Bridge</h3>
            <div className="text-sm space-y-1">
              <p>From the ashes rising</p>
              <p>To the stars ascending</p>
              <p>Never compromising</p>
              <p>Legend never ending</p>
            </div>

            <h3 className="font-medium">Final Chorus</h3>
            <div className="text-sm space-y-1">
              <p>Wangniu! Wangniu!</p>
              <p>Flying high above the clouds so blue</p>
              <p>Wangniu! Wangniu!</p>
              <p>Ancient power breaking through</p>
              <p>Wangniu! Wangniu!</p>
              <p>Forever strong, forever true</p>
            </div>

            <h3 className="font-medium">Outro</h3>
            <p className="text-sm text-muted-foreground">(The legend of Wangniu lives on...)</p>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border bg-background p-4">
          <div className="bg-black text-white rounded-xl p-4 mb-4">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm">Variation 1</span>
              <div className="flex items-center gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                  onClick={handlePlayPause}
                >
                  {isPlaying ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-white hover:bg-white/20"
                >
                  <Download className="h-4 w-4" />
                </Button>
              </div>
            </div>
            
            {/* Mini Waveform */}
            <div className="h-12 flex items-center gap-0.5 mb-3">
              {Array.from({ length: 60 }).map((_, i) => {
                const progress = (currentTime / duration) * 60;
                const isPlayed = i < progress;
                const height = Math.sin(i * 0.5) * 15 + Math.random() * 20 + 5;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 transition-colors rounded-sm",
                      isPlayed ? "bg-white" : "bg-white/30"
                    )}
                    style={{
                      height: `${height}px`,
                      minHeight: '3px',
                      minWidth: '2px',
                    }}
                  />
                );
              })}
            </div>
            
            <div className="text-xs text-white/60">1/2</div>
          </div>
        </div>
      </div>

      {/* Fixed Bottom Controls */}
      <div className="border-t border-border bg-background p-6">
        {/* Custom Backing Track */}
        <div className="bg-background rounded-2xl border-2 border-border shadow-sm p-3 mb-4">
          <textarea
            placeholder="Continue the conversation..."
            className="w-full p-2 bg-transparent border-0 resize-none focus:outline-none text-sm"
            rows={2}
            defaultValue=""
          />
          <div className="flex items-center justify-between mt-3">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-2">
                <span className="text-sm">🎵</span>
                <span className="text-sm font-medium">2</span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">67,280 credits remaining</span>
              <Button className="h-9 px-5 rounded-lg bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors">
                Generate
              </Button>
            </div>
          </div>
        </div>

      </div>

      {/* Bottom Audio Player */}
      <div className="border-t border-border bg-background p-3">
        {/* Player Controls */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="sm" className="text-sm">
              Fit
            </Button>
            <div className="w-4 h-4 border border-muted-foreground"></div>
            <div className="flex items-center gap-2">
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <SkipBack className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="icon"
                className="h-10 w-10 bg-black text-white hover:bg-black/90"
                onClick={handlePlayPause}
              >
                {isPlaying ? (
                  <Pause className="h-5 w-5" />
                ) : (
                  <Play className="h-5 w-5" />
                )}
              </Button>
              <Button variant="ghost" size="icon" className="h-8 w-8">
                <SkipForward className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm font-mono">
            <span>{formatTime(currentTime)}</span>
            <span>/</span>
            <span>{formatTime(duration)}</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsUp className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="icon" className="h-8 w-8">
              <ThumbsDown className="h-4 w-4" />
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
            <Button variant="ghost" size="sm" className="gap-2">
              <Download className="h-4 w-4" />
              Download
            </Button>
          </div>
        </div>

        {/* Waveform */}
        <div className="space-y-1">
          {/* Time markers */}
          <div className="flex justify-between text-xs text-muted-foreground px-2">
            <span>0:08</span>
            <span className="text-center">•</span>
            <span>0:24</span>
            <span className="text-center">•</span>
            <span>0:40</span>
            <span className="text-center">•</span>
            <span>0:56</span>
            <span className="text-center">•</span>
            <span>1:12</span>
            <span className="text-center">•</span>
            <span>1:28</span>
            <span className="text-center">•</span>
            <span>1:44</span>
            <span className="text-center">•</span>
          </div>

          {/* Waveform container */}
          <div 
            className="relative h-10 bg-background cursor-pointer"
            onClick={handleSeek}
          >
            <div className="flex items-center gap-0.5 h-full w-full px-2">
              {Array.from({ length: 400 }).map((_, i) => {
                const progress = (currentTime / duration) * 400;
                const isPlayed = i < progress;
                const height = Math.sin(i * 0.04) * 20 + Math.sin(i * 0.15) * 12 + Math.random() * 10 + 2;
                return (
                  <div
                    key={i}
                    className={cn(
                      "flex-1 transition-colors rounded-sm",
                      isPlayed ? "bg-black" : "bg-muted-foreground/40"
                    )}
                    style={{
                      height: `${height}px`,
                      minHeight: '2px',
                      minWidth: '2px',
                    }}
                  />
                );
              })}
            </div>

            {/* Progress indicator */}
            <div
              className="absolute top-0 bottom-0 w-px bg-black z-10"
              style={{ left: `${(currentTime / duration) * 100}%` }}
            >
              <div className="absolute -top-2 -left-1.5 w-3 h-3 bg-black rounded-full" />
            </div>
          </div>

          {/* Section labels */}
          <div className="bg-background border border-border rounded">
            <div className="flex text-xs text-muted-foreground">
              <div className="flex-1 px-1 py-1 text-center border-r border-border">Intro</div>
              <div className="flex-1 px-1 py-1 text-center border-r border-border">Verse 1</div>
              <div className="flex-1 px-1 py-1 text-center border-r border-border">Pre-Chorus</div>
              <div className="flex-1 px-1 py-1 text-center border-r border-border">Chorus</div>
              <div className="flex-1 px-1 py-1 text-center border-r border-border">Verse 2</div>
              <div className="flex-1 px-1 py-1 text-center border-r border-border">Bridge</div>
              <div className="flex-1 px-1 py-1 text-center border-r border-border">Final Chorus</div>
              <div className="flex-1 px-1 py-1 text-center">Outro</div>
            </div>
          </div>
        </div>
      </div>

      {/* Hidden Audio Element */}
      <audio
        ref={audioRef}
        src={projectData.audioUrl}
        preload="metadata"
        onTimeUpdate={() => {
          if (audioRef.current) {
            setCurrentTime(audioRef.current.currentTime);
          }
        }}
        onLoadedMetadata={() => {
          if (audioRef.current) {
            console.log("Audio loaded successfully, duration:", audioRef.current.duration);
            setDuration(audioRef.current.duration);
            setAudioError(false);
          }
        }}
        onError={(e) => {
          console.error("Audio failed to load:", e);
          console.error("Audio src:", projectData.audioUrl);
          setAudioError(true);
          setDuration(114);
        }}
        onCanPlay={() => {
          console.log("Audio can play");
        }}
        onLoadStart={() => {
          console.log("Audio load started for:", projectData.audioUrl);
        }}
        onEnded={() => {
          setIsPlaying(false);
          setCurrentTime(0);
          if (audioRef.current) {
            audioRef.current.currentTime = 0;
          }
        }}
      />
    </div>
  );
};