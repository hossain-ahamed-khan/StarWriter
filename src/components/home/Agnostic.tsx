import Image from 'next/image'
import React from 'react'

import underline from "../../../public/resources/images/agnostic/agnostic-underline.png";
import agnosticBall from "../../../public/resources/images/agnostic/agnostic-ball.png";
import agnosticBg from "../../../public/resources/images/agnostic/agnostic-bg.png";
import { useTheme } from 'next-themes';

export const Agnostic = () => {
    const { theme } = useTheme();
    return (
        <div className="w-11/12 max-w-5xl mx-auto">
            <div>
                <div className="relative">
                    <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-center mb-2 leading-tight">
                        We are Model Agnostic
                    </h1>
                    <div className="flex justify-center">
                        <Image
                            src={underline}
                            width={220}
                            height={60}
                            alt="grid background"
                            className="object-contain absolute left-1/2 -bottom-4 sm:-bottom-6 transform -translate-x-1/2 w-40 sm:w-[350px]"
                        />
                    </div>
                </div>
                <p className="w-full sm:w-4/5 md:w-3/5 mx-auto text-center mt-6 sm:mt-8 text-xs sm:text-sm md:text-base">
                    No matter which AI you use—ChatGPT, Claude, Gemini, or others—<span className='text-[#c8a9e6]'>StarWriter</span> ensures your words sound just like you. We transform AI-generated text into a human like version that feels authentically yours, giving you peace of mind and confidence in every word.
                </p>
            </div>

            <div data-aos="zoom-in">
                <div className="relative h-60 sm:h-96 md:h-[600px] mt-10 sm:mt-16 flex items-center justify-center">
                    {/* Animated Ball */}
                    <div
                        className="absolute inset-0 z-20 pointer-events-auto"
                        title="Hover to animate"
                        tabIndex={0}
                    >
                        <Image
                            src={agnosticBall}
                            fill
                            alt="floating ball"
                            className="object-contain"
                            priority
                        />
                    </div>
                    {/* Animated Background */}
                    <div className={`absolute inset-0 z-0 ${theme === 'light' ? 'hidden' : 'inline-block'}`}>
                        <Image
                            src={agnosticBg}
                            fill
                            alt="zooming background"
                            className="object-cover"
                            priority
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
