import {
    Table,
    TableBody,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"

import DashboardPagination from "@/components/dashboard/userManagement/DashboardPagination"
import UserTableRow from "@/components/dashboard/userManagement/UserTableRow"

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
                <TableBody>
                    <UserTableRow />
                    <UserTableRow />
                    <UserTableRow />
                    <UserTableRow />
                    <UserTableRow />
                    <UserTableRow />
                    <UserTableRow />
                    <UserTableRow />
                    <UserTableRow />
                </TableBody>
            </Table>

            <DashboardPagination />
        </div>
    )
}
