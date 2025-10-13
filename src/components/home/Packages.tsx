import React, { useState } from 'react';
import { Check, Sparkles } from 'lucide-react';
import { useTheme } from 'next-themes';
import { motion } from 'framer-motion';

type Plan = {
  name: string;
  description: string;
  regularPrice: number | null;
  offerPrice: number;
  wordsLimit: string;
  perRequestLimit: string;
  features: string[];
  excludedFeatures: string[];
  isPopular: boolean;
  ctaText: string;
};

type PackagesProps = {
  onCheckout: (planKey: string, term: 'monthly' | 'annual') => void;
};

export const Packages = ({ onCheckout }: PackagesProps) => {
  const { theme } = useTheme();
  const [billingType, setBillingType] = useState<'Monthly' | 'Yearly'>('Monthly');

  const plans: Plan[] = [
    {
      name: 'Free',
      description: 'Perfect for trying out',
      regularPrice: null,
      offerPrice: 0,
      wordsLimit: '1,000',
      perRequestLimit: '100',
      features: ['AI Humanizer', 'Live Chat Support', '1,000 words'],
      excludedFeatures: ['AI Chat', 'Advanced Formula'],
      isPopular: false,
      ctaText: 'GET STARTED FREE'
    },
    {
      name: billingType === 'Monthly' ? 'Standard' : 'Standard Annual',
      description: 'Great for regular users',
      regularPrice: billingType === 'Monthly' ? null : 59.99,
      offerPrice: billingType === 'Monthly' ? 4.99 : 49.99,
      wordsLimit: billingType === 'Monthly' ? '20,000' : '240,000',
      perRequestLimit: '800',
      features: ['AI Humanizer', 'Live Chat Support', `${billingType === 'Monthly' ? '20,000' : '240,000'} words`],
      excludedFeatures: ['AI Chat', 'Advanced Formula'],
      isPopular: false,
      ctaText: 'GET STARTED'
    },
    {
      name: billingType === 'Monthly' ? 'Pro' : 'Pro Annual',
      description: 'Unlimited power for professionals',
      regularPrice: billingType === 'Monthly' ? null : 119.99,
      offerPrice: billingType === 'Monthly' ? 9.99 : 99.99,
      wordsLimit: 'Unlimited',
      perRequestLimit: '1,200',
      features: ['AI Humanizer', 'AI Chat', 'Advanced Formula', 'Priority Support', 'Unlimited words'],
      excludedFeatures: [],
      isPopular: true,
      ctaText: 'GO PRO'
    }
  ];

  function getPlanKey(planName: string, billing: 'Monthly' | 'Yearly'): string | null {
    const base = planName.toLowerCase();
    if (base.includes('free')) return null;
    if (base.includes('standard')) return billing === 'Monthly' ? 'standard_monthly' : 'standard_annual';
    return billing === 'Monthly' ? 'pro_monthly' : 'pro_annual';
  }

  const handleCheckout = (planName: string) => {
    const planKey = getPlanKey(planName, billingType);
    if (!planKey) return;
    const term = billingType === 'Monthly' ? 'monthly' : 'annual';
    onCheckout(planKey, term);
  };

  return (
    <div className={`p-8 py-24 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent">
            Choose Your Plan
          </h2>
          <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
            Transform your AI content into naturally human-written text
          </p>
        </motion.div>
        {/* Billing Toggle */}
        <div className="flex justify-center mb-12">
          <div className={`inline-flex rounded-full border p-1 ${theme === 'light' ? 'bg-gray-100 border-gray-300' : 'bg-black/60 border-gray-700'}`}>
            {['Monthly', 'Yearly'].map((type) => (
              <button
                key={type}
                onClick={() => setBillingType(type as 'Monthly' | 'Yearly')}
                className={`px-8 py-3 rounded-full text-sm font-medium transition-all duration-300 relative ${
                  billingType === type
                    ? `shadow-lg ${theme === 'light' ? 'bg-white text-black' : 'bg-gradient-to-r from-[#7a73e8] to-[#CAA9D3] text-white'}`
                    : `${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} hover:text-gray-200`
                }`}
              >
                {type}
                {type === 'Yearly' && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs px-2 py-0.5 rounded-full">
                    Save 17%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
        {/* Pricing Cards */}
        <div data-aos="fade-up" data-aos-duration="1000">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.name}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className={`relative rounded-2xl border px-6 py-8 backdrop-blur-sm transition-all duration-300 hover:scale-105
                  ${plan.isPopular ? 'border-purple-500/50 shadow-2xl shadow-purple-500/20' : 'border-gray-800/50 hover:border-gray-700/50'}
                  ${theme === 'light' ? 'bg-white/80' : 'bg-black/40'} group overflow-hidden
                `}
              >
                {plan.isPopular && (
                  <div className="absolute top-0 right-0 bg-gradient-to-r from-[#7a73e8] to-[#CAA9D3] text-white px-4 py-1 rounded-bl-lg rounded-tr-lg text-xs font-bold flex items-center gap-1">
                    <Sparkles className="w-3 h-3" />
                    MOST POPULAR
                  </div>
                )}
                {/* Plan Header */}
                <div className="mb-8 relative z-10">
                  <h3 className="text-2xl font-bold mb-2 bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent">
                    {plan.name}
                  </h3>
                  <p className={`text-sm mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                    {plan.description}
                  </p>
                  <div className="mb-6">
                    {plan.regularPrice != null && plan.offerPrice != null && (
                      <div className={`text-sm mb-2 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                        <span className="line-through">${plan.regularPrice?.toFixed(2)}</span>
                        <span className="ml-2 text-green-500 font-semibold">
                          {plan.regularPrice > plan.offerPrice
                            ? `Save $${(plan.regularPrice - plan.offerPrice).toFixed(2)}`
                            : 'No savings available'}
                        </span>
                      </div>
                    )}
                    <div className="flex items-baseline gap-2">
                      <span className={`text-5xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                        ${plan.offerPrice === 0 ? '0' : plan.offerPrice.toFixed(2)}
                      </span>
                      <span className={`${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                        /{billingType === 'Monthly' ? 'mo' : 'yr'}
                      </span>
                    </div>
                    <div className="mt-2 text-sm font-semibold bg-gradient-to-r from-[#7a73e8] to-[#CAA9D3] bg-clip-text text-transparent">
                      {plan.wordsLimit} words
                    </div>
                  </div>
                  <button
                    disabled={plan.name === 'Free'}
                    aria-disabled={plan.name === 'Free'}
                    className={`w-full py-3 rounded-lg font-semibold transition-all duration-300 transform ${plan.name === 'Free' ? "cursor-not-allowed opacity-60" : "hover:scale-105"} ${
                      plan.isPopular
                        ? 'bg-gradient-to-r from-[#7a73e8] via-[#CAA9D3] to-[#B7D6EF] text-white'
                        : `bg-transparent border-2 ${theme === 'light' ? 'border-gray-300' : 'border-gray-600'}`
                    }`}
                    onClick={() => plan.name !== 'Free' && handleCheckout(plan.name)}
                  >
                    {plan.ctaText}
                  </button>
                </div>
                {/* Features List */}
                <div className="space-y-4 relative z-10">
                  <div className={`text-xs font-semibold uppercase tracking-wider mb-3 ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                    What's Included:
                  </div>
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="flex-shrink-0 mt-0.5">
                        <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-r from-[#7a73e8] to-[#CAA9D3]">
                          <Check className="w-3 h-3 text-white" strokeWidth={3} />
                        </div>
                      </div>
                      <span className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                        {feature}
                      </span>
                    </div>
                  ))}
                  {plan.excludedFeatures.length > 0 && (
                    <>
                      <div className={`text-xs font-semibold uppercase tracking-wider mt-6 mb-3 ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                        Not Included:
                      </div>
                      {plan.excludedFeatures.map((feature, featureIndex) => (
                        <div key={featureIndex} className="flex items-start gap-3 opacity-50">
                          <div className="flex-shrink-0 mt-0.5">
                            <div className={`w-5 h-5 rounded-full flex items-center justify-center ${theme === 'light' ? 'bg-gray-300' : 'bg-gray-700'}`}>
                              <span className="text-white text-xs">✕</span>
                            </div>
                          </div>
                          <span className={`text-sm leading-relaxed ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                            {feature}
                          </span>
                        </div>
                      ))}
                    </>
                  )}
                </div>
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/10 to-blue-500/10 blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/10 to-purple-500/10 blur-lg"></div>
              </motion.div>
            ))}
          </div>
        </div>
        {/* Background Decorative Elements */}
        <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
          <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl animate-pulse"></div>
          <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        </div>
      </div>
    </div>
  );
};
// End of component
