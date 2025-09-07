import React, { useState } from "react";
import { ArrowRight } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

interface AdvancedModeFormProps {
  onGenerate: (params: MusicGenerationParams) => void;
  isGenerating?: boolean;
}

export interface MusicGenerationParams {
  prompt: string;
  lyrics?: string;
  duration?: number;
  bpm?: number;
  lyricsEnabled?: boolean;
  durationEnabled?: boolean;
  bpmEnabled?: boolean;
}

export const AdvancedModeForm: React.FC<AdvancedModeFormProps> = ({
  onGenerate,
  isGenerating = false,
}) => {
  const [prompt, setPrompt] = useState("");
  const [lyrics, setLyrics] = useState("");
  const [duration, setDuration] = useState(60);
  const [bpm, setBpm] = useState(120);
  const [lyricsEnabled, setLyricsEnabled] = useState(false);
  const [durationEnabled, setDurationEnabled] = useState(false);
  const [bpmEnabled, setBpmEnabled] = useState(false);

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    const params: MusicGenerationParams = {
      prompt: prompt.trim(),
      lyricsEnabled,
      durationEnabled,
      bpmEnabled,
    };

    if (lyricsEnabled && lyrics.trim()) {
      params.lyrics = lyrics.trim();
    }

    if (durationEnabled) {
      params.duration = duration;
    }

    if (bpmEnabled) {
      params.bpm = bpm;
    }

    onGenerate(params);
  };

  return (
    <div className="space-y-8">
      {/* Lyrics Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="lyrics" className="text-base font-medium">
            Lyrics (optional)
          </Label>
          <Switch
            id="lyrics-toggle"
            checked={lyricsEnabled}
            onCheckedChange={setLyricsEnabled}
          />
        </div>
        <textarea
          id="lyrics"
          value={lyrics}
          onChange={(e) => setLyrics(e.target.value)}
          placeholder="Enter your lyrics here...

Example:
Verse 1:
Walking down the street tonight
Stars are shining oh so bright

Chorus:
Dancing in the moonlight glow
Feel the rhythm, let it flow"
          disabled={!lyricsEnabled}
          className={cn(
            "w-full min-h-[200px] p-4 rounded-xl resize-none",
            "bg-background/50 border border-border/50",
            "placeholder:text-muted-foreground/40",
            "focus:outline-none focus:ring-2 focus:ring-ring",
            "disabled:opacity-50 disabled:cursor-not-allowed",
            "transition-opacity"
          )}
        />
      </div>

      {/* Duration Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="duration" className="text-base font-medium">
            Duration
          </Label>
          <Switch
            id="duration-toggle"
            checked={durationEnabled}
            onCheckedChange={setDurationEnabled}
          />
        </div>
        <div className={cn(
          "space-y-2",
          !durationEnabled && "opacity-50 pointer-events-none"
        )}>
          <Slider
            id="duration"
            value={[duration]}
            onValueChange={([value]) => setDuration(value)}
            min={30}
            max={300}
            step={10}
            disabled={!durationEnabled}
            className="w-full"
          />
          <div className="flex justify-end">
            <span className="text-sm text-muted-foreground">
              {durationEnabled ? `${duration} seconds` : "Default"}
            </span>
          </div>
        </div>
      </div>

      {/* BPM Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="bpm" className="text-base font-medium">
            BPM (Tempo)
          </Label>
          <Switch
            id="bpm-toggle"
            checked={bpmEnabled}
            onCheckedChange={setBpmEnabled}
          />
        </div>
        <div className={cn(
          "space-y-4",
          !bpmEnabled && "opacity-50 pointer-events-none"
        )}>
          {/* Tempo Labels */}
          <div className="flex items-center justify-between px-1">
            <span className={cn(
              "text-sm transition-colors",
              bpmEnabled && bpm < 80 ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              Slow
            </span>
            <span className={cn(
              "px-4 py-1.5 rounded-full text-sm transition-all",
              bpmEnabled && bpm >= 80 && bpm <= 140
                ? "bg-muted text-foreground font-medium"
                : "text-muted-foreground"
            )}>
              Normal
            </span>
            <span className={cn(
              "text-sm transition-colors",
              bpmEnabled && bpm > 140 ? "text-foreground font-medium" : "text-muted-foreground"
            )}>
              Fast
            </span>
          </div>
          <Slider
            id="bpm"
            value={[bpm]}
            onValueChange={([value]) => setBpm(value)}
            min={60}
            max={180}
            step={5}
            disabled={!bpmEnabled}
            className="w-full"
          />
          <div className="flex justify-center">
            <span className="text-sm text-muted-foreground">
              {bpmEnabled ? `${bpm} BPM` : "120 BPM"}
            </span>
          </div>
        </div>
      </div>

      {/* Prompt Section */}
      <div className="space-y-4 pt-4 border-t border-border/50">
        <div className="relative">
          <textarea
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            placeholder="Describe the music you want to create..."
            className={cn(
              "w-full min-h-[120px] p-4 pr-16 rounded-xl resize-none",
              "bg-background/50 border border-border/50",
              "placeholder:text-muted-foreground/60",
              "focus:outline-none focus:ring-2 focus:ring-ring"
            )}
            onKeyDown={(e) => {
              if (e.key === "Enter" && e.metaKey) {
                e.preventDefault();
                handleSubmit();
              }
            }}
          />
          <Button
            onClick={handleSubmit}
            disabled={!prompt.trim() || isGenerating}
            size="icon"
            className="absolute bottom-4 right-4 h-10 w-10 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
            ) : (
              <ArrowRight className="h-4 w-4" />
            )}
          </Button>
        </div>
      </div>
    </div>
  );
};