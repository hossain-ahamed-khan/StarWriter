"use client";

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

export type PaymentError = {
    success: false;
    error: string;
};

export const Payment = async (): Promise<PaymentResponse | PaymentError> => {
    try {
        const accessToken = typeof window !== 'undefined'
            ? localStorage.getItem("admin_access_token")
            : null;

        if (!accessToken || accessToken.trim() === "") {
            throw new Error("Access token not found");
        }

        const apiUrl = process.env.NEXT_PUBLIC_BASE_API;
        if (!apiUrl) {
            throw new Error("API URL is not configured in environment variables");
        }

        const res = await fetch(`${apiUrl}admin_dashboard/user-payments-list/`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${accessToken}`,
            },
        });

        if (!res.ok) {
            const errorText = await res.text();
            console.error('Error response:', errorText);
            throw new Error(`HTTP error! status: ${res.status}, message: ${errorText}`);
        }

        const result = await res.json();
        return result as PaymentResponse;
    }
    catch (error: any) {
        console.error('Error in Payment:', error);
        return {
            success: false,
            error: error?.message || 'Failed to fetch user payments'
        } as PaymentError;
    }
}