// User related types
export default interface User {
  id: string;
  name: string;
  email: string;
  profileCompleted: boolean;
}

export interface UserProfile {
  name: string;
  age: number;
  gender: string;
  height: number; // in cm
  weight: number; // in kg
  fitnessGoal: string;
  lifestyle: string;
  medicalConditions?: string;
  dietaryPreferences?: string;
}

// Recommendation related types
export interface WorkoutPlan {
  title: string;
  description: string;
  duration: string;
  frequency: string;
  exercises: Exercise[];
}

export interface Exercise {
  name: string;
  sets?: number;
  reps?: number;
  duration?: string;
  description?: string;
}

export interface MealPlan {
  title: string;
  description: string;
  meals: Meal[];
}

export interface Meal {
  type: string; // breakfast, lunch, dinner, snack
  title: string;
  description: string;
  calories?: number;
  protein?: number;
  carbs?: number;
  fat?: number;
}

export interface WellnessTip {
  category: string; // hydration, sleep, mental
  title: string;
  description: string;
}

export interface Recommendations {
  workoutPlan: WorkoutPlan;
  mealPlan: MealPlan;
  wellnessTips: WellnessTip[];
}

// Chat related types
export interface ChatMessage {
  id: string;
  sender: 'user' | 'ai';
  message: string;
  timestamp: Date;
}

// Progress tracking related types
export interface ProgressEntry {
  date: Date;
  weight?: number;
  workoutsCompleted?: number;
  caloriesBurned?: number;
  waterIntake?: number;
  sleepHours?: number;
  mood?: string;
}