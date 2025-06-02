import React from 'react';
import { Card } from '../ui/card';
import { Dumbbell, Utensils, Droplets, Moon } from 'lucide-react';
import type { WorkoutPlan, MealPlan, WellnessTip } from '../../types';

interface WorkoutCardProps {
  workout: WorkoutPlan;
}

export const WorkoutCard: React.FC<WorkoutCardProps> = ({ workout }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center mb-4 text-blue-600 dark:text-blue-400">
        <Dumbbell className="mr-2" size={24} />
        <h3 className="text-xl font-semibold">{workout.title}</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">{workout.description}</p>
      
      <div className="mb-4">
        <div className="flex justify-between text-sm mb-2">
          <span className="text-gray-500 dark:text-gray-400">Duration:</span>
          <span className="font-medium">{workout.duration}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-500 dark:text-gray-400">Frequency:</span>
          <span className="font-medium">{workout.frequency}</span>
        </div>
      </div>
      
      <div className="mt-auto">
        <h4 className="font-medium text-gray-900 dark:text-white mb-2">Today's Exercises:</h4>
        <ul className="space-y-2">
          {workout.exercises.map((exercise, index) => (
            <li key={index} className="border-l-2 border-blue-500 pl-3 py-1">
              <div className="font-medium">{exercise.name}</div>
              <div className="text-sm text-gray-500 dark:text-gray-400">
                {exercise.sets && exercise.reps
                  ? `${exercise.sets} sets × ${exercise.reps} reps`
                  : exercise.duration}
              </div>
            </li>
          ))}
        </ul>
      </div>
    </Card>
  );
};

interface MealCardProps {
  mealPlan: MealPlan;
}

export const MealCard: React.FC<MealCardProps> = ({ mealPlan }) => {
  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center mb-4 text-green-600 dark:text-green-400">
        <Utensils className="mr-2" size={24} />
        <h3 className="text-xl font-semibold">{mealPlan.title}</h3>
      </div>
      
      <p className="text-gray-600 dark:text-gray-300 mb-4">{mealPlan.description}</p>
      
      <div className="space-y-4 mt-auto">
        {mealPlan.meals.map((meal, index) => (
          <div key={index} className="border-l-2 border-green-500 pl-3 py-1">
            <div className="font-medium">{meal.type.charAt(0).toUpperCase() + meal.type.slice(1)}: {meal.title}</div>
            <div className="text-sm text-gray-600 dark:text-gray-300">{meal.description}</div>
            {meal.calories && (
              <div className="flex space-x-3 mt-1 text-xs text-gray-500 dark:text-gray-400">
                <span>{meal.calories} cal</span>
                {meal.protein && <span>{meal.protein}g protein</span>}
                {meal.carbs && <span>{meal.carbs}g carbs</span>}
                {meal.fat && <span>{meal.fat}g fat</span>}
              </div>
            )}
          </div>
        ))}
      </div>
    </Card>
  );
};

interface WellnessTipsCardProps {
  tips: WellnessTip[];
}

export const WellnessTipsCard: React.FC<WellnessTipsCardProps> = ({ tips }) => {
  const getIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case 'hydration':
        return <Droplets className="text-blue-500 mr-2" size={18} />;
      case 'sleep':
        return <Moon className="text-indigo-500 mr-2" size={18} />;
      default:
        return null;
    }
  };

  return (
    <Card className="h-full flex flex-col">
      <div className="flex items-center mb-4 text-purple-600 dark:text-purple-400">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="mr-2"
        >
          <path d="M18 3a3 3 0 0 0-3 3"></path>
          <path d="M18 3a3 3 0 0 1 3 3"></path>
          <path d="M18 21a3 3 0 0 1-3-3"></path>
          <path d="M18 21a3 3 0 0 0 3-3"></path>
          <path d="M6 3a3 3 0 0 0-3 3"></path>
          <path d="M6 3a3 3 0 0 1 3 3"></path>
          <path d="M6 21a3 3 0 0 1-3-3"></path>
          <path d="M6 21a3 3 0 0 0 3-3"></path>
          <path d="M18 9v6"></path>
          <path d="M6 9v6"></path>
        </svg>
        <h3 className="text-xl font-semibold">Wellness Tips</h3>
      </div>
      
      <div className="space-y-4">
        {tips.map((tip, index) => (
          <div key={index} className="flex">
            {getIcon(tip.category)}
            <div>
              <div className="font-medium">{tip.title}</div>
              <div className="text-sm text-gray-600 dark:text-gray-300">{tip.description}</div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};