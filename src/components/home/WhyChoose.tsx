import { RiPoliceBadgeLine } from "react-icons/ri";
import { PiShootingStarThin } from "react-icons/pi";
import circleBg from "../../../public/resources/images/circle-bg.png";
import { MdOutlineLock } from "react-icons/md";
import { BiBrain } from "react-icons/bi";
import { GoClock } from "react-icons/go";
import Image from "next/image";
import styles from "./WhyChoose.module.css";

export const WhyChoose = () => {
    return (
        <div className="w-full relative">
            <div className="absolute inset-0 z-0">
                <Image
                    src={circleBg}
                    fill
                    alt="circle background"
                    className="object-center opacity-40"
                />
            </div>
            <div className="w-[95%] sm:w-4/5 mx-auto pb-8">
                <div className="pb-8">
                    <h1 className="text-3xl sm:text-5xl font-bold pb-4 text-center sm:text-left">Why Choose our ai Humanizer?</h1>
                    <p className="text-[#676665] text-base sm:text-lg text-center sm:text-left">Discover what makes us stand out from robotic rewriters — crafted for clarity, tone, and real human connection.</p>
                </div>
                <div className="flex flex-col lg:flex-row gap-4">
                    <div className="w-full lg:w-2/5 space-y-4">
                        <div data-aos="fade-down-right">
                            <div className={styles["whychoose-card"] + " p-2"}>
                                <div className={styles["whychoose-card"] + " p-4"}>
                                    <div className={styles["icon-glow"] + " inline-block p-1"}><RiPoliceBadgeLine /></div>
                                    <h2 className="text-xl sm:text-2xl font-bold my-4">Academic Integrity Safe</h2>
                                    <p className="text-xs sm:text-sm">Transform AI-generated drafts into polished academic content while maintaining ethical guidelines and original ideas.</p>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-up-right">
                            <div className={styles["whychoose-card"] + " p-2"}>
                                <div className={styles["whychoose-card"] + " p-4"}>
                                    <div className={styles["icon-glow"] + " inline-block p-1"}><PiShootingStarThin /></div>
                                    <h2 className="text-xl sm:text-2xl font-bold my-4">Semantic Pattern Randomization</h2>
                                    <p className="text-xs sm:text-sm">Our AI Tuumanizer boaks Al pattams while preserving meaning, malong content completely undetectable by all detection took</p>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={"w-full lg:w-1/5 " + styles["whychoose-card"] + " p-2"}>
                        <div className={styles["whychoose-card"] + " h-full p-4 flex flex-col justify-between"}>
                            <div className={styles["icon-glow"] + " block w-6.5 p-1"}><MdOutlineLock /></div>
                            <div>
                                <h2 className="text-xl sm:text-2xl font-bold my-4">99.9% Bypass Success Rate</h2>
                                <p className="text-xs sm:text-sm">Transform AI-generated drafts into polished academic content while maintaining ethical guidelines and original ideas.</p>
                            </div>
                        </div>
                    </div>
                    <div className="w-full lg:w-2/5 space-y-4">
                        <div data-aos="fade-down-left">
                            <div className={styles["whychoose-card"] + " p-2"}>
                                <div className={styles["whychoose-card"] + " p-4"}>
                                    <div className={styles["icon-glow"] + " inline-block p-1"}><BiBrain /></div>
                                    <h2 className="text-xl sm:text-2xl font-bold my-4">Human-like Variability</h2>
                                    <p className="text-xs sm:text-sm">We introduce natural inconsistencies in writing style Uhat mimit, authentic humant writing <br /> patterns</p>
                                </div>
                            </div>
                        </div>
                        <div data-aos="fade-up-left">
                            <div className={styles["whychoose-card"] + " p-2"}>
                                <div className={styles["whychoose-card"] + " p-4"}>
                                    <div className={styles["icon-glow"] + " inline-block p-1"}><GoClock /></div>
                                    <h2 className="text-xl sm:text-2xl font-bold my-4">Lightning-Fast Processing</h2>
                                    <p className="text-xs sm:text-sm">Procese thousands of words in seconds with our optimized Al humanizing technology, saving you time and effort.</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
