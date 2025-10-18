"use client"

import { useEffect, useState } from "react"
import { AppSidebar } from "@/components/modules/dashboard/sidebar/app-sidebar"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { IoIosArrowDropdown } from "react-icons/io";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover"
import ProfileCard from "@/components/dashboard/profile/ProfileCard";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import RequireAuth from "@/components/auth/RequireAuth";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
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

    return (
        <RequireAuth tokenKey="admin_access_token" redirectTo="/admin-login">
            <SidebarProvider className="bg-white">
                <AppSidebar />
                <SidebarInset>
                <header className="bg-white  text-black flex justify-between h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
                    <div className="flex items-center gap-2 px-4">
                        <SidebarTrigger className="-ml-1" />
                    </div>

                    <Popover>
                        <PopoverTrigger>
                            <div className="w-48 border border-[#E5E5E5] rounded-2xl flex justify-between items-center gap-2 px-4 py-2 mr-8 cursor-pointer transition-transform duration-300 hover:scale-105">
                                {/* Initials avatar (first two letters of name) */}
                                <Avatar className="h-10 w-10">
                                    <AvatarFallback className="bg-[#E6EBF7] text-black font-semibold">
                                        {((adminName || "Admin").replace(/[^A-Za-z]/g, "").slice(0, 2) || "AD").toUpperCase()}
                                    </AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-sm font-medium">{adminName || "Admin"}</h2>
                                    <p className="text-xs text-muted-foreground">{adminRole || "Administrator"}</p>
                                </div>
                                <IoIosArrowDropdown className="text-2xl text-muted-foreground" />
                            </div>
                        </PopoverTrigger>
                        <PopoverContent className="bg-white text-black border-0">
                            <ProfileCard />
                        </PopoverContent>
                    </Popover>

                </header>
                    <div className="flex flex-1 flex-col gap-4 p-4 pt-0 bg-[#E6EBF7] rounded-tl-3xl overflow-y-auto">
                        {children}
                    </div>
                </SidebarInset>
            </SidebarProvider>
        </RequireAuth>
    )
}
