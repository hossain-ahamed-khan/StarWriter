import { useTheme } from 'next-themes';
import React from 'react';

const TestimonialsScroll = () => {
    const { theme } = useTheme();
    // Upper row testimonials (scrolling left to right)
    const upperTestimonials = [
        {
            name: "Emma Roberts",
            university: "University of Toronto, Canada",
            text: "As a law student, precision matters. Starwriter helps me maintain my voice while staying accurate.",
            avatar: "ER"
        },
        {
            name: "Liam Johnson",
            university: "Harvard University, USA",
            text: "As a graduate student, authenticity matters. Starwriter transforms my work while keeping it genuine.",
            avatar: "LJ"
        },
        {
            name: "Sophia Patel",
            university: "University of Edinburgh, UK",
            text: "Starwriter helped me make my research papers sound professional without losing my style.",
            avatar: "SP"
        },
        {
            name: "Ethan Carter",
            university: "Columbia University, USA",
            text: "Starwriter helped me make my research papers sound professional without losing my style.",
            avatar: "EC"
        }
    ];

    // Lower row testimonials (scrolling right to left)
    const lowerTestimonials = [
        {
            name: "Maya Singh",
            university: "MIT, USA",
            text: "Starwriter saved me hours on assignments. The AI-generated text now feels completely mine.",
            avatar: "MS"
        },
        {
            name: "Isabella Nguyen",
            university: "University of British Columbia, Canada",
            text: "Even complex reports sound natural with Starwriter. It is a game changer for professionals.",
            avatar: "IN"
        },
        {
            name: "Lucas Bennett",
            university: "University of Oxford, UK",
            text: "Starwriter helped me make my research papers sound professional without losing my style.",
            avatar: "LB"
        },
        {
            name: "Mia Thompson",
            university: "University of California, Berkeley, USA",
            text: "I was skeptical at first, but Starwriter makes my content sound completely human. It is amazing!",
            avatar: "MT"
        },
        {
            name: "Alex Chen",
            university: "Stanford University, USA",
            text: "As a graduate student, authenticity matters. Starwriter transforms my work while keeping it genuine.",
            avatar: "AC"
        }
    ];

    // Duplicate arrays for seamless looping
    const duplicatedUpper = [...upperTestimonials, ...upperTestimonials];
    const duplicatedLower = [...lowerTestimonials, ...lowerTestimonials];

    type Testimonial = {
        name: string;
        university: string;
        text: string;
        avatar: string;
    };

    const TestimonialCard = ({
        testimonial,
        index,
    }: {
        testimonial: Testimonial;
        index: number;
    }) => (
        <div className="flex-shrink-0 w-64 sm:w-80 md:w-96 mx-1 sm:mx-2 md:mx-4">
            <div className={`h-32 lg:h-52 rounded-xl p-2 sm:p-4 md:p-6 backdrop-blur-sm transition-all duration-300 ${theme === 'light' ? 'bg-white text-black border border-black/30' : 'bg-[#010006] text-white border border-white/20'}`}>
                <p className={`text-[11px] sm:text-xs md:text-sm leading-relaxed mb-4 sm:mb-6 md:mb-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-gray-300'}`}>
                    "{testimonial.text}"
                </p>
                <hr className='border border-white/10 mb-4' />
                <div className="flex items-center space-x-1 sm:space-x-2 md:space-x-3">
                    <div className={`w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex items-center justify-center text-[10px] sm:text-xs md:text-sm font-semibold ${theme === 'light' ? 'bg-white text-black' : 'bg-white/20 text-white'}`}>
                        {testimonial.avatar}
                    </div>
                    <div>
                        <div className={`font-medium text-[10px] sm:text-xs md:text-sm ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>{testimonial.name}</div>
                        <div className="text-gray-400 text-[9px] sm:text-[10px] md:text-xs">{testimonial.university}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`py-8 sm:py-10 lg:py-20 my-8 sm:my-16 overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-8 mb-10 sm:mb-16">
                <h2 className="text-2xl sm:text-4xl md:text-5xl font-bold text-center mb-2 sm:mb-4">
                    Discover the Power of Starwriter with Real Stories
                </h2>
                <p className="text-gray-400 text-center text-sm sm:text-lg max-w-3xl mx-auto">
                    Starwriter completely changed how I write my essays. My grades improved, and it saves me so much time!
                </p>
            </div>

            <div className="space-y-6 sm:space-y-8">
                {/* Upper row - Left to Right */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex flex-row sm:flex-row animate-scroll-left"
                        style={{
                            animationDuration: '30s',
                            animationTimingFunction: 'linear',
                            animationIterationCount: 'infinite',
                            width: 'max-content',
                        }}
                    >
                        {[...duplicatedUpper, ...duplicatedUpper].map((testimonial, index) => (
                            <TestimonialCard key={`upper-${index}`} testimonial={testimonial} index={index} />
                        ))}
                    </div>
                </div>

                {/* Lower row - Right to Left */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex flex-row sm:flex-row animate-scroll-right"
                        style={{
                            animationDuration: '35s',
                            animationTimingFunction: 'linear',
                            animationIterationCount: 'infinite',
                            width: 'max-content',
                        }}
                    >
                        {[...duplicatedLower, ...duplicatedLower].map((testimonial, index) => (
                            <TestimonialCard key={`lower-${index}`} testimonial={testimonial} index={index} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Custom CSS for animations */}
            <style jsx>{`
                @keyframes scroll-left {
                    0% {
                        transform: translateX(0);
                    }
                    100% {
                        transform: translateX(-50%);
                    }
                }

                @keyframes scroll-right {
                    0% {
                        transform: translateX(-50%);
                    }
                    100% {
                        transform: translateX(0);
                    }
                }

                .animate-scroll-left {
                    animation: scroll-left var(--duration, 30s) linear infinite;
                }

                .animate-scroll-right {
                    animation: scroll-right var(--duration, 35s) linear infinite;
                }

                /* Optional: Pause animation on hover for better UX */
                .animate-scroll-left:hover,
                .animate-scroll-right:hover {
                    animation-play-state: paused;
                }
            `}</style>

            {/* Background decorative elements */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
                <div className="absolute top-1/3 left-1/4 w-60 sm:w-96 h-60 sm:h-96 rounded-full bg-blue-500/3 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-60 sm:w-96 h-60 sm:h-96 rounded-full bg-purple-500/3 blur-3xl animate-pulse delay-1000"></div>
            </div>
        </div>
    );
};

export default TestimonialsScroll;