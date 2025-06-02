import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Card } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { WorkoutCard, MealCard, WellnessTipsCard } from '../components/dashboard/RecommendationCard';
import { useAuth } from '../context/AuthContext';
import { getUserProfile, getRecommendations } from '../services/api';
import type { UserProfile, Recommendations } from '../types';

export const Dashboard: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [recommendations, setRecommendations] = useState<Recommendations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    if (!user) return;
    
    const fetchProfileAndRecommendations = async () => {
      setIsLoading(true);
      try {
        const userProfile = await getUserProfile(user.id);
        setProfile(userProfile);
        
        if (userProfile) {
          const userRecommendations = await getRecommendations(user.id);
          setRecommendations(userRecommendations);
        }
      } catch (err) {
        console.error('Error fetching data:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfileAndRecommendations();
  }, [user]);
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  if (!profile) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <Card>
          <div className="text-center py-8">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
              Complete Your Profile
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-6 max-w-md mx-auto">
              Please complete your profile to receive personalized fitness and wellness recommendations.
            </p>
            <Button
              variant="default"
              onClick={() => navigate('/profile')}
            >
              Complete Profile
            </Button>
          </div>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
          Welcome back, {profile.name}
        </h1>
        <p className="text-gray-600 dark:text-gray-300 mt-2">
          Here are your personalized recommendations for today.
        </p>
      </header>
      
      {recommendations ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <WorkoutCard workout={recommendations.workoutPlan} />
          <MealCard mealPlan={recommendations.mealPlan} />
          <WellnessTipsCard tips={recommendations.wellnessTips} />
        </div>
      ) : (
        <Card>
          <div className="text-center py-8">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
              No recommendations available
            </h2>
            <p className="text-gray-600 dark:text-gray-300 mb-4">
              We couldn't find any recommendations for you. Please try refreshing the page.
            </p>
            <Button
              variant="default"
              onClick={() => window.location.reload()}
            >
              Refresh
            </Button>
          </div>
        </Card>
      )}
      
      <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Need Emotional Support?
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Chat with our AI assistant for motivation, advice, or just someone to talk to about your fitness journey.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/chat')}
          >
            Start Chatting
          </Button>
        </Card>
        
        <Card>
          <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
            Track Your Progress
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Log your daily activities, track your progress, and visualize your fitness journey.
          </p>
          <Button
            variant="default"
            onClick={() => navigate('/progress')}
          >
            View Progress
          </Button>
        </Card>
      </div>
    </div>
  );
};