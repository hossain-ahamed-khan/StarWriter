import Image from "next/image"
import bgDotedImage from '../../../public/resources/images/doted-bg.png';
import aiWebsite from "../../../public/resources/images/AI Website For Student.png"
import colorfulRing from '../../../public/resources/images/color-ring.png';
import { useTheme } from "next-themes";

export const Unique = () => {
    const { theme } = useTheme();
    return (
        <div className="w-[95%] sm:w-4/5 mx-auto min-h-[320px] flex flex-col justify-center items-center relative overflow-hidden my-16 sm:my-36">
            {/* Background Images - Layered */}
            <div className="absolute inset-0">
                <Image
                    src={bgDotedImage}
                    fill
                    alt="dotted background"
                    className="object-contain"
                    style={{ zIndex: 2 }}
                />
            </div>
            <div className="absolute inset-0 w-full sm:w-4/5 mx-auto">
                <Image
                    src={aiWebsite}
                    fill
                    alt="AI Website"
                    className="object-center"
                    style={{ zIndex: 3 }}
                />
            </div>

            {/* Content */}
            <div className="text-white flex flex-col lg:flex-row justify-between items-center gap-8 sm:gap-0 relative z-10 w-full">
                <div className="flex-1 w-full flex flex-col items-center lg:items-start relative mb-8 lg:mb-0">
                    <div className="relative w-full flex justify-center lg:justify-start">
                        <h1 className="text-4xl xs:text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent text-center lg:text-left leading-tight">WE ARE <br className="hidden xs:block" />UNIQUE</h1>
                    </div>
                    <div className="absolute -top-12 xs:-top-16 sm:-top-20 left-1/2 lg:left-1/3 -translate-x-1/2 lg:translate-x-0">
                        <Image
                            src={colorfulRing}
                            width={300}
                            height={80}
                            alt="colorful ring"
                            className="hidden xs:block lg:block"
                        />
                    </div>
                </div>
                <div className="flex-1 w-full flex justify-center lg:justify-end">
                    <div className={`w-full sm:w-4/5 p-4 sm:p-8 border border-[#343434] rounded-xl transition-all duration-200 hover:border-[#B7D6EF] group ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                        <p className="text-sm xs:text-base sm:text-lg text-center lg:text-left">Unlike simple paraphrasers or tone changers, our Humanizer goes deeper. It understands the emotion, intent, and natural flow of human language — transforming robotic or AI-generated text into something that sounds like it was written by a real person. Whether it's for emails, blogs, or social media captions, we make sure your words feel authentic, relatable, and truly human.</p>
                        <button className="w-full mt-6 sm:mt-8 py-2 text-white bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] rounded-lg transition-all duration-200 hover:from-[#828ED6] hover:to-[#B7D6EF] hover:brightness-105 hover:scale-105 text-base sm:text-lg">Unlock The Magic!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
