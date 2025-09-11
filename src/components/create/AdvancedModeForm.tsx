import React, { useState } from "react";

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
  const [durationEnabled, setDurationEnabled] = useState(false);
  const [bpmEnabled, setBpmEnabled] = useState(false);

  const handleSubmit = () => {
    if (!prompt.trim()) return;

    const params: MusicGenerationParams = {
      prompt: prompt.trim(),
      lyricsEnabled: true, // Always enabled now
      durationEnabled,
      bpmEnabled,
    };

    if (lyrics.trim()) {
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
      {/* Prompt Section - Moved to top */}
      <div className="space-y-4">
        <Label htmlFor="prompt" className="text-base font-medium">
          Describe Your Music
        </Label>
        <textarea
          id="prompt"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Describe the music you want to create..."
          className={cn(
            "w-full min-h-[120px] p-4 rounded-xl resize-none",
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
      </div>

      {/* Lyrics Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Label htmlFor="lyrics" className="text-base font-medium">
            Lyrics
          </Label>
        </div>
        <div className="relative">
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
            className={cn(
              "w-full min-h-[200px] p-4 pb-14 rounded-xl resize-none",
              "bg-background/50 border border-border/50",
              "placeholder:text-muted-foreground/40",
              "focus:outline-none focus:ring-2 focus:ring-ring",
              "transition-opacity"
            )}
          />
          <div className="absolute bottom-3 right-3 flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                // Handle Lyrics By Line
                console.log("Lyrics By Line clicked");
              }}
            >
              Lyrics By Line
            </Button>
            <Button
              type="button"
              variant="outline"
              size="sm"
              className="h-8 text-xs"
              onClick={() => {
                // Handle Full Lyrics
                console.log("Full Lyrics clicked");
              }}
            >
              Full Lyrics
            </Button>
          </div>
        </div>
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
        {durationEnabled && (
          <div className="space-y-2">
            <Slider
              id="duration"
              value={[duration]}
              onValueChange={([value]) => setDuration(value)}
              min={30}
              max={300}
              step={10}
              className="w-full"
            />
            <div className="flex justify-end">
              <span className="text-sm text-muted-foreground">
                {duration} seconds
              </span>
            </div>
          </div>
        )}
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
        {bpmEnabled && (
          <div className="space-y-4">
            {/* Tempo Labels */}
            <div className="flex items-center justify-between px-1">
              <span className={cn(
                "text-sm transition-colors",
                bpm < 80 ? "text-foreground font-medium" : "text-muted-foreground"
              )}>
                Slow
              </span>
              <span className={cn(
                "px-4 py-1.5 rounded-full text-sm transition-all",
                bpm >= 80 && bpm <= 140
                  ? "bg-muted text-foreground font-medium"
                  : "text-muted-foreground"
              )}>
                Normal
              </span>
              <span className={cn(
                "text-sm transition-colors",
                bpm > 140 ? "text-foreground font-medium" : "text-muted-foreground"
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
              className="w-full"
            />
            <div className="flex justify-center">
              <span className="text-sm text-muted-foreground">
                {bpm} BPM
              </span>
            </div>
          </div>
        )}
      </div>

      {/* Create Button - Bottom Right */}
      <div className="flex justify-end pt-4">
        <Button
          onClick={handleSubmit}
          disabled={!prompt.trim() || isGenerating}
          className="h-9 px-6 rounded-xl bg-muted hover:bg-muted/80 text-foreground transition-colors"
        >
          {isGenerating ? (
            <div className="flex items-center gap-2">
              <div className="w-4 h-4 border-2 border-foreground border-t-transparent rounded-full animate-spin" />
              <span>Generating...</span>
            </div>
          ) : (
            <span>Create</span>
          )}
        </Button>
      </div>
    </div>
  );
};