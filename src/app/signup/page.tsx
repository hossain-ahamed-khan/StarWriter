"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import mainLogo from '../../../public/resources/images/main-logo.png';
import circleBg from "../../../public/resources/images/circle-bg.png";
import Link from 'next/link';

const SignUpForm = () => {
    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        hearAbout: 'Facebook',
        password: '',
        confirmPassword: '',
        agreeToUpdates: false
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value, type } = target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' && 'checked' in target ? (target as HTMLInputElement).checked : value
        }));
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

                {/* Form */}
                <div className="relative z-10">
                    <div className="flex justify-center pb-8">
                        <Image
                            src={mainLogo}
                            width={50}
                            height={50}
                            alt="main logo"
                        />
                    </div>
                    <h1 className="text-2xl font-semibold text-white text-center mb-8">
                        Create your free account
                    </h1>

                    <div className="space-y-4">
                        {/* Full Name */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Full Name
                            </label>
                            <input
                                type="text"
                                name="fullName"
                                value={formData.fullName}
                                onChange={handleChange}
                                placeholder="Enter your full name"
                                className="w-full px-4 py-1 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Email */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="Enter your email address here"
                                className="w-full px-4 py-1 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                required
                            />
                        </div>

                        {/* Where did you hear about us */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Where did you hear about us?
                            </label>
                            <select
                                name="hearAbout"
                                value={formData.hearAbout}
                                onChange={handleChange}
                                className="w-full px-4 py-1 bg-slate-900/80 border border-slate-600 rounded-lg text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer"
                            >
                                <option value="Facebook">Facebook</option>
                                <option value="Twitter">Twitter</option>
                                <option value="Google">Google</option>
                                <option value="LinkedIn">LinkedIn</option>
                                <option value="Friend">Friend</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>

                        {/* Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="Enter your password"
                                    className="w-full px-4 py-1 pr-12 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Confirm Password */}
                        <div>
                            <label className="block text-sm font-medium text-slate-300 mb-2">
                                Confirm Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    name="confirmPassword"
                                    value={formData.confirmPassword}
                                    onChange={handleChange}
                                    placeholder="Enter your password again"
                                    className="w-full px-4 py-1 pr-12 bg-slate-900/80 border border-slate-600 rounded-lg text-white placeholder-slate-400 focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors"
                                    required
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-slate-300 transition-colors"
                                >
                                    {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                        </div>

                        {/* Checkbox */}
                        <div className="flex items-start space-x-3">
                            <input
                                type="checkbox"
                                name="agreeToUpdates"
                                id="agreeToUpdates"
                                checked={formData.agreeToUpdates}
                                onChange={handleChange}
                                className="mt-1 w-4 h-4 text-purple-600 bg-slate-900/80 border-slate-600 rounded focus:ring-purple-500 focus:ring-2"
                            />
                            <label htmlFor="agreeToUpdates" className="text-sm text-slate-300 leading-relaxed">
                                I'd like to receive updates, exclusive offers, and product news via email.
                            </label>
                        </div>

                        {/* Sign Up Button */}
                        <Link href="/signup/verify-code">
                            <button
                                className="w-full bg-white text-slate-900 py-1 rounded-lg font-medium hover:bg-slate-100 transition-colors focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 focus:ring-offset-slate-800"
                            >
                                Sign Up
                            </button>
                        </Link>

                        {/* Divider */}
                        <div className="relative my-6">
                            <div className="absolute inset-0 flex items-center">
                                <div className="w-full border-t border-slate-600"></div>
                            </div>
                            <div className="relative flex justify-center text-sm">
                                <span className="px-2 bg-slate-800 text-slate-400">or</span>
                            </div>
                        </div>

                        {/* Sign In Link */}
                        <div className="text-center">
                            <span className="text-slate-400 text-sm">Already have an account? </span>
                            <Link href="/login">
                                <button
                                    type="button"
                                    className="text-purple-400 text-sm hover:text-purple-300 transition-colors font-medium"
                                >
                                    Sign In
                                </button>
                            </Link>
                        </div>

                        {/* Google Sign In */}
                        <button
                            type="button"
                            className="w-full bg-transparent border border-slate-600 text-white py-1 rounded-lg font-medium hover:bg-slate-700/50 transition-colors flex items-center justify-center space-x-3"
                        >
                            <svg className="w-5 h-5" viewBox="0 0 24 24">
                                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                            </svg>
                            <span>Continue with Google</span>
                        </button>
                    </div>
                </div>
            </div>
        </div >
    );
};

export default SignUpForm;