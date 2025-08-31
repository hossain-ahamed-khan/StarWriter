"use client"
import { useTheme } from "next-themes";
import React, { useState } from "react";

const BlogPage = () => {
    const { theme } = useTheme();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);

    const blogPosts = [
        {
            id: 1,
            category: "AI & Technology",
            title: "How AI is Revolutionizing Text Humanization",
            description: "Explore how artificial intelligence is reshaping the way we interact with and refine text, making it sound more natural and human-like.",
            gradient: "from-purple-600 via-blue-600 to-cyan-600"
        },
        {
            id: 2,
            category: "AI & Technology",
            title: "The Future of Natural Language Processing",
            description: "Discover the latest breakthroughs in NLP technology and how they're transforming human-computer interactions.",
            gradient: "from-pink-600 via-red-600 to-orange-600"
        },
        {
            id: 3,
            category: "AI & Technology",
            title: "The Future of Natural Language Processing",
            description: "Discover the latest breakthroughs in NLP technology and how they're transforming human-computer interactions.",
            gradient: "from-pink-600 via-red-600 to-orange-600"
        },
        {
            id: 4,
            category: "AI & Technology",
            title: "The Future of Natural Language Processing",
            description: "Discover the latest breakthroughs in NLP technology and how they're transforming human-computer interactions.",
            gradient: "from-pink-600 via-red-600 to-orange-600"
        },

    ];

    return (
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="pt-4 pb-8 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-2xl md:text-4xl font-bold mb-4 leading-tight">
                            Explore Our Blog
                        </h1>
                        <p className="text-xl text-gray-400 mx-auto leading-relaxed">
                            Dive into informative articles, expert opinions, and updates on all things AI and learning.
                        </p>
                    </div>
                </header>

                {/* Blog Grid */}
                <main className="px-6 pb-20">
                    <div className="w-4/5 mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">
                            {blogPosts.map((post, index) => (
                                <article
                                    key={post.id}
                                    className={`group relative transform transition-all duration-700 hover:scale-105 ${hoveredCard === post.id ? 'z-20' : 'z-10'
                                        }`}
                                    onMouseEnter={() => setHoveredCard(post.id)}
                                    onMouseLeave={() => setHoveredCard(null)}
                                    style={{
                                        animationDelay: `${index * 100}ms`
                                    }}
                                >
                                    {/* Card container with hover effects */}
                                    <div className={`relative rounded-3xl p-4 border border-gray-700/50 overflow-hidden transition-all duration-700 group-hover:border-gray-600/80 group-hover:shadow-2xl group-hover:shadow-purple-500/20 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>

                                        {/* Animated gradient overlay on hover */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>

                                        {/* Floating particles effect */}
                                        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
                                            {[...Array(6)].map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="absolute w-1 h-1 bg-white rounded-full animate-pulse"
                                                    style={{
                                                        top: `${Math.random() * 100}%`,
                                                        left: `${Math.random() * 100}%`,
                                                        animationDelay: `${i * 200}ms`,
                                                        animationDuration: '2s'
                                                    }}
                                                ></div>
                                            ))}
                                        </div>

                                        {/* Content */}
                                        <div className="relative z-10">
                                            {/* Decorative gradient header */}
                                            <div className={`w-full h-24 bg-gradient-to-br ${post.gradient} rounded-2xl mb-6 flex items-center justify-center overflow-hidden transition-transform duration-700 group-hover:scale-105 relative`}>
                                                <div className="absolute inset-0 bg-black/20"></div>
                                                <div className="relative z-10 w-12 h-12 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                                                    <svg className="w-6 h-6 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                                    </svg>
                                                </div>
                                            </div>

                                            {/* Category tag with animated background */}
                                            <div className="inline-block mb-6 relative overflow-hidden rounded-full">
                                                <span className="relative z-10 bg-gray-700/60 backdrop-blur-sm px-4 py-2 rounded-full text-sm font-medium border border-gray-600/30 transition-all duration-500 group-hover:text-white group-hover:border-white/30">
                                                    {post.category}
                                                </span>
                                                <div className={`absolute inset-0 bg-gradient-to-r ${post.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-full`}></div>
                                            </div>

                                            {/* Title with gradient on hover */}
                                            <h2 className="text-xl font-bold mb-4 leading-tight transition-all duration-500 group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-gray-300 group-hover:bg-clip-text group-hover:text-transparent">
                                                {post.title}
                                            </h2>

                                            {/* Description */}
                                            <p className="text-gray-400 text-sm leading-relaxed transition-colors duration-500 group-hover:text-gray-300">
                                                {post.description}
                                            </p>

                                            {/* Read more button that appears on hover */}
                                            <div className="mt-6 opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                <button className={`px-6 py-3 bg-gradient-to-r ${post.gradient} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105`}>
                                                    Read More
                                                </button>
                                            </div>
                                        </div>

                                        {/* Glowing border effect on hover */}
                                        <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r ${post.gradient} p-[1px]`}>
                                            <div className="w-full h-full bg-gradient-to-br from-gray-900/95 via-gray-800/95 to-gray-900/95 rounded-3xl"></div>
                                        </div>
                                    </div>

                                    {/* Floating shadow effect */}
                                    <div className={`absolute inset-0 bg-gradient-to-br ${post.gradient} opacity-0 group-hover:opacity-20 blur-xl transform scale-110 transition-all duration-700 rounded-3xl -z-10`}></div>
                                </article>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default BlogPage;