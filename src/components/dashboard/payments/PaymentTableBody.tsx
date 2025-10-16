"use client";

import { useEffect, useState } from "react";
import { TableBody, TableCell, TableRow } from "@/components/ui/table";
import PaymentTableRow from "./PaymentTableRow";
import { Payment, PaymentError } from "@/services/Payment";

// Local type mirroring the service response shape
type PaymentResult = {
  payment_serial_no: string;
  user_name: string;
  user_id: number | null;
  email: string;
  amount: string;
};

type PaymentResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PaymentResult[];
};

export default function PaymentTableBody() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [rows, setRows] = useState<PaymentResult[]>([]);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const res = (await Payment()) as PaymentResponse | PaymentError;
        if (!active) return;
        if ("results" in res) {
          setRows(res.results || []);
          setError(null);
        } else {
          setError(res.error || "Failed to fetch user payments");
        }
      } catch (e: any) {
        if (!active) return;
        setError(e?.message || "Something went wrong fetching payments");
      } finally {
        if (active) setLoading(false);
      }
    })();
    return () => {
      active = false;
    };
  }, []);

  if (loading) {
    // Simple loading placeholder rows
    return (
      <TableBody>
        {[...Array(3)].map((_, i) => (
          <TableRow key={`loading-${i}`}>
            <TableCell colSpan={5}>
              <div className="animate-pulse h-4 w-full bg-gray-200 rounded" />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    );
  }

  if (error) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} className="text-red-600">
            {error}
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  if (!rows.length) {
    return (
      <TableBody>
        <TableRow>
          <TableCell colSpan={5} className="text-muted-foreground">
            No payments found
          </TableCell>
        </TableRow>
      </TableBody>
    );
  }

  return (
    <TableBody>
      {rows.map((payment, idx) => (
        <PaymentTableRow key={payment.payment_serial_no} index={idx + 1} payment={payment} />
      ))}
    </TableBody>
  );
}
