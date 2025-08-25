import Image from 'next/image'
import React from 'react'

import underline from "../../../public/resources/images/agnostic/agnostic-underline.png";
import agnosticBall from "../../../public/resources/images/agnostic/agnostic-ball.png";
import agnosticBg from "../../../public/resources/images/agnostic/agnostic-bg.png";
import styles from "./Agnostic.module.css";

export const Agnostic = () => {
    return (
        <div className="w-4/5 mx-auto">
            <div>
                <div className="relative">
                    <h1 className="text-5xl font-bold text-center mb-2">
                        We are Model Agnostic
                    </h1>
                    <Image
                        src={underline}
                        width={350}
                        height={100}
                        alt="grid background"
                        className="object-contain absolute left-3/5 -bottom-6 transform -translate-x-1/2"
                    />
                </div>
                <p className="w-1/2 mx-auto text-center mt-8 text-white/90">
                    No matter which AI you use—ChatGPT, Claude, Gemini, or others—Zulio ensures your words sound just like you. We transform AI-generated text into a human like version that feels authentically yours, giving you peace of mind and confidence in every word.
                </p>
            </div>

            <div className="relative h-[600px] mt-16 flex items-center justify-center">
                {/* Animated Ball */}
                <div className={`absolute inset-0 z-70 pointer-events-none ${styles["agnostic-ball-float"]}`}>
                    <Image
                        src={agnosticBall}
                        fill
                        alt="floating ball"
                        className="object-contain"
                        priority
                    />
                </div>
                {/* Animated Background */}
                <div className={`absolute inset-0 z-0 ${styles["agnostic-bg-zoom"]}`}>
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
