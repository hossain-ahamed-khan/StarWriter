import {
    TableCell,
    TableRow,
} from "@/components/ui/table"

import {
    AlertDialog,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogHeader,
    AlertDialogTitle,
    AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { BsThreeDotsVertical } from "react-icons/bs";
import { ImCross } from "react-icons/im";
import { Switch } from "@/components/ui/switch"
import { RiDeleteBin6Line } from "react-icons/ri";

export default function NotificationTableRow() {
    return (
        <TableRow>
            <TableCell className="font-medium">#1233</TableCell>
            <TableCell>Scheduled Maintenance</TableCell>
            <TableCell>App maintenance: 10PM–12AM.</TableCell>
            <TableCell>All Users</TableCell>
            <TableCell>2025-06-20 22:00</TableCell>
            <TableCell>Alert</TableCell>
            <TableCell>No Image</TableCell>
            <TableCell>Pending</TableCell>
            <TableCell className="text-right">
                <AlertDialog>
                    <AlertDialogTrigger className="p-2 bg-[#D9D9D9] rounded-sm"><BsThreeDotsVertical /></AlertDialogTrigger>
                    <AlertDialogContent>
                        <AlertDialogHeader>
                            <div className="w-full flex justify-between">
                                <div></div>
                                <AlertDialogTitle className="text-center text-[#0030A8] text-2xl font-bold">Action</AlertDialogTitle>
                                <AlertDialogCancel className="text-right"><ImCross /></AlertDialogCancel>
                            </div>

                            <div>
                                <div className="flex justify-between mt-8">
                                    <span className="text-[#1A1A1A] text-lg font-semibold text-left">Pause Notification</span>
                                    <Switch />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-[#1A1A1A] text-lg font-semibold text-left">Delete Notification
                                    </span>
                                    <button className="flex items-center gap-2 bg-[#0030A8] px-4 text-white py-1.5 rounded-lg"><RiDeleteBin6Line /> Delete</button>
                                </div>
                            </div>
                            <AlertDialogDescription></AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>
            </TableCell>
        </TableRow>
    )
}
