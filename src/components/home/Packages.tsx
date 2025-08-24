// components/Packages.tsx
"use client";

import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { useState } from "react";

const packages = [
    {
        name: "Amethyst",
        regular: 300,
        price: 150,
        features: [
            "Android or iOS app",
            "Modern UI/UX design",
            "Essential feature integration",
            "App Published Play Store/App Store",
            "Support - 24/7",
        ],
    },
    {
        name: "Sapphire",
        regular: 150,
        price: 70,
        highlight: true,
        features: [
            "Modern Website Design",
            "Responsive Web Design",
            "SEO Optimization",
            "Custom Features & Design",
            "Fast, Secure & Reliable",
            "Support 24/7",
        ],
    },
    {
        name: "Emerald",
        regular: 200,
        price: 100,
        features: [
            "SEO (On-page & Technical)",
            "Google Ads Campaign Setup",
            "Facebook Ads Campaign Setup",
            "Social Media Setup & Branding",
            "Email Marketing Campaigns",
            "Support - 24/7",
        ],
    },
];

export default function Packages() {
    const [billing, setBilling] = useState<"monthly" | "yearly">("yearly");

    return (
        <section className="py-16 bg-gradient-to-b from-black via-gray-900 to-black text-white">
            <div className="max-w-6xl mx-auto text-center mb-10">
                <h2 className="text-4xl font-bold">Our Packages</h2>
                <div className="mt-6 flex justify-center space-x-2 bg-gray-800 rounded-full p-1 w-fit mx-auto">
                    <button
                        className={`px-4 py-1 text-sm rounded-full ${billing === "monthly" ? "bg-purple-600" : ""
                            }`}
                        onClick={() => setBilling("monthly")}
                    >
                        Monthly
                    </button>
                    <button
                        className={`px-4 py-1 text-sm rounded-full ${billing === "yearly" ? "bg-purple-600" : ""
                            }`}
                        onClick={() => setBilling("yearly")}
                    >
                        Yearly
                    </button>
                </div>
            </div>

            <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
                {packages.map((pkg, i) => (
                    <motion.div
                        key={i}
                        whileHover={{ scale: 1.05 }}
                        className={`${pkg.highlight
                            ? "bg-gradient-to-b shadow-lg"
                            : "bg-gray-900"
                            } rounded-2xl p-[1px]`}
                    >
                        <Card className="bg-black/80 text-white rounded-2xl border-none h-full flex flex-col">
                            <CardHeader className="text-center">
                                <h3 className="text-xl font-semibold">{pkg.name}</h3>
                                <p className="text-gray-400 line-through">
                                    Regular Price ${pkg.regular}
                                </p>
                                <p className="text-4xl font-bold">${pkg.price}</p>
                                <p className="text-sm text-gray-400">Offer Price</p>
                            </CardHeader>
                            <CardContent className="flex flex-col flex-grow">
                                <Button
                                    variant={pkg.highlight ? "secondary" : "outline"}
                                    className="w-full mb-6"
                                >
                                    Get Started
                                </Button>
                                <ul className="space-y-3 text-left">
                                    {pkg.features.map((f, idx) => (
                                        <li key={idx} className="flex items-start gap-2 text-sm">
                                            <span className="text-purple-400">✦</span>
                                            {f}
                                        </li>
                                    ))}
                                </ul>
                            </CardContent>
                        </Card>
                    </motion.div>
                ))}
            </div>
        </section>
    );
}
