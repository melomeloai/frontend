import React, { useState } from "react";

import { Button } from "@/components/ui/button";

export const SampleGallery: React.FC = () => {
  const [activeTab, setActiveTab] = useState("Music for Videos");

  const tabs = [
    "Music for Videos",
    "Music for Ads",
    "Music Gift Cards",
    "Music Editing"
  ];

  return (
    <div className="py-16 bg-muted/10">
      <div className="max-w-6xl mx-auto">
        {/* Tab Navigation */}
        <div className="flex justify-start mb-12">
          <div className="inline-flex">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`px-4 py-2 text-sm font-medium transition-all relative ${
                  activeTab === tab
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {tab}
                {activeTab === tab && (
                  <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-foreground rounded-full"></div>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="text-center space-y-8">
          {activeTab === "Music for Videos" && (
            <>

              {/* Video Demo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {[
                  {
                    title: "Drop a dark techno track and hype visualizer",
                    description: "1. Drop a dark techno track with driving bassline\n2. Show the Hypersphere visualizer\n3. Explain how I can ask for changes to the visualizer",
                    bgColor: "bg-gradient-to-br from-cyan-500 via-purple-600 to-pink-500",
                    bgImage: "https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?w=300&h=300&fit=crop&crop=center",
                    style: "cyberpunk"
                  },
                  {
                    title: "What has @Aoh been making recently?",
                    description: "",
                    bgColor: "bg-gradient-to-br from-orange-500 via-red-500 to-purple-600",
                    bgImage: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=300&h=300&fit=crop&crop=center",
                    style: "music-video"
                  },
                  {
                    title: "Make a hyperpop song about the perfect summer",
                    description: "",
                    bgColor: "bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600",
                    bgImage: "https://images.unsplash.com/photo-1571330735066-03aaa9429d89?w=300&h=300&fit=crop&crop=center",
                    style: "synthwave"
                  },
                  {
                    title: "Give me stems for a hard-hitting trap beat with 808s",
                    description: "",
                    bgColor: "bg-gradient-to-br from-emerald-500 via-teal-500 to-cyan-600",
                    bgImage: "https://images.unsplash.com/photo-1520170350707-b2da59970118?w=300&h=300&fit=crop&crop=center",
                    style: "neon"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${item.bgColor} rounded-2xl p-4 aspect-square flex flex-col justify-between text-white text-left relative overflow-hidden group hover:scale-105 transition-all duration-300`}
                    style={{
                      backgroundImage: `url(${item.bgImage})`,
                      backgroundSize: 'cover',
                      backgroundPosition: 'center',
                      backgroundBlendMode: 'overlay'
                    }}
                  >
                    {/* Background Effects */}
                    <div className="absolute inset-0 bg-black/30"></div>
                    {item.style === 'cyberpunk' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-pink-500/20 animate-pulse"></div>
                        <div className="absolute top-0 left-0 w-full h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent opacity-70 animate-pulse"></div>
                        <div className="absolute bottom-0 right-0 w-0.5 h-full bg-gradient-to-t from-transparent via-pink-400 to-transparent opacity-70 animate-pulse"></div>
                      </>
                    )}
                    {item.style === 'music-video' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-radial from-transparent via-orange-500/10 to-purple-500/20"></div>
                        <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-orange-400 via-red-400 to-purple-400 opacity-60"></div>
                      </>
                    )}
                    {item.style === 'synthwave' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-b from-pink-500/20 via-purple-500/10 to-indigo-500/20"></div>
                        <div className="absolute inset-0" style={{
                          background: 'repeating-linear-gradient(90deg, transparent, transparent 98px, rgba(236, 72, 153, 0.1) 100px)',
                          animation: 'slide 3s linear infinite'
                        }}></div>
                      </>
                    )}
                    {item.style === 'neon' && (
                      <>
                        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/20 to-cyan-500/20"></div>
                        <div className="absolute inset-2 border border-emerald-400/30 rounded-xl animate-pulse"></div>
                      </>
                    )}

                    {/* Content */}
                    <div className="relative z-10">
                      <div className="flex justify-between items-start mb-2">
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
                          <span className="text-xs">⚡</span>
                        </div>
                        <div className="w-6 h-6 bg-white/20 backdrop-blur-sm rounded flex items-center justify-center border border-white/20">
                          <span className="text-xs">+</span>
                        </div>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-medium leading-tight mb-1 drop-shadow-md">
                        {item.title}
                      </h3>
                      {item.description && (
                        <p className="text-xs opacity-80 text-white/70 drop-shadow-sm">
                          {item.description.split('\n').map((line, i) => (
                            <span key={i}>
                              {line}
                              {i < item.description.split('\n').length - 1 && <br />}
                            </span>
                          ))}
                        </p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Music for Ads" && (
            <>

              {/* Ad Demo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {[
                  {
                    title: "Upbeat commercial jingle for tech startup",
                    bgColor: "bg-gradient-to-br from-blue-500 to-indigo-600"
                  },
                  {
                    title: "Emotional storytelling music for brand campaign",
                    bgColor: "bg-gradient-to-br from-purple-500 to-pink-600"
                  },
                  {
                    title: "Energetic product launch soundtrack",
                    bgColor: "bg-gradient-to-br from-orange-500 to-red-600"
                  },
                  {
                    title: "Sophisticated luxury brand background music",
                    bgColor: "bg-gradient-to-br from-gray-600 to-gray-800"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${item.bgColor} rounded-2xl p-4 aspect-square flex flex-col justify-between text-white text-left relative overflow-hidden group hover:scale-105 transition-transform duration-200`}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">🎵</span>
                      </div>
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">+</span>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-medium leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Music Editing" && (
            <>

              {/* Editing Demo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {[
                  {
                    title: "Auto-master your track with AI precision",
                    bgColor: "bg-gradient-to-br from-green-500 to-teal-600"
                  },
                  {
                    title: "Remove vocals and create instrumental",
                    bgColor: "bg-gradient-to-br from-blue-500 to-purple-600"
                  },
                  {
                    title: "Adjust tempo and pitch seamlessly",
                    bgColor: "bg-gradient-to-br from-red-500 to-pink-600"
                  },
                  {
                    title: "Generate harmonies and backing tracks",
                    bgColor: "bg-gradient-to-br from-yellow-500 to-orange-600"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${item.bgColor} rounded-2xl p-4 aspect-square flex flex-col justify-between text-white text-left relative overflow-hidden group hover:scale-105 transition-transform duration-200`}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">🎛️</span>
                      </div>
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">+</span>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-medium leading-tight">
                        {item.title}
                      </h3>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {activeTab === "Music Gift Cards" && (
            <>

              {/* Gift Card Demo Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mt-8">
                {[
                  {
                    title: "$25 Starter Pack",
                    description: "Perfect for beginners",
                    bgColor: "bg-gradient-to-br from-emerald-500 to-teal-600"
                  },
                  {
                    title: "$50 Creator Bundle",
                    description: "For aspiring musicians",
                    bgColor: "bg-gradient-to-br from-blue-500 to-indigo-600"
                  },
                  {
                    title: "$100 Pro Package",
                    description: "For serious creators",
                    bgColor: "bg-gradient-to-br from-purple-500 to-pink-600"
                  },
                  {
                    title: "Custom Amount",
                    description: "Choose your own value",
                    bgColor: "bg-gradient-to-br from-orange-500 to-red-600"
                  }
                ].map((item, index) => (
                  <div
                    key={index}
                    className={`${item.bgColor} rounded-2xl p-4 aspect-square flex flex-col justify-between text-white text-left relative overflow-hidden group hover:scale-105 transition-transform duration-200`}
                  >
                    <div className="absolute inset-0 bg-black/20"></div>
                    <div className="relative z-10 flex justify-between items-start">
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">🎁</span>
                      </div>
                      <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                        <span className="text-xs">+</span>
                      </div>
                    </div>
                    <div className="relative z-10">
                      <h3 className="text-sm font-medium leading-tight mb-1">
                        {item.title}
                      </h3>
                      <p className="text-xs opacity-80 text-white/70">
                        {item.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Call to Action */}
          <div className="pt-6">
            <Button className="px-8 py-3 bg-primary hover:bg-primary/90 text-primary-foreground font-semibold rounded-xl transition-all duration-200 transform hover:scale-105">
              Get Started Free
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};