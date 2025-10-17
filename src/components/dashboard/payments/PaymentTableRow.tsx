import { TableCell, TableRow } from "@/components/ui/table";

type PaymentResult = {
    payment_serial_no: string;
    user_name: string;
    user_id: number | null;
    email: string;
    amount: string;
};

export default function PaymentTableRow({
    index,
    payment,
}: {
    index: number;
    payment: PaymentResult;
}) {
    return (
        <TableRow>
            <TableCell className="font-medium">{index}</TableCell>
            <TableCell>{payment?.user_name || "-"}</TableCell>
            <TableCell>{payment?.user_id ?? "-"}</TableCell>
            <TableCell>{payment?.email || "-"}</TableCell>
            <TableCell>{payment?.amount || "-"}</TableCell>
        </TableRow>
    );
}
