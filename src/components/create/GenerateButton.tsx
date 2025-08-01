import { Music } from "lucide-react";
import React from "react";

interface GenerateButtonProps {
  onGenerate: () => void;
  isGenerating: boolean;
  disabled?: boolean;
}

export const GenerateButton: React.FC<GenerateButtonProps> = ({
  onGenerate,
  isGenerating,
  disabled = false,
}) => {
  return (
    <button
      onClick={onGenerate}
      disabled={disabled || isGenerating}
      className="px-8 py-4 text-lg md:text-xl font-semibold bg-primary hover:bg-primary/90 rounded-[10px] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl focus:ring-2 focus:ring-primary/50 text-primary-foreground disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex items-center justify-center gap-2"
    >
      {isGenerating ? (
        <>
          <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
          <span>Generating Soundtrack...</span>
        </>
      ) : (
        <>
          <Music className="w-5 h-5" />
          <span>Generate Soundtrack</span>
        </>
      )}
    </button>
  );
};
