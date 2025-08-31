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
    return (
        <div className={`py-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className="w-full lg:w-1/2 mx-auto flex items-center justify-between border border-[#3B3131] px-2 lg:px-8 py-2 lg:py-4 rounded-full [&>button]:text-xs z-20">
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
                    whileHover={{ scale: .75, rotate: 15, filter: 'drop-shadow(0 0 30px #fff)' }}
                >
                    <Image
                        src={mainLogo}
                        width={24}
                        height={32}
                        alt="main Logo"
                        className="select-none hidden lg:block"
                    />
                </motion.div>
                <Link href="/">
                    <button
                        className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#CAA9D3]/0 via-[#828ED6]/20 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10">HOME</span>
                    </button>
                </Link>

                <Link href="/ai-humanizer">
                    <button
                        className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#B7D6EF]/0 via-[#CAA9D3]/20 to-[#828ED6]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10">AI HUMANIZER</span>
                    </button>
                </Link>

                <Link href="/ai-chat">
                    <button
                        className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#828ED6]/0 via-[#B7D6EF]/20 to-[#CAA9D3]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10">AI CHAT</span>
                    </button>
                </Link>

                <Link href="/pricing">
                    <button
                        className="relative px-2 lg:px-5 py-1 lg:py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#CAA9D3]/0 via-[#828ED6]/20 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10">PRICING</span>
                    </button>
                </Link>

                <Link href="/signup">
                    <button
                        className="relative border border-white bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] rounded-full px-2 lg:px-8 py-1 lg:py-2 transition-all duration-300 overflow-hidden group hover:scale-110 hover:shadow-xl focus:outline-none cursor-pointer"
                    >
                        <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                        <span className="relative z-10">JOIN</span>
                    </button>
                </Link>
                <div className='cursor-pointer'>
                    <ThemeSwitch />
                </div>
            </div>
        </div>
    );
};
