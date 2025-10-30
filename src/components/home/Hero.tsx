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
import Link from "next/link";


export const Hero = () => {
    const { theme } = useTheme();
    return (
        <div data-aos="zoom-out-down">
            <div className={`relative h-[420px] md:h-[520px] lg:h-[640px] flex flex-col justify-center items-center overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>

                {/* Background Images - Only show in dark mode */}
                <div className={`${theme === 'light' ? 'hidden' : 'block'}`}>
                    <div className='absolute inset-0 z-0'>
                        <Image
                            src={gridBg}
                            fill
                            alt="grid background"
                            className="object-contain opacity-30 hidden lg:block"
                            sizes="(max-width: 1024px) 100vw, 100vw"
                        />
                    </div>
                    <div className='absolute inset-0 z-0'>
                        <Image
                            src={bgDotedBg}
                            fill
                            alt="dotted background"
                            className="object-contain hidden lg:block"
                            sizes="(max-width: 1024px) 100vw, 100vw"
                        />
                    </div>
                    <div className='absolute inset-0 z-0'>
                        <Image
                            src={circleBg}
                            fill
                            alt="circle background"
                            className="object-center opacity-40 hidden lg:block"
                            sizes="(max-width: 1024px) 100vw, 100vw"
                        />
                    </div>
                </div>

                {/* Content */}

                <div className={`p-4 md:p-8 flex flex-col justify-center items-center relative z-20 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <p className="bg-gradient-to-r from-[#7a6ee6] via-[#6fa8f5] to-[#a6d4fa] bg-clip-text text-transparent font-semibold pb-4 tracking-wide text-xs md:text-sm">
                        Study Smarter, Not Harder
                    </p>

                    <div className="relative">
                        <h1 className="text-2xl sm:4xl md:text-5xl lg:text-7xl bold font-extrabold">
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
                            className="hidden lg:block absolute right-1.5 -top-5 w-auto h-auto drop-shadow-[0_2px_12px_rgba(202,169,211,0.5)]"
                            style={{ width: 'auto', height: 'auto' }}
                        />
                    </div>

                    <div className="flex mt-2 items-center">
                        <h1 className="text-2xl sm:4xl md:text-5xl lg:text-7xl bold font-extrabold">
                            That Writes Like You
                        </h1>
                        <Image
                            src={thunder}
                            width={54}
                            height={54}
                            alt="thunder image"
                            className="ml-2 animate-pulse drop-shadow-[0_2px_12px_rgba(199,210,254,0.5)] hidden lg:block w-auto h-auto"
                        />
                    </div>

                    <p className={`w-3/4 md:w-full my-4 md:my-8 text-[8px] md:text-sm lg:text-md text-center font-medium ${theme === 'light' ? 'text-black/70' : 'text-white/70'}`}>
                        Level Up Your Writing with Undetectable AI Text and High-Quality Grammar — Built for High Grades.
                    </p>


                    <div className="relative flex gap-2 px-2 md:px-5 py-1 lg:py-3 md:py-4 rounded-full items-center overflow-hidden backdrop-blur-md bg-white/10 dark:bg-black/10 border border-white/20 dark:border-white/10 shadow-2xl hover:shadow-3xl transition-all duration-300 group">

                        {/* Glass reflection effect */}
                        <div className="absolute inset-0 bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-50"></div>

                        {/* Subtle inner glow */}
                        <div className="absolute inset-0 rounded-full shadow-inner shadow-white/10"></div>

                        {/* Content */}
                        <div className="relative z-10 flex gap-2 items-center">
                            <Image
                                src={greenLeaf}
                                width={20}
                                height={20}
                                alt="green leaf"
                                className="w-auto h-auto drop-shadow-[0_4px_12px_rgba(34,197,94,0.4)] group-hover:drop-shadow-[0_6px_16px_rgba(34,197,94,0.6)] transition-all duration-300 group-hover:rotate-12"
                            />
                            <p className={`text-[8px] md:text-sm lg:text-md font-medium drop-shadow-sm group-hover:text-brand-dark dark:group-hover:text-brand-light transition-colors duration-300 ${theme === 'light' ? 'text-black/70' : 'text-white/70'}`}>
                                Cheaper Than Coffee, Smarter Than Your Professor!
                            </p>
                        </div>

                        {/* Floating particles effect */}
                        <div className="absolute top-1 left-4 w-1 h-1 bg-white/40 rounded-full animate-bounce delay-100"></div>
                        <div className="absolute top-2 right-8 w-0.5 h-0.5 bg-white/30 rounded-full animate-bounce delay-300"></div>
                        <div className="absolute bottom-2 left-1/3 w-0.5 h-0.5 bg-white/20 rounded-full animate-bounce delay-500"></div>
                    </div>

                    <div>
                        <Link href="/ai-humanizer">
                        <button className="flex gap-2 items-center px-3 lg:px-6 py-2 lg:py-2 rounded-full border shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-sm lg:text-lg font-medium lg:font-bold tracking-wide mt-12 lg:mt-24">
                            <BsStars className={`${theme === 'light' ? 'text-black' : 'text-white'}`} />
                            Try Me, I'm Free
                        </button>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};
