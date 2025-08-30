import { useTheme } from 'next-themes';
import React from 'react'

export const SingleClick = () => {
    const { theme } = useTheme();
    return (
        <div className="px-4 sm:px-8 mx-auto text-center">
            <h1 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center leading-tight">
                Unlock Humanized Text with a Single Click
            </h1>
            {theme === 'light' ? (
                <p className="text-base sm:text-lg text-center mt-6 sm:mt-8 text-black">
                    Transform robotic or AI-generated content into natural, engaging language — <br className="hidden sm:block" />powered by advanced human-like rewriting intelligence.
                </p>
            ) : (
                <p className="text-base sm:text-lg text-center mt-6 sm:mt-8 bg-gradient-to-r from-[#B7D6EF] via-[#CAA9D3] to-[#828ED6] bg-clip-text text-transparent inline-block">
                    Transform robotic or AI-generated content into natural, engaging language — <br className="hidden sm:block" />powered by advanced human-like rewriting intelligence.
                </p>
            )}
            <div className="text-center mt-8 sm:mt-12">
                <button className="bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] px-5 sm:px-8 py-2 sm:py-3 text-sm sm:text-base text-white text-center rounded-md font-semibold transition duration-200 hover:scale-105 hover:shadow-lg hover:from-[#B7D6EF] hover:to-[#CAA9D3] w-full sm:w-auto">
                    TRY IT FREE
                </button>
            </div>
        </div>
    )
}
