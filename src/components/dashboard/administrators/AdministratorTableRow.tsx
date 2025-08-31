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
import { ImCross } from "react-icons/im";
import { RiDeleteBin6Line } from "react-icons/ri";
import Image from "next/image";
import profileImage from "../../../../public/resources/images/profile-image.png";
import { MdOutlineEdit } from "react-icons/md";
import EditAdministrator from "./EditAdministrator";
import DeleteAdministrator from "./DeleteAdministrator";

export default function AdministratorTableRow() {
    return (
        <TableRow>
            <TableCell className="font-medium">#1233</TableCell>
            <TableCell>
                <div className="flex-none lg:flex lg:items-center lg:gap-2">
                    <Image
                        src={profileImage}
                        width={30}
                        height={30}
                        alt="Picture of the author"
                    />
                    <p>Kathryn Murp</p>
                </div>
            </TableCell>
            <TableCell>bockely@att.com</TableCell>
            <TableCell>(201) 555-0124</TableCell>
            <TableCell>Admin</TableCell>
            <TableCell className="text-right space-x-2">

                <AlertDialog>
                    <AlertDialogTrigger className="bg-[#006699] p-3 rounded-lg text-white text-xl">
                        <MdOutlineEdit />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white text-black">
                        <AlertDialogHeader>
                            <div className="w-full flex justify-between">
                                <div></div>
                                <AlertDialogTitle className="text-2xl font-bold mt-10 mb-5">Edit Administrator</AlertDialogTitle>
                                <AlertDialogCancel><ImCross /></AlertDialogCancel>
                            </div>

                            <EditAdministrator />

                            <AlertDialogDescription></AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>

                <AlertDialog>
                    <AlertDialogTrigger className="bg-[#E30000] p-3 rounded-lg text-white text-xl">
                        <RiDeleteBin6Line />
                    </AlertDialogTrigger>
                    <AlertDialogContent className="bg-white text-black">
                        <AlertDialogHeader>
                            <div className="w-full flex justify-between">
                                <div></div>
                                <AlertDialogTitle className="text-center text-2xl font-bold pt-10 pb-5">Confirm Account Deletion</AlertDialogTitle>
                                <AlertDialogCancel className="text-right"><ImCross /></AlertDialogCancel>
                            </div>

                            <DeleteAdministrator />

                            <AlertDialogDescription></AlertDialogDescription>
                        </AlertDialogHeader>
                    </AlertDialogContent>
                </AlertDialog>

            </TableCell>
        </TableRow>
    )
}
