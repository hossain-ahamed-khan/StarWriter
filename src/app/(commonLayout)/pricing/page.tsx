"use client";
import { Packages } from '@/components/home/Packages';
import { useTheme } from 'next-themes';
import React from 'react';
import { apiClient } from '@/lib/api-client';  // ← Import apiClient

// The integration logic using apiClient:
async function launchCheckoutForPlan(planKey: string, term: 'monthly' | 'annual') {
  const successUrl = window.location.origin + '/pricing/success';
  const cancelUrl = window.location.origin + '/pricing/cancel';

  try {
    // ✅ Use apiClient.post instead of raw fetch
    const data = await apiClient.post('payments/create-checkout-session/', {
      plan_key: planKey,
      term,
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    if (data?.url) {
      window.location.href = data.url;  // Redirect to Stripe
    } else {
      console.error('Checkout URL not returned', data);
    }
  } catch (err: any) {
    console.error('Error launching checkout', err.message || err);
  }
}

export default function PricingPage() {
  const { theme } = useTheme();

  return (
    <div 
      suppressHydrationWarning  // Fix hydration warning
      className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}
    >
      <div className="w-full lg:w-3/5 mx-auto text-center pt-8">
        <h1 className="text-4xl font-bold">Plans That Grow With You</h1>
        <p className="mt-4 text-lg">
          From first steps to full speed, our pricing fits your journey—simple, flexible, and transparent.
        </p>
      </div>
      <Packages onCheckout={launchCheckoutForPlan} />
    </div>
  );
}
