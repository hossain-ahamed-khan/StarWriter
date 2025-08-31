"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import mainLogo from '../../../../public/resources/images/main-logo.png';
import circleBg from "../../../../public/resources/images/circle-bg.png";

const VerifyCodePage = () => {
    const [email, setEmail] = useState('');

    const handleSubmit = () => {
        console.log('Send OTP to:', email);
    };

    return (
        <div className="min-h-screen bg-black flex items-center justify-center p-4 relative">
            <div className="w-full max-w-md">

                <div className="absolute inset-0 z-0">
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-cover opacity-40"
                    />
                </div>

                <div className="space-y-6 relative z-10">
                    <div className="flex justify-center">
                        <Image
                            src={mainLogo}
                            width={50}
                            height={50}
                            alt="main logo"
                        />
                    </div>
                    {/* Title */}
                    <h1 className="text-3xl font-bold text-white text-center mb-8">
                        Enter Verification Code
                    </h1>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium text-gray-300 block">
                            OTP
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Email address"
                            className="w-full px-4 py-3 bg-gray-900 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200"
                            required
                        />
                    </div>

                    {/* Send OTP Button */}
                    <button
                        onClick={handleSubmit}
                        className="w-full bg-white hover:bg-gray-100 text-gray-900 font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-6"
                    >
                        Submit
                    </button>
                </div>
            </div>
        </div>
    );
};

export default VerifyCodePage;
