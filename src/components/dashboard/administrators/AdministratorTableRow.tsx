import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { ImCross } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import profileImage from "../../../../public/resources/images/profile-image.png";
import { MdOutlineEdit } from "react-icons/md";
import EditAdministrator from "./EditAdministrator";
import { useState } from "react";
import { deleteUser } from "@/services/DeleteUser";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

type Admin = {
    full_name: string;
    email: string;
    phone?: string | null;
    role?: string | null;
    profile?: string | null;
    user_id: number
};

type Props = {
    index: number
    admin: Admin
    onDeleted?: (user_id: number) => void
}

export default function AdministratorTableRow ({ index, admin, onDeleted }: Props) {
    const phone = admin.phone || "-";
    const role = admin.role || "-";
    const [submitting, setSubmitting] = useState(false);
    const [deleteOpen, setDeleteOpen] = useState(false);
    const router = useRouter();
    const handleDelete = async () => {
        try {
            setSubmitting(true);
            const res = await deleteUser(admin.user_id);
            if (res.success) {
                toast.success(`Deleted ${admin.full_name || 'administrator'} successfully`);
                // Close the dialog
                setDeleteOpen(false);
                // Notify parent/listeners to refetch
                try { window.dispatchEvent(new Event('admin-deleted')); } catch {}
                // Allow parent to react
                onDeleted?.(admin.user_id);
                // Refresh route (for any server components that depend on this data)
                try { router.refresh(); } catch {}
            } else {
                toast.error(res.error || 'Failed to delete administrator');
            }
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>
                <div className="flex-none lg:flex lg:items-center lg:gap-2">
                    <Image
                        src={profileImage}
                        width={30}
                        height={30}
                        alt={`${admin.full_name}'s profile photo`}
                    />
                    <p>{admin.full_name}</p>
                </div>
            </TableCell>
            <TableCell>{admin.email}</TableCell>
            <TableCell>{phone}</TableCell>
            <TableCell className="capitalize">{role}</TableCell>
            <TableCell className="text-right space-x-2">
                {/* <AlertDialog>
                    <AlertDialogTrigger className="bg-[#006699] p-3 rounded-lg text-white text-xl">
                        <MdOutlineEdit />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white text-black">
                        <AlertDialogHeader>
                            <div className="w-full flex justify-between">
                                <div></div>
                                <AlertDialogTitle className="text-2xl font-bold mt-10 mb-5">Edit Administrator</AlertDialogTitle>
                                <AlertDialogCancel>
                                    <ImCross />
                                </AlertDialogCancel>
                            </div>

                            <EditAdministrator />

                            <AlertDialogDescription></AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog> */}

                <AlertDialog open={deleteOpen} onOpenChange={setDeleteOpen}>
                    <AlertDialogTrigger className="inline-flex items-center gap-2 p-2 bg-red-600 text-white rounded-sm disabled:opacity-60" disabled={submitting}>
                        <RiDeleteBin6Line />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white text-black">
                        <AlertDialogHeader>
                            <div className="w-full flex justify-between items-center">
                                <div></div>
                                <AlertDialogTitle className="text-center text-[#0030A8] text-2xl font-bold">Delete user</AlertDialogTitle>
                                <AlertDialogCancel className="text-right"><ImCross /></AlertDialogCancel>
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            Are you sure you want to delete "${admin.full_name}" (#{admin.user_id})? This action cannot be undone.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={submitting} className="mt-2 sm:mt-0">Cancel</AlertDialogCancel>
                            <button onClick={handleDelete} disabled={submitting} className="inline-flex items-center gap-2 bg-red-600 px-4 text-white py-1.5 rounded-lg">
                                <RiDeleteBin6Line /> {submitting ? 'Deleting...' : 'Delete'}
                            </button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    );
}
