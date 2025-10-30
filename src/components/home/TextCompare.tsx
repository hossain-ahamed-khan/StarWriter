
import React from 'react';
import { BsStars } from 'react-icons/bs';
import Image from 'next/image';
import circleBg from "../../../public/resources/images/circle-bg.png";
import { useTheme } from 'next-themes';
import Link from "next/link";

export const TextCompare = () => {
    const { theme } = useTheme();
    return (
        <div className={`relative w-full lg:w-4/5 mx-auto py-10 lg:py-20 px-4 md:px-8 min-h-[700px] flex flex-col items-center justify-center ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className="absolute inset-0 z-0">
                <Image
                    src={circleBg}
                    fill
                    alt="circle background"
                    className="object-center"
                    sizes="(max-width: 1024px) 100vw, 100vw"
                />
            </div>
            <div className="relative z-10 w-full flex flex-col gap-12">
                <div className="flex flex-col md:flex-row gap-8 w-full">
                    {/* Original Text */}
                    <div data-aos="fade-zoom-in"
                        data-aos-easing="ease-in-back"
                        data-aos-delay="300"
                        data-aos-offset="0">
                        <div className={`flex-1 border border-[#524F4F]/40 rounded-2xl shadow-xl p-8 flex flex-col justify-between gap-4 min-h-[480px] ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
                            <div>
                                <div className="flex items-center justify-between mb-6">
                                    <div className="flex items-center gap-2">
                                        <span className="inline-block w-3 h-3 rounded-full bg-red-500 shadow-md"></span>
                                        <span className={`font-semibold tracking-wide ${theme === 'light' ? 'text-black' : 'text-white'}`}>Original Text</span>
                                    </div>
                                    <span className="text-[#F35555] px-4 py-1 bg-[#FFFFFF1A] border border-[#524F4F]/40 rounded-full text-xs font-medium">100% AI</span>
                                </div>
                                <div className="flex items-center">
                                    <p className={`text-xs md:text-sm leading-relaxed ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                        Becoming successful in life requires setting clear goals, maintaining a strong work ethic, and continuously learning from experiences. It is important to stay focused and motivated, even when faced with challenges or setbacks. Building good habits, such as time management and effective communication, can help you make steady progress toward your objectives. Surrounding yourself with supportive and positive people also plays a crucial role in personal growth. Ultimately, success comes from perseverance, adaptability, and a willingness to keep improving yourself over time.
                                    </p>
                                </div>
                            </div>
                            <div className="flex gap-4 flex-wrap mt-2">
                                <span className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/30"><span className="w-2 h-2 rounded-full bg-green-400"></span>Bypasses Turnitin</span>
                                <span className="flex items-center gap-2 text-xs text-green-400 bg-green-400/10 px-3 py-1 rounded-full border border-green-400/30"><span className="w-2 h-2 rounded-full bg-green-400"></span>Bypasses GPTZero</span>
                            </div>
                        </div>
                    </div>
                    {/* Humanized Text */}
                    <div data-aos="flip-left"
                        data-aos-easing="ease-out-cubic"
                        data-aos-duration="2000">
                        <div className={`flex-1 border border-[#51E688]/30 rounded-2xl shadow-xl p-8 flex flex-col gap-4 min-h-[480px] ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center gap-2">
                                    <span className="inline-block w-3 h-3 rounded-full bg-green-400 shadow-md"></span>
                                    <span className={`font-semibold tracking-wide ${theme === 'light' ? 'text-black' : 'text-white'}`}>Humanized Text</span>
                                </div>
                                <span className="text-[#51E688] px-4 py-1 bg-[#FFFFFF1A] border border-[#51E688]/40 rounded-full text-xs font-medium">1% AI</span>
                            </div>
                            <div className="flex items-center">
                                <p className={`text-xs md:text-sm leading-relaxed ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                                    Achieving success in life involves establishing clear goals, upholding a strong work ethic, and consistently learning from your experiences. Staying focused and motivated is essential, especially when encountering obstacles or setbacks. Developing positive habits like managing your time well and communicating effectively can help you steadily move toward your goals. Additionally, having supportive and positive people around you is vital for personal growth. In the end, success is the result of perseverance, adaptability, and a continuous commitment to self-improvement.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-center">
                    <Link href="/ai-humanizer">
                        <button className="flex gap-2 items-center px-6 py-2 rounded-full bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] border-4 border-[#A69CD4] shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 text-lg font-bold text-white tracking-wide">
                            <BsStars className="text-[#f9fafb] drop-shadow-[0_2px_8px_rgba(202,169,211,0.5)]" />
                            Humanize
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
