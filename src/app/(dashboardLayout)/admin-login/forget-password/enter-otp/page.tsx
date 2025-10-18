import Image from "next/image";
import mainLogo from '../../../../../../public/resources/images/main-logo.png';
import { Button } from "@/components/ui/button";
import Link from "next/link";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSeparator,
    InputOTPSlot,
} from "@/components/ui/input-otp"

export default function EnterOtpPage() {
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
                <h1 className="text-3xl font-semibold text-center">Check your email</h1>
                <p className="text-lg text-center">We sent a code to your email address @. Please check your email for the 5 digit code.</p>
                <div className="mt-16 flex justify-center">
                    <InputOTP maxLength={5}>
                        <InputOTPGroup className="space-x-4">
                            <InputOTPSlot className="rounded-md border border-[#1A1A40]" index={0} />
                            <InputOTPSlot className="rounded-md border border-[#1A1A40]" index={1} />
                            <InputOTPSlot className="rounded-md border border-[#1A1A40]" index={2} />
                            <InputOTPSlot className="rounded-md border border-[#1A1A40]" index={3} />
                            <InputOTPSlot className="rounded-md border border-[#1A1A40]" index={4} />
                        </InputOTPGroup>
                    </InputOTP>
                </div>

                <Link href="/admin-login/forget-password/enter-otp/set-password"><Button className="bg-[#006699] w-full py-5 text-white rounded-lg mt-16">Verify</Button></Link>

                <p className="mt-16 text-center">You have not received the email?  <button className="text-[#0030A8] underline cursor-pointer">Resend</button></p>

            </div>
        </div>
    )
}
