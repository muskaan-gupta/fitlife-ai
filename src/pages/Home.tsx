import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '../components/ui/button';
import { Activity, MessageSquare, TrendingUp, UserCircle } from 'lucide-react';

export const Home: React.FC = () => {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-800 dark:to-purple-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="lg:flex lg:items-center lg:justify-between">
            <div className="lg:w-1/2">
              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl md:text-6xl">
                Your Personal
                <span className="block text-purple-200">Fitness & Wellness</span>
                AI Assistant
              </h1>
              <p className="mt-6 text-xl text-blue-100 max-w-lg">
                Personalized workout plans, nutrition guidance, and emotional support
                powered by AI to help you achieve your health and fitness goals.
              </p>
              <div className="mt-10 flex space-x-4">
                <Link to="/register">
                  <Button size="lg" variant="outline" className="bg-white text-blue-600 hover:bg-blue-50">
                    Get Started
                  </Button>
                </Link>
                <Link to="/login">
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Log In
                  </Button>
                </Link>
              </div>
            </div>
            <div className="mt-10 lg:mt-0 lg:w-1/2">
              <img
                src="https://images.pexels.com/photos/4498362/pexels-photo-4498362.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
                alt="Fitness and wellness"
                className="rounded-lg shadow-xl"
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Features</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight">
              Everything you need for your fitness journey
            </p>
            <p className="max-w-xl mt-5 mx-auto text-xl text-gray-500 dark:text-gray-400">
              Our AI-powered platform provides personalized recommendations and support to help you reach your goals.
            </p>
          </div>

          <div className="mt-16">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center rounded-md bg-blue-100 dark:bg-blue-900 p-3 text-blue-600 dark:text-blue-300 mb-4">
                  <Activity className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Personalized Workouts</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Get custom workout plans based on your goals, fitness level, and preferences.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center rounded-md bg-green-100 dark:bg-green-900 p-3 text-green-600 dark:text-green-300 mb-4">
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
                    className="h-6 w-6"
                  >
                    <path d="M4 11h16"></path>
                    <path d="M4 5h16"></path>
                    <path d="M4 17h16"></path>
                    <path d="M8 11V8"></path>
                    <path d="M12 11v6"></path>
                    <path d="M16 11v-5"></path>
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Nutrition Guidance</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Receive tailored meal plans and dietary recommendations to fuel your body.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center rounded-md bg-purple-100 dark:bg-purple-900 p-3 text-purple-600 dark:text-purple-300 mb-4">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">AI Chat Support</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Talk to our AI assistant for motivation, emotional support, and answers to your questions.
                </p>
              </div>

              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-6 shadow-md transition-transform hover:scale-105">
                <div className="inline-flex items-center justify-center rounded-md bg-orange-100 dark:bg-orange-900 p-3 text-orange-600 dark:text-orange-300 mb-4">
                  <TrendingUp className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 dark:text-white">Progress Tracking</h3>
                <p className="mt-2 text-gray-500 dark:text-gray-400">
                  Monitor your progress with detailed charts and insights to stay motivated.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <div className="py-16 bg-gray-50 dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-base font-semibold text-blue-600 dark:text-blue-400 uppercase tracking-wide">Testimonials</h2>
            <p className="mt-1 text-3xl font-extrabold text-gray-900 dark:text-white sm:text-4xl sm:tracking-tight">
              Success stories from our users
            </p>
          </div>

          <div className="mt-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <UserCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Sarah J.</h3>
                    <p className="text-gray-500 dark:text-gray-400">Lost 15kg in 6 months</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "The personalized workout plans and nutrition advice helped me achieve my weight loss goals. The AI chat support kept me motivated throughout my journey."
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <UserCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Mike T.</h3>
                    <p className="text-gray-500 dark:text-gray-400">Gained 8kg of muscle</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "I've tried many fitness apps, but this one stands out with its AI-powered recommendations. The meal plans are practical and the workouts are challenging but achievable."
                </p>
              </div>

              <div className="bg-white dark:bg-gray-700 shadow-md rounded-lg p-6">
                <div className="flex items-center mb-4">
                  <div className="mr-4">
                    <UserCircle className="h-12 w-12 text-gray-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 dark:text-white">Lisa R.</h3>
                    <p className="text-gray-500 dark:text-gray-400">Improved overall wellness</p>
                  </div>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  "What I love most is the emotional support feature. Having someone to talk to about my fitness struggles has made all the difference in staying consistent."
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-blue-600 dark:bg-blue-800">
        <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:py-16 lg:px-8 lg:flex lg:items-center lg:justify-between">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to transform your fitness journey?</span>
            <span className="block text-blue-200">Start your personalized experience today.</span>
          </h2>
          <div className="mt-8 flex lg:mt-0 lg:flex-shrink-0">
            <div className="inline-flex rounded-md shadow">
              <Link to="/register">
                <Button size="lg" variant="default" className="bg-white text-blue-600 hover:bg-blue-50">
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};