"use client"
import { useTheme } from 'next-themes';
import Link from 'next/link';
import React from 'react';
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
    return (
        <div className={`w-full p-4 sm:p-6 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className="w-full sm:w-4/5 mx-auto my-8 sm:my-16">
                <nav className={`rounded-2xl border border-[#4E4E52] p-4 sm:p-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#101014] text-white'}`}>
                    <div className="flex flex-col sm:flex-row items-center sm:items-center justify-between gap-6 sm:gap-0">
                        {/* Left side - Logo and tagline */}
                        <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-3 w-full sm:w-auto text-center sm:text-left">
                            <div className={`${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                <h1 className="text-xl font-bold tracking-wide">
                                    STARWRITER.AI
                                </h1>
                            </div>
                            <div className="hidden sm:block h-6 w-px bg-gray-600"></div>
                            <div className={`text-sm ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                                Trust Us—Your Brain Will Thank You
                            </div>
                        </div>

                        <div className={`text-xs ${theme === 'light' ? 'text-gray-600' : 'text-gray-400'}`}>
                            <p>401 Bay Street, Toronto, Ontario, Canada</p>
                            <div className='flex gap-2'>
                                <p>support@starwriter.ai</p>
                                <p><Link href="/terms" className='underline'>Terms and Conditions</Link></p>
                            </div>
                        </div>

                        {/* Right side - Social icons */}
                        <div className="flex flex-wrap justify-center sm:justify-end items-center space-x-2 lg:space-x-4 w-full sm:w-auto">
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                                aria-label="Discord"
                            >
                                <FaDiscord className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                                aria-label="GitHub"
                            >
                                <FaGithub className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                                aria-label="Twitter"
                            >
                                <FaTwitter className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                                aria-label="LinkedIn"
                            >
                                <FaLinkedin className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                                aria-label="YouTube"
                            >
                                <FaYoutube className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                                aria-label="Facebook"
                            >
                                <FaFacebook className="w-5 h-5" />
                            </a>
                            <a
                                href="#"
                                className="text-gray-400 hover:text-white transition-colors duration-200 p-2 hover:bg-gray-700 rounded-lg"
                                aria-label="Dribbble"
                            >
                                <FaDribbble className="w-5 h-5" />
                            </a>
                        </div>
                    </div>
                </nav>
            </div>
        </div>
    );
};

export default Footer;