import { Play } from "lucide-react";
import React, { useState } from "react";

import { Button } from "@/components/ui/button";

interface GalleryItem {
  id: string;
  title: string;
  category: string;
  thumbnail: string;
  duration: string;
  description: string;
}

interface GalleryCardProps {
  item: GalleryItem;
  onPlay: (id: string) => void;
}

const GalleryCard: React.FC<GalleryCardProps> = ({ item, onPlay }) => {
  return (
    <div className="bg-card backdrop-blur-sm rounded-xl overflow-hidden hover:bg-card/90 hover:-translate-y-1 transition-all duration-300 group border border-border/50">
      {/* Video Thumbnail */}
      <div className="relative aspect-video bg-gray-800 overflow-hidden">
        <img
          src={item.thumbnail}
          alt={item.title}
          className="w-full h-full object-cover"
          onError={(e) => {
            // Fallback to gradient background if image fails to load
            e.currentTarget.style.display = "none";
          }}
        />

        {/* Play Button Overlay */}
        <div className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          <Button
            onClick={() => onPlay(item.id)}
            className="w-12 h-12 rounded-full bg-white/20 backdrop-blur-sm hover:bg-white/30 border border-white/20 p-0 flex items-center justify-center"
          >
            <Play className="w-5 h-5 text-white ml-0.5" fill="white" />
          </Button>
        </div>

        {/* Duration Badge */}
        <div className="absolute bottom-2 right-2 bg-black/60 text-white text-xs px-2 py-1 rounded">
          {item.duration}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-2">
        <div className="flex items-center justify-between">
          <h3 className="font-semibold text-foreground text-sm line-clamp-1">
            {item.title}
          </h3>
          <span className="text-xs bg-primary/20 text-primary px-2 py-1 rounded-full whitespace-nowrap">
            {item.category}
          </span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">
          {item.description}
        </p>
      </div>
    </div>
  );
};

// Mock data for gallery items
const SAMPLE_GALLERY_ITEMS: GalleryItem[] = [
  {
    id: "1",
    title: "Epic Adventure Journey",
    category: "Travel Vlog",
    thumbnail: "/api/placeholder/400/225",
    duration: "2:34",
    description:
      "Cinematic orchestral music perfect for travel vlogs and adventure content",
  },
  {
    id: "2",
    title: "Tech Product Showcase",
    category: "Product Demo",
    thumbnail: "/api/placeholder/400/225",
    duration: "1:45",
    description:
      "Modern electronic beats ideal for product demonstrations and tech reviews",
  },
  {
    id: "3",
    title: "Cozy Coffee Morning",
    category: "Lifestyle",
    thumbnail: "/api/placeholder/400/225",
    duration: "3:12",
    description: "Warm acoustic melodies for lifestyle content and daily vlogs",
  },
  {
    id: "4",
    title: "High Energy Workout",
    category: "Fitness",
    thumbnail: "/api/placeholder/400/225",
    duration: "2:58",
    description:
      "Pumping electronic music to motivate fitness and workout videos",
  },
  {
    id: "5",
    title: "Peaceful Nature Walk",
    category: "Documentary",
    thumbnail: "/api/placeholder/400/225",
    duration: "4:21",
    description:
      "Ambient nature sounds mixed with gentle piano for documentary content",
  },
  {
    id: "6",
    title: "Corporate Presentation",
    category: "Business",
    thumbnail: "/api/placeholder/400/225",
    duration: "1:30",
    description:
      "Professional background music for corporate videos and presentations",
  },
  {
    id: "7",
    title: "Gaming Highlights Reel",
    category: "Gaming",
    thumbnail: "/api/placeholder/400/225",
    duration: "2:15",
    description:
      "Dynamic electronic music perfect for gaming montages and highlights",
  },
  {
    id: "8",
    title: "Food Recipe Tutorial",
    category: "Cooking",
    thumbnail: "/api/placeholder/400/225",
    duration: "3:45",
    description:
      "Upbeat and friendly music for cooking shows and recipe tutorials",
  },
];

export const SampleGallery: React.FC = () => {
  const [playingId, setPlayingId] = useState<string | null>(null);

  const handlePlay = (id: string) => {
    setPlayingId(playingId === id ? null : id);
    // Here you would typically handle actual audio playback
    console.log(`Playing/pausing audio for item ${id}`);
  };

  return (
    <div className="py-16 bg-muted/10">
      <div className="max-w-6xl">
        {/* Section Header */}
        <div className="mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Featured Soundtracks
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl">
            Discover the perfect sound for your content. Each track is carefully
            crafted by AI to match different video styles and moods.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {SAMPLE_GALLERY_ITEMS.map((item) => (
            <GalleryCard key={item.id} item={item} onPlay={handlePlay} />
          ))}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-12">
          <p className="text-muted-foreground mb-4">
            Ready to create your own custom soundtrack?
          </p>
          <Button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-200 transform hover:scale-105">
            Get Started Free
          </Button>
        </div>
      </div>
    </div>
  );
};
