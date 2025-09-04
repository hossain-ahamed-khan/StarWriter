"use client";
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import mainLogo from '../../../public/resources/images/main-logo.png';
import ThemeSwitch from '../ThemeSwitch/ThemeSwitch';
import { useTheme } from 'next-themes';
import Link from 'next/link';

export const Navbar = () => {
    const { theme } = useTheme();
    const [menuOpen, setMenuOpen] = React.useState(false);
    return (
        <div className={`flex justify-between items-center px-6 sm:px-10 lg:px-24 py-6 sm:py-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <h1 className='text-3xl font-bold bg-gradient-to-r from-[#7a6ee6] via-[#6fa8f5] to-[#a6d4fa] bg-clip-text text-transparent'>Star Writer</h1>
            {/* Desktop Navigation */}
            <div className="w-full lg:w-1/2 mx-auto items-center justify-between border border-[#3B3131] px-1 md:px-2 lg:px-8 py-2 md:py-4 rounded-full [&>button]:text-xs z-20 hidden lg:flex">
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
                    whileHover={{ scale: .75, rotate: 15, }}
                >
                    <Image
                        src={mainLogo}
                        width={24}
                        height={32}
                        alt="main Logo"
                        className="select-none hidden lg:block"
                    />
                </motion.div>
                {/* ...existing navigation links... */}
                <Link href="/">
                    <button className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:scale-105 focus:outline-none cursor-pointer">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#CAA9D3]/0 via-[#828ED6]/20 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10 text-xs md:text-sm">HOME</span>
                    </button>
                </Link>
                <Link href="/ai-humanizer">
                    <button className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:scale-105 focus:outline-none cursor-pointer">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#B7D6EF]/0 via-[#CAA9D3]/20 to-[#828ED6]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10 text-xs md:text-sm">AI HUMANIZER</span>
                    </button>
                </Link>
                <Link href="/ai-chat">
                    <button className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:scale-105 focus:outline-none cursor-pointer">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#828ED6]/0 via-[#B7D6EF]/20 to-[#CAA9D3]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10 text-xs md:text-sm">AI CHAT</span>
                    </button>
                </Link>
                <Link href="/blogs">
                    <button className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:scale-105 focus:outline-none cursor-pointer">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#828ED6]/0 via-[#B7D6EF]/20 to-[#CAA9D3]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10 text-xs md:text-sm">BLOGS</span>
                    </button>
                </Link>
                <Link href="/pricing">
                    <button className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:scale-105 focus:outline-none cursor-pointer">
                        <span className="absolute inset-0 bg-gradient-to-r from-[#CAA9D3]/0 via-[#828ED6]/20 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10 text-xs md:text-sm">PRICING</span>
                    </button>
                </Link>
                <Link href="/signup">
                    <button className="relative border border-[#7a73e8] rounded-full px-2 lg:px-8 py-1 lg:py-2 transition-all duration-300 overflow-hidden group hover:scale-110 hover:shadow-xl focus:outline-none cursor-pointer">
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10 text-xs md:text-sm">JOIN</span>
                    </button>
                </Link>
            </div>
            <div className='hidden lg:block cursor-pointer pr-2 border border-[#3B3131] rounded-full p-2 ml-2'>
                <ThemeSwitch />
            </div>
            {/* Hamburger Icon for Mobile */}
            <div className="lg:hidden flex items-center">
                <button
                    className="p-2 rounded-md border border-[#3B3131] focus:outline-none"
                    onClick={() => setMenuOpen(!menuOpen)}
                    aria-label="Toggle menu"
                >
                    <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="feather feather-menu">
                        <line x1="3" y1="12" x2="21" y2="12" />
                        <line x1="3" y1="6" x2="21" y2="6" />
                        <line x1="3" y1="18" x2="21" y2="18" />
                    </svg>
                </button>
                <div className='cursor-pointer pr-2 border border-[#3B3131] rounded-full p-2 ml-2'>
                    <ThemeSwitch />
                </div>
            </div>
            {/* Mobile Menu */}
            {menuOpen && (
                <div className={`fixed top-0 left-0 w-full h-full bg-black/70 z-50 flex flex-col items-center justify-start pt-24`}>
                    <div className={` rounded-xl shadow-lg w-11/12 max-w-xs mx-auto p-6 flex flex-col gap-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        <Link href="/" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-2 rounded font-semibold">HOME</button>
                        </Link>
                        <Link href="/ai-humanizer" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-2 rounded font-semibold">AI HUMANIZER</button>
                        </Link>
                        <Link href="/ai-chat" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-2 rounded font-semibold">AI CHAT</button>
                        </Link>
                        <Link href="/blogs" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-2 rounded font-semibold">BLOGS</button>
                        </Link>
                        <Link href="/pricing" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-2 rounded font-semibold">PRICING</button>
                        </Link>
                        <Link href="/signup" onClick={() => setMenuOpen(false)}>
                            <button className="w-full py-2 rounded border border-[#7a73e8] text-[#7a73e8] font-semibold">JOIN</button>
                        </Link>
                        <button className="mt-4 text-gray-500" onClick={() => setMenuOpen(false)}>Close</button>
                    </div>
                </div>
            )}
        </div>
    );
};
