import React from "react";
import { Link } from "react-router-dom";

import { Button } from "@/components/ui/button";
import { ROUTES } from "@/utils/constants";

export const Library: React.FC = () => {
  const dummyTracks = [
    {
      id: 1,
      title: "Sunset Coffee",
      style: "Calm Peaceful",
      duration: "2:34",
      createdAt: "2 hours ago",
    },
    {
      id: 2,
      title: "Workout Energy",
      style: "Happy Energetic",
      duration: "3:12",
      createdAt: "1 day ago",
    },
    {
      id: 3,
      title: "Late Night Focus",
      style: "Mysterious",
      duration: "4:45",
      createdAt: "3 days ago",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-2xl md:text-4xl font-bold text-foreground">
          🎧 Your Music Library
        </h1>
        <p className="text-base md:text-xl text-muted-foreground">
          All your AI-generated tracks in one place
        </p>
      </div>

      <div className="space-y-4">
        {dummyTracks.map((track) => (
          <div
            key={track.id}
            className="bg-white/[0.05] backdrop-blur-sm rounded-[10px] p-6 hover:bg-white/[0.08] transition-all duration-200"
          >
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div className="space-y-2 flex-1">
                <h3 className="text-base md:text-lg font-semibold text-foreground">
                  {track.title}
                </h3>
                <div className="flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
                  <span>{track.style}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{track.duration}</span>
                  <span className="hidden md:inline">•</span>
                  <span>{track.createdAt}</span>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button
                  variant="outline"
                  size="sm"
                  className="flex-1 md:flex-none px-4 py-2 text-sm bg-white/[0.1] border-white/20 hover:bg-white/[0.15] text-white hover:text-white rounded-[8px]"
                >
                  Play
                </Button>
                <Button
                  variant="outline" 
                  size="sm"
                  className="flex-1 md:flex-none px-4 py-2 text-sm bg-white/[0.1] border-white/20 hover:bg-white/[0.15] text-white hover:text-white rounded-[8px]"
                >
                  Download
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="text-center pt-4">
        <Link to={ROUTES.CREATE} className="block md:inline-block">
          <Button
            className="w-full md:w-auto px-8 py-4 text-base md:text-lg font-semibold bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-[10px] transition-all duration-200 transform hover:scale-105 shadow-lg hover:shadow-xl hover:shadow-blue-500/30 text-white"
          >
            🎵 Create New Track
          </Button>
        </Link>
      </div>
    </div>
  );
};
