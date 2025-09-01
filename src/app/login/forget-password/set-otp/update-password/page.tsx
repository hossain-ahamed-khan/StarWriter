"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';

import mainLogo from '../../../../../../public/resources/images/main-logo.png';
import circleBg from "../../../../../../public/resources/images/circle-bg.png";
import Image from 'next/image';
import { useTheme } from 'next-themes';

const NewPasswordComponent = () => {
    const { theme } = useTheme();
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const handleSubmit = () => {
        if (password !== confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
        console.log('Update password:', password);
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 ${theme === 'light' ? 'bg-white text-black' : 'bg-black text-white'}`}>
            <div className="w-full max-w-md">

                <div className="absolute inset-0 z-0">
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-cover opacity-40"
                    />
                </div>

                <div className="space-y-6">
                    <div className="flex justify-center relative z-10">
                        <Image
                            src={mainLogo}
                            width={50}
                            height={50}
                            alt="main logo"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Enter new password
                    </h1>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium block">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                placeholder="Enter your password"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="confirmPassword" className="text-sm font-medium block">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirmPassword"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                placeholder="Enter your password again"
                                className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                    </div>

                    {/* Update Password Button */}
                    <button
                        onClick={handleSubmit}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg mt-6 ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        Update Password
                    </button>
                </div>
            </div>
        </div>
    );
};

export default NewPasswordComponent;