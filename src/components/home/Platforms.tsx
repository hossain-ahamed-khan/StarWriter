"use client"
import Image from "next/image"
import circleBg from "../../../public/resources/images/circle-bg.png";

import aiseo from '../../../public/resources/images/companiesLogo/AISEO.png';
import businessInsider from '../../../public/resources/images/companiesLogo/business-insider.png';
import buzzFeed from '../../../public/resources/images/companiesLogo/buzzfeed.png';
import chatgptZero from '../../../public/resources/images/companiesLogo/ChatGPT-zero.png';
import crossplage from '../../../public/resources/images/companiesLogo/Crossplag.png';
import fiverr from '../../../public/resources/images/companiesLogo/fiverr.png';
import hubSpot from '../../../public/resources/images/companiesLogo/hubspot.png';
import originality from '../../../public/resources/images/companiesLogo/originality.png';
import turnitin from '../../../public/resources/images/companiesLogo/turnitin.png';
import winstone from '../../../public/resources/images/companiesLogo/winston.png';
import { useTheme } from "next-themes";


export const Platforms = () => {
    const { theme } = useTheme();
    return (
        <div data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500">
            <div className={`relative pt-0 pb-12 px-2 md:px-8 w-full lg:w-4/5 mx-auto ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
                <div className="absolute inset-0 z-0">
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-center opacity-40"
                    />
                </div>

                <div className={`w-full relative z-10 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <p className="text-center text-[8px] md:text-sm tracking-wide py-2">Featured On</p>
                    <div className={` ${theme === 'light' ? 'bg-gradient-to-r from-[#7a6ee6] via-[#6fa8f5] to-[#a6d4fa] rounded-2xl py-2 shadow-2xl relative overflow-hidden' : ''}`}>
                        <div className='flex gap-2 lg:gap-8 justify-center p-2 md:p-4'>
                            <Image
                                src={businessInsider}
                                width={100}
                                height={80}
                                alt="business insider logo"
                                className="hover:scale-110 transition-transform duration-200 w-16 lg:w-auto"
                            />
                            <Image
                                src={fiverr}
                                width={100}
                                height={80}
                                alt="Fiverr logo"
                                className="hover:scale-110 transition-transform duration-200 w-16 lg:w-auto"
                            />
                            <Image
                                src={hubSpot}
                                width={100}
                                height={80}
                                alt="HubSpot logo"
                                className="hover:scale-110 transition-transform duration-200 w-16 lg:w-auto"
                            />
                            <Image
                                src={buzzFeed}
                                width={100}
                                height={80}
                                alt="BuzzFeed logo"
                                className="hover:scale-110 transition-transform duration-200 w-16 lg:w-auto"
                            />
                        </div>
                    </div>
                </div>

                {/* AI Detector Bypass Section with Infinite Scroll */}
                <div className="relative z-10 mt-12 overflow-hidden">
                    {/* Title */}
                    <div className="text-center mb-8 relative z-10">
                        <h3 className="text-center text-[8px] md:text-sm mb-2 drop-shadow-lg">
                            Guaranteed To Bypass Every AI Detector
                        </h3>
                    </div>
                    {/* Gradient Background Container */}
                    <div className="bg-gradient-to-br from-gray-900 rounded-xl via-black to-gray-800 relative overflow-hidden">
                        <div className="backdrop-blur-xl bg-white/10 rounded-xl p-2 md:p-4 shadow-2xl border border-white/20 relative overflow-hidden w-full">
                            {/* Decorative Elements */}
                            <div className="absolute top-0 left-0 w-32 h-32 bg-white/10 rounded-full -translate-x-16 -translate-y-16"></div>
                            <div className="absolute bottom-0 right-0 w-24 h-24 bg-white/10 rounded-full translate-x-12 translate-y-12"></div>



                            {/* Infinite Scrolling Container */}
                            <div className="relative overflow-hidden mask-gradient">
                                <style jsx>{`
                                .mask-gradient {
                                    -webkit-mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
                                    mask-image: linear-gradient(to right, transparent 0%, black 10%, black 90%, transparent 100%);
                                }
                                @keyframes scroll-rtl {
                                    0% {
                                        transform: translateX(0);
                                    }
                                    100% {
                                        transform: translateX(-100%);
                                    }
                                }
                                .animate-scroll-rtl {
                                    animation: scroll-rtl 20s linear infinite;
                                }
                                .animate-scroll-rtl:hover {
                                    animation-play-state: paused;
                                }
                            `}</style>

                                {/* Scrolling Track */}
                                <div className="flex animate-scroll-rtl">
                                    {/* First Set of Logos */}
                                    <div className="flex items-center space-x-8 md:space-x-12 flex-shrink-0">
                                        <div className="group">
                                            <Image
                                                src={winstone}
                                                width={140}
                                                height={70}
                                                alt="Winston logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={originality}
                                                width={140}
                                                height={70}
                                                alt="Originality logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={aiseo}
                                                width={140}
                                                height={70}
                                                alt="AISEO logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={chatgptZero}
                                                width={140}
                                                height={70}
                                                alt="ChatGPT Zero logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={crossplage}
                                                width={140}
                                                height={70}
                                                alt="Crossplag logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={turnitin}
                                                width={140}
                                                height={70}
                                                alt="Turnitin logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                    </div>

                                    {/* Duplicate Set for Seamless Loop */}
                                    <div className="flex items-center space-x-8 md:space-x-12 flex-shrink-0 ml-8 md:ml-12">
                                        <div className="group">
                                            <Image
                                                src={winstone}
                                                width={140}
                                                height={70}
                                                alt="Winston logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={originality}
                                                width={140}
                                                height={70}
                                                alt="Originality logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={aiseo}
                                                width={140}
                                                height={70}
                                                alt="AISEO logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={chatgptZero}
                                                width={140}
                                                height={70}
                                                alt="ChatGPT Zero logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={crossplage}
                                                width={140}
                                                height={70}
                                                alt="Crossplag logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                        <div className="group">
                                            <Image
                                                src={turnitin}
                                                width={140}
                                                height={70}
                                                alt="Turnitin logo"
                                                className="h-12 md:h-16 object-contain filter brightness-0 invert group-hover:scale-110 transition-all duration-300 drop-shadow-md w-20 lg:w-auto"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
