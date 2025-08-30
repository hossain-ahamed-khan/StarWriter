"use client"
import Image from "next/image"
import circleBg from "../../../public/resources/images/circle-bg.png";

import aiseo from '../../../public/resources/images/companiesLogo/AISEO.png';
import businessInsider from '../../../public/resources/images/companiesLogo/business insider.png';
import buzzFeed from '../../../public/resources/images/companiesLogo/buzz feed.png';
import chatgptZero from '../../../public/resources/images/companiesLogo/ChatGPT zero.png';
import crossplage from '../../../public/resources/images/companiesLogo/Crossplag.png';
import fiverr from '../../../public/resources/images/companiesLogo/fiverr.png';
import hubSpot from '../../../public/resources/images/companiesLogo/hubspot.png';
import originality from '../../../public/resources/images/companiesLogo/originality ai.png';
import turnitin from '../../../public/resources/images/companiesLogo/turnitin.png';
import winstone from '../../../public/resources/images/companiesLogo/winston.png';
import { useTheme } from "next-themes";


export const Platforms = () => {
    const { theme } = useTheme();
    return (
        <div data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500">
            <div className={`relative pt-8 pb-24 px-2 md:px-8 overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
                <div className="absolute inset-0 z-0">
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-center opacity-40"
                    />
                </div>

                <div className="relative z-10">
                    <p className="text-center font-semibold text-white text-xl tracking-wide">Featured On</p>
                    <div className="flex gap-2 lg:gap-8 justify-center items-center py-4">
                        <Image
                            src={businessInsider}
                            width={120}
                            height={80}
                            alt="business insider logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-30 lg:h-15"
                        />
                        <Image
                            src={fiverr}
                            width={120}
                            height={80}
                            alt="Fiverr logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-30 lg:h-15"
                        />
                        <Image
                            src={hubSpot}
                            width={120}
                            height={80}
                            alt="HubSpot logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-30 lg:h-15"
                        />
                        <Image
                            src={buzzFeed}
                            width={120}
                            height={80}
                            alt="BuzzFeed logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-30 lg:h-15"
                        />
                    </div>
                </div>

                <div className="relative z-10">
                    <p className="text-center text-xl font-semibold mt-12 bg-gradient-to-r from-[#b993d6] to-[#8ca6db] text-transparent bg-clip-text drop-shadow-[0_2px_12px_rgba(185,147,214,0.3)]">Guaranteed To Bypass Every AI Detectors</p>
                    <div className="grid grid-cols-3 lg:flex gap-2 lg:gap-8 justify-center items-center py-4">
                        <Image
                            src={winstone}
                            width={150}
                            height={80}
                            alt="Winston logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-40 lg:h-20"
                        />
                        <Image
                            src={originality}
                            width={150}
                            height={80}
                            alt="Originality logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-40 lg:h-20"
                        />
                        <Image
                            src={aiseo}
                            width={150}
                            height={80}
                            alt="AISEO logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-40 lg:h-20"
                        />
                        <Image
                            src={chatgptZero}
                            width={150}
                            height={80}
                            alt="ChatGPT Zero logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-40 lg:h-20"
                        />
                        <Image
                            src={crossplage}
                            width={150}
                            height={80}
                            alt="Crossplag logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-40 lg:h-20"
                        />
                        <Image
                            src={turnitin}
                            width={150}
                            height={80}
                            alt="Turnitin logo"
                            className="hover:scale-110 transition-transform duration-200 w-20 h-10 lg:w-40 lg:h-20"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
