import type { UserProfile, Recommendations, ChatMessage, ProgressEntry } from '../types';

// Mock database for demo purposes
let userProfiles: Record<string, UserProfile> = {};
let chatHistory: Record<string, ChatMessage[]> = {};
let progressData: Record<string, ProgressEntry[]> = {};

// Save user profile
export const saveUserProfile = async (userId: string, profile: UserProfile): Promise<UserProfile> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 800));
  
  userProfiles[userId] = profile;
  return profile;
};

// Get user profile
export const getUserProfile = async (userId: string): Promise<UserProfile | null> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return userProfiles[userId] || null;
};

// Generate recommendations based on user profile
export const getRecommendations = async (userId: string): Promise<Recommendations> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1200));
  
  const profile = userProfiles[userId];
  
  if (!profile) {
    throw new Error('User profile not found');
  }
  
  // Mock recommendations based on user profile
  return generateMockRecommendations(profile);
};

// Save chat message
export const saveChatMessage = async (userId: string, message: Omit<ChatMessage, 'id'>): Promise<ChatMessage> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!chatHistory[userId]) {
    chatHistory[userId] = [];
  }
  
  const newMessage: ChatMessage = {
    ...message,
    id: Date.now().toString()
  };
  
  chatHistory[userId].push(newMessage);
  return newMessage;
};

// Get AI response
export const getAIResponse = async (userId: string, message: string): Promise<ChatMessage> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 1500));
  
  // In a real app, this would call the OpenAI API
  const profile = userProfiles[userId];
  const responseMessage = generateMockAIResponse(message, profile);
  
  const response: ChatMessage = {
    id: Date.now().toString(),
    sender: 'ai',
    message: responseMessage,
    timestamp: new Date()
  };
  
  if (!chatHistory[userId]) {
    chatHistory[userId] = [];
  }
  
  chatHistory[userId].push(response);
  return response;
};

// Get chat history
export const getChatHistory = async (userId: string): Promise<ChatMessage[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return chatHistory[userId] || [];
};

// Save progress entry
export const saveProgressEntry = async (userId: string, entry: Omit<ProgressEntry, 'date'>): Promise<ProgressEntry> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 600));
  
  if (!progressData[userId]) {
    progressData[userId] = [];
  }
  
  const newEntry: ProgressEntry = {
    ...entry,
    date: new Date()
  };
  
  progressData[userId].push(newEntry);
  return newEntry;
};

// Get progress history
export const getProgressHistory = async (userId: string): Promise<ProgressEntry[]> => {
  // Simulate API call delay
  await new Promise(resolve => setTimeout(resolve, 700));
  
  return progressData[userId] || [];
};

// Helper functions for mock data generation
function generateMockRecommendations(profile: UserProfile): Recommendations {
  // This would be replaced by actual AI recommendations in a real app
  const recommendations: Recommendations = {
    workoutPlan: {
      title: '',
      description: '',
      duration: '',
      frequency: '',
      exercises: []
    },
    mealPlan: {
      title: '',
      description: '',
      meals: []
    },
    wellnessTips: []
  };
  
  // Generate recommendations based on fitness goal
  if (profile.fitnessGoal === 'Weight Loss') {
    recommendations.workoutPlan = {
      title: 'Cardio & HIIT Focus',
      description: 'A balanced plan focused on burning calories and boosting metabolism',
      duration: '45 minutes',
      frequency: '4-5 times per week',
      exercises: [
        { name: 'Treadmill Walking/Running', duration: '20 minutes' },
        { name: 'Bodyweight Squats', sets: 3, reps: 15 },
        { name: 'Mountain Climbers', duration: '45 seconds' },
        { name: 'Push-ups', sets: 3, reps: 10 },
        { name: 'Plank', duration: '60 seconds' }
      ]
    };
    
    recommendations.mealPlan = {
      title: 'Calorie-Controlled Nutrition',
      description: 'Focus on protein and fiber to stay full while maintaining a calorie deficit',
      meals: [
        {
          type: 'breakfast',
          title: 'Protein-Packed Breakfast',
          description: 'Greek yogurt with berries and a sprinkle of granola',
          calories: 320,
          protein: 22,
          carbs: 30,
          fat: 12
        },
        {
          type: 'lunch',
          title: 'Lean Lunch',
          description: 'Grilled chicken salad with mixed greens and light dressing',
          calories: 380,
          protein: 35,
          carbs: 20,
          fat: 15
        },
        {
          type: 'dinner',
          title: 'Balanced Dinner',
          description: 'Baked salmon with roasted vegetables and quinoa',
          calories: 420,
          protein: 30,
          carbs: 35,
          fat: 18
        }
      ]
    };
  } else if (profile.fitnessGoal === 'Muscle Gain') {
    recommendations.workoutPlan = {
      title: 'Progressive Resistance Training',
      description: 'Focus on compound movements and progressive overload',
      duration: '60 minutes',
      frequency: '4 times per week',
      exercises: [
        { name: 'Barbell Squats', sets: 4, reps: 8 },
        { name: 'Bench Press', sets: 4, reps: 8 },
        { name: 'Deadlifts', sets: 3, reps: 6 },
        { name: 'Pull-ups', sets: 3, reps: 8 },
        { name: 'Shoulder Press', sets: 3, reps: 10 }
      ]
    };
    
    recommendations.mealPlan = {
      title: 'Protein-Rich Muscle Building',
      description: 'Calorie surplus with focus on protein and complex carbs',
      meals: [
        {
          type: 'breakfast',
          title: 'Power Breakfast',
          description: 'Oatmeal with whey protein, banana and peanut butter',
          calories: 550,
          protein: 35,
          carbs: 60,
          fat: 18
        },
        {
          type: 'lunch',
          title: 'Muscle Building Lunch',
          description: 'Chicken breast with brown rice and vegetables',
          calories: 650,
          protein: 45,
          carbs: 70,
          fat: 15
        },
        {
          type: 'dinner',
          title: 'Recovery Dinner',
          description: 'Steak with sweet potato and broccoli',
          calories: 700,
          protein: 50,
          carbs: 50,
          fat: 25
        }
      ]
    };
  } else {
    // Default or maintenance recommendations
    recommendations.workoutPlan = {
      title: 'Balanced Fitness Routine',
      description: 'Mix of cardio and strength training for overall fitness',
      duration: '50 minutes',
      frequency: '3-4 times per week',
      exercises: [
        { name: 'Brisk Walking', duration: '15 minutes' },
        { name: 'Dumbbell Lunges', sets: 3, reps: 12 },
        { name: 'Push-ups', sets: 3, reps: 12 },
        { name: 'Dumbbell Rows', sets: 3, reps: 12 },
        { name: 'Bodyweight Squats', sets: 3, reps: 15 }
      ]
    };
    
    recommendations.mealPlan = {
      title: 'Balanced Nutrition',
      description: 'Balanced macronutrients for sustained energy and health',
      meals: [
        {
          type: 'breakfast',
          title: 'Balanced Breakfast',
          description: 'Whole grain toast with avocado and eggs',
          calories: 450,
          protein: 25,
          carbs: 40,
          fat: 20
        },
        {
          type: 'lunch',
          title: 'Nutritious Lunch',
          description: 'Turkey wrap with mixed vegetables and hummus',
          calories: 480,
          protein: 30,
          carbs: 45,
          fat: 18
        },
        {
          type: 'dinner',
          title: 'Wholesome Dinner',
          description: 'Grilled fish with quinoa and roasted vegetables',
          calories: 520,
          protein: 35,
          carbs: 50,
          fat: 20
        }
      ]
    };
  }
  
  // Add wellness tips for everyone
  recommendations.wellnessTips = [
    {
      category: 'hydration',
      title: 'Stay Hydrated',
      description: 'Aim for 8-10 glasses of water daily. Consider using a water tracking app.'
    },
    {
      category: 'sleep',
      title: 'Optimize Sleep',
      description: 'Aim for 7-8 hours of quality sleep. Establish a regular sleep schedule.'
    },
    {
      category: 'mental',
      title: 'Mindfulness Practice',
      description: 'Take 10 minutes each day for meditation or deep breathing exercises.'
    }
  ];
  
  // Add lifestyle-specific tips
  if (profile.lifestyle === 'Sedentary') {
    recommendations.wellnessTips.push({
      category: 'activity',
      title: 'Movement Breaks',
      description: 'Take a 5-minute walk every hour during your workday to reduce sitting time.'
    });
  }
  
  return recommendations;
}

function generateMockAIResponse(message: string, profile?: UserProfile): string {
  // This would be replaced by actual OpenAI API call in a real app
  const lowerMessage = message.toLowerCase();
  
  if (lowerMessage.includes('motivat') || lowerMessage.includes('inspir')) {
    return "You're doing great! Remember that consistency is key to reaching your fitness goals. Even small steps each day add up to significant progress over time. What's one small win you can celebrate today?";
  }
  
  if (lowerMessage.includes('tired') || lowerMessage.includes('exhaust') || lowerMessage.includes('fatigue')) {
    return "I understand feeling tired can be frustrating. Make sure you're getting adequate rest and recovery between workouts. Consider checking your sleep quality and nutrition. Would you like some tips on improving your energy levels?";
  }
  
  if (lowerMessage.includes('diet') || lowerMessage.includes('nutrition') || lowerMessage.includes('eat')) {
    return "Nutrition is a crucial part of your fitness journey. Focus on whole foods, adequate protein, and staying hydrated. Small, consistent improvements to your diet often work better than drastic changes. What specific aspect of nutrition are you looking to improve?";
  }
  
  if (lowerMessage.includes('workout') || lowerMessage.includes('exercise') || lowerMessage.includes('training')) {
    return "Regular exercise is fantastic for both physical and mental health. Remember to include both cardio and strength training in your routine, and always listen to your body. Would you like some specific workout suggestions based on your goals?";
  }
  
  if (lowerMessage.includes('stress') || lowerMessage.includes('anxiety') || lowerMessage.includes('overwhelm')) {
    return "I'm sorry to hear you're feeling stressed. Remember that physical activity can be a great stress reliever, but also make time for relaxation techniques like deep breathing or meditation. Your emotional wellbeing is just as important as your physical health.";
  }
  
  // Default response
  return "Thank you for sharing that with me. I'm here to support you on your wellness journey. Would you like to talk more about your fitness goals, nutrition, or perhaps need some emotional support?";
}