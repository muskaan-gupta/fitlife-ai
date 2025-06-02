import React, { useState, useEffect, useRef } from 'react';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import { Send } from 'lucide-react';
import type { ChatMessage } from '../../types';
import { useAuth } from '../../context/AuthContext';
import { saveChatMessage, getAIResponse, getChatHistory } from '../../services/api';

export const ChatInterface: React.FC = () => {
  const { user } = useAuth();
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!user) return;
    
    const loadChatHistory = async () => {
      try {
        const history = await getChatHistory(user.id);
        if (history.length === 0) {
          // Add welcome message if no history
          const welcomeMessage: ChatMessage = {
            id: 'welcome',
            sender: 'ai',
            message: "Hello! I'm your wellness and fitness assistant. How are you feeling today? You can ask me about your fitness routine, nutrition advice, or just chat about how you're doing.",
            timestamp: new Date()
          };
          setMessages([welcomeMessage]);
        } else {
          setMessages(history);
        }
      } catch (err) {
        console.error('Error loading chat history:', err);
      }
    };
    
    loadChatHistory();
  }, [user]);
  
  useEffect(() => {
    scrollToBottom();
  }, [messages]);
  
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };
  
  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!inputMessage.trim() || !user) return;
    
    const userMessage: Omit<ChatMessage, 'id'> = {
      sender: 'user',
      message: inputMessage,
      timestamp: new Date()
    };
    
    setIsLoading(true);
    
    try {
      // Save user message
      const savedUserMessage = await saveChatMessage(user.id, userMessage);
      setMessages(prev => [...prev, savedUserMessage]);
      setInputMessage('');
      
      // Get AI response
      const aiResponse = await getAIResponse(user.id, inputMessage);
      setMessages(prev => [...prev, aiResponse]);
    } catch (err) {
      console.error('Error in chat:', err);
    } finally {
      setIsLoading(false);
    }
  };
  
  return (
    <Card className="h-[600px] flex flex-col">
      <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex-shrink-0">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Wellness Chat Assistant</h3>
        <p className="text-sm text-gray-500 dark:text-gray-400">Chat with your AI wellness coach</p>
      </div>
      
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${
              msg.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[75%] rounded-lg p-3 ${
                msg.sender === 'user'
                  ? 'bg-blue-500 text-white rounded-br-none'
                  : 'bg-gray-100 dark:bg-gray-700 text-gray-800 dark:text-gray-200 rounded-bl-none'
              }`}
            >
              <p>{msg.message}</p>
              <div
                className={`text-xs mt-1 ${
                  msg.sender === 'user'
                    ? 'text-blue-100'
                    : 'text-gray-500 dark:text-gray-400'
                }`}
              >
                {new Date(msg.timestamp).toLocaleTimeString([], {
                  hour: '2-digit',
                  minute: '2-digit'
                })}
              </div>
            </div>
          </div>
        ))}
        
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-gray-100 dark:bg-gray-700 rounded-lg p-3 max-w-[75%] text-gray-800 dark:text-gray-200 rounded-bl-none">
              <div className="flex space-x-2">
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce"></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-500 animate-bounce" style={{ animationDelay: '0.4s' }}></div>
              </div>
            </div>
          </div>
        )}
        
        <div ref={messagesEndRef} />
      </div>
      
      <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex-shrink-0">
        <form onSubmit={handleSendMessage} className="flex space-x-2">
          <input
            type="text"
            value={inputMessage}
            onChange={(e) => setInputMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-1 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
            disabled={isLoading}
          />
          <Button
            type="submit"
            variant="default"
            disabled={isLoading || !inputMessage.trim()}
          >
            <Send size={18} />
          </Button>
        </form>
      </div>
    </Card>
  );
};