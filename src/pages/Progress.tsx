import React from 'react';
import { ProgressTracker } from '../components/progress/ProgressTracker';

export const Progress: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Track Your Progress
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Monitor your fitness journey with detailed tracking and visualizations. Log your daily activities and see how far you've come.
      </p>
      
      <ProgressTracker />
    </div>
  );
};