import React from "react";

import { Textarea } from "@/components/ui/textarea";

interface VideoDescriptionInputProps {
  value: string;
  onChange: (value: string) => void;
  isGenerating?: boolean;
}

export const VideoDescriptionInput: React.FC<VideoDescriptionInputProps> = ({
  value,
  onChange,
  isGenerating = false,
}) => {
  return (
    <div className="bg-muted/10 rounded-xl space-y-4">
      <div>
        <h3 className="font-semibold text-foreground mb-1">
          What's in your video?
        </h3>
      </div>

      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Beach vacation, cooking tutorial, birthday party, family dinner, etc."
        disabled={isGenerating}
        rows={3}
        className="w-full bg-background text-foreground border-2 border-border rounded-xl focus:border-ring hover:border-border/80 transition-all duration-300 resize-none px-4 py-3 focus:ring-2 focus:ring-ring/30 placeholder:text-muted-foreground focus:outline-none"
      />
    </div>
  );
};
