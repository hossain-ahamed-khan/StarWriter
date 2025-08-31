"use client"
import {
    Collapsible,
    CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
    SidebarGroup,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,

} from "@/components/ui/sidebar"
import { IconType } from "react-icons/lib"
import React, { useState } from "react"
import Link from "next/link"

export function NavMain({
    items,
}: {
    items: {
        title: string
        url: string
        icon?: IconType;
        isActive?: boolean
    }[]
}) {

    // Find the initially active item, or default to the first
    const initialIndex = items.findIndex(item => item.isActive) !== -1
        ? items.findIndex(item => item.isActive)
        : 0;
    const [selectedIndex, setSelectedIndex] = useState(initialIndex);

    return (
        <SidebarGroup>
            <SidebarMenu className="flex flex-col gap-2 py-4">
                {items.map((item, idx) => (
                    <Collapsible
                        key={item.title}
                        asChild
                        defaultOpen={item.isActive}
                        className="group/collapsible"
                    >
                        <SidebarMenuItem>
                            <CollapsibleTrigger asChild>
                                <SidebarMenuButton
                                    tooltip={item.title}
                                    className={`py-6 ${item.isActive ? "bg-[#006699] text-white" : ""}`}
                                    asChild
                                >
                                    <Link href={item.url}>
                                        {item.icon && <item.icon />}
                                        <span className="font-semibold">{item.title}</span>
                                    </Link>
                                </SidebarMenuButton>
                            </CollapsibleTrigger>
                        </SidebarMenuItem>
                    </Collapsible>
                ))}
            </SidebarMenu>
        </SidebarGroup>
    )
}
