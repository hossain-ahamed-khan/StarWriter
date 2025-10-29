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

const SignUpForm = () => {
    const { theme } = useTheme();
    const router = useRouter();
    const [formData, setFormData] = useState({
        full_name: '',
        email: '',
        referral_source: 'Facebook',
        password: '',
        confirm_password: '',
        newsletter_opt_in: false
    });

    const [errors, setErrors] = useState({
        full_name: '',
        email: '',
        password: '',
        confirm_password: ''
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);

    // Handle input changes
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const target = e.target;
        const { name, value, type } = target;
        
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' && 'checked' in target ? (target as HTMLInputElement).checked : value
        }));

        if (name in errors) {
            setErrors(prev => ({ ...prev, [name]: '' }));
        }
    };

    // Form validation
    const validateForm = () => {
        const newErrors = {
            full_name: '',
            email: '',
            password: '',
            confirm_password: ''
        };

        let isValid = true;

        if (!formData.full_name.trim()) {
            newErrors.full_name = 'Please enter your full name';
            isValid = false;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            newErrors.email = 'Please enter a valid email address';
            isValid = false;
        }

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

        setIsLoading(true);

        try {
            const response = await apiClient.post('user_auth/send-registration-otp/', {
                email: formData.email,
                password: formData.password,
                confirm_password: formData.confirm_password,
                full_name: formData.full_name,
                referral_source: formData.referral_source,
                newsletter_opt_in: formData.newsletter_opt_in
            });

            toast.success('OTP sent successfully! Check your email.');
            router.push(`/signup/verify-code?email=${encodeURIComponent(formData.email)}`);
        } catch (error: any) {
            const errorCode = error.response?.data?.code;
            const errorMessage = error.message || 'Failed to send OTP. Please try again.';

            toast.error(errorMessage);

            if (errorCode === 'EMAIL_EXISTS') {
                setErrors(prev => ({ ...prev, email: errorMessage }));
            } else if (errorCode === 'PASSWORD_MISMATCH') {
                setErrors(prev => ({ ...prev, confirm_password: errorMessage }));
            } else if (errorCode === 'WEAK_PASSWORD') {
                setErrors(prev => ({ ...prev, password: errorMessage }));
            }
        } finally {
            setIsLoading(false);
        }
    };

    // ✅ Handle Google Signup - FIXED VERSION
    const googleSignup = useGoogleLogin({
        onSuccess: async (tokenResponse) => {  // ✅ Changed from codeResponse to tokenResponse
            setIsLoading(true);
            
            try {
                // ✅ Send access_token directly to backend (no token exchange needed)
                const response = await apiClient.post('user_auth/google-login/', {
                    access_token: tokenResponse.access_token  // ✅ Use access_token from implicit flow
                });

                // ✅ Store tokens and user info
                if (response?.access_token) {
                    localStorage.setItem('access_token', response.access_token);
                    localStorage.setItem('refresh_token', response.refresh_token);
                    localStorage.setItem('user_role', response.role);
                    localStorage.setItem('full_name', response.full_name || '');
                    
                    // ✅ Dispatch event to update navbar
                    window.dispatchEvent(new Event('auth-change'));
                }

                toast.success(response?.message || 'Google signup successful! Welcome.');
                
                setTimeout(() => {
                    router.push('/');
                }, 1000);
                
            } catch (error: any) {
                const errorMessage = error.response?.data?.error || error.message || 'Google signup failed. Please try again.';
                toast.error(errorMessage);
            } finally {
                setIsLoading(false);
            }
        },
        onError: (error) => {
            console.error('Google signup error:', error);
            toast.error('Google signup failed. Please try again.');
        },
        ux_mode: 'popup',
        // ✅ No flow parameter - defaults to implicit flow
        // ✅ No client_secret needed - secure by design
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
                        sizes="100vw"
                    />
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
                    <div className="flex justify-center">
                        <Image
                            src={mainLogo}
                            width={50}
                            height={50}
                            alt="main logo"
                            className="w-auto h-auto"
                        />
                    </div>
                    
                    <h1 className="text-3xl font-bold text-center mb-8">
                        Create your free account
                    </h1>

                    {/* Full Name */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Full Name
                        </label>
                        <input
                            type="text"
                            name="full_name"
                            value={formData.full_name}
                            onChange={handleChange}
                            placeholder="Enter your full name"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.full_name ? 'border-red-500' : ''}`}
                            disabled={isLoading}
                        />
                        {errors.full_name && (
                            <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
                        )}
                    </div>

                    {/* Email */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Email Address
                        </label>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            placeholder="Enter your email address here"
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : ''}`}
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                        )}
                    </div>

                    {/* Referral Source */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Where did you hear about us?
                        </label>
                        <select
                            name="referral_source"
                            value={formData.referral_source}
                            onChange={handleChange}
                            className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer ${theme === 'light' ? 'bg-white' : 'bg-[#010006]'}`}
                            disabled={isLoading}
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
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                placeholder="Enter your password"
                                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-500' : ''}`}
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

                    {/* Confirm Password */}
                    <div className="space-y-2">
                        <label className="block text-sm font-medium">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                name="confirm_password"
                                value={formData.confirm_password}
                                onChange={handleChange}
                                placeholder="Enter your password again"
                                className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.confirm_password ? 'border-red-500' : ''}`}
                                disabled={isLoading}
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

                    {/* Newsletter Checkbox */}
                    <div className="flex items-start space-x-3">
                        <input
                            type="checkbox"
                            name="newsletter_opt_in"
                            id="newsletter_opt_in"
                            checked={formData.newsletter_opt_in}
                            onChange={handleChange}
                            className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500 focus:ring-2"
                            disabled={isLoading}
                        />
                        <label htmlFor="newsletter_opt_in" className="text-sm leading-relaxed">
                            I'd like to receive updates, exclusive offers, and product news via email.
                        </label>
                    </div>

                    {/* Sign Up Button */}
                    <button
                        type="submit"
                        disabled={isLoading}
                        className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
                    >
                        {isLoading ? 'Sending OTP...' : 'Sign Up'}
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

                    {/* Sign In Link */}
                    <div className="text-center text-sm">
                        Already have an account?{' '}
                        <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors underline">
                            Sign In
                        </Link>
                    </div>

                    {/* Google Sign Up - FIXED */}
                    <motion.button
                        type="button"
                        onClick={() => googleSignup()}
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

export default SignUpForm;









// "use client"
// import React, { useState } from 'react';
// import { Eye, EyeOff } from 'lucide-react';
// import Image from 'next/image';
// import mainLogo from '../../../public/resources/images/main-logo.png';
// import circleBg from "../../../public/resources/images/circle-bg.png";
// import Link from 'next/link';
// import { useTheme } from 'next-themes';
// import { toast } from 'sonner';
// import { apiClient } from '@/lib/api-client';
// import { useRouter } from 'next/navigation';
// import { motion } from 'framer-motion';
// import { useGoogleLogin } from '@react-oauth/google';

// const SignUpForm = () => {
//     const { theme } = useTheme();
//     const router = useRouter();
//     const [formData, setFormData] = useState({
//         full_name: '',
//         email: '',
//         referral_source: 'Facebook',
//         password: '',
//         confirm_password: '',
//         newsletter_opt_in: false
//     });

//     const [errors, setErrors] = useState({
//         full_name: '',
//         email: '',
//         password: '',
//         confirm_password: ''
//     });

//     const [showPassword, setShowPassword] = useState(false);
//     const [showConfirmPassword, setShowConfirmPassword] = useState(false);
//     const [isLoading, setIsLoading] = useState(false);

//     // Handle input changes
//     const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
//         const target = e.target;
//         const { name, value, type } = target;
        
//         setFormData(prev => ({
//             ...prev,
//             [name]: type === 'checkbox' && 'checked' in target ? (target as HTMLInputElement).checked : value
//         }));

//         if (name in errors) {
//             setErrors(prev => ({ ...prev, [name]: '' }));
//         }
//     };

//     // Form validation
//     const validateForm = () => {
//         const newErrors = {
//             full_name: '',
//             email: '',
//             password: '',
//             confirm_password: ''
//         };

//         let isValid = true;

//         if (!formData.full_name.trim()) {
//             newErrors.full_name = 'Please enter your full name';
//             isValid = false;
//         }

//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         if (!emailRegex.test(formData.email)) {
//             newErrors.email = 'Please enter a valid email address';
//             isValid = false;
//         }

//         if (formData.password.length < 8) {
//             newErrors.password = 'Password must be at least 8 characters long';
//             isValid = false;
//         }

//         if (formData.password !== formData.confirm_password) {
//             newErrors.confirm_password = 'Passwords do not match';
//             isValid = false;
//         }

//         setErrors(newErrors);

//         if (!isValid) {
//             toast.error('Please fix the errors in the form');
//         }

//         return isValid;
//     };

//     // Handle form submission
//     const handleSubmit = async (e: React.FormEvent) => {
//         e.preventDefault();

//         if (!validateForm()) {
//             return;
//         }

//         setIsLoading(true);

//         try {
//             const response = await apiClient.post('user_auth/send-registration-otp/', {
//                 email: formData.email,
//                 password: formData.password,
//                 confirm_password: formData.confirm_password,
//                 full_name: formData.full_name,
//                 referral_source: formData.referral_source,
//                 newsletter_opt_in: formData.newsletter_opt_in
//             });

//             toast.success('OTP sent successfully! Check your email.');
//             router.push(`/signup/verify-code?email=${encodeURIComponent(formData.email)}`);
//         } catch (error: any) {
//             const errorCode = error.response?.data?.code;
//             const errorMessage = error.message || 'Failed to send OTP. Please try again.';

//             toast.error(errorMessage);

//             if (errorCode === 'EMAIL_EXISTS') {
//                 setErrors(prev => ({ ...prev, email: errorMessage }));
//             } else if (errorCode === 'PASSWORD_MISMATCH') {
//                 setErrors(prev => ({ ...prev, confirm_password: errorMessage }));
//             } else if (errorCode === 'WEAK_PASSWORD') {
//                 setErrors(prev => ({ ...prev, password: errorMessage }));
//             }
//         } finally {
//             setIsLoading(false);
//         }
//     };

//     // Handle Google Signup
//     // Handle Google Signup
//     const googleSignup = useGoogleLogin({
//         onSuccess: async (codeResponse) => {
//             setIsLoading(true);
            
//             try {
//                 const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
//                     method: 'POST',
//                     headers: {
//                         'Content-Type': 'application/x-www-form-urlencoded',
//                     },
//                     body: new URLSearchParams({
//                         // code: codeResponse.code,
//                         client_id: '725626674717-5t3j9uonbeue1jqhijdhuo0gv21ul4d7.apps.googleusercontent.com',
//                         client_secret: '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', 
//                         redirect_uri: 'https://starwriter.ai',
//                         grant_type: 'authorization_code',
//                     }),
//                 });

//                 const tokens = await tokenResponse.json();
                
//                 if (tokens.id_token) {
//                     const response = await apiClient.post('user_auth/google-login/', {
//                         id_token: tokens.id_token
//                     });

//                     // ✅ FIX: apiClient returns data directly
//                     if (response?.access_token) {
//                         localStorage.setItem('access_token', response.access_token);
//                         localStorage.setItem('refresh_token', response.refresh_token);
//                         localStorage.setItem('user_role', response.role);
//                         localStorage.setItem('full_name', response.full_name || '');
                        
//                         // ✅ Dispatch event to update navbar
//                         window.dispatchEvent(new Event('auth-change'));
//                     }

//                     toast.success(response?.message || 'Google signup successful! Welcome.');
                    
//                     setTimeout(() => {
//                         router.push('/');
//                     }, 1000);
//                 } else {
//                     toast.error('Failed to get ID token from Google.');
//                 }
//             } catch (error: any) {
//                 const errorMessage = error.response?.data?.error || error.message || 'Google signup failed. Please try again.';
//                 toast.error(errorMessage);
//             } finally {
//                 setIsLoading(false);
//             }
//         },
//         onError: (error) => {
//             toast.error('Google signup failed. Please try again.');
//         },
//         // flow: 'auth-code',
//     });

//     return (
//         <div className={`min-h-screen flex items-center justify-center p-4 relative overflow-hidden ${theme === 'light' ? 'bg-white text-black' : 'bg-[#010006] text-white'}`}>
//             <div className="w-full max-w-md">
//                 <div className="absolute inset-0 z-0">
//                     <Image
//                         src={circleBg}
//                         fill
//                         alt="circle background"
//                         className="object-cover opacity-40"
//                         sizes="100vw"
//                     />
//                 </div>

//                 <form onSubmit={handleSubmit} className="relative z-10 space-y-6">
//                     <div className="flex justify-center">
//                         <Image
//                             src={mainLogo}
//                             width={50}
//                             height={50}
//                             alt="main logo"
//                             className="w-auto h-auto"
//                         />
//                     </div>
                    
//                     <h1 className="text-3xl font-bold text-center mb-8">
//                         Create your free account
//                     </h1>

//                     {/* Full Name */}
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium">
//                             Full Name
//                         </label>
//                         <input
//                             type="text"
//                             name="full_name"
//                             value={formData.full_name}
//                             onChange={handleChange}
//                             placeholder="Enter your full name"
//                             className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.full_name ? 'border-red-500' : ''}`}
//                             disabled={isLoading}
//                         />
//                         {errors.full_name && (
//                             <p className="text-red-500 text-sm mt-1">{errors.full_name}</p>
//                         )}
//                     </div>

//                     {/* Email */}
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium">
//                             Email Address
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Enter your email address here"
//                             className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.email ? 'border-red-500' : ''}`}
//                             disabled={isLoading}
//                         />
//                         {errors.email && (
//                             <p className="text-red-500 text-sm mt-1">{errors.email}</p>
//                         )}
//                     </div>

//                     {/* Referral Source */}
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium">
//                             Where did you hear about us?
//                         </label>
//                         <select
//                             name="referral_source"
//                             value={formData.referral_source}
//                             onChange={handleChange}
//                             className={`w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 appearance-none cursor-pointer ${theme === 'light' ? 'bg-white' : 'bg-[#010006]'}`}
//                             disabled={isLoading}
//                         >
//                             <option value="Facebook">Facebook</option>
//                             <option value="Twitter">Twitter</option>
//                             <option value="Google">Google</option>
//                             <option value="LinkedIn">LinkedIn</option>
//                             <option value="Friend">Friend</option>
//                             <option value="Other">Other</option>
//                         </select>
//                     </div>

//                     {/* Password */}
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium">
//                             Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 name="password"
//                                 value={formData.password}
//                                 onChange={handleChange}
//                                 placeholder="Enter your password"
//                                 className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.password ? 'border-red-500' : ''}`}
//                                 disabled={isLoading}
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowPassword(!showPassword)}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
//                                 disabled={isLoading}
//                             >
//                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                         </div>
//                         {errors.password && (
//                             <p className="text-red-500 text-sm mt-1">{errors.password}</p>
//                         )}
//                     </div>

//                     {/* Confirm Password */}
//                     <div className="space-y-2">
//                         <label className="block text-sm font-medium">
//                             Confirm Password
//                         </label>
//                         <div className="relative">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 name="confirm_password"
//                                 value={formData.confirm_password}
//                                 onChange={handleChange}
//                                 placeholder="Enter your password again"
//                                 className={`w-full px-4 py-3 pr-12 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition-all duration-200 ${errors.confirm_password ? 'border-red-500' : ''}`}
//                                 disabled={isLoading}
//                             />
//                             <button
//                                 type="button"
//                                 onClick={() => setShowConfirmPassword(!showConfirmPassword)}
//                                 className="absolute right-3 top-1/2 transform -translate-y-1/2 transition-colors"
//                                 disabled={isLoading}
//                             >
//                                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                         </div>
//                         {errors.confirm_password && (
//                             <p className="text-red-500 text-sm mt-1">{errors.confirm_password}</p>
//                         )}
//                     </div>

//                     {/* Newsletter Checkbox */}
//                     <div className="flex items-start space-x-3">
//                         <input
//                             type="checkbox"
//                             name="newsletter_opt_in"
//                             id="newsletter_opt_in"
//                             checked={formData.newsletter_opt_in}
//                             onChange={handleChange}
//                             className="mt-1 w-4 h-4 text-purple-600 rounded focus:ring-purple-500 focus:ring-2"
//                             disabled={isLoading}
//                         />
//                         <label htmlFor="newsletter_opt_in" className="text-sm leading-relaxed">
//                             I'd like to receive updates, exclusive offers, and product news via email.
//                         </label>
//                     </div>

//                     {/* Sign Up Button */}
//                     <button
//                         type="submit"
//                         disabled={isLoading}
//                         className={`w-full font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98] shadow-lg disabled:opacity-50 disabled:cursor-not-allowed ${theme === 'light' ? 'bg-black text-white' : 'bg-white text-black'}`}
//                     >
//                         {isLoading ? 'Sending OTP...' : 'Sign Up'}
//                     </button>

//                     {/* Divider */}
//                     <div className="relative">
//                         <div className="absolute inset-0 flex items-center">
//                             <div className={`w-full border-t ${theme === 'light' ? 'border-gray-300' : 'border-gray-700'}`}></div>
//                         </div>
//                         <div className="relative flex justify-center text-sm">
//                             <span className={`px-2 ${theme === 'light' ? 'bg-white' : 'bg-[#010006]'}`}>or</span>
//                         </div>
//                     </div>

//                     {/* Sign In Link */}
//                     <div className="text-center text-sm">
//                         Already have an account?{' '}
//                         <Link href="/login" className="text-purple-400 hover:text-purple-300 transition-colors underline">
//                             Sign In
//                         </Link>
//                     </div>

//                     {/* Google Sign Up */}
//                     <motion.button
//                         type="button"
//                         onClick={() => googleSignup()}
//                         whileHover={{ scale: 1.02 }}
//                         whileTap={{ scale: 0.98 }}
//                         disabled={isLoading}
//                         className="w-full relative overflow-hidden font-semibold py-3 px-4 rounded-lg transition-all duration-300 flex items-center justify-center gap-3 group disabled:opacity-50 disabled:cursor-not-allowed border-2 border-purple-500/30 hover:border-purple-500/50"
//                     >
//                         <span className="absolute inset-0 bg-gradient-to-r from-[#7a73e8]/0 via-[#CAA9D3]/10 to-[#B7D6EF]/0 opacity-0 group-hover:opacity-100 transition-all duration-300"></span>
                        
//                         <svg className="w-5 h-5 sm:w-6 sm:h-6 relative z-10 flex-shrink-0" viewBox="0 0 24 24">
//                             <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
//                             <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
//                             <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
//                             <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
//                         </svg>
                        
//                         <span className="relative z-10 text-sm sm:text-base bg-gradient-to-r from-[#7a73e8] via-[#CAA9D3] to-[#B7D6EF] bg-clip-text text-transparent group-hover:from-[#B7D6EF] group-hover:via-[#7a73e8] group-hover:to-[#CAA9D3] transition-all duration-300">
//                             Continue with Google
//                         </span>
//                     </motion.button>
//                 </form>
//             </div>
//         </div>
//     );
// };

// export default SignUpForm;
