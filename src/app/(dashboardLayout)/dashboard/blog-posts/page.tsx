"use client";
import Link from "next/link";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import BlogsTableBody from "@/components/dashboard/blogs/BlogsTableBody";
import AddBlogModal from "@/components/dashboard/blogs/AddBlogModal";

export default function BlogPostsPage() {
    const [open, setOpen] = useState(false);
    return (
        <div className="bg-[#FFFFFF] text-black w-full min-h-screen mx-auto rounded-2xl py-4 px-6 md:px-12 mt-4 shadow-md">
            <div className="mb-4 flex items-center justify-between">
                <h1 className="text-xl font-semibold">Blog Posts</h1>
                <div className="flex-1" />
                <Button onClick={() => setOpen(true)}>Add Blog</Button>
            </div>

            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[80px]">SL no.</TableHead>
                        <TableHead>Title</TableHead>
                        <TableHead>Image</TableHead>
                        <TableHead>Created</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <BlogsTableBody />
                </TableBody>
            </Table>
            <AddBlogModal open={open} onOpenChange={setOpen} />
        </div>
    )
}
