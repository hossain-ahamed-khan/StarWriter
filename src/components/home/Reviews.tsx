import { useTheme } from 'next-themes';
import React from 'react';

const TestimonialsScroll = () => {
    const { theme } = useTheme();
    // Upper row testimonials (scrolling left to right)
    const upperTestimonials = [
        {
            name: "Emma Roberts",
            university: "University of Toronto, Canada",
            text: "As a law student, precision matters. Zulio helps me maintain my voice while staying accurate.",
            avatar: "ER"
        },
        {
            name: "Liam Johnson",
            university: "Harvard University, USA",
            text: "As a graduate student, authenticity matters. Zulio transforms my work while keeping it genuine.",
            avatar: "LJ"
        },
        {
            name: "Sophia Patel",
            university: "University of Edinburgh, UK",
            text: "Zulio helped me make my research papers sound professional without losing my style.",
            avatar: "SP"
        },
        {
            name: "Ethan Carter",
            university: "Columbia University, USA",
            text: "Zulio helped me make my research papers sound professional without losing my style.",
            avatar: "EC"
        }
    ];

    // Lower row testimonials (scrolling right to left)
    const lowerTestimonials = [
        {
            name: "Maya Singh",
            university: "MIT, USA",
            text: "Zulio saved me hours on assignments. The AI-generated text now feels completely mine.",
            avatar: "MS"
        },
        {
            name: "Isabella Nguyen",
            university: "University of British Columbia, Canada",
            text: "Even complex reports sound natural with Zulio. It is a game changer for professionals.",
            avatar: "IN"
        },
        {
            name: "Lucas Bennett",
            university: "University of Oxford, UK",
            text: "Zulio helped me make my research papers sound professional without losing my style.",
            avatar: "LB"
        },
        {
            name: "Mia Thompson",
            university: "University of California, Berkeley, USA",
            text: "I was skeptical at first, but Zulio makes my content sound completely human. It is amazing!",
            avatar: "MT"
        },
        {
            name: "Alex Chen",
            university: "Stanford University, USA",
            text: "As a graduate student, authenticity matters. Zulio transforms my work while keeping it genuine.",
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
        <div className="flex-shrink-0 w-96 mx-4">
            <div className={` rounded-xl p-6 backdrop-blur-sm transition-all duration-300 ${theme === 'light' ? 'bg-white text-black border border-black/30' : 'bg-[#010006] text-white border border-white/20'}`}>
                <p className={` text-sm leading-relaxed mb-8 ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-gray-300'}`}>
                    "{testimonial.text}"
                </p>
                <hr className='border border-white/10 mb-4' />
                <div className="flex items-center space-x-3">
                    <div className={`w-10 h-10 rounded-full  flex items-center justify-center text-sm font-semibold ${theme === 'light' ? 'bg-white text-black' : 'bg-white/20 text-white'}`}>
                        {testimonial.avatar}
                    </div>
                    <div>
                        <div className={`font-medium text-sm ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>{testimonial.name}</div>
                        <div className="text-gray-400 text-xs">{testimonial.university}</div>
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <div className={`py-20 my-16 overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className="max-w-7xl mx-auto px-8 mb-16">
                <h2 className="text-4xl md:text-5xl font-bold text-center mb-4">
                    Discover the Power of Zulio with Real Stories
                </h2>
                <p className="text-gray-400 text-center text-lg max-w-3xl mx-auto">
                    Zulio completely changed how I write my essays. My grades improved, and it saves me so much time!
                </p>
            </div>

            <div className="space-y-8">
                {/* Upper row - Left to Right */}
                <div className="relative overflow-hidden">
                    <div
                        className="flex animate-scroll-left"
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
                        className="flex animate-scroll-right"
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
                <div className="absolute top-1/3 left-1/4 w-96 h-96 rounded-full bg-blue-500/3 blur-3xl animate-pulse"></div>
                <div className="absolute bottom-1/3 right-1/4 w-96 h-96 rounded-full bg-purple-500/3 blur-3xl animate-pulse delay-1000"></div>
            </div>
        </div>
    );
};

export default TestimonialsScroll;