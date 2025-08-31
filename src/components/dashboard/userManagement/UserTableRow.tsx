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

export default function UserTableRow() {
    return (
        <TableRow>
            <TableCell className="font-medium">#1233</TableCell>
            <TableCell>Kathryn Murp</TableCell>
            <TableCell>bockely@att.com</TableCell>
            <TableCell>(201) 555-0124</TableCell>
            <TableCell>New York, USA</TableCell>
            <TableCell>Facebook</TableCell>
            <TableCell className="text-right">
                <AlertDialog >
                    <AlertDialogTrigger className="p-2 bg-[#D9D9D9] rounded-sm"><BsThreeDotsVertical /></AlertDialogTrigger>
                    <AlertDialogContent className="bg-white text-black">
                        <AlertDialogHeader>
                            <div className="w-full flex justify-between">
                                <div></div>
                                <AlertDialogTitle className="text-center text-[#0030A8] text-2xl font-bold">Action</AlertDialogTitle>
                                <AlertDialogCancel className="text-right"><ImCross /></AlertDialogCancel>
                            </div>

                            <div>
                                <div className="flex justify-between mt-8">
                                    <span className="text-[#1A1A1A] text-lg font-semibold text-left">Disable User Access</span>
                                    <Switch />
                                </div>
                                <div className="flex justify-between mt-4">
                                    <span className="text-[#1A1A1A] text-lg font-semibold text-left">Delete User Account
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
