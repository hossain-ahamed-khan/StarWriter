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
    return (
        <div className="w-full bg-black p-6">
            <div className="w-4/5 mx-auto my-16">
                <nav className="bg-[#101014] rounded-2xl border border-[#4E4E52] p-8">
                    <div className="flex items-center justify-between">
                        {/* Left side - Logo and tagline */}
                        <div className="flex items-center space-x-3">
                            <div className="text-white">
                                <h1 className="text-xl font-bold tracking-wide">
                                    STARWRITER.AI
                                </h1>
                            </div>
                            <div className="h-6 w-px bg-gray-600"></div>
                            <div className="text-gray-300 text-sm">
                                Trust Us—Your Brain Will Thank You
                            </div>
                        </div>

                        {/* Right side - Social icons */}
                        <div className="flex items-center space-x-4">
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