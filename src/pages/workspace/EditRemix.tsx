import React, { useState } from "react";
import { Play, Pause, Download, Upload, Settings, Share, RotateCcw, Volume2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";

export const EditRemix: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [uploadedFile, setUploadedFile] = useState<string | null>("sample_track.mp3");
  const [prompt, setPrompt] = useState("");
  const [isProcessing, setIsProcessing] = useState(false);
  const [settings, setSettings] = useState({
    vocals: true,
    harmony: true,
    bass: true,
    synth: true,
    melody: true
  });

  const handleProcess = async () => {
    if (!prompt.trim()) return;
    
    setIsProcessing(true);
    try {
      // Simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      console.log("Processing:", prompt);
    } catch (error) {
      console.error("Processing failed:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const TrackComponent = ({ 
    name, 
    waveColor = "bg-blue-400",
    isActive = false 
  }: { 
    name: string; 
    waveColor?: string;
    isActive?: boolean;
  }) => (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost" 
            size="sm"
            className="w-6 h-6 p-0 rounded-full"
          >
            {isPlaying && isActive ? (
              <Pause className="w-3 h-3" />
            ) : (
              <Play className="w-3 h-3" />
            )}
          </Button>
          <span className="text-sm font-medium">{name}</span>
        </div>
        <div className="text-xs text-muted-foreground">0:42</div>
      </div>
      
      {/* Waveform visualization */}
      <div className="h-16 bg-muted/20 rounded-lg flex items-center px-2 overflow-hidden">
        <div className="flex items-center gap-0.5 h-full w-full">
          {Array.from({ length: 120 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                waveColor,
                "transition-all duration-75 rounded-full",
                "w-1"
              )}
              style={{
                height: `${Math.random() * 60 + 20}%`,
                opacity: isPlaying && isActive && i < 40 ? 1 : 0.6
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="flex h-screen">
        {/* Main Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Edit & Remix Section */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-lg font-medium">Edit & Remix</h2>
              <div className="flex items-center gap-2">
                <span className="text-sm text-muted-foreground">Save as WAV • Share</span>
              </div>
            </div>

            {/* Track List */}
            <div className="space-y-6">
              <TrackComponent 
                name="🎤 Vocals" 
                waveColor="bg-blue-400"
                isActive={true}
              />
              <TrackComponent 
                name="🎵 Harmony" 
                waveColor="bg-green-400"
              />
              <TrackComponent 
                name="🎸 Bass" 
                waveColor="bg-purple-400"
              />
              <TrackComponent 
                name="🎹 Synth" 
                waveColor="bg-orange-400"
              />
            </div>
          </div>

          {/* Controls */}
          <div className="border-t border-border/50 pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  onClick={() => setIsPlaying(!isPlaying)}
                  className="w-10 h-10 rounded-full bg-primary hover:bg-primary/90"
                >
                  {isPlaying ? (
                    <Pause className="w-5 h-5" />
                  ) : (
                    <Play className="w-5 h-5" />
                  )}
                </Button>
                
                <div className="flex items-center gap-2">
                  <span className="text-sm">0:28</span>
                  <span className="text-sm text-muted-foreground">|</span>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <RotateCcw className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <Play className="w-3 h-3" />
                  </Button>
                  <Button variant="ghost" size="sm" className="w-6 h-6 p-0">
                    <Play className="w-3 h-3 rotate-180" />
                  </Button>
                </div>

                <div className="text-sm text-muted-foreground">
                  Original • Stems • Lyrics • Hypersphere at
                </div>
              </div>

              <div className="flex items-center gap-4">
                <span className="text-sm">140 BPM</span>
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Download
                </Button>
              </div>
            </div>
          </div>

          {/* Command Input Section */}
          <div className="pt-6">
            <div className="bg-background rounded-2xl shadow-lg border border-border/60 p-4">
              {/* Main Input */}
              <div className="mb-4">
                <Input
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Replace guitar with piano version, adjust tempo to 140 BPM, keep vocals..."
                  className="w-full h-16 text-base px-4 border-0 bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0 placeholder:text-muted-foreground/60 focus:border-0 shadow-none focus-visible:border-0"
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      handleProcess();
                    }
                  }}
                />
              </div>

              {/* Bottom Controls */}
              <div className="flex items-center justify-between -mt-1">
                {/* Left Controls */}
                <div className="flex items-center gap-3">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 px-2 rounded-lg hover:bg-muted"
                  >
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>

                {/* Right Controls */}
                <div className="flex items-center gap-4">
                  <Button
                    onClick={handleProcess}
                    disabled={!prompt.trim() || isProcessing}
                    className="h-9 px-5 rounded-lg bg-foreground hover:bg-foreground/90 text-background font-medium transition-colors"
                  >
                    {isProcessing ? (
                      <div className="flex items-center gap-2">
                        <div className="w-4 h-4 border-2 border-background border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </div>
                    ) : (
                      <span>Apply Changes</span>
                    )}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Sidebar */}
        <div className="w-80 border-l border-border/50 p-6 space-y-6">
          <div>
            <h3 className="font-medium mb-4">Command Log</h3>
            <div className="space-y-3 text-sm">
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Replace instrument</div>
                <div className="text-muted-foreground">Guitar → Piano</div>
              </div>
              <div className="p-3 bg-muted/50 rounded-lg">
                <div className="font-medium mb-1">Remix Style:</div>
                <div className="text-muted-foreground">Hypersphere</div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Settings</h3>
            <div className="space-y-4">
              {Object.entries(settings).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between">
                  <Label htmlFor={key} className="text-sm capitalize">
                    {key}
                  </Label>
                  <Switch
                    id={key}
                    checked={value}
                    onCheckedChange={(checked) => 
                      setSettings(prev => ({ ...prev, [key]: checked }))
                    }
                  />
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-4">Properties</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Vocals</span>
                <span>🔽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Harmonics</span>
                <span>🔽</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Melody</span>
                <span>🔽</span>
              </div>
            </div>
          </div>

          <div>
            <div className="text-sm space-y-2">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Key signature:</span>
                <span>Asus</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">BPM:</span>
                <span>140 BPM</span>
              </div>
            </div>
          </div>

          <div>
            <h3 className="font-medium mb-2">Upload Reference</h3>
            <Button variant="outline" className="w-full text-left justify-start">
              <Upload className="w-4 h-4 mr-2" />
              Choose file
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};