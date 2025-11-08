"use client"
import mainLogo from "../../../../../public/resources/images/main-logo.png"
import { FaUsers } from "react-icons/fa6";
import { RiDashboard3Line } from "react-icons/ri";
import { RiShieldUserLine } from "react-icons/ri";
import { RiWallet3Line, RiArticleLine } from "react-icons/ri";
import * as React from "react"
import { usePathname } from "next/navigation"

import {
    Sidebar,
    SidebarContent,
    SidebarHeader,
} from "@/components/ui/sidebar"
import { NavMain } from "./nav-main"
import Image from "next/image"

// This is sample data.
const data = [
    {
        title: "DashBoard",
        url: "/dashboard",
        icon: RiDashboard3Line,
        isActive: true,
    },
    {
        title: "User Management",
        url: "/dashboard/user-management",
        icon: FaUsers,
    },
    {
        title: "Administrators",
        url: "/dashboard/administrators",
        icon: RiShieldUserLine,
    },
    {
        title: "Payments",
        url: "/dashboard/payments",
        icon: RiWallet3Line,
    },
    {
        title: "Blog Posts",
        url: "/dashboard/blog-posts",
        icon: RiArticleLine,
    }
]

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const pathname = usePathname()
    const navItems = data.map(item => ({
        ...item,
        isActive: pathname === item.url,
    }))
    return (
        <Sidebar collapsible="icon" {...props} className="border-none  pt-8">
            <SidebarHeader className="flex items-center justify-center h-16 shrink-10 bg-[#FFFFFF]">
                <Image
                    src={mainLogo}
                    alt="Dashboard Logo"
                    style={{ width: "50px", height: "auto" }}
                    // width={200}
                    // height={200}
                    priority
                />
            </SidebarHeader>
            <SidebarContent className="bg-[#FFFFFF] text-black pt-4">
                <NavMain items={navItems} />
            </SidebarContent>
        </Sidebar>
    )
}
