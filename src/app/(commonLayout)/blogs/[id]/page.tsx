"use client";
import { useTheme } from "next-themes";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/api-client";
import { ArrowLeft, Calendar, Clock, Tag } from "lucide-react";
import { motion } from "framer-motion";

interface BlogDetail {
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
    data: BlogDetail;
}

const BlogDetailPage = () => {
    const { theme } = useTheme();
    const params = useParams();
    const router = useRouter();
    const blogId = params.id;

    const [blog, setBlog] = useState<BlogDetail | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch blog detail on mount
    useEffect(() => {
        const fetchBlogDetail = async () => {
            try {
                setLoading(true);
                const response: BlogResponse = await apiClient.get(`admin_dashboard/blog-details/${blogId}/`);
                if (response.status === 'success' && response.data) {
                    setBlog(response.data);
                }
            } catch (err: any) {
                console.error('Error fetching blog detail:', err);
                setError('Failed to load blog post');
            } finally {
                setLoading(false);
            }
        };

        if (blogId) {
            fetchBlogDetail();
        }
    }, [blogId]);

    // Format date
    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { 
            month: 'long', 
            day: 'numeric', 
            year: 'numeric' 
        });
    };

    // Format category
    const formatCategory = (category: string | null) => {
        return category || "AI & Technology";
    };

    // Calculate reading time (rough estimate: 200 words per minute)
    const calculateReadingTime = (text: string) => {
        const words = text.split(' ').length;
        const minutes = Math.ceil(words / 200);
        return `${minutes} min read`;
    };

    return (
        <div suppressHydrationWarning className={`min-h-screen ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            {/* Animated background elements */}
            <div className="fixed inset-0 overflow-hidden pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500/10 rounded-full blur-3xl animate-pulse"></div>
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
            </div>

            <div className="relative z-10">
                {/* Loading State */}
                {loading && (
                    <div className="flex justify-center items-center min-h-screen">
                        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-[#7a73e8]"></div>
                    </div>
                )}

                {/* Error State */}
                {error && (
                    <div className="max-w-4xl mx-auto px-6 py-20">
                        <div className={`p-8 rounded-2xl border text-center ${theme === 'light' ? 'bg-red-50 border-red-200 text-red-800' : 'bg-red-900/20 border-red-500/30 text-red-300'}`}>
                            <p className="text-lg mb-4">{error}</p>
                            <Link href="/blogs">
                                <button className="px-6 py-3 bg-gradient-to-r from-[#7a73e8] to-[#CAA9D3] text-white rounded-lg hover:opacity-90 transition-opacity">
                                    Back to Blogs
                                </button>
                            </Link>
                        </div>
                    </div>
                )}

                {/* Blog Content */}
                {!loading && !error && blog && (
                    <article className="max-w-4xl mx-auto px-6 py-12">
                        {/* Back Button */}
                        <motion.div
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            className="mb-8"
                        >
                            <Link href="/blogs">
                                <button className={`flex items-center gap-2 px-4 py-2 rounded-lg border transition-all duration-300 ${theme === 'light' ? 'border-gray-300 hover:bg-gray-100' : 'border-gray-700 hover:bg-gray-800'}`}>
                                    <ArrowLeft size={20} />
                                    <span>Back to Blogs</span>
                                </button>
                            </Link>
                        </motion.div>

                        {/* Category Badge */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.1 }}
                            className="mb-6"
                        >
                            <span className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold border ${theme === 'light' ? 'bg-gray-100 border-gray-300 text-gray-700' : 'bg-gray-700/60 border-gray-600/30 text-gray-300'}`}>
                                <Tag size={16} />
                                {formatCategory(blog.category)}
                            </span>
                        </motion.div>

                        {/* Title */}
                        <motion.h1
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.2 }}
                            className="text-3xl md:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent"
                        >
                            {blog.title}
                        </motion.h1>

                        {/* Meta Information */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.3 }}
                            className={`flex flex-wrap items-center gap-6 mb-8 pb-8 border-b ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}
                        >
                            <div className="flex items-center gap-2">
                                <Calendar size={18} className="text-[#7a73e8]" />
                                <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {formatDate(blog.created_at)}
                                </span>
                            </div>
                            <div className="flex items-center gap-2">
                                <Clock size={18} className="text-[#7a73e8]" />
                                <span className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                    {calculateReadingTime(blog.description)}
                                </span>
                            </div>
                        </motion.div>

                        {/* Featured Image */}
                        {blog.image && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative w-full h-[400px] md:h-[500px] rounded-2xl overflow-hidden mb-12 group"
                            >
                                <Image
                                    src={blog.image}
                                    alt={blog.title}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    sizes="(max-width: 768px) 100vw, 896px"
                                    priority
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                            </motion.div>
                        )}

                        {/* Gradient Header if no image */}
                        {!blog.image && (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                className="relative w-full h-[300px] md:h-[400px] rounded-2xl overflow-hidden mb-12 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600 flex items-center justify-center"
                            >
                                <div className="w-24 h-24 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                                    <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 20 20">
                                        <path d="M9 4.804A7.968 7.968 0 005.5 4c-1.255 0-2.443.29-3.5.804v10A7.969 7.969 0 015.5 14c1.669 0 3.218.51 4.5 1.385A7.962 7.962 0 0114.5 14c1.255 0 2.443.29 3.5.804v-10A7.968 7.968 0 0014.5 4c-1.255 0-2.443.29-3.5.804V12a1 1 0 11-2 0V4.804z" />
                                    </svg>
                                </div>
                            </motion.div>
                        )}

                        {/* Blog Content */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.5 }}
                            className={`prose prose-lg max-w-none mb-12 ${theme === 'light' ? 'prose-gray' : 'prose-invert'}`}
                        >
                            <div className={`text-lg leading-relaxed whitespace-pre-wrap ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                {blog.description}
                            </div>
                        </motion.div>

                        {/* Timestamps */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.6 }}
                            className={`pt-8 border-t ${theme === 'light' ? 'border-gray-200' : 'border-gray-700'}`}
                        >
                            <div className="flex flex-wrap gap-6 text-sm">
                                <div>
                                    <span className={`font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                        Published:
                                    </span>
                                    <span className={`ml-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                        {formatDate(blog.created_at)}
                                    </span>
                                </div>
                                {blog.updated_at !== blog.created_at && (
                                    <div>
                                        <span className={`font-semibold ${theme === 'light' ? 'text-gray-700' : 'text-gray-300'}`}>
                                            Last Updated:
                                        </span>
                                        <span className={`ml-2 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                            {formatDate(blog.updated_at)}
                                        </span>
                                    </div>
                                )}
                            </div>
                        </motion.div>

                        {/* Call to Action */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5, delay: 0.7 }}
                            className={`mt-12 p-8 rounded-2xl border ${theme === 'light' ? 'bg-gradient-to-br from-gray-50 to-white border-gray-200' : 'bg-gradient-to-br from-gray-900/50 to-gray-800/50 border-gray-700'}`}
                        >
                            <h3 className="text-2xl font-bold mb-4 bg-gradient-to-r from-[#CAA9D3] to-[#B7D6EF] bg-clip-text text-transparent">
                                Ready to Transform Your Content?
                            </h3>
                            <p className={`mb-6 ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                Experience the power of AI-driven content transformation with StarWriter.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link href="/ai-humanizer">
                                    <button className="px-6 py-3 bg-gradient-to-r from-[#7a73e8] to-[#CAA9D3] text-white font-semibold rounded-xl hover:shadow-lg hover:shadow-purple-500/25 transition-all duration-300 transform hover:scale-105">
                                        Try AI Humanizer
                                    </button>
                                </Link>
                                <Link href="/blogs">
                                    <button className={`px-6 py-3 border-2 font-semibold rounded-xl transition-all duration-300 ${theme === 'light' ? 'border-gray-300 hover:bg-gray-100' : 'border-gray-600 hover:bg-gray-800'}`}>
                                        Read More Articles
                                    </button>
                                </Link>
                            </div>
                        </motion.div>
                    </article>
                )}
            </div>
        </div>
    );
};

export default BlogDetailPage;
