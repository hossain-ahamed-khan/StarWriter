"use client";

import { useState } from "react";
import { TableCell, TableRow } from "@/components/ui/table";
import { RiDeleteBin6Line } from "react-icons/ri";
import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { ImCross } from "react-icons/im";
import { deleteUser } from "@/services/DeleteUser";
import { toast } from "sonner";

export interface UserRowData {
    full_name: string;
    email: string;
    phone_number: string | null;
    location: string | null;
    referralSource: string | null;
    user_id: number;
}

type Props = {
    index: number;
    user: UserRowData;
    onDeleted?: (user_id: number) => void;
};

export default function UserTableRow({ index, user, onDeleted }: Props) {
    const [deleteModalOpen, setDeleteModalOpen] = useState(false);
    const [submitting, setSubmitting] = useState(false);

    if (!user) {
        console.error('UserTableRow: user is undefined');
        return null;
    }

    const handleDelete = async () => {
        try {
            setSubmitting(true);
            const res = await deleteUser(user.user_id);
            if (res.success) {
                toast.success(`Deleted ${user.full_name || 'user'} (#${user.user_id})`);
                onDeleted?.(user.user_id);
                setDeleteModalOpen(false);
            } else {
                console.error(res.error);
                toast.error(res.error || 'Failed to delete user');
            }
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete user');
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <TableRow>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>{user.full_name || "-"}</TableCell>
            <TableCell>{user.email || "-"}</TableCell>
            <TableCell>{user.phone_number || "-"}</TableCell>
            <TableCell>{user.location || "-"}</TableCell>
            <TableCell>{user.referralSource || "-"}</TableCell>
            <TableCell className="text-right">
                <AlertDialog open={deleteModalOpen} onOpenChange={setDeleteModalOpen}>
                    <AlertDialogTrigger 
                        className="inline-flex items-center gap-2 p-2 bg-red-600 text-white rounded-sm disabled:opacity-60 hover:bg-red-700 transition-colors" 
                        disabled={submitting}
                    >
                        <RiDeleteBin6Line />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white text-black">
                        <AlertDialogHeader>
                            <div className="w-full flex justify-between items-center">
                                <div></div>
                                <AlertDialogTitle className="text-center text-[#0030A8] text-2xl font-bold">
                                    Delete user
                                </AlertDialogTitle>
                                <AlertDialogCancel className="text-right">
                                    <ImCross />
                                </AlertDialogCancel>
                            </div>
                        </AlertDialogHeader>
                        <AlertDialogDescription>
                            Are you sure you want to delete "{user.full_name}" (#{user.user_id})? This action cannot be undone.
                        </AlertDialogDescription>
                        <AlertDialogFooter>
                            <AlertDialogCancel disabled={submitting} className="mt-2 sm:mt-0">
                                Cancel
                            </AlertDialogCancel>
                            <button 
                                onClick={handleDelete} 
                                disabled={submitting} 
                                className="inline-flex items-center gap-2 bg-red-600 px-4 text-white py-1.5 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-60"
                            >
                                <RiDeleteBin6Line /> {submitting ? 'Deleting...' : 'Delete'}
                            </button>
                        </AlertDialogFooter>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    );
}
