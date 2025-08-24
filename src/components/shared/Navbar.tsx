"use client";
import Image from 'next/image';
import React from 'react';
import { motion } from 'framer-motion';
import mainLogo from '../../../public/resources/images/main-logo.png';

export const Navbar = () => {
    return (
        <div className="absolute top-10 left-1/2 transform -translate-x-1/2 w-1/2 mx-auto flex items-center justify-between border border-[#3B3131] px-8 py-4 rounded-full [&>button]:text-xs z-20">
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
                className="cursor-pointer"
                whileHover={{ scale: .75, rotate: 15, filter: 'drop-shadow(0 0 30px #fff)' }}
            >
                <Image
                    src={mainLogo}
                    width={36}
                    height={44}
                    alt="main Logo"
                    className="select-none"
                />
            </motion.div>
            <button
                className="relative px-5 py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-[#CAA9D3]/0 via-[#828ED6]/20 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                <span className="relative z-10">HOME</span>
            </button>
            <button
                className="relative px-5 py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-[#B7D6EF]/0 via-[#CAA9D3]/20 to-[#828ED6]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                <span className="relative z-10">AI HUMANIZER</span>
            </button>
            <button
                className="relative px-5 py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-[#828ED6]/0 via-[#B7D6EF]/20 to-[#CAA9D3]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                <span className="relative z-10">CHAT BOT</span>
            </button>
            <button
                className="relative px-5 py-2 rounded-full transition-all duration-300 overflow-hidden group hover:text-white hover:scale-105 focus:outline-none"
            >
                <span className="absolute inset-0 bg-gradient-to-r from-[#CAA9D3]/0 via-[#828ED6]/20 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                <span className="relative z-10">BLOG</span>
            </button>
            <button
                className="relative border border-white bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] rounded-full px-8 py-2 transition-all duration-300 overflow-hidden group hover:scale-110 hover:shadow-xl focus:outline-none"
            >
                <span className="absolute inset-0 bg-white/10 opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm"></span>
                <span className="relative z-10">JOIN</span>
            </button>
            <button className="transition-all duration-300 hover:scale-110 focus:outline-none">
                <input type="checkbox" className="toggle" />
            </button>
        </div>
    );
};
