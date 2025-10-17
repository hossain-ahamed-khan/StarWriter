"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { TableCell, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MdDeleteOutline } from "react-icons/md";
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { BlogPost, deleteBlog } from "@/services/Blogs";
import { toast } from "sonner";

export default function BlogsTableRow({
    index,
    blog,
    onDeleted,
}: {
    index: number;
    blog: BlogPost;
    onDeleted: () => void;
}) {
    const [deleting, setDeleting] = useState(false);
    const router = useRouter();

    const handleDelete = async () => {
        if (deleting) return;
        try {
            setDeleting(true);
            const res = await deleteBlog(blog.id);
            if (!res.success) {
                toast.error(res.error || "Failed to delete blog");
                return;
            }
            toast.success(res.message || `Deleted "${blog.title}" (#${blog.id})`);
            onDeleted();
            // Refresh page data to reflect the deletion
            router.refresh();
        } catch (e: any) {
            toast.error(e?.message || "Failed to delete blog");
        } finally {
            setDeleting(false);
        }
    };

    const created = blog.created_at ? new Date(blog.created_at).toLocaleDateString() : "-";

    return (
        <TableRow>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell className="max-w-[320px] truncate" title={blog.title}>
                {blog.title}
            </TableCell>
            <TableCell>
                {blog.image_url ? (
                    // eslint-disable-next-line @next/next/no-img-element
                    <img
                        src={blog.image_url}
                        alt={blog.title}
                        className="h-12 w-12 rounded object-cover border"
                    />
                ) : (
                    "-"
                )}
            </TableCell>
            <TableCell>{created}</TableCell>
            <TableCell className="text-right">
                <AlertDialog>
                    <AlertDialogTrigger asChild>
                        <Button
                            variant="destructive"
                            size="icon"
                            disabled={deleting}
                            title="Delete blog"
                            aria-label="Delete blog"
                        >
                            <MdDeleteOutline className="h-8 w-8" color="red" aria-hidden="true" />
                        </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white text-black">
                        <AlertDialogHeader>
                            <AlertDialogTitle>Delete this blog?</AlertDialogTitle>
                            <AlertDialogDescription>
                                This action cannot be undone. This will permanently delete the blog post
                                titled "{blog.title}".
                            </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={deleting}>Cancel</AlertDialogCancel>
                            <AlertDialogAction onClick={handleDelete} disabled={deleting}>
                                {deleting ? "Deleting..." : "Confirm"}
                            </AlertDialogAction>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    );
}
