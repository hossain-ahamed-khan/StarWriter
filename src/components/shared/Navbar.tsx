"use client";
import Image from 'next/image';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mainLogo from '../../../public/resources/images/main-logo.png';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useTheme } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { LogOut, User, Crown, AlertCircle, Calendar, Sparkles } from 'lucide-react';
import { apiClient } from '@/lib/api-client';

// Type definitions
interface SubscriptionData {
    has_subscription: boolean;
    subscription?: {
        stripe_subscription_id: string | null;
        tier: string;
        term: string;
        status: string;
        is_active: boolean;
        is_manual: boolean;
        manual_notes?: string;
        price_id?: string | null;
        current_period_end?: string;
    };
}

export const Navbar = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const [menuOpen, setMenuOpen] = React.useState(false);
    const [isAuthenticated, setIsAuthenticated] = React.useState(false);
    const [fullName, setFullName] = React.useState('');
    const [showDropdown, setShowDropdown] = React.useState(false);
    const [subscriptionData, setSubscriptionData] = React.useState<SubscriptionData | null>(null);
    const [loadingSubscription, setLoadingSubscription] = React.useState(false);

    // ✅ Fetch subscription status with cache busting
    const fetchSubscriptionStatus = async () => {
        try {
            setLoadingSubscription(true);
            const timestamp = new Date().getTime();
            const data = await apiClient.get(`payments/subscription-status/?t=${timestamp}`);
            console.log('Subscription status fetched:', data);
            setSubscriptionData(data);
        } catch (error) {
            console.error('Error fetching subscription:', error);
            setSubscriptionData(null);
        } finally {
            setLoadingSubscription(false);
        }
    };

    // ✅ Listen for subscription changes
    React.useEffect(() => {
        const handleSubscriptionChange = () => {
            console.log('🔄 Subscription changed event received, refreshing...');
            fetchSubscriptionStatus();
        };

        window.addEventListener('subscriptionChanged', handleSubscriptionChange);
        
        return () => {
            window.removeEventListener('subscriptionChanged', handleSubscriptionChange);
        };
    }, []);

    // Check authentication status on mount
    React.useEffect(() => {
        const checkAuth = () => {
            const token = localStorage.getItem('access_token');
            const name = localStorage.getItem('full_name');
            setIsAuthenticated(!!token);
            setFullName(name || 'User');

            if (token) {
                fetchSubscriptionStatus();
            }
        };

        checkAuth();

        window.addEventListener('storage', checkAuth);
        return () => window.removeEventListener('storage', checkAuth);
    }, []);

    // ✅ Refresh subscription when dropdown opens
    const handleDropdownToggle = () => {
        if (!showDropdown) {
            fetchSubscriptionStatus();
        }
        setShowDropdown(!showDropdown);
    };

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('user_role');
        localStorage.removeItem('full_name');
        
        setIsAuthenticated(false);
        setShowDropdown(false);
        setMenuOpen(false);
        setSubscriptionData(null);
        
        toast.success('Logged out successfully');
        router.push('/login');
    };

    // ✅ Updated: Check if user has valid paid subscription
    const hasActiveSubscription = () => {
        const sub = subscriptionData?.subscription;
        if (!sub) return false;

        // ✅ If it's a manual subscription, check tier/term
        if (sub.is_manual) {
            const validTiers = ['standard', 'pro'];
            const validTerms = ['monthly', 'annual'];

            return (
                sub.is_active === true &&
                sub.status === 'active' &&
                validTiers.includes(sub.tier?.toLowerCase() || '') &&
                validTerms.includes(sub.term?.toLowerCase() || '')
            );
        }

        // ✅ For Stripe subscriptions, check price_id is NOT free
        const priceId = sub.price_id?.toLowerCase() || '';
        const isFreePrice = priceId.includes('free') || priceId === '';

        const validTiers = ['standard', 'pro'];
        const validTerms = ['monthly', 'annual'];

        return (
            sub.is_active === true &&
            sub.status === 'active' &&
            !isFreePrice &&  // ✅ Exclude free price IDs
            validTiers.includes(sub.tier?.toLowerCase() || '') &&
            validTerms.includes(sub.term?.toLowerCase() || '')
        );
    };

    // ✅ Check if subscription is manual
    const isManualSubscription = () => {
        return subscriptionData?.subscription?.is_manual === true;
    };

    // Format subscription tier
    const formatTier = (tier?: string) => {
        if (!tier) return 'Free';
        return tier.charAt(0).toUpperCase() + tier.slice(1);
    };

    // Format subscription term
    const formatTerm = (term?: string) => {
        if (!term) return '';
        return term.charAt(0).toUpperCase() + term.slice(1);
    };

    // Format date
    const formatDate = (dateString?: string) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    // ✅ Get subscription badge color
    const getSubscriptionBadgeColor = () => {
        if (!hasActiveSubscription()) return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
        
        const tier = subscriptionData?.subscription?.tier?.toLowerCase();
        
        if (tier === 'pro') {
            return 'bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border-purple-500/30';
        }
        if (tier === 'standard') {
            return 'bg-blue-500/20 text-blue-300 border-blue-500/30';
        }
        
        return 'bg-gray-500/20 text-gray-400 border-gray-500/30';
    };

    // Close mobile menu when clicking outside
    React.useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuOpen && !(event.target as Element).closest('.mobile-menu')) {
                setMenuOpen(false);
            }
        };
        document.addEventListener('click', handleClickOutside);
        return () => document.removeEventListener('click', handleClickOutside);
    }, [menuOpen]);

    // Prevent body scroll when mobile menu is open
    React.useEffect(() => {
        if (menuOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'unset';
        }
        return () => {
            document.body.style.overflow = 'unset';
        };
    }, [menuOpen]);

    const navLinks = [
        { href: "/", label: "HOME" },
        { href: "/ai-humanizer", label: "AI HUMANIZER" },
        { href: "/ai-chat", label: "AI CHAT" },
        { href: "/blogs", label: "BLOGS" },
        { href: "/pricing", label: "PRICING" }
    ];

    return (
        <nav suppressHydrationWarning className={`sticky top-0 w-full z-50 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <h1 className={`text-lg sm:text-2xl lg:text-3xl font-bold font-sf-pro cursor-pointer transition-all duration-300 hover:scale-105 ${theme === 'light' ? 'text-[#c8a9e6]' : 'bg-gradient-to-r from-[#c8a9e6] to-white bg-clip-text text-transparent'}`}>
                                StarWriter
                            </h1>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden lg:flex items-center justify-center flex-1 mx-8">
                        <div className="flex items-center justify-between border border-[#3B3131]/30 px-4 xl:px-8 py-3 rounded-full bg-white/5 backdrop-blur-sm max-w-4xl w-full">

                            {/* Animated Logo */}
                            <motion.div
                                initial={{ rotate: 0, scale: 1, y: 0, x: 0 }}
                                animate={{
                                    rotate: [0, 10, -10, 0],
                                    scale: [1, 1.2, 1, 1.1, 1],
                                    y: [0, -10, 10, -5, 0],
                                    x: [0, 5, -5, 0],
                                    filter: [
                                        'drop-shadow(0 0 0 #fff)',
                                        'drop-shadow(0 0 10px #B7D6EF)',
                                        'drop-shadow(0 0 20px #CAA9D3)',
                                        'drop-shadow(0 0 10px #828ED6)',
                                        'drop-shadow(0 0 0 #fff)'
                                    ]
                                }}
                                transition={{
                                    duration: 2.5,
                                    repeat: Infinity,
                                    ease: 'easeInOut',
                                }}
                                whileHover={{ scale: 0.75, rotate: 15 }}
                                className="flex-shrink-0"
                            >
                                <Image
                                    src={mainLogo}
                                    width={24}
                                    height={32}
                                    alt="main Logo"
                                    className="w-auto h-auto select-none"
                                    style={{ width: 'auto', height: 'auto' }}
                                />
                            </motion.div>

                            {/* Navigation Links */}
                            <div className="flex items-center space-x-2 xl:space-x-4">
                                {navLinks.map((link, index) => (
                                    <Link key={link.href} href={link.href}>
                                        <motion.button
                                            whileHover={{ scale: 1.05 }}
                                            whileTap={{ scale: 0.95 }}
                                            className="relative px-3 xl:px-5 py-2 rounded-full transition-all duration-300 overflow-hidden group focus:outline-none cursor-pointer"
                                        >
                                            <span className={`absolute inset-0 bg-gradient-to-r ${index % 3 === 0 ? 'from-[#CAA9D3]/0 via-[#828ED6]/20 to-[#B7D6EF]/0' :
                                                index % 3 === 1 ? 'from-[#B7D6EF]/0 via-[#CAA9D3]/20 to-[#828ED6]/0' :
                                                    'from-[#828ED6]/0 via-[#B7D6EF]/20 to-[#CAA9D3]/0'
                                                } opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm`}></span>
                                            <span className="relative z-10 text-xs xl:text-sm font-sm">{link.label}</span>
                                        </motion.button>
                                    </Link>
                                ))}
                            </div>

                            {/* Auth Section - Desktop */}
                            {isAuthenticated ? (
                                <div className="relative flex-shrink-0">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        onClick={handleDropdownToggle}
                                        className="relative border border-[#7a73e8] rounded-full px-4 xl:px-6 py-2 transition-all duration-300 overflow-hidden group focus:outline-none cursor-pointer flex items-center gap-2"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-[#7a73e8]/0 via-[#7a73e8]/20 to-[#7a73e8]/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                                        <User size={16} className="relative z-10" />
                                        <span className="relative z-10 text-xs xl:text-sm font-medium max-w-[120px] truncate">
                                            {fullName}
                                        </span>
                                    </motion.button>

                                    {/* Desktop Dropdown */}
                                    <AnimatePresence>
                                        {showDropdown && (
                                            <>
                                                <motion.div
                                                    initial={{ opacity: 0, y: -10 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    exit={{ opacity: 0, y: -10 }}
                                                    className={`absolute right-0 mt-2 w-72 rounded-xl shadow-2xl overflow-hidden border ${theme === 'light' ? 'bg-white/95 border-gray-200/50' : 'bg-black/95 border-[#7a73e8]/30'} backdrop-blur-lg`}
                                                >
                                                    <div className={`px-4 py-3 border-b ${theme === 'light' ? 'border-gray-200/50' : 'border-[#7a73e8]/20'}`}>
                                                        <p className="text-sm font-semibold">{fullName}</p>
                                                        <p className="text-xs opacity-70 mt-1">
                                                            {localStorage.getItem('user_role') || 'User'}
                                                        </p>
                                                    </div>

                                                    {/* Subscription Info */}
                                                    <div className={`px-4 py-3 border-b ${theme === 'light' ? 'border-gray-200/50' : 'border-[#7a73e8]/20'}`}>
                                                        {loadingSubscription ? (
                                                            <p className="text-xs opacity-70">Loading...</p>
                                                        ) : hasActiveSubscription() ? (
                                                            <div className="space-y-2">
                                                                {/* Manual Badge */}
                                                                {isManualSubscription() && (
                                                                    <div className="flex items-center gap-1 mb-2">
                                                                        <Sparkles size={12} className="text-purple-400" />
                                                                        <span className="text-xs font-semibold text-purple-400">
                                                                            Manually Assigned
                                                                        </span>
                                                                    </div>
                                                                )}
                                                                
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-xs opacity-70">Plan</span>
                                                                    <span className="text-xs font-semibold flex items-center gap-1">
                                                                        <Crown size={12} className="text-yellow-500" />
                                                                        {formatTier(subscriptionData?.subscription?.tier)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-xs opacity-70">Billing</span>
                                                                    <span className="text-xs font-semibold">
                                                                        {formatTerm(subscriptionData?.subscription?.term)}
                                                                    </span>
                                                                </div>
                                                                <div className="flex items-center justify-between">
                                                                    <span className="text-xs opacity-70">
                                                                        {isManualSubscription() ? 'Valid Until' : 'Renews On'}
                                                                    </span>
                                                                    <span className="text-xs font-semibold flex items-center gap-1">
                                                                        <Calendar size={12} />
                                                                        {formatDate(subscriptionData?.subscription?.current_period_end)}
                                                                    </span>
                                                                </div>
                                                                
                                                                {/* Manual Notes */}
                                                                {isManualSubscription() && subscriptionData?.subscription?.manual_notes && (
                                                                    <div className="mt-2 pt-2 border-t border-gray-200/20">
                                                                        <p className="text-xs opacity-70 italic">
                                                                            {subscriptionData.subscription.manual_notes}
                                                                        </p>
                                                                    </div>
                                                                )}
                                                            </div>
                                                        ) : (
                                                            <p className="text-xs opacity-70 flex items-center gap-2">
                                                                <AlertCircle size={12} />
                                                                No active subscription
                                                            </p>
                                                        )}
                                                    </div>
                                                    
                                                    <button
                                                        onClick={handleLogout}
                                                        className={`w-full px-4 py-3 text-left text-sm transition-colors flex items-center gap-2 ${theme === 'light' ? 'hover:bg-gray-100' : 'hover:bg-[#7a73e8]/20'}`}
                                                    >
                                                        <LogOut size={16} />
                                                        Logout
                                                    </button>
                                                </motion.div>

                                                {/* Close dropdown overlay */}
                                                <div 
                                                    className="fixed inset-0 z-[-1]" 
                                                    onClick={() => setShowDropdown(false)}
                                                />
                                            </>
                                        )}
                                    </AnimatePresence>
                                </div>
                            ) : (
                                <Link href="/signup">
                                    <motion.button
                                        whileHover={{ scale: 1.1 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="relative border border-[#7a73e8] rounded-full px-4 xl:px-8 py-2 transition-all duration-300 overflow-hidden group focus:outline-none cursor-pointer flex-shrink-0"
                                    >
                                        <span className="absolute inset-0 bg-gradient-to-r from-[#7a73e8]/0 via-[#7a73e8]/20 to-[#7a73e8]/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                                        <span className="relative z-10 text-xs xl:text-sm font-sm">JOIN</span>
                                    </motion.button>
                                </Link>
                            )}
                        </div>
                    </div>

                    {/* Desktop Theme Switch */}
                    <div className='hidden lg:flex flex-shrink-0'>
                        <div className='cursor-pointer border border-[#3B3131]/30 rounded-full p-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
                            <ThemeSwitch />
                        </div>
                    </div>

                    {/* Mobile Menu Button & Theme Switch */}
                    <div className="lg:hidden flex items-center space-x-2">
                        <div className='cursor-pointer border border-[#3B3131]/30 rounded-full p-1.5 sm:p-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
                            <ThemeSwitch />
                        </div>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mobile-menu p-2 rounded-full border border-[#3B3131]/30 focus:outline-none bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                            onClick={() => {
                                setMenuOpen(!menuOpen);
                                if (!menuOpen) {
                                    fetchSubscriptionStatus();
                                }
                            }}
                            aria-label="Toggle menu"
                            aria-expanded={menuOpen}
                        >
                            <motion.div
                                animate={menuOpen ? { rotate: 180 } : { rotate: 0 }}
                                transition={{ duration: 0.3 }}
                            >
                                {menuOpen ? (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="18" y1="6" x2="6" y2="18"></line>
                                        <line x1="6" y1="6" x2="18" y2="18"></line>
                                    </svg>
                                ) : (
                                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                                        <line x1="3" y1="12" x2="21" y2="12" />
                                        <line x1="3" y1="6" x2="21" y2="6" />
                                        <line x1="3" y1="18" x2="21" y2="18" />
                                    </svg>
                                )}
                            </motion.div>
                        </motion.button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu - Same logic as desktop */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMenuOpen(false)}
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`mobile-menu fixed top-20 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 rounded-2xl shadow-2xl z-50 lg:hidden ${theme === 'light'
                                ? 'bg-white/95 text-black border border-gray-200/50'
                                : 'bg-black/95 text-white border border-gray-700/50'
                                } backdrop-blur-md overflow-hidden max-h-[calc(100vh-6rem)] overflow-y-auto`}
                        >
                            <div className="p-6 sm:p-8">
                                <div className="flex flex-col space-y-4">
                                    {navLinks.map((link, index) => (
                                        <Link key={link.href} href={link.href} onClick={() => setMenuOpen(false)}>
                                            <motion.button
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: index * 0.1 }}
                                                whileHover={{ scale: 1.02, x: 4 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full text-left py-3 px-4 rounded-xl font-medium text-base hover:bg-white/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7a73e8]/50"
                                            >
                                                {link.label}
                                            </motion.button>
                                        </Link>
                                    ))}

                                    {/* Mobile Auth Section - Same logic */}
                                    {isAuthenticated ? (
                                        <>
                                            <div className={`mt-4 p-4 rounded-xl border ${theme === 'light' ? 'border-gray-200' : 'border-[#7a73e8]/30'} bg-white/5`}>
                                                <div className="flex items-center gap-3 mb-3">
                                                    <User size={20} className="text-[#7a73e8]" />
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-sm">{fullName}</p>
                                                        <p className="text-xs opacity-70">{localStorage.getItem('user_role') || 'User'}</p>
                                                    </div>
                                                </div>

                                                <div className={`mt-3 p-3 rounded-lg border ${getSubscriptionBadgeColor()}`}>
                                                    {loadingSubscription ? (
                                                        <p className="text-xs">Loading subscription...</p>
                                                    ) : hasActiveSubscription() ? (
                                                        <div className="space-y-2">
                                                            {isManualSubscription() && (
                                                                <div className="flex items-center gap-1 mb-2">
                                                                    <Sparkles size={12} />
                                                                    <span className="text-xs font-bold">Manually Assigned</span>
                                                                </div>
                                                            )}
                                                            
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium opacity-80">Plan</span>
                                                                <span className="text-xs font-bold flex items-center gap-1">
                                                                    <Crown size={12} />
                                                                    {formatTier(subscriptionData?.subscription?.tier)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium opacity-80">Billing</span>
                                                                <span className="text-xs font-bold">
                                                                    {formatTerm(subscriptionData?.subscription?.term)}
                                                                </span>
                                                            </div>
                                                            <div className="flex items-center justify-between">
                                                                <span className="text-xs font-medium opacity-80">
                                                                    {isManualSubscription() ? 'Valid Until' : 'Renews On'}
                                                                </span>
                                                                <span className="text-xs font-bold flex items-center gap-1">
                                                                    <Calendar size={12} />
                                                                    {formatDate(subscriptionData?.subscription?.current_period_end)}
                                                                </span>
                                                            </div>
                                                            
                                                            {isManualSubscription() && subscriptionData?.subscription?.manual_notes && (
                                                                <div className="mt-2 pt-2 border-t border-white/10">
                                                                    <p className="text-xs opacity-70 italic line-clamp-2">
                                                                        {subscriptionData.subscription.manual_notes}
                                                                    </p>
                                                                </div>
                                                            )}
                                                        </div>
                                                    ) : (
                                                        <div className="flex items-center gap-2">
                                                            <AlertCircle size={14} />
                                                            <p className="text-xs font-medium">No active subscription</p>
                                                        </div>
                                                    )}
                                                </div>

                                                {!hasActiveSubscription() && (
                                                    <Link href="/pricing" onClick={() => setMenuOpen(false)}>
                                                        <motion.button
                                                            whileHover={{ scale: 1.02 }}
                                                            whileTap={{ scale: 0.98 }}
                                                            className="w-full mt-3 py-2 px-4 rounded-lg bg-gradient-to-r from-[#7a73e8] to-[#CAA9D3] text-white font-semibold text-sm transition-all duration-300"
                                                        >
                                                            Upgrade Plan
                                                        </motion.button>
                                                    </Link>
                                                )}

                                                <motion.button
                                                    whileHover={{ scale: 1.02 }}
                                                    whileTap={{ scale: 0.98 }}
                                                    onClick={handleLogout}
                                                    className="w-full mt-3 py-2 px-4 rounded-lg border-2 border-red-500/50 text-red-500 font-semibold text-sm hover:bg-red-500/10 transition-all duration-300 flex items-center justify-center gap-2"
                                                >
                                                    <LogOut size={16} />
                                                    Logout
                                                </motion.button>
                                            </div>
                                        </>
                                    ) : (
                                        <Link href="/signup" onClick={() => setMenuOpen(false)}>
                                            <motion.button
                                                initial={{ opacity: 0, x: -20 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: navLinks.length * 0.1 }}
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                                className="w-full mt-4 py-3 px-4 rounded-xl border-2 border-[#7a73e8] text-[#7a73e8] font-semibold text-base hover:bg-[#7a73e8]/10 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#7a73e8]/50"
                                            >
                                                JOIN STAR WRITER
                                            </motion.button>
                                        </Link>
                                    )}
                                </div>
                            </div>

                            <div className={`px-6 py-4 border-t ${theme === 'light' ? 'border-gray-200/50' : 'border-gray-700/50'}`}>
                                <motion.button
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: 0.6 }}
                                    onClick={() => setMenuOpen(false)}
                                    className="text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 transition-colors duration-300"
                                >
                                    Close Menu
                                </motion.button>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </nav>
    );
};
