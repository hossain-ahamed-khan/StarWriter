import Image from 'next/image'
import React from 'react'

import underline from "../../../public/resources/images/agnostic/agnostic-underline.png";
import agnosticBall from "../../../public/resources/images/agnostic/agnostic-ball.png";
import agnosticBg from "../../../public/resources/images/agnostic/agnostic-bg.png";

export const Agnostic = () => {
    return (
        <div className="w-11/12 max-w-5xl mx-auto">
            <div>
                <div className="relative">
                    <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-center mb-2 leading-tight">
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
                <p className="w-full sm:w-4/5 md:w-1/2 mx-auto text-center mt-6 sm:mt-8 text-base sm:text-lg">
                    No matter which AI you use—ChatGPT, Claude, Gemini, or others—Zulio ensures your words sound just like you. We transform AI-generated text into a human like version that feels authentically yours, giving you peace of mind and confidence in every word.
                </p>
            </div>

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
                <div className={"absolute inset-0 z-0"}>
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
    )
}
