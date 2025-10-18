"use client"
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import LiveChatModal from '@/components/live-chat/LiveChatModal';
import {
    FaDiscord,
    FaGithub,
    FaTwitter,
    FaLinkedin,
    FaYoutube,
    FaFacebook,
    FaDribbble
} from 'react-icons/fa';

const Footer = () => {
    const { theme } = useTheme();
    const [isChatOpen, setIsChatOpen] = useState(false);

    return (
        <div className={`w-full px-3 py-4 sm:px-4 sm:py-6 md:px-6 md:py-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <div className="w-full max-w-7xl mx-auto my-4 sm:my-8 md:my-12 lg:my-16">
                <nav className={`rounded-xl sm:rounded-2xl border border-[#4E4E52] p-3 sm:p-4 md:p-6 lg:p-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                    <div className="flex flex-col lg:flex-row items-center justify-between gap-4">

                        {/* Left side - Logo and tagline */}
                        <div className="flex gap-1 flex-col sm:flex-row items-center justify-center w-full lg:w-auto sm:text-left">
                            <div className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-xl font-bold tracking-wide">
                                    starwriter.ai
                                </h1>
                            </div>
                            <div className="hidden sm:block h-4 md:h-6 w-px bg-gray-600"></div>
                            <div className={`text-xs sm:text-sm md:text-base lg:text-sm xl:text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                Trust Us—Your Brain Will Thank You
                            </div>
                        </div>

                        {/* Middle section - Contact info */}
                        <div className={`text-xs sm:text-sm md:text-base lg:text-sm xl:text-base ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'} text-center lg:text-left order-3 lg:order-2`}>
                            <p className="mb-1 sm:mb-2">401 Bay Street, Toronto, Ontario, Canada</p>
                            <div className='flex gap-1 flex-col sm:flex-row items-center justify-center lg:justify-start'>
                                <p>support@starwriter.ai</p>
                                <div className="hidden sm:block w-px h-4 bg-gray-400"></div>
                                <p>
                                    <Link
                                        href="/terms"
                                        className={`underline hover:no-underline transition-all duration-200 ${theme === 'light' ? 'hover:text-gray-800' : 'hover:text-gray-200'}`}
                                    >
                                        Terms and Conditions
                                    </Link>
                                </p>
                            </div>
                        </div>

                        {/* Right side - Social icons + Live Chat */}
                        <div className="flex flex-wrap justify-center lg:justify-end items-center w-full sm:w-auto lg:w-auto order-2 lg:order-3 gap-1">
                            <a
                                href="#"
                                className={`transition-colors duration-200 p-1.5 sm:p-2 md:p-2.5 lg:p-2 rounded-lg ${theme === 'light'
                                    ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                aria-label="Discord"
                            >
                                <FaDiscord className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                            </a>
                            <a
                                href="#"
                                className={`transition-colors duration-200 p-1.5 sm:p-2 md:p-2.5 lg:p-2 rounded-lg ${theme === 'light'
                                    ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                aria-label="GitHub"
                            >
                                <FaGithub className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                            </a>
                            <a
                                href="#"
                                className={`transition-colors duration-200 p-1.5 sm:p-2 md:p-2.5 lg:p-2 rounded-lg ${theme === 'light'
                                    ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                            </a>
                            <a
                                href="#"
                                className={`transition-colors duration-200 p-1.5 sm:p-2 md:p-2.5 lg:p-2 rounded-lg ${theme === 'light'
                                    ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                            </a>
                            <a
                                href="#"
                                className={`transition-colors duration-200 p-1.5 sm:p-2 md:p-2.5 lg:p-2 rounded-lg ${theme === 'light'
                                    ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                aria-label="YouTube"
                            >
                                <FaYoutube className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                            </a>
                            <a
                                href="#"
                                className={`transition-colors duration-200 p-1.5 sm:p-2 md:p-2.5 lg:p-2 rounded-lg ${theme === 'light'
                                    ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                aria-label="Facebook"
                            >
                                <FaFacebook className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                            </a>
                            <a
                                href="#"
                                className={`transition-colors duration-200 p-1.5 sm:p-2 md:p-2.5 lg:p-2 rounded-lg ${theme === 'light'
                                    ? 'text-gray-500 hover:text-gray-800 hover:bg-gray-100'
                                    : 'text-gray-400 hover:text-white hover:bg-gray-700'
                                    }`}
                                aria-label="Dribbble"
                            >
                                <FaDribbble className="w-3 h-3 sm:w-4 sm:h-4 md:w-5 md:h-5 lg:w-4 lg:h-4" />
                            </a>

                            {/* Divider */}
                            <div className="hidden sm:block w-px h-6 bg-gray-400 mx-2"></div>

                            {/* Live Chat Button */}
                            <button
                                onClick={() => setIsChatOpen(true)}
                                className={`flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg transition-all duration-200 shadow-md hover:shadow-lg ${
                                    theme === 'light'
                                        ? 'bg-blue-600 hover:bg-blue-700 text-white'
                                        : 'bg-blue-600 hover:bg-blue-700 text-white'
                                }`}
                                aria-label="Open live chat"
                            >
                                <MessageCircle size={18} />
                                <span className="text-sm font-semibold hidden sm:inline">Live Chat</span>
                                <span className="text-sm font-semibold sm:hidden">Chat</span>
                            </button>
                        </div>
                    </div>
                </nav>
            </div>

            {/* Live Chat Modal - Fixed Position at Bottom Right */}
            {isChatOpen && (
                <div className="fixed bottom-8 right-8 z-50">
                    <LiveChatModal onClose={() => setIsChatOpen(false)} />
                </div>
            )}
        </div>
    );
};

export default Footer;
