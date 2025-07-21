import React from "react";

export const Library: React.FC = () => {
  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-bold text-foreground">Music Library</h1>
        <p className="text-muted-foreground mt-2">
          Discover and explore curated AI-generated music
        </p>
      </div>

      <div className="bg-card border border-border rounded-lg p-8 text-center">
        <h2 className="text-lg font-semibold mb-4">Library Coming Soon</h2>
        <p className="text-muted-foreground">
          We're working on an amazing collection of AI-generated music examples.
          This space will showcase the best creations and inspire your next
          project.
        </p>
      </div>
    </div>
  );
};
