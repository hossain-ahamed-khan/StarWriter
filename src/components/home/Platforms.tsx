"use client"
import Image from "next/image"
import forbes from '../../../public/resources/images/companiesLogo/forbes.png';
import hubspot from '../../../public/resources/images/companiesLogo/hubspot.png';
import fiverr from '../../../public/resources/images/companiesLogo/fiverr.png';
import businessInsider from '../../../public/resources/images/companiesLogo/Business-Insider-Logo.png';
import buzzFeed from '../../../public/resources/images/companiesLogo/BuzzFeed-Logo.png';
import chatGpt from '../../../public/resources/images/companiesLogo/chatgpt.1c4a07b2.webp';
import contentAtScale from '../../../public/resources/images/companiesLogo/content-at-scale.webp';
import crossplage from '../../../public/resources/images/companiesLogo/crossplag.webp';
import noGPT from '../../../public/resources/images/companiesLogo/noGPT.webp';
import aiSeo from '../../../public/resources/images/companiesLogo/aiSEO.webp';
import writefull from '../../../public/resources/images/companiesLogo/writefull-logo-white.png';
import originality from '../../../public/resources/images/companiesLogo/originality.webp';
import winstone from '../../../public/resources/images/companiesLogo/winstone.webp';


export const Platforms = () => {
    return (
        <div data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500">
            <div className="relative bg-gradient-to-r from-[#1a1e2e]/30 via-[#1f2134]/20 to-[#23243a]/0 py-12 px-2 md:px-8 overflow-hidden">
                {/* Soft blurred accent background for extra depth */}
                <div className="absolute -top-24 -left-24 w-96 h-96 blur-3xl opacity-70 pointer-events-none z-0"></div>
                <div className="absolute -bottom-24 -right-24 w-96 h-96 opacity-70 pointer-events-none z-0"></div>
                <div className="relative z-10">
                    <p className="text-center font-semibold text-white/80 tracking-wide">Featured On</p>
                    <div className="flex gap-12 justify-center py-4">
                        <Image
                            src={forbes}
                            width={80}
                            height={80}
                            alt="Forbes logo"
                        />
                        <Image
                            src={hubspot}
                            width={80}
                            height={80}
                            alt="Hubspot logo"
                        />
                        <Image
                            src={fiverr}
                            width={80}
                            height={80}
                            alt="Fiverr logo"
                        />
                    </div>
                </div>
                <p className="text-center text-xl font-semibold mt-8 mb-8 bg-gradient-to-r from-[#b993d6] to-[#8ca6db] text-transparent bg-clip-text drop-shadow-[0_2px_12px_rgba(185,147,214,0.3)]">Guaranteed To Bypass Every AI Detectors</p>
                <div
                    className="relative overflow-hidden my-4 py-4 rounded-2xl border border-[#23243a]/40 shadow-lg bg-gradient-to-r from-[#23243a] via-[#2e335a] to-[#3d3a4a]"
                    style={{ height: 80 }}
                >
                    <div className="marquee-vertical-track-rows">
                        {/* 8 images per row, then move rows vertically in a loop */}
                        {(() => {
                            const images = [
                                winstone, originality, writefull, aiSeo, noGPT, crossplage, contentAtScale, chatGpt, buzzFeed, businessInsider, fiverr, hubspot, forbes, writefull, aiSeo, noGPT
                            ];
                            const rows = [];
                            for (let i = 0; i < images.length; i += 8) {
                                rows.push(images.slice(i, i + 8));
                            }
                            // Duplicate rows for seamless loop
                            return [...rows, ...rows].map((row, idx) => (
                                <div key={"row-" + idx} className="marquee-img-row">
                                    {row.map((img, j) => (
                                        <div key={j} className="marquee-img-vertical-wrapper">
                                            <Image
                                                src={img}
                                                width={120}
                                                height={120}
                                                alt="Platform logo"
                                                className="inline-block"
                                                priority={idx === 0 && j === 0}
                                            />
                                        </div>
                                    ))}
                                </div>
                            ));
                        })()}
                    </div>
                </div>
                <style jsx>{`
                .marquee-vertical-track-rows {
                    display: flex;
                    flex-direction: column;
                    animation: marquee-vertical-rows-down 15s linear infinite;
                    will-change: transform;
                }
                .marquee-img-row {
                    display: flex;
                    flex-direction: row;
                    justify-content: center;
                    align-items: center;
                    gap: 5rem;
                    margin-bottom: 20px;
                }
                .marquee-img-vertical-wrapper {
                    display: flex;
                    align-items: center;
                }
                @keyframes marquee-vertical-rows-down {
                    0% { transform: translateY(-50%); }
                    100% { transform: translateY(0); }
                }
            `}</style>
            </div>
        </div>
    )
}
