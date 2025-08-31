"use client";
import Image from "next/image";
import mainLogo from '../../../../public/resources/images/main-logo.png';
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function AdminDashboardLogin() {
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className='bg-[#e6f0f5] w-full h-screen flex justify-center items-center flex-col'>
            <div className="w-11/12 md:w-1/4 mx-auto space-y-4 text-[#1A1A40]">
                <div className="flex justify-center">
                    <Image
                        src={mainLogo}
                        width={50}
                        height={50}
                        alt="main logo"
                    />
                </div>
                <h1 className="text-3xl font-semibold text-center">Login to Account</h1>
                <p className="text-lg text-center">Please enter your email and password to continue</p>
                <div className="mt-16">
                    <label htmlFor="name">Email address</label>
                    <br />
                    <input
                        type="text"
                        id="name"
                        className="bg-[#F8F8FF] w-full px-3 py-2 mt-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Enter your email address"
                    />
                </div>

                <div className="relative">
                    <label htmlFor="password">Password</label>
                    <br />
                    <input
                        type={showPassword ? "text" : "password"}
                        id="password"
                        className="bg-[#F8F8FF] relative w-full px-3 py-2 mt-2 border border-gray-300 rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900"
                        placeholder="Enter password"
                    />
                    <button
                        type="button"
                        onClick={() => setShowPassword((prev) => !prev)}
                        className="absolute px-4 right-0 bottom-0 -translate-y-1/2 text-gray-400 hover:text-gray-700 focus:outline-none"
                        tabIndex={-1}
                    >
                        {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                    </button>
                </div>

                <div className="w-full flex justify-between items-center">
                    <p className="flex gap-2 justify-center items-center "><Checkbox className="border-2 border-[#4B2A99]" />Remember Password</p>
                    <Link href="/admin-login/forget-password"><p>Forget Password?</p></Link>
                </div>

                <Button className="bg-[#006699] w-full py-5 text-white rounded-lg mt-10">Sign in</Button>

            </div>
        </div>
    )
}
