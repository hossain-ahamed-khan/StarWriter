import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import UserTableBody from "@/components/dashboard/userManagement/UserTableBody"

import SubscriptionManagementModal from "@/components/dashboard/userManagement/SubscriptionManagementModal";

export default function UserManagementPage() {
    return (
        <div className="bg-[#FFFFFF] text-black w-full min-h-screen mx-auto rounded-2xl py-4 px-12 mt-4 shadow-md">
            <div className="mb-6 flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-gray-900">User Management</h1>
                    <p className="text-gray-600 text-sm mt-1">Manage user accounts and subscriptions</p>
                </div>
                
                {/* Subscription Management Button */}
                <SubscriptionManagementModal />
            </div>

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
