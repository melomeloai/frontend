import React from "react";

export const Home: React.FC = () => {
  return (
    <div className="text-center space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold text-foreground">
          AI Music Generation Platform
        </h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Create amazing music using artificial intelligence. Transform your
          ideas into professional-quality tracks.
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 max-w-md mx-auto">
        <h2 className="text-lg font-semibold mb-4">Coming Soon</h2>
        <p className="text-muted-foreground">
          The music generation interface will be available here soon. Stay tuned
          for an amazing creative experience!
        </p>
      </div>
    </div>
  );
};
