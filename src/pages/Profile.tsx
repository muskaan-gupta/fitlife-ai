import React from 'react';
import { ProfileForm } from '../components/profile/ProfileForm';

export const Profile: React.FC = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        Complete Your Profile
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8 max-w-3xl">
        To provide you with personalized fitness and wellness recommendations, we need to know a bit more about you. 
        Please fill out the following information to get started.
      </p>
      
      <ProfileForm />
    </div>
  );
};