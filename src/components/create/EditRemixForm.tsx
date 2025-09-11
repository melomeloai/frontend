import React, { useState, useRef } from "react";
import { Upload, Play, Pause, Download, Shuffle, Volume2, RotateCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { cn } from "@/lib/utils";

interface EditRemixFormProps {
  onUpload?: (file: File) => void;
  isProcessing?: boolean;
}

export const EditRemixForm: React.FC<EditRemixFormProps> = ({
  onUpload,
  isProcessing = false,
}) => {
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isRemixPlaying, setIsRemixPlaying] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0) {
      const file = files[0];
      if (file.type.startsWith('audio/')) {
        setUploadedFile(file);
        onUpload?.(file);
      }
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setUploadedFile(file);
      onUpload?.(file);
    }
  };

  const openFileDialog = () => {
    fileInputRef.current?.click();
  };

  // Mock waveform component
  const WaveformDisplay = ({ title, isPlaying, onPlayToggle }: { 
    title: string; 
    isPlaying: boolean; 
    onPlayToggle: () => void;
  }) => (
    <div className="bg-background/50 rounded-xl border border-border/50 p-4 space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-medium text-foreground">{title}</h3>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={onPlayToggle}
            className="w-8 h-8 p-0 rounded-full"
          >
            {isPlaying ? (
              <Pause className="w-4 h-4" />
            ) : (
              <Play className="w-4 h-4" />
            )}
          </Button>
          <Button
            variant="outline"
            size="sm"
            className="w-8 h-8 p-0 rounded-full"
          >
            <Download className="w-4 h-4" />
          </Button>
        </div>
      </div>
      
      {/* Mock waveform visualization */}
      <div className="h-20 bg-muted/30 rounded-lg flex items-center justify-center overflow-hidden">
        <div className="flex items-center gap-1 h-full px-2">
          {Array.from({ length: 80 }).map((_, i) => (
            <div
              key={i}
              className={cn(
                "bg-primary/60 transition-all duration-75",
                "w-1 rounded-full",
                isPlaying && i < 30 ? "bg-primary" : ""
              )}
              style={{
                height: `${Math.random() * 60 + 20}%`,
                animationDelay: `${i * 20}ms`
              }}
            />
          ))}
        </div>
      </div>
      
      {/* Progress bar */}
      <div className="space-y-2">
        <Slider
          value={[isPlaying ? 30 : 0]}
          max={100}
          step={1}
          className="w-full"
        />
        <div className="flex justify-between text-xs text-muted-foreground">
          <span>0:00</span>
          <span>2:34</span>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Upload Section */}
      <div className="space-y-4">
        <h2 className="text-xl font-semibold text-center">Edit & Remix</h2>
        
        {!uploadedFile ? (
          <div
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onClick={openFileDialog}
            className={cn(
              "border-2 border-dashed rounded-2xl p-12 text-center cursor-pointer transition-all",
              isDragging
                ? "border-primary bg-primary/5 scale-105"
                : "border-muted hover:border-primary/50 hover:bg-muted/30"
            )}
          >
            <div className="space-y-4">
              <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto">
                <Upload className="w-8 h-8 text-muted-foreground" />
              </div>
              <div className="space-y-2">
                <p className="text-lg font-medium">
                  Drop your audio file here or click to browse
                </p>
                <p className="text-muted-foreground">
                  Supports MP3, WAV, FLAC, M4A files up to 100MB
                </p>
              </div>
            </div>
          </div>
        ) : (
          <div className="bg-muted/30 rounded-xl p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center">
                <Volume2 className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="font-medium">{uploadedFile.name}</p>
                <p className="text-sm text-muted-foreground">
                  {(uploadedFile.size / 1024 / 1024).toFixed(1)} MB
                </p>
              </div>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={() => {
                setUploadedFile(null);
                if (fileInputRef.current) fileInputRef.current.value = '';
              }}
            >
              <RotateCcw className="w-4 h-4 mr-2" />
              Change
            </Button>
          </div>
        )}

        <input
          ref={fileInputRef}
          type="file"
          accept="audio/*"
          onChange={handleFileSelect}
          className="hidden"
        />
      </div>

      {/* Audio Tracks Section - Only show when file is uploaded */}
      {uploadedFile && (
        <>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Original Track */}
            <WaveformDisplay
              title="Original"
              isPlaying={isPlaying}
              onPlayToggle={() => setIsPlaying(!isPlaying)}
            />
            
            {/* Remixed Track */}
            <WaveformDisplay
              title="Remixed"
              isPlaying={isRemixPlaying}
              onPlayToggle={() => setIsRemixPlaying(!isRemixPlaying)}
            />
          </div>

          {/* Remix Controls */}
          <div className="bg-background/50 rounded-xl border border-border/50 p-6 space-y-6">
            <h3 className="font-semibold">Remix Options</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Shuffle className="w-5 h-5" />
                <span className="text-xs">Change Style</span>
              </Button>
              
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Volume2 className="w-5 h-5" />
                <span className="text-xs">Adjust Tempo</span>
              </Button>
              
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Play className="w-5 h-5" />
                <span className="text-xs">Add Effects</span>
              </Button>
              
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Volume2 className="w-5 h-5" />
                <span className="text-xs">Extract Vocals</span>
              </Button>
              
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Shuffle className="w-5 h-5" />
                <span className="text-xs">Create Loop</span>
              </Button>
              
              <Button variant="outline" className="h-12 flex-col space-y-1">
                <Play className="w-5 h-5" />
                <span className="text-xs">Generate Stems</span>
              </Button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-center gap-4 pt-4">
            <Button
              variant="outline"
              className="px-6 h-10"
              disabled={isProcessing}
            >
              Preview Changes
            </Button>
            <Button
              className="px-8 h-10 bg-primary hover:bg-primary/90"
              disabled={isProcessing}
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-primary-foreground border-t-transparent rounded-full animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                <span>Generate Remix</span>
              )}
            </Button>
          </div>
        </>
      )}
    </div>
  );
};