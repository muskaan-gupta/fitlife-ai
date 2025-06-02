import React from 'react';
import { ChatInterface } from '../components/chat/ChatInterface';

export const Chat: React.FC = () => {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-8">
        AI Wellness Assistant
      </h1>
      <p className="text-gray-600 dark:text-gray-300 mb-8">
        Chat with your AI wellness assistant for motivation, emotional support, and answers to your fitness and health questions.
      </p>
      
      <ChatInterface />
    </div>
  );
};