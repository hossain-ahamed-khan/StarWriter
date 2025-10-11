"use client"
import React, { useState, useEffect } from 'react';
import { Eye, EyeOff, CheckCircle } from 'lucide-react';
import mainLogo from '../../../../../../public/resources/images/main-logo.png';
import circleBg from "../../../../../../public/resources/images/circle-bg.png";
import Image from 'next/image';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';

const NewPasswordComponent = () => {
    const { theme } = useTheme();
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        password: '',
        confirm_password: ''
    });
    
    const [errors, setErrors] = useState({
        password: '',
        confirm_password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccessModal, setShowSuccessModal] = useState(false);

    // Check if reset token exists on mount
    useEffect(() => {
        const resetToken = sessionStorage.getItem('reset_token');
        const tokenExpires = sessionStorage.getItem('reset_token_expires');
        
        if (!resetToken) {
            toast.error('No reset token found. Please start from forgot password.');
            router.push('/login/forget-password');
            return;
        }

        // Check if token is expired
        if (tokenExpires && Date.now() > parseInt(tokenExpires)) {
            toast.error('Reset token expired. Please request a new OTP.');
            sessionStorage.clear();
            router.push('/login/forget-password');
        }
    }, [router]);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
        
        // Clear error when user types
        if (name in errors) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {
            password: '',
            confirm_password: ''
        };

        let isValid = true;

        if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters long';
            isValid = false;
        }

        if (formData.password !== formData.confirm_password) {
            newErrors.confirm_password = 'Passwords do not match';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            toast.error('Please fix the errors in the form');
        }

        return isValid;
    };

    // Handle form submission
    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        const resetToken = sessionStorage.getItem('reset_token');
        
        if (!resetToken) {
            toast.error('Reset token not found. Please start over.');
            router.push('/login/forget-password');
            return;
        }

        setIsLoading(true);

        try {
            const response = await apiClient.post('/user_auth/set-password/', {
                reset_token: resetToken,
                new_password: formData.password,
                confirm_password: formData.confirm_password
            });

            // Store tokens in localStorage and log the user in
            if (response.data?.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('user_role', response.data.role);
                
                // Get user's full name if available
                const email = sessionStorage.getItem('reset_email');
                if (email) {
                    const fullName = email.split('@')[0].charAt(0).toUpperCase() + email.split('@')[0].slice(1);
                    localStorage.setItem('full_name', fullName);
                }
            }

            // Clear session storage
            sessionStorage.clear();

            // Show success modal
            setShowSuccessModal(true);
            
            // Redirect to homepage after 3 seconds
            setTimeout(() => {
                router.push('/');
            }, 3000);
        } catch (error: any) {
            const errorCode = error.response?.data?.code;
            const errorMessage = error.message || 'Failed to reset password. Please try again.';

            toast.error(errorMessage);

            if (errorCode === 'TOKEN_EXPIRED') {
                setErrors(prev => ({ 
                    ...prev, 
                    password: 'Reset token expired. Please request a new OTP.' 
                }));
                
                setTimeout(() => {
                    sessionStorage.clear();
                    router.push('/login/forget-password');
                }, 2000);
            } else if (errorCode === 'PASSWORD_MISMATCH') {
                setErrors(prev => ({ ...prev, confirm_password: errorMessage }));
            } else if (errorCode === 'WEAK_PASSWORD') {
                setErrors(prev => ({ ...prev, password: errorMessage }));
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
                        Enter new password
                    </h1>

                    <p className="text-center text-sm opacity-80 mb-6">
                        Choose a strong password to secure your account.
                    </p>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium block">
                            New Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your new password"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                                disabled={isLoading}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password}</p>
                        )}
                    </div>

                    {/* Confirm Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="confirm_password" className="text-sm font-medium block">
                            Confirm New Password
                        </label>
                        <div className="relative">
                            <input
                                id="confirm_password"
                                name="confirm_password"
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={formData.confirm_password}
                                onChange={handleChange}
                                placeholder="Enter your password again"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 ${errors.confirm_password ? 'border-red-500' : ''}`}
                                disabled={isLoading}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
                                disabled={isLoading}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                        </div>
                        {errors.confirm_password && (
                            <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
                        )}
                    </div>

                    {/* Update Password Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {isLoading ? 'Updating Password...' : 'Update Password'}
                    </button>
                </form>
            </div>

            {/* Success Modal */}
            <AnimatePresence>
                {showSuccessModal && (
                    <>
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
                        />

                        <motion.div
                            initial={{ opacity: 0, scale: 0.8, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.8, y: 20 }}
                            transition={{ type: "spring", duration: 0.5 }}
                            className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-50 w-[90%] sm:w-full max-w-sm sm:max-w-md mx-auto"
                        >
                            <div className={`rounded-2xl shadow-2xl overflow-hidden ${theme === 'light' ? 'bg-white' : 'bg-black/95'} border border-purple-500/30 backdrop-blur-lg`}>
                                <div className="bg-gradient-to-r from-[#7a73e8] via-[#CAA9D3] to-[#B7D6EF] p-4 sm:p-6">
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ delay: 0.2, type: "spring" }}
                                        className="flex justify-center"
                                    >
                                        <div className="bg-white rounded-full p-2 sm:p-3">
                                            <CheckCircle className="text-green-500" size={40} />
                                        </div>
                                    </motion.div>
                                </div>

                                <div className="p-4 sm:p-6 text-center">
                                    <motion.h2
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.3 }}
                                        className="text-xl sm:text-2xl font-bold mb-2"
                                    >
                                        Password Reset Successful!
                                    </motion.h2>
                                    
                                    <motion.p
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: 0.4 }}
                                        className="text-xs sm:text-sm opacity-70 mb-4 sm:mb-6 px-2"
                                    >
                                        Your password has been successfully updated. You're now logged in and will be redirected to the homepage.
                                    </motion.p>

                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ delay: 0.5 }}
                                        className="flex items-center justify-center gap-2 text-purple-500"
                                    >
                                        <div className="flex gap-1">
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0 }}
                                                className="w-2 h-2 bg-purple-500 rounded-full"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.2 }}
                                                className="w-2 h-2 bg-purple-500 rounded-full"
                                            />
                                            <motion.div
                                                animate={{ scale: [1, 1.2, 1] }}
                                                transition={{ repeat: Infinity, duration: 1, delay: 0.4 }}
                                                className="w-2 h-2 bg-purple-500 rounded-full"
                                            />
                                        </div>
                                        <span className="text-xs sm:text-sm">Redirecting...</span>
                                    </motion.div>
                                </div>
                            </div>
                        </motion.div>
                    </>
                )}
            </AnimatePresence>
        </div>
    );
};

export default NewPasswordComponent;
