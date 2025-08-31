import React, { useState } from 'react';
import { Check } from 'lucide-react';
import { useTheme } from 'next-themes';

export const Packages = () => {
    const { theme } = useTheme();
    const [billingType, setBillingType] = useState('Monthly');

    const plans = [
        {
            name: 'Amethyst',
            regularPrice: billingType === 'Monthly' ? 300 : 3000,
            offerPrice: billingType === 'Monthly' ? 150 : 1500,
            color: 'purple',
            features: [
                'Android or iOS app',
                'Modern UI/UX design',
                'Essential feature integration',
                'App Published Play Store/App Store',
                'Support - 24/7'
            ],
            isPopular: false
        },
        {
            name: 'Sapphire',
            regularPrice: billingType === 'Monthly' ? 150 : 1500,
            offerPrice: billingType === 'Monthly' ? 70 : 700,
            color: 'blue',
            features: [
                'Modern Website Design',
                'Responsive Web Design',
                'SEO Optimization',
                'Custom Features & Design',
                'Fast, Secure & Reliable',
                'Support 24/7'
            ],
            isPopular: true
        },
        {
            name: 'Emerald',
            regularPrice: billingType === 'Monthly' ? 200 : 2000,
            offerPrice: billingType === 'Monthly' ? 100 : 1000,
            color: 'green',
            features: [
                'SEO (On-page & Technical)',
                'Google Ads Campaign Setup',
                'Facebook Ads Campaign Setup',
                'Social Media Setup & Branding',
                'Email Marketing Campaigns',
                'Support - 24/7'
            ],
            isPopular: false
        }
    ];

    return (
        <div className={`p-8 py-24 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className="max-w-7xl mx-auto">
                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className={`inline-flex rounded-full border   p-1 ${theme === 'light' ? 'bg-white text-black' : 'bg-black/60 text-white border-gray-700'}`}>
                        {['Monthly', 'Yearly'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setBillingType(type)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${billingType === type
                                    ? ` shadow-lg ${theme === 'light' ? 'bg-white text-black' : 'bg-white/20 text-white'}`
                                    : `text-gray-400 hover:text-gray-200`}`}
                            >
                                {type}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Pricing Cards */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
                    {plans.map((plan, index) => (
                        <div
                            key={plan.name}
                            className={`relative border-gray-800/50 hover:border-gray-700/50 rounded-2xl border px-6 py-12 backdrop-blur-sm transition-all duration-300 hover:scale-105 ${theme === 'light' ? 'text-black' : 'text-white'}
                                group overflow-hidden
                            `}
                        >
                            {/* Creative Hover Effect */}
                            <div
                                className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                            >
                                <div className={`absolute -top-10 -left-10 w-40 h-40 rounded-full blur-2xl ${theme === 'light' ? 'bg-gradient-to-br from-purple-300/40 via-blue-200/40 to-pink-200/40' : 'bg-gradient-to-br from-purple-700/40 via-blue-800/40 to-pink-800/40'}`}></div>
                                <div className={`absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-2xl ${theme === 'light' ? 'bg-gradient-to-br from-blue-200/40 via-purple-200/40 to-pink-200/40' : 'bg-gradient-to-br from-blue-900/40 via-purple-900/40 to-pink-900/40'}`}></div>
                            </div>

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-8 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    {plan.name}
                                </h3>

                                <div className="mb-4">
                                    <div className={`text-sm mb-1 ${theme === 'light' ? 'text-black' : 'text-gray-400'}`}>
                                        Regular Price{' '}
                                        <span className={`line-through ${theme === 'light' ? 'text-black' : 'text-gray-500'}`}>
                                            ${plan.regularPrice}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className={`text-4xl font-bold ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                            ${plan.offerPrice}
                                        </span>
                                        <span className={`ml-2 ${theme === 'light' ? 'text-black' : 'text-gray-400'}`}>Offer Price</span>
                                    </div>
                                </div>

                                <button className={`w-full py-2 rounded-lg bg-transparent border border-gray-600 font-semibold hover:bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] hover:border-gray-500 transition-all duration-300 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                    GET STARTED
                                </button>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            <div className="w-5 h-5 rounded-full flex items-center justify-center bg-gradient-to-r from-purple-400 to-blue-400">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                        <span className={`text-sm leading-relaxed ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                            {feature}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            {/* Decorative Elements */}
                            <div className="absolute top-4 right-4 w-12 h-12 rounded-full bg-gradient-to-br from-purple-500/20 to-blue-500/20 blur-xl"></div>
                            <div className="absolute bottom-4 left-4 w-8 h-8 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 blur-lg"></div>
                        </div>
                    ))}
                </div>

                {/* Background Decorative Elements */}
                <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                    <div className="absolute top-1/4 left-1/4 w-64 h-64 rounded-full bg-purple-500/5 blur-3xl animate-pulse"></div>
                    <div className="absolute bottom-1/4 right-1/4 w-64 h-64 rounded-full bg-blue-500/5 blur-3xl animate-pulse delay-1000"></div>
                </div>
            </div>
        </div>
    );
};