"use client"
import React, { useState } from 'react';
import { Eye, EyeOff } from 'lucide-react';
import Image from 'next/image';
import mainLogo from '../../../public/resources/images/main-logo.png';
import circleBg from "../../../public/resources/images/circle-bg.png";
import Link from 'next/link';
import { useTheme } from 'next-themes';
import { toast } from 'sonner';
import { apiClient } from '@/lib/api-client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import { useGoogleLogin } from '@react-oauth/google';

const LoginPage = () => {
    const { theme } = useTheme();
    const router = useRouter();
    
    const [formData, setFormData] = useState({
        email_or_username: '',
        password: '',
        remember_me: false
    });
    
    const [errors, setErrors] = useState({
        email_or_username: '',
        password: ''
    });
    
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
        
        if (name in errors) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {
            email_or_username: '',
            password: ''
        };

        let isValid = true;

        if (!formData.email_or_username.trim()) {
            newErrors.email_or_username = 'Please enter your email address';
            isValid = false;
        }

        if (!formData.password) {
            newErrors.password = 'Please enter your password';
            isValid = false;
        }

        setErrors(newErrors);

        if (!isValid) {
            toast.error('Please fill in all required fields');
        }

        return isValid;
    };

    // Handle regular form submission
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsLoading(true);

        try {
            const response = await apiClient.post('/user_auth/login/', {
                email_or_username: formData.email_or_username,
                password: formData.password,
                remember_me: formData.remember_me
            });

            if (response.data?.access) {
                localStorage.setItem('access_token', response.data.access);
                localStorage.setItem('refresh_token', response.data.refresh);
                localStorage.setItem('user_role', response.data.role);
                localStorage.setItem('full_name', response.data.full_name || '');
                
                // ✅ Dispatch event to update navbar
                window.dispatchEvent(new Event('auth-change'));
            }

            toast.success('Login successful! Welcome back.');
            
            setTimeout(() => {
                router.push('/');
            }, 1000);
        } catch (error: any) {
            const errorCode = error.response?.data?.code;
            const errorMessage = error.message || 'Login failed. Please try again.';

            toast.error(errorMessage);

            if (errorCode === 'ACCOUNT_NOT_FOUND') {
                setErrors(prev => ({ ...prev, email_or_username: errorMessage }));
            } else if (errorCode === 'PASSWORD_INCORRECT') {
                setErrors(prev => ({ ...prev, password: errorMessage }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    // Handle Google Login with authorization code flow
    // Handle Google Login with authorization code flow
    const googleLogin = useGoogleLogin({
        onSuccess: async (codeResponse) => {
            setIsLoading(true);
            
            try {
                const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: new URLSearchParams({
                        code: codeResponse.code,
                        client_id: '973505798665-0omke783ll45bu98ip4lp2o2pb4evktb.apps.googleusercontent.com',
                        client_secret: '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', 
                        redirect_uri: 'http://localhost:3000',
                        grant_type: 'authorization_code',
                    }),
                });

                const tokens = await tokenResponse.json();
                
                if (tokens.id_token) {
                    // Send id_token to backend
                    const response = await apiClient.post('/user_auth/google-login/', {
                        id_token: tokens.id_token
                    });

                    console.log('✅ Backend response:', response);

                    // ✅ FIX: apiClient returns data directly, not response.data
                    if (response?.access_token) {
                        console.log('✅ Storing tokens...');
                        localStorage.setItem('access_token', response.access_token);
                        localStorage.setItem('refresh_token', response.refresh_token);
                        localStorage.setItem('user_role', response.role);
                        localStorage.setItem('full_name', response.full_name || '');
                        
                        // Dispatch event to update navbar
                        window.dispatchEvent(new Event('auth-change'));
                        
                        console.log('✅ Tokens stored:', {
                            access_token: localStorage.getItem('access_token'),
                            full_name: localStorage.getItem('full_name')
                        });
                    }

                    toast.success(response?.message || 'Google login successful! Welcome.');
                    
                    setTimeout(() => {
                        router.push('/');
                    }, 1000);
                } else {
                    toast.error('Failed to get ID token from Google.');
                }
            } catch (error: any) {
                console.error('🔴 Google login error:', error);
                const errorMessage = error.response?.data?.error || error.message || 'Google login failed. Please try again.';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error) => {
            console.error('🔴 Google OAuth error:', error);
            toast.error('Google login failed. Please try again.');
        },
        flow: 'auth-code',
    });


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

                    <h1 className="text-3xl font-bold text-center mb-8">
                        Sign in to your account
                    </h1>

                    {/* Email Field */}
                    <div className="space-y-2">
                        <label htmlFor="email_or_username" className="text-sm font-medium block">
                            Email Address
                        </label>
                        <input
                            id="email_or_username"
                            name="email_or_username"
                            type="email"
                            value={formData.email_or_username}
                            onChange={handleChange}
                            placeholder="Enter your email address here"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.email_or_username ? 'border-red-500' : ''}`}
                            disabled={isLoading}
                        />
                        {errors.email_or_username && (
                            <p className="text-red-500 text-sm mt-1">{errors.email_or_username}</p>
                        )}
                    </div>

                    {/* Password Field */}
                    <div className="space-y-2">
                        <label htmlFor="password" className="text-sm font-medium block">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                id="password"
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 pr-12 ${errors.password ? 'border-red-500' : ''}`}
                                disabled={isLoading}
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

                    {/* Remember Password & Forgot Password */}
                    <div className="flex items-center justify-between text-sm">
                        <label className="flex items-center cursor-pointer">
                            <input
                                type="checkbox"
                                name="remember_me"
                                checked={formData.remember_me}
                                onChange={handleChange}
                                className="w-4 h-4 text-purple-600 rounded focus:ring-purple-500 focus:ring-2 mr-2"
                                disabled={isLoading}
                            />
                            Remember me
                        </label>
                        <Link href="/login/forget-password" className="text-purple-400 hover:text-purple-300 transition-colors">
                            Forgot Password?
                        </Link>
                    </div>

                    {/* Login Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {isLoading ? 'Logging in...' : 'Log in'}
                    </button>

                    {/* Divider */}
                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className={`w-full border-t ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'}`}></div>
                        </div>
                        <div className="relative flex justify-center text-sm">
                            <span className={`px-2 ${theme === 'light' ? 'bg-white' : 'bg-[#010006]'}`}>or</span>
                        </div>
                    </div>

                    {/* Sign Up Link */}
                    <div className="text-center text-sm">
                        Don't have an account?{' '}
                        <Link href="/signup" className="text-purple-400 hover:text-purple-300 transition-colors underline">
                            Sign up
                        </Link>
                    </div>

                    {/* Google Sign In */}
                    <motion.button
                        type="button"
                        onClick={() => googleLogin()}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        disabled={isLoading}
                        className="w-full relative overflow-hidden font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-500/30 hover:border-purple-500/50"
                    >
                        <span className="absolute inset-0 bg-gradient-to-r from-[#7a73e8]/0 via-[#CAA9D3]/10 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                        
                        <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 flex-shrink-0" viewBox="0 0 24 24">
                            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                        </svg>
                        
                        <span className="relative z-10 text-sm sm:text-base bg-gradient-to-r from-[#7a73e8] via-[#CAA9D3] to-[#B7D6EF] bg-clip-text text-transparent group-hover:from-[#B7D6EF] group-hover:via-[#7a73e8] group-hover:to-[#CAA9D3] transition-all duration-300">
                            Continue with Google
                        </span>
                    </motion.button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
