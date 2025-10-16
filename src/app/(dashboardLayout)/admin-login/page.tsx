"use client";
import Image from "next/image";
import mainLogo from '../../../../public/resources/images/main-logo.png';
import { Checkbox } from "@/components/ui/checkbox";
import { Eye, EyeOff, Loader2 } from "lucide-react";
import React, { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { apiClient } from "@/lib/api-client";
import { useRouter } from "next/navigation";

export default function AdminDashboardLogin() {
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
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
            newErrors.email_or_username = 'Please enter your email or username';
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
            const response = await apiClient.post('user_auth/login/', {
                email_or_username: formData.email_or_username,
                password: formData.password,
                remember_me: formData.remember_me
            });

            if (response.data?.access) {
                localStorage.setItem('admin_access_token', response.data.access);
                localStorage.setItem('admin_refresh_token', response.data.refresh);
                localStorage.setItem('admin_user_role', response.data.role);
                localStorage.setItem('admin_full_name', response.data.full_name || '');

                // ✅ Dispatch event to update navbar
                window.dispatchEvent(new Event('auth-change'));
            }

            toast.success('Login successful! Welcome back.');

            if (response?.data?.role === 'admin' || response?.data?.role === 'superadmin') {
                setTimeout(() => {
                router.push('/dashboard');
            }, 1000);
            }
        } catch (error: any) {
            const errorCode = error.response?.data?.code;
            const errorMessage = error.response?.data?.message || error.message || 'Login failed. Please try again.';

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

    return (
        <div className='bg-[#e6f0f5] w-full min-h-screen flex justify-center items-center py-10'>
            <form onSubmit={handleSubmit} className="w-11/12 md:w-1/4 mx-auto space-y-4 text-[#1A1A40]" noValidate>
                <div className="flex justify-center">
                    <Image
                        src={mainLogo}
                        width={50}
                        height={50}
                        alt="main logo"
                    />
                </div>
                <h1 className="text-3xl font-semibold text-center">Login to Account</h1>
                <p className="text-lg text-center">Please enter your email or username and password to continue</p>

                <fieldset disabled={isLoading} className="space-y-4 mt-10">
                    <div>
                        <label htmlFor="email_or_username" className="font-medium">Email or Username</label>
                        <input
                            type="text"
                            id="email_or_username"
                            name="email_or_username"
                            autoComplete="username"
                            className={`bg-[#F8F8FF] w-full px-3 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${errors.email_or_username ? 'border-red-500' : 'border-gray-300'}`}
                            placeholder="Enter your email or username"
                            value={formData.email_or_username}
                            onChange={handleChange}
                            aria-invalid={!!errors.email_or_username}
                            aria-describedby={errors.email_or_username ? 'email_or_username-error' : undefined}
                            required
                        />
                        {errors.email_or_username && (
                            <p id="email_or_username-error" className="mt-1 text-sm text-red-600">{errors.email_or_username}</p>
                        )}
                    </div>

                    <div className="">
                        <label htmlFor="password" className="font-medium">Password</label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                id="password"
                                name="password"
                                autoComplete="current-password"
                                className={`bg-[#F8F8FF] w-full pr-10 px-3 py-2 mt-2 border rounded-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-gray-900 ${errors.password ? 'border-red-500' : 'border-gray-300'}`}
                                placeholder="Enter password"
                                value={formData.password}
                                onChange={handleChange}
                                aria-invalid={!!errors.password}
                                aria-describedby={errors.password ? 'password-error' : undefined}
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword((prev) => !prev)}
                                className="absolute inset-y-0 right-0 flex items-center px-3 text-gray-400 hover:text-gray-700 focus:outline-none"
                                tabIndex={-1}
                                aria-label={showPassword ? 'Hide password' : 'Show password'}
                            >
                                {showPassword ? <Eye className="w-5 h-5" /> : <EyeOff className="w-5 h-5" />}
                            </button>
                        </div>
                        {errors.password && (
                            <p id="password-error" className="mt-1 text-sm text-red-600">{errors.password}</p>
                        )}
                    </div>

                    <div className="w-full flex justify-between items-center">
                        <label htmlFor="remember_me" className="flex gap-2 items-center select-none">
                            <Checkbox
                                id="remember_me"
                                className="border-2 border-[#4B2A99]"
                                checked={!!formData.remember_me}
                                onCheckedChange={(checked) =>
                                    setFormData((prev) => ({ ...prev, remember_me: checked === true }))
                                }
                            />
                            Remember me
                        </label>
                        <Link href="/admin-login/forget-password" className="text-sm text-[#1A1A40] hover:underline">Forget Password?</Link>
                    </div>
                </fieldset>

                <Button type="submit" disabled={isLoading} className="bg-[#006699] w-full py-5 text-white rounded-lg mt-4 flex items-center justify-center gap-2">
                    {isLoading && <Loader2 className="h-4 w-4 animate-spin" />}
                    {isLoading ? 'Signing in…' : 'Sign in'}
                </Button>
            </form>
        </div>
    )
}
