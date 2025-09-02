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
            <div className={`relative pt-0 pb-12 px-2 md:px-8 w-full lg:w-4/5 mx-auto ${theme === 'light' ? 'bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] text-black' : 'bg-black text-white'}`}>
                <div className="absolute inset-0 z-0">
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-center opacity-40"
                    />
                </div>

                <div className={`w-full relative z-10 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <p className="text-center font-semibold text-lg tracking-wide py-2">Featured On</p>
                    <div className='flex gap-0 lg:gap-8 justify-center py-4'>
                        <Image
                            src={businessInsider}
                            width={100}
                            height={80}
                            alt="business insider logo"
                            className="hover:scale-110 transition-transform duration-200 w-24 lg:w-auto"
                        />
                        <Image
                            src={fiverr}
                            width={100}
                            height={80}
                            alt="Fiverr logo"
                            className="hover:scale-110 transition-transform duration-200 w-24 lg:w-auto"
                        />
                        <Image
                            src={hubSpot}
                            width={100}
                            height={80}
                            alt="HubSpot logo"
                            className="hover:scale-110 transition-transform duration-200 w-24 lg:w-auto"
                        />
                        <Image
                            src={buzzFeed}
                            width={100}
                            height={80}
                            alt="BuzzFeed logo"
                            className="hover:scale-110 transition-transform duration-200 w-24 lg:w-auto"
                        />
                    </div>
                </div>

                <div className={`relative z-10 ${theme === 'light' ? 'text-black' : 'text-white'}`}>
                    <p className="text-center text-lg font-semibold mt-8">Guaranteed To Bypass Every AI Detectors</p>
                    <div className='w-4/5 mx-auto grid grid-cols-3 lg:flex items-center justify-between gap-2 lg:gap-8 py-4'>
                        <Image
                            src={winstone}
                            width={150}
                            height={80}
                            alt="Winston logo"
                            className="hover:scale-110 transition-transform duration-200 border"
                        />
                        <Image
                            src={originality}
                            width={150}
                            height={80}
                            alt="Originality logo"
                            className="hover:scale-110 transition-transform duration-200 border"
                        />
                        <Image
                            src={aiseo}
                            width={150}
                            height={80}
                            alt="AISEO logo"
                            className="hover:scale-110 transition-transform duration-200 border"
                        />
                        <Image
                            src={chatgptZero}
                            width={150}
                            height={80}
                            alt="ChatGPT Zero logo"
                            className="hover:scale-110 transition-transform duration-200 border"
                        />
                        <Image
                            src={crossplage}
                            width={150}
                            height={80}
                            alt="Crossplag logo"
                            className="hover:scale-110 transition-transform duration-200"
                        />
                        <Image
                            src={turnitin}
                            width={150}
                            height={80}
                            alt="Turnitin logo"
                            className="hover:scale-110 transition-transform duration-200"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}
