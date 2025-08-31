"use client"
import { Packages } from '@/components/home/Packages';
import { useTheme } from 'next-themes';
import React from 'react'

export default function PricingPage() {
    const { theme } = useTheme();

    return (
        <div className={`${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className='w-full lg:w-3/5 mx-auto text-center pt-8'>
                <h1 className='text-4xl font-bold'>Plans That Grow With You</h1>
                <p className='mt-4 text-lg'>From first steps to full speed, our pricing fits your journey—simple, flexible, and transparent.</p>
            </div>

            <Packages />
        </div>
    )
}
