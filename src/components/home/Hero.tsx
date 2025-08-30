"use client";
import Image from "next/image";
import { BsStars } from "react-icons/bs";

import gridBg from "../../../public/resources/images/grid-bg.png";
import mainLogo from "../../../public/resources/images/main-logo.png";
import bgDotedBg from "../../../public/resources/images/doted-bg.png";
import circleBg from "../../../public/resources/images/circle-bg.png";
import thunder from "../../../public/resources/images/thunder.png";
import greenLeaf from "../../../public/resources/images/green-leaf.png";
import { useTheme } from "next-themes";


export const Hero = () => {
    const { theme } = useTheme();
    return (
        <div className={`relative h-[840px] flex flex-col justify-center items-center overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>

            {/* Background Images - Only show in dark mode */}
            <div className={`${theme === 'light' ? 'hidden' : 'block'}`}>
                <div className='absolute inset-0 z-0'>
                    <Image
                        src={gridBg}
                        fill
                        alt="grid background"
                        className="object-contain opacity-30 hidden lg:block"
                    />
                </div>
                <div className='absolute inset-0 z-0'>
                    <Image
                        src={bgDotedBg}
                        fill
                        alt="dotted background"
                        className="object-contain hidden lg:block"
                    />
                </div>
                <div className='absolute inset-0 z-0'>
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-center opacity-40 hidden lg:block"
                    />
                </div>
            </div>

            {/* Content */}

            <div className={` p-8 flex flex-col justify-center items-center relative z-20 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                <p className="bg-gradient-to-r from-[#7a6ee6] via-[#6fa8f5] to-[#a6d4fa] bg-clip-text text-transparent font-semibold pb-4 tracking-wide">
                    Study Smarter, Not Harder
                </p>

                <div className="relative">
                    <h1 className="text-7xl md:text-8xl font-extrabold">
                        The Original{" "}
                        <span className="bg-gradient-to-r from-[#7a6ee6] via-[#6fa8f5] to-[#a6d4fa] bg-clip-text text-transparent">
                            Humanizer
                        </span>
                    </h1>
                    <Image
                        src={mainLogo}
                        width={32}
                        height={42}
                        alt="main logo"
                        className="absolute right-8 top-0 drop-shadow-[0_2px_12px_rgba(202,169,211,0.5)]"
                    />
                </div>

                <div className="flex mt-2 items-center">
                    <h1 className="text-6xl md:text-7xl font-extrabold">
                        That Writes Like You
                    </h1>
                    <Image
                        src={thunder}
                        width={54}
                        height={54}
                        alt="thunder image"
                        className="ml-2 animate-pulse drop-shadow-[0_2px_12px_rgba(199,210,254,0.5)] hidden lg:block"
                    />
                </div>

                <p className={`mt-8 mb-4 text-lg md:text-xl font-medium ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    Level Up Your Writing with Undetectable AI Text and High-Quality Grammar — Built for High Grades.
                </p>

                <div className="flex gap-2 bg-gradient-to-r from-brand-light via-brand-dark to-brand-light px-5 py-2 rounded-full shadow-lg border border-brand-dark/60 items-center dark:from-brand-dark dark:via-brand-light dark:to-brand-dark mt-4">
                    <Image
                        src={greenLeaf}
                        width={22}
                        height={22}
                        alt="green leaf"
                        className="drop-shadow-[0_2px_8px_rgba(34,197,94,0.3)]"
                    />
                    <p className="text-brand-dark dark:text-brand-light font-semibold tracking-wide">
                        Cheaper Than Coffee, Smarter Than Your Professor!
                    </p>
                </div>

                <div>
                    <button className="flex gap-2 items-center px-12 py-3 rounded-full bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] border-4 border-[#A69CD4] shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg font-bold text-white tracking-wide mt-32">
                        <BsStars className="text-white drop-shadow-[0_2px_8px_rgba(202,169,211,0.5)]" />
                        Try Me, I'm Free
                    </button>
                </div>
            </div>
        </div>
    );
};
