import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import UserTableBody from "@/components/dashboard/userManagement/UserTableBody"

export default function UserManagementPage() {
    return (
        <div className="bg-[#FFFFFF] text-black w-full h-screen mx-auto rounded-2xl py-4 px-12 mt-4 shadow-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">SL no.</TableHead>
                        <TableHead>Full Name</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Phone Number</TableHead>
                        <TableHead>Location</TableHead>
                        <TableHead>Hear about us!</TableHead>
                        <TableHead className="text-right">Action</TableHead>
                    </TableRow>
                </TableHeader>

                <UserTableBody />
                
            </Table>
        </div>
    )
}
