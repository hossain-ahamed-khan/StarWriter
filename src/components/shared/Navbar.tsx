import Image from 'next/image'
import React from 'react'
import mainLogo from '@/resources/images/main-logo.png'

export const Navbar = () => {
    return (
        <div className='w-full bg-[#010006] py-4'>
            <div className='w-1/2 mx-auto flex items-center justify-between border border-[#3B3131] px-8 py-4 rounded-full [&>button]:text-xs'>
                <div>
                    <Image
                        src={mainLogo}
                        width={24}
                        height={35}
                        alt="main Logo"
                    />
                </div>
                <button>HOME</button>
                <button>AI HUMANIZER</button>
                <button>CHAT BOT</button>
                <button>BLOG</button>
                <button className='border border-white bg-gradient-to-r from-[#CAA9D3] via-[#828ED6] to-[#B7D6EF] rounded-full px-8 py-2'>JOIN</button>
                <button>
                    <input type="checkbox" className="toggle" />
                </button>
            </div>
        </div>
    )
}
