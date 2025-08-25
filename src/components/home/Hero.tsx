"use client";
import Image from "next/image";
import { BsStars } from "react-icons/bs";

import gridBg from "../../../public/resources/images/grid-bg.png";
import mainLogo from "../../../public/resources/images/main-logo.png";
import bgDotedBg from "../../../public/resources/images/doted-bg.png";
import circleBg from "../../../public/resources/images/circle-bg.png";
import thunder from "../../../public/resources/images/thunder.png";
import greenLeaf from "../../../public/resources/images/green-leaf.png";


export const Hero = () => {
    return (
        <div className="relative h-[840px] flex flex-col justify-center items-center overflow-hidden bg-[#010006]">

            {/* Background Images */}
            <div className="absolute inset-0 z-0">
                <Image
                    src={gridBg}
                    fill
                    alt="grid background"
                    className="object-contain opacity-30"
                />
            </div>
            <div className="absolute inset-0 z-0">
                <Image
                    src={bgDotedBg}
                    fill
                    alt="dotted background"
                    className="object-contain"
                />
            </div>
            <div className="absolute inset-0 z-0">
                <Image
                    src={circleBg}
                    fill
                    alt="circle background"
                    className="object-center opacity-40"
                />
            </div>

            {/* Content */}
            <div className="text-white p-8 flex flex-col justify-center items-center relative z-20">
                <p className="bg-gradient-to-r from-[#b993d6] to-[#8ca6db] text-transparent bg-clip-text font-semibold pb-4 tracking-wide drop-shadow-[0_2px_12px_rgba(185,147,214,0.3)]">
                    Study Smarter, Not Harder
                </p>

                <div className="relative">
                    <h1 className="text-7xl md:text-8xl font-extrabold drop-shadow-[0_2px_24px_rgba(202,169,211,0.4)]">
                        The Original{" "}
                        <span className="bg-gradient-to-r from-[#b993d6] to-[#8ca6db] text-transparent bg-clip-text">
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
                    <h1 className="text-6xl md:text-7xl font-extrabold drop-shadow-[0_2px_24px_rgba(44,62,80,0.5)] text-[#e0e7ef]">
                        That Writes Like You
                    </h1>
                    <Image
                        src={thunder}
                        width={54}
                        height={54}
                        alt="thunder image"
                        className="ml-2 animate-pulse drop-shadow-[0_2px_12px_rgba(199,210,254,0.5)]"
                    />
                </div>

                <p className="mt-8 mb-4 text-lg md:text-xl text-white font-medium drop-shadow-[0_2px_8px_rgba(183,214,239,0.2)]">
                    Level Up Your Writing with{" "}
                    <span className="text-[#8ca6db]">Undetectable AI Text</span> and{" "}
                    <span className="text-[#b993d6]">High-Quality Grammar</span> — Built
                    for High Grades.
                </p>

                <div className="flex gap-2 bg-gradient-to-r from-[#23243a] via-[#2e335a] to-[#3d3a4a] px-5 py-2 rounded-full shadow-lg border border-[#2e335a]/60 items-center">
                    <Image
                        src={greenLeaf}
                        width={22}
                        height={22}
                        alt="green leaf"
                        className="drop-shadow-[0_2px_8px_rgba(34,197,94,0.3)]"
                    />
                    <p className="text-[#b7d6ef] font-semibold tracking-wide">
                        Cheaper Than Coffee, Smarter Than Your Professor!
                    </p>
                </div>

                <div>
                    <button className="flex gap-2 items-center mt-28 px-10 py-4 rounded-full bg-gradient-to-r from-[#b993d6] via-[#8ca6db] to-[#2e335a] border-4 border-[#8ca6db] shadow-2xl hover:scale-105 hover:shadow-[0_0_32px_8px_rgba(137,166,219,0.3)] transition-transform duration-300 text-lg font-bold text-white tracking-wide">
                        <BsStars className="text-[#f9fafb] drop-shadow-[0_2px_8px_rgba(202,169,211,0.5)]" />
                        Try Me, I'm Free
                    </button>
                </div>
            </div>
        </div>
    );
};
