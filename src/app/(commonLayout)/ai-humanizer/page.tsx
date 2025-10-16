"use client"
import { useTheme } from 'next-themes';
import Image from 'next/image';
import circleBg from "../../../../public/resources/images/circle-bg.png";
import React, { useState, useEffect, useRef } from 'react'
import { BsStars } from 'react-icons/bs';
import { apiClient } from '@/lib/api-client';
import { toast } from 'sonner';
import { AlertCircle, Copy, Check, LogIn, Trash2, Sparkles, WifiOff, Clock, Server, CreditCard } from 'lucide-react';
import { useRouter } from 'next/navigation';

// Dropdown options
const TONES = [
    { value: 'professional', label: 'Professional' },
    { value: 'casual', label: 'Casual' },
    { value: 'friendly', label: 'Friendly' },
    { value: 'formal', label: 'Formal' },
    { value: 'persuasive', label: 'Persuasive' },
];

const PURPOSES = [
    { value: 'essay', label: 'Essay' },
    { value: 'article', label: 'Article' },
    { value: 'blog', label: 'Blog Post' },
    { value: 'email', label: 'Email' },
    { value: 'report', label: 'Report' },
    { value: 'creative', label: 'Creative Writing' },
];

const LANGUAGES = [
    { value: 'english', label: 'English' },
    { value: 'spanish', label: 'Spanish' },
    { value: 'french', label: 'French' },
    { value: 'german', label: 'German' },
];

// Sample demo text
const SAMPLE_TEXT = "Artificial intelligence is revolutionizing the modern world. Machine learning algorithms can analyze vast amounts of data and make predictions with unprecedented accuracy. AI-powered systems are being deployed across various industries, from healthcare to finance, transforming the way we work and live. The technology continues to evolve rapidly, opening up new possibilities and challenges for society.";

const AiHumanizer = () => {
    const { theme } = useTheme();
    const router = useRouter();
    
    // State management
    const [originalText, setOriginalText] = useState('');
    const [humanizedText, setHumanizedText] = useState('');
    const [aiScore, setAiScore] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [wordLimit, setWordLimit] = useState<number | null>(null);
    
    // Dropdown selections
    const [tone, setTone] = useState('professional');
    const [purpose, setPurpose] = useState('essay');
    const [language, setLanguage] = useState('english');
    
    // Enhanced error handling with type
    const [error, setError] = useState<{ message: string; type: string } | null>(null);

    // Auto-save timer ref
    const autoSaveTimer = useRef<NodeJS.Timeout | null>(null);

    // Check authentication and load saved data on mount
    useEffect(() => {
        const token = localStorage.getItem('access_token');
        setIsAuthenticated(!!token);
        
        const savedText = localStorage.getItem('ai_humanizer_draft');
        if (savedText) {
            setOriginalText(savedText);
        }
        
        setWordLimit(5000);
    }, []);

    // Auto-save to localStorage
    useEffect(() => {
        if (autoSaveTimer.current) {
            clearTimeout(autoSaveTimer.current);
        }

        autoSaveTimer.current = setTimeout(() => {
            if (originalText) {
                localStorage.setItem('ai_humanizer_draft', originalText);
            }
        }, 1000);

        return () => {
            if (autoSaveTimer.current) {
                clearTimeout(autoSaveTimer.current);
            }
        };
    }, [originalText]);

    // Keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === 'Enter') {
                e.preventDefault();
                if (originalText.trim() && !loading) {
                    handleHumanize();
                }
            }
            
            if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
                e.preventDefault();
                handleClear();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [originalText, loading]);

    // Handle humanize action with comprehensive error handling
    const handleHumanize = async () => {
        // Check authentication first
        if (!isAuthenticated) {
            setError({
                message: 'Please sign in to use the AI Humanizer. Create a free account to get started and transform your AI-generated content into natural, human-like text.',
                type: 'auth'
            });
            toast.error('Authentication required');
            return;
        }

        // Validation
        if (!originalText.trim()) {
            toast.error('Please enter some text to humanize');
            return;
        }

        const wordCount = originalText.trim().split(/\s+/).length;
        if (wordCount < 10) {
            toast.error('Please enter at least 10 words');
            return;
        }

        setLoading(true);
        setError(null);
        setHumanizedText('');
        setAiScore(null);

        try {
            const response = await apiClient.post('core/humanizer/models/supernova/', {
                text: originalText,
                tone,
                purpose,
                shouldStream: false,
                language
            });

            console.log('🔍 Full API Response:', response);
            console.log('📝 Content:', response.content);
            console.log('📊 AI Score:', response.ai_score);

            if (response.content) {
                setHumanizedText(response.content);
                setAiScore(response.ai_score);
                toast.success('Text humanized successfully!');
            } else {
                throw new Error('No content returned from API');
            }
        } catch (err: any) {
            // ✅ COMPREHENSIVE ERROR LOGGING
            console.group('🔴 ERROR DETAILS');
            console.log('1️⃣ Full Error Object:', err);
            console.log('2️⃣ Error Type:', typeof err);
            console.log('3️⃣ Error Name:', err.name);
            console.log('4️⃣ Error Message:', err.message);
            console.log('5️⃣ Error Stack:', err.stack);
            console.log('6️⃣ Has response property?:', 'response' in err);
            console.log('7️⃣ Response exists?:', !!err.response);
            console.log('8️⃣ Response value:', err.response);
            console.log('9️⃣ Response type:', typeof err.response);
            
            if (err.response) {
                console.log('🔟 Response.status:', err.response.status);
                console.log('1️⃣1️⃣ Response.data:', err.response.data);
                console.log('1️⃣2️⃣ Response.data type:', typeof err.response.data);
                
                if (err.response.data) {
                    console.log('1️⃣3️⃣ data.status:', err.response.data.status);
                    console.log('1️⃣4️⃣ data.message:', err.response.data.message);
                    console.log('1️⃣5️⃣ data.user_message:', err.response.data.user_message);
                    console.log('1️⃣6️⃣ data keys:', Object.keys(err.response.data));
                }
            }
            console.groupEnd();
            
            const status = err.response?.status;
            const errorData = err.response?.data;
            
            // Extract user_message from backend error structure
            const userMessage = errorData?.user_message || errorData?.message;
            const developerMessage = errorData?.message;
            
            console.log('📊 Status:', status);
            console.log('💬 User Message:', userMessage);
            console.log('🔧 Developer Message:', developerMessage);
            console.log('📦 Full Error Data:', errorData);
            
            // Handle specific HTTP status codes from backend
            if (status === 400) {
                setError({
                    message: userMessage || 'Please provide the text you want to humanize.',
                    type: 'validation'
                });
                toast.error('Invalid input');
            }
            else if (status === 401) {
                setError({
                    message: userMessage || 'Your session has expired. Please log in again.',
                    type: 'auth'
                });
                toast.error('Session expired');
                setIsAuthenticated(false);
                localStorage.removeItem('access_token');
            }
            else if (status === 402) {
                setError({
                    message: userMessage || "You don't have enough credits. Please upgrade your plan.",
                    type: 'payment'
                });
                toast.error('Insufficient credits');
            }
            else if (status === 403) {
                setError({
                    message: userMessage || 'You have exceeded your word limit or this feature is not available in your plan.',
                    type: 'forbidden'
                });
                toast.error('Access denied');
            }
            else if (status === 404) {
                setError({
                    message: userMessage || 'Your account setup is incomplete. Please contact support.',
                    type: 'not_found'
                });
                toast.error('Account setup required');
            }
            else if (status === 500) {
                setError({
                    message: userMessage || 'The humanization service encountered an error. Please try again later.',
                    type: 'server'
                });
                toast.error('Server error');
            }
            else if (status === 503) {
                setError({
                    message: userMessage || 'Unable to connect to the humanization service. Please check your internet connection.',
                    type: 'connection'
                });
                toast.error('Connection error');
            }
            else if (status === 504) {
                setError({
                    message: userMessage || 'The request is taking too long. Please try again with shorter text.',
                    type: 'timeout'
                });
                toast.error('Request timeout');
            }
            else if (!err.response) {
                setError({
                    message: 'Network error. Please check your internet connection and try again.',
                    type: 'network'
                });
                toast.error('Network error');
            }
            else {
                setError({
                    message: userMessage || err.message || 'Failed to humanize text. Please try again later.',
                    type: 'generic'
                });
                toast.error('An error occurred');
            }
        } finally {
            setLoading(false);
        }
    };

    // Handle copy to clipboard
    const handleCopy = () => {
        if (humanizedText) {
            navigator.clipboard.writeText(humanizedText);
            setCopied(true);
            toast.success('Copied to clipboard!');
            setTimeout(() => setCopied(false), 2000);
        }
    };

    // Handle clear all
    const handleClear = () => {
        setOriginalText('');
        setHumanizedText('');
        setAiScore(null);
        setError(null);
        localStorage.removeItem('ai_humanizer_draft');
        toast.success('Text cleared');
    };

    // Handle try sample
    const handleTrySample = () => {
        setOriginalText(SAMPLE_TEXT);
        toast.success('Sample text loaded! Click "Humanize" to see it in action.');
    };

    // Calculate word count
    const getWordCount = (text: string) => {
        return text.trim().split(/\s+/).filter(w => w).length;
    };

    // Get word count color based on limit
    const getWordCountColor = () => {
        if (!wordLimit) return '';
        const count = getWordCount(originalText);
        const percentage = (count / wordLimit) * 100;
        
        if (percentage >= 100) return 'text-red-500';
        if (percentage >= 80) return 'text-yellow-500';
        return theme === 'light' ? 'text-gray-600' : 'text-gray-400';
    };

    // Get error icon based on type
    const getErrorIcon = (type: string) => {
        switch (type) {
            case 'auth':
                return <LogIn size={24} />;
            case 'payment':
                return <CreditCard size={24} />;
            case 'connection':
            case 'network':
                return <WifiOff size={24} />;
            case 'timeout':
                return <Clock size={24} />;
            case 'server':
                return <Server size={24} />;
            default:
                return <AlertCircle size={24} />;
        }
    };

    // Get error title based on type
    const getErrorTitle = (type: string) => {
        switch (type) {
            case 'auth':
                return 'Sign In Required';
            case 'payment':
                return 'Insufficient Credits';
            case 'timeout':
                return 'Request Timeout';
            case 'connection':
            case 'network':
                return 'Connection Error';
            case 'server':
                return 'Server Error';
            case 'forbidden':
                return 'Access Denied';
            case 'not_found':
                return 'Account Setup Required';
            default:
                return 'Error';
        }
    };

    // Get error color based on type
    const getErrorColor = (type: string) => {
        if (type === 'auth') {
            return theme === 'light' 
                ? { bg: 'bg-blue-50', border: 'border-blue-300', text: 'text-blue-800', subtext: 'text-blue-700', icon: 'text-blue-600' }
                : { bg: 'bg-blue-900/20', border: 'border-blue-500/30', text: 'text-blue-200', subtext: 'text-blue-300', icon: 'text-blue-400' };
        }
        return theme === 'light'
            ? { bg: 'bg-red-50', border: 'border-red-300', text: 'text-red-800', subtext: 'text-red-700', icon: 'text-red-600' }
            : { bg: 'bg-red-900/20', border: 'border-red-500/30', text: 'text-red-200', subtext: 'text-red-300', icon: 'text-red-400' };
    };

    // Calculate AI score color
    const getAiScoreColor = (score: number | null) => {
        if (score === null) return 'text-gray-400';
        return 'text-green-400';
    };

    // Calculate AI percentage
    const getAiPercentage = (score: number | null) => {
        if (score === null) return '0%';
        const percentage = Math.round((score / 2.0) * 5);
        return `${percentage}%`;
    };

    return (
        <div suppressHydrationWarning className={`py-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            {/* Header */}
            <div className="w-full lg:w-3/5 mx-auto text-center px-4">
                <h1 className='text-2xl md:text-4xl font-bold bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent'>
                    Humanize Your Text & Make it Undetectable
                </h1>
                <p className='text-xs md:text-lg mt-4'>
                    Type your text below, and watch it transform into a more natural, human-like version.
                </p>
            </div>

            {/* Dropdowns & Action Buttons */}
            <div className='w-full lg:w-4/5 mx-auto px-4 py-8'>
                <div className="flex flex-wrap justify-center gap-4">
                    <select
                        value={tone}
                        onChange={(e) => setTone(e.target.value)}
                        className={`select w-full sm:w-44 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-[#1a1a1a] text-white border-gray-700'} border-2`}
                    >
                        <option disabled>Writing Tone</option>
                        {TONES.map(t => (
                            <option key={t.value} value={t.value}>{t.label}</option>
                        ))}
                    </select>

                    <select
                        value={purpose}
                        onChange={(e) => setPurpose(e.target.value)}
                        className={`select w-full sm:w-44 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-[#1a1a1a] text-white border-gray-700'} border-2`}
                    >
                        <option disabled>Content Type</option>
                        {PURPOSES.map(p => (
                            <option key={p.value} value={p.value}>{p.label}</option>
                        ))}
                    </select>

                    <select
                        value={language}
                        onChange={(e) => setLanguage(e.target.value)}
                        className={`select w-full sm:w-44 ${theme === 'light' ? 'bg-white text-black border-gray-300' : 'bg-[#1a1a1a] text-white border-gray-700'} border-2`}
                    >
                        <option disabled>Language</option>
                        {LANGUAGES.map(l => (
                            <option key={l.value} value={l.value}>{l.label}</option>
                        ))}
                    </select>
                </div>

                {/* Action Buttons Row */}
                <div className="flex flex-wrap justify-center gap-3 mt-4">
                    <button
                        onClick={handleTrySample}
                        disabled={loading}
                        className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                            theme === 'light'
                                ? 'border-purple-600 text-purple-600 hover:bg-purple-50'
                                : 'border-purple-400 text-purple-400 hover:bg-purple-900/20'
                        } disabled:opacity-50`}
                    >
                        <Sparkles size={16} />
                        Try Sample
                    </button>

                    {originalText && (
                        <button
                            onClick={handleClear}
                            disabled={loading}
                            className={`flex items-center gap-2 px-4 py-2 rounded-lg border-2 text-sm font-semibold transition-all ${
                                theme === 'light'
                                    ? 'border-red-600 text-red-600 hover:bg-red-50'
                                    : 'border-red-400 text-red-400 hover:bg-red-900/20'
                            } disabled:opacity-50`}
                        >
                            <Trash2 size={16} />
                            Clear All
                        </button>
                    )}
                </div>
            </div>

            {/* Enhanced Error Display */}
            {error && (
                <div className="w-full lg:w-4/5 mx-auto px-4 mb-4">
                    <div className={`p-6 rounded-xl border flex flex-col gap-4 ${getErrorColor(error.type).bg} ${getErrorColor(error.type).border}`}>
                        <div className="flex items-start gap-3">
                            <div className={`flex-shrink-0 mt-0.5 ${getErrorColor(error.type).icon}`}>
                                {getErrorIcon(error.type)}
                            </div>
                            <div className="flex-1">
                                <p className={`font-semibold mb-2 text-base ${getErrorColor(error.type).text}`}>
                                    {getErrorTitle(error.type)}
                                </p>
                                <p className={`text-sm leading-relaxed ${getErrorColor(error.type).subtext}`}>
                                    {error.message}
                                </p>
                            </div>
                        </div>
                        
                        {/* Action buttons based on error type */}
                        {error.type === 'auth' && (
                            <div className="flex flex-wrap gap-3">
                                <button
                                    onClick={() => router.push('/login')}
                                    className={`flex items-center gap-2 px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                        theme === 'light' 
                                            ? 'bg-blue-600 text-white hover:bg-blue-700' 
                                            : 'bg-blue-500 text-white hover:bg-blue-600'
                                    }`}
                                >
                                    <LogIn size={18} />
                                    Sign In
                                </button>
                                <button
                                    onClick={() => router.push('/signup')}
                                    className={`px-6 py-2.5 rounded-lg font-semibold text-sm border-2 transition-all ${
                                        theme === 'light'
                                            ? 'border-blue-600 text-blue-600 hover:bg-blue-50'
                                            : 'border-blue-400 text-blue-400 hover:bg-blue-900/20'
                                    }`}
                                >
                                    Create Free Account
                                </button>
                            </div>
                        )}
                        
                        {error.type === 'payment' && (
                            <button
                                onClick={() => router.push('/pricing')}
                                className={`px-6 py-2.5 rounded-lg font-semibold text-sm transition-all ${
                                    theme === 'light'
                                        ? 'bg-purple-600 text-white hover:bg-purple-700'
                                        : 'bg-purple-500 text-white hover:bg-purple-600'
                                }`}
                            >
                                Upgrade Plan
                            </button>
                        )}
                    </div>
                </div>
            )}

            {/* Main Content Area */}
            <div className={`relative w-full lg:w-4/5 mx-auto py-10 lg:py-20 px-4 md:px-8 min-h-[700px] flex flex-col items-center justify-center ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
                <div className="absolute inset-0 z-0 opacity-30">
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-center"
                    />
                </div>
                
                <div className="relative z-10 w-full flex flex-col gap-8">
                    <div className="flex flex-col lg:flex-row gap-8 w-full">
                        {/* Original Text Input */}
                        <div className="flex-1">
                            <div className={`border border-[#524F4F]/40 rounded-2xl shadow-xl p-6 flex flex-col gap-4 h-[480px] ${theme === 'light' ? 'bg-white/90 text-black backdrop-blur-sm' : 'bg-[#010006]/90 text-white backdrop-blur-sm'}`}>
                                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 rounded-full bg-blue-500 shadow-md"></span>
                                        <span className="font-semibold tracking-wide">Original Text</span>
                                    </div>
                                    <span className={`text-xs px-3 py-1 rounded-full font-semibold ${getWordCountColor()} ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'}`}>
                                        {getWordCount(originalText)} Words
                                    </span>
                                </div>
                                
                                <textarea
                                    value={originalText}
                                    onChange={(e) => setOriginalText(e.target.value)}
                                    placeholder="Paste or type your AI-generated text here... (Press Ctrl/Cmd + K to clear)"
                                    className={`w-full flex-1 text-sm leading-relaxed resize-none focus:outline-none overflow-y-auto ${theme === 'light' ? 'bg-transparent text-black placeholder-gray-400' : 'bg-transparent text-white placeholder-gray-500'}`}
                                    disabled={loading}
                                />

                                <div className="flex gap-2 flex-wrap flex-shrink-0">
                                    <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                        Bypasses Turnitin
                                    </span>
                                    <span className="flex items-center gap-1.5 text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/30">
                                        <span className="w-1.5 h-1.5 rounded-full bg-green-400"></span>
                                        Bypasses GPTZero
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Humanized Text Output */}
                        <div className="flex-1">
                            <div className={`border border-[#51E688]/30 rounded-2xl shadow-xl p-6 flex flex-col gap-4 h-[480px] ${theme === 'light' ? 'bg-white/90 text-black backdrop-blur-sm' : 'bg-[#010006]/90 text-white backdrop-blur-sm'}`}>
                                <div className="flex items-center justify-between mb-2 flex-shrink-0">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 rounded-full bg-green-400 shadow-md"></span>
                                        <span className="font-semibold tracking-wide">Humanized Text</span>
                                    </div>
                                    <div className="flex items-center gap-2">
                                        {aiScore !== null && (
                                            <span className={`text-xs px-3 py-1 rounded-full border font-semibold ${getAiScoreColor(aiScore)} ${theme === 'light' ? 'bg-gray-100' : 'bg-gray-800'} border-current`}>
                                                {getAiPercentage(aiScore)} AI
                                            </span>
                                        )}
                                        {humanizedText && (
                                            <button
                                                onClick={handleCopy}
                                                className={`p-2 rounded-lg transition-all ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-gray-800'}`}
                                                title="Copy to clipboard"
                                            >
                                                {copied ? <Check size={18} className="text-green-500" /> : <Copy size={18} />}
                                            </button>
                                        )}
                                    </div>
                                </div>
                                
                                <div className="flex-1 overflow-y-auto">
                                    {loading ? (
                                        <div className="flex flex-col items-center justify-center h-full">
                                            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#7a73e8] mb-4"></div>
                                            <p className="text-sm text-gray-400">Humanizing your text...</p>
                                        </div>
                                    ) : humanizedText ? (
                                        <p className="text-sm leading-relaxed whitespace-pre-wrap">
                                            {humanizedText}
                                        </p>
                                    ) : (
                                        <div className="flex items-center justify-center h-full">
                                            <p className="text-sm text-gray-400 text-center">
                                                Your humanized text will appear here
                                            </p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Humanize Button & Keyboard Hint */}
                    <div className="flex flex-col items-center gap-3">
                        <button
                            onClick={handleHumanize}
                            disabled={loading || !originalText.trim()}
                            className="flex gap-2 items-center px-8 py-3 rounded-full bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] border-4 border-[#A69CD4] shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg font-bold text-white tracking-wide disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                        >
                            {loading ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                                    Processing...
                                </>
                            ) : (
                                <>
                                    <BsStars className="text-white drop-shadow-[0_2px_8px_rgba(202,169,211,0.5)]" />
                                    Humanize
                                </>
                            )}
                        </button>
                        
                        {!loading && originalText && (
                            <p className={`text-xs ${theme === 'light' ? 'text-gray-500' : 'text-gray-500'}`}>
                                Press <kbd className="px-2 py-1 rounded bg-gray-700 text-white text-xs">Ctrl</kbd> + <kbd className="px-2 py-1 rounded bg-gray-700 text-white text-xs">Enter</kbd> to humanize
                            </p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default AiHumanizer;
