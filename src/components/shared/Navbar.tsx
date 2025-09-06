"use client";
import Image from 'next/image';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import mainLogo from '../../../public/resources/images/main-logo.png';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const Navbar = () => {
    const { theme } = useTheme();
    const [menuOpen, setMenuOpen] = React.useState(false);

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
        <nav className={`sticky top-0 w-full z-50 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'} transition-colors duration-300`}>
            <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16 sm:h-20 lg:h-24">

                    {/* Logo */}
                    <div className="flex-shrink-0">
                        <Link href="/">
                            <h1 className={`text-lg sm:text-2xl lg:text-3xl font-bold font-sf-pro cursor-pointer transition-all duration-300 hover:scale-105 ${theme === 'light' ? 'text-[#c8a9e6]' : 'bg-gradient-to-r from-[#c8a9e6] to-white bg-clip-text text-transparent'}`}
                            >
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
                                    className="select-none"
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

                            {/* Join Button */}
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
                        {/* Mobile Theme Switch */}
                        <div className='cursor-pointer border border-[#3B3131]/30 rounded-full p-1.5 sm:p-2 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300'>
                            <ThemeSwitch />
                        </div>

                        {/* Hamburger Menu Button */}
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="mobile-menu p-2 rounded-full border border-[#3B3131]/30 focus:outline-none bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-all duration-300"
                            onClick={() => setMenuOpen(!menuOpen)}
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

            {/* Mobile Menu Overlay */}
            <AnimatePresence>
                {menuOpen && (
                    <>
                        {/* Backdrop */}
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
                            onClick={() => setMenuOpen(false)}
                        />

                        {/* Mobile Menu Panel */}
                        <motion.div
                            initial={{ opacity: 0, scale: 0.95, y: -20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -20 }}
                            transition={{ duration: 0.3, ease: "easeOut" }}
                            className={`mobile-menu fixed top-20 left-4 right-4 sm:left-6 sm:right-6 md:left-8 md:right-8 rounded-2xl shadow-2xl z-50 lg:hidden ${theme === 'light'
                                ? 'bg-white/95 text-black border border-gray-200/50'
                                : 'bg-black/95 text-white border border-gray-700/50'
                                } backdrop-blur-md overflow-hidden`}
                        >
                            <div className="p-6 sm:p-8">
                                {/* Mobile Navigation Links */}
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

                                    {/* Mobile Join Button */}
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
                                </div>
                            </div>

                            {/* Mobile Menu Footer */}
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
