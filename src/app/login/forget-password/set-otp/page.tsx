"use client"
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import mainLogo from '../../../../../public/resources/images/main-logo.png';
import circleBg from "../../../../../public/resources/images/circle-bg.png";
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useRouter, useSearchParams } from 'next/navigation';

const SetOtpPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const searchParams = useSearchParams();
    
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    // Get email from URL params when component mounts
    useEffect(() => {
        const emailFromUrl = searchParams.get('email');
        if (emailFromUrl) {
            setEmail(decodeURIComponent(emailFromUrl));
        } else {
            // If no email in URL, redirect back to forgot password
            toast.error('Please start from the forgot password page');
            router.push('/login/forget-password');
        }
    }, [searchParams, router]);

    // Handle OTP input change
    const handleOtpChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value.replace(/\D/g, ''); // Only allow digits
        if (value.length <= 6) {
            setOtp(value);
            setError('');
        }
    };

    // Form validation
    const validateForm = () => {
        if (!otp || otp.length !== 6) {
            setError('Please enter a valid 6-digit OTP');
            toast.error('Please enter a valid 6-digit OTP');
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
            const response = await apiClient.post('/user_auth/verify-passwordreset-otp/', {
                email: email,
                otp: otp
            });

            // Store reset token and expiry in sessionStorage (more secure than localStorage for temporary tokens)
            if (response.data?.reset_token) {
                sessionStorage.setItem('reset_token', response.data.reset_token);
                sessionStorage.setItem('reset_token_expires', String(Date.now() + (response.data.expires_in_seconds * 1000)));
                sessionStorage.setItem('reset_email', email);
            }

            toast.success('OTP verified successfully!');
            
            // Redirect to password reset page
            router.push('/login/forget-password/set-otp/update-password');
        } catch (error: any) {
            const errorCode = error.response?.data?.code;
            const errorMessage = error.message || 'Failed to verify OTP. Please try again.';

            toast.error(errorMessage);

            // Set inline error based on error code
            if (errorCode === 'OTP_INVALID' || errorCode === 'OTP_NOT_FOUND') {
                setError(errorMessage);
            } else if (errorCode === 'OTP_EXPIRED') {
                setError('OTP has expired. Please request a new one.');
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
                        Enter Verification Code
                    </h1>

                    <p className="text-center text-sm opacity-80 mb-6">
                        We've sent a 6-digit code to<br />
                        <span className="font-semibold text-purple-400">{email}</span>
                    </p>

                    {/* OTP Field */}
                    <div className="space-y-2">
                        <label htmlFor="otp" className="text-sm font-medium block text-center">
                            Verification Code
                        </label>
                        <input
                            id="otp"
                            name="otp"
                            type="text"
                            inputMode="numeric"
                            value={otp}
                            onChange={handleOtpChange}
                            placeholder="000000"
                            maxLength={6}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 text-center text-3xl tracking-[0.5em] font-bold ${error ? 'border-red-500' : ''}`}
                            disabled={isLoading}
                            autoFocus
                        />
                        {error && (
                            <p className="text-red-500 text-sm mt-1 text-center">{error}</p>
                        )}
                    </div>

                    {/* Submit Button */}
                    <button
                        type="submit"
                        disabled={isLoading || otp.length !== 6}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {isLoading ? 'Verifying...' : 'Verify & Continue'}
                    </button>

                    {/* Back Link */}
                    <div className="text-center mt-4">
                        <button
                            type="button"
                            onClick={() => router.push('/login/forget-password')}
                            className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
                            disabled={isLoading}
                        >
                            ← Back to Forgot Password
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default SetOtpPage;
