"use client"
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { LogIn, UserPlus, BookOpen } from "lucide-react";

interface BlogPost {
    id: number;
    title: string;
    description: string;
    category: string | null;
    image: string | null;
    created_at: string;
    updated_at: string;
}

interface BlogResponse {
    status: string;
    message: string;
    data: BlogPost[];
}

const BlogPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const [hoveredCard, setHoveredCard] = useState<number | null>(null);
    const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Fetch blog posts on mount
    useEffect(() => {
        const fetchBlogs = async () => {
            // ✅ Check authentication FIRST before making API call
            const token = localStorage.getItem('access_token');

            if (!token) {
                setIsAuthenticated(false);
                setError('authentication_required'); // Special error code
                setLoading(false);
                return; // ✅ Don't make API call if not authenticated
            }

            setIsAuthenticated(true);

            try {
                setLoading(true);
                const response: BlogResponse = await apiClient.get('admin_dashboard/list-blogs/');
                if (response.status === 'success' && response.data) {
                    setBlogPosts(response.data);
                    setError(null); // Clear any previous errors
                }
            } catch (err: any) {
                if (err.response?.status === 401) {
                    setIsAuthenticated(false);
                    setError('authentication_required');
                    localStorage.removeItem('access_token'); // Clear invalid token
                } else {
                    setError('Failed to load blog posts');
                }
            } finally {
                setLoading(false);
            }
        };

        fetchBlogs();
    }, []);

    // Gradient rotation for visual variety
    const gradients = [
        "from-purple-600 via-blue-600 to-cyan-600",
        "from-pink-600 via-red-600 to-orange-600",
        "from-green-600 via-teal-600 to-blue-600",
        "from-yellow-600 via-orange-600 to-red-600",
    ];

    const getGradient = (index: number) => gradients[index % gradients.length];

    // Format category with default
    const formatCategory = (category: string | null) => {
        return category || "AI & Technology";
    };

    // Check if error is authentication related
    const isAuthError = error === 'authentication_required';

    return (
        <div suppressHydrationWarning className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-cyan-500/5 rounded-full blur-3xl animate-pulse delay-500"></div>
            </div>

            <div className="relative z-10">
                {/* Header */}
                <header className="pt-12 pb-8 px-6">
                    <div className="max-w-7xl mx-auto text-center">
                        <h1 className="text-3xl md:text-5xl font-bold mb-4 leading-tight bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent">
                            Explore Our Blog
                        </h1>
                        <p className={`text-lg md:text-xl max-w-3xl mx-auto leading-relaxed ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            Dive into informative articles, expert opinions, and updates on all things AI and learning.
                        </p>
                    </div>
                </header>

                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center py-20">
                        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a73e8]"></div>
                    </div>
                )}

                {/* Authentication Required Error - Beautiful Sign In/Sign Up Prompt */}
                {!loading && isAuthError && (
                    <div className="max-w-4xl mx-auto px-6 py-16">
                        <div className={`relative rounded-3xl p-8 md:p-12 border overflow-hidden ${theme === 'light'
                                ? 'bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200'
                                : 'bg-gradient-to-br from-gray-900/50 to-purple-900/20 border-purple-500/30'
                            }`}>
                            {/* Animated background gradient */}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#CAA9D3]/10 via-[#828ED6]/10 to-[#B7D6EF]/10 animate-pulse"></div>

                            <div className="relative z-10 text-center">
                                {/* Icon */}
                                <div className="flex justify-center mb-6">
                                    <div className={`p-6 rounded-full bg-gradient-to-br from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] shadow-lg`}>
                                        <BookOpen size={48} className="text-white" />
                                    </div>
                                </div>

                                {/* Heading */}
                                <h2 className="text-2xl md:text-3xl font-bold mb-4 bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent">
                                    Sign In to Access Our Blog
                                </h2>

                                {/* Description */}
                                <p className={`text-base md:text-lg mb-8 max-w-2xl mx-auto ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'
                                    }`}>
                                    Unlock access to exclusive articles, expert insights, and AI-powered content.
                                    Join our community to stay updated with the latest in AI and technology.
                                </p>

                                {/* Buttons */}
                                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                                    <button
                                        onClick={() => router.push('/login')}
                                        className="group relative px-8 py-4 rounded-xl bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] text-white font-bold text-lg shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:scale-105 flex items-center gap-3"
                                    >
                                        <LogIn size={24} className="group-hover:rotate-12 transition-transform duration-300" />
                                        Sign In
                                    </button>

                                    <button
                                        onClick={() => router.push('/signup')}
                                        className={`px-8 py-4 rounded-xl border-2 font-bold text-lg transition-all duration-300 transform hover:scale-105 flex items-center gap-3 ${theme === 'light'
                                                ? 'border-purple-600 text-purple-600 hover:bg-purple-50'
                                                : 'border-purple-400 text-purple-400 hover:bg-purple-900/20'
                                            }`}
                                    >
                                        <UserPlus size={24} />
                                        Create Account
                                    </button>
                                </div>

                                {/* Additional Info */}
                                <p className={`text-sm mt-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    Already have an account? Sign in to continue reading.
                                </p>
                            </div>

                            {/* Decorative elements */}
                            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#CAA9D3]/20 to-transparent rounded-full blur-2xl"></div>
                            <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#B7D6EF]/20 to-transparent rounded-full blur-2xl"></div>
                        </div>
                    </div>
                )}

                {/* Other Errors (Network, Server, etc.) */}
                {!loading && error && !isAuthError && (
                    <div className="max-w-7xl mx-auto px-6 py-10">
                        <div className={`p-6 rounded-xl border ${theme === 'light' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-red-900/20 border-red-500/30 text-red-300'}`}>
                            <p className="text-center font-semibold mb-2">Error</p>
                            <p className="text-center">{error}</p>
                        </div>
                    </div>
                )}

                {/* Blog Grid */}
                {!loading && !error && isAuthenticated && (
                    <main className="px-6 pb-20">
                        <div className="max-w-7xl mx-auto">
                            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                                {blogPosts.map((post, index) => (
                                    <article
                                        key={post.id}
                                        className={`group relative transform transition-all duration-700 hover:scale-105 ${hoveredCard === post.id ? 'z-20' : 'z-10'}`}
                                        onMouseEnter={() => setHoveredCard(post.id)}
                                        onMouseLeave={() => setHoveredCard(null)}
                                        style={{
                                            animationDelay: `${index * 100}ms`
                                        }}
                                    >
                                        {/* Card container with FIXED HEIGHT */}
                                        <div className={`relative rounded-3xl p-4 border border-gray-700/50 overflow-hidden transition-all duration-700 group-hover:border-gray-600/80 group-hover:shadow-2xl group-hover:shadow-purple-500/20 h-[480px] flex flex-col ${theme === 'light' ? 'bg-white text-black' : 'bg-[#1a1a1a] text-white'}`}>

                                            {/* Animated gradient overlay on hover */}
                                            <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-10 transition-opacity duration-700 rounded-3xl`}></div>

                                            {/* Content */}
                                            <div className="relative z-10 flex flex-col h-full">
                                                {/* Image or Gradient Header - FIXED HEIGHT */}
                                                <div className={`w-full h-48 flex-shrink-0 rounded-2xl mb-4 overflow-hidden transition-transform duration-700 group-hover:scale-105 relative`}>
                                                    {post.image ? (
                                                        <Image
                                                            src={post.image}
                                                            width={400}
                                                            height={200}
                                                            alt={post.title}
                                                            // fill
                                                            className="object-cover"
                                                        // sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                                                        />
                                                    ) : (
                                                        <div className={`w-full h-full bg-gradient-to-br ${getGradient(index)} flex items-center justify-center`}>
                                                            <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center transition-transform duration-500 group-hover:rotate-12">
                                                                <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 20 20">
                                                                    <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                                                </svg>
                                                            </div>
                                                        </div>
                                                    )}
                                                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                                                </div>

                                                {/* Category tag */}
                                                <div className="mb-3 flex-shrink-0">
                                                    <span className={`inline-block px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-500 ${theme === 'light' ? 'bg-gray-100 border-gray-300 text-gray-700' : 'bg-gray-700/60 border-gray-600/30 text-gray-300'} group-hover:border-[#7a73e8] group-hover:text-[#7a73e8]`}>
                                                        {formatCategory(post.category)}
                                                    </span>
                                                </div>

                                                {/* Title - FIXED 2 LINES */}
                                                <h2 className="text-xl font-bold mb-3 leading-tight transition-all duration-500 line-clamp-2 h-14 flex-shrink-0 group-hover:bg-gradient-to-r group-hover:from-[#CAA9D3] group-hover:to-[#B7D6EF] group-hover:bg-clip-text group-hover:text-transparent">
                                                    {post.title}
                                                </h2>

                                                {/* Description - FIXED 3 LINES */}
                                                <p className={`text-sm leading-relaxed mb-4 line-clamp-3 h-[60px] flex-shrink-0 transition-colors duration-500 ${theme === 'light' ? 'text-gray-600 group-hover:text-gray-700' : 'text-gray-400 group-hover:text-gray-300'}`}>
                                                    {post.description}
                                                </p>

                                                {/* Spacer to push button to bottom */}
                                                <div className="flex-grow"></div>

                                                {/* Read more button - ALWAYS AT BOTTOM */}
                                                <Link href={`/blogs/${post.id}`} className="mt-4 flex-shrink-0">
                                                    <div className="opacity-0 group-hover:opacity-100 transform translate-y-4 group-hover:translate-y-0 transition-all duration-500">
                                                        <button className={`w-full px-6 py-2.5 bg-gradient-to-r ${getGradient(index)} text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105 text-sm`}>
                                                            Read More
                                                        </button>
                                                    </div>
                                                </Link>
                                            </div>

                                            {/* Glowing border effect on hover */}
                                            <div className={`absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700 bg-gradient-to-r ${getGradient(index)} p-[1px] pointer-events-none`}>
                                                <div className={`w-full h-full rounded-3xl ${theme === 'light' ? 'bg-white' : 'bg-[#1a1a1a]'}`}></div>
                                            </div>
                                        </div>

                                        {/* Floating shadow effect */}
                                        <div className={`absolute inset-0 bg-gradient-to-br ${getGradient(index)} opacity-0 group-hover:opacity-20 blur-xl transform scale-110 transition-all duration-700 rounded-3xl -z-10`}></div>
                                    </article>
                                ))}
                            </div>

                            {/* Empty State */}
                            {blogPosts.length === 0 && (
                                <div className="text-center py-20">
                                    <p className={`text-lg ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                        No blog posts available yet. Check back soon!
                                    </p>
                                </div>
                            )}
                        </div>
                    </main>
                )}
            </div>
        </div>
    );
};

export default BlogPage;
