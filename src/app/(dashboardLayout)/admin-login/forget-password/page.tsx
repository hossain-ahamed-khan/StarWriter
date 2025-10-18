import Image from "next/image";
import mainLogo from '../../../../../public/resources/images/main-logo.png';
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ForgetPasswordPage() {
    return (
        <div className='bg-[#e6f0f5] w-full h-screen flex justify-center items-center flex-col'>
            <div className="w-11/12 md:w-1/4 mx-auto space-y-4 text-[#1A1A40]">
                <div className="flex justify-center">
                    <Image
                        src={mainLogo}
                        width={50}
                        height={50}
                        alt="main logo"
                        className="w-auto h-auto"
                    />
                </div>
                <h1 className="text-3xl font-semibold text-center">Forget Password?</h1>
                <p className="text-lg text-center">Please enter your email to get verification code</p>
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

                <Link href="/admin-login/forget-password/enter-otp"><Button className="bg-[#006699] w-full py-5 text-white rounded-lg mt-10">Continue</Button></Link>

            </div>
        </div>
    )
}
