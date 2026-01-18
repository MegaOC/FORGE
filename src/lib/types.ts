/**
 * Core data models for Iron & Fury
 * IMPORTANT: All weights are stored in KILOGRAMS (KG) internally
 * Display conversion to LBS/KG happens in UI layer only
 */

export interface User {
  id: string;
  name: string;
  email: string;
  unitPreference: "LBS" | "KG"; // Display preference only
  createdAt: number;
}

export interface Workout {
  id: string;
  userId: string;
  date: number; // timestamp
  title: string;
  exercises: Exercise[];
  totalVolume: number; // in KG
  duration: number; // minutes
  notes?: string;
}

export interface Exercise {
  id: string;
  workoutId: string;
  name: string;
  sets: Set[];
}

export interface Set {
  id: string;
  exerciseId: string;
  setNumber: number;
  reps: number;
  weight: number; // in KG
  isPR: boolean;
  timestamp: number;
}

export interface FoodEntry {
  id: string;
  userId: string;
  timestamp: number;
  rawText: string;
  foods: FoodItem[];
  estimatedCalories: number;
  estimatedProtein: number;
  estimatedCarbs: number;
  estimatedFat: number;
}

export interface FoodItem {
  id: string;
  name: string;
  quantity: number;
  unit: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export interface BodyMetric {
  id: string;
  userId: string;
  date: number; // timestamp
  weight?: number; // in KG
  bodyFatPercentage?: number;
}

export interface BodyMeasurement {
  id: string;
  userId: string;
  date: number; // timestamp
  measurementType: "CHEST" | "WAIST" | "ARMS" | "LEGS" | "THIGHS" | "BACK" | "SHOULDERS" | "LEFT_ARM" | "RIGHT_ARM" | "LEFT_THIGH" | "RIGHT_THIGH" | "LEFT_CALF" | "RIGHT_CALF";
  value: number; // in CM
  unit: "CM";
}

export interface AIInsight {
  id: string;
  userId: string;
  date: number; // timestamp
  insightText: string;
  type: "VOLUME" | "FREQUENCY" | "PR" | "METRIC" | "GENERAL";
  severity: "INFO" | "WARNING" | "SUCCESS";
}

export interface DailyMacros {
  date: number; // timestamp
  protein: number;
  carbs: number;
  fat: number;
  calories: number;
}

export interface ExerciseRecord {
  exerciseName: string;
  maxWeight: number; // in KG
  maxReps: number;
  lastPerformed: number; // timestamp
  totalVolume: number; // in KG
  prHistory: PRRecord[];
}

export interface PRRecord {
  date: number; // timestamp
  weight: number; // in KG
  reps: number;
  volume: number; // in KG
}

/**
 * User Goals for macro and volume tracking
 */
export interface UserGoals {
  userId: string;
  dailyCalorieGoal: number;
  dailyProteinGoal: number; // in grams
  dailyCarbsGoal: number; // in grams
  dailyFatGoal: number; // in grams
  weeklyVolumeGoal: number; // in KG
  notificationsEnabled: boolean;
  createdAt: number;
  updatedAt: number;
}

export interface AppState {
  user: User | null;
  workouts: Workout[];
  bodyMetrics: BodyMetric[];
  bodyMeasurements: BodyMeasurement[];
  foodEntries: FoodEntry[];
  aiInsights: AIInsight[];
  exerciseRecords: Record<string, ExerciseRecord>;
  userGoals: UserGoals | null;
}
