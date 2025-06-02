import React, { useState, useEffect } from 'react';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { Select } from '../ui/select';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line } from 'recharts';
import { useAuth } from '../../context/AuthContext';
import type { ProgressEntry } from '../../types';
import { getProgressHistory, saveProgressEntry } from '../../services/api';

export const ProgressTracker: React.FC = () => {
  const { user } = useAuth();
  const [progressHistory, setProgressHistory] = useState<ProgressEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [activeTab, setActiveTab] = useState('weight');
  
  const [formData, setFormData] = useState({
    weight: '',
    workoutsCompleted: '',
    caloriesBurned: '',
    waterIntake: '',
    sleepHours: '',
    mood: '',
  });
  
  useEffect(() => {
    if (!user) return;
    
    const loadProgressHistory = async () => {
      setIsLoading(true);
      try {
        const history = await getProgressHistory(user.id);
        setProgressHistory(history);
      } catch (err) {
        console.error('Error loading progress history:', err);
      } finally {
        setIsLoading(false);
      }
    };
    
    loadProgressHistory();
  }, [user]);
  
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) return;
    
    const entryData: Record<string, any> = {};
    
    // Only include fields with values
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        entryData[key] = key === 'mood' ? value : Number(value);
      }
    });
    
    try {
      const newEntry = await saveProgressEntry(user.id, entryData);
      setProgressHistory([...progressHistory, newEntry]);
      
      // Reset form
      setFormData({
        weight: '',
        workoutsCompleted: '',
        caloriesBurned: '',
        waterIntake: '',
        sleepHours: '',
        mood: '',
      });
      
      setShowForm(false);
    } catch (err) {
      console.error('Error saving progress entry:', err);
    }
  };
  
  const formatDate = (dateString: string | Date) => {
    const date = new Date(dateString);
    return `${date.getMonth() + 1}/${date.getDate()}`;
  };
  
  // Prepare chart data based on active tab
  const getChartData = () => {
    return progressHistory.map(entry => ({
      date: formatDate(entry.date),
      value: entry[activeTab as keyof ProgressEntry] || 0,
    })).slice(-7); // Show last 7 entries
  };
  
  // Get chart title
  const getChartTitle = () => {
    switch (activeTab) {
      case 'weight':
        return 'Weight (kg)';
      case 'workoutsCompleted':
        return 'Workouts Completed';
      case 'caloriesBurned':
        return 'Calories Burned';
      case 'waterIntake':
        return 'Water Intake (glasses)';
      case 'sleepHours':
        return 'Sleep Hours';
      default:
        return '';
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
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Your Progress</h2>
        <Button
          variant={showForm ? 'secondary' : 'default'}
          onClick={() => setShowForm(!showForm)}
        >
          {showForm ? 'Cancel' : 'Log Today\'s Progress'}
        </Button>
      </div>
      
      {showForm && (
        <Card>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              <Input
                type="number"
                name="weight"
                value={formData.weight}
                onChange={handleInputChange}
                placeholder="Enter your weight"
                min={30}
                max={250}
              />
              
              <Input
                type="number"
                name="workoutsCompleted"
                value={formData.workoutsCompleted}
                onChange={handleInputChange}
                placeholder="Number of workouts"
                min={0}
                max={10}
              />
              
              <Input
                type="number"
                name="caloriesBurned"
                value={formData.caloriesBurned}
                onChange={handleInputChange}
                placeholder="Estimated calories"
                min={0}
              />
              
              <Input
                type="number"
                name="waterIntake"
                value={formData.waterIntake}
                onChange={handleInputChange}
                placeholder="Glasses of water"
                min={0}
                max={20}
              />
              
              <Input
                type="number"
                name="sleepHours"
                value={formData.sleepHours}
                onChange={handleInputChange}
                placeholder="Hours of sleep"
                min={0}
                max={24}
              />
              
              <Select
                type="Select"
                name="mood"
                value={formData.mood}
                onChange={handleInputChange}
                options={[
                  { value: 'Excellent', label: 'Excellent' },
                  { value: 'Good', label: 'Good' },
                  { value: 'Neutral', label: 'Neutral' },
                  { value: 'Fair', label: 'Fair' },
                  { value: 'Poor', label: 'Poor' },
                ]}
                placeholder="Select your mood"
              />
            </div>
            
            <div className="flex justify-end">
              <Button type="submit" variant="default">
                Save Progress
              </Button>
            </div>
          </form>
        </Card>
      )}
      
      {progressHistory.length > 0 ? (
        <Card>
          <div className="mb-6">
            <div className="flex space-x-2 mb-4 overflow-x-auto pb-2">
              <Button
                variant={activeTab === 'weight' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('weight')}
              >
                Weight
              </Button>
              <Button
                variant={activeTab === 'workoutsCompleted' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('workoutsCompleted')}
              >
                Workouts
              </Button>
              <Button
                variant={activeTab === 'caloriesBurned' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('caloriesBurned')}
              >
                Calories
              </Button>
              <Button
                variant={activeTab === 'waterIntake' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('waterIntake')}
              >
                Water
              </Button>
              <Button
                variant={activeTab === 'sleepHours' ? 'default' : 'outline'}
                size="sm"
                onClick={() => setActiveTab('sleepHours')}
              >
                Sleep
              </Button>
            </div>
            
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              {getChartTitle()} - Last 7 Entries
            </h3>
            
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                {activeTab === 'weight' ? (
                  <LineChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Line
                      type="monotone"
                      dataKey="value"
                      stroke="#3B82F6"
                      strokeWidth={2}
                      dot={{ r: 4 }}
                      activeDot={{ r: 6 }}
                    />
                  </LineChart>
                ) : (
                  <BarChart data={getChartData()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                  </BarChart>
                )}
              </ResponsiveContainer>
            </div>
          </div>
          
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
              Recent Entries
            </h3>
            
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
                <thead className="bg-gray-50 dark:bg-gray-800">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Weight (kg)
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Workouts
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Calories
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Water
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Sleep
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-300 uppercase tracking-wider">
                      Mood
                    </th>
                  </tr>
                </thead>
                <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
                  {[...progressHistory]
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .slice(0, 5)
                    .map((entry, index) => (
                    <tr key={index} className="hover:bg-gray-50 dark:hover:bg-gray-700">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-gray-200">
                        {new Date(entry.date).toLocaleDateString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {entry.weight || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {entry.workoutsCompleted || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {entry.caloriesBurned || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {entry.waterIntake || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {entry.sleepHours || '-'}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">
                        {entry.mood || '-'}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </Card>
      ) : (
        <Card>
          <div className="text-center py-8">
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No progress data yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-4">
              Start tracking your fitness journey by logging your daily progress.
            </p>
            {!showForm && (
              <Button variant="default" onClick={() => setShowForm(true)}>
                Log Your First Entry
              </Button>
            )}
          </div>
        </Card>
      )}
    </div>
  );
};