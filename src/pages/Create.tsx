import React from "react";

export const Create: React.FC = () => {
  return (
    <div className="max-w-4xl mx-auto text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground leading-tight">
          Make Your Music Dreams Come True
        </h1>
        <p className="text-base md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
          Describe your vibe, we'll create the perfect soundtrack for your
          moment ✨
        </p>
      </div>
      {/* <MusicGenerator /> */}
    </div>
  );
};
