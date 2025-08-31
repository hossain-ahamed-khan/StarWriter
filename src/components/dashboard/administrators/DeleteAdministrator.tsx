import { RiDeleteBin6Line } from "react-icons/ri";
import { AlertDialogCancel } from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

export default function DeleteAdministrator() {
    return (
        <div className="w-full flex justify-between gap-4 mt-10">
            <AlertDialogCancel asChild>
                <Button variant="outline" className="w-1/2 text-[#006699] border-[#006699] rounded-lg py-6 cursor-pointer hover:bg-[#006699]/10">
                    Cancel
                </Button>
            </AlertDialogCancel>
            <Button type="submit" className="w-1/2 bg-[#006699] py-6 rounded-lg text-white flex justify-center items-center gap-2 cursor-pointer hover:bg-[#006699]/80"><RiDeleteBin6Line />Delete Account</Button>
        </div>
    )
}
