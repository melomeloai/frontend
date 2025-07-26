import React, { useState } from "react";

import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import type { MusicGenerationRequest } from "@/types";

interface QuickStartWizardProps {
  onComplete: (request: MusicGenerationRequest) => void;
  onBack: () => void;
}

type WizardStep = "scenario" | "mood" | "duration" | "preview";

// Internal types for QuickStart wizard
type ScenarioValue = "workout" | "meditation" | "work-focus" | "party" | "romantic" | "driving" | "study";
type MoodValue = "happy-energetic" | "calm-peaceful" | "romantic-warm" | "passionate-intense" | "mysterious-dreamy";
type DurationValue = "10s" | "1min" | "3min";

interface ScenarioOption {
  value: ScenarioValue;
  label: string;
  icon: string;
  description: string;
}

interface MoodOption {
  value: MoodValue;
  label: string;
  icon: string;
  description: string;
}

interface DurationOption {
  value: DurationValue;
  label: string;
  description: string;
}

const SCENARIOS: ScenarioOption[] = [
  { value: "work-focus", label: "Work Time", icon: "💼", description: "Focus and productivity" },
  { value: "study", label: "Study Time", icon: "📚", description: "Concentration and learning" },
  { value: "workout", label: "Workout Time", icon: "🏃", description: "Energy and motivation" },
  { value: "meditation", label: "Relaxation Time", icon: "🧘", description: "Peace and mindfulness" },
  { value: "party", label: "Party Time", icon: "🎉", description: "Fun and celebration" },
  { value: "driving", label: "Driving Time", icon: "🚗", description: "Road trips and journeys" },
  { value: "romantic", label: "Romantic Time", icon: "💕", description: "Love and intimacy" },
];

const MOOD_MAP: Record<ScenarioValue, MoodOption[]> = {
  "work-focus": [
    { value: "calm-peaceful", label: "Help me focus", icon: "🎯", description: "Steady concentration" },
    { value: "happy-energetic", label: "Give me energy", icon: "⚡", description: "Boost productivity" },
    { value: "mysterious-dreamy", label: "Creative flow", icon: "✨", description: "Inspire creativity" },
  ],
  "study": [
    { value: "calm-peaceful", label: "Deep focus", icon: "📖", description: "Minimal distraction" },
    { value: "mysterious-dreamy", label: "Memory boost", icon: "🧠", description: "Aid concentration" },
    { value: "happy-energetic", label: "Stay alert", icon: "☕", description: "Maintain energy" },
  ],
  "workout": [
    { value: "happy-energetic", label: "High energy", icon: "🔥", description: "Maximum motivation" },
    { value: "passionate-intense", label: "Intense power", icon: "💪", description: "Push harder" },
    { value: "calm-peaceful", label: "Steady rhythm", icon: "🎵", description: "Consistent pace" },
  ],
  "meditation": [
    { value: "calm-peaceful", label: "Deep relaxation", icon: "🕯️", description: "Inner peace" },
    { value: "mysterious-dreamy", label: "Spiritual journey", icon: "🌌", description: "Transcendent experience" },
    { value: "romantic-warm", label: "Gentle comfort", icon: "🤗", description: "Warm embrace" },
  ],
  "party": [
    { value: "happy-energetic", label: "Party vibes", icon: "🎊", description: "Dance and celebrate" },
    { value: "passionate-intense", label: "High intensity", icon: "🎸", description: "Rock the night" },
    { value: "romantic-warm", label: "Smooth groove", icon: "🥂", description: "Elegant atmosphere" },
  ],
  "driving": [
    { value: "calm-peaceful", label: "Cruise control", icon: "🛣️", description: "Smooth journey" },
    { value: "happy-energetic", label: "Road trip", icon: "🎶", description: "Adventure ahead" },
    { value: "romantic-warm", label: "Scenic route", icon: "🌅", description: "Beautiful moments" },
  ],
  "romantic": [
    { value: "romantic-warm", label: "Intimate moments", icon: "💖", description: "Close connection" },
    { value: "passionate-intense", label: "Passionate love", icon: "🔥", description: "Intense feelings" },
    { value: "calm-peaceful", label: "Gentle affection", icon: "🌸", description: "Tender love" },
  ],
};

const DURATIONS: DurationOption[] = [
  { value: "10s", label: "10s Preview", description: "Quick taste" },
  { value: "1min", label: "1 Minute", description: "Short & sweet" },
  { value: "3min", label: "3 Minutes", description: "Standard length" },
];

export const QuickStartWizard: React.FC<QuickStartWizardProps> = ({ onComplete, onBack }) => {
  const [currentStep, setCurrentStep] = useState<WizardStep>("scenario");
  const [selectedScenario, setSelectedScenario] = useState<ScenarioValue | null>(null);
  const [selectedMood, setSelectedMood] = useState<MoodValue | null>(null);
  const [selectedDuration, setSelectedDuration] = useState<DurationValue | null>(null);

  const getProgress = () => {
    switch (currentStep) {
      case "scenario": return 0;
      case "mood": return 33;
      case "duration": return 67;
      case "preview": return 100;
      default: return 0;
    }
  };

  const getStepTitle = () => {
    switch (currentStep) {
      case "scenario": return "What's your situation?";
      case "mood": return "How should it feel?";
      case "duration": return "How long do you need?";
      case "preview": return "Ready to create?";
      default: return "";
    }
  };

  const getStepDescription = () => {
    switch (currentStep) {
      case "scenario": return "Choose the scenario that best describes when you'll be listening";
      case "mood": return "Select the mood that matches what you want to achieve";
      case "duration": return "Pick the duration that fits your needs";
      case "preview": return "We'll create music based on your preferences";
      default: return "";
    }
  };

  const generateDescription = () => {
    if (!selectedScenario || !selectedMood || !selectedDuration) return "";
    
    const scenario = SCENARIOS.find(s => s.value === selectedScenario);
    const mood = MOOD_MAP[selectedScenario]?.find(m => m.value === selectedMood);
    const duration = DURATIONS.find(d => d.value === selectedDuration);
    
    return `Create ${duration?.label.toLowerCase()} of music for ${scenario?.label.toLowerCase()} that helps with ${mood?.description}. The music should have a ${mood?.label.toLowerCase()} feel and be perfect for ${scenario?.description}.`;
  };

  const handleNext = () => {
    switch (currentStep) {
      case "scenario":
        if (selectedScenario) setCurrentStep("mood");
        break;
      case "mood":
        if (selectedMood) setCurrentStep("duration");
        break;
      case "duration":
        if (selectedDuration) setCurrentStep("preview");
        break;
      case "preview":
        if (selectedScenario && selectedMood && selectedDuration) {
          onComplete({
            description: generateDescription(),
            scenario: selectedScenario,
            mood: selectedMood,
            duration: selectedDuration,
          });
        }
        break;
    }
  };

  // Auto-advance when selection is made (except for preview step)
  const handleScenarioSelect = (scenario: ScenarioValue) => {
    setSelectedScenario(scenario);
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep("mood");
    }, 300);
  };

  const handleMoodSelect = (mood: MoodValue) => {
    setSelectedMood(mood);
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep("duration");
    }, 300);
  };

  const handleDurationSelect = (duration: DurationValue) => {
    setSelectedDuration(duration);
    // Auto-advance after a brief delay for visual feedback
    setTimeout(() => {
      setCurrentStep("preview");
    }, 300);
  };

  const handleBack = () => {
    switch (currentStep) {
      case "scenario":
        onBack();
        break;
      case "mood":
        setCurrentStep("scenario");
        break;
      case "duration":
        setCurrentStep("mood");
        break;
      case "preview":
        setCurrentStep("duration");
        break;
    }
  };


  const renderScenarioStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {SCENARIOS.map((scenario) => (
          <div
            key={scenario.value}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
              selectedScenario === scenario.value
                ? "border-indigo-500 bg-indigo-500/10 shadow-lg shadow-indigo-500/20"
                : "border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.2]"
            }`}
            onClick={() => handleScenarioSelect(scenario.value)}
          >
            <div className="space-y-4">
              <div className="text-3xl text-center">{scenario.icon}</div>
              <div className="text-center space-y-2">
                <h3 className="font-semibold text-foreground">{scenario.label}</h3>
                <p className="text-sm text-muted-foreground">{scenario.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderMoodStep = () => {
    if (!selectedScenario) return null;
    const moods = MOOD_MAP[selectedScenario] || [];

    return (
      <div className="space-y-6">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {moods.map((mood) => (
            <div
              key={mood.value}
              className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
                selectedMood === mood.value
                  ? "border-purple-500 bg-purple-500/10 shadow-lg shadow-purple-500/20"
                  : "border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.2]"
              }`}
              onClick={() => handleMoodSelect(mood.value)}
            >
              <div className="space-y-4">
                <div className="text-3xl text-center">{mood.icon}</div>
                <div className="text-center space-y-2">
                  <h3 className="font-semibold text-foreground">{mood.label}</h3>
                  <p className="text-sm text-muted-foreground">{mood.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderDurationStep = () => (
    <div className="space-y-6">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {DURATIONS.map((duration) => (
          <div
            key={duration.value}
            className={`p-6 rounded-2xl cursor-pointer transition-all duration-300 border-2 ${
              selectedDuration === duration.value
                ? "border-green-500 bg-green-500/10 shadow-lg shadow-green-500/20"
                : "border-white/[0.1] bg-white/[0.05] hover:bg-white/[0.1] hover:border-white/[0.2]"
            }`}
            onClick={() => handleDurationSelect(duration.value)}
          >
            <div className="text-center space-y-3">
              <h3 className="font-semibold text-foreground">{duration.label}</h3>
              <p className="text-sm text-muted-foreground">{duration.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const renderPreviewStep = () => {
    const scenario = SCENARIOS.find(s => s.value === selectedScenario);
    const mood = MOOD_MAP[selectedScenario!]?.find(m => m.value === selectedMood);
    const duration = DURATIONS.find(d => d.value === selectedDuration);

    return (
      <div className="space-y-6">
        <div className="bg-white/[0.05] rounded-2xl p-6 space-y-4">
          <h3 className="text-lg font-semibold text-foreground mb-4">Your Music Profile</h3>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="text-center p-4 bg-white/[0.05] rounded-xl">
              <div className="text-2xl mb-2">{scenario?.icon}</div>
              <div className="font-medium text-foreground">{scenario?.label}</div>
              <div className="text-sm text-muted-foreground">{scenario?.description}</div>
            </div>
            
            <div className="text-center p-4 bg-white/[0.05] rounded-xl">
              <div className="text-2xl mb-2">{mood?.icon}</div>
              <div className="font-medium text-foreground">{mood?.label}</div>
              <div className="text-sm text-muted-foreground">{mood?.description}</div>
            </div>
            
            <div className="text-center p-4 bg-white/[0.05] rounded-xl">
              <div className="text-2xl mb-2">⏱️</div>
              <div className="font-medium text-foreground">{duration?.label}</div>
              <div className="text-sm text-muted-foreground">{duration?.description}</div>
            </div>
          </div>
        </div>
        
        <div className="bg-white/[0.05] rounded-2xl p-6">
          <h4 className="font-medium text-foreground mb-3">Generated Description:</h4>
          <p className="text-muted-foreground italic">"{generateDescription()}"</p>
        </div>
      </div>
    );
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "scenario": return renderScenarioStep();
      case "mood": return renderMoodStep();
      case "duration": return renderDurationStep();
      case "preview": return renderPreviewStep();
      default: return null;
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8">
      {/* Header with Navigation */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <Button
            variant="ghost"
            onClick={handleBack}
            className="text-white/60 hover:text-white flex items-center gap-1 px-2 md:px-4"
          >
            ← <span className="hidden md:inline">Back</span>
          </Button>
          
          <div className="text-center flex-1">
            <h1 className="text-xl md:text-2xl lg:text-4xl font-bold text-foreground">
              Quick Start
            </h1>
          </div>
          
          {/* Spacer for visual balance */}
          <div className="w-12 md:w-20"></div>
        </div>
        
        <p className="text-center text-muted-foreground">
          {getStepDescription()}
        </p>
      </div>

      {/* Progress */}
      <div className="space-y-3">
        <div className="flex justify-between items-center">
          <span className="text-sm text-muted-foreground">
            Step {currentStep === "scenario" ? 1 : currentStep === "mood" ? 2 : currentStep === "duration" ? 3 : 3} of 3
          </span>
          <span className="text-sm text-muted-foreground">
            {getProgress()}%
          </span>
        </div>
        <Progress value={getProgress()} className="w-full h-2 bg-white/[0.1]" />
      </div>

      {/* Step Title */}
      <div className="text-center">
        <h2 className="text-lg md:text-xl lg:text-2xl font-semibold text-foreground">
          {getStepTitle()}
        </h2>
      </div>

      {/* Step Content */}
      <div className="min-h-[300px] md:min-h-[400px]">
        {renderStepContent()}
      </div>

      {/* Generate Button - Only shown on preview step */}
      {currentStep === "preview" && (
        <div className="flex justify-center">
          <Button
            onClick={handleNext}
            disabled={!selectedScenario || !selectedMood || !selectedDuration}
            className="px-8 md:px-12 py-3 md:py-4 text-base md:text-lg font-semibold rounded-full transition-all duration-200 bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white disabled:opacity-50 disabled:cursor-not-allowed transform hover:scale-[1.02] shadow-lg hover:shadow-xl hover:shadow-green-500/30"
          >
            🎵 Generate Music
          </Button>
        </div>
      )}
    </div>
  );
};