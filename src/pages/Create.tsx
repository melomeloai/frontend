import React from "react";

// import { MusicGenerator } from "@/components/music/MusicGenerator";

export const Create: React.FC = () => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          Make Your Music Dreams Come True
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Describe your vibe, we'll create the perfect soundtrack for your
          moment ✨
        </p>
      </div>
      {/* <MusicGenerator /> */}
    </div>
  );
};
