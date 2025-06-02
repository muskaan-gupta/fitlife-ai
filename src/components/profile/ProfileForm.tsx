import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { TextArea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { useAuth } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import type { UserProfile } from '../../types';
import { getUserProfile, saveUserProfile } from '../../services/api';

export const ProfileForm: React.FC = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  
  const [profile, setProfile] = useState<UserProfile>({
    name: '',
    age: 30,
    gender: '',
    height: 170,
    weight: 70,
    fitnessGoal: '',
    lifestyle: '',
    medicalConditions: '',
    dietaryPreferences: '',
  });
  
  useEffect(() => {
    if (!user) return;
    
    const fetchProfile = async () => {
      setIsLoading(true);
      try {
        const existingProfile = await getUserProfile(user.id);
        if (existingProfile) {
          setProfile(existingProfile);
        } else if (user.name) {
          setProfile((prev) => ({ ...prev, name: user.name }));
        }
      } catch (err) {
        console.error('Error fetching profile:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchProfile();
  }, [user]);
  
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    
    // Handle numeric inputs
    if (name === 'age' || name === 'height' || name === 'weight') {
      setProfile({
        ...profile,
        [name]: value === '' ? '' : Number(value),
      });
    } else {
      setProfile({
        ...profile,
        [name]: value,
      });
    }
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    setError('');
    setSuccess('');
    setIsSaving(true);
    
    try {
      await saveUserProfile(user.id, profile);
      setSuccess('Profile saved successfully!');
      
      // Wait a moment before redirecting
      setTimeout(() => {
        navigate('/dashboard');
      }, 1500);
    } catch (err) {
      setError('Failed to save profile. Please try again.');
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };
  
  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }
  
  return (
    <Card className="max-w-3xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">Your Profile</h2>
        
        {error && (
          <div className="bg-red-50 dark:bg-red-900/30 text-red-800 dark:text-red-300 p-3 rounded-md text-sm">
            {error}
          </div>
        )}
        
        {success && (
          <div className="bg-green-50 dark:bg-green-900/30 text-green-800 dark:text-green-300 p-3 rounded-md text-sm">
            {success}
          </div>
        )}
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            required
            placeholder="Full Name"
          />
          
          <Input
            type="number"
            name="age"
            value={profile.age}
            onChange={handleChange}
            required
            min={18}
            max={100}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Gender"
            name="gender"
            value={profile.gender}
            onChange={handleChange}
            options={[
              { value: 'Male', label: 'Male' },
              { value: 'Female', label: 'Female' },
              { value: 'Non-Binary', label: 'Non-Binary' },
              { value: 'Prefer not to say', label: 'Prefer not to say' },
            ]}
            required
            placeholder="Select your gender"
          />
          
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              name="height"
              value={profile.height}
              onChange={handleChange}
              required
              min={100}
              max={250}
            />
            
            <Input
              type="number"
              name="weight"
              value={profile.weight}
              onChange={handleChange}
              required
              min={30}
              max={250}
            />
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Fitness Goal"
            name="fitnessGoal"
            value={profile.fitnessGoal}
            onChange={handleChange}
            options={[
              { value: 'Weight Loss', label: 'Weight Loss' },
              { value: 'Muscle Gain', label: 'Muscle Gain' },
              { value: 'Endurance', label: 'Endurance' },
              { value: 'Flexibility', label: 'Flexibility' },
              { value: 'Maintenance', label: 'Maintenance' },
              { value: 'General Health', label: 'General Health' },
            ]}
            required
            placeholder="Select your fitness goal"
          />
          
          <Select
            label="Lifestyle"
            name="lifestyle"
            value={profile.lifestyle}
            onChange={handleChange}
            options={[
              { value: 'Sedentary', label: 'Sedentary (little to no exercise)' },
              { value: 'Lightly Active', label: 'Lightly Active (1-3 days/week)' },
              { value: 'Moderately Active', label: 'Moderately Active (3-5 days/week)' },
              { value: 'Very Active', label: 'Very Active (6-7 days/week)' },
              { value: 'Athletic', label: 'Athletic (2x training/day)' },
            ]}
            required
            placeholder="Select your lifestyle"
          />
        </div>
        
        <TextArea
          label="Medical Conditions (Optional)"
          name="medicalConditions"
          value={profile.medicalConditions || ''}
          onChange={handleChange}
          placeholder="List any medical conditions, injuries, or limitations"
        />
        
        <TextArea
          label="Dietary Preferences (Optional)"
          name="dietaryPreferences"
          value={profile.dietaryPreferences || ''}
          onChange={handleChange}
          placeholder="Vegetarian, vegan, gluten-free, allergies, etc."
        />
        
        <div className="pt-4">
          <Button
            type="submit"
            variant="default"
            disabled={isSaving}
            className="w-full md:w-auto"
          >
            {isSaving ? 'Saving...' : 'Save Profile'}
          </Button>
        </div>
      </form>
    </Card>
  );
};