'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Lock, Sparkles, Check } from 'lucide-react';
import { useTheme } from 'next-themes';
import { apiClient } from '@/lib/api-client';
import ChatComponent from './ChatComponent';

interface SubscriptionStatus {
  allow_ai_chat: boolean;
  tier?: string;
  term?: string;
}

const ChatbotWrapper: React.FC = () => {
  const { theme } = useTheme();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [allowAiChat, setAllowAiChat] = useState(false);

  useEffect(() => {
    checkSubscription();
  }, []);

  const checkSubscription = async () => {
    try {
      setIsLoading(true);
      const data = await apiClient.get('/payments/subscription-status/');
      
      setAllowAiChat(data.usage_window?.allow_ai_chat || false);
    } catch (error) {
      setAllowAiChat(false);
    } finally {
      setIsLoading(false);
    }
  };

  const handleUpgrade = () => {
    router.push('/pricing'); 
  };

  if (isLoading) {
    return (
      <div className={`flex items-center justify-center h-[calc(100vh-110px)] ${
        theme === 'light' ? 'bg-white' : 'bg-[#010006]'
      }`}>
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className={`mt-4 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (!allowAiChat) {
    return (
      <div className={`flex items-center justify-center min-h-[calc(100vh-110px)] px-4 ${
        theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-blue-50' : 'bg-gradient-to-br from-[#010006] to-blue-950/20'
      }`}>
        <div className={`max-w-md w-full p-6 rounded-2xl shadow-xl text-center ${
          theme === 'light' ? 'bg-white border border-gray-200' : 'bg-gray-900/50 backdrop-blur-xl border border-gray-800'
        }`}>
          {/* Icon */}
          <div className="relative inline-block mb-4">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full blur-lg opacity-40"></div>
            <div className={`relative p-4 rounded-full ${
              theme === 'light' ? 'bg-gradient-to-br from-blue-50 to-purple-50' : 'bg-gradient-to-br from-blue-900/30 to-purple-900/30'
            }`}>
              <Lock size={32} className="text-blue-600" />
            </div>
          </div>

          {/* Title */}
          <h2 className={`text-2xl font-bold mb-2 ${
            theme === 'light' ? 'text-gray-900' : 'text-white'
          }`}>
            Unlock AI Chat
          </h2>

          {/* Description */}
          <p className={`text-sm mb-5 ${
            theme === 'light' ? 'text-gray-600' : 'text-gray-400'
          }`}>
            AI Chat is a premium feature available with Pro subscription
          </p>

          {/* Features */}
          <div className="grid gap-2 mb-5 text-left">
            {[
              'Unlimited AI conversations',
              'Context-aware responses',
              'File upload support',
              'Priority response times',
            ].map((feature, index) => (
              <div key={index} className={`flex items-center gap-2 p-2.5 rounded-lg ${
                theme === 'light' ? 'bg-gray-50' : 'bg-gray-800/50'
              }`}>
                <div className="flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
                  <Check size={12} className="text-white" />
                </div>
                <span className={`text-sm ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                  {feature}
                </span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={handleUpgrade}
            className="w-full py-3 px-6 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-semibold rounded-lg transition-all shadow-lg hover:shadow-xl flex items-center justify-center gap-2"
          >
            <Sparkles size={18} />
            Upgrade to Pro
          </button>

          {/* Additional info */}
          <p className={`mt-4 text-xs ${
            theme === 'light' ? 'text-gray-500' : 'text-gray-500'
          }`}>
            Starting from $9.99/month 
          </p>
        </div>
      </div>
    );
  }

  // If user has access, show the chat component
  return <ChatComponent />;
};

export default ChatbotWrapper;
