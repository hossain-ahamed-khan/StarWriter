"use client"
import Image from "next/image"
import forbes from '@/resources/images/companiesLogo/forbes.png';
import hubspot from '@/resources/images/companiesLogo/hubspot.png';
import fiverr from '@/resources/images/companiesLogo/fiverr.png';
import businessInsider from '@/resources/images/companiesLogo/Business-Insider-Logo.png';
import buzzFeed from '@/resources/images/companiesLogo/BuzzFeed-Logo.png';
import chatGpt from '@/resources/images/companiesLogo/chatgpt.1c4a07b2.webp';
import contentAtScale from '@/resources/images/companiesLogo/content-at-scale.webp';
import crossplage from '@/resources/images/companiesLogo/crossplag.webp';
import noGPT from '@/resources/images/companiesLogo/noGPT.webp';
import aiSeo from '@/resources/images/companiesLogo/aiSEO.webp';
import writefull from '@/resources/images/companiesLogo/writefull-logo-white.png';
import originality from '@/resources/images/companiesLogo/originality.webp';
import winstone from '@/resources/images/companiesLogo/winstone.webp';


export const Platforms = () => {
    return (
        <div>
            <div>
                <p className="text-center font-semibold">Featured On</p>
                <div className="flex gap-12 justify-center">
                    <Image
                        src={forbes}
                        width={80}
                        height={80}
                        alt="Picture of the author"
                    />
                    <Image
                        src={hubspot}
                        width={80}
                        height={80}
                        alt="Picture of the author"
                    />
                    <Image
                        src={fiverr}
                        width={80}
                        height={80}
                        alt="Picture of the author"
                    />
                </div>
            </div>
            <p className="text-center text-xl font-semibold mt-8">Guaranteed To Bypass Every AI Detectors</p>
            <div
                className="relative overflow-hidden my-4 py-4"
                style={{
                    height: 120,
                    background: "linear-gradient(90deg, #090505 0%, #828ED6 50%, #090505 100%)"
                }}
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
                    animation: marquee-vertical-rows 15s linear infinite;
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
                @keyframes marquee-vertical-rows {
                    0% { transform: translateY(0); }
                    100% { transform: translateY(-50%); }
                }
            `}</style>
        </div>
    )
}
