import React from 'react'
import { BsStars } from 'react-icons/bs'
import Image from 'next/image'
import circleImage from '@/resources/images/circle-bg.png';

export const TextCompare = () => {
    return (
        <div className='max-w-4/5 h-[800px] mx-auto relative py-16'>
            <div className="absolute inset-0">
                <Image
                    src={circleImage}
                    fill
                    alt="circle background"
                    className="object-center"
                    style={{ zIndex: 0 }}
                />
            </div>
            <div className='absolute z-10'>
                <div className='flex justify-between gap-8'>
                    <div className='flex-1 space-y-2'>
                        <div className='flex justify-between'>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-red-500"></div>
                                <span className="text-white">Original Text</span>
                            </div>
                            <p className='text-[#F35555] px-4 py-1 bg-[#FFFFFF1A] border border-[#524F4F] rounded-full'>100% Al</p>
                        </div>
                        <div className='h-[420px] bg-black border border-[#524F4F] rounded-2xl p-4'>
                            <p>Becoming successful in life requires setting clear goals, maintaining a strong work ethic, and continuously learning from experiences. It is important to stay focused and motivated, even when faced with challenges or setbacks. Building good habits, such as time management and effective communication, can help you make steady progress toward your objectives. Surrounding yourself with supportive and positive people also plays a crucial role in personal growth. Ultimately, success comes from perseverance, adaptability, and a willingness to keep improving yourself over time.</p>
                        </div>
                        <div className='flex gap-8'>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-white">Bypasses Turnitin</span>
                            </div>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-white">Bypasses GPTZero</span>
                            </div>
                        </div>
                    </div>
                    <div className='flex-1 space-y-2'>
                        <div className='flex justify-between'>
                            <div className="flex items-center space-x-2">
                                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                                <span className="text-white">Humanized Text</span>
                            </div>
                            <p className='text-[#51E688] px-4 py-1 bg-[#FFFFFF1A] border border-[#524F4F] rounded-full'>1% Al</p>
                        </div>
                        <div className='h-[420px] bg-black border border-[#524F4F] rounded-2xl p-4'>
                            <p>Achieving success in life involves establishing clear goals, upholding a strong work ethic, and consistently learning from your experiences. Staying focused and motivated is essential, especially when encountering obstacles or setbacks. Developing positive habits like managing your time well and communicating effectively can help you steadily move toward your goals. Additionally, having supportive and positive people around you is vital for personal growth. In the end, success is the result of perseverance, adaptability, and a continuous commitment to self-improvement.</p>
                        </div>
                    </div>
                </div>
                <div className='flex justify-center'>
                    <button className="flex gap-2 items-center mt-16 px-16 py-2 rounded-full bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] border-4 border-[#A69CD4]"><BsStars />Humanizer</button>
                </div>
            </div>
        </div>
    )
}
