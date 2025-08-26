import React, { useState } from 'react';
import { Check } from 'lucide-react';

export const Packages = () => {
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

    const getCardStyles = (color: string, isPopular: boolean) => {
        const baseStyles = "relative rounded-2xl border p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105";

        if (isPopular) {
            return `${baseStyles} border border-gradient-to-br from-purple-500/20 via-blue-500/20 to-purple-600/20 border-purple-500/30 shadow-xl py-16 shadow-purple-500/10`;
        }

        return `${baseStyles} bg-black/40 border-gray-800/50 hover:border-gray-700/50`;
    };

    const getButtonStyles = (isPopular: boolean) => {
        if (isPopular) {
            return "w-full py-3 rounded-lg bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] text-white font-semibold hover:from-purple-500 hover:to-blue-500 transition-all duration-300 shadow-lg";
        }
        return "w-full py-3 rounded-lg bg-transparent border border-gray-600 text-gray-300 font-semibold hover:bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] hover:border-gray-500 transition-all duration-300";
    };

    return (
        <div className="bg-black text-white p-8 mt-24 mber-300">
            <div className="max-w-7xl mx-auto">
                {/* Billing Toggle */}
                <div className="flex justify-center mb-12">
                    <div className="inline-flex rounded-full border border-gray-700 bg-black/60 p-1">
                        {['Monthly', 'Yearly'].map((type) => (
                            <button
                                key={type}
                                onClick={() => setBillingType(type)}
                                className={`px-6 py-2 rounded-full text-sm font-medium transition-all duration-300 ${billingType === type
                                    ? 'bg-white/20 text-white shadow-lg'
                                    : 'text-gray-400 hover:text-gray-200'
                                    }`}
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
                            className={getCardStyles(plan.color, plan.isPopular)}
                        >
                            {/* Popular Badge */}
                            {plan.isPopular && (
                                <div className="absolute -top-3 left-6">
                                    <div className="bg-[#828ED6] text-white px-4 py-1 rounded-full text-sm font-semibold shadow-lg">
                                        Most Popular
                                    </div>
                                </div>
                            )}

                            {/* Plan Header */}
                            <div className="mb-6">
                                <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                                    {plan.name}
                                </h3>

                                <div className="mb-4">
                                    <div className="text-sm text-gray-400 mb-1">
                                        Regular Price{' '}
                                        <span className="line-through text-gray-500">
                                            ${plan.regularPrice}
                                        </span>
                                    </div>
                                    <div className="flex items-baseline">
                                        <span className="text-4xl font-bold text-white">
                                            ${plan.offerPrice}
                                        </span>
                                        <span className="text-gray-400 ml-2">Offer Price</span>
                                    </div>
                                </div>

                                <button className={getButtonStyles(plan.isPopular)}>
                                    GET STARTED
                                </button>
                            </div>

                            {/* Features List */}
                            <div className="space-y-3">
                                {plan.features.map((feature, featureIndex) => (
                                    <div key={featureIndex} className="flex items-start space-x-3">
                                        <div className="flex-shrink-0 mt-0.5">
                                            <div className="w-5 h-5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 flex items-center justify-center">
                                                <Check className="w-3 h-3 text-white" />
                                            </div>
                                        </div>
                                        <span className="text-gray-300 text-sm leading-relaxed">
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