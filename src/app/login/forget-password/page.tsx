"use client"
import Image from 'next/image';
import React, { useState } from 'react';
import mainLogo from '../../../../public/resources/images/main-logo.png';
import circleBg from "../../../../public/resources/images/circle-bg.png";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';

const ForgetPasswordPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Form validation
    const validateForm = () => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            setError('Please enter a valid email address');
            toast.error('Please enter a valid email address');
            return false;
        }
        return true;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await apiClient.post('user_auth/send-passwordreset-otp/', {
                email: email
            });

            toast.success('OTP sent successfully! Check your email.');
            
            // Redirect to OTP verification page with email as query parameter
            router.push(`/login/forget-password/set-otp?email=${encodeURIComponent(email)}`);
        } catch (error: any) {
            const errorCode = error.response?.data?.code;
            const errorMessage = error.message || 'Failed to send OTP. Please try again.';

            toast.error(errorMessage);

            // Set inline error
            if (errorCode === 'EMAIL_NOT_FOUND') {
                setError(errorMessage);
            } else {
                setError(errorMessage);
            }
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
            <div className="w-full max-w-md">
                <div className="absolute inset-0 z-0">
                    <Image
                        src={circleBg}
                        fill
                        alt="circle background"
                        className="object-cover opacity-40"
                    />
                </div>

                <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
                    <div className="flex justify-center">
                        <Image
                            src={mainLogo}
                            width={50}
                            height={50}
                            alt="main logo"
                        />
                    </div>

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-center mb-4">
                        Reset your password
                    </h1>
                    <p className="text-center text-sm opacity-80 mb-6">
                        Enter your email address and we'll send you a verification code to reset your password.
                    </p>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email" className="text-sm font-medium block">
                            Email Address
                        </label>
                        <input
                            id="email"
                            type="email"
                            value={email}
                            onChange={(e) => {
                                setEmail(e.target.value);
                                setError(''); // Clear error when typing
                            }}
                            placeholder="Enter your email address"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${error ? 'border-red-500' : ''}`}
                            disabled={isLoading}
                            required
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1">{error}</p>
                        )}
                    </div>

                    {/* Send OTP Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {isLoading ? 'Sending OTP...' : 'Send OTP'}
                    </button>

                    {/* Back to Login */}
                    <div className="text-center mt-4">
                        <Link href="/login" className="text-sm text-purple-400 hover:text-purple-300 transition-colors">
                            ← Back to Login
                        </Link>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default ForgetPasswordPage;
