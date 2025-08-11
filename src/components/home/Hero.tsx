import Image from "next/image"
import { BsStars } from "react-icons/bs";
import gridImage from '@/resources/images/grid-bg.png';
import bgDotedImage from '@/resources/images/doted-bg.png';
import circleImage from '@/resources/images/circle-bg.png';
import mainLogo from '@/resources/images/main-logo.png';
import thunderImage from '@/resources/images/thunder.png';
import leafImage from '@/resources/images/green-leaf.png';

export const Hero = () => {
    return (
        <div className="h-[820px] flex flex-col justify-center items-center relative overflow-hidden">
            {/* Background Images - Layered */}
            <div className="absolute inset-0">
                <Image
                    src={gridImage}
                    fill
                    alt="grid background"
                    className="object-contain opacity-30"
                    style={{ zIndex: 1 }}
                />
            </div>
            <div className="absolute inset-0">
                <Image
                    src={bgDotedImage}
                    fill
                    alt="dotted background"
                    className="object-contain"
                    style={{ zIndex: 2 }}
                />
            </div>
            <div className="absolute inset-0">
                <Image
                    src={circleImage}
                    fill
                    alt="circle background"
                    className="object-center"
                    style={{ zIndex: 3 }}
                />
            </div>

            {/* Content */}
            <div className="text-white p-8 flex flex-col justify-center items-center relative z-10">
                <p className="bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] text-transparent bg-clip-text font-medium pb-4">Study Smarter, Not Harder</p>
                <div className="relative">
                    <h1 className="text-7xl font-bold">The Original <span className="bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] text-transparent bg-clip-text">Humanizer</span></h1>
                    <Image
                        src={mainLogo}
                        width={25}
                        height={35}
                        alt="main logo"
                        className="absolute right-4 top-0"
                    />
                </div>
                <div className="flex mt-2">
                    <h1 className="text-7xl font-bold">That Writes Like You</h1>
                    <Image
                        src={thunderImage}
                        width={50}
                        height={50}
                        alt="thunder image"
                    />
                </div>
                <p className="mt-8 mb-4">Level Up Your Writing with Undetectable AI Text and High-Quality Grammar — Built for High Grades.</p>
                <div className="flex gap-2 bg-[#3d3a4a] px-4 py-1 rounded-full">
                    <Image
                        src={leafImage}
                        width={20}
                        height={20}
                        alt="green leaf"
                    />
                    <p>Cheaper Than Coffee, Smarter Than Your Professor!</p>
                </div>
                <div>
                    <button className="flex gap-2 items-center mt-24 px-8 py-4 rounded-full bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] border-4 border-[#A69CD4]"><BsStars />Try Me, I'm Free</button>
                </div>
            </div>
        </div>
    )
}