export type ScenarioValue =
  | "work-focus"
  | "study"
  | "workout"
  | "meditation"
  | "party"
  | "driving"
  | "romantic";

export interface Scenario {
  value: ScenarioValue;
  label: string;
  iconName: string;
  description: string;
  templates: string[];
}

export interface KeywordGroup {
  moods: string[];
  instruments: string[];
  genres: string[];
  characteristics: string[];
}

// Scenario definitions with multiple description templates
export const SCENARIOS: Scenario[] = [
  {
    value: "work-focus",
    label: "Work",
    iconName: "Briefcase",
    description: "Focus and productivity",
    templates: [
      "Create focused background music for productive work sessions with minimal distractions",
      "Generate ambient workspace music that enhances concentration and mental clarity",
      "Compose instrumental music perfect for deep work and sustained focus periods",
    ],
  },
  {
    value: "study",
    label: "Study",
    iconName: "BookOpen",
    description: "Concentration and learning",
    templates: [
      "Create calming study music that helps with memory retention and concentration",
      "Generate peaceful background music ideal for reading and learning sessions",
      "Compose gentle instrumental music that supports cognitive function and focus",
    ],
  },
  {
    value: "meditation",
    label: "Relax",
    iconName: "Flower2",
    description: "Peace and mindfulness",
    templates: [
      "Create serene meditation music for deep relaxation and mindfulness practice",
      "Generate peaceful ambient sounds that promote inner calm and stress relief",
      "Compose tranquil music perfect for yoga, meditation, and emotional healing",
    ],
  },
  {
    value: "party",
    label: "Party",
    iconName: "PartyPopper",
    description: "Fun and celebration",
    templates: [
      "Create upbeat party music that gets everyone dancing and celebrating",
      "Generate festive music with infectious rhythms perfect for social gatherings",
      "Compose lively celebration music that brings joy and excitement to any event",
    ],
  },
  {
    value: "workout",
    label: "Workout",
    iconName: "Dumbbell",
    description: "Energy and motivation",
    templates: [
      "Create high-energy workout music that boosts motivation and endurance",
      "Generate powerful training music with driving beats for intense exercise sessions",
      "Compose energetic fitness music that maintains momentum throughout your workout",
    ],
  },
  {
    value: "driving",
    label: "Driving",
    iconName: "Car",
    description: "Road trips and journeys",
    templates: [
      "Create smooth driving music perfect for long road trips and scenic routes",
      "Generate rhythmic travel music that makes every journey more enjoyable",
      "Compose atmospheric music ideal for cruising and exploring new destinations",
    ],
  },
  {
    value: "romantic",
    label: "Romance",
    iconName: "Heart",
    description: "Love and intimacy",
    templates: [
      "Create romantic music that sets the perfect mood for intimate moments",
      "Generate heartfelt melodies ideal for date nights and special occasions",
      "Compose tender love songs that express deep emotions and connection",
    ],
  },
];

// Scenario-specific keyword groups
export const SCENARIO_KEYWORDS: Record<ScenarioValue, KeywordGroup> = {
  "work-focus": {
    moods: [
      "focused",
      "calm",
      "steady",
      "clear",
      "balanced",
      "minimal",
      "structured",
    ],
    instruments: [
      "piano",
      "ambient pads",
      "soft percussion",
      "strings",
      "electronic",
    ],
    genres: ["ambient", "lo-fi", "minimal", "neoclassical", "electronic"],
    characteristics: [
      "slow tempo",
      "repetitive",
      "non-intrusive",
      "flowing",
      "atmospheric",
    ],
  },
  study: {
    moods: [
      "peaceful",
      "gentle",
      "soothing",
      "quiet",
      "contemplative",
      "serene",
      "soft",
    ],
    instruments: ["piano", "acoustic guitar", "strings", "harp", "flute"],
    genres: [
      "classical",
      "acoustic",
      "ambient",
      "neoclassical",
      "instrumental",
    ],
    characteristics: [
      "slow tempo",
      "melodic",
      "harmonic",
      "repetitive",
      "calming",
    ],
  },
  workout: {
    moods: [
      "energetic",
      "powerful",
      "intense",
      "motivating",
      "driving",
      "pumping",
      "explosive",
    ],
    instruments: [
      "drums",
      "bass",
      "electric guitar",
      "synthesizer",
      "percussion",
    ],
    genres: ["electronic", "rock", "hip-hop", "techno", "trap", "dubstep"],
    characteristics: [
      "fast tempo",
      "rhythmic",
      "pulsing",
      "dynamic",
      "aggressive",
    ],
  },
  meditation: {
    moods: [
      "tranquil",
      "peaceful",
      "ethereal",
      "spiritual",
      "healing",
      "zen",
      "mystical",
    ],
    instruments: [
      "singing bowls",
      "flute",
      "harp",
      "ambient pads",
      "nature sounds",
    ],
    genres: ["ambient", "new age", "world music", "drone", "meditation"],
    characteristics: [
      "very slow tempo",
      "spacious",
      "flowing",
      "timeless",
      "atmospheric",
    ],
  },
  party: {
    moods: [
      "upbeat",
      "festive",
      "joyful",
      "celebratory",
      "exciting",
      "fun",
      "vibrant",
    ],
    instruments: ["drums", "bass", "synthesizer", "brass", "electric guitar"],
    genres: ["pop", "electronic", "dance", "funk", "disco", "latin"],
    characteristics: [
      "fast tempo",
      "groovy",
      "catchy",
      "rhythmic",
      "danceable",
    ],
  },
  driving: {
    moods: [
      "smooth",
      "cruising",
      "adventurous",
      "nostalgic",
      "free",
      "open",
      "wandering",
    ],
    instruments: ["guitar", "bass", "drums", "synthesizer", "harmonica"],
    genres: ["rock", "indie", "folk", "electronic", "blues", "country"],
    characteristics: [
      "moderate tempo",
      "steady",
      "flowing",
      "rhythmic",
      "melodic",
    ],
  },
  romantic: {
    moods: [
      "tender",
      "passionate",
      "intimate",
      "warm",
      "loving",
      "heartfelt",
      "dreamy",
    ],
    instruments: ["piano", "strings", "acoustic guitar", "saxophone", "violin"],
    genres: ["jazz", "classical", "acoustic", "R&B", "soul", "ballad"],
    characteristics: [
      "slow tempo",
      "melodic",
      "expressive",
      "emotional",
      "smooth",
    ],
  },
};

// General keywords that work for any scenario
export const GENERAL_KEYWORDS = {
  instruments: [
    "piano",
    "guitar",
    "drums",
    "violin",
    "saxophone",
    "flute",
    "cello",
    "trumpet",
  ],
  genres: [
    "jazz",
    "classical",
    "rock",
    "pop",
    "electronic",
    "folk",
    "blues",
    "ambient",
  ],
  characteristics: [
    "melodic",
    "harmonic",
    "rhythmic",
    "smooth",
    "modern",
    "vintage",
    "layered",
    "minimal",
  ],
};

/**
 * Get a random description template for a given scenario
 */
export function getScenarioDescription(scenarioValue: ScenarioValue): string {
  const scenario = SCENARIOS.find((s) => s.value === scenarioValue);
  if (!scenario) return "";

  const randomIndex = Math.floor(Math.random() * scenario.templates.length);
  return scenario.templates[randomIndex];
}

/**
 * Get recommended keywords for a scenario, mixing scenario-specific and general keywords
 */
export function getScenarioKeywords(
  scenarioValue: ScenarioValue | null,
  count: number = 8
): string[] {
  if (!scenarioValue) {
    // If no scenario selected, return mixed general keywords
    const allGeneral = Object.values(GENERAL_KEYWORDS).flat();
    return shuffleArray(allGeneral).slice(0, count);
  }

  const scenarioGroup = SCENARIO_KEYWORDS[scenarioValue];
  if (!scenarioGroup) return [];

  // Mix scenario-specific keywords (60%) with general keywords (40%)
  const scenarioSpecific = Object.values(scenarioGroup).flat();
  const general = Object.values(GENERAL_KEYWORDS).flat();

  const scenarioCount = Math.ceil(count * 0.6);
  const generalCount = count - scenarioCount;

  const selectedScenario = shuffleArray(scenarioSpecific).slice(
    0,
    scenarioCount
  );
  const selectedGeneral = shuffleArray(general).slice(0, generalCount);

  return shuffleArray([...selectedScenario, ...selectedGeneral]);
}

/**
 * Shuffle an array using Fisher-Yates algorithm
 */
function shuffleArray<T>(array: T[]): T[] {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Get all scenario data
 */
export function getAllScenarios(): Scenario[] {
  return SCENARIOS;
}
