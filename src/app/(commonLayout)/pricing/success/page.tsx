"use client";
import { useTheme } from 'next-themes';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function PricingSuccess() {
  const { theme } = useTheme();
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const [mounted, setMounted] = useState(false);

  // Fix hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }

  const isLight = theme === 'light';
  
  return (
    <div suppressHydrationWarning className={isLight ? 'bg-white text-black min-h-screen' : 'bg-[#010006] text-white min-h-screen'}>
      <main className="max-w-3xl mx-auto py-12 px-4 text-center">
        {/* Success Icon */}
        <div className="mx-auto mb-6 w-20 h-20 flex items-center justify-center rounded-full bg-gradient-to-r from-green-400 to-teal-500 shadow-lg">
          <svg 
            className="w-12 h-12 text-white" 
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={3} 
              d="M5 13l4 4L19 7" 
            />
          </svg>
        </div>

        {/* Success Message */}
        <h1 className="text-4xl font-bold mb-3 bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent">
          Payment Successful!
        </h1>
        <p className={`text-lg mb-8 ${isLight ? 'text-gray-600' : 'text-gray-300'}`}>
          Your subscription is now active. Welcome aboard!
        </p>

        {/* Session ID (optional debug info) */}
        {sessionId && (
          <div className={`mb-8 p-3 rounded-lg ${isLight ? 'bg-gray-100' : 'bg-gray-800/50'}`}>
            <p className="text-xs text-gray-500 font-mono">
              Session ID: {sessionId}
            </p>
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Link 
            href="/" 
            className={`w-full sm:w-auto px-8 py-3 rounded-lg border-2 font-semibold transition-all ${
              isLight 
                ? 'border-gray-300 text-gray-700 hover:bg-gray-100' 
                : 'border-gray-600 text-gray-300 hover:bg-gray-800'
            }`}
          >
            Go to Home
          </Link>
        </div>

        {/* Additional Info */}
        <div className={`mt-12 p-6 rounded-xl border ${isLight ? 'bg-gray-50 border-gray-200' : 'bg-gray-900/50 border-gray-700'}`}>
          <h2 className="text-lg font-semibold mb-3">What's Next?</h2>
          <ul className={`text-sm space-y-2 ${isLight ? 'text-gray-600' : 'text-gray-400'}`}>
            <li>✓ Access your dashboard to manage your subscription</li>
            <li>✓ Explore all premium features</li>
            <li>✓ Check your email for a receipt</li>
          </ul>
        </div>
      </main>
    </div>
  );
}
