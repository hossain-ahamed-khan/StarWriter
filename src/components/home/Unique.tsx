import Image from "next/image"
import bgDotedImage from '../../../public/resources/images/doted-bg.png';
import aiWebsite from "../../../public/resources/images/AI Website For Student.png"
import colorfulRing from '../../../public/resources/images/color-ring.png';

export const Unique = () => {
    return (
        <div className="w-4/5 mx-auto h-[320px] flex flex-col justify-center items-center relative overflow-hidden mt-24">
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
            <div className="absolute inset-0 w-4/5 mx-auto">
                <Image
                    src={aiWebsite}
                    fill
                    alt="AI Website"
                    className="object-center"
                    style={{ zIndex: 3 }}
                />
            </div>

            {/* Content */}
            <div className="text-white flex justify-between items-center relative z-10">
                <div className="flex-1 relative">
                    <div className="relative">
                        <h1 className="text-8xl font-black bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] bg-clip-text text-transparent">WE ARE <br />UNIQUE</h1>
                    </div>
                    <div className="absolute top-0 left-1/2 inset-0">
                        <Image
                            src={colorfulRing}
                            width={50}
                            height={50}
                            alt="thunder image"
                            className="h-52 w-44"
                        />
                    </div>
                </div>
                <div className="flex-1">
                    <div className="p-8 border border-[#343434] rounded-md bg-[#010006]">
                        <p>Unlike simple paraphrasers or tone changers, our Humanizer goes deeper. It understands the emotion, intent, and natural flow of human language — transforming robotic or AI-generated text into something that sounds like it was written by a real person. Whether it's for emails, blogs, or social media captions, we make sure your words feel authentic, relatable, and truly human.</p>
                        <button className="w-full mt-8 py-2 text-white bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF]">Unlock The Magic!</button>
                    </div>
                </div>
            </div>
        </div>
    )
}
