import Image from "next/image";
import mainLogo from '../../../../../../../../public/resources/images/main-logo.png';
import Link from "next/link";

export default function PasswordUpdateSuccessPage() {
    return (
        <div className='bg-[#e6f0f5] w-full h-screen flex justify-center items-center flex-col'>
            <div className="w-11/12 md:w-1/4 mx-auto space-y-4 text-[#1A1A40]">
                <div className="flex justify-center">
                    <Image
                        src={mainLogo}
                        width={50}
                        height={50}
                        alt="main logo"
                    />
                </div>
                <h1 className="text-3xl font-semibold text-center">Password Updated Successfully!</h1>
                <p className="text-lg text-center">Your new password has been saved. You can now continue securely.</p>
            </div>
            <div className="mt-8 flex justify-center">
                <Link href="/admin-login">
                    <button className="bg-[#006699] text-white px-6 py-2 rounded-lg font-semibold hover:bg-[#002080] transition">
                        Go to Login
                    </button>
                </Link>
            </div>
        </div>
    )
}
