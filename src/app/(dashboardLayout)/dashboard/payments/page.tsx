import {
    Table,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import PaymentTableBody from "@/components/dashboard/payments/PaymentTableBody"

export default function UserManagementPage() {
    return (
        <div className="bg-[#FFFFFF] text-black w-full h-screen mx-auto rounded-2xl py-4 px-12 mt-4 shadow-md">
            <Table>
                <TableHeader>
                    <TableRow>
                        <TableHead className="w-[100px]">SL no.</TableHead>
                        <TableHead>User Name</TableHead>
                        <TableHead>User ID</TableHead>
                        <TableHead>Email</TableHead>
                        <TableHead>Amount</TableHead>
                    </TableRow>
                </TableHeader>

                <PaymentTableBody />
                
            </Table>
        </div>
    )
}
