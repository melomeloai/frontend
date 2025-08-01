import { ChevronDown } from "lucide-react";
import React from "react";

export const ScrollIndicator: React.FC = () => {
  const scrollToGallery = () => {
    const gallery = document.getElementById('sample-gallery');
    if (gallery) {
      gallery.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center justify-center py-8 space-y-4">
      <p className="text-muted-foreground text-sm font-medium">
        Explore sample soundtracks below
      </p>
      <button
        onClick={scrollToGallery}
        className="group cursor-pointer focus:outline-none focus:ring-2 focus:ring-primary/50 rounded-full p-2"
        aria-label="Scroll to gallery section"
      >
        <ChevronDown 
          className="w-6 h-6 text-muted-foreground group-hover:text-foreground transition-colors duration-200 animate-bounce" 
        />
      </button>
    </div>
  );
};