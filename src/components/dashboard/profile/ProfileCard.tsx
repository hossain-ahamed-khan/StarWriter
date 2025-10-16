import profileImage from "../../../../public/resources/images/profile-image.png";
import Image from "next/image";
import { RiArrowRightSLine } from 'react-icons/ri'
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import EditProfile from "./EditProfile";
import PasswordChange from "./PasswordChange";
import { ImCross } from "react-icons/im";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { Router } from "next/router";
import { useRouter } from "next/navigation";

export default function ProfileCard() {
    const router = useRouter();
    const [adminName, setAdminName] = useState<string>("")
    const [adminRole, setAdminRole] = useState<string>("")

    useEffect(() => {
        try {
            const name = typeof window !== "undefined" ? localStorage.getItem("admin_full_name") : null
            const role = typeof window !== "undefined" ? localStorage.getItem("admin_user_role") : null
            if (name) setAdminName(name)
            if (role) setAdminRole(role)
        } catch (err) {
            // no-op: localStorage might be unavailable (e.g., privacy mode)
        }
    }, [])

    // Logout handler
    const handleLogout = () => {
        localStorage.removeItem('admin_access_token');
        localStorage.removeItem('admin_refresh_token');
        localStorage.removeItem('admin_user_role');
        localStorage.removeItem('admin_full_name');

        toast.success('Logged out successfully');
        router.push('/admin-login');
    };

    return (
        <div>
            <div className="flex gap-4 mt-4 mb-8">
                <Avatar className="h-10 w-10">
                    <AvatarFallback className="bg-[#E6EBF7] text-black font-semibold">
                        {((adminName || "Admin").replace(/[^A-Za-z]/g, "").slice(0, 2) || "AD").toUpperCase()}
                    </AvatarFallback>
                </Avatar>
                <div>
                    <h2 className="text-sm font-medium">{adminName || "Admin"}</h2>
                    <p className="text-xs text-muted-foreground">{adminRole || "Administrator"}</p>
                </div>
            </div>
            <hr />


            <AlertDialog>
                <AlertDialogTrigger className="w-full flex justify-between items-center mt-2 cursor-pointer p-2 hover:bg-slate-200 rounded-lg">
                    Profile
                    <RiArrowRightSLine />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white text-black">
                    <AlertDialogHeader>
                        <div className="w-full flex justify-between">
                            <div></div>
                            <AlertDialogTitle className="text-2xl font-bold mt-10 mb-5">Account Setting</AlertDialogTitle>
                            <AlertDialogCancel><ImCross /></AlertDialogCancel>
                        </div>

                        <EditProfile />

                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>


            <AlertDialog>
                <AlertDialogTrigger className="w-full flex justify-between items-center mt-2 cursor-pointer p-2 hover:bg-slate-200 rounded-lg">
                    Change Password
                    <RiArrowRightSLine />
                </AlertDialogTrigger>
                <AlertDialogContent className="bg-white text-black">
                    <AlertDialogHeader>
                        <div className="w-full flex justify-between">
                            <div></div>
                            <AlertDialogTitle className="text-2xl font-bold mt-10 mb-5">Password Change</AlertDialogTitle>
                            <AlertDialogCancel><ImCross /></AlertDialogCancel>
                        </div>

                        <PasswordChange />

                        <AlertDialogDescription></AlertDialogDescription>
                    </AlertDialogHeader>
                </AlertDialogContent>
            </AlertDialog>

            <button onClick={handleLogout} className="bg-[#006699] text-white w-full rounded-4xl py-2 mt-4 hover:bg-[#005580] transition-colors duration-300">
                Logout
            </button>
        </div>
    )
}
